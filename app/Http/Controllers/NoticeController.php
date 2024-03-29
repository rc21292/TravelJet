<?php

namespace App\Http\Controllers;

use App\Notice;
use App\Job;
use Illuminate\Http\Request;
use Auth;
use Session;
use Redirect;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Input;
use App\Helper;
use ValidateRequests;
use App\User;
use App\Profile;
use DB;
use App\SiteManagement;
use Carbon\Carbon;


use App\Http\Controllers\Controller;

class NoticeController extends Controller
{

    protected $notice;
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */


    public function __construct(Notice $notice)
    {
        // $this->middleware('auth');
        $this->notice = $notice;

    }

    public function index(Request $request)
    {
        $user_id = $request->id;
        $user_data = User::where('id',$user_id)->select('role')->first();
        $user_created_at = User::where('id',$user_id)->value('created_at');
        if ($user_data->role === 'agent') {

            Notice::whereIn('receiver_id',[0,$user_id])->whereIn('type', ['job_post','award'])->update(['status'=>1]);

            return $notices = $this->notice::whereIn('type', ['job_post','award'])->where('created_at','>=',$user_created_at)->whereIn('receiver_id',[0,$user_id])->orderBy('created_at','DESC')->paginate(15);
        } elseif ($user_data->role === 'admin') {

            Notice::where('receiver_id',1)->update(['status'=>1]);

            $notices = $this->notice::where('receiver_id',1)->orderBy('created_at','DESC');
            return $notices->get();
        } else {

            Notice::where('receiver_id',$user_id)->whereIn('type', ['quotation','booked','invoice'])->update(['status'=>1]);

            return $notices = $this->notice::whereIn('type', ['quotation','booked','invoice'])->where('created_at','>=',$user_created_at)->where('receiver_id',$user_id)->orderBy('created_at','DESC')->get();
        }
    }

    public function countNotificationsByCustomerId($id)
    {
        $user_created_at = User::where('id',$id)->value('created_at');

        return $notice_count = Notice::whereIn('type', ['quotation','booked','invoice'])->where('created_at','>=',$user_created_at)->where('receiver_id',$id)->where('status',0)->count();
    }

    public function countNotificationsByAgentId($id)
    {
        $user_created_at = User::where('id',$id)->value('created_at');

        return $notice_count = Notice::whereIn('type', ['job_post','award'])->where('created_at','>=',$user_created_at)->whereIn('receiver_id',[0,$id])->where('status',0)->count();
    }

    public function getAdminNotifications(Request $request)
    {
        $user_id = 1;
        $user_data = User::where('id',$user_id)->select('role')->first();
        $user_created_at = User::where('id',$user_id)->value('created_at');
            return $notices = $this->notice::whereIn('type', ['commission'])->where('receiver_id',$user_id)->orderBy('created_at','DESC')->paginate(3);
    }

     public function getAgentNotifications($id)
    {
        $user_id = $id;
        $user_data = User::where('id',$user_id)->select('role')->first();
        $user_created_at = User::where('id',$user_id)->value('created_at');
        $notices = $this->notice::whereIn('type', ['job_post','award'])->where('created_at','>=',$user_created_at)->whereIn('receiver_id',[0,$user_id])->orderBy('created_at','DESC');
        return $notices->take(5)->get();
        
    }

     public function getCustomerNotificattions($id)
    {
        $user_id = $id;
        $user_data = User::where('id',$user_id)->select('role')->first();
        $user_created_at = User::where('id',$user_id)->value('created_at');
            $notices = $this->notice::whereIn('type', ['quotation','booked','invoice'])->where('created_at','>=',$user_created_at)->where('receiver_id',$user_id)->orderBy('created_at','DESC');
            return $notices->take(5)->get();
    }


    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Notice  $notice
     * @return \Illuminate\Http\Response
     */
    public function show(Notice $notice)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Notice  $notice
     * @return \Illuminate\Http\Response
     */
    public function edit(Notice $notice)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Notice  $notice
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Notice $notice)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Notice  $notice
     * @return \Illuminate\Http\Response
     */
    public function destroy(Notice $notice)
    {
        //
    }
}
