<?php
/**
 * Class Invoice
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
 * Class Invoice
 *
 */
class Invoice extends Model
{

    /**
     * Set scope of the variables
     *
     * @access public
     *
     * @return array
     */
    protected $fillable = ['invoice_number', 'booking_id', 'customer_id', 'user_id',  'customer_name',  'sub_total',  'tax',  'total',  'billing_address',  'invoice_date',  'due_date',  'status'];

    protected $dates = ['created_at','updated_at'];

}
