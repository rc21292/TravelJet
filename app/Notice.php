<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Notice extends Model
{
	protected $fillable = ['user_id', 'receiver_id', 'data', 'type'];

    protected $dates = [
        'created_at',
        'updated_at',
    ];
}
