<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
// use Illuminate\Support\Facades\Session;
use App\User;
use App\UserOtp;
use DB;
use Session;

class LoginController extends Controller
{
  public $successStatus = 200;

  public function otp(Request $request) {
    if(isset($request->phone)){
      if ((strlen($request->phone) < 10 ) || (strlen($request->phone) > 32)) {
        $error = 1;  
        return response()->json(["message" => "Please Enter Correct Phone Number!"]); 
      }

      if (!isset($error)) {
        $phone = $request->phone;
        $check = DB::table('user_otps')->where('phone',$phone)->exists();
        if($check == true){
          $status = $this->updateOtp($phone);
          return response()->json(["message" => "Otp Sent Successfully"]);
        }else{
          $status = $this->sendOtp($phone);
          if($status){
            return response()->json(["message" => "Not Verified"]);
          } else {

            return response()->json(["message" => "Otp Sent Successfully"]);

          } 
        }
      }
    }
  }

  public function send($mob_num,$c)
  {   

    $url = "https://api.textlocal.in/send?apikey=eVOjMJgzkkw-IMW7saJmZSZUI9owgph5AMLvNaxTm4&numbers=$mob_num&sender=TXTLCL&message=Your%20Otp%20for%20Beetro%20Gym%20is%20$c";
    // $url = "https://sms.azmobia.com/http-tokenkeyapi.php?authentic-key=383162656574726f3538371542130398&senderid=BEETRO&route=1&number=$mob_num&message=Your%20Otp%20for%20Beetro%20Gym%20is%20$c";
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url); 
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1); 
    $output = curl_exec($ch);   
    $output = json_decode($output);
    curl_close($ch);
  }

  public function sendOtp($mob_num='')
  {
    $phone = $mob_num;
    $code = $this->setOTP();
    $user = new UserOtp;
    $user->phone = $phone;
    $user->otp = $code;
    $user->is_verified = 0;
    $user->created_at = now();
    $user->save();
    $this->send($mob_num , $code);
  }

  public function updateOtp($mob_num='')
  {
    $phone = $mob_num;
    $code = $this->setOTP();
    $res = DB::table('user_otps')->where('phone',$phone)->update([ 
      'otp' => $code, 
    ]);
    $this->send($mob_num , $code);
  }

  public function setOTP()
  {
    $a = mt_rand(1000, 9999); 
    $this->otp = $a;
    return $this->otp;
  }

  public function verify(Request $request) 
  {
    $phone = UserOtp::where('otp',$request->otp)->value('phone');
    $otp = UserOtp::where('phone',$request->phone)->value('otp');
    $phone_check = $this->checkUser($request);
    if($request->otp == $otp && $request->phone == $phone){
      if($phone_check){
        Auth::login($phone_check);
        $user = Auth::user();
        return response()->json(["message" => "Success","id" => $user->id]);
      }else{
        $user_id =  $this->registerphone($request);
        return response()->json(["message" => "Otp Verified Succesfully","id"=>$user_id]);
      }
    } else {
      return response()->json(["message" => "Not Verified"]);
    }
  }

  public function registerphone($request)
  {
    $user = new User;
    $user->name  = $request->name;
    $user->phone = $request->phone;
    $user->email = $request->email;
    $user->role = 'customer';
    $user->password = bcrypt($request['password']);
    $user->save();
    return $user->id;
  } 

  public function checkUser($request)
  {
    if (Auth::attempt(array('email' => $request->email, 'password' => $request->password))){
      return  $phone = User::where('email', '=', $request->email)->first();
    }
    else {        
      return false;
    }
  }

}