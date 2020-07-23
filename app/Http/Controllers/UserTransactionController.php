<?php

namespace App\Http\Controllers;

use App\UserTransaction;
use App\Job;
use Illuminate\Http\Request;
use Auth;
use App\Helper;
use Session;
use Redirect;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Input;
use DB;
use Spatie\Permission\Models\Role;
use App\SiteManagement;
use App\Mail\AdminEmailMailable;
use App\Mail\EmployerEmailMailable;
use App\EmailTemplate;
use App\Item;
use Carbon\Carbon;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Schema;
use URL;
use Maatwebsite\Excel\Facades\Excel;
use App\Exports\UserTransactionsExport;

class UserTransactionController extends Controller
{

    protected $user_transactions;
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */

    public function __construct(UserTransaction $user_transactions)
    {
        $this->user_transactions = $user_transactions;

    }

    public function index(Request $request,$id)
    {
        $transation_type = $request->input('transation_type');
        $from_date = $request->input('from_date');
        $to_date = $request->input('to_date');
        $currency   = SiteManagement::getMetaValue('commision');
        $symbol = !empty($currency) && !empty($currency[0]['currency']) ? Helper::currencyList($currency[0]['currency']) : array();

        DB::connection()->enableQueryLog();
        $user_transaction_s = $this->user_transactions::where('user_id', $id)->latest();

        if ($request->has('transation_type') && !empty($request->transation_type)) {
            $transation_type = $request->transation_type;
            $user_transaction_s->where('type',$transation_type);
        }

        if (($request->has('from_date') && $request->has('to_date')) && (!empty($request->from_date) && !empty($request->to_date)) ) {
            $from_date = date('Y-m-d', strtotime($request->from_date));
            $to_date = date('Y-m-d', strtotime($request->to_date));
            $user_transaction_s->whereDate('created_at', '>=', $from_date)
                              ->whereDate('created_at', '<=', $to_date);
        }else if ($request->has('from_date') && !empty($request->from_date)) {
            $from_date = date('Y-m-d', strtotime($request->from_date));
            $user_transaction_s->where('created_at','LIKE', '%'.$from_date.'%');
        }else if ($request->has('to_date') && !empty($request->to_date)) {
            $to_date = date('Y-m-d', strtotime($request->to_date));
            $user_transaction_s->where('created_at','LIKE', '%'.$to_date.'%');
        }

        $user_transactions = $user_transaction_s->select('user_transactions.*', DB::raw("DATE_FORMAT(user_transactions.created_at, '%d-%m-%Y') as created_on"))->paginate(10);
        $queries = DB::getQueryLog();
        $last_query = end($queries);
        
        if ($request->has('from_date')) {
            $from_date = $request->from_date;
        }else{
            $from_date = date('m/d/Y');
        }
        if ($request->has('to_date')) {
            $to_date = $request->to_date;
        }else{
            $to_date = date('m/d/Y');
        }

         return response()->json([
            'success' => true,
            'user_transactions' => $user_transactions,
            'transation_type' => $transation_type,
            'from_date' => $from_date,
            'to_date' => $to_date,
        ], 200);

    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */

/*    public function export($type)
    {
        return Excel::download(new UserTransactionsExport, 'user_transactions.' . $type);
    }
*/

    public function export(Request $request, $type)
    {
        $data = array('type'=>$type,'from_date'=>$request->from_date,'to_date'=>$request->to_date,'transation_type'=>$request->transation_type);
        return Excel::download(new UserTransactionsExport('exports.user_transactions', $data), $type.'_transactions.xls');
    }



    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
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
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
