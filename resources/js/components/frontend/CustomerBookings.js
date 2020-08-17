import React from 'react'  
import axios from 'axios';  
import { useHistory, useLocation } from 'react-router-dom'
import Moment from 'react-moment';

import { useState, useEffect } from 'react'  
function CustomerBookings({match}) { 

  const history = useHistory()

  const [bookingData, setBookingData] = useState({});  
  const [quotationData, setQuotationData] = useState({});  
  const [stopeges, setStopages] = useState(false);  
  const [payment_sc, setPayment_sc] = useState(0);  
  const [payment_gst, setPayment_gst] = useState(0);  
  const [customer, setCustomer] = useState({});  
  
   useEffect(() => {  
    const GetData = async () => {  
      const result = await axios('/api/queries/show/'+match.params.id);  
      setBookingData(result.data); 

      const result2 = await axios('/api/quotations/getQuotationByBookingId/'+match.params.id+'?status=awarded');  
      setQuotationData(result2.data);  
      let pay = result2.data.payment;
      setPayment_sc(((parseInt(pay)*5)/100));  
      setPayment_gst(((parseInt(pay)*10)/100));  

        axios.get('/api/users/show/'+result2.data.user_id)
        .then(response=>{
          if (response.data) {
            setCustomer(response.data);
          }else{
          }
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
                              <h2>About the Agent</h2>
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
                                    <div className="headerbudget totalcost">
                                      <div className="budgetprice">
                                        <b>Total Cost:</b> <i className="fa fa-inr" /> {bookingData.vehicle_budget}
                                      </div>
                                      <span>Booking ID:000000{bookingData.id}</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="bookeddetail conformbooked">
                                <ul className="list-unstyled">
                                  <li><span><div className="oneway"> {bookingData.booking_type}</div></span></li>
                                  <li><span><div className="bktitle">Booking Title:  {bookingData.booking_name}</div></span></li>
                                  <li><span>Pickup Location: <b>{bookingData.from_places}</b></span></li>
                                  <li><span>Stoppage During the trip :  <b>  {stopeges}</b></span></li>
                                  <li><span>Depart : <b>{bookingData.to_places}</b></span></li>
                                  <li><span>Pickup Time : <b>{bookingData.pickup}</b></span></li>

                                  <li><span>Number of Person : <b>{bookingData.no_of_adults} Adults + {bookingData.no_of_childrens } Childrens+ { bookingData.no_of_infants} infants</b></span></li>
                                  <li><span>Type of Vehicle : <b>{bookingData.vehicle_type}</b></span></li>
                                  <li><span>Total Kilometers : <b>570</b></span></li>
                                  <li><span>Description: <b>{bookingData.description}</b></span></li>
                                </ul>
                              </div>
                            </div>{/*End*/}
                            <div className="placebid">
                              <div className="bookingheader">
                                <div className="row">
                                  <div className="col-sm-12">
                                    <div className="bookdetail">
                                      <h3>Payment Detail</h3>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="placebidbook">
                                <div className="row">
                                  <div className="col-sm-6">
                                    <div className="paymentpart">
                                      Payment Partition
                                    </div>
                                    <div className="paypart">
                                      <table className="table">
                                        <tbody>
                                          <tr>
                                            <td>1) First Part</td>
                                            <td> <i className="fa fa-inr" /> {quotationData.payment_first}</td>
                                            <td> <b>Paid</b> <a href="#"><i className="fa fa-eye" /></a></td>
                                          </tr>
                                          <tr>
                                            <td>2) Second Part</td>
                                            <td><i className="fa fa-inr" /> {quotationData.payment_second}</td>
                                            <td><span>Unpaid</span> <a href="#" className="btn btn-primary">Pay Now</a> </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </div>
                                  </div>
                                  <div className="col-sm-6">
                                    <div className="totalpay">
                                      <table className="table">
                                        <tbody>
                                          <tr>
                                            <td className="lablename">Total Amount of whole Trip :</td>
                                            <td className="payprice"> <i className="fa fa-inr" /> {quotationData.payment}</td>
                                          </tr>
                                          <tr>
                                            <td className="lablename">Service Charge 10% :</td>
                                            <td className="payprice"> <i className="fa fa-inr" /> {payment_sc}</td>
                                          </tr>
                                          <tr>
                                            <td className="lablename">GST 5% :</td>
                                            <td className="payprice"> <i className="fa fa-inr" /> {payment_gst}</td>
                                          </tr>
                                          <tr>
                                            <td className="lablename">Net Amount :</td>
                                            <td className="payprice"> <i className="fa fa-inr" /> <b>{quotationData.total_payment}</b></td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="placebidbtn movebtn">
                            { (bookingData.status == 'cancelled') ?
                              <a className="btn btn-primary">This Booking Canceled</a> :
                              <a onClick={event => cancelBooking(bookingData.id)} className="btn btn-primary">Cancel This Booking</a> 
                            }
                            </div>
                          </div>
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
  
export default CustomerBookings