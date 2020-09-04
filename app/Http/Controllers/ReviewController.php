<?php
/**
 * Class ReviewController
 *
 * @category Workman Supermarket
 *
 * @package Workman Supermarket
 * @author  N2R Technologies <info@n2rtechnologies.com>
 * @license https://www.n2rtechnologies.com N2R Technologies
 * @link    https://www.n2rtechnologies.com 
 */
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Review;
use App\Quotation;
use View;
use DB;
use Session;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Input;
use App\Helper;

/**
 * Class ReviewController
 *
 */
class ReviewController extends Controller
{
    /**
     * Defining scope of the variable
     *
     * @access public
     * @var    array $review
     */
    protected $review;

    /**
     * Create a new controller instance.
     *
     * @param instance $review         review instance
     * @param instance $review_options review options instance
     *
     * @return void
     */
    public function __construct(Review $review)
    {
        $this->review = $review;
    }

    /**
     * Display a listing of the resource.
     *
     * @param mixed $request Request Attributes
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        if (file_exists(resource_path('views/extend/back-end/admin/review-options/index.blade.php'))) {
            return View::make(
                'extend.back-end.admin.review-options.index',
                compact('review_options')
            );
        } else {
            return View::make(
                'back-end.admin.review-options.index',
                compact('review_options')
            );
        }
    }



    public function getAgenReviews($user_id)
    {
        $reviews = $this->review::where('receiver_id', $user_id)->latest()->get();
        $feedbacks = $this->review::select('feedback')->where('receiver_id', $user_id)->count(); 
        $average_rating_count = !empty($feedbacks) ? $reviews->sum('rating')/$feedbacks : 0;

        return response()->json([
            'success' => true,
            'feedbacks' => $feedbacks,
            'average_rating_count' => $average_rating_count
        ], 200);
    }


    public function getAgentTestimonials($user_id)
    {
       return $reviews = $this->review::join('users','reviews.user_id','users.id')->leftjoin('user_profiles','user_profiles.user_id','users.id')->select('reviews.*','users.name','user_profiles.profile')->where('receiver_id', $user_id)->latest('reviews.created_at')->take(5)->get();

    }


    /**
     * Store a newly created resource in storage.
     *
     * @param string $request string
     *
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {

        $quotation = Quotation::where('status', 'booked')->where('booking_id', '=', $request->booking_id)->first();

        $data_re = Review::create($request->all());

        if ($quotation) {
            DB::table('reviews')
            ->where('user_id', $request->user_id)
            ->where('booking_id', $request->booking_id)
            ->update(['receiver_id' => $quotation->user_id , 'booking_amount' => $quotation->total_payment]);
        }
        return response()->json([
            'success' => true,
            'message' => 'Review Submitted!'
        ], 201);

    }

    /**
     * Edit review options.
     *
     * @param int $id integer
     *
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        if (!empty($id)) {
            $review_options = $this->review_options::find($id);
            if (!empty($review_options)) {
                if (file_exists(resource_path('views/extend/back-end/admin/review-options/edit.blade.php'))) {
                    return View::make(
                        'extend.back-end.admin.review-options.edit', compact('id', 'review_options')
                    );
                } else {
                    return View::make(
                        'back-end.admin.review-options.edit', compact('id', 'review_options')
                    );
                }
                Session::flash('message', trans('lang.review_options_updated'));
                return Redirect::to('admin/review_options');
            }
        }
    }

    /**
     * Update review options.
     *
     * @param string $request string
     * @param int    $id      integer
     *
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $server_verification = Helper::worketicIsDemoSite();
        if (!empty($server_verification)) {
            Session::flash('error', $server_verification);
            return Redirect::back();
        }
        $this->validate(
            $request, [
            'review_option_title' => 'required',
            ]
        );
        $this->review_options->updateReviewOptions($request, $id);
        Session::flash('message', trans('lang.review_option_updated'));
        return Redirect::to('admin/review-options');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param mixed $request request attributes
     *
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request)
    {
        $server = Helper::worketicIsDemoSiteAjax();
        if (!empty($server)) {
            $json['type'] = 'error';
            $json['message'] = $server->getData()->message;
            return $json;
        }
        $json = array();
        $id = $request['id'];
        if (!empty($id)) {
            $this->review_options::where('id', $id)->delete();
            $json['type'] = 'success';
            return $json;
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param mixed $request request attributes
     *
     * @return \Illuminate\Http\Response
     */
    public function deleteSelected(Request $request)
    {
        $server = Helper::worketicIsDemoSiteAjax();
        if (!empty($server)) {
            $json['type'] = 'error';
            $json['message'] = $server->getData()->message;
            return $json;
        }
        $json = array();
        $checked = $request['ids'];
        foreach ($checked as $id) {
            $this->review_options::where("id", $id)->delete();
        }
        if (!empty($checked)) {
            $json['type'] = 'success';
            return $json;
        } else {
            $json['type'] = 'error';
            $json['message'] = trans('lang.something_wrong');
            return $json;
        }
    }
}
