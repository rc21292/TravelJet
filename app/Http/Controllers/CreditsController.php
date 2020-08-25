<?php 

namespace App\Http\Controllers;

use App\Credit;
use App\UserCredit;
use View;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use function Opis\Closure\serialize;
use Session;
use Spatie\Permission\Models\Role;
use App\Helper;
use Auth;
use DB;
use App\SiteManagement;
use Illuminate\Support\Facades\Input;
use App\User;
use Carbon\Carbon;
use App\EmailTemplate;
use App\Mail\EmployerEmailMailable;
use Illuminate\Support\Facades\Mail;
use App\Mail\FreelancerEmailMailable;
use Srmklive\PayPal\Services\ExpressCheckout;

class CreditsController extends Controller
{
	protected $credit;

    public function __construct(Credit $credit)
    {
        $this->credit = $credit;
    }

    public function index(){
           return $credits = $this->credit->where('status',1)->get();
   }

   public function getCredits($id)
   {
       $inital_credits = 50;
       $credits_data = UserCredit::where('user_id',$id)->first();
       if ($credits_data) {
           $credit = $credits_data->credits;
       }else{
        $credit = $inital_credits;
       }
       return  $credit;
   }

   public function save_user_credits(Request $request)
   {
        DB::table('user_razorpay_details')->insert(
            [
                'user_id' => $request->user_id,
                'description' => 'credits Purchase vai Razorpay', 
                'cost' => $request->amount,
                'payment_id' => $request->payment_id,
                "created_at" => \Carbon\Carbon::now(), 
                'updated_at' => \Carbon\Carbon::now()
            ]
        );

        $credits_data = Credit::where('cost',$request->amount)->first();

        $credit_data = UserCredit::where('user_id',$request->user_id)->first();

        if ($credit_data) {
            UserCredit::where('user_id',$request->user_id)->update(['credits' => $credit_data->credits+$credits_data->credits]);
        }else{

            DB::table('user_credits')->insert(
                [
                    'user_id' => $request->user_id,
                    'credits' => 50+$credits_data->credits
                ]
            );
        }

        $credit_data = UserCredit::where('user_id',$request->user_id)->first();
        return response()->json([
            'success' => true,
            'messages' => 'Saved Sucess',
            'credits' => $credit_data->credits,
            'added_credits' => $credits_data->credits
        ], 200);   
    }


   public function create(){
      if (!empty($_GET['keyword'])) {
        $keyword = $_GET['keyword'];
        $packages = $this->credit::where('title', 'like', '%' . $keyword . '%')->orderBy('role_id', 'desc')->paginate(10)->setPath('');
        $pagination = $packages->appends(
            array(
                'keyword' => Input::get('keyword')
            )
        );
    } else {
        $packages = $this->credit::orderBy('role_id', 'desc')->paginate(10);
    }
    $roles = Role::where('name', '!=', 'admin')->get();
    $delete_title = trans("lang.ph_delete_confirm_title");
    $delete_message = trans("lang.ph_package_delete_message");
    $deleted = trans("lang.ph_delete_title");
    if (file_exists(resource_path('views/extend/back-end/admin/credits/index.blade.php'))) {
        return view(
            'extend.back-end.admin.credits.index',
            compact(
                'packages',
                'delete_title',
                'delete_message',
                'deleted',
                'roles'
            )
        );
    } else {
        return view(
            'back-end.admin.credits.index',
            compact(
                'packages',
                'delete_title',
                'delete_message',
                'deleted',
                'roles'
            )
        );
    }
}

public function store(Request $request){
    $this->validate(
        $request,
        [
            'package_title' => 'required',
            'package_subtitle' => 'required',
            'package_price' => 'required',
        ]
    );
    $this->credit->savePackage($request);
    Session::flash('message', trans('lang.save_package'));
    return Redirect::back();
}

public function edit($slug){
   if (!empty($slug)) {
    $package = $this->credit::where('slug', $slug)->first();
    $roles = Role::where('name', '!=', 'admin')->pluck('name', 'id')->toArray();
    if (!empty($package)) {
        if (file_exists(resource_path('views/extend/back-end/admin/credits/edit.blade.php'))) {
            return View::make(
                'extend.back-end.admin.credits.edit',
                compact(
                    'package',
                    'roles'
                )
            );
        } else {
            return View::make(
                'back-end.admin.credits.edit',
                compact(
                    'package',
                    'roles'
                )
            );
        }
    }
}

}


public function update(Request $request, $slug){
    $this->validate(
        $request,
        [
            'package_title' => 'required',
        ]
    );
    $this->credit->updatePackage($request, $slug);
    Session::flash('message', trans('lang.package_updated'));
    return Redirect::to('admin/credits');
}

public function destroy(Request $request){
    $json = array();
    $id = $request['id'];
    if (!empty($id)) {
        $this->credit::where('id', $id)->delete();
        $json['type'] = 'success';
        $json['message'] = trans('lang.package_deleted');
        return $json;
    }
}

public function getIndex(Request $request)
{
    if (Auth::user()) {
        $response = [];
        if (session()->has('code')) {
            $response['code'] = session()->get('code');
            session()->forget('code');
        }
        if (session()->has('message')) {
            $response['message'] = session()->get('message');
            session()->forget('message');
        }
        $error_code = session()->get('code');
        Session::flash('payment_message', $response);
        $product_type = session()->get('type');
        $project_type = session()->get('project_type');
        if (Auth::user()->getRoleNames()[0] == "employer") {

            return Redirect::to('dashboard/credits/employer');

        } else if (Auth::user()->getRoleNames()[0] == "freelancer") {
            session()->forget('type');
            return Redirect::to('dashboard/credits/freelancer');
        }
    } else {
        abort(404);
    }
}

    /**
     * Get express checkout.
     *
     * @param mixed $request $req->attr
     *
     * @return \Illuminate\Http\Response
     */
    public function getExpressCheckout(Request $request)
    {
        $settings = SiteManagement::getMetaValue('payment_settings');
        $payment_mode = !empty($settings) && !empty($settings[0]['enable_sandbox']) ? $settings[0]['enable_sandbox'] : 'false';
        if ($payment_mode == 'true') {
            if (empty(env('PAYPAL_SANDBOX_API_USERNAME'))
                && empty(env('PAYPAL_SANDBOX_API_PASSWORD'))
                && empty(env('PAYPAL_SANDBOX_API_SECRET'))
            ) {
                Session::flash('error', trans('lang.paypal_empty_credentials'));
            return Redirect::back();
        }
    } elseif ($payment_mode == 'false') {
        if (empty(env('PAYPAL_LIVE_API_USERNAME'))
            && empty(env('PAYPAL_LIVE_API_PASSWORD'))
            && empty(env('PAYPAL_LIVE_API_SECRET'))
        ) {
            Session::flash('error', trans('lang.paypal_empty_credentials'));
        return Redirect::back();
    }
}

$settings = SiteManagement::getMetaValue('commision');
$currency = !empty($settings[0]['currency']) ? $settings[0]['currency'] : 'GBP';
if (Auth::user()) {
    $recurring = false;
    $success = true;
    $cart = $this->getCheckoutData($recurring, $success);
    $payment_detail = array();
    try {
        $response = $this->provider->setCurrency($currency)->setExpressCheckout($cart, $recurring);
        if ($response['ACK'] == 'Failure') {
            Session::flash('error', $response['L_LONGMESSAGE0']);
            return Redirect::back();
        }
        return redirect($response['paypal_link']);
    } catch (\Exception $e) {
        $invoice = $this->createInvoice($cart, 'Invalid', $payment_detail);
        session()->put(['code' => 'danger', 'message' => "Error processing PayPal payment for Order $invoice->id!"]);
    }
} else {
    abort(404);
}
}

    /**
     * Get Express Checkout Success.
     *
     * @param mixed $request $req->attr
     *
     * @return \Illuminate\Http\Response
     */
    public function getExpressCheckoutSuccess(Request $request)
    {
        if (Auth::user()) {
            $recurring = false;
            $token = $request->get('token');
            $PayerID = $request->get('PayerID');
            $success = false;
            $cart = $this->getCheckoutData($recurring, $success);
            // Verify Express Checkout Token
            $response = $this->provider->getExpressCheckoutDetails($token);
            if (in_array(strtoupper($response['ACK']), ['SUCCESS', 'SUCCESSWITHWARNING'])) {
                if ($recurring === true) {
                    $response = $this->provider->createMonthlySubscription($response['TOKEN'], 9.99, $cart['subscription_desc']);
                    if (!empty($response['PROFILESTATUS']) && in_array($response['PROFILESTATUS'], ['ActiveProfile', 'PendingProfile'])) {
                        $status = 'Processed';
                    } else {
                        $status = 'Invalid';
                    }
                } else {
                    // Perform transaction on PayPal
                    $payment_status = $this->provider->doExpressCheckoutPayment($cart, $token, $PayerID);

                    if ($payment_status['ACK'] == 'Failure') {
                        Session::flash('error', $response['L_LONGMESSAGE0']);
                        return Redirect::back();
                    }
                    $status = !empty($payment_status['PAYMENTINFO_0_PAYMENTSTATUS']) ? $payment_status['PAYMENTINFO_0_PAYMENTSTATUS'] : 'Processed';
                }
                $payment_detail = array();
                $payment_detail['payer_name'] = $response['FIRSTNAME'] . " " . $response['LASTNAME'];
                $payment_detail['payer_email'] = $response['EMAIL'];
                $payment_detail['seller_email'] = !empty($response['PAYMENTREQUEST_0_SELLERPAYPALACCOUNTID']) ? $response['PAYMENTREQUEST_0_SELLERPAYPALACCOUNTID'] : '';
                $payment_detail['currency_code'] = $response['CURRENCYCODE'];
                $payment_detail['payer_status'] = $response['PAYERSTATUS'];
                $payment_detail['transaction_id'] = !empty($payment_status['PAYMENTINFO_0_TRANSACTIONID']) ? $payment_status['PAYMENTINFO_0_TRANSACTIONID'] : '';
                $payment_detail['sales_tax'] = $response['TAXAMT'];
                $payment_detail['invoice_id'] = $response['INVNUM'];
                $payment_detail['shipping_amount'] = $response['SHIPPINGAMT'];
                $payment_detail['handling_amount'] = $response['HANDLINGAMT'];
                $payment_detail['insurance_amount'] = $response['INSURANCEAMT'];
                $payment_detail['paypal_fee'] = !empty($payment_status['PAYMENTINFO_0_FEEAMT']) ? $payment_status['PAYMENTINFO_0_FEEAMT'] : '';
                $payment_detail['payment_date'] = $payment_status['TIMESTAMP'];
                $payment_detail['product_qty'] = $cart['items'][0]['qty'];
                $invoice = $this->createInvoice($cart, $status, $payment_detail);
                if ($invoice->paid) {
                    session()->put(['code' => 'success', 'message' => "Thank you for your subscription"]);
                } else {
                    session()->put(['code' => 'danger', 'message' => "Error processing PayPal payment for Order $invoice->id!"]);
                }
                if (Auth::user()->getRoleNames()[0] == "employer") {
                    return redirect('employer/credits/redirect-url');

                } else if (Auth::user()->getRoleNames()[0] == "freelancer") {
                    return redirect('credits/redirect-url');
                }
                
            } else {
                abort(404);
            }
        }
    }


    /**
     * Get Express Checkout Success.
     *
     * @param mixed $recurring $recurring
     * @param mixed $success   $recurring
     *
     * @return \Illuminate\Http\Response
     */
    protected function getCheckoutData($recurring, $success)
    {
        if (Auth::user()) {
            if (session()->has('product_id')) {
                $id = session()->get('product_id');
                $title = session()->get('product_title');
                $price = session()->get('product_price');
                $user_id = Auth::user()->id;
                $settings = SiteManagement::getMetaValue('commision');
                $currency = !empty($settings[0]['currency']) ? $settings[0]['currency'] : 'GBP';
                if ($success == true) {
                    DB::table('orders')->insert(
                        ['user_id' => $user_id, 'product_id' => $id, 'invoice_id' => null, 'status' => 'pending', 'created_at' => \Carbon\Carbon::now(), 'updated_at' => \Carbon\Carbon::now()]
                    );
                    session()->put(['custom_order_id' => DB::getPdo()->lastInsertId()]);
                }
                $random_number = Helper::generateRandomCode(4);
                $unique_code = strtoupper($random_number);
                $data = [];
                $order_id = Invoice::all()->count() + 1;
                $data['items'] = [
                    [
                        'product_id' => $id,
                        'subscriber_id' => $user_id,
                        'name' => $title,
                        'price' => $price,
                        'qty' => 1,
                        'currency_code' => $currency,
                    ],

                ];
                                if (Auth::user()->getRoleNames()[0] == "employer") {

                   $data['return_url'] = url('employer/credits/ec-checkout-success');

                } else if (Auth::user()->getRoleNames()[0] == "freelancer") {
                    $data['return_url'] = url('/credits/ec-checkout-success');
                }
                // $data['return_url'] = url('/credits/ec-checkout-success');
                $data['invoice_id'] = config('paypal.invoice_prefix') . '_' . $unique_code . '_' . $order_id;
                $data['invoice_description'] = "Order #$order_id Invoice";
                $data['cancel_url'] = url('/');
                $total = 0;
                foreach ($data['items'] as $item) {
                    $total += $item['price'] * $item['qty'];
                }
                $data['total'] = $total;

                return $data;
            } else {
                abort(404);
            }
        } else {
            Session::flash('message', trans('lang.product_id_not_found'));
            return Redirect::to('/');
        }
    }

}
