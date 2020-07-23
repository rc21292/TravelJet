<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('queries','Api\QueryController@index');
Route::post('queries/store','Api\QueryController@store');
Route::delete('queries/delete/{id}','Api\QueryController@destroy');
Route::get('queries/edit/{id}','Api\QueryController@edit');
Route::get('queries/show/{id}','Api\QueryController@show');
Route::post('queries/update/{id}','Api\QueryController@update');
Route::post('users/update/{id}','UserController@update');
Route::get('transaction_history/{id}', 'UserTransactionController@index');

Route::get('/users/getbalance/{id}','UserController@balance');
Route::post('/users/save_razorpay_details','UserController@save_razorpay_details');
Route::get('users/show/{id}','UserController@show');
Route::get('users/getprofile/{id}','UserController@getProfile');
Route::post('users/insertImages','UserController@insertImages');
Route::get('users','UserController@index');

Route::get('getdashboardData/{id}','HomeController@index');



Route::get('notifications/{id}', 'NoticeController@index');