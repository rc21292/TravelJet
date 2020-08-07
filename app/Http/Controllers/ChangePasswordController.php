<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\User;
use Auth;
use Illuminate\Support\Facades\DB;
use App\Rules\MatchOldPassword;
use Illuminate\Support\Facades\Hash;

class ChangePasswordController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
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
    public function store(Request $request, $id)
    {
        $request->validate([
            'oldPassword' => ['required'],
            'newPassword' => ['required'],
            'confirmPassword' => ['required'],
        ]);

        $user = User::where('id',$id)->first();

        if (Hash::check($request->oldPassword, $user->password)) {
            if($request->newPassword != $request->confirmPassword){
                return response()->json([
                    'success' => false,
                    'message' => 'new password and confirm password does not match!'
                ], 200);   
            }else{
               $user_id = $id;                       
               $obj_user = User::find($user_id);
               $obj_user->password = Hash::make($request['newPassword']);
               $obj_user->save(); 

                return response()->json([
                    'success' => true,
                    'message' => 'password chnaged successfully!'
                ], 200);   
            }
        }else{
            return response()->json([
                'success' => false,
                'message' => 'current password does not match!'
            ], 200);   
        }
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
