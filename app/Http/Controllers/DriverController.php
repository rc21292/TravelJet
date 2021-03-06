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
        return Driver::where('user_id',$user_id)->get();
    }


    public function getDriverNames($user_id)
    {
        return Driver::where('user_id',$user_id)->pluck('name');
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
        $ids = array(); 
        for ($i = 0; $i < count($request->name); $i++) 
        {  
            if (($request->id[$i] != '') && !empty($request->id[$i])) {
                array_push($ids, $request->id[$i]);
            }
        }

        $driver_data = Driver::where('user_id',$user_id)->whereNotIn('id', $ids)->get();
        foreach ($driver_data->toArray() as $key => $value) {

            if (!empty($value['licence_photo'])) {
                if(file_exists(Helper::PublicPath() . '/drivers/'.$user_id.'/'.$value['licence_photo'])){
                    unlink(Helper::PublicPath() . '/drivers/'.$user_id.'/'.$value['licence_photo']);
                }
            }
        }

        Driver::where('user_id',$user_id)->whereNotIn('id', $ids)->delete();

        for ($i = 0; $i < count($request->name); $i++) 
        {    
            if(isset($request->licence_photo[$i]) && !empty($request->licence_photo[$i]) && !is_string($request->licence_photo[$i])){

               $temp_path = Helper::PublicPath() . '/drivers/'.$user_id;
                if (!file_exists($temp_path)) {
                    File::makeDirectory($temp_path, 0755, true, true);
                }
               $profile_image = $request->licence_photo[$i];
               $image_name = 'driver_'.$user_id.'_'.time().''.$profile_image->getClientOriginalName();
                Helper::uploadDriversImage($temp_path, $request->licence_photo[$i],$image_name,'');
           }else{
            $image_name = empty($request->licence_photo[$i]) ? '' : $request->licence_photo[$i];
           }

           if (isset($request->id[$i]) && !empty($request->id[$i])) {
                DB::table('drivers')
                ->where('id', $request->id[$i])
                ->update([
                   "user_id"=>$user_id,
                "name"=>$request->name[$i],
                "mobile"=>$request->mobile[$i],
                "driving_licence"=>$request->driving_licence[$i],
                "licence_photo"=>$image_name,
                ]);
            }else{
               DB::table('drivers')->insert([
                "user_id"=>$user_id,
                "name"=>$request->name[$i],
                "mobile"=>$request->mobile[$i],
                "driving_licence"=>$request->driving_licence[$i],
                "licence_photo"=>$image_name,
            ]);
            }           
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

    public function getDriversByAgentId(Request $request, $id)
    {
        $name = $request->input('name');
        $licence = $request->input('licence');
        $number = $request->input('number');
        $status = $request->input('status');

        DB::connection()->enableQueryLog();
        $drivers = Driver::where('user_id', $id)->latest();

        if ($request->has('name') && !empty($request->name)) {
            $name = $request->name;
            $drivers->where('name','LIKE', '%'.$name.'%');
        }

        if ($request->has('licence') && !empty($request->licence)) {
            $licence = $request->licence;
            $drivers->where('driving_licence','LIKE', '%'.$licence.'%');
        }

        if ($request->has('number') && !empty($request->number)) {
            $number = $request->number;
            $drivers->where('mobile','LIKE', '%'.$number.'%');
        }

        if ($request->has('status') && !empty($request->status)) {
            $status = $request->status;
            $drivers->where('status','LIKE', '%'.$status.'%');
        } 

        return $drivers->paginate(10);
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
