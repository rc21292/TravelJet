<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\SiteManagement;
use App\Helper;
use App\Page;
use App\User;
use App\Query;
use App\UserTransaction;
use Illuminate\Support\Facades\Schema;
use DB;
use App\Notice;

use Auth;
class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */

    public function index($id)
    {        
        $user = User::find($id)->first();
        $role = !empty($user) ? $user->role : ''; 
        $trader_count = User::where('role','admin')->count();
        $customer_count = User::where('role','customer')->count();
        $bookings = Query::where('status','posted')->count();
        $confirmed_bookings = Query::where('status','completed')->count();
        $transactions = UserTransaction::where('user_id' ,$id)->latest()->paginate(5);
        $users = User::whereNotIn('role',['admin'])->latest()->paginate(5);
        $notices = Notice::latest()->paginate(8);
        $notifications = Notice::latest()->take(5)->get();
        // $payouts = DB::table('payout_requests')->whereIn('status', ['Requested','Completed'])->orderBy('updated_at','desc')->paginate(9); 

        return response()->json([
            'success' => true,
            'user' => $user, 
            'role' => $role, 
            'trader_count' => $trader_count, 
            'customer_count' => $customer_count, 
            'bookings' => $bookings, 
            'confirmed_bookings' => $confirmed_bookings, 
            'transactions' => $transactions, 
            'users_data' => $users, 
            'notices' => $notices, 
            'notifications' => $notifications, 
        ], 200);     
    }

    public function admin()
    {
        if(Auth::check() && Auth::User()->role == 'admin'){
            return view('admin');
        }else{
            return redirect()->route('login');
        }
    }

    public function agent()
    {
        if(Auth::check() && Auth::User()->role == 'agent'){
            return view('agent');
        }else{
           return redirect()->route('login');
        }
    }

    public function customer()
    {
        if(Auth::check() && Auth::User()->role == 'customer'){
            return view('customer');
        }else
        {
            return redirect()->route('login');
        }
    }

    public function booknow()
    {
        if(Auth::check() && Auth::User()->role == 'customer'){
            return view('welcome');
        }else
        {
            return redirect()->guest('login');
        }
    }
    public function logout () {
        Auth()->logout();
        return redirect('/');
    }
}
