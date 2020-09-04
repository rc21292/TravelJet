<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Response;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/



// Front End View Routes
Route::get('/', function () { return view('welcome'); });
Route::get('/CompanyInfo', function () { return view('welcome'); });
Route::get('/DriveWithUs', function () { return view('welcome'); });
Route::get('/HowitWorks', function () { return view('welcome'); });
Route::get('/browse-bookings', function () { return view('welcome'); });
Route::get('/booking-details/{id}', function () { return view('welcome'); });
Route::get('/customer-booking/{id}', function () { return view('welcome'); });
Route::get('/profile/{id}', function () { return view('welcome'); });
Route::get('/customer/profile/{id}', function () { return view('customer'); });
// Route::get('/customer/profile-agent/{id}', function () { return view('customer'); });
Route::get('/quotations/{id}', function () { return view('welcome'); });
Route::get('/bookings/{id}', function () { return view('welcome'); });
Route::get('/booked/{id}', function () { return view('welcome'); });
Route::get('/customer/transactions', function () { return view('customer'); });
Route::get('/customer/bookings', function () { return view('customer'); });
Route::get('/customer/quotations', function () { return view('customer'); });
Route::get('/customer/reviews', function () { return view('customer'); });
Route::get('/customer/review/{id}', function () { return view('customer'); });
Route::get('/customer/manage-address', function () { return view('customer'); });
Route::get('/customer/personal-information', function () { return view('customer'); });
Route::get('/customer/change-password', function () { return view('customer'); });
Route::get('/customer/wallet', function () { return view('customer'); });
Route::get('/customer/inbox', function () { return view('customer'); });
Route::get('/customer/profile', function () { return view('customer'); });
Route::get('/customer/notifications', function () { return view('customer'); });
Route::get('/agent/portfolio', function () { return view('agent'); });
Route::get('/customer/profile/edit', function () { return view('customer'); });


Route::get('/admin/transactions', function () { return view('admin'); });
Route::get('/admin/bookings', function () { return view('admin'); });
Route::get('/admin/settings', function () { return view('admin'); });
Route::get('/admin/users', function () { return view('admin'); });
Route::get('/admin/user/{id}', function () { return view('admin'); });
Route::get('/admin/wallet', function () { return view('admin'); });
Route::get('/admin/profile', function () { return view('admin'); });
Route::get('/admin/notifications', function () { return view('admin'); }	);
Route::get('/admin/profile/edit', function () { return view('admin'); });
Route::get('/admin/portfolio/edit', function () { return view('admin'); });


Route::get('/agent/transactions', function () { return view('agent'); });
Route::get('/agent/bookings', function () { return view('agent'); });
Route::get('/agent/users', function () { return view('agent'); });
Route::get('/agent/user/{id}', function () { return view('agent'); });
Route::get('/agent/wallet', function () { return view('agent'); });
Route::get('/agent/payouts', function () { return view('agent'); });
Route::get('/agent/credits', function () { return view('agent'); });
Route::get('/agent/invoices', function () { return view('agent'); });
Route::get('/agent/profile', function () { return view('agent'); });
Route::get('/agent/profile/{id}', function () { return view('agent'); });
Route::get('/agent/drivers', function () { return view('agent'); });
Route::get('/agent/vehicles', function () { return view('agent'); });
Route::get('/agent/notifications', function () { return view('agent'); }	);
Route::get('/agent/profile/edit', function () { return view('agent'); });
Route::get('/agent/browse-bookings', function () { return view('agent'); });



Route::get('/agent/transactions', function () { return view('agent'); });
Route::get('/agent/bookings', function () { return view('agent'); });
Route::get('/agent/quotations', function () { return view('agent'); });
Route::get('/agent/manage-address', function () { return view('agent'); });
Route::get('/agent/personal-information', function () { return view('agent'); });
Route::get('/agent/personal-information/edit', function () { return view('agent'); });
Route::get('/agent/change-password', function () { return view('agent'); });
Route::get('/agent/wallet', function () { return view('agent'); });
Route::get('/agent/leads', function () { return view('agent'); });
Route::get('/agent/inbox', function () { return view('agent'); });
Route::get('/agent/profile', function () { return view('agent'); });
Route::get('/agent/notifications', function () { return view('agent'); });
Route::get('/agent/profile/edit', function () { return view('agent'); });




// Admin Dashboard View Route
Route::group(['middleware' => 'App\Http\Middleware\Admin'], function()
{
Route::get('/admin', 'HomeController@admin')->name('adminhome');
});

// Agent Dashboard View Route
Route::group(['middleware' => 'App\Http\Middleware\Agent'], function()
{
Route::get('/agent', 'HomeController@agent')->name('agenthome');
});

// Customer Dashboard View Route
Route::group(['middleware' => 'App\Http\Middleware\Customer'], function()
{
Route::get('/customer', 'HomeController@customer')->name('customerhome');
Route::get('/query/add', 'HomeController@booknow')->name('booknow');
Route::get('/bookingtrip', 'HomeController@booknow')->name('booknow');
Route::get('/bookingroundtrip', 'HomeController@booknow')->name('booknow');
Route::get('/query/addgoogle', 'HomeController@booknow')->name('booknow');
Route::get('/query/store', 'Api\QueryController@store')->name('storequery');
});

Auth::routes();

Route::get('/logout', 'HomeController@logout');



// Route::get('/', function()
// {
// 	return Auth::user();
//     if( Session::has('user') ) return 'Welcome ' . Session::get('user')->u_username;
//     return 'Please log in <a href="/login">login</a>';
// });

// Route::get('/login', function() {
//     $credentials = array('email' => 'traveljet@customer.com', 'password' => '12345678');

//     if( Auth::attempt($credentials, true) ){

//         Session::put('user', Auth::user());
//         return 'You have successfully logged in, ' . Auth::user()->name . '! <a href="/">Go back to Index</a>';
//     } 

//     return '<h1>Username/Password wrong.</h1>Your credentials seem to be wrong. Please re-check them.';

// });

// Route::get('/logout', function() {
//     Auth::logout();
//     Session::forget('user');
//     return Redirect::to('/');
// });




