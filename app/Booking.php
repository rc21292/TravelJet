<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Booking extends Model
{
     protected $fillable = array(
     	
	'user_id','pickupstate','destinationstate','booking_type','pickup','origin','drop','depart','arrival','booking_name','name','email','mobile','stopeges','description','otp','password','for_sightseeing','no_of_adults','no_of_childrens','no_of_infants','vehicle_type','vehicle_when','vehicle_budget','distance','in_city','from_places','to_places'

    );

  protected $dates = [
        'created_at',
        'updated_at',
    ];

}
