<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Address extends Model
{
    protected $fillable = array(
        'name','user_id','mobile','pincode','locality','address','city','state','landmark','alternate_phone','address_type'
    );


  protected $dates = [
        'created_at',
        'updated_at',
    ];

   
}
