<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Query;
use App\Booking;
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
             $result = Booking::
                     join('quotations', 'bookings.id' ,'quotations.booking_id')
                     ->select('bookings.*','quotations.payment')
                     ->where('quotations.status','pending')
                     ->where('quotations.user_id',$id)
                     ->paginate(6);
        }else if($request->type == 'booking'){
            $result = Booking::
                     join('quotations', 'bookings.id' ,'quotations.booking_id')
                     ->select('bookings.*',DB::raw("count(quotations.booking_id) as count"))
                     ->where('quotations.status','awarded')->where('bookings.status','!=','posted')
                     ->where('quotations.user_id',$id)
                     ->paginate(6);
        }else if($request->type == 'booked'){
            $result = Booking::
                     join('quotations', 'bookings.id' ,'quotations.booking_id')
                     ->select('bookings.*',DB::raw("count(quotations.booking_id) as count"))
                     ->where('bookings.status','booked')->where('bookings.status','booked')
                     ->where('quotations.user_id',$id)
                     ->paginate(6);
        }else{
            $result = Booking::where('user_id',$id)->paginate(5);
        }
        return $result;
    }

    public function getQueries(Request $request)
    {
        // DB::connection()->enableQueryLog();

         $result = Booking::
         leftjoin('quotations', 'bookings.id' ,'quotations.booking_id')
         ->select('bookings.*',DB::raw("count(quotations.booking_id) as count"))
         ->where('bookings.status',$request->status)->where('bookings.status','!=','booked')
         ->groupBy('bookings.id')
         ->paginate(6);

         // $queries = DB::getQueryLog();
         // $last_query = end($queries);
        return $result;
    }

    public function getQueriesByUserId(Request $request,$id)
    {
        DB::connection()->enableQueryLog();

         $result = Booking::
         join('quotations', 'bookings.id' ,'quotations.booking_id')
         ->select('bookings.booking_name','bookings.id','quotations.created_at as date')
         ->where('bookings.user_id',$id)->where('bookings.status','!=','booked')
         ->groupBy('bookings.id')
         ->paginate(6);

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
    public function show($id)
    {

        $project = Booking::find($id);

        return $project;
    }


     public function getStopagesData($id)
     {

        $project = Booking::select('stopeges')->find($id);

        $stopages = "";

        $kay_first = array_key_first(json_decode($project->stopeges));
        $kay_last = array_key_last(json_decode($project->stopeges));

        $data_arr = array();

        foreach (json_decode($project->stopeges) as $key => $value) {
                array_push($data_arr, $value->stopage);
           
        }


        return response()->json([
            'success' => true,
            'stopages' => $data_arr,
        ], 200);  

    }


     public function getStopages($id)
     {

        $project = Booking::select('stopeges')->find($id);

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


        return response()->json([
            'success' => true,
            'stopages' => $stopages,
        ], 200);  

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
        $query = Query::find($id);
        $query->user_id = '4';
        $query->booking_type = $request->booking_type;
        $query->start_at = $request->start_at;
        $query->end_on = $request->end_on;
        $query->pick_up = $request->pick_up;
        if($request->booking_type == 'Round Trip'){
        $query->drop_on = $request->pick_up;
        $query->destination = $request->destination;
        $query->sightseeing = 'No';
        }elseif($request->booking_type == 'Round Trip with Sightseeing'){
        $query->drop_on = $request->drop_on;
        $query->destination = $request->destination;
        $query->sightseeing = 'Yes';
        }else{
        $query->drop_on = $request->destination;
        $query->destination = $request->destination;
        $query->sightseeing = 'No';
        }
        $query->persons = $request->persons;
        $query->cab_type = $request->cab_type;
        $query->book_in = $request->book_in;
        $query->budget = $request->budget;
        $query->description = $request->description;
        $query->save();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $query = Booking::find($id);
        $query->delete();
    }


    public function cancel($id)
    {
        $query = Booking::find($id);
        $query->status = 'cancelled';
        $query->save();
        $project = Booking::find($id);
        return $project;
    }

}
