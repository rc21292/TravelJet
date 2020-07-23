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
Route::get('/customer/transactions', function () { return view('customer'); });
Route::get('/customer/bookings', function () { return view('customer'); });
Route::get('/customer/wallet', function () { return view('customer'); });
Route::get('/customer/profile', function () { return view('customer'); });
Route::get('/customer/notifications', function () { return view('customer'); });
Route::get('/customer/profile/edit', function () { return view('customer'); });


Route::get('/admin/transactions', function () { return view('admin'); });
Route::get('/admin/bookings', function () { return view('admin'); });
Route::get('/admin/wallet', function () { return view('admin'); });
Route::get('/admin/profile', function () { return view('admin'); });
Route::get('/admin/notifications', function () { return view('admin'); }	);
Route::get('/admin/profile/edit', function () { return view('admin'); });



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
});

Auth::routes();

Route::get('/logout', 'HomeController@logout');




