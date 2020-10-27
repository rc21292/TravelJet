import React from 'react'  
import axios from 'axios';  
import { useHistory, useLocation } from 'react-router-dom'

import Pagination from "react-js-pagination";
import { useState, useEffect,useCallback } from 'react'  

import EditBooking from "./EditBooking";
import EditStoppages from "./EditStoppages";

import Moment from 'react-moment'

const display = {
  display: 'block'
};
const hide = {
  display: 'none'
};

function QuotationDetaills({id}) { 

  const history = useHistory()
  const location = useLocation()

  const [user, setUser] = useState(false);
  const [quotation_id, setQuotation_id] = useState(0);
  const [voucher_id, setVoucher_id] = useState(0);
  const [isEditBooking, setIsEditBooking] = useState(0);
  const [isEditStoppages, setIsEditStoppages] = useState(0);

  const [bookingId, setBookingId] = useState(id);

  const [bookingsData, setBookingsData] = useState({});  
  const [paymentData, setPaymentData] = useState({});  
  const [paymentTotal, setPaymentTotals] = useState(0);  
  const [balance, setBalance] = useState(0);  
  const [isUsedWallet, setIsUsedWallet] = useState(0);  
  const [stopages, setStopages] = useState([]);  
  const [quotationData, setQuotationData] = useState([]);  
  const [activePage, setActivePage] = useState(1);  
  const [itemsCountPerPage, setItemsCountPerPage] = useState(1);  
  const [isQuotation, setIsQuotation] = useState(false);  
  const [toggle, setToggle] = useState(false);  
  const [totalItemsCount, setTotalItemsCount] = useState(1);  
  const [pageRangeDisplayed, setPageRangeDisplayed] = useState(5);  

  useEffect(() => {  
    let stateqq = localStorage["appState"];
    if (stateqq) {
      let AppState = JSON.parse(stateqq);
      setUser(AppState.user);
      axios.get('/api/queries/show/'+id).then(result=>{
        setBookingsData(result.data);
        setIsEditBooking(0);
      });


      const script = document.createElement("script")
      script.async = true
      script.src = 'https://checkout.razorpay.com/v1/checkout.js'
      document.body.appendChild(script)    

      axios.get('/api/quotations/getQuotationByBookingId/'+id).then(result=>{
        setQuotationData(result.data);
      });

      axios.get('/api/quotations/checkQuotaions/'+id).then(result2=>{
        setIsQuotation(result2.data);
      });

      const result1 = axios('/api/queries/getStopagesData/'+id).then(result1=>{ 
      setStopages(result1.data.stopages);  
      setIsEditStoppages(0);
    });
    

    }   

  }, [id]);  


 const chnageId = (id) => {
  setQuotation_id(id)
  setVoucher_id(id)
  };  

  const changeIsEditStoppages = (booking_id) => {
    setIsEditStoppages(booking_id);
    const result1 = axios('/api/queries/getStopagesData/'+id).then(result1=>{ 
      setStopages(result1.data.stopages);  
    });
    
  };

  const changeIsEditBooking = (booking_id) => {
    setIsEditBooking(booking_id);
    axios.get('/api/queries/show/'+id).then(result=>{
        setBookingsData(result.data);
      });
  };  


  const awardBooking = (id) => {

    axios.get('/api/quotations/getQuotationById/'+id).then(result=>{
        setPaymentData(result.data);
      });

     axios.get('/api/users/getbalance/'+user.id)
      .then(response=>{
        setBalance(response.data.balance);
      });
  };  

  const openChatBox = () => {

    history.push("/customer/inbox")
  };  


  const openCheckout = (event,quotation_id) => {

   let amount = event.currentTarget.dataset.amount;
    let new_amount = amount;
    let user_id = user.id;
    let wallet_amount = isUsedWallet;

    if (amount == 0) {

       axios.get('/api/quotations/getQuotationById/'+quotation_id).then(result=>{
        try {
         const paymentId = '';
         const query = {
          payment_id:paymentId,
          wallet:result.data.payment_first,
          for:'Booking',
          user_id:user.id,
          amount:result.data.payment_first,
          total_amount:result.data.payment_first,
        }

        axios.post('/api/users/save_razorpay_details',query)
        .then(response=>{

          axios.post('/api/quotations/awardBooking/'+ quotation_id,query)  
          .then((result) => { 
            if (result.data.success) {
              window.location.href = "/customer/bookings";
              // window.location.reload(false);
            } 
          });

        });        

      } catch (err) {
        console.log(err);
      }
      });

       

    }else{
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
          amount:new_amount,
          total_amount:(parseInt(new_amount)+parseInt(wallet_amount)),
        }

        axios.post('/api/users/save_razorpay_details',query)
        .then(response=>{

          axios.post('/api/quotations/awardBooking/'+ quotation_id,query)  
          .then((result) => { 
            if (result.data.success) {
              window.location.href = "/customer/bookings";
              // window.location.reload(false);
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
}

  const deleteQuotation = (id) => {
  axios.delete('/api/queries/delete/'+ id)  
      .then((result) => {  
      window.location.reload(false);
      });  
  };  

  const viewQuotation = (id) => {
    forceUpdate();
    axios.delete('/api/queries/cancel/'+ id)  
    .then((result) => {  
     setBookingData(result.data);  
   });  
  };  

  const viewProfile = (id) => {
    history.push("/customer/profile/"+id)
  // window.location.href = "/customer/profile/"+id 
  };  

  const UseWallet = (e,quotation_id) => {

    if (balance > paymentData.payment_first) {
       var checked = e.target.checked;
       let new_amount = 0;
      let new_balance = (parseInt(balance)-parseInt(paymentData.payment_first));
      let newamount1 = (parseInt(paymentData.payment_first)+parseInt(0));
      if(checked){
      setPaymentData({...paymentData, payment_first:new_amount});
       }else{
        axios.get('/api/quotations/getQuotationById/'+quotation_id).then(result=>{
        setPaymentData({...paymentData, payment_first:result.data.payment_first});
      });
      }

    }else{

      let new_amount = (paymentData.payment_first-balance);
      let newamount = (parseInt(paymentData.payment_first)+parseInt(balance));
      var checked = e.target.checked;
      if(checked){
        setPaymentData({...paymentData, payment_first:new_amount});
        setIsUsedWallet(balance);
      }else{
        setPaymentData({...paymentData, payment_first:newamount});
        setIsUsedWallet(0);
      }
    }
  }

  const handlePageChange = (pageNumber) => {
    console.log(location.pathname)
    axios.get('/api/queries?status=posted'+'&page='+pageNumber)

    .then(result=>{
      setBookingsData(result.data.data);
      setItemsCountPerPage(result.data.per_page);  
      setTotalItemsCount(result.data.total);  
      setActivePage(result.data.current_page);
    });
  }

		return (       

        <div className="">

        <div className="modal fade" id="myModal2" role="dialog">
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <div className="row">
                      <div className="col-sm-10">
                        <div className="paynow">
                          <h3>{bookingsData.booking_name}</h3>
                          <span>Booking ID:000000{paymentData.booking_id}</span>
                        </div>
                      </div>
                      <div className="col-sm-2">
                        <div className="headerbudget">
                          <span>Total Cost</span> 
                          <div className="budgetprice">
                            <i className="fa fa-inr" /> {paymentData.total_payment}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="modal-body">
                    <div className="row">
                      <div className="col-sm-6">
                        <div className="form-check form-check-inline">
                          <input className="form-check-input" onClick={(e) => UseWallet(e,paymentData.id)} type="checkbox" disabled={(balance <= 0) ? true : null} defaultValue="option1" />
                          <label className="form-check-label" htmlFor="inlineCheckbox1">I am using my wallet</label>
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="walletprice">
                          <img src="/frontend/image/wallet.png" /> <span> Balance:</span> <i className="fa fa-inr" /> {balance}
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-12">
                        <div className="paybtn text-center">
                          <span> Pay partial amount of this trip:</span> <b><i className="fa fa-inr" /> {paymentData.payment_first}</b> <a onClick={(event) => openCheckout(event,paymentData.id)} data-amount={paymentData.payment_first} className="btn btn-primary">Pay Now</a>
                        </div>
                        <div className="col-sm-12">
                          <p><b>Note:</b> Please pay the 100% Amount before your booking date.</p>
                          <div className="payiconimg text-center">
                            <p>We are Accept</p>
                            <img src="/frontend/image/payiconimg.png" alt="pay icon" className="img-responsive" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

        <div className="quotation-page">
        </div>
        <div className="viewquotation" style={{display: 'block'}}>
          <h3>{bookingsData.booking_name}</h3>
          <div className="wt-userlistinghold wt-featured">
          <div style={(isQuotation) ? {display:'block'} : {display:'none'} } >
          { quotationData.map((quotation3,l)=>{
                  return (
          <div key={l} style={(voucher_id == l ) ? {display:'block'} : {display:'none'} }>
           
            <div className="wt-rightarea"> <a href={"/download-quote/"+quotation3.id}><span>Download Quote</span></a>
              <i className="fa fa-inr" /> {quotation3.total_payment}/- Total <span>Exclusive of Convenience Fee</span>
            </div>
            </div>
              )
                })
              }
              </div>
            <div className="bookid"> <span>Booking id : 000000{bookingsData.id}</span>
            </div>
            <div className="roundtrip">Quotes for {bookingsData.booking_name}</div>
            <div style={(isQuotation) ? {display:'block'} : {display:'none'} } >
            { quotationData.map((quotation2,k)=>{
                  return (
                  <div key={k} style={(quotation_id == k ) ? {display:'block'} : {display:'none'} } >
            <figure className="wt-userlistingimg">

            {quotation2.profile ?
            <img src={"/uploads/users/"+quotation2.user_id+"/profile/"+quotation2.profile} alt="image description" />
          :           
              <img src="/frontend/image/icons/chat-profile.png" alt="image description" />
            }
            </figure>
            
            <div className="wt-userlistingcontent">
              <div className="wt-contenthead">
                <div className="wt-title"> <a onClick={() => viewProfile(quotation2.user_id)}> {quotation2.name}
                <p> </p>
                    <div className="rating">
                      <div className="reviews-profile">
                        <span className="heading">0.0</span>
                        <span className="fa fa-star checked" />
                        <span className="fa fa-star checked" />
                        <span className="fa fa-star checked" />
                        <span className="fa fa-star checked" />
                        <span className="fa fa-star" />
                      </div>
                    </div>
                  </a>
                  <h2>507 trips sold | <a onClick={() => viewProfile(quotation2.user_id)}>172 Superb Reviews</a></h2>
                </div>
              </div>
              <ul className="wt-userlisting-breadcrumb awardbookig">
                <li><span><a onClick={(event) => awardBooking(quotation2.id)} data-toggle="modal" data-target="#myModal2" className="btn btn-primary">Award Booking</a></span>
                </li>
                <li><span> <a href={"/chatify/"+quotation2.user_id} className="btn btn-default chatbtn">Chat Now</a></span>
                </li>
                <li><span> <a onClick={() => viewProfile(quotation2.user_id)} className="btn btn-info">Contact Vendor</a></span>
                </li>
              </ul>
            </div>
            </div>
             )
                })
              }
             </div>

            <div className="clearfix" />
            <div id="exTab1">
              <ul className="nav nav-pills" style={(isQuotation) ? {display:'block'} : {display:'none'} }>
              {
                quotationData.map((quotation,i)=>{
                  return (
                    <li  key={i} className={i==0 ? 'active' : ''}> <a onClick={event => chnageId(i)} href={"#"+i+"a"} data-toggle="tab"><i className="fa fa-inr" /> {quotation.total_payment}/-
                    <br />
                    <span>Total Cost</span>
                    <span><b>{quotation.name}</b></span>
                    </a> 
                    </li>
                    )
                })
              }
              </ul>
              <div className="tab-content clearfix">
              {
                quotationData.map((quotation1,j)=>{
                  return (
                <div key={j} className={(j == 0) ? "tab-pane active" : "tab-pane" } id={j+"a"}>
                  <div className="wt-description">
                    <table className="table">
                      <thead className="thead-dark">
                        <tr>
                          <th scope="col">Booking Details</th>
                          <th scope="col">Trip Route</th>
                          <th scope="col">Inclusion/Exclusion</th>
                          <th scope="col">Cab Details</th>
                        </tr>
                      </thead>
                      <tbody className="bookbody">
                        <tr>
                          <td className="bookdetail">Booking Details</td>
                          <td />
                          <td />
                          <td className="edit"><a onClick={() => setIsEditBooking(bookingsData.id)} className="btnsho">Edit Booking</a>
                          </td>
                        </tr>
                        <tr>
                          <td>Booking Type</td>
                          <td>{ bookingsData.booking_type}</td>
                          <td />
                          <td />
                        </tr>
                        <tr>
                          <td>Pickup Location</td>
                          <td>{ bookingsData.from_places}</td>
                          <td />
                          <td />
                        </tr>
                        <tr>
                          <td>Drop Location</td>
                          <td>{ bookingsData.to_places}</td>
                          <td />
                          <td />
                        </tr>
                        <tr>
                          <td>Date</td>
                          <td><Moment format="DD/MM/YYYY">{ bookingsData.arrival}</Moment></td>
                          <td />
                          <td />
                        </tr>
                        <tr>
                          <td>Time</td>
                          <td>{ bookingsData.pickup}</td>
                          <td />
                          <td />
                        </tr>
                        <tr>
                          <td>Number of Person</td>
                          <td>{ bookingsData.no_of_adults+bookingsData.no_of_childrens+bookingsData.no_of_infants}</td>
                          <td />
                          <td />
                        </tr>
                        <tr>
                          <td>Type of Vehicle</td>
                          <td>{ bookingsData.vehicle_type}</td>
                          <td />
                          <td />
                        </tr>
                        <tr>
                          <td>Budget</td>
                          <td>{ bookingsData.vehicle_budget}</td>
                          <td />
                          <td />
                        </tr>
                      </tbody>
                    </table>                    
                    <div className="clearfix" />
                   {isEditBooking ? <EditBooking id={isEditBooking} onIdChnage={changeIsEditBooking} /> : null }
                    <div className="clearfix" />
                    <div className="triproute">
                      <div className="row">
                        <div className="col-sm-6">
                          <div className="bookdetail">Trip Route
                          </div>
                        </div>
                        <div className="col-sm-6">
                          <div className="edit"><a onClick={() => setIsEditStoppages(bookingsData.id)} className="btnsho2">Edit Stoppages</a>
                          </div>
                        </div>
                      </div>
                      <div className="vendor">Need changes? Chat with vendor</div>
                      <div className="booktrip">{bookingsData.booking_name}.</div>
                      <div className="location">
                        <div className="wizard-inner">
                          <div className="connecting-line" />
                          <ul className="nav nav-tabs">
                           {
                        stopages.map((stopage,i)=>{
                          return(
                            <li key={i} className="active">
                              <a href="#" />
                            </li>
                             )
                        }
                        )
                      }
                          </ul>
                        </div>
                      </div>
                      <ul className="list-inline triplocation">
                      {
                        stopages.map((stopage,i)=>{
                          return(
                           <li key={i}>{stopage}</li>
                          )
                        }
                        )
                      }
                      </ul>
                    </div>  

                    {isEditStoppages ? <EditStoppages id={isEditStoppages} onIdChnage={changeIsEditStoppages} /> : null }

                     <div style={(isQuotation) ? {display:'block',textAlign:'center', marginBottom:'-20px', marginTop:'-12px'} : {display:'none'} } className="row col-sm-12">
                        <h2>Quote from Vendor</h2>
                      </div>

                    <div className="clearfix" />
                    <div className="triproute inclusion" style={(isQuotation) ? {display:'block'} : {display:'none'} }>
                      <div className="row">
                        <div className="col-sm-5">
                          <div className="bookdetail">Inclusion</div>
                        </div>
                        <div className="col-sm-5">
                          <div className="bookdetail">Exclusions</div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="vendor col-sm-5">{quotation1.inclusions}</div>
                        <div className="booktrip col-sm-5">{quotation1.exclusions}</div>
                      </div>
                    </div>
                    <div className="clearfix" />
                    <div  style={isQuotation ? {display: "block"} : {display:"none"} } >
                    <table className="table cabdetail">
                        <tbody className="bookbody">
                          <tr>
                            <td className="bookdetail">Cab Details</td>
                            <td></td>
                            <td></td>
                            <td></td>
                          </tr>
                          <tr>
                            <td>Cab Type</td>
                            <td>{quotation1.cab_type}</td>
                            <td></td>
                            <td></td>
                          </tr>
                          <tr>
                            <td>Cab Model</td>
                            <td>{quotation1.cab_model}</td>
                            <td></td>
                            <td></td>
                          </tr>
                          <tr>
                            <td>Sitting Capacity</td>
                            <td>{(quotation1.sitting_capacity > 0 ) && quotation1.sitting_capacity}</td>
                            <td></td>
                            <td></td>
                          </tr>
                          <tr>
                            <td>Luggage Space</td>
                            <td>{(quotation1.luggage_space > 0 ) && quotation1.luggage_space+' Small Bags'} </td>
                            <td></td>
                            <td></td>
                          </tr>
                          <tr>
                            <td>Notes</td>
                            <td>{quotation1.notes} </td>
                            <td></td>
                            <td></td>
                          </tr>
                        </tbody>
                      </table>
                      </div>
                     <div className="clearfix" />
                     <div  style={isQuotation ? {display: "block"} : {display:"none"} } >
                        <table className="table">
                          <tbody className="bookbody">
                            <tr>
                              <td colSpan={5} className="bookdetail">Suggest a advance payment</td>
                              <td />
                              <td />
                              <td className="borderright" />
                            </tr>
                            <tr>
                              <td colSpan={5}>
                                <table className="table">
                                  <tbody>
                                    <tr>
                                      <td>1) First Part</td>
                                      <td> <i className="fa fa-inr" />{quotation1.payment_first}</td>
                                      <td><span>Immediately</span></td>
                                    </tr>
                                    {
                                      quotation1.payments ?
                                      quotation1.payments.map((payments_data,i)=>{
                                        return( <tr key={i}>
                                        <td>{i+2}) {i==0 && 'Second'} {i==1 && 'Third'} {i==2 && 'Fourth'} Part</td>
                                        <td> <i className="fa fa-inr" />{payments_data.payment}</td>
                                        <td><span>{(payments_data.date) ? <Moment format="DD-MMM-YYYY">{payments_data.date}</Moment> : '-' }</span></td>
                                        </tr>
                                          )
                                        })
                                        : null
                                      }
                                  </tbody>
                                </table>
                              </td>
                              <td colSpan={5}>
                                <table className="table totaltable">
                                  <tbody>
                                    <tr>
                                      <td className="lablename">Total Amount of whole Trip :</td>
                                      <td className="payprice"> <i className="fa fa-inr" /> {quotation1.payment}</td>
                                    </tr>
                                    <tr>
                                      <td className="lablename">Service Charge 10% :</td>
                                      <td className="payprice"> <i className="fa fa-inr" /> { (((quotation1.payment) * 10)/100) }</td>
                                    </tr>
                                    <tr>
                                      <td className="lablename">GST 5% :</td>
                                      <td className="payprice"> <i className="fa fa-inr" /> { (((quotation1.payment) * 5)/100) }</td>
                                    </tr>
                                    <tr>
                                      <td className="lablename">Net Amount :</td>
                                      <td className="payprice"> <i className="fa fa-inr" /> <b>{quotation1.total_payment}</b></td>
                                    </tr>
                                  </tbody>
                                </table>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                  </div>
                </div>
                 )
                })
              }
              </div>
            </div>
          </div>
        </div>
      </div>                  
             
		);
	
}
export default QuotationDetaills