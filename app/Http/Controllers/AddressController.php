<?php

namespace App\Http\Controllers;

use App\Address;
use App\AgentProfile;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class AddressController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index($id)
    {
        $addresses = Address::where('user_id' , $id)->latest()->get();

        return response()->json([
            'addresses' => $addresses
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
    public function store(Request $request,$id)
    {
        // echo "<pre>";print_r($request->all());"</pre>";exit;
        Address::create($request->all());

        $addresses = Address::where('user_id' , $id)->latest()->get();


        return response()->json([
            'success' => true,
            'addresses' => $addresses,
            'message' => 'Address Saved successfully!'
        ], 201);  

    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Address  $address
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return $addresses = Address::where('user_id' , $id)->latest()->first();
    }


    public function getAgentAddresses($id)
    {
        return $addresses = AgentProfile::select('address','business_type','business_logo','company','name')->where('user_id' , $id)->first();
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Address  $address
     * @return \Illuminate\Http\Response
     */
    public function edit(Address $address)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Address  $address
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Address $address)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Address  $address
     * @return \Illuminate\Http\Response
     */
    public function destroy(Address $address)
    {
        //
    }
}
