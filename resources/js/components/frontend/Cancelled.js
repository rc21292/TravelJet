import React from 'react'  
import axios from 'axios';  
import { useHistory, useLocation } from 'react-router-dom'

import Moment from 'react-moment';


import { useState, useEffect } from 'react'  
function Cancelled({match}) { 

  const history = useHistory()

  const [bookingData, setBookingData] = useState({});  
  const [customer, setCustomer] = useState({});  
  const [stopeges, setStopages] = useState(false);  
  
   useEffect(() => {  
    const GetData = async () => { 
      axios.get('/api/queries/show/'+match.params.id+'?type=cancel').then((result) => { 
      setBookingData(result.data); 

       axios.get('/api/users/show/'+result.data.user_id)
        .then(response=>{
          if (response.data) {
            setCustomer(response.data);
          }else{  
          }
        });
      }); 



       const result1 = await axios('/api/queries/getStopages/'+match.params.id);  
      setStopages(result1.data.stopages);  
    };  
  
    GetData();  
  }, []); 


  const cancelBooking = (id) => {  
    axios.delete('/api/queries/cancel/'+ id)  
      .then((result) => {  
       setBookingData(result.data);  
      });  
  };  

  return (  
     <div className="bookingvenderlist">
        <main id="wt-main" className="wt-main wt-haslayout wt-innerbgcolor">
          <div className="wt-main-section wt-haslayout">
            {/* User Listing Start*/}
            <div className="wt-haslayout">
              <div className="container">
                <div className="row">
                  <div id="wt-twocolumns" className="wt-twocolumns wt-haslayout">
                    <div className="vendersearchtrip">
                      <div className="col-sm-3 float-left">
                        <aside id="wt-sidebar" className="wt-sidebar wt-usersidebar viewbookingleft">
                          <div className="wt-widget wt-effectiveholder">
                            <div className="wt-widgettitle">
                              <h2>About the Customer</h2>
                            </div>
                            <div className="customerabout">
                              <ul className="list-unstyled">
                                 <li><span><i className="fa fa-user" />Name : {customer.name}</span></li>
                                <li><span><i className="fa fa-phone" />Contact Number : +91 {customer.phone}</span></li>
                                <li><span><i className="fa fa-envelope" />Email : {customer.email}</span></li>
                                <li><span><i className="fa fa-flag" />State : Delhi, INDIA</span></li>
                                <li><span><i className="fa fa-address-card" />Member Since : <Moment format="MMMM - YYYY">{customer.created_at}</Moment></span></li>
                              </ul>
                            </div>
                          </div>
                        </aside>
                      </div>
                    </div>
                    <div className="vendersearchlist">
                      <div className="col-sm-9 float-left">
                        <div className="rightColumns viewbookingright">
                          <div className="bookingdetail">
                            <div className="bookeddata">
                              <div className="bookingheader">
                                <div className="row">
                                  <div className="col-sm-6">
                                    <div className="bookdetail">
                                      <h3>Booking Details</h3>
                                    </div>
                                  </div>
                                  <div className="col-sm-6">
                                    <div className="headerbudget">
                                      <div className="budgetprice">
                                        <b>Budget:</b> <i className="fa fa-inr" /> {bookingData.vehicle_budget}
                                      </div>
                                      <span>Booking ID:000000{bookingData.id}</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="bookeddetail conformbooked">
                                <ul className="list-unstyled">
                                    <li><span><div className="oneway"> {bookingData.booking_type}</div><div className="paiddiv">Cancelled</div></span></li>
                                  <li><span><div className="bktitle">Booking Title:  {bookingData.booking_name}</div></span></li>
                                  <li><span>Pickup Location: <b>{bookingData.from_places}</b></span></li>
                                  <li><span>Stoppage During the trip :  <b>  {stopeges}</b></span></li>
                                  <li><span>Depart : <b>{bookingData.to_places}</b></span></li>
                                  <li><span>Pickup Time : <b>{bookingData.pickup}</b></span></li>
                                  <li><span>Number of Person : <b>{bookingData.no_of_adults} Adults + {bookingData.no_of_childrens } Childrens+ { bookingData.no_of_infants} infants</b></span></li>
                                  <li><span>Type of Vehicle : <b>{bookingData.vehicle_type}</b></span></li>
                                  <li><span>Total Kilometers : <b>570</b></span></li>
                                  <li><span>Description: <b>{bookingData.description}</b></span></li>
                                  <li></li>
                                  <li></li>
                                  <li></li>
                                  <li></li>
                                  <li></li>
                                  <li></li>
                                  <li></li>
                                  <li><span>Cancellation Reason: <b>{bookingData.cancellation_reason}</b></span></li>
                                </ul>
                              </div>
                            </div>{/*End*/}
                          </div>{/*End*/}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* User Listing End*/}
          </div>
        </main>
      </div>
  )  
}  
  
export default Cancelled