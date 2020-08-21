<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class QuotationDetail extends Model
{
	protected $fillable = array(

		'user_id','booking_id','quotation_id'
		
	);

	protected $dates = [
		'created_at',
		'updated_at',
	];

}
