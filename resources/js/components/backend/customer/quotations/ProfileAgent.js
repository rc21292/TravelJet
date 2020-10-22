import React from 'react'  
import axios from 'axios';  
import { useHistory, useLocation } from 'react-router-dom'

import StarRatings from 'react-star-ratings';

import Pagination from "react-js-pagination";
import { useState, useEffect } from 'react'  

import Moment from 'react-moment'

function ProfileAgent({match}) { 

  const history = useHistory()
  const location = useLocation()

  const [user, setUser] = useState(false);
  const [agent, setAgent] = useState({});
  const [agentProfile, setAgentProfile] = useState({});
  const [agentReviews, setAgentReviews] = useState({});
  const [agentTripSold, setAgentTripSold] = useState(0);
  const [agentTestimonials, setAgentTestimonials] = useState([]);
  const [portfoliosData, setPortfoliosData] = useState([]);
  const [portfolioData, setPortfolioData] = useState({});

  useEffect(() => {  

    let profile_id =location.pathname.substring(location.pathname.lastIndexOf('/') + 1);

    let stateqq = localStorage["appState"];
    if (stateqq) {
      let AppState = JSON.parse(stateqq);
      setUser(AppState.user);
      axios.get('/api/users/show/'+profile_id)
        .then(response=>{
          if (response.data) {
            setAgent(response.data);
          }else{
          }
      });
      axios.get('/api/users/agenProfile/'+profile_id)
        .then(response=>{
          if (response.data) {
            setAgentProfile(response.data);
          }else{
          }
      });

      axios.get('/api/getAgenReviews/'+profile_id)
        .then(response=>{
          if (response.data) {
            setAgentReviews(response.data);
          }else{
          }
      });

      axios.get('/api/getAgentTestimonials/'+profile_id)
        .then(response=>{
          if (response.data) {
            setAgentTestimonials(response.data);
          }else{
          }
      });

      axios.get('/api/users/countSoldTrips/'+profile_id)
        .then(response=>{
          if (response.data) {
            setAgentTripSold(response.data);
          }else{
          }
      });

      axios.get('/api/users/getProfilePortfolio/'+profile_id)
        .then(response=>{
          if (response.data) {
            setPortfoliosData(response.data);
          }else{
          }
      });
    }   

  }, []);   

  const openModal = (id) => {
     axios.get('/api/users/getPortfolioById/'+id)
        .then(response=>{
          if (response.data) {
            setPortfolioData(response.data);
          }else{
          }
      });
  }


  const openChatBox = () => {
    history.push("/customer/inbox")
  };  

		return (
         <div className="viewquotation viewprofile">
        <h3>Booking Profile</h3>
        <div className="wt-userlistinghold wt-featured">
          <div className="wt-rightarea"> <span className="wt-starsvtwo">
              <StarRatings
                  rating={agentReviews.average_rating_count}
                  starRatedColor="red"
                  numberOfStars={5}
                  starDimension="20px"
                starSpacing="1px"
                />
            </span>
            <span className="wt-starcontent">{agentReviews.average_rating_count}/<sub>5</sub> <em>({agentReviews.feedbacks} Feedback)</em></span>
          </div>
          <figure className="wt-userlistingimg">
          {agentProfile.profile ?
            <img src={"/uploads/users/"+agentProfile.user_id+"/profile/"+agentProfile.profile} alt="image description" />
          : 
          <img src="/uploads/users/profile.png" alt="image description" />
        }
          </figure>
          <div className="wt-userlistingcontent">
            <div className="wt-contenthead"> <a><span />I'm Online!</a>
              <div className="wt-title">
                <a>
                  <div className="username">{agent.name}</div>
                </a>
                <h2>{agentTripSold} trips sold | <a >{agentReviews.feedbacks} Superb Reviews</a></h2>
                <div className="rating">
                  <div className="reviews-profile"> <span className="heading"> {agentReviews.average_rating_count} </span> 
                   <StarRatings
                      rating={agentReviews.average_rating_count}
                      starRatedColor="red"
                      numberOfStars={5}
                      starDimension="20px"
                      starSpacing="1px"
                    />
                  </div>
                </div>
              </div>
              <div className="roundtrip"> {(agentProfile.city != '' || agentProfile.city != 'null') && agentProfile.city} | {(agentProfile.state != '' || agentProfile.state != 'null') && agentProfile.state}</div>
              <div className="country">
                <img src="/images/icons/flag.png" alt="flag" /> <span>{agentProfile.country}</span>
              </div>
              <ul className="wt-userlisting-breadcrumb">
                <li><span> <a href={"/chatify/"+agentProfile.user_id} className="btn btn-default chatbtn">Chat Now</a></span>
                </li>
              </ul>
            </div>
          </div>
          <div className="clearfix" />
          <div className="about">
            <div className="subtitle">About</div>
            <hr />
            <div className="row">
              <div className="col-sm-12">
                <p>{agentProfile.about}</p>
              </div>
            </div>
          </div>
          {/*AboutEnd*/}
          <div className="portfolio">
            <div className="subtitle">Portfolio</div>
            <hr />
            <div className="row">
              <div className="portfolio-item">
              {
                portfoliosData.map((user,i)=>{
                  return (
                    <div key={i} className="col-sm-3">
                  <a data-toggle="modal" onClick={() => openModal(user.id)} data-target="#exampleModal">
                    <img className="img-responsive" src={'/uploads/users/portfolios/'+user.user_id+'/'+user.image} alt="" />
                  </a>
                </div>
                    )
                })
              }
              </div>
              {/* Modal */}
              <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5>{portfolioData.title}</h5>
                      <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">×</span>
                      </button>
                    </div>
                    <div className="modal-body">
                      <h6>{portfolioData.title}</h6>
                      <p>{portfolioData.detail}</p>
                    </div>
                    <div className="modal-footer">
                    </div>
                  </div>
                </div>
              </div>
              {/*End Modal*/}
            </div>
          </div>
          {/*PortfolioEnd*/}
          <div className="clienttestimonial">
            <div className="subtitle">Testimonials</div>
            <hr />
            <div className="row">
              <div className="col-md-12">
                <div className="carousel slide" data-ride="carousel" id="quote-carousel">
                  {/* Carousel Slides / Quotes */}
                  <div className="carousel-inner text-center">
                    {agentTestimonials.map((testimonials,i)=>{
                        return( <div key={i} className={i==0 ? "item active" : "item" }>
                          <div className="wt-userlistinghold wt-featured">
                            <div className="wt-rightarea"> <i className="fa fa-inr" /> {testimonials.booking_amount}/-</div>
                            <figure className="wt-userlistingimg">
                            {testimonials.profile ?
                              <img style={{ width: "50px"}} src={"/uploads/users/"+testimonials.user_id+"/"+testimonials.profile} alt="image description" />
                              : 
                              <img style={{ width: "50px"}} src="/uploads/users/profile.png" alt="image description" />
                            }
                            </figure>
                            <div className="wt-userlistingcontent">
                              <div className="wt-contenthead">
                                <div className="wt-title">{testimonials.name} <span></span>
                                  <div className="rating">
                                    <div className="reviews-profile"> <span className="heading">{testimonials.rating}</span>
                                     <StarRatings
                                        rating={testimonials.rating}
                                        starRatedColor="red"
                                        numberOfStars={5}
                                        starDimension="20px"
                                        starSpacing="1px"
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div className="col-sm-6">
                                  <div className="destination">Destination
                                    <p>{testimonials.booking_title}</p>
                                  </div>
                                </div>
                                <div className="col-sm-6">
                                  <div className="date">Date
                                    <p><Moment format="MMM, DD, YYYY">{testimonials.booking_date}</Moment></p>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="wt-description">
                              <p>{testimonials.feedback}</p>
                            </div>
                          </div>
                        </div>
                    )
                    })}
                  </div>
                  {/* Bottom Carousel Indicators */}
                  <ol className="carousel-indicators">
                    <li data-target="#quote-carousel" data-slide-to={0} className="active" />
                    <li data-target="#quote-carousel" data-slide-to={1} />
                    <li data-target="#quote-carousel" data-slide-to={2} />
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
		);
	
}
export default ProfileAgent