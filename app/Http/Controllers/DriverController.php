<?php

namespace App\Http\Controllers;

use App\Driver;
use Illuminate\Http\Request;
use DB;
use File;
use App\Helper;

class DriverController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index($user_id)
    {
        return Driver::where('user_id',$user_id)->latest()->get();
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
    public function store(Request $request, $user_id)
    {
        Driver::where('user_id',$user_id)->delete();
        for ($i = 0; $i < count($request->name); $i++) 
        {    
            if(isset($request->licence_photo[$i]) && !empty($request->licence_photo[$i])){

               $temp_path = Helper::PublicPath() . '/drivers/'.$user_id;
                if (!file_exists($temp_path)) {
                    File::makeDirectory($temp_path, 0755, true, true);
                }
               $profile_image = $request->licence_photo[$i];
               $image_name = time().''.$profile_image->getClientOriginalName();
                Helper::uploadDriversImage($temp_path, $request->licence_photo[$i],$image_name,'');
               $fname = 'driver_'.$user_id.'_'.time();
               $destination = public_path() . '/drivers/'.$user_id.'/'. $fname;
             
              $location = $request->licence_photo[$i];
               // move_uploaded_file($location, $destination);
           }else{
            $fname = null;
           }
           DB::table('drivers')->insert([
                "user_id"=>$user_id,
                "name"=>$request->name[$i],
                "mobile"=>$request->mobile[$i],
                "driving_licence"=>$request->driving_licence[$i],
                "licence_photo"=>$image_name,
            ]);
        }

       return "success";
   }

    /**
     * Display the specified resource.
     *
     * @param  \App\Driver  $driver
     * @return \Illuminate\Http\Response
     */
    public function show(Driver $driver)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Driver  $driver
     * @return \Illuminate\Http\Response
     */
    public function edit(Driver $driver)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Driver  $driver
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Driver $driver)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Driver  $driver
     * @return \Illuminate\Http\Response
     */
    public function destroy(Driver $driver)
    {
        //
    }
}
