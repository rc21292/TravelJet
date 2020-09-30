<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Vehicle extends Model
{
    protected $dates = [
		'created_at',
		'updated_at',
	];
}
