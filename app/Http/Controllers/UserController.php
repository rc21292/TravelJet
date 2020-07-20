<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\User;
use App\Query;
use Auth;
use DB;

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
        $customer_count = User::join('roles','roles.id','=','users.role')->where('roles.id','=',2)->count();
        $agent_count = User::join('roles','roles.id','=','users.role')->where('roles.id','=',3)->count();
        $job_posted_count = Query::where('status','!=','cancelled')->count();
        $users = User::join('roles','roles.id','=','users.role')
        ->select("users.*",'roles.name as role_name', DB::raw("DATE_FORMAT(users.created_at, '%d-%m-%Y') as created"))
        ->latest('users.created_at')->paginate(1);

         return response()->json([
            'success' => true,
            'users' => $users,
            'customer_count' => $customer_count,
            'agent_count' => $agent_count,
            'job_posted_count' => $job_posted_count,
        ], 201);    
    }


    public function insertImages(Request $request){

          
            if($request->image == NULL){
            return response()->json("Error!");
        }else{
            $material_array = [];
            $namefile = '_'.time().'.png';

             $imageName = time().'.'.$request->image->extension();     

            if(($request->image->move(public_path('images'), $imageName))){
            }else{
                return response()->json("Error!");
            }

            DB::beginTransaction();
            $material_array = array();
            try{
                $material_array[0] = [
                    'filepath' => $imageName
                ];
                //User::update($material_array);
                DB::commit();
                return response()->json(true);
            } catch (\Exception $e) {
                DB::rollback();
                Log::error($e->getMessage());
                return response()->json($e->getMessage());
            }
        }
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
