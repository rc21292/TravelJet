<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Query;
use App\Booking;
use App\Quotation;
use App\QuotationDetail;
use App\User;
use App\Notice;
use DB;

class QueryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request, $id)
    {
        if ($request->type == 'quotation') {
             $result = Quotation::
                     join('bookings', 'bookings.id' ,'quotations.booking_id')
                     ->select('bookings.*','quotations.payment')
                     ->where('quotations.status','pending')
                     ->where('quotations.user_id',$id)
                     ->paginate(15);
        }else if($request->type == 'booking'){
            $result = Booking::
                     join('quotations', 'bookings.id' ,'quotations.booking_id')
                     ->select('bookings.*',DB::raw("count(quotations.booking_id) as count"))
                     ->where('quotations.status','awarded')->where('bookings.status','awarded')
                     ->where('quotations.user_id',$id)
                     ->paginate(15);
        }else if($request->type == 'booked'){
            $result = Booking::
                     join('quotations', 'bookings.id' ,'quotations.booking_id')
                     ->select('bookings.*')
                     ->where('quotations.status','booked')->where('bookings.status','booked')
                     ->where('quotations.user_id',$id)
                     ->paginate(15);
        }else if($request->type == 'cancel'){
            $result = Booking::
                     join('quotations', 'bookings.id' ,'quotations.booking_id')
                     ->select('bookings.*')
                     ->where('quotations.status','cancelled')->where('bookings.status','cancelled')
                     ->where('quotations.user_id',$id)
                     ->paginate(15);
        }else{
            $result = Booking::where('user_id',$id)->paginate(5);
        }
        return $result;
    }


    public function getDestinations()
    {
        return $bookings_data = Booking::select('to_places','id')->where('status','posted')->whereNotNull('to_places')->distinct('to_places')->orderBy('to_places','Asc')->groupBy('to_places')->get();
    }



    public function getUpcommingBookings($id)
    {
         return $result = Booking::
                     join('quotations', 'bookings.id' ,'quotations.booking_id')
                     ->select('bookings.*')
                     ->where('quotations.status','awarded')->where('bookings.status','awarded')
                     ->where('bookings.user_id',$id)->latest('bookings.created_at')
                     ->paginate(15);
    }

    public function getCancelledBookings($id)
    {
         return $result = Booking::
                     join('quotations', 'bookings.id' ,'quotations.booking_id')
                     ->select('bookings.*')
                     ->where('quotations.status','cancelled')->where('bookings.status','cancelled')
                     ->where('bookings.user_id',$id)->latest('bookings.created_at')
                     ->paginate(15);
    }


    public function getBookedBookings($id)
    {
         return $result = Booking::
                     join('quotations', 'bookings.id' ,'quotations.booking_id')
                     ->select('bookings.*')
                     ->where('quotations.status','booked')->where('bookings.status','booked')
                     ->where('bookings.user_id',$id)->latest('bookings.created_at')
                     ->paginate(5);
    }


    public function getQueries(Request $request)
    {
        DB::connection()->enableQueryLog();

        $user_transaction_s = Booking::
            leftjoin('quotations', 'bookings.id' ,'quotations.booking_id')
            ->select('bookings.*',DB::raw("count(quotations.booking_id) as count"))
            ->where('bookings.status',$request->status)->where('bookings.status','!=','booked');

             if ($request->has('cab') && !empty($request->cab)) {
            $cab = $request->cab;
            $user_transaction_s->whereIn('bookings.vehicle_type',explode(',', $request->cab));
        }

         if ($request->has('name') && !empty($request->name)) {
            $name = $request->name;
            $user_transaction_s->where('bookings.booking_name', 'LIKE', "%$request->name%");
        }
         if ($request->has('location') && !empty($request->location)) {
            $location = $request->location;
            $user_transaction_s->whereIn('bookings.id',explode(',', $request->location));
        }

        if ($request->has('category') && !empty($request->category)) {
            $category = $request->category;
            $user_transaction_s->whereIn('bookings.booking_type',explode(',', $request->category));
        }

        $result = $user_transaction_s->groupBy('bookings.id')
            ->orderBy('bookings.id','DESC')
            ->paginate(6);

         $queries = DB::getQueryLog();
         $last_query = end($queries);
         // echo "<pre>";print_r($last_query);"</pre>";exit;
        return $result;
    }

    public function getQueriesByUserId(Request $request,$id)
    {
        DB::connection()->enableQueryLog();
         $result = Booking::
         leftjoin('quotations', 'bookings.id' ,'quotations.booking_id')
         ->select('bookings.booking_name','bookings.id','bookings.created_at as date')
         ->where('bookings.user_id',$id)->where('bookings.status','!=','booked')->where('bookings.status','!=','awarded')
         ->groupBy('bookings.id')
         ->paginate(4);

         $queries = DB::getQueryLog();
         $last_query = end($queries);
        return $result;
    }


    public function getBookedQueriesByUserId(Request $request,$id)
    {
        DB::connection()->enableQueryLog();

         $result = Booking::
         leftjoin('quotations', 'bookings.id' ,'quotations.booking_id')
         ->select('bookings.booking_name','bookings.id','bookings.created_at as date')
         ->where('bookings.user_id',$id)->where('bookings.status','booked')
         ->groupBy('bookings.id')
         ->paginate(20);

         $queries = DB::getQueryLog();
         $last_query = end($queries);
        return $result;
    }


    public function getTotalBookings($id)
    {
        DB::connection()->enableQueryLog();

         $result = Booking::
         where('bookings.user_id',$id)->where('bookings.status','posted')->count('id');

         $queries = DB::getQueryLog();
         $last_query = end($queries);
         // echo "<pre>";print_r($last_query);"</pre>";exit;
        return $result;
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        

    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $stopages_data = $request->stopeges;

        unset($stopages_data[0]);

        $data = $request->except(['stopeges']);

        $data_re = Booking::create($data);

        if (isset($stopages_data)) {

            DB::table('bookings')
            ->where('id', $data_re->id)
            ->update(['stopeges' => json_encode(array_values($stopages_data))]);

        }

        $user = User::where('id',$request->user_id)->first();

        $message = "<a href='/profile/".$request->user_id."'> ".$user->name." </a> <span> posted a new booking </span> <a href='/customer-booking/". $data_re->id."'>".$request->booking_name."</a>";

        Notice::create(['user_id' => $request->user_id, 'receiver_id' => 0, 'data' => $message , 'type' => 'job_post', 'created_at' => \Carbon\Carbon::now()]);

        return response()->json([
            'success' => true,
            'addresses' => '',
            'message' => 'Booking Saved successfully!'
        ], 201);  

        return $request->all();
        // $query = new Query;
        // $query->user_id = '4';
        // $query->booking_type = $request->booking_type;
        // $query->start_at = $request->start_at;
        // $query->end_on = $request->end_on;
        // $query->pick_up = $request->pick_up;
        // if($request->booking_type == 'Round Trip'){
        // $query->drop_on = $request->pick_up;
        // $query->destination = $request->destination;
        // $query->sightseeing = 'No';
        // }elseif($request->booking_type == 'Round Trip with Sightseeing'){
        // $query->drop_on = $request->drop_on;
        // $query->destination = $request->destination;
        // $query->sightseeing = 'Yes';
        // }else{
        // $query->drop_on = $request->destination;
        // $query->destination = $request->destination;
        // $query->sightseeing = 'No';
        // }
        // $query->persons = $request->persons;
        // $query->cab_type = $request->cab_type;
        // $query->book_in = $request->book_in;
        // $query->budget = $request->budget;
        // $query->description = $request->description;
        // $query->save();
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request, $id)
    {
       if ($request->type=='booked') {
        DB::connection()->enableQueryLog();
            $result = Booking::
            join('quotations', 'bookings.id' ,'quotations.booking_id')
            ->leftjoin('quotation_details', 'quotation_details.quotation_id' ,'quotations.id')
            ->select('bookings.*','quotations.payment_status','quotation_details.inclusions','quotation_details.exclusions','quotations.id')
            ->where('bookings.id',$id)->where('quotations.status','booked')
            ->first();
        }else if ($request->type=='booking') {
        DB::connection()->enableQueryLog();
            $result = Booking::
            join('quotations', 'bookings.id' ,'quotations.booking_id')
            ->leftjoin('quotation_details', 'quotation_details.quotation_id' ,'quotations.id')
            ->select('bookings.*','quotations.payment_status','quotation_details.inclusions','quotation_details.exclusions','quotations.id')
            ->where('bookings.id',$id)->where('quotations.status','awarded')
            ->first();
        }else if ($request->type=='cancel') {
        DB::connection()->enableQueryLog();
            $result = Booking::
            join('quotations', 'bookings.id' ,'quotations.booking_id')
            ->leftjoin('quotation_details', 'quotation_details.quotation_id' ,'quotations.id')
            ->select('bookings.*','quotations.payment_status','quotations.user_id','quotation_details.inclusions','quotation_details.exclusions','quotations.id')
            ->where('bookings.id',$id)->where('quotations.status','cancelled')
            ->first();
        }else if ($request->type=='cancelled') {
        DB::connection()->enableQueryLog();
            $result = Booking::
            join('quotations', 'bookings.id' ,'quotations.booking_id')
            ->leftjoin('quotation_details', 'quotation_details.quotation_id' ,'quotations.id')
            ->select('bookings.*','quotations.payment_status','quotation_details.inclusions','quotation_details.exclusions')
            ->where('bookings.id',$id)->where('quotations.status','cancelled')
            ->first();
            $queries = DB::getQueryLog();
            $last_query = end($queries);
            // echo "<pre>";print_r($last_query);"</pre>";exit;
        }else{         
        $result = Booking::find($id);
        }

        return $result;
    }


     public function getStopagesData($id)
     {

        $project = Booking::select('stopeges')->find($id);

        if ($project->stopeges) {


            $stopages = "";

            $kay_first = array_key_first(json_decode($project->stopeges));
            $kay_last = array_key_last(json_decode($project->stopeges));

            $data_arr = array();

            foreach (json_decode($project->stopeges) as $key => $value) {
                array_push($data_arr, $value->stopage);

            }
        }else{
            $data_arr = array();
        }


        return response()->json([
            'success' => true,
            'stopages' => $data_arr,
        ], 200);  

    }


     public function getStopages($id)
     {

        $project = Booking::select('stopeges')->find($id);

        if ($project->stopeges) {

            $stopages = "";

            $kay_first = array_key_first(json_decode($project->stopeges));
            $kay_last = array_key_last(json_decode($project->stopeges));

            foreach (json_decode($project->stopeges) as $key => $value) {

                if ($key ==0){
                    $stopages .= ucfirst($value->stopage);
                }else{
                    $stopages .= " -> " . ucfirst($value->stopage);
                }
            }
        }else{
            $stopages = "";
        }


        return response()->json([
            'success' => true,
            'stopages' => $stopages,
        ], 200);  

    }



     public function getQuotationStoppages($id,$user_id)
     {
        $quotation = QuotationDetail::select('stopeges')->where('booking_id',$id)->where('user_id',$user_id)->first();

        if (!empty($quotation->stopeges)) {

            $cars = array("stopage"=>'');

            $ttt = array();
            $ttt = json_decode($quotation->stopeges);
            array_unshift($ttt, $cars);
        }else{
            $ttt = array();
        }
        return $ttt;

    }


    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $query = Query::find($id);
        return $query;
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
        $data = $request->except(['stopeges']);

        $query = Query::find($id);
         DB::table('bookings')
            ->where('id', $id)
            ->update($data);

          return response()->json([
            'success' => true,
            'message' => 'updated',
        ], 200);  
    }


    public function getStoppages($id)
    {
        $quotation = Booking::select('stopeges')->where('id',$id)->first();
        if ($quotation->stopeges) {

            $cars = array("stopage"=>'');

            $ttt = array();
            $ttt = json_decode($quotation->stopeges);
            array_unshift($ttt, $cars);
        }else{
            $ttt = array();
        }
        return $ttt;
    }

    public function updateStoppages(Request $request,$id)
    {
        $stopages_data = $request->stopeges;

        unset($stopages_data[0]);

        $data = $request->except(['stopeges']);

        DB::table('bookings')
        ->where('id', $id)
        ->update(['stopeges' => json_encode(array_values($stopages_data))]);

        return response()->json([
            'success' => true,
            'message' => 'stopeges Saved successfully!'
        ], 200);  
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $bookings = Booking::find($id)->delete();
        $quotations = Quotation::where('booking_id',$id)->delete();
        $quotation_details = QuotationDetail::where('booking_id',$id)->delete();
    }


    public function moveToBooked(Request $request,$id)
    {
        $booking = Booking::find($id);
        $booking->status = 'booked';
        $booking->save();

        DB::table('quotations')
        ->where('id', $request->quotation_id)
        ->update(['status' => 'booked']);

        $quotation = Quotation::where('id', $request->quotation_id)->first();
        $user = User::where('id',$quotation->user_id)->first();

        $message = "<a href='/profile/".$user->user_id."'> ".$user->name." </a> <span> confirmed booking </span> <a href='/booked/". $id."'>".$booking->booking_name."</a>";

        Notice::create(['user_id' => $user->user_id, 'receiver_id' => $booking->user_id, 'data' => $message , 'type' => 'booked', 'created_at' => \Carbon\Carbon::now()]);

        return 'saved';
    }


    public function cancel(Request $request, $id)
    {
        $query = Booking::find($id);
        $query->cancellation_reason = $request->reason;
        $query->status = 'cancelled';
        $query->save();
        DB::table('quotations')
        ->where('id', $request->quotation_id)
        ->update(['status' => 'cancelled']);
        return 'saved';
    }


    public function reBooking(Request $request, $id)
    {
        $query = Booking::find($id);
        $query->status = 'awarded';
        $query->save();
        DB::table('quotations')
        ->where('id', $request->quotation_id)
        ->update(['status' => 'awarded']);
        return 'saved';
    }

}
