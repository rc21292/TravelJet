<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use App\UserOtp;

class RegisterRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
            'phone' => ['required', 'string', 'min:10'],
            'otp' => ['required', 'string', 'min:4'],
        ];
    }


    public function withValidator($validator)
    {
        $validator->after(function ($validator) {

            if (\DB::table('user_otps')->where('phone',$this->input(['phone']))->count() > 0) {
                $user_otp = UserOtp::where('phone',$this->input(['phone']))->first()->otp;
                if ($user_otp != $this->input(['otp'])) {
                    $validator->errors()->add('otp', 'Otp not varified!');
                }
            }else{
                $validator->errors()->add('otp', 'Otp not varified!');
            }
        });
        return;
    }
}
