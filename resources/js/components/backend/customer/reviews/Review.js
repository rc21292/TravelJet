import React from 'react'  
import axios from 'axios';  
import { useHistory, useLocation } from 'react-router-dom'

import { useState, useEffect } from 'react'  
function Review() { 

  const history = useHistory()

  const initialState = {
    user_id: null,
    booking_id: "",
    booking_title: "",
    booking_amount: "",
    booking_date: "",
    rating: "",
    feedback: "",
  };
  const [user, setUser] = useState(false);

  const [review, setReview] = useState(initialState);
  const [reviewData, setReviewData] = useState({});  
  const [profileId, setProfileId] = useState({});  
  
   useEffect(() => {  

     let stateqq = localStorage["appState"];
    if (stateqq) {
      let AppState = JSON.parse(stateqq);
      setUser(AppState.user);
    }

    let profile_id =location.pathname.substring(location.pathname.lastIndexOf('/') + 1);
    setProfileId(profile_id);  

    const GetData = async () => {  
      const result = await axios('/api/queries/show/'+profile_id);  
      setReviewData(result.data);  
    };  
  
    GetData();  
  }, []); 


   const ratingClick = event => {
    setReview({ ...review, rating: event.target.value });
  };

  const handleChange = event => {
    const { name, value } = event.target;
    setReview({ ...review, [name]: value });
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const query = {
      user_id:user.id,
      booking_id: reviewData.id,
      booking_title: reviewData.booking_name,
      booking_date: reviewData.created_at,
      rating: review.rating,
      feedback: review.feedback,
    }

    let user_id = user.id;
    axios.post('/api/saveReviews/',query).then(res=>
    { 
      if (res.data.success === true) {
        history.push('/customer/reviews')
      }
    });    
  } 

return (  
    <div className="booking-page">
        {/* Page Heading */}
        <h1>Reviews</h1>
        <div className="row">
          <div className="reviewfeedback">
            <div className="col-sm-9">
              <div className="cardbg total-transaction informationform">
                <div className="card-body">
                  <form className="filterform informationform">
                    <div className="form">
                      <div className="form-group row">
                        <label htmlFor="labelname" className="col-sm-3">Booking Title</label>
                        <div className="col-sm-9">
                          <input type="text" readOnly={true} className="form-control" defaultValue={reviewData.booking_name} />
                        </div>
                      </div>
                      <div className="form-group row">
                        <label htmlFor="labelname" className="col-sm-3">Rating</label>
                        <div className="col-sm-9">
                          <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="rating" onChange={ratingClick} value="1" />
                            <label className="form-check-label" htmlFor="inlineRadio1">&nbsp;1 </label>
                          </div>
                          <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="rating" onChange={ratingClick} value="2" />
                            <label className="form-check-label" htmlFor="inlineRadio2">&nbsp;2 </label>
                          </div>
                          <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="rating" onChange={ratingClick} value="3" />
                            <label className="form-check-label" htmlFor="inlineRadio3">&nbsp;3 </label>
                          </div>
                          <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="rating" onChange={ratingClick} value="4" />
                            <label className="form-check-label" htmlFor="inlineRadio4">&nbsp;4 </label>
                          </div>
                          <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="rating" onChange={ratingClick} value="5" />
                            <label className="form-check-label" htmlFor="inlineRadio5">&nbsp;5 </label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="form-group row">
                      <label htmlFor="labelname" className="col-sm-3">Description</label>
                      <div className="col-sm-9">
                        <div className="discriptioneditor">
                          <textarea name="feedback" rows={4} cols={50} className="form-control" onChange={handleChange} placeholder="Give Our Feedback" />
                        </div>
                      </div>
                    </div>
                    <div className="reviewbtn text-center">
                      <a onClick={handleSubmit} className="btn btn-primary">Submit</a>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  )  
}  
  
export default Review