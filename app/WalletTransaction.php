<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class WalletTransaction extends Model
{
    protected $fillable = ['wallet_transactions','id','user_id','receiver_id','booking_id','transaction_id','booking_name','type','amount','description','status'];

    protected $dates = [
        'created_at',
        'updated_at',
    ];
}
