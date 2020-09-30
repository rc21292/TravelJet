<?php

namespace App\Http\Controllers;

use App\Vehicle;
use App\Helper;
use DB;
use File;
use Illuminate\Http\Request;

class VehicleController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index($user_id)
    {
        return Vehicle::where('user_id',$user_id)->get();
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
        for ($i = 0; $i < count($request->vehicle_type); $i++) 
        {  
            if (($request->id[$i] != '') && !empty($request->id[$i])) {
                array_push($ids, $request->id[$i]);
            }
        }

        $vehicle_data = Vehicle::where('user_id',$user_id)->whereNotIn('id', $ids)->get();
        foreach ($vehicle_data->toArray() as $key => $value) {

            if (!empty($value['number_plate_photo'])) {
                if(file_exists(Helper::PublicPath() . '/vehicles/'.$user_id.'/'.$value['number_plate_photo'])){
                    unlink(Helper::PublicPath() . '/vehicles/'.$user_id.'/'.$value['number_plate_photo']);
                }
            }
            if (!empty($value['registration_copy_photo'])) {
                if(file_exists(Helper::PublicPath() . '/vehicles/'.$user_id.'/'.$value['registration_copy_photo'])){
                    unlink(Helper::PublicPath() . '/vehicles/'.$user_id.'/'.$value['registration_copy_photo']);
                }
            }
            if (!empty($value['insurance_photo'])) {
                if(file_exists(Helper::PublicPath() . '/vehicles/'.$user_id.'/'.$value['insurance_photo'])){
                    unlink(Helper::PublicPath() . '/vehicles/'.$user_id.'/'.$value['insurance_photo']);
                }
            }
            if (!empty($value['fitness_certificate_photo'])) {
                if(file_exists(Helper::PublicPath() . '/vehicles/'.$user_id.'/'.$value['fitness_certificate_photo'])){
                    unlink(Helper::PublicPath() . '/vehicles/'.$user_id.'/'.$value['fitness_certificate_photo']);
                }
            }
            if (!empty($value['lease_paper_photo'])) {
                if(file_exists(Helper::PublicPath() . '/vehicles/'.$user_id.'/'.$value['lease_paper_photo'])){
                    unlink(Helper::PublicPath() . '/vehicles/'.$user_id.'/'.$value['lease_paper_photo']);
                }
            }
        }
        Vehicle::where('user_id',$user_id)->whereNotIn('id', $ids)->delete();

        for ($i = 0; $i < count($request->vehicle_type); $i++) 
        {    
            if(isset($request->number_plate_photo[$i]) && !empty($request->number_plate_photo[$i]) && !is_string($request->number_plate_photo[$i])){
                $temp_path = Helper::PublicPath() . '/vehicles/'.$user_id;
                if (!file_exists($temp_path)) {
                    File::makeDirectory($temp_path, 0755, true, true);
                }
                $profile_image = $request->number_plate_photo[$i];
                $image_name = 'vehicle_'.$user_id.'_'.time().''.$profile_image->getClientOriginalName();
                Helper::uploadVehiclesImage($temp_path, $request->number_plate_photo[$i],$image_name,'');
                $number_plate_photo_name = $image_name;
            }else{
                $number_plate_photo_name = empty($request->number_plate_photo[$i]) ? '' : $request->number_plate_photo[$i];
            }

            if(isset($request->registration_copy_photo[$i]) && !empty($request->registration_copy_photo[$i]) && !is_string($request->registration_copy_photo[$i])){

                $temp_path = Helper::PublicPath() . '/vehicles/'.$user_id;
                if (!file_exists($temp_path)) {
                    File::makeDirectory($temp_path, 0755, true, true);
                }
                $profile_image = $request->registration_copy_photo[$i];
                $image_name = 'vehicle_'.$user_id.'_'.time().''.$profile_image->getClientOriginalName();
                Helper::uploadVehiclesImage($temp_path, $request->registration_copy_photo[$i],$image_name,'');
                $registration_copy_photo_name = $image_name;
            }else{
                $registration_copy_photo_name = empty($request->registration_copy_photo[$i]) ? '' : $request->registration_copy_photo[$i];
            }


            if(isset($request->insurance_photo[$i]) && !empty($request->insurance_photo[$i])  && !is_string($request->insurance_photo[$i])){

                $temp_path = Helper::PublicPath() . '/vehicles/'.$user_id;
                if (!file_exists($temp_path)) {
                    File::makeDirectory($temp_path, 0755, true, true);
                }
                $profile_image = $request->insurance_photo[$i];
                $image_name = 'vehicle_'.$user_id.'_'.time().''.$profile_image->getClientOriginalName();
                Helper::uploadVehiclesImage($temp_path, $request->insurance_photo[$i],$image_name,'');
                $insurance_photo_name = $image_name;
            }else{
                $insurance_photo_name = empty($request->insurance_photo[$i]) ? '' : $request->insurance_photo[$i];
            }

            if(isset($request->route_permit_photo[$i]) && !empty($request->route_permit_photo[$i]) && !is_string($request->route_permit_photo[$i])){

                $temp_path = Helper::PublicPath() . '/vehicles/'.$user_id;
                if (!file_exists($temp_path)) {
                    File::makeDirectory($temp_path, 0755, true, true);
                }
                $profile_image = $request->route_permit_photo[$i];
                $image_name = 'vehicle_'.$user_id.'_'.time().''.$profile_image->getClientOriginalName();
                Helper::uploadVehiclesImage($temp_path, $request->route_permit_photo[$i],$image_name,'');
                $route_permit_photo_name = $image_name;
            }else{
                $route_permit_photo_name = empty($request->route_permit_photo[$i]) ? '' : $request->route_permit_photo[$i];
            }


            if(isset($request->fitness_certificate_photo[$i]) && !empty($request->fitness_certificate_photo[$i]) && !is_string($request->fitness_certificate_photo[$i])){

                $temp_path = Helper::PublicPath() . '/vehicles/'.$user_id;
                if (!file_exists($temp_path)) {
                    File::makeDirectory($temp_path, 0755, true, true);
                }
                $profile_image = $request->fitness_certificate_photo[$i];
                $image_name = 'vehicle_'.$user_id.'_'.time().''.$profile_image->getClientOriginalName();
                Helper::uploadVehiclesImage($temp_path, $request->fitness_certificate_photo[$i],$image_name,'');
                $fitness_certificate_photo_name = $image_name;
            }else{
                $fitness_certificate_photo_name = empty($request->fitness_certificate_photo[$i]) ? '' : $request->fitness_certificate_photo[$i];
            }

            if(isset($request->lease_paper_photo[$i]) && !empty($request->lease_paper_photo[$i]) && !is_string($request->lease_paper_photo[$i])){

                $temp_path = Helper::PublicPath() . '/vehicles/'.$user_id;
                if (!file_exists($temp_path)) {
                    File::makeDirectory($temp_path, 0755, true, true);
                }
                $profile_image = $request->lease_paper_photo[$i];
                $image_name = 'vehicle_'.$user_id.'_'.time().''.$profile_image->getClientOriginalName();
                Helper::uploadVehiclesImage($temp_path, $request->lease_paper_photo[$i],$image_name,'');
                $lease_paper_photo_name = $image_name;
            }else{
                $lease_paper_photo_name = empty($request->lease_paper_photo[$i]) ? '' : $request->lease_paper_photo[$i];
            }

            if (isset($request->id[$i]) && !empty($request->id[$i])) {
                DB::table('vehicles')
                ->where('id', $request->id[$i])
                ->update([
                    "user_id"=>$user_id,
                    "vehicle_type"=>$request->vehicle_type[$i],
                    "vehicle_model"=>$request->vehicle_model[$i],
                    "vehicle_number"=>$request->vehicle_number[$i],
                    "number_plate_photo"=>$number_plate_photo_name,
                    "registration_copy_photo"=>$registration_copy_photo_name,
                    "insurance_photo"=>$insurance_photo_name,
                    "route_permit_photo"=>$route_permit_photo_name,
                    "fitness_certificate_photo"=>$fitness_certificate_photo_name,
                    "lease_paper_photo"=>$lease_paper_photo_name,
                ]);
            }else{


                DB::table('vehicles')->insert([
                    "user_id"=>$user_id,
                    "vehicle_type"=>$request->vehicle_type[$i],
                    "vehicle_model"=>$request->vehicle_model[$i],
                    "vehicle_number"=>$request->vehicle_number[$i],
                    "number_plate_photo"=>$number_plate_photo_name,
                    "registration_copy_photo"=>$registration_copy_photo_name,
                    "insurance_photo"=>$insurance_photo_name,
                    "route_permit_photo"=>$route_permit_photo_name,
                    "fitness_certificate_photo"=>$fitness_certificate_photo_name,
                    "lease_paper_photo"=>$lease_paper_photo_name,
                ]);
            }
        }
        return "success";
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Vehicle  $vehicle
     * @return \Illuminate\Http\Response
     */
    public function show(Vehicle $vehicle)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Vehicle  $vehicle
     * @return \Illuminate\Http\Response
     */
    public function edit(Vehicle $vehicle)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Vehicle  $vehicle
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Vehicle $vehicle)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Vehicle  $vehicle
     * @return \Illuminate\Http\Response
     */
    public function destroy(Vehicle $vehicle)
    {
        //
    }
}
