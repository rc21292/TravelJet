<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Quotation extends Model
{
	protected $fillable = array(

		'user_id','booking_id','payment','total_payment','payment_first','payment_second','payments'
		
	);

	protected $dates = [
		'created_at',
		'updated_at',
	];

}
