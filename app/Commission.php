<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Commission extends Model
{
    protected $fillable = [
    	'user_id', 'receiver_id', 'booking_id', 'total_cost', 'commision', 'status'
    ];
}
