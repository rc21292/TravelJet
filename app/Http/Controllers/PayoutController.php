<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Payout;
use App\User;
use App\Helper;
use DB;
use Illuminate\Support\Facades\Input;

class PayoutController extends Controller
{

     protected $payouts;
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */


    public function __construct(Payout $payouts)
    {
        $this->payouts = $payouts;

    }

    public function index(Request $request,$id)
    {
          if (!empty($_GET['year']) && !empty($_GET['month'])) {
            $year = $_GET['year'];
            $month = $_GET['month'];
            $payouts =  DB::table('payouts')
                ->select('*')
                ->whereYear('created_at', '=', $year)
                ->whereMonth('created_at', '=', $month)
                ->latest()->paginate(10)->setPath('');
            $pagination = $payouts->appends(
                array(
                    'year' => request('year'),
                    'month' => request('month')
                )
            );
        } else {
            $payouts =  Payout::latest()->paginate(10);
        }
        $selected_year = !empty($_GET['year']) ? $_GET['year'] : date('Y');
        $selected_month = !empty($_GET['month']) ? $_GET['month'] : '';
        $months = Helper::getMonthList();
        $years = range(date("Y"), 1970);
        return response()->json([
            'success' => true,
            'payouts' => $payouts,
            'selected_year' => $selected_year,
            'years' => $years,
            'selected_month' => $selected_month,
            'months' => array_values($months),
        ], 200);
    }

    public function adminPayoutTransactions(Request $request)
    {
        $from_date = $request->input('from_date');
        $to_date = $request->input('to_date');

        $user_transaction_s = Payout::where('user_id', 1)->join('users', 'users.id','payouts.reciver_id')->latest();

        if (($request->has('from_date') && $request->has('to_date')) && (!empty($request->from_date) && !empty($request->to_date)) ) {
            $from_date = date('Y-m-d', strtotime($request->from_date));
            $to_date = date('Y-m-d', strtotime($request->to_date));
            $user_transaction_s->whereDate('payouts.updated_at', '>=', $from_date)
                              ->whereDate('payouts.updated_at', '<=', $to_date);
        }else if ($request->has('from_date') && !empty($request->from_date)) {
            $from_date = date('Y-m-d', strtotime($request->from_date));
            $user_transaction_s->where('payouts.updated_at','LIKE', '%'.$from_date.'%');
        }else if ($request->has('to_date') && !empty($request->to_date)) {
            $to_date = date('Y-m-d', strtotime($request->to_date));
            $user_transaction_s->where('payouts.updated_at','LIKE', '%'.$to_date.'%');
        }
        $payouts = $user_transaction_s->select('payouts.*','users.name',DB::raw("DATE_FORMAT(payouts.updated_at, '%d-%b-%Y') as processing_date"))->paginate(10);

      return response()->json([
        'success' => true,
        'payouts' => $payouts,
      ], 200);
    }


    public function payoutTransactions(Request $request,$id)
    {

       $from_date = $request->input('from_date');
        $to_date = $request->input('to_date');

        $user_transaction_s = Payout::where('reciver_id', $id)->join('users', 'users.id','payouts.reciver_id')->latest();

        if (($request->has('from_date') && $request->has('to_date')) && (!empty($request->from_date) && !empty($request->to_date)) ) {
            $from_date = date('Y-m-d', strtotime($request->from_date));
            $to_date = date('Y-m-d', strtotime($request->to_date));
            $user_transaction_s->whereDate('payouts.updated_at', '>=', $from_date)
                              ->whereDate('payouts.updated_at', '<=', $to_date);
        }else if ($request->has('from_date') && !empty($request->from_date)) {
            $from_date = date('Y-m-d', strtotime($request->from_date));
            $user_transaction_s->where('payouts.updated_at','LIKE', '%'.$from_date.'%');
        }else if ($request->has('to_date') && !empty($request->to_date)) {
            $to_date = date('Y-m-d', strtotime($request->to_date));
            $user_transaction_s->where('payouts.updated_at','LIKE', '%'.$to_date.'%');
        }
        $payouts = $user_transaction_s->select('payouts.*','users.name',DB::raw("DATE_FORMAT(payouts.updated_at, '%d-%b-%Y') as processing_date"))->paginate(10);

      return response()->json([
        'success' => true,
        'payouts' => $payouts,
      ], 200);
    }


    public function generatePDF($year, $month, $id = array())
    {
        $slected_ids = array();
        if (!empty($id)) {
            $slected_ids = explode(',', $id);
        }
        $payouts =  DB::table('payouts')
            ->select('*')
            ->whereYear('created_at', '=', $year)
            ->whereMonth('created_at', '=', $month)
            ->whereIn('id', $slected_ids)
            ->get();
        $pdf = PDF::loadView('back-end.admin.payouts-pdf', compact('payouts', 'year', 'month'));
        return $pdf->download('payout-' . $month . '-' . $year . '.pdf');
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }


     public function submitUserRefund(Request $request)
    {
        $server_verification = Helper::worketicIsDemoSite();
        if (!empty($server_verification)) {
            Session::flash('error', $server_verification);
            return Redirect::back();
        }
        $json = array();
        if (!empty($request)) {
            $this->validate(
                $request,
                [
                    'refundable_user_id' => 'required',
                ]
            );
            $role = $this->user::getUserRoleType($request['refundable_user_id']);
            if ($role->role_type == 'freelancer') {
                $update_status = '';
                if ($request['type'] == 'job') {
                    $update_status = $this->user->updateCancelProject($request);
                } elseif ($request['type'] == 'service') {
                    $update_status = $this->user->updateCancelService($request);
                }
                if ($update_status = 'success') {
                    $json['type'] = 'success';
                    $json['message'] = trans('lang.status_updated');
                    return $json;
                } else {
                    $json['type'] = 'error';
                    $json['message'] = trans('lang.something_wrong');
                    return $json;
                }
            } elseif ($role->role_type == 'employer') {
                $refound = $this->user->transferRefund($request);
                if ($refound == 'payout_not_available') {
                    $json['type'] = 'error';
                    $json['message'] = trans('lang.user_payout_not_set');
                    return $json;
                } else if ($refound == 'success') {
                    $json['type'] = 'success';
                    $json['message'] = trans('lang.refund_transfer');
                    return $json;
                } else {
                    $json['type'] = 'error';
                    $json['message'] = trans('lang.all_required');
                    return $json;
                }
            }
        } else {
            $json['type'] = 'error';
            $json['message'] = trans('lang.something_wrong');
            return $json;
        }
    }

    /**
     * Verify Code
     *
     * @return \Illuminate\Http\Response
     */
    public function updatePayoutDetail(Request $request)
    {
        $user_id = $request['id'];
        if (!empty($user_id)) {

            $payout_setting = $this->profile->savePayoutDetail($request, $user_id);
            $json['type'] = 'success';
            $json['message'] = 'payout update successfully';
            return $json;
        } else {
            $json['type'] = 'error';
            $json['message'] = trans('lang.verify_code');
            return $json;
        }
    }

    /**
     * Get payout detail
     *
     */
    public function getPayoutDetail()
    {
        $json = array();
        if (Auth::user()) {
            $user = User::find(Auth::user()->id);
            $payout_detail = !empty($user->profile) ? Helper::getUnserializeData($user->profile->payout_settings) : array();
            $json['type'] = 'success';
            $json['payouts'] = $payout_detail;
            return $json;
        } else {
            $json['type'] = 'error';
            $json['message'] = trans('lang.verify_code');
            return $json;
        }
    }

    public function savePayoutRequest(Request $request)
    {
      $check = DB::table('payout_requests')
                  ->insert(array(
                    'amount'      => $request->amount,
                    'user_id'     => $request->user_id,
                    'created_at' => Now()
                  ));
      return 'success';
    }

    public function getPayoutRequested(Request $request)
    {
      return $payouts = DB::table('payout_requests')->join('users','users.id','payout_requests.user_id')->leftjoin('agent_profiles','agent_profiles.user_id','payout_requests.user_id')->select('payout_requests.*','users.name','agent_profiles.company')->where('status','requested')->latest('payout_requests.created_at')->paginate(8);
    }

    public function getRequestedPayoutById($id)
    {
      $payouts = DB::table('payout_requests')->where('id',$id)->first();

      return response()->json([
            'success' => true,
            'payouts' => $payouts,
        ], 200);

    }

    public function updatePayout(Request $request)
    {
      Payout::create(['user_id' => 1, 'reciver_id' => $request->user_id, 'status' => 'completed', 'amount' => $request->amount,'payment_method' => $request->payment_method, 'transaction_id' => $request->transaction_id]);

      $query = DB::table('payout_requests')
            ->where('id',$request->id)
            ->update(['status' => 'paid'
            ]);


          return response()->json([
            'success' => true,
            'message' => 'updated',
        ], 200);  
    }

    public function getRequestedPayouts(Request $request,$id)
    {
      $payout_amount = DB::table('payout_requests')->where('status','requested')->where('user_id',$id)->sum('amount');
      $wallet_amount = User::where('id',$id)->first()->balance;
      $total_requsted_amount = $payout_amount;
      $pending_requsted_amount = $wallet_amount - $payout_amount;

      return response()->json([
            'total_requsted_amount' => $total_requsted_amount,
            'pending_requsted_amount' => $pending_requsted_amount,
            'wallet_amount' => $wallet_amount,
        ], 200);
    }

     public function getRequestedPayoutDetails(Request $request)
    {
        $json = array();
        if ($request->id) {
            $user = User::find($request->id);
            $payout_detail = !empty($user->profile) ? Helper::getUnserializeData($user->profile->payout_settings) : array();
            $json['type'] = 'success';
            $json['payouts'] = $payout_detail;
            return $json;
        } else {
            $json['type'] = 'error';
            $json['message'] = trans('lang.verify_code');
            return $json;
        }
    }
}
