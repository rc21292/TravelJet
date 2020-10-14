<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\SiteManagement;
use App\Helper;
use App\Page;
use App\User;
use App\Booking;
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

    public function getAdminDashboardData()
    {        
        $user = User::find(1)->first();
        $role = !empty($user) ? $user->role : ''; 
        $trader_count = User::where('role','agent')->count();
        $customer_count = User::where('role','customer')->count();
        $total_commission = UserTransaction::where('receiver_id' ,1)->sum('amount');
        $bookings = Booking::where('status','posted')->count();
        $confirmed_bookings = Booking::where('status','booked')->count();
        $transactions = UserTransaction::where('receiver_id' ,1)->latest()->paginate(5);
        $payouts = DB::table('payout_requests')->join('users','users.id','payout_requests.user_id')->select('payout_requests.*','users.name')->whereIn('status', ['Requested','Completed'])->paginate(4);

        return response()->json([
            'success' => true,
            'user' => $user, 
            'role' => $role, 
            'trader_count' => $trader_count, 
            'customer_count' => $customer_count, 
            'total_commission' => $total_commission, 
            'bookings' => $bookings, 
            'confirmed_bookings' => $confirmed_bookings, 
            'payouts' => $payouts,
            'transactions' => $transactions
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
        return view('welcome');
        
        /*if(Auth::check() && Auth::User()->role == 'customer'){
            return view('welcome');
        }else
        {
            return redirect()->guest('login');
        }*/
    }
    public function logout () {
        Auth()->logout();
        return redirect('/');
    }
}
