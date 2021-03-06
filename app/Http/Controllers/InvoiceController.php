<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Invoice;
use App\InvoiceDetail;
use App\Mail\invoiceMail;
use Mail;
use App\Helper;
use App\Language;
use App\Package;
use App\Profile;
use App\Notice;
use App\Booking;
use App\SiteManagement;
use App\User;
use Auth;
use Carbon\Carbon;
use DB;
use Hash;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Validator;
use Session;
use Illuminate\Support\Facades\Input;
use View;
use Illuminate\Support\Arr;
use File;
use Storage;
use PDF;
use App\Http\Controllers\Exception;
use App\Service;
use Illuminate\Support\Facades\Schema;

class InvoiceController extends Controller
{

    protected $user;
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */


    public function __construct(User $user)
    {
        $this->user = $user;
    }

    public function index(Request $request,$id)
    {
         DB::connection()->enableQueryLog();
       
        if (!empty($_GET['search'])) {
            $search = $_GET['search'];
            $invoices = Invoice::select('invoices.*','bookings.booking_name')
            ->join('bookings','bookings.id','invoices.booking_id')
            ->where('invoices.user_id', $id)
            ->where('bookings.booking_name','LIKE', '%'.$search.'%')
            ->orWhere('invoices.id',$search)
            ->latest('invoices.created_at')->paginate(7)
            ->setPath('');
            $pagination = $invoices->appends(
                array(
                    'search' => request('search'),
                )
            );
            
        } else {
            $invoices =  Invoice::select('invoices.*','bookings.booking_name')
            ->join('bookings','bookings.id','invoices.booking_id')
            ->where('invoices.user_id', $id)
            ->latest('invoices.created_at')
            ->paginate(7);

        }
         $queries = DB::getQueryLog();
        $last_query = end($queries);
        // echo "<pre>";print_r($last_query);"</pre>";exit;

        return $invoices;
    }

    public function getNextInvoiceNo()
    {
        $invoice = Invoice::select('id')->latest()->first();
        return $invoice->id+1;
    }


    public function getInvoices(Request $request,$id)
    {
         DB::connection()->enableQueryLog();
       
        if (!empty($_GET['search'])) {
            $search = $_GET['search'];
            $invoices = Invoice::select('invoices.*','bookings.booking_name')
            ->join('bookings','bookings.id','invoices.booking_id')
            ->where('invoices.customer_id', $id)
            ->where('bookings.booking_name','LIKE', '%'.$search.'%')
            ->orWhere('invoices.id',$search)
            ->latest('invoices.created_at')->paginate(7)
            ->setPath('');
            $pagination = $invoices->appends(
                array(
                    'search' => request('search'),
                )
            );
            
        } else {
            $invoices =  Invoice::select('invoices.*','bookings.booking_name')
            ->join('bookings','bookings.id','invoices.booking_id')
            ->where('invoices.customer_id', $id)
            ->latest('invoices.created_at')
            ->paginate(7);

        }
         $queries = DB::getQueryLog();
        $last_query = end($queries);
        // echo "<pre>";print_r($last_query);"</pre>";exit;

        return $invoices;
    }


    public function exportFreelancerInvoice($type)
    {
        $data = array('type'=>$type);
        return Excel::download(new InvoiceExport('exports.invoice', $data), $type.'_invoice.xls');
    }

    public function exportEmployerInvoice($type)
    {
        $data = array('type'=>$type);
        return Excel::download(new InvoiceExport('exports.invoice', $data), $type.'_invoice.xls');
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create($type)
    {
        if (Auth::user()->getRoleNames()[0] != 'admin' && Auth::user()->getRoleNames()[0] === 'freelancer') {

            $customers = DB::table('proposals')->join('jobs', 'jobs.id', 'proposals.job_id')
            ->join('users', 'users.id', 'jobs.user_id')
            ->whereIn("jobs.status", ['completed'])
            ->whereIn("proposals.status", ['completed'])
            ->where('proposals.freelancer_id',Auth::user()->id)
            ->orderBy('jobs.created_at','DESC')->pluck('users.id',DB::raw("CONCAT(users.first_name,' ',users.last_name) AS customer"));
            $countries = DB::table('countries')->pluck('countries.name','countries.id');        
            $class = 'wt-innerbgcolor register-customer';
            if (Auth::user()->getRoleNames()[0] != 'admin' && Auth::user()->getRoleNames()[0] === 'freelancer') {
                return view('back-end.freelancer.invoices.create', compact('type','class','customers','countries'));
            }

        }else{
            $customers = DB::table('jobs')
            ->join('users', 'users.id', 'jobs.user_id')
            ->whereIn("jobs.status", ['completed'])
            ->where('jobs.user_id',Auth::user()->id)
            ->orderBy('jobs.created_at','DESC')->pluck('users.id',DB::raw("CONCAT(users.first_name,' ',users.last_name) AS customer"));
            $class = 'wt-innerbgcolor register-customer';
            if (Auth::user()->getRoleNames()[0] != 'admin' && Auth::user()->getRoleNames()[0] === 'employer') {
                return view('back-end.employer.invoices.create', compact('type','class'));
            }
        }
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $data_return = Invoice::create($request->all());

         DB::table('invoices')
            ->where('id', $data_return->id)
            ->update(['invoice_number' => $data_return->id]);

        $user = User::where('id', $request->user_id)->first();
        $booking = Booking::where('id', $request->booking_id)->first();

        $message = "<a href='/profile/".$user->id."'>".$user->name."</a> Generated a <a href='/view-invoicepdf/".$data_return->id."'>Invoice # ".$data_return->id." </a> for Booking <a href='/booked/". $booking->booking_id."'>".$booking->booking_name."</a>";
        Notice::create(['user_id' => $user->id, 'receiver_id' => $request->customer_id, 'data' => $message , 'type' => 'invoice']);

        return $data_return->id;
    }


    public function storeInvoice(Request $request)
    {
        $data_return = Invoice::where('id', $request->id)->update($request->all());

        return 'Updated';
    }

    public function savePdfFile(Request $request)
    {
       $file = $request->file('data');
       $fname = $request->file_name;
       $destination = public_path() . '/invoices/' . $fname;
       $location = $_FILES["data"]["tmp_name"];
       move_uploaded_file($location, $destination);
    }

    public function sendInvoice($id)
    {
        $invoice = Invoice::where('id',$id)->first();
        $user = User::where('id',$invoice->customer_id)->first();
        $email = $user->email;
        $email = 'er.krishna.mishra@gmail.com';
        $name = $user->name;
        $name = 'Krishna Mishra';

        $to = [
            [
                'email' => $email, 
                'name' => $name,
            ]
        ];
        Mail::to($to)->send(new invoiceMail($invoice));

        return response()->json('Invoice sended successfully!');

    }

    public function checkInvoice($id)
    {
        if (Invoice::where('booking_id', $id)->exists()) {
            return Invoice::where('booking_id', $id)->count();
        }else{
            return 0;
        }
        
    }

    public function sendMailInvoice(Request $request,$id)
    {
        DB::connection()->enableQueryLog();
        InvoiceDetail::where('invoice_id', '=', $id)->delete();
        $queries = DB::getQueryLog();
        $last_query = end($queries);

        foreach($request->all() as $data)
        {
            InvoiceDetail::create($data);
        }
        $invoice = Invoice::find($id)->first();
        $user = User::where('id',$invoice->customer_id)->first();
        $email = $user->email;
        $email = 'er.krishna.mishra@gmail.com';
        $name = $user->name;
        $name = 'Krishna Mishra';

        $to = [
            [
                'email' => $email, 
                'name' => $name,
            ]
        ];

        Mail::to($to)->send(new invoiceMail($invoice));

        return response()->json('Successfully updated');
    }

    public function updateInvoice(Request $request,$id)
    {
        DB::connection()->enableQueryLog();
        InvoiceDetail::where('invoice_id', '=', $id)->delete();
        $queries = DB::getQueryLog();
        $last_query = end($queries);
        // echo "<pre>";print_r($last_query);"</pre>";exit;

        foreach($request->all() as $data)
        {
            InvoiceDetail::create($data);
        }

        if (isset($request->mail) && !empty($request->mail)) {
            if ($request->send == 1) {
                $this->sendInvoice($id);
            }
        }

        return response()->json('Successfully updated');
    } 

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        if (!empty($id)) {

            $invoice_info = DB::table('invoices')
                            ->join('invoice_details', 'invoice_details.invoice_id', '=', 'invoices.id')
                            ->join('bookings', 'bookings.id', '=', 'invoices.booking_id')
                            ->select('invoices.*')
                            ->where('invoices.id', $id)
                            ->get()->first();           
        }
        return response()->json($invoice_info);      
    }

    public function invoiceDetails($id)
    {
        if (!empty($id)) {

            $invoice_info = InvoiceDetail::select('invoice_details.*')
                            ->where('invoice_details.invoice_id', $id)
                            ->get();           
        }
        return response()->json($invoice_info);      
    }

    public function export_pdf($id)
    {
        $invoice_info = DB::table('invoices')
                ->join('invoice_details', 'invoice_details.invoice_id', '=', 'invoices.id')
                ->join('jobs', 'jobs.id', '=', 'invoice_details.job_id')
                ->select('invoice_details.*','jobs.title')
                ->where('invoices.id', '=', $id)
                ->get()->first();

        $pdf = PDF::loadView('pdfs.invoice_pdf', (array)$invoice_info);
        $pdf->save(storage_path().'_invoice'.$id.'.pdf');
        return $pdf->download('invoice_'.$id.'.pdf');
    }


    function getProjectNames(Request $request)
    {     
        DB::connection()->enableQueryLog();
        $jobs = DB::table("jobs")
            ->join('proposals', 'proposals.job_id', 'jobs.id')
            ->where('proposals.freelancer_id',Auth::user()->id)
            ->where("jobs.user_id",$request->customer_id)
            ->whereIn("jobs.status", ['completed'])
            ->whereIn("proposals.status", ['completed'])
            ->pluck("jobs.title","jobs.id");
        return response()->json($jobs);        
    }

    function getMilestones(Request $request)
    {      
        $milestones = DB::table("milestones")
            ->join('proposals', 'proposals.job_id', 'milestones.job_id')
            ->where("milestones.user_id",Auth::user()->id)
            ->where("milestones.job_id",$request->project_id)
            ->where("milestones.status", 1)
            ->whereIn("proposals.status", ['completed'])
            ->select('proposals.amount')
            ->get()->first();
        return response()->json($milestones->amount);        
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request,$id)
    {
        foreach($request->all() as $data)
        {
            $data_return = InvoiceDetail::create($data);
            DB::table('invoice_details')
            ->where('id', $data_return->id)
            ->update(['invoice_id' => $id]);
        }
        return response()->json('Successfully added');
    }


    public function updateAndMail(Request $request,$id)
    {
        foreach($request->all() as $data)
        {
            $data_return = InvoiceDetail::create($data);
            DB::table('invoice_details')
            ->where('id', $data_return->id)
            ->update(['invoice_id' => $id]);
        }

        $invoice = Invoice::find($id)->first();
        $user = User::where('id',$invoice->customer_id)->first();
        $email = $user->email;
        $email = 'er.krishna.mishra@gmail.com';
        $name = $user->name;
        $name = 'Krishna Mishra';

        $to = [
            [
                'email' => $email, 
                'name' => $name,
            ]
        ];

        Mail::to($to)->send(new invoiceMail($invoice));

        return response()->json('Successfully added');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        Invoice::find($id)
        ->delete();
        DB::table('invoice_details')
        ->where('invoice_id', $id)
        ->delete();
        return 'Deleted';
    }
}
