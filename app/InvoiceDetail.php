<?php
/**
 * Class InvoiceDetail
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
 * Class InvoiceDetail
 *
 */
class InvoiceDetail extends Model
{

    /**
     * Set scope of the variables
     *
     * @access public
     *
     * @return array
     */

    protected $fillable = ['invoice_id','booking_name','booking_description','qty','rate','amount'];
    
    protected $dates = ['created_at','updated_at'];
    
}
