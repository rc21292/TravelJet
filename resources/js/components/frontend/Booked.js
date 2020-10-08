import React from 'react'  
import axios from 'axios';  
import { useHistory, useLocation } from 'react-router-dom'

import Moment from 'react-moment';


import { useState, useEffect } from 'react'  
function Booked({match}) { 

  const history = useHistory()

  const [bookingData, setBookingData] = useState({});  
  const [quotationDetails, setQuotationDetails] = useState({});  
  const [customer, setCustomer] = useState({});  
  const [stopeges, setStopages] = useState(false);  

  const [saveData, setSaveData] = useState('');  
  const [invoice, setInvoice] = useState(false);  

  const [error, setError] = useState();  

  const [cancelReasons, setCancelReasons] = useState([]);  
  
   useEffect(() => {  
    const GetData = async () => { 
      axios.get('/api/queries/show/'+match.params.id+'?type=booked').then((result) => { 
      setBookingData(result.data); 

      axios.get('/api/quotations/getQuotationDetailById/'+result.data.id).then((result) => { 
        setQuotationDetails(result.data); 
      });

      axios.get('/api/invoices/checkInvoice/'+match.params.id)
        .then(response=>{
          if (response.data) {
            setInvoice(response.data);
          }else{
          }
        });

       axios.get('/api/users/show/'+result.data.user_id)
        .then(response=>{
          if (response.data) {
            setCustomer(response.data);
          }else{
          }
        });
      }); 

       axios.get('/api/users/getCancelReasons')
        .then(response=>{
          if (response.data) {
            setCancelReasons(response.data);
          }else{
          }
        });


       const result1 = await axios('/api/queries/getStopages/'+match.params.id);  
      setStopages(result1.data.stopages);  
    };  
  
    GetData();  
  }, []); 


   const handleChange = (event) => {
    setSaveData(event.target.value);
  }


   const cancelBooking = (event) => {  

    if (saveData == '') {
      setError('please select Cancellation Reason!');
      return false;
    }else{
       setError('');
       let data = {'reason' :saveData,'quotation_id' : bookingData.id};
       axios.post('/api/queries/cancel/'+ match.params.id,data)  
      .then((result) => {  
        window.location.href = "/agent/leads";
      }); 
    }     
  }; 

  return (  
     <div className="bookingvenderlist">
        <main id="wt-main" className="wt-main wt-haslayout wt-innerbgcolor">
          <div className="wt-main-section wt-haslayout">
            <div className="modal fade" id="myModal3" role="dialog">
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-body">
                    <div className="row">
                      <div className="col-sm-12">
                        <div className="cancel text-center informationform">
                          <span> Way are you cancelled this booking?</span> 
                          <div className="form-group">
                            <select onChange={handleChange} className="form-control">
                              <option value=''>Please Select Reason</option>
                              {cancelReasons.map((reasons,i)=>{
                                return( <option key={i} value={reasons.title}>{reasons.title}</option>
                                      )
                                }
                              )}
                              </select>
                             <div style={{color:'red'}}> {error && error} </div>
                          </div>
                        </div>
                        <div className="col-sm-12">
                          <div className="sure text-center">
                            <p>Are You Sure</p>
                            <a onClick={cancelBooking} className="btn btn-primary">Yes</a><a data-dismiss="modal" aria-label="Close" className="btn btn-dark">No</a> 
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
                                        <b>Total Amount of Trip:</b> <i className="fa fa-inr" /> {bookingData.total_payment}
                                      </div>
                                      <span>Booking ID:000000{bookingData.id}</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="bookeddetail conformbooked">
                                <ul className="list-unstyled">
                                    <li><span><div className="oneway"> {bookingData.booking_type}</div><div className="paiddiv">Paid</div></span></li>
                                  <li><span><div className="bktitle">Booking Title:  {bookingData.booking_name}</div></span></li>
                                  <li><span><p style={{ width:'25%'}}>Pickup Location: </p><strong style={{ color: '#222' }}>{bookingData.from_places}</strong></span></li>
                                  <li><span><p style={{ width:'25%'}}>Drop Location: </p><strong style={{ color: '#222' }}>{bookingData.to_places}</strong></span></li>
                                  <li><span><p style={{ width:'25%'}}>Stoppage During the trip :  </p><strong style={{ color: '#222' }}>  {stopeges}</strong></span></li>
                                  <li><span><p style={{ width:'25%'}}>Depart : </p><strong style={{ color: '#222' }}>{bookingData.to_places}</strong></span></li>
                                  <li><span><p style={{ width:'25%'}}>Pickup Time : </p><strong style={{ color: '#222' }}>{bookingData.pickup}</strong></span></li>
                                  <li><span><p style={{ width:'25%'}}>Number of Person : </p><strong style={{ color: '#222' }}>{bookingData.no_of_adults} Adults + {bookingData.no_of_childrens } Childrens+ { bookingData.no_of_infants} infants</strong></span></li>
                                  <li><span><p style={{ width:'25%'}}>Cab Model : </p><strong style={{ color: '#222' }}>{bookingData.vehicle_type}</strong></span></li>
                                  <li><span><p style={{ width:'25%'}}>Type of Vehicle : </p><strong style={{ color: '#222' }}>{quotationDetails.cab_type}</strong></span></li>
                                  <li><span><p style={{ width:'25%'}}>Cab Model : </p><strong style={{ color: '#222' }}>{quotationDetails.cab_model}</strong></span></li>
                                  <li><span><p style={{ width:'25%'}}>Cab Number : </p><strong style={{ color: '#222' }}>{quotationDetails.cab_number}</strong></span></li>
                                  <li><span><p style={{ width:'25%'}}>Sitting Capacity : </p><strong style={{ color: '#222' }}>{quotationDetails.sitting_capacity}</strong></span></li>
                                  <li><span><p style={{ width:'25%'}}>Luggage Space : </p><strong style={{ color: '#222' }}>{quotationDetails.luggage_space}</strong></span></li>
                                  <li><span><p style={{ width:'25%'}}>Total Kilometers : </p><strong style={{ color: '#222' }}>{quotationDetails.total_kilometer}</strong></span></li>
                                  <li><span><p style={{ width:'25%'}}>Driver Name : </p><strong style={{ color: '#222' }}>{quotationDetails.driver_name}</strong></span></li>
                                  <li><span><p style={{ width:'25%'}}>Mobile Number : </p><strong style={{ color: '#222' }}>{quotationDetails.mobile_no}</strong></span></li>

                                  <li>                                
                                    <div className="row">
                                      <div className="col-sm-6">
                                        <div className="bookedinclusion">Inclusions</div>
                                        <div className="form-group">
                                          <div className="bookinclusion">
                                            State Tax,<br /> {bookingData.inclusions}
                                          </div>
                                        </div>
                                      </div>
                                      <div className="col-sm-6">
                                        <div className="bookedinclusion">Exclusions</div>
                                        <div className="form-group">
                                          <div className="bookinclusion">
                                           {bookingData.exclusions}
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </li>
                                  <li><span>Description: <b>{bookingData.description}</b></span></li>
                                </ul>
                              </div>
                            </div>{/*End*/}
                            <div className="placebidbtn movebtn">
                              <a href="#" className="btn btn-primary">Send Voucher</a>
                              { invoice ?
                              <a href={"/agent/invoices"} className="btn btn-primary">Invoice Created</a>
                              :
                              <a href={"/agent/create-invoice/"+match.params.id} className="btn btn-primary">Create Invoice</a>
                              }
                               { (bookingData.status == 'cancelled') ?
                              <a className="btn btn-primary">This Booking Canceled</a> :
                              <a className="btn btn-primary"  data-toggle="modal" data-target="#myModal3">Cancel This Booking</a>
                            }
                            </div>
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
  
export default Booked