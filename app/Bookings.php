<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Query extends Model
{
     protected $fillable = array('user_id','pickupstate','destinationstate','pickup','origin','drop','depart','arrival','booking_name','name','email','mobile','stopeges','description','otp','no_of_adults','no_of_childrens','no_of_infants');

  protected $dates = [
        'created_at',
        'updated_at',
    ];

}
