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


/*booking api's*/
Route::get('queries/edit/{id}','Api\QueryController@edit');
Route::get('queries/show/{id}','Api\QueryController@show');
Route::get('queries/getStopages/{id}','Api\QueryController@getStopages');
Route::get('queries/getQuotationStoppages/{id}/{user_id}','Api\QueryController@getQuotationStoppages');
Route::get('queries/getStopagesData/{id}','Api\QueryController@getStopagesData');
Route::get('queries/getStoppages/{id}','Api\QueryController@getStoppages');
Route::get('queries/getQueriesByUserId/{id}','Api\QueryController@getQueriesByUserId');
Route::get('queries/getBookedQueriesByUserId/{id}','Api\QueryController@getBookedQueriesByUserId');
Route::get('queries/getTotalBookings/{id}','Api\QueryController@getTotalBookings');
Route::post('queries/update/{id}','Api\QueryController@update');
Route::post('queries/updateStoppages/{id}','Api\QueryController@updateStoppages');

Route::get('queries/getDestinations','Api\QueryController@getDestinations');
Route::get('queries/{id}','Api\QueryController@index');
Route::get('queries/getUpcommingBookings/{id}','Api\QueryController@getUpcommingBookings');
Route::get('queries/getCancelledBookings/{id}','Api\QueryController@getCancelledBookings');
Route::get('queries/getBookedBookings/{id}','Api\QueryController@getBookedBookings');
Route::get('queries/getAgentBookedBookings/{id}','Api\QueryController@getAgentBookedBookings');
Route::get('queries','Api\QueryController@getQueries');
Route::post('queries/store','Api\QueryController@store');
Route::post('queries/moveToBooked/{id}','Api\QueryController@moveToBooked');

/*cancle agent booking*/
Route::post('queries/cancel/{id}','Api\QueryController@cancel');
/*cancel customer booking*/
Route::post('queries/cancelCustBooking/{id}','Api\QueryController@cancelCustBooking');
/*rebooking after cancel*/
Route::post('queries/reBooking/{id}','Api\QueryController@reBooking');


/*quotation apis*/
Route::post('quotations/storeBid','QuotationController@storeBid');
Route::get('quotations/getBookedBooking/{id}','QuotationController@getBookedBooking');
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


/*users apis*/
Route::delete('users/deletePortfolioImage/{id}','UserController@deletePortfolioImage');
Route::get('users/getCancelReasons','UserController@getCancelReasons');

/*agent profiles apis*/
Route::get('users/getAgentProfile/{id}','UserController@getAgentProfile');
Route::post('users/saveAgentProfile/{id}','UserController@saveAgentProfile');

Route::post('users/update/{id}','UserController@users/update');
Route::post('users/updateAgentProfile/{id}','UserController@updateAgentProfile');
Route::get('users/getbalance/{id}','UserController@balance');
Route::post('users/save_razorpay_details','UserController@save_razorpay_details');
Route::get('users/show/{id}','UserController@show');
Route::get('users/agenProfile/{id}','UserController@agenProfile');
Route::get('users/countSoldTrips/{id}','UserController@countSoldTrips');
Route::get('users/getprofile/{id}','UserController@getProfile');
Route::get('users/getProfilePortfolio/{id}','UserController@getProfilePortfolio');
Route::get('users/getPortfolioById/{id}','UserController@getPortfolioById');
Route::get('users','UserController@index');

Route::post('users/insertImages','UserController@insertImages');
Route::post('users/insertPortfolioImages','UserController@insertPortfolio');

Route::post('sendotp', 'LoginController@otp');
Route::post('verifyotp', 'LoginController@verify');

/*customer address apis*/
Route::post('save_address/{id}','AddressController@store');
Route::get('getAddresses/{id}','AddressController@index');
Route::get('getCustomerAddresses/{id}','AddressController@show');
Route::get('getAgentAddresses/{id}','AddressController@getAgentAddresses');
Route::post('change-password/{id}','ChangePasswordController@store');


Route::get('transaction_history/{id}', 'UserTransactionController@index');
Route::get('wallet_transactions/{id}', 'WalletTransactionController@index');

Route::get('payouts/{id}', 'PayoutController@index');
Route::get('payoutTransactions/{id}', 'PayoutController@payoutTransactions');
Route::get('payouts/getRequestedPayouts/{id}', 'PayoutController@getRequestedPayouts');
Route::post('payouts/savePayoutRequest','PayoutController@savePayoutRequest');

/*agent credits apis*/
Route::post('credits/save_user_credits','CreditsController@save_user_credits');
Route::get('credits/getCredits/{id}','CreditsController@getCredits');
Route::get('credits','CreditsController@index');


Route::post('settings/saveSettings','SiteManagementController@storeCoinSettings');
Route::post('settings/saveCommissionSettings','SiteManagementController@storeCommissionSettings');
Route::get('settings/getSettings','SiteManagementController@getCoinSettings');
Route::get('settings/getCommissionSettings','SiteManagementController@getCommissionSettings');


Route::get('getdashboardData/{id}','HomeController@index');

/*reviews apis*/
Route::get('getAgenReviews/{id}','ReviewController@getAgenReviews');
Route::post('saveReviews','ReviewController@store');
Route::get('getAgentTestimonials/{id}','ReviewController@getAgentTestimonials');

/*notification apis*/
Route::get('notifications/{id}', 'NoticeController@index');
Route::get('getCustomerNotificattions/{id}', 'NoticeController@getCustomerNotificattions');
Route::get('getAgentNotifications/{id}', 'NoticeController@getAgentNotifications');


/*invoice api's call*/

/*for agent*/
Route::get('invoices/{id}', 'InvoiceController@index');
Route::get('invoices/show/{id}','InvoiceController@show');
Route::get('getNextInvoiceNo','InvoiceController@getNextInvoiceNo');
Route::get('invoices/invoiceDetails/{id}','InvoiceController@invoiceDetails');
Route::get('invoices/sendInvoice/{id}','InvoiceController@sendInvoice');
Route::get('invoices/checkInvoice/{id}','InvoiceController@checkInvoice');
Route::post('invoices/store','InvoiceController@store');
Route::post('invoices/storeInvoice','InvoiceController@storeInvoice');
Route::post('invoices/update/{id}','InvoiceController@update');
Route::post('invoices/updateAndMail/{id}','InvoiceController@updateAndMail');
Route::post('invoices/updateInvoice/{id}','InvoiceController@updateInvoice');
Route::post('invoices/sendMailInvoice/{id}','InvoiceController@sendMailInvoice');
Route::delete('invoices/delete/{id}','InvoiceController@destroy');
Route::post('savePdfFile', 'InvoiceController@savePdfFile');
/*end for agent*/

/*for customer*/
Route::get('invoices/getInvoices/{id}', 'InvoiceController@getInvoices');
/*end for customer*/

/*end invoice api's call*/

/*drivers*/
Route::get('drivers/getDrivers/{id}','DriverController@index');
Route::post('drivers/saveDriver/{id}','DriverController@store');


Route::get('drivers/getDriverNames/{id}','DriverController@getDriverNames');

/*vechicles*/

Route::get('vehicles/getVehicles/{id}','VehicleController@index');
Route::post('vehicles/saveVehicles/{id}','VehicleController@store');