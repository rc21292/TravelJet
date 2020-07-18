<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Providers\RouteServiceProvider;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;
class LoginController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles authenticating users for the application and
    | redirecting them to your home screen. The controller uses a trait
    | to conveniently provide its functionality to your applications.
    |
    */

    use AuthenticatesUsers;

    /**
     * Where to redirect users after login.
     *
     * @var string
     */

    public function redirectTo(){
        
        $urlintended = null;

        $urlintended = Session::get('url.intended'); 
        
        $role = Auth::user()->role;

        if($role == "admin"){

            return '/admin';

        }else if($role == "agent"){

            return '/agent';

        }else if($role == "customer" && isset($urlintended)){

            return $urlintended;

        }else if($role == "customer"){

            return '/customer';

        }else{

            return '/login'; 
        }

    }


    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest')->except('logout');
    }
}
