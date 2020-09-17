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

Route::get('queries/getDestinations','Api\QueryController@getDestinations');
Route::get('queries/{id}','Api\QueryController@index');
Route::get('queries/getUpcommingBookings/{id}','Api\QueryController@getUpcommingBookings');
Route::get('queries/getCancelledBookings/{id}','Api\QueryController@getCancelledBookings');
Route::get('queries/getBookedBookings/{id}','Api\QueryController@getBookedBookings');
Route::get('queries/getAgentBookedBookings/{id}','Api\QueryController@getAgentBookedBookings');
Route::get('queries','Api\QueryController@getQueries');
Route::post('queries/store','Api\QueryController@store');
Route::post('quotations/storeBid','QuotationController@storeBid');
Route::post('quotations/storeQuotation','QuotationController@storeQuotation');
Route::post('quotations/storeQuotationDetails/{id}','QuotationController@storeQuotationDetails');
Route::post('quotations/updateQuotationDetails/{id}','QuotationController@updateQuotationDetails');
Route::post('quotations/updatePaymentStatus/{id}','QuotationController@updatePaymentStatus');
Route::post('quotations/awardBooking/{id}','QuotationController@awardBooking');
Route::get('quotations/getQuotation/{id}','QuotationController@getQuotation');
Route::get('quotations/getQuotationByBookingId/{id}','QuotationController@getQuotationByBookingId');
Route::get('quotations/getQuotationById/{id}','QuotationController@getQuotationById');
Route::get('quotations/getQuotationDetailById/{id}','QuotationController@getQuotationDetailById');
Route::get('quotations/checkQuotaions/{id}','QuotationController@checkQuotaions');
Route::get('quotations/getQuotationByBookingUserId/{id}/{user_id}','QuotationController@getQuotationByBookingUserId');
Route::get('quotations/getQuotationPayment/{id}/{user_id}','QuotationController@getQuotationPayment');
Route::delete('queries/delete/{id}','Api\QueryController@destroy');
Route::delete('invoices/delete/{id}','InvoiceController@destroy');
Route::post('queries/cancel/{id}','Api\QueryController@cancel');
Route::post('queries/reBooking/{id}','Api\QueryController@reBooking');
Route::post('queries/moveToBooked/{id}','Api\QueryController@moveToBooked');
Route::delete('users/deletePortfolioImage/{id}','UserController@deletePortfolioImage');
Route::get('users/getCancelReasons','UserController@getCancelReasons');
Route::post('users/saveAgentProfile/{id}','UserController@saveAgentProfile');
Route::get('users/getAgentProfile/{id}','UserController@getAgentProfile');
Route::get('queries/edit/{id}','Api\QueryController@edit');
Route::get('queries/show/{id}','Api\QueryController@show');
Route::get('invoices/show/{id}','InvoiceController@show');
Route::get('invoices/invoiceDetails/{id}','InvoiceController@invoiceDetails');
Route::get('invoices/sendInvoice/{id}','InvoiceController@sendInvoice');
Route::post('invoices/store','InvoiceController@store');
Route::post('invoices/storeInvoice','InvoiceController@storeInvoice');
Route::post('invoices/update/{id}','InvoiceController@update');
Route::post('invoices/updateInvoice/{id}','InvoiceController@updateInvoice');
Route::get('queries/getStopages/{id}','Api\QueryController@getStopages');
Route::get('queries/getQuotationStoppages/{id}/{user_id}','Api\QueryController@getQuotationStoppages');
Route::get('queries/getStopagesData/{id}','Api\QueryController@getStopagesData');
Route::get('queries/getStoppages/{id}','Api\QueryController@getStoppages');
Route::get('queries/getQueriesByUserId/{id}','Api\QueryController@getQueriesByUserId');
Route::get('queries/getBookedQueriesByUserId/{id}','Api\QueryController@getBookedQueriesByUserId');
Route::get('queries/getTotalBookings/{id}','Api\QueryController@getTotalBookings');
Route::post('queries/update/{id}','Api\QueryController@update');
Route::post('queries/updateStoppages/{id}','Api\QueryController@updateStoppages');
Route::post('users/update/{id}','UserController@users/update');
Route::post('users/updateAgentProfile/{id}','UserController@updateAgentProfile');
Route::post('save_address/{id}','AddressController@store');
Route::get('getAddresses/{id}','AddressController@index');
Route::get('transaction_history/{id}', 'UserTransactionController@index');

Route::post('sendotp', 'LoginController@otp');
Route::post('verifyotp', 'LoginController@verify');

Route::get('payouts/{id}', 'PayoutController@index');
Route::get('invoices/{id}', 'InvoiceController@index');

Route::get('/users/getbalance/{id}','UserController@balance');
Route::post('/users/save_razorpay_details','UserController@save_razorpay_details');
Route::post('/credits/save_user_credits','CreditsController@save_user_credits');
Route::get('users/show/{id}','UserController@show');
Route::get('users/agenProfile/{id}','UserController@agenProfile');
Route::get('users/countSoldTrips/{id}','UserController@countSoldTrips');
Route::get('users/getprofile/{id}','UserController@getProfile');
Route::get('credits/getCredits/{id}','CreditsController@getCredits');
Route::get('credits','CreditsController@index');
Route::post('users/insertImages','UserController@insertImages');
Route::post('/users/insertPortfolioImages','UserController@insertPortfolio');

Route::post('change-password/{id}','ChangePasswordController@store');


Route::post('settings/saveSettings','SiteManagementController@storeCoinSettings');
Route::post('settings/saveCommissionSettings','SiteManagementController@storeCommissionSettings');
Route::get('settings/getSettings','SiteManagementController@getCoinSettings');
Route::get('settings/getCommissionSettings','SiteManagementController@getCommissionSettings');
Route::get('users/getProfilePortfolio/{id}','UserController@getProfilePortfolio');
Route::get('users/getPortfolioById/{id}','UserController@getPortfolioById');
Route::get('users','UserController@index');

Route::get('getdashboardData/{id}','HomeController@index');

Route::get('getAgenReviews/{id}','ReviewController@getAgenReviews');
Route::post('saveReviews','ReviewController@store');
Route::get('getAgentTestimonials/{id}','ReviewController@getAgentTestimonials');

Route::get('notifications/{id}', 'NoticeController@index');

Route::get('getCustomerNotificattions/{id}', 'NoticeController@getCustomerNotificattions');
Route::get('getAgentNotifications/{id}', 'NoticeController@getAgentNotifications');