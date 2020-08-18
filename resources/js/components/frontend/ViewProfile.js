import React from 'react';
import ReactDOM from 'react-dom';
import { useHistory, useLocation } from 'react-router-dom'

import { useState, useEffect } from 'react'
import {BrowserRouter as Router, Link, Route, Redirect} from 'react-router-dom';



const validEmailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);

function Profile() {


    const initialProfileState = {
    user_id: null,
    name:"",
    father_name:"",
    email:"",
    mobile:"",
    address:"",
    pincode:"",
    city:"",
    state:"",
    country:"",
    alt_number:"",
    dob:"",
    birth_place:"",
    marital_state:"",
    category:"",
    password:"",
    passport_size_photo:"",
    signature_photo:"",
    aadhar_front_photo:"",
    aadhar_back_photo:"",
    driving_license_front_photo:"",
    driving_license_back_photo:"",
    pancard_photo:"",
    passport_front_photo:"",
    passport_back_photo:"",
    business_type:"",
    company:"",
    website:"",
    cinno_photo:"",
    company_pancard_photo:"",
    office_address_proof_photo:"",
    gstno_photo:"",
    business_description:"",
    beneficiary_name:"",
    branch_ifsc_code:"",
    account_number:"",
    confirm_account_number:"",
    paytm_number:"",
  };


  const [profileData, setProfileData] = useState(initialProfileState);
  const [user, setUser] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);
  const [errors, setErrors] = useState({});

  const [readonlyName, setReadonlyName] = useState(true);
  const [readonlyEmail, setReadonlyEmail] = useState(true);
  const [readonlyPhone, setReadonlyPhone] = useState(true);

  const [gender, setGender] = useState('');

  const history = useHistory()

  useEffect(() => {
    let stateqq = localStorage["appState"];
    if (stateqq) {
      let AppState = JSON.parse(stateqq);
      setUser(AppState.user);
      setProfileData({...profileData, user_id: AppState.user.id,name: AppState.user.name,email: AppState.user.email,phone: AppState.user.phone});
      axios('/api/users/getAgentProfile/'+AppState.user.id).then(result=>{
        setProfileData(result.data);
      });
      if (AppState.isLoggedIn == false) {
        history.push('/login');
      }
    }   

  },[]); 

  const handleChange = (event) => {
    const { name, value } = event.target;
   setProfileData({...profileData, [name]:value})
  }

  const saveProfile = (event) => {
    event.preventDefault();
    var query = profileData;
    axios.post('/api/users/saveAgentProfile/'+user.id,query).then(res=>
    {
      window.location.reload(false);
    });
  }

  return (

 <div className="viewquotation viewprofile">
        <h3>Booking Profile</h3>
        <div className="wt-userlistinghold wt-featured">
          <div className="wt-rightarea"> <span className="wt-starsvtwo">
              <i className="fa fa-star fill" />
              <i className="fa fa-star fill" />
              <i className="fa fa-star fill" />
              <i className="fa fa-star fill" />
              <i className="fa fa-star fill" />
            </span>
            <span className="wt-starcontent">0/<sub>5</sub> <em>(0 Feedback)</em></span>
          </div>
          <figure className="wt-userlistingimg">
            <img src="image/icons/profileimg.png" alt="image description" />
          </figure>
          <div className="wt-userlistingcontent">
            <div className="wt-contenthead"> <a href="#"><span />I'm Online!</a>
              <div className="wt-title">
                <a href="#">
                  <div className="username">Abhishek K.</div>
                </a>
                <h2>507 trips sold | <a href>172 Superb Reviews</a></h2>
                <div className="rating">
                  <div className="reviews-profile"> <span className="heading">0.0</span>
                    <span className="fa fa-star checked" />
                    <span className="fa fa-star checked" />
                    <span className="fa fa-star checked" />
                    <span className="fa fa-star checked" />
                    <span className="fa fa-star" />
                  </div>
                </div>
              </div>
              <div className="roundtrip">Himachal | Uttarakhand | Delhi | Uttarpradesh | Panjab</div>
              <div className="country">
                <img src="image/icons/flag.png" alt="flag" /> <span>Delhi, India</span>
              </div>
              <ul className="wt-userlisting-breadcrumb">
                <li><span> <a href="#" className="btn btn-info">Contact Vendor</a></span>
                </li>
                <li><span> <a href="#" className="btn btn-default chatbtn">Chat Now</a></span>
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
                <p>Planning a weekend getaway? Our outstation cab services will help you explore the best destinations, visit all the must-see places and taste the best local food. Did you just land at an airport or railway station closest to your destination? No problem! You can use our airport taxi, the transit pick up service to cover the last mile. We'll get you to your destination and show you some of the best sights along the way</p>
              </div>
            </div>
          </div>
          {/*AboutEnd*/}
          <div className="portfolio">
            <div className="subtitle">Portfolio</div>
            <hr />
            <div className="row">
              <div className="portfolio-item">
                <div className="col-sm-3">
                  <a href="#" data-toggle="modal" data-target="#exampleModal">
                    <img className="img-responsive" src="http://n2rtech.com/traveljetadmin/image/thumbnail_img.png" alt="" />
                  </a>
                </div>
                <div className="col-sm-3">
                  <a href="#" data-toggle="modal" data-target="#exampleModal">
                    <img className="img-responsive" src="http://n2rtech.com/traveljetadmin/image/thumbnail_img.png" alt="" />
                  </a>
                </div>
                <div className="col-sm-3">
                  <a href="#" data-toggle="modal" data-target="#exampleModal">
                    <img className="img-responsive" src="http://n2rtech.com/traveljetadmin/image/thumbnail_img.png" alt="" />
                  </a>
                </div>
                <div className="col-sm-3">
                  <a href="#" data-toggle="modal" data-target="#exampleModal">
                    <img className="img-responsive" src="http://n2rtech.com/traveljetadmin/image/thumbnail_img.png" alt="" />
                  </a>
                </div>
              </div>
              {/* Modal */}
              {/* Modal */}
              <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5>Lorem Ipsum</h5>
                      <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">×</span>
                      </button>
                    </div>
                    <div className="modal-body">
                      <h6>About The Lorem</h6>
                      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque at massa luctus, rhoncus turpis eget, facilisis neque. Phasellus quis felis eu lorem congue faucibus sit amet ac arcu. Pellentesque ultrices id lorem sit amet ullamcorper. Quisque a suscipit enim. Nulla molestie tellus ante, sed lobortis urna mattis eget.</p>
                    </div>
                    <div className="modal-footer">
                      <h6>Highlights</h6>
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
                    {/* Quote 1 */}
                    <div className="item active">
                      <div className="wt-userlistinghold wt-featured">
                        <div className="wt-rightarea"> <i className="fa fa-inr" /> 15000/-</div>
                        <figure className="wt-userlistingimg">
                          <img src="image/icons/chat-profile.png" alt="image description" />
                        </figure>
                        <div className="wt-userlistingcontent">
                          <div className="wt-contenthead">
                            <div className="wt-title">Avishek, <span>New Delhi</span>
                              <div className="rating">
                                <div className="reviews-profile"> <span className="heading">0.0</span>
                                  <span className="fa fa-star checked" />
                                  <span className="fa fa-star checked" />
                                  <span className="fa fa-star checked" />
                                  <span className="fa fa-star checked" />
                                  <span className="fa fa-star" />
                                </div>
                              </div>
                            </div>
                            <div className="col-sm-6">
                              <div className="destination">Destination
                                <p>Himachal - Manali - Shimla</p>
                              </div>
                            </div>
                            <div className="col-sm-6">
                              <div className="date">Date
                                <p>May, 12, 2020</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="wt-description">
                          <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>
                        </div>
                      </div>
                    </div>
                    {/* Quote 2 */}
                    <div className="item">
                      <div className="wt-userlistinghold wt-featured">
                        <div className="wt-rightarea"> <i className="fa fa-inr" /> 19000/-</div>
                        <figure className="wt-userlistingimg">
                          <img src="image/icons/chat-profile.png" alt="image description" />
                        </figure>
                        <div className="wt-userlistingcontent">
                          <div className="wt-contenthead">
                            <div className="wt-title">Amit, <span>New Delhi</span>
                              <div className="rating">
                                <div className="reviews-profile"> <span className="heading">0.0</span>
                                  <span className="fa fa-star checked" />
                                  <span className="fa fa-star checked" />
                                  <span className="fa fa-star checked" />
                                  <span className="fa fa-star checked" />
                                  <span className="fa fa-star" />
                                </div>
                              </div>
                            </div>
                            <div className="col-sm-6">
                              <div className="destination">Destination
                                <p>Himachal - Manali - Shimla</p>
                              </div>
                            </div>
                            <div className="col-sm-6">
                              <div className="date">Date
                                <p>May, 12, 2020</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="wt-description">
                          <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>
                        </div>
                      </div>
                    </div>
                    {/* Quote 3 */}
                    <div className="item">
                      <div className="wt-userlistinghold wt-featured">
                        <div className="wt-rightarea"> <i className="fa fa-inr" /> 15000/-</div>
                        <figure className="wt-userlistingimg">
                          <img src="image/icons/chat-profile.png" alt="image description" />
                        </figure>
                        <div className="wt-userlistingcontent">
                          <div className="wt-contenthead">
                            <div className="wt-title">Amit, <span>New Delhi</span>
                              <div className="rating">
                                <div className="reviews-profile"> <span className="heading">0.0</span>
                                  <span className="fa fa-star checked" />
                                  <span className="fa fa-star checked" />
                                  <span className="fa fa-star checked" />
                                  <span className="fa fa-star checked" />
                                  <span className="fa fa-star" />
                                </div>
                              </div>
                            </div>
                            <div className="col-sm-6">
                              <div className="destination">Destination
                                <p>Himachal - Manali - Shimla</p>
                              </div>
                            </div>
                            <div className="col-sm-6">
                              <div className="date">Date
                                <p>May, 12, 2020</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="wt-description">
                          <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>
                        </div>
                      </div>
                    </div>
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

export default Profile