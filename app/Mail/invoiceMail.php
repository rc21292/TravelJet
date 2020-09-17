<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use DB;
use App\Invoice;
use Illuminate\Http\Request;

class invoiceMail extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     *
     * @return void
     */

     public function __construct($invoice)
    {
        $this->invoice = $invoice;
    }


    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        $data=['name'=>$this->invoice->customer_name];
         return $this->view('emails.invoice_mail',$data)
                    ->attach(public_path('/invoices/invoice_'.$this->invoice->id.'.pdf'), [
                         'as' => 'invoice_'.$this->invoice->id.'.pdf',
                         'mime' => 'application/pdf',
                    ]);
    }
}
