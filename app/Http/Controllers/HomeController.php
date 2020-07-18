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

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
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
            return redirect()->route('login');
        }
    }
    public function logout () {
        Auth()->logout();
        return redirect('/');
    }
}
