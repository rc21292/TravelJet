<?php

use Illuminate\Support\Facades\Route;

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
Route::get('/query/add', function () { return view('welcome'); });


// Admin Dashboard View Route
Route::get('/admin/{path?}', function () { return view('admin'); });
Route::get('/admin', 'HomeController@admin')->name('adminhome');
// Agent Dashboard View Route
Route::get('/agent/{path?}', function () { return view('agent'); });
Route::get('/agent', 'HomeController@agent')->name('agenthome');

// Customer Dashboard View Route
Route::get('/customer/{path?}', function () { return view('customer'); });
Route::get('/customer', 'HomeController@customer')->name('customerhome');

Auth::routes();

Route::get('/logout', 'HomeController@logout');



