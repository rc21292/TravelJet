<?php
/**
 * Class Payout.
 *
 * @category Workman Supermarket
 *
 * @package Workman Supermarket
 * @author  N2R Technologies <info@n2rtechnologies.com>
 * @license https://www.n2rtechnologies.com N2R Technologies
 * @link    https://www.n2rtechnologies.com 
 */
namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * Class Payout
 *
 */
class Payout extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'user_id','amount','reciver_id','transaction_id','payment_method','status'
    ];

    /**
     * Get the user that owns the payout.
     *
     * @return relation
     */
    public function user()
    {
        return $this->belongsTo('App\User');
    }

}
