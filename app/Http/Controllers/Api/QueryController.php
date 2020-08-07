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
    public function index()
    {
        $result = Query::paginate(5);
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

        $project = Query::find($id);

        return $project->toJson();
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
        $query = Query::find($id);
        $query->delete();
    }
}
