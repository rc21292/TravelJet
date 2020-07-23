<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\User;
use App\Profile;
use App\Query;
use Auth;
use DB;
use File;
use Storage;
use App\Helper;

class UserController extends Controller
{

    protected $user;
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */

    public function __construct(User $user)
    {
        $this->user = $user;
    }

    public function index()
    {
        $users = User::select("users.*",'role', DB::raw("DATE_FORMAT(users.created_at, '%d-%m-%Y') as created"))
        ->latest('users.created_at')->paginate(5);

         return response()->json([
            'success' => true,
            'users' => $users
        ], 201);    
    }

    function getProfile($id)
    {
        $profile = Profile::all()->where('user_id', $id)->first();
        $avtar = !empty($profile->avater) ? $profile->avater : '/profile.jpg';
        return response()->json($avtar);
    }


    public function insertImages11(Request $request)
    {
        if (!empty($request['image'])) 
        {
            $attachments = $request['image'];
            $path = 'uploads/users/temp/';
            return $this->uploadTempattachments($attachments, $path);
        }
    }


    public function insertImages(Request $request, $type = '')
    {

        // if (!empty($request['image'])) 
        // {
        //     $attachments = $request['image'];
        //     $path = 'uploads/users/temp/';
        //     return $this->uploadTempattachments($attachments, $path);
        // }


        $path = Helper::PublicPath() . '/uploads/users/temp/';
        if (!empty($request['image'])) {
            $profile_image = $request['image'];
            $image_size = array(
                'small' => array(
                    'width' => 36,
                    'height' => 36,
                ),
                'medium-small' => array(
                    'width' => 60,
                    'height' => 60,
                ),
                'medium' => array(
                    'width' => 100,
                    'height' => 100,
                ),
            );
            Helper::uploadTempImageWithSize($path, $profile_image, '', $image_size);
            return $profile_image->getClientOriginalName();;
        } else {
            Helper::uploadTempImage($path, $request->image);
            return $request->image->getClientOriginalName();;
        }
    }


    public function uploadTempattachments($uploadedFile, $path)
    {
        $filename = $uploadedFile->getClientOriginalName();
        if (!file_exists($path)) {
            File::makeDirectory($path, 0755, true, true);
        }
        Storage::disk('public')->putFileAs(
            $path,
            $uploadedFile,
            $filename
        );
        return $filename;
    }


    public function balance($user_id){
        $user = User::find($user_id);
        $balance = $user->balance; 
        return response()->json([
            'success' => true,
            'user_id' => $user_id,
            'balance' => $balance
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


    public function save_razorpay_details(Request $request){

        DB::table('user_razorpay_details')->insert(
                    [
                        'user_id' => $request->user_id,
                        'description' => 'credits Purchase vai Razorpay', 
                        'cost' => $request->amount,
                        'payment_id' => $request->payment_id,
                        "created_at" => \Carbon\Carbon::now(), 
                        'updated_at' => \Carbon\Carbon::now()
                    ]
                );
        $user = User::find($request->user_id);
        $user->deposit($request->amount);

         return response()->json([
            'success' => true,
            'messages' => 'Saved Sucess'
        ], 200);   
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
          $project = User::find($id);

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

         $user = User::find($id);
    
    // $user->slug = filter_var($request['name'], FILTER_SANITIZE_STRING);
        
        $user->name = filter_var($request['name'], FILTER_SANITIZE_STRING);
        $user->phone = $request['phone'];
        if (!empty($request['email'])) {
            $user->email = filter_var($request['email'], FILTER_SANITIZE_STRING);
        }
        $user->save();
        

        $user_profile = Profile::select('id')->where('user_id', $id)
            ->get()->first();
        if (!empty($user_profile->id)) {
            $profile = Profile::find($user_profile->id);
        } else {
            $profile = $this;
        }

        $old_path = Helper::PublicPath() . '/uploads/users/temp';
        if (!empty($request['avtar'])) {
            $filename = $request['avtar'];
            if (file_exists($old_path . '/' . $request['avtar'])) {
                $new_path = Helper::PublicPath() . '/uploads/users/' . $id;
                if (!file_exists($new_path)) {
                    File::makeDirectory($new_path, 0755, true, true);
                }
                $filename = time() . '-' . $request['avtar'];
                rename($old_path . '/' . $request['avtar'], $new_path . '/' . $filename);
                rename($old_path . '/small-' . $request['avtar'], $new_path . '/small-' . $filename);
                rename($old_path . '/medium-small-' . $request['avtar'], $new_path . '/medium-small-' . $filename);
                rename($old_path . '/medium-' . $request['avtar'], $new_path . '/medium-' . $filename);
                if (file_exists($old_path . '/listing-' . $request['avtar'])) {
                    rename($old_path . '/listing-' . $request['avtar'], $new_path . '/listing-' . $filename);
                }
            }
            $profile->avater = filter_var($filename, FILTER_SANITIZE_STRING);
        } else {
            $profile->avater = null;
        }


      
        $profile->save();
        return response()->json('success');
    }

    /**
      $old_path = '/uploads/users/temp';
        if (!empty($request['avtar'])) {
            // $filename = $request['avtar'];

            if (Storage::disk('public')->exists($old_path . '/' . $request['avtar'])) {
                $new_path = '/uploads/users/' . $id;
                if (!file_exists($new_path)) {
                    File::makeDirectory($new_path, 0755, true, true);
                }
                $filename = time() . '-' . $request['avtar'];

                Storage::disk('public')->move($old_path . '/' . $request['avtar'], $new_path . '/' . $filename);
                Storage::disk('public')->move($old_path . '/small-' . $request['avtar'], $new_path . '/small-' . $filename);
                Storage::disk('public')->move($old_path . '/medium-small-' . $request['avtar'], $new_path . '/medium-small-' . $filename);
                Storage::disk('public')->move($old_path . '/medium-' . $request['avtar'], $new_path . '/medium-' . $filename);
                if (file_exists($old_path . '/listing-' . $request['avtar'])) {
                    Storage::disk('public')->move($old_path . '/listing-' . $request['avtar'], $new_path . '/listing-' . $filename);
                $profile->avater = filter_var($filename, FILTER_SANITIZE_STRING);
                }
            }
        } else {
            $profile->avater = null;
        }
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
