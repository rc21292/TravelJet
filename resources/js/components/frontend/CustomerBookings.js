import React from 'react'  
import axios from 'axios';  


import { useState, useEffect,useCallback } from 'react'  

import { useHistory, useLocation } from 'react-router-dom'
import Moment from 'react-moment';

function CustomerBookings({match}) { 

  const history = useHistory()

  const [user, setUser] = useState(false);
  const [bookingData, setBookingData] = useState({});  
  const [quotationData, setQuotationData] = useState({});  
  const [cancelReasons, setCancelReasons] = useState([]);  
  const [saveData, setSaveData] = useState('');  
  const [stopeges, setStopages] = useState(false);  
  const [payment_sc, setPayment_sc] = useState(0);  
  const [payment_gst, setPayment_gst] = useState(0);  
  const [customer, setCustomer] = useState({});  
  const [error, setError] = useState();  
  
   useEffect(() => {  
     let stateqq = localStorage["appState"];
     if (stateqq) {
      let AppState = JSON.parse(stateqq);
      setUser(AppState.user);
    }
    const GetData = async () => {  
      const result = await axios('/api/queries/show/'+match.params.id);  
      setBookingData(result.data); 

      const script = document.createElement("script")
      script.async = true
      script.src = 'https://checkout.razorpay.com/v1/checkout.js'
      document.body.appendChild(script)    

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

  const cancelBooking = (event) => {  

    if (saveData == '') {
      setError('please select Cancellation Reason!');
      return false;
    }else{
       setError('');
       let data = {'reason' :saveData,'quotation_id' : quotationData.id};
       axios.post('/api/queries/cancelCustBooking/'+ match.params.id,data)  
      .then((result) => {  
        // window.location.href = "/customer/cancelled-bookings";
      }); 
    }
  
     
  };  

  const handleChange = (event) => {
    setSaveData(event.target.value);
  }

  const capitalize = (s) => {
  if (typeof s !== 'string') return ''
  return s.charAt(0).toUpperCase() + s.slice(1)
}


   const openCheckout = (quotation_id,amount) => {
    let new_amount = amount;
    let user_id = user.id;
    let wallet_amount = 0;
    let options = {
      "key": "rzp_test_FvMwf7j3FOOnh8",
      "amount": amount*100,
      "name": "TravelJet",
      "description": "Pay to Add Balance",
      "image": "http://127.0.0.1:8000/frontend/image/logo.png",
      "handler": function (response){
        try {
         const paymentId = response.razorpay_payment_id;
         const query = {
          payment_id:paymentId,
          wallet:wallet_amount,
          for:'Booking',
          user_id:user.id,
          amount:(new_amount),
          total_amount:(parseInt(new_amount)+parseInt(wallet_amount)),
        }

        axios.post('/api/users/save_razorpay_details',query)
        .then(response=>{

          axios.post('/api/quotations/updatePaymentStatus/'+ quotation_id,query)  
          .then((result) => { 
            if (result.data.success) {
              window.location.reload(false);
            } 
          });

        });        

      } catch (err) {
        console.log(err);
      }
    },
    "prefill": {
      "name": user.name,
      "email": user.email,
      "contact": user.phone,
    },
    "modal": {
        "ondismiss": function () {
            return false;
            // window.location.href ='/';
        },
    },
    "theme": {
      "color": "#F37254"
    }
  };
    
    let rzp = new Razorpay(options);
    rzp.open();
  }
 

  return (  
    <div className="bookingvenderlist">
        <main id="wt-main" className="wt-main wt-haslayout wt-innerbgcolor">
          <div className="wt-main-section wt-haslayout">
            {/* User Listing Start*/}
            <div className="wt-haslayout">
              <div className="container">
                <div className="row">
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
                                           {
                                            quotationData.payments ?
                                            quotationData.payments.map((payments_data,i)=>{
                                              return( <tr key={i}>
                                              <td>{i+2}) {i==0 && 'Second'} {i==1 && 'Third'} {i==2 && 'Fourth'} {i==3 && 'Fifth'} Part</td>
                                              <td> <i className="fa fa-inr" />{payments_data.payment}</td>
                                              <td><b>{capitalize(payments_data.status)} <a href="#"><i className="fa fa-eye" /></a> </b>{payments_data.status == 'unpaid' && <a onClick={(event) => openCheckout(quotationData.id,payments_data.payment)} className="btn btn-primary">Pay Now</a>}</td>
                                              </tr>
                                                )
                                              })
                                              : null
                                            }
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
                              <a className="btn btn-primary"  data-toggle="modal" data-target="#myModal3">Cancel This Booking</a> 
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