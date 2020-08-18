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

Route::get('queries/{id}','Api\QueryController@index');
Route::get('queries/getUpcommingBookings/{id}','Api\QueryController@getUpcommingBookings');
Route::get('queries/getBookedBookings/{id}','Api\QueryController@getBookedBookings');
Route::get('queries','Api\QueryController@getQueries');
Route::post('queries/store','Api\QueryController@store');
Route::post('quotations/storeBid','QuotationController@storeBid');
Route::post('quotations/storeQuotation','QuotationController@storeQuotation');
Route::post('quotations/awardBooking/{id}','QuotationController@awardBooking');
Route::get('quotations/getQuotation/{id}','QuotationController@getQuotation');
Route::get('quotations/getQuotationByBookingId/{id}','QuotationController@getQuotationByBookingId');
Route::get('quotations/getQuotationByBookingUserId/{id}/{user_id}','QuotationController@getQuotationByBookingUserId');
Route::get('quotations/getQuotationPayment/{id}/{user_id}','QuotationController@getQuotationPayment');
Route::delete('queries/delete/{id}','Api\QueryController@destroy');
Route::delete('queries/cancel/{id}','Api\QueryController@cancel');
Route::post('queries/moveToBooked/{id}','Api\QueryController@moveToBooked');
Route::delete('users/deletePortfolioImage/{id}','UserController@deletePortfolioImage');
Route::post('users/saveAgentProfile/{id}','UserController@saveAgentProfile');
Route::get('users/getAgentProfile/{id}','UserController@getAgentProfile');
Route::get('queries/edit/{id}','Api\QueryController@edit');
Route::get('queries/show/{id}','Api\QueryController@show');
Route::get('queries/getStopages/{id}','Api\QueryController@getStopages');
Route::get('queries/getStopagesData/{id}','Api\QueryController@getStopagesData');
Route::get('queries/getQueriesByUserId/{id}','Api\QueryController@getQueriesByUserId');
Route::post('queries/update/{id}','Api\QueryController@update');
Route::post('users/update/{id}','UserController@update');
Route::post('save_address/{id}','AddressController@store');
Route::get('getAddresses/{id}','AddressController@index');
Route::get('transaction_history/{id}', 'UserTransactionController@index');

Route::get('payouts/{id}', 'PayoutController@index');

Route::get('/users/getbalance/{id}','UserController@balance');
Route::post('/users/save_razorpay_details','UserController@save_razorpay_details');
Route::get('users/show/{id}','UserController@show');
Route::get('users/getprofile/{id}','UserController@getProfile');
Route::post('users/insertImages','UserController@insertImages');
Route::post('users/insertPortfolioImages','UserController@insertPortfolioImages');

Route::post('change-password/{id}','ChangePasswordController@store');


Route::post('settings/saveSettings','SiteManagementController@storeCoinSettings');
Route::post('settings/saveCommissionSettings','SiteManagementController@storeCommissionSettings');
Route::get('settings/getSettings','SiteManagementController@getCoinSettings');
Route::get('settings/getCommissionSettings','SiteManagementController@getCommissionSettings');
Route::get('users/getProfilePortfolio/{id}','UserController@getProfilePortfolio');
Route::get('users','UserController@index');

Route::get('getdashboardData/{id}','HomeController@index');



Route::get('notifications/{id}', 'NoticeController@index');

Route::get('getCustomerNotificattions/{id}', 'NoticeController@getCustomerNotificattions');
Route::get('getAgentNotifications/{id}', 'NoticeController@getAgentNotifications');