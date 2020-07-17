<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Auth;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index()
    {

        if(Auth::User()->role == 'admin'){
        return view('admin');
        }

        if(Auth::User()->role == 'agent'){
        return view('agent');
        }

        if(Auth::User()->role == 'customer'){
        return view('customer');
        }
    }
    public function logout () {
    //logout user
    Auth()->logout();
    // redirect to homepage
    return redirect('/');
}
}
