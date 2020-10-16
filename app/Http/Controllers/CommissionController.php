<?php

namespace App\Http\Controllers;

use App\Commission;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use DB;

class CommissionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $id = 1;
        $booking_type = $request->input('booking_type');
        $agent = $request->input('agent');
        $destination = $request->input('destination');
        $source = $request->input('source');

        DB::connection()->enableQueryLog();
        $commission_s = Commission::where('receiver_id', $id)->join('bookings','bookings.id','commissions.booking_id')->join('users','users.id','commissions.user_id')->latest();

        if ($request->has('booking_type') && !empty($request->booking_type)) {
            $booking_type = $request->booking_type;
            $commission_s->where('booking_type',$booking_type);
        }

        if ($request->has('agent') && !empty($request->agent)) {
            $agent = $request->agent;
            $commission_s->where('users.name','LIKE', '%'.$agent.'%');
        } 
        if ($request->has('destination') && !empty($request->destination)) {
            $destination = $request->destination;
            $commission_s->where('to_places','LIKE', '%'.$destination.'%');
        } 
        if ($request->has('source') && !empty($request->source)) {
            $source = $request->source;
            $commission_s->where('from_places','LIKE', '%'.$source.'%');
        }

        $commissions = $commission_s->select('commissions.*','users.name as agent','bookings.booking_type','bookings.depart','bookings.from_places','bookings.to_places')->paginate(10);

        $queries = DB::getQueryLog();
        $last_query = end($queries);

        return response()->json([
            'success' => true,
            'commissions' => $commissions,
            'booking_type' => $booking_type,
            'agent' => $agent,
            'destination' => $destination,
            'source' => $source,
        ], 200);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
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
     * @param  \App\Commission  $commission
     * @return \Illuminate\Http\Response
     */
    public function show(Commission $commission)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Commission  $commission
     * @return \Illuminate\Http\Response
     */
    public function edit(Commission $commission)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Commission  $commission
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Commission $commission)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Commission  $commission
     * @return \Illuminate\Http\Response
     */
    public function destroy(Commission $commission)
    {
        //
    }
}
