<?php

namespace App\Http\Controllers;

use App\Quotation;
use App\User;
use App\Booking;
use App\Notice;
use App\QuotationDetail;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use DB;

class QuotationController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
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
    }


    public function updatePaymentStatus(Request $request, $id)
    {
        $quotation =  Quotation::where('id',$id)->first();

        if ($quotation->payments_status) {

            $rr =(array)json_decode($quotation->payments_status);
            $rr[$request->amount] = 'paid';

            DB::table('quotations')
            ->where('id', $id)
            ->update(['payments_status'=> json_encode($rr)]);

        }else{

           $new = array();
           foreach (unserialize($quotation->payments) as $key => $value) {

               if ($value['payment'] == $request->amount) {
                $new[$value['payment']] ='paid';
            }else{
                $new[$value['payment']] ='unpaid';
            }
        }

        DB::table('quotations')
        ->where('id', $id)
        ->update(['payments_status'=> json_encode($new)]);
    }


        // echo $id;
        // echo "<pre>";print_r($request->all());"</pre>";exit;

    $booking =  Booking::where('id',$quotation->booking_id)->first();

    $user = User::where('id', $booking->user_id)->first();

        /*$message = "<a href='/profile/".$user->id."'> ".$user->name." </a> <span> awarded booking </span> <a href='/bookings/".$quotation->booking_id."'>".$booking->booking_name."</a>";

        Notice::create(['user_id' => $booking->user_id, 'receiver_id' => $quotation->user_id, 'data' => $message , 'type' => 'award', 'created_at' => \Carbon\Carbon::now()]);
        */

        return response()->json([
            'success' => true,
            'message' => 'Payment Status updated!'
        ], 200);
    }

    public function awardBooking(Request $request, $id)
    {
        DB::table('quotations')
        ->where('id', $id)
        ->update(['status'=> 'awarded']);

        $quotation =  Quotation::where('id',$id)->first();

        DB::table('bookings')
        ->where('id', $quotation->booking_id)
        ->update(['status'=> 'awarded']);

       $user = User::where('id',$request->user_id)->first();
        $user->withdraw($request->wallet);

        $booking =  Booking::where('id',$quotation->booking_id)->first();

        $user = User::where('id', $booking->user_id)->first();

        $message = "<a href='/profile/".$user->id."'> ".$user->name." </a> <span> awarded booking </span> <a href='/bookings/".$quotation->booking_id."'>".$booking->booking_name."</a>";

        Notice::create(['user_id' => $booking->user_id, 'receiver_id' => $quotation->user_id, 'data' => $message , 'type' => 'award', 'created_at' => \Carbon\Carbon::now()]);


        return response()->json([
            'success' => true,
            'message' => 'Booking awarded!'
        ], 200);

    }



    public function storeQuotation(Request $request)
    {
        $data = $request->except('payments');


        $user = User::where('id',$request->user_id)->first();
        $booking = Booking::where('id',$request->booking_id)->first();

        $data_re = Quotation::create($data);

        $payments_data = $request->payments;

        unset($payments_data[0]);

        if (isset($payments_data)) {

            DB::table('quotations')
            ->where('id', $data_re->id)
            ->update(['payments' => serialize(array_values($payments_data)),'agent_id' => $request->user_id]);

        }            

        $quotation_data = [
            'user_id' => $request->user_id,
            'booking_id' => $request->booking_id,
            'quotation_id' => $data_re->id
        ];

        $data = QuotationDetail::create($quotation_data);

        DB::table('bookings')
            ->where('id', $request->booking_id)
            ->update(['status' => 'bidded']);


        $message = "<a href='/profile/".$request->user_id."'> ".$user->name." </a> <span> bidded on booking </span> <a href='/customer/quotations/'>".$booking->booking_name."</a>";

        Notice::create(['user_id' => $request->user_id, 'receiver_id' => $booking->user_id, 'data' => $message , 'type' => 'quotation', 'created_at' => \Carbon\Carbon::now()]);


        return response()->json([
            'success' => true,
            'id' => $data_re->id,
            'message' => 'Bid Placed successfully!'
        ], 201);
    }


    public function storeQuotationDetails(Request $request, $id)
    {
        $data = $request->except('stopeges');
        $data_re = DB::table('quotation_details')
        ->where('user_id', $request->user_id)
        ->where('quotation_id', $id)
        ->update($data);

        $stopages_data = $request->stopeges;

        unset($stopages_data[0]);

        if (isset($stopages_data)) {

            DB::table('quotation_details')
            ->where('user_id', $request->user_id)
            ->where('quotation_id', $id)
            ->update(['stopeges' => json_encode(array_values($stopages_data))]);

        }

        if ($request->total_kilometer > 0) {
             DB::table('bookings')
            ->where('id', $request->booking_id)
            ->update(['distance' => $request->total_kilometer]);
        }

        return response()->json([
            'success' => true,
            'message' => 'Bid Placed successfully!'
        ], 201);
    }


    public function updateQuotationDetails(Request $request, $id)
    {
        $data = $request->except('stopeges');
        $data_re = DB::table('quotation_details')
        ->where('user_id', $request->user_id)
        ->where('quotation_id', $id)
        ->update($data);

        $stopages_data = $request->stopeges;


        if (isset($stopages_data)) {
        unset($stopages_data[0]);

            DB::table('quotation_details')
            ->where('user_id', $request->user_id)
            ->where('quotation_id', $id)
            ->update(['stopeges' => json_encode(array_values($stopages_data))]);

        }

        if ($request->total_kilometer > 0) {
             DB::table('bookings')
            ->where('id', $request->booking_id)
            ->update(['distance' => $request->total_kilometer]);
        }
        

        return response()->json([
            'success' => true,
            'message' => 'Bid Placed successfully!'
        ], 201);
    }

   public function storeBid(Request $request)
    {                           
        $payments_data = $request->payments;

        unset($payments_data[0]);

        $data = $request->except(['payments']);


        $exists = Quotation::where('user_id', $request->user_id)->where('booking_id', '=', $request->booking_id)->first();
        if ($exists === null) {

            $data_re = Quotation::create($data);

           
            if (isset($payments_data)) {

                DB::table('quotations')
                ->where('id', $data_re->id)
                ->update(['payments' => serialize(array_values($payments_data)),'agent_id' => $request->user_id]);

            }
            return response()->json([
                'success' => true,
                'addresses' => '',
                'message' => 'Bid Placed successfully!'
            ], 201);
        }else{
            DB::table('quotations')
            ->where('user_id', $request->user_id)
            ->where('booking_id', $request->booking_id)
            ->update($data);

            if (isset($payments_data)) {

                DB::table('quotations')
                ->where('user_id', $request->user_id)
                ->update(['payments' => serialize(array_values($payments_data)),'agent_id' => $request->user_id]);

            }

            return response()->json([
                'success' => true,
                'addresses' => '',
                'message' => 'Bid Edited successfully!'
            ], 201);
        }   

    }


    /**
     * Display the specified resource.
     *
     * @param  \App\Quotation  $quotation
     * @return \Illuminate\Http\Response
     */
    public function show(Quotation $quotation)
    {
        //
    }


    public function getQuotation($id)
    {
       return $quotation = Quotation::where('user_id',$id)->first();
    }

    public function checkQuotaions($id)
    {
        $qutations = Quotation::where('booking_id',$id)->first();

        if ($qutations) {
            $quotation = true;
        }else{

            $quotation = false;
        }
        return $quotation;
    }


    public function getQuotationById(Request $request, $id)
    {
        return $quotation = Quotation::select('quotation_details.*','quotations.*','users.name')->join('quotation_details','quotations.id','quotation_details.quotation_id')->leftjoin('users','users.id','quotations.user_id')->where('quotations.id',$id)->first();
    }


    public function getQuotationDetailById(Request $request, $id)
    {
        return QuotationDetail::select('quotation_details.*','users.name')->join('users','users.id','quotation_details.user_id')->where('quotation_details.quotation_id',$id)->first();
    }


    public function getQuotationByBookingId(Request $request, $id)
    {

        if ($request->status == 'awarded') {
            $quotation = Quotation::select('quotation_details.*','quotations.*','users.name')->join('quotation_details','quotations.id','quotation_details.quotation_id')->leftjoin('users','users.id','quotations.user_id')->where('quotations.booking_id',$id)->where('quotations.status','awarded')->first();


            $quotation->payments = unserialize($quotation->payments);
            $kkk = array();

            foreach ($quotation->payments as $key => $value) {

                if ($quotation->payments_status) {
                    $rr =(array)json_decode($quotation->payments_status);
                    $kkk[$key]['status'] =$rr[$value['payment']];
                    $kkk[$key]['payment'] =$value['payment'];
                    $kkk[$key]['date'] =@$value['date'];
                }else{
                    $kkk[$key]['status'] ='unpaid';
                    $kkk[$key]['payment'] =$value['payment'];
                    $kkk[$key]['date'] =@$value['date'];
                }

            }
            $quotation->payments = $kkk;

        }else{

            $qutations = Quotation::where('booking_id',$id)->first();

            if ($qutations) {
                $quotation = Quotation::select('quotation_details.*','quotations.*','users.name')->join('quotation_details','quotations.id','quotation_details.quotation_id')->leftjoin('users','users.id','quotations.user_id')->where('quotations.booking_id',$id)->get();
            }else{

                 $quotation = Booking::
         leftjoin('quotations', 'bookings.id' ,'quotations.booking_id')
         ->select('bookings.*')
         ->where('bookings.id',$id)->where('bookings.status','!=','booked')->where('bookings.status','!=','awarded')
         ->get();
            }

        $quotation = $quotation->map(function($i) {
            $i->payments = unserialize($i->payments);
            return $i;
        });


        }        

        return $quotation;
    }


    public function getQuotationByBookingUserId(Request $request, $id , $user_id)
    {
         DB::connection()->enableQueryLog();
        // $quotation = Quotation::select('quotations.*','users.name')->join('users','users.id','quotations.user_id')->where('quotations.booking_id',$id)->where('quotations.user_id',$user_id)->where('quotations.status','awarded')->where('quotations.status', '!=', 'booked')->first();

         $quotation = Quotation::select('quotations.*','users.name')->join('users','users.id','quotations.user_id')->where('quotations.booking_id',$id)->where('quotations.user_id',$user_id)->where('quotations.status','pending')->first();

         $queries = DB::getQueryLog();
         $last_query = end($queries);
         // echo "<pre>";print_r($last_query);"</pre>";exit;

       return $quotation;
   }

   /*public function getQuotationByBookingUserId(Request $request, $id , $user_id)
    {
         DB::connection()->enableQueryLog();
        $quotation = Quotation::select('quotations.*','quotation_details.*','users.name')->leftjoin('quotation_details','quotations.id','quotation_details.quotation_id')->join('users','users.id','quotations.user_id')->where('quotations.booking_id',$id)->where('quotations.user_id',$user_id)->where('quotations.status', '!=', 'awarded')->where('quotations.status', '!=', 'booked')->first();

         $queries = DB::getQueryLog();
         $last_query = end($queries);
         // echo "<pre>";print_r($last_query);"</pre>";exit;

       return $quotation;
   }*/


    public function getQuotationPayment($id,$user_id)
    {
        $quotation = Quotation::where('user_id',$user_id)->where('booking_id',$id)->where('status','awarded')->first();
        // echo "<pre>";print_r($quotation);"</pre>";exit;
        if (!empty($quotation->payments)) {

            $cars = array("payment"=>'');

            $ttt = array();
            $ttt = unserialize($quotation->payments);
            array_unshift($ttt, $cars);
        }else{
            $ttt = array();
        }
        return $ttt;
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Quotation  $quotation
     * @return \Illuminate\Http\Response
     */
    public function edit(Quotation $quotation)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Quotation  $quotation
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Quotation $quotation)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Quotation  $quotation
     * @return \Illuminate\Http\Response
     */
    public function destroy(Quotation $quotation)
    {
        //
    }
}
