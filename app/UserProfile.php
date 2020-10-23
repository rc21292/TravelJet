<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class UserProfile extends Model
{

     protected $fillable = array('user_id','name','father_name','email','mobile','about','phone','address','pincode','city','state','country','marital_state','profile');

  protected $dates = [
        'created_at',
        'updated_at',
    ];

}
