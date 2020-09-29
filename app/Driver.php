<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Driver extends Model
{
	protected $fillable = array(
		'user_id','name','mobile','driving_licence','licence_photo','status'
	);

	protected $dates = [
		'created_at',
		'updated_at',
	];
}
