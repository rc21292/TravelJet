<?php

namespace App\Http\Controllers;

use App\Quotation;
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

    public function storeBid(Request $request)
    {
        $payments_data = $request->payments;

        unset($payments_data[0]);

        $data = $request->except(['payments']);

        $exists = Quotation::where('user_id', '=', $request->user_id)->first();
        if ($exists === null) {

            $data_re = Quotation::create($data);

            if (isset($payments_data)) {

                DB::table('quotations')
                ->where('id', $data_re->id)
                ->update(['payments' => serialize(array_values($payments_data)),'agent_id' => $request->user_id]);

            }
        }else{
           DB::table('quotations')
           ->where('user_id', $request->user_id)
           ->update($data);

           if (isset($payments_data)) {

            DB::table('quotations')
            ->where('user_id', $request->user_id)
            ->update(['payments' => serialize(array_values($payments_data)),'agent_id' => $request->user_id]);

        }
    }





    return response()->json([
        'success' => true,
        'addresses' => '',
        'message' => 'Quotation Saved successfully!'
    ], 201);

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

    public function getQuotationPayment($id)
    {
       $quotation = Quotation::select('payments')->where('user_id',$id)->first();


//        $array['key1']['key2']=array();
// array_push($array,$array['key1']=>'one',$array['key2']=>'two')
// print_r($array['key1']['key2']);


// echo "<pre>";print_r(array_values(unserialize($quotation->payments)));"</pre>";exit;


$cars = array("payment"=>'');

$ttt = array();
$ttt = unserialize($quotation->payments);
array_unshift($ttt, $cars);

return $ttt;

echo "<pre>";print_r($ttt);"</pre>";exit;

foreach (unserialize($quotation->payments) as $key => $value) {
   echo "<pre>";print_r($value);"</pre>";exit;
}

       // $a=array([]["payment"=>""]);
array_push($cars,array_values(unserialize($quotation->payments)));


       echo "<pre>";print_r($cars);"</pre>";exit;
       return unserialize($quotation->payments);
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
