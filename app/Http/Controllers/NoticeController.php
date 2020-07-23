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
            $notices = $this->notice::where('type', 'notice')->orderBy('created_at','DESC');
            Notice::where('receiver_id',$user_id)->update(['status'=>1]);
            Notice::where('type', 'notice')->update(['status'=>1]);
            return $notices->get();
        } elseif ($user_data->role === 'admin') {
            $notices = $this->notice::orderBy('created_at','DESC');
            return $notices->get();
        } else {
            $notices = $this->notice::where('type', 'job_post')->where('receiver_id',$user_id)->orderBy('created_at','DESC');
            Notice::where('receiver_id',$user_id)->update(['status'=>1]);
            Notice::where('type', 'job_post')->update(['status'=>1]);
            return $notices->get();
        }
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
