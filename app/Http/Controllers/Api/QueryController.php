<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Query;
use App\Booking;
use App\Quotation;
use App\QuotationDetail;
use App\UserTransaction;
use App\WalletTransaction;
use App\User;
use App\Notice;
use DB;

class QueryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
                     // ->select('bookings.*',DB::raw("count(quotations.booking_id) as count"))
     */
    public function index(Request $request, $id)
    {
        if ($request->type == 'quotation') {
            $result_data = Quotation::
                     join('bookings', 'bookings.id' ,'quotations.booking_id')
                     ->join('users', 'bookings.user_id' ,'users.id')
                     ->select('bookings.*','quotations.total_payment','users.name')
                     ->where('quotations.status','pending')
                     ->where('quotations.user_id',$id);
                     if ($request->has('search') && !empty($request->search)) {
                        $search = $request->search;
                        $result_data->where('bookings.booking_name','LIKE', '%'.$search.'%');
                    }
                    $result = $result_data->latest('bookings.created_at')
                     ->paginate(15);
        }else if($request->type == 'booking'){
            $result_data = Booking::
                     join('quotations', 'bookings.id' ,'quotations.booking_id')
                     ->join('users', 'bookings.user_id' ,'users.id')
                     ->select('bookings.*','users.name')
                     ->where('quotations.status','awarded')->where('bookings.status','awarded')
                     ->where('quotations.user_id',$id);
                      if ($request->has('search') && !empty($request->search)) {
                        $search = $request->search;
                        $result_data->where('bookings.booking_name','LIKE', '%'.$search.'%');
                    }
                    $result = $result_data->latest('bookings.created_at')
                     ->paginate(15);
        }else if($request->type == 'booked'){
            $result_data = Booking::
                     join('quotations', 'bookings.id' ,'quotations.booking_id')
                      ->join('users', 'bookings.user_id' ,'users.id')
                     ->select('bookings.*','users.name')
                     ->where('quotations.status','booked')->where('bookings.status','booked')
                     ->where('quotations.user_id',$id);
                      if ($request->has('search') && !empty($request->search)) {
                        $search = $request->search;
                        $result_data->where('bookings.booking_name','LIKE', '%'.$search.'%');
                    }
                    $result = $result_data->latest('bookings.created_at')
                     ->paginate(15);
        }else if($request->type == 'cancel'){
            $result_data = Booking::
                     join('quotations', 'bookings.id' ,'quotations.booking_id')
                      ->join('users', 'bookings.user_id' ,'users.id')
                     ->select('bookings.*','users.name')
                     ->where('quotations.status','cancelled')->where('bookings.status','cancelled')
                     ->where('quotations.user_id',$id);
                      if ($request->has('search') && !empty($request->search)) {
                        $search = $request->search;
                        $result_data->where('bookings.booking_name','LIKE', '%'.$search.'%');
                    }
                    $result = $result_data->latest('bookings.created_at')
                     ->paginate(15);
        }else{
            $result = Booking::where('user_id',$id)->latest('bookings.created_at')->paginate(5);
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
                     ->whereIn('quotations.status',array('awarded','booked'))
                     ->whereIn('bookings.status',array('awarded','booked'))
                     ->where('bookings.user_id',$id)->latest('bookings.updated_at')
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
                     ->join('users', 'users.id' ,'quotations.user_id')
                     ->select('bookings.*','users.name')
                     ->where('quotations.status','booked')->where('bookings.status','booked')
                     ->where('bookings.user_id',$id)->latest('bookings.created_at')
                     ->paginate(5);
    }

    public function getBookingsBooked()
    {
         return $result = Booking::
                     join('quotations', 'bookings.id' ,'quotations.booking_id')
                     ->select('bookings.*')
                     ->where('quotations.status','booked')->where('bookings.status','booked')
                     ->latest('bookings.created_at')
                     ->paginate(5);
    }


     public function getAgentBookedBookings($id)
    {
         return $result = Booking::
                     join('quotations', 'bookings.id' ,'quotations.booking_id')
                     ->join('users', 'users.id' ,'bookings.user_id')
                     ->select('bookings.*','users.name')
                     ->where('quotations.status','booked')->where('bookings.status','booked')
                     ->where('quotations.user_id',$id)->latest('bookings.created_at')
                     ->paginate(5);
    }


    public function getQueries(Request $request)
    {
        DB::connection()->enableQueryLog();

        $posted_bookings = Booking::
                leftjoin('quotations', 'bookings.id' ,'quotations.booking_id')
                ->select('bookings.*',DB::raw("count(quotations.booking_id) as count"),'quotations.user_id as agent_id')
                ->whereIn('bookings.status',[$request->status,'bidded']);

                // ->where('bookings.depart', '>=', date('Y-m-d'))
        if ($request->has('cab') && !empty($request->cab)) {
            $cab = $request->cab;
            $posted_bookings->whereIn('bookings.vehicle_type',explode(',', $request->cab));
        }

        if ($request->has('name') && !empty($request->name)) {
            $name = $request->name;
            $posted_bookings->where('bookings.booking_name', 'LIKE', "%$request->name%");
        }
        if ($request->has('location') && !empty($request->location)) {
            $location = $request->location;
            $posted_bookings->whereIn('bookings.id',explode(',', $request->location));
        }

        if ($request->has('category') && !empty($request->category)) {
            $category = $request->category;
            $posted_bookings->whereIn('bookings.booking_type',explode(',', $request->category));
        }

        $result = $posted_bookings->groupBy('bookings.id')
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
         ->where('bookings.user_id',$id)->where('bookings.status','!=','booked')->where('bookings.status','!=','awarded')->where('bookings.status','!=','cancelled')
         ->groupBy('bookings.id')
         ->latest('bookings.created_at')
         ->paginate(4);

         $queries = DB::getQueryLog();
         $last_query = end($queries);
        return $result;
    }

    public function getBookingsByAgentId(Request $request,$id)
    {
        DB::connection()->enableQueryLog();
         $result = Booking::
         join('quotations', 'bookings.id' ,'quotations.booking_id')
         ->select('bookings.id','bookings.from_places','bookings.to_places','bookings.created_at','bookings.depart','bookings.arrival','bookings.booking_type','bookings.no_of_adults','bookings.no_of_childrens','bookings.no_of_infants')
         ->where('quotations.user_id',$id)->where('bookings.status','!=','booked')->where('bookings.status','!=','cancelled')
         ->groupBy('bookings.id')
         ->latest('bookings.created_at')
         ->paginate(4);

         $queries = DB::getQueryLog();
         $last_query = end($queries);
        return $result;
    }

    public function getBookedBookingsByAgentId(Request $request,$id)
    {
        DB::connection()->enableQueryLog();
         $result = Booking::
         join('quotations', 'bookings.id' ,'quotations.booking_id')
         ->select('bookings.id','bookings.from_places','bookings.to_places','bookings.created_at','bookings.depart','bookings.arrival','bookings.booking_type','bookings.no_of_adults','bookings.no_of_childrens','bookings.no_of_infants')
         ->where('quotations.user_id',$id)->where('bookings.status','booked')
         ->groupBy('bookings.id')
         ->latest('bookings.created_at')
         ->paginate(4);

         $queries = DB::getQueryLog();
         $last_query = end($queries);
        return $result;
    }

    public function getCnceledBookingsByAgentId(Request $request,$id)
    {
        DB::connection()->enableQueryLog();
         $result = Booking::
         join('quotations', 'bookings.id' ,'quotations.booking_id')
         ->select('bookings.id','bookings.from_places','bookings.to_places','bookings.created_at','bookings.depart','bookings.arrival','bookings.booking_type','bookings.no_of_adults','bookings.no_of_childrens','bookings.no_of_infants')
         ->where('quotations.user_id',$id)->where('bookings.status','cancelled')
         ->groupBy('bookings.id')
         ->latest('bookings.created_at')
         ->paginate(4);

         $queries = DB::getQueryLog();
         $last_query = end($queries);
        return $result;
    }

    public function getBookingsByUserId(Request $request, $id)
    {
        $result = Booking::
         select('bookings.id','bookings.from_places','bookings.to_places','bookings.created_at','bookings.depart','bookings.arrival','bookings.booking_type','bookings.no_of_adults','bookings.no_of_childrens','bookings.no_of_infants')
         ->where('bookings.user_id',$id)->where('bookings.status','!=','booked')->where('bookings.status','!=','cancelled')
         ->groupBy('bookings.id')
         ->latest('bookings.created_at')
         ->paginate(4);
         return $result;
    }

    public function getBookedBookingsByUserId(Request $request, $id)
    {
        $result = Booking::
         select('bookings.id','bookings.from_places','bookings.to_places','bookings.created_at','bookings.depart','bookings.arrival','bookings.booking_type','bookings.no_of_adults','bookings.no_of_childrens','bookings.no_of_infants')
         ->where('bookings.user_id',$id)->where('bookings.status','booked')
         ->groupBy('bookings.id')
         ->latest('bookings.created_at')
         ->paginate(4);
         return $result;
    }

    public function getCnceledBookingsByUserId(Request $request, $id)
    {
        $result = Booking::
         select('bookings.id','bookings.from_places','bookings.to_places','bookings.created_at','bookings.depart','bookings.arrival','bookings.booking_type','bookings.no_of_adults','bookings.no_of_childrens','bookings.no_of_infants')
         ->where('bookings.user_id',$id)->where('bookings.status','cancelled')
         ->groupBy('bookings.id')
         ->latest('bookings.created_at')
         ->paginate(4);
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
         where('bookings.user_id',$id)->whereIn('bookings.status',['awarded','booked'])->count('id');

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

        $message = "<a href='/customer/profile/".$request->user_id."'> ".$user->name." </a> <span> posted a new booking </span> <a href='/booking-details/". $data_re->id."'>".$request->booking_name."</a>";

        Notice::create(['user_id' => $request->user_id, 'receiver_id' => 0, 'data' => $message , 'type' => 'job_post', 'created_at' => \Carbon\Carbon::now()]);

        return response()->json([
            'success' => true,
            'addresses' => '',
            'message' => 'Booking Saved successfully!'
        ], 201);
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
            ->select('bookings.*','quotations.payment_status','quotations.total_payment','quotation_details.inclusions','quotation_details.exclusions','quotations.id')
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

        $message = "<a href='/profile/".$user->id."'> ".$user->name." </a> <span> confirmed booking </span> <a href='/customer-booking/". $id."'>".$booking->booking_name."</a>";

        Notice::create(['user_id' => $user->id, 'receiver_id' => $booking->user_id, 'data' => $message , 'type' => 'booked', 'created_at' => \Carbon\Carbon::now()]);

        return 'saved';
    }

    public function cancelCustBooking(Request $request, $id)
    {
        $query = Booking::find($id);
        $query->cancellation_reason = $request->reason;
        $query->status = 'cancelled';
        $query->save();

        DB::table('quotations')
        ->where('id', $request->quotation_id)
        ->update(['status' => 'cancelled']);

        $booking = Booking::where('id',$id)->first();
        $quotation = Quotation::where('id',$request->quotation_id)->first();

        $paid_amount = $quotation->payment_first;
        foreach (json_decode($quotation->payments_status) as $key => $value) {
            if ($value == 'paid') {
               $paid_amount += $key;
            }
        }

        $user = User::where('id',$booking->user_id)->first();

        $returned_amt = $paid_amount-(($paid_amount*10)/100);
        $agent = User::where('id',$quotation->user_id)->first();
        $agent->withdraw($returned_amt);
        $user->deposit($returned_amt);

        $admin = User::where('id',1)->first();
        // $admin->withdraw((($paid_amount*10)/100));

        $message = "<a href='/profile/".$user->id."'> ".$user->name." </a> <span> cancelled booking </span> <a href='/cancelled-booking/".$id."'>".$booking->booking_name."</a>";

        Notice::create(['user_id' => $user->id, 'receiver_id' => $agent->id, 'data' => $message , 'type' => 'award', 'created_at' => \Carbon\Carbon::now()]);        

        $pay_message_agent = "Return Rs. $returned_amt to <a href='/profile/".$user->id."'> ".$user->name." </a> for cancelled booking <a href='/bookings/". $quotation->booking_id."'>".$booking->booking_name."</a>";

        UserTransaction::create(['user_id' => $user->id, 'receiver_id' =>  $agent->id, 'description' => $pay_message_agent , 'type' => 'withdraw' , 'amount' => $returned_amt]);

        $pay_message_to_customer = "received Rs. $returned_amt from <a href='/profile/".$agent->id."'> ".$agent->name." </a> for cancelled booking <a href='/bookings/". $quotation->booking_id."'>".$booking->booking_name."</a>";

        UserTransaction::create(['user_id' => $agent->id, 'receiver_id' =>  $user->id, 'description' => $pay_message_to_customer , 'type' => 'deposit' , 'amount' => $returned_amt]);

        $message_tra = "deposit for cancelled booking ".$booking->booking_name;
        WalletTransaction::create(['user_id' => $user->id, 'receiver_id' => $agent->id, 'booking_id' => $quotation->booking_id, 'transaction_id' => '', 'booking_name' => $booking->booking_name, 'amount' => $returned_amt , 'status' => 1 , 'type' => 'deposit', 'description' => $message_tra, 'created_at' => \Carbon\Carbon::now()]);
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

        $booking = Booking::where('id',$id)->first();
        $quotation = Quotation::where('id',$request->quotation_id)->first();


        $paid_amount = $quotation->payment_first;
        foreach (json_decode($quotation->payments_status) as $key => $value) {
            if ($value == 'paid') {
               $paid_amount += $key;
            }
        }

        $user = User::where('id',$booking->user_id)->first();

        $returned_amt = $paid_amount-(($paid_amount*10)/100);
        $user->deposit($returned_amt);
        $agent = User::where('id',$quotation->user_id)->first();
        $agent->withdraw($returned_amt);

        $admin = User::where('id',1)->first();
        // $admin->withdraw((($paid_amount*10)/100));

        $message = "<a href='/profile/".$agent->id."'> ".$agent->name." </a> <span> cancelled booking </span> <a href='/cancelled-booking/".$id."'>".$booking->booking_name."</a>";

        Notice::create(['user_id' => $quotation->user_id, 'receiver_id' => $booking->user_id, 'data' => $message , 'type' => 'quotation', 'created_at' => \Carbon\Carbon::now()]);        

        $pay_message_agent = "Return Rs. $returned_amt to <a href='/profile/".$user->id."'> ".$user->name." </a> for cancelled booking <a href='/bookings/". $quotation->booking_id."'>".$booking->booking_name."</a>";

        UserTransaction::create(['user_id' => $user->id, 'receiver_id' =>  $agent->id, 'description' => $pay_message_agent , 'type' => 'withdraw' , 'amount' => $returned_amt]);

        $pay_message_to_customer = "received Rs. $paid_amount from <a href='/profile/".$agent->id."'> ".$agent->name." </a> for cancelled booking <a href='/bookings/". $quotation->booking_id."'>".$booking->booking_name."</a>";

        UserTransaction::create(['user_id' => $agent->id, 'receiver_id' =>  $user->id, 'description' => $pay_message_to_customer , 'type' => 'deposit' , 'amount' => $paid_amount]);

        $message_tra = "deposit for cancelled booking ".$booking->booking_name;
        WalletTransaction::create(['user_id' => $user->id, 'receiver_id' => $agent->id, 'booking_id' => $quotation->booking_id, 'transaction_id' => '', 'booking_name' => $booking->booking_name, 'amount' => $paid_amount , 'status' => 1 , 'type' => 'deposit', 'description' => $message_tra, 'created_at' => \Carbon\Carbon::now()]);
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
