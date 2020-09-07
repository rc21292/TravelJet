<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class QuotationDetail extends Model
{
	protected $fillable = array(

		'user_id','quotation_id','booking_id','type_of_booking','title_of_booking','pickup_state','pickup_location','destination_state','drop_location','inclusions','exclusions','cab_type','cab_model','total_kilometer','sitting_capacity','luggage_space','notes','stopeges'	

	);

	protected $dates = [
		'created_at',
		'updated_at',
	];

}
