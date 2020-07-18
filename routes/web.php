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

Route::get('/', function () {
    return view('welcome');
});

Auth::routes();
Route::get('/logout', 'HomeController@logout');
Route::get('/admin', 'HomeController@admin')->name('adminhome');
Route::get('/agent', 'HomeController@agent')->name('agenthome');
Route::get('/customer', 'HomeController@customer')->name('customerhome');

