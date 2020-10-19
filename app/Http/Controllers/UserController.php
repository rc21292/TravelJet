<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\User;
use App\Profile;
use App\Quotation;
use App\Query;
use App\AgentProfile;
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

    public function getAgents(Request $request)
    {
        $name = $request->input('name');
        $email = $request->input('email');
        $mobile = $request->input('mobile');
        $company = $request->input('company');

        DB::connection()->enableQueryLog();
        $user_s = User::leftjoin('agent_profiles','agent_profiles.user_id','users.id')->where('role', 'agent')->latest();

        if ($request->has('name') && !empty($request->name)) {
            $name = $request->name;
            $user_s->where('users.name','LIKE', '%'.$name.'%');
        }

        if ($request->has('email') && !empty($request->email)) {
            $email = $request->email;
            $user_s->where('users.email','LIKE', '%'.$email.'%');
        } 
        if ($request->has('mobile') && !empty($request->mobile)) {
            $mobile = $request->mobile;
            $user_s->where('users.phone','LIKE', '%'.$mobile.'%');
        } 

        if ($request->has('company') && !empty($request->company)) {
            $company = $request->company;
            $user_s->where('company','LIKE', '%'.$company.'%');
        } 

        $agents = $user_s->select('users.*','agent_profiles.company')->latest('users.id')->paginate(10);

        $queries = DB::getQueryLog();
        $last_query = end($queries);

        return response()->json([
            'success' => true,
            'agents' => $agents,
            'name' => $name,
            'email' => $email,
            'mobile' => $mobile,
            'company' => $company,
        ], 200);
    }


    public function deleteCustomer(request $request)
    {
        foreach ($request->all() as $customers) {
            if ($customers['isChecked'] && !empty($customers['isChecked'])) {
                // echo "<pre>";print_r(User::find($customers['id']));"</pre>";exit;
                User::find($customers['id'])->delete();
            }
        }

        return response()->json([
            'success' => "Customer Deleted Scessfully!",
        ], 200);
    }

    public function deleteAgent(request $request)
    {
        foreach ($request->all() as $agent) {
            if ($agent['isChecked'] && !empty($agent['isChecked'])) {
                User::find($agent['id'])->delete();
            }
        }

        return response()->json([
            'success' => "Agent Deleted Scessfully!",
        ], 200);
    }

    public function getCustomers(Request $request)
    {
        $name = $request->input('name');
        $email = $request->input('email');
        $mobile = $request->input('mobile');
        $source = $request->input('source');

        DB::connection()->enableQueryLog();
        $user_s = User::where('role', 'customer')->latest();

         if ($request->has('name') && !empty($request->name)) {
            $name = $request->name;
            $user_s->where('name','LIKE', '%'.$name.'%');
        }

        if ($request->has('email') && !empty($request->email)) {
            $email = $request->email;
            $user_s->where('email','LIKE', '%'.$email.'%');
        } 
        if ($request->has('mobile') && !empty($request->mobile)) {
            $mobile = $request->mobile;
            $user_s->where('phone','LIKE', '%'.$mobile.'%');
        } 

        $customers = $user_s->latest('users.created_at')->paginate(10);

        $customer_ids = $user_s->select('id')->latest('users.id')->paginate(10);

        foreach ($customers as $key => $value) {
            $customers[$key]['isChecked'] = 0;
        }

        $queries = DB::getQueryLog();
        $last_query = end($queries);

        return response()->json([
            'success' => true,
            'customers' => $customers,
            'customer_ids' => $customer_ids,
            'name' => $name,
            'email' => $email,
            'mobile' => $mobile,
        ], 200);
    }

    function getProfile($id)
    {
        $profile = Profile::all()->where('user_id', $id)->first();
        $avtar = !empty($profile->avater) ? $profile->avater : '/profile.jpg';
        return response()->json($avtar);
    }


    function getProfilePortfolio($id)
    {
        $user = DB::table('profile_portfolios')->where('user_id',$id)->limit(4)->latest()->get();
        return response()->json($user);
    }

    function getCancelReasons()
    {
        $user = DB::table('cancel_reasons')->latest()->get();
        return response()->json($user);
    }

    function getPortfolioById($id)
    {
        $user = DB::table('profile_portfolios')->where('id',$id)->first();
        return response()->json($user);
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



    public function saveAgentProfile(Request $request, $id)
    {
        $user = User::find($id);
        $user->name = $request->name;
        $user->email = $request->email;
        $user->phone = $request->phone;
        $user->save();

        if(isset($request->cinno_photo) && !empty($request->cinno_photo) && !is_string($request->cinno_photo)){
            $temp_path = Helper::PublicPath() . '/uploads/users/'.$id.'/documents/';
            if (!file_exists($temp_path)) {
                File::makeDirectory($temp_path, 0755, true, true);
            }
            $profile_image = $request->cinno_photo;
            $cinno_photo_name = $profile_image->getClientOriginalName();
            Helper::uploadProfileDocuments($temp_path, $request->cinno_photo,$cinno_photo_name,'');
        }else{
            $cinno_photo_name = empty($request->cinno_photo) ? '' : $request->cinno_photo;
        }

        if(isset($request->gstno_photo) && !empty($request->gstno_photo) && !is_string($request->gstno_photo)){
            $temp_path = Helper::PublicPath() . '/uploads/users/'.$id.'/documents/';
            if (!file_exists($temp_path)) {
                File::makeDirectory($temp_path, 0755, true, true);
            }
            $profile_image = $request->gstno_photo;
            $gstno_photo_name = $profile_image->getClientOriginalName();
            Helper::uploadProfileDocuments($temp_path, $request->gstno_photo,$gstno_photo_name,'');
        }else{
            $gstno_photo_name = empty($request->gstno_photo) ? '' : $request->gstno_photo;
        }

        if(isset($request->passport_size_photo) && !empty($request->passport_size_photo) && !is_string($request->passport_size_photo)){
            $temp_path = Helper::PublicPath() . '/uploads/users/'.$id.'/documents/';
            if (!file_exists($temp_path)) {
                File::makeDirectory($temp_path, 0755, true, true);
            }
            $profile_image = $request->passport_size_photo;
            $passport_size_photo_name = $profile_image->getClientOriginalName();
            Helper::uploadProfileDocuments($temp_path, $request->passport_size_photo,$passport_size_photo_name,'');
        }else{
            $passport_size_photo_name = empty($request->passport_size_photo) ? '' : $request->passport_size_photo;
        }

        if(isset($request->signature_photo) && !empty($request->signature_photo) && !is_string($request->signature_photo)){
            $temp_path = Helper::PublicPath() . '/uploads/users/'.$id.'/documents/';
            if (!file_exists($temp_path)) {
                File::makeDirectory($temp_path, 0755, true, true);
            }
            $profile_image = $request->signature_photo;
            $signature_photo_name = $profile_image->getClientOriginalName();
            Helper::uploadProfileDocuments($temp_path, $request->signature_photo,$signature_photo_name,'');
        }else{
            $signature_photo_name = empty($request->signature_photo) ? '' : $request->signature_photo;
        }

        if(isset($request->aadhar_front_photo) && !empty($request->aadhar_front_photo) && !is_string($request->aadhar_front_photo)){
            $temp_path = Helper::PublicPath() . '/uploads/users/'.$id.'/documents/';
            if (!file_exists($temp_path)) {
                File::makeDirectory($temp_path, 0755, true, true);
            }
            $profile_image = $request->aadhar_front_photo;
            $aadhar_front_photo_name = $profile_image->getClientOriginalName();
            Helper::uploadProfileDocuments($temp_path, $request->aadhar_front_photo,$aadhar_front_photo_name,'');
        }else{
            $aadhar_front_photo_name = empty($request->aadhar_front_photo) ? '' : $request->aadhar_front_photo;
        }


        if(isset($request->aadhar_back_photo) && !empty($request->aadhar_back_photo) && !is_string($request->aadhar_back_photo)){
            $temp_path = Helper::PublicPath() . '/uploads/users/'.$id.'/documents/';
            if (!file_exists($temp_path)) {
                File::makeDirectory($temp_path, 0755, true, true);
            }
            $profile_image = $request->aadhar_back_photo;
            $aadhar_back_photo_name = $profile_image->getClientOriginalName();
            Helper::uploadProfileDocuments($temp_path, $request->aadhar_back_photo,$aadhar_back_photo_name,'');
        }else{
            $aadhar_back_photo_name = empty($request->aadhar_back_photo) ? '' : $request->aadhar_back_photo;
        }

        if(isset($request->driving_license_front_photo) && !empty($request->driving_license_front_photo) && !is_string($request->driving_license_front_photo)){
            $temp_path = Helper::PublicPath() . '/uploads/users/'.$id.'/documents/';
            if (!file_exists($temp_path)) {
                File::makeDirectory($temp_path, 0755, true, true);
            }
            $profile_image = $request->driving_license_front_photo;
            $driving_license_front_photo_name = $profile_image->getClientOriginalName();
            Helper::uploadProfileDocuments($temp_path, $request->driving_license_front_photo,$driving_license_front_photo_name,'');
        }else{
            $driving_license_front_photo_name = empty($request->driving_license_front_photo) ? '' : $request->driving_license_front_photo;
        }

        if(isset($request->driving_license_back_photo) && !empty($request->driving_license_back_photo) && !is_string($request->driving_license_back_photo)){
            $temp_path = Helper::PublicPath() . '/uploads/users/'.$id.'/documents/';
            if (!file_exists($temp_path)) {
                File::makeDirectory($temp_path, 0755, true, true);
            }
            $profile_image = $request->driving_license_back_photo;
            $driving_license_back_photo_name = $profile_image->getClientOriginalName();
            Helper::uploadProfileDocuments($temp_path, $request->driving_license_back_photo,$driving_license_back_photo_name,'');
        }else{
            $driving_license_back_photo_name = empty($request->driving_license_back_photo) ? '' : $request->driving_license_back_photo;
        }

        if(isset($request->pancard_photo) && !empty($request->pancard_photo) && !is_string($request->pancard_photo)){
            $temp_path = Helper::PublicPath() . '/uploads/users/'.$id.'/documents/';
            if (!file_exists($temp_path)) {
                File::makeDirectory($temp_path, 0755, true, true);
            }
            $profile_image = $request->pancard_photo;
            $pancard_photo_name = $profile_image->getClientOriginalName();
            Helper::uploadProfileDocuments($temp_path, $request->pancard_photo,$pancard_photo_name,'');
        }else{
            $pancard_photo_name = empty($request->pancard_photo) ? '' : $request->pancard_photo;
        }

        if(isset($request->passport_front_photo) && !empty($request->passport_front_photo) && !is_string($request->passport_front_photo)){
            $temp_path = Helper::PublicPath() . '/uploads/users/'.$id.'/documents/';
            if (!file_exists($temp_path)) {
                File::makeDirectory($temp_path, 0755, true, true);
            }
            $profile_image = $request->passport_front_photo;
            $passport_front_photo_name = $profile_image->getClientOriginalName();
            Helper::uploadProfileDocuments($temp_path, $request->passport_front_photo,$passport_front_photo_name,'');
        }else{
            $passport_front_photo_name = empty($request->passport_front_photo) ? '' : $request->passport_front_photo;
        }

        if(isset($request->passport_back_photo) && !empty($request->passport_back_photo) && !is_string($request->passport_back_photo)){
            $temp_path = Helper::PublicPath() . '/uploads/users/'.$id.'/documents/';
            if (!file_exists($temp_path)) {
                File::makeDirectory($temp_path, 0755, true, true);
            }
            $profile_image = $request->passport_back_photo;
            $passport_back_photo_name = $profile_image->getClientOriginalName();
            Helper::uploadProfileDocuments($temp_path, $request->passport_back_photo,$passport_back_photo_name,'');
        }else{
            $passport_back_photo_name = empty($request->passport_back_photo) ? '' : $request->passport_back_photo;
        }

        if(isset($request->office_address_proof_photo) && !empty($request->office_address_proof_photo) && !is_string($request->office_address_proof_photo)){
            $temp_path = Helper::PublicPath() . '/uploads/users/'.$id.'/documents/';
            if (!file_exists($temp_path)) {
                File::makeDirectory($temp_path, 0755, true, true);
            }
            $profile_image = $request->office_address_proof_photo;
            $office_address_proof_photo_name = $profile_image->getClientOriginalName();
            Helper::uploadProfileDocuments($temp_path, $request->office_address_proof_photo,$office_address_proof_photo_name,'');
        }else{
            $office_address_proof_photo_name = empty($request->office_address_proof_photo) ? '' : $request->office_address_proof_photo;
        }

        if(isset($request->company_pancard_photo) && !empty($request->company_pancard_photo) && !is_string($request->company_pancard_photo)){
               $temp_path = Helper::PublicPath() . '/uploads/users/'.$id.'/documents/';
                if (!file_exists($temp_path)) {
                    File::makeDirectory($temp_path, 0755, true, true);
                }
               $profile_image = $request->company_pancard_photo;
               $company_pancard_photo_name = $profile_image->getClientOriginalName();
                Helper::uploadProfileDocuments($temp_path, $request->company_pancard_photo,$company_pancard_photo_name,'');
           }else{
            $company_pancard_photo_name = empty($request->company_pancard_photo) ? '' : $request->company_pancard_photo;
           }


        if(isset($request->office_address_proof_photo) && !empty($request->office_address_proof_photo) && !is_string($request->office_address_proof_photo)){
            $temp_path = Helper::PublicPath() . '/uploads/users/'.$id.'/documents/';
            if (!file_exists($temp_path)) {
                File::makeDirectory($temp_path, 0755, true, true);
            }
            $profile_image = $request->office_address_proof_photo;
            $office_address_proof_photo_name = $profile_image->getClientOriginalName();
            Helper::uploadProfileDocuments($temp_path, $request->office_address_proof_photo,$office_address_proof_photo_name,'');
        }else{
            $office_address_proof_photo_name = empty($request->office_address_proof_photo) ? '' : $request->office_address_proof_photo;
        }



        $data = $request->all();
        $agent = AgentProfile::where('user_id',$id)->first();

        if(!$agent){
            $agent_profile_data = AgentProfile::create($data);
            $agent_profile_id = $agent_profile_data->id;
        }
        if($agent){
            AgentProfile::where('user_id',$id)->update($data);
            $agent_profile_id = $id;
        }

        AgentProfile::where('user_id',$agent_profile_id)->update([
            'cinno_photo' => $cinno_photo_name,
            'gstno_photo' => $gstno_photo_name,
            'passport_size_photo' => $passport_size_photo_name,
            'signature_photo' => $signature_photo_name,
            'aadhar_front_photo' => $aadhar_front_photo_name,
            'aadhar_back_photo' => $aadhar_back_photo_name,
            'driving_license_front_photo' => $driving_license_front_photo_name,
            'driving_license_back_photo' => $driving_license_back_photo_name,
            'pancard_photo' => $pancard_photo_name,
            'passport_front_photo' => $passport_front_photo_name,
            'passport_back_photo' => $passport_back_photo_name,
            'company_pancard_photo' => $company_pancard_photo_name,
            'office_address_proof_photo' => $office_address_proof_photo_name,
            /*'profile' => $profile_name,
            */
        ]);

        $agent_profile = AgentProfile::where('user_id',$id);

        return response()->json([
            'success' => true,
            'data' => $agent_profile,
            'message' => 'Agent Profile Saved successfully!'
        ], 201);
    }



    public function getAgentProfile($id)
    {
        return $agent_profile = AgentProfile::where('user_id',$id)->first();

        return response()->json([
            'success' => true,
            'data' => $agent_profile,
            'message' => 'Bid Edited successfully!'
        ], 201);
    }


    public function insertPortfolio(Request $request)
    {
        $path = Helper::PublicPath() . '/uploads/users/portfolios/'.$request['user_id'];
        if (!empty($request['image'])) {
            $profile_image = $request['image'];
            $image_size = array(
                'medium' => array(
                    'width' => 700,
                    'height' => 600,
                ),              
            );
            $image_name = time().''.$profile_image->getClientOriginalName();
            Helper::uploadTempImageWithSize($path, $profile_image, $image_name, $image_size);

            $id = DB::table('profile_portfolios')->insertGetId(
                [
                    'user_id' => $request->user_id,
                    'title' => $request->title,
                    'image' => $image_name,
                    'detail' => $request->detail,
                    "created_at" => \Carbon\Carbon::now(), 
                    'updated_at' => \Carbon\Carbon::now()
                ]
            );
        } 
        return 'Success';
    }

    public function insertImages(Request $request)
    {
        $files = glob(Helper::PublicPath() . '/uploads/users/'.$request->user_id.'/'.$request->name.'/*');
        foreach($files as $file){
            if(is_file($file))
                unlink($file);
        }

        $path = Helper::PublicPath() . '/uploads/users/'.$request->user_id.'/'.$request->name;

        if (!empty($request['profile'])) {
            $profile_image = $request['profile'];
        }elseif (!empty($request['passport_size_photo'])) {
            $profile_image = $request['passport_size_photo'];
        }elseif (!empty($request['signature_photo'])) {
            $profile_image = $request['signature_photo'];
        }elseif (!empty($request['business_logo'])) {
            $profile_image = $request['business_logo'];
        }
        $image_size = array(
            'small' => array(
                'width' => 100,
                'height' => 100,
            ),
            'medium' => array(
                'width' => 160,
                'height' => 160,
            ),
        );
        Helper::uploadTempImageWithSize($path, $profile_image, '', $image_size);
        return $profile_image->getClientOriginalName();
        
    }

    public function deletePortfolioImage($id)
    {
        DB::table('profile_portfolio_images')->where('id', $id)->delete();

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


    public function save_razorpay_details(Request $request) 
    {
        $messages = ($request->for = 'Booking') ? 'Booking vai Razorpay' : 'credits Purchase vai Razorpay' ;

        DB::table('user_razorpay_details')->insert(
                    [
                        'user_id' => $request->user_id,
                        'description' => $messages, 
                        'cost' => $request->amount,
                        'payment_id' => $request->payment_id,
                        "created_at" => \Carbon\Carbon::now(), 
                        'updated_at' => \Carbon\Carbon::now()
                    ]
                );
        $user = User::find($request->user_id);
        //$user->deposit($request->amount);

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

    public function getCustomerDetails($id)
    {
        return $user = User::leftjoin('user_profiles','user_profiles.user_id','users.id')->where('users.id',$id)->select('users.*','user_profiles.address','user_profiles.pincode','user_profiles.city','user_profiles.state')->first();

        return $user->toJson();
    }


    public function getAgentDetails($id)
    {
        return $user = User::leftjoin('agent_profiles','agent_profiles.user_id','users.id')->where('users.id',$id)->select('users.*','agent_profiles.address','agent_profiles.pincode','agent_profiles.city','agent_profiles.state','agent_profiles.company','agent_profiles.father_name','agent_profiles.dob','agent_profiles.birth_place','agent_profiles.category','agent_profiles.account_number','agent_profiles.beneficiary_name','agent_profiles.branch_ifsc_code','agent_profiles.bank_name')->first();

        return $user->toJson();
    }


    public function agenProfile($id)
    {
        $agent = AgentProfile::where('user_id',$id)->first();

        if ($agent) {
            return $agent->toJson();
        }
        return '';

        
    }

    public function countSoldTrips($id)
    {
        return $agent = Quotation::where('user_id',$id)->where('status','completed')->count();
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


    public function updateAgentProfile(Request $request, $id)
    {
         $user = User::find($id);

        $user_profile = AgentProfile::select('id')->where('user_id', $id)->first();
        if (!empty($user_profile->id)) {
            $profile = AgentProfile::find($user_profile->id);
        } else {
            $profile = $this;
        }

        $old_path = Helper::PublicPath() . '/uploads/users/temp';
        if ($request['name'] == 'profile') {
            $filename = $request['image'];
            $profile->profile = filter_var($filename, FILTER_SANITIZE_STRING);
        } else if ($request['name'] == 'passport_size_photo') {
            $filename = $request['image'];
            $profile->passport_size_photo = filter_var($filename, FILTER_SANITIZE_STRING);
        } else if ($request['name'] == 'signature_photo') {
            $filename = $request['image'];
            $profile->signature_photo = filter_var($filename, FILTER_SANITIZE_STRING);
        } else if ($request['name'] == 'business_logo') {
            $filename = $request['image'];
            $profile->business_logo = filter_var($filename, FILTER_SANITIZE_STRING);
        }

        $profile->save();
        return response()->json($filename);
    }

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
        

        /*$user_profile = Profile::select('id')->where('user_id', $id)
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


      
        $profile->save();*/
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
