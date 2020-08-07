<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Booking extends Model
{
     protected $fillable = array(


	'user_id','pickupstate','destinationstate','pickup','origin','drop','depart','arrival','booking_name','name','email','mobile','stopeges','description','otp','no_of_adults','no_of_childrens','no_of_infants','vehicle_type','vehicle_when','vehicle_budget','in_city','from_places','to_places'

    );

  protected $dates = [
        'created_at',
        'updated_at',
    ];

}
