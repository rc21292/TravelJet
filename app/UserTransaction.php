<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class UserTransaction extends Model
{
    protected $fillable = ['user_id', 'receiver_id', 'description', 'type','amount'];

    protected $dates = [
        'created_at',
        'updated_at',
    ];
}
