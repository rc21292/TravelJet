<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class UserCredit extends Model
{
	protected $fillable = array(

		'user_id','credits'
		
	);

	protected $dates = [
		'created_at',
		'updated_at',
	];

}
