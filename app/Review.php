<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use DB;
use Auth;
use App\UserTransaction;

/**
 * Class Review
 *
 */
class Review extends Model
{

     protected $fillable = array(
       'user_id','receiver_id','booking_id','booking_title','booking_date','booking_amount','feedback','rating'
    );

  protected $dates = [
        'created_at',
        'updated_at',
    ];



    /**
     * Get user.
     *
     * @return polymorphic relation
     */
    public function user()
    {
        return $this->belongsTo('App\User');
    }

    /**
     * Submit Review
     *
     * @param mixed $request   req->attr
     * @param mixed $author_id Author ID
     *
     * @return request\response
     */
}
