import React from 'react'  
import axios from 'axios';  
import { useHistory, useLocation } from 'react-router-dom'

import Pagination from "react-js-pagination";
import Moment from 'react-moment';
import { useState, useEffect, Fragment } from 'react'  

import FlashMessage from 'react-flash-message'

function Qutations({match}) { 

  const history = useHistory()
  const location = useLocation()


  const initialQuotationState = {
    booking_id: match.params.id,
    user_id: null,
    payment: 0,
    total_payment: 0,
    payment_first: 0,
    payment_first_note: '',
    payment_second: 0,
    payments: null
  };


const [error, setError] = useState('');
  const [success, setSuccess] = useState('');


  const [quotations, setQuotations] = useState(initialQuotationState);
  const [bookingData, setBookingData] = useState({});  
  const [stopeges, setStopages] = useState(false);  
  const [editData, setEditData] = useState(false);  
  const [submitted, setSubmitted] = useState(false);

  const [isUpdated, setIsUpdated] = useState(false);
  const [errors, setErrors] = useState({});
  const [isErrors, setIsErrors] = useState(0);
   const [user, setUser] = useState(false);
   const [customer, setCustomer] = useState(false);
    const [inputFields, setInputFields] = useState([{stopege:''}]);
    const [paymentFields, setPaymentFields] = useState([{payment:'',date:''}]);
 
  useEffect(() => {  
    let stateqq = localStorage["appState"];
    if (stateqq) {
      let AppState = JSON.parse(stateqq);
      setUser(AppState.user);
      setQuotations({ ...quotations, user_id: AppState.user.id });

      axios.get('/api/quotations/getQuotationByBookingUserId/'+match.params.id+'/'+AppState.user.id)
      .then(response=>{
        if (response.data) {
          setQuotations(response.data)       
        }else{
        }
      }); 

      axios.get('/api/quotations/getQuotationPayment/'+match.params.id+'/'+AppState.user.id)
      .then(response=>{
        if (response.data) {
          setPaymentFields(response.data);
        }else{
        setPaymentFields([{ payment: ''}]);
        }
      }); 

      axios.get('/api/queries/getQuotationStoppages/'+match.params.id+'/'+AppState.user.id).then(result=>{
        setInputFields(result.data);
      });

      const GetData = async () => {
        const result = await axios('/api/queries/show/'+match.params.id);  
        setBookingData(result.data); 

        axios.get('/api/users/show/'+result.data.user_id)
        .then(response=>{
          console.log(response.data.total_payment);
          if (response.data) {
            setCustomer(response.data);
          }else{
          }
        });  

        const result1 = await axios('/api/queries/getStopages/'+match.params.id);  
        setStopages(result1.data.stopages);  
      };  
  
    GetData();  

    }   
  }, []);  


  const handleInputChanges = event => {
    const { name, value } = event.target;
    if (name === "payment") {
      const total_paymentt = parseInt(value) + ((value * 15)/100);
      setQuotations({ ...quotations, payment:value, total_payment: total_paymentt });
    }else{

      setQuotations({ ...quotations, [name]: value });
    }
  };


  const handlePaymentChanges = event => {
    const { name, value } = event.target;
    if (name === "payment") {
      const total_paymentt = parseInt(value) + ((value * 15)/100);
      setQuotations({ ...quotations, payment:value, total_payment: total_paymentt });
    }else{
      setQuotations({ ...quotations, [name]: value });
    }
  };


const saveBid = () => {
    var data = quotations;
    axios({
      method: 'post',
      url: '/api/quotations/storeBid',
      data: data,
    })
    .then(response => {
      setSubmitted(true);
      setSuccess(response.data.message);
      //window.location = '/customer/bookings';     
    })
    .catch(e => {
      console.log(e);
    });
  };

const handleInputChange = (index, event) => {
  const values = [...inputFields];
  if (event.target.name === "payment" || event.target.name === "date") {
    values[index][event.target.name] = event.target.value;
  }
  console.log(values);
  setInputFields(values);
  setQuotations({ ...quotations, payments: values });
};

const handlePaymentChange = (index, event) => {
  const values = [...paymentFields];
  if (event.target.name === "payment" || event.target.name === "date") {
    values[index][event.target.name] = event.target.value;
  }
  setInputFields(values);
  setQuotations({ ...quotations, payments: values });
};


const handleInputsChanges = event => {
    const { name, value } = event.target;
    setQuotationDetails({ ...quotationDetails, [name]: value });
  };

const handleAddFields = () => {
  const values = [...inputFields];
  if(values.length < 5){
    setInputFields([...inputFields, { payment:'', date:''}]);
  }
};

const handleAddPaymentFields = () => {
  const values = [...paymentFields];
  if(values.length < 5){
    setPaymentFields([...paymentFields, { payment:'', date:''}]);
  }
};

const handleRemoveFields = (index, event) => {
  alert(index);
  event.preventDefault();
  const values = [...inputFields];
  console.log(values);
  values.splice(index, 1);
  setInputFields(values);
  setQuotations({ ...quotations, payments: values });
};

const handleRemovePaymentFields = (index, event) => {
  event.preventDefault();
  const values = [...paymentFields];
  values.splice(index, 1);
  setPaymentFields(values);
  setQuotations({ ...quotations, payments: values });
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
                              <div className="bookeddetail">
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
                            <div className="createquotation">
                              <div className="bookingheader">
                                <div className="row">
                                  <div className="col-sm-7">
                                    <div className="bookdetail">
                                      <h3>Create Quotation on this Booking</h3>
                                    </div>
                                  </div>
                                  <div className="col-sm-5">
                                    <div className="headerbudget">
                                      <span>Booking ID:0000000</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="quotationbooked quotaedit">
                                <div className="row">
                                  <div className="col-sm-4">
                                    <div className="formtitle">
                                      <h5>Type of Booking</h5>
                                      <div className="quedit"><a onClick={() => setEditData({type_of_booking:true})} className="btnsho5">Edit</a>
                                      </div>
                                    </div>
                                    <div className="form-group">
                                      <select className="custom-select form-control" disabled value={quotations.type_of_booking}>
                                        <option>Select Booking Type</option>
                                        <option value="One Way Trip">One Way Trip</option>
                                        <option value="Round Trip with Sightseeing">Round Trip with Sightseeing</option>
                                      </select>
                                    </div>
                                    <div className="quotbkedit" style={(!editData.type_of_booking) ? {display:'none'} : {display:'block'} }>
                                      <div className="form-group">
                                         <select className="custom-select form-control" name="type_of_booking" onChange={handleInputsChanges} value={quotations.type_of_booking}  id="inputGroupSelect01">
                                        <option>Select Booking Type</option>
                                        <option value="One Way Trip">One Way Trip</option>
                                        <option value="Round Trip with Sightseeing">Round Trip with Sightseeing</option>
                                      </select>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-sm-8">
                                    <div className="formtitle">
                                      <h5>Subject/Title of Booking</h5>
                                      <div className="quedit"><a href="" className="btnsho6">Edit</a>
                                      </div>
                                    </div>
                                    <div className="form-group">
                                      <input type="text" name="title" placeholder="Title of Booking" value={quotations.title_of_booking} className="form-control" disabled />
                                    </div>
                                    <div className="quotintedit" style={{display: 'none'}}>
                                      <div className="form-group">
                                        <input type="text" name="title" placeholder="Subject/Title of Booking" className="form-control" />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col-sm-6">
                                    <div className="formtitle">
                                      <h5>Pickup Location</h5>
                                      <div className="quedit"><a href="" className="btnsho7">Edit</a>
                                      </div>
                                    </div>
                                    <div className="book-locationPanel">
                                      <div className="selectAddress">
                                        <select className="select-state" value={quotations.pickup_state} disabled>
                                          <option value="Andhra Pradesh">Delhi NCR</option>
                                          <option value="Andhra Pradesh">Andhra Pradesh</option>
                                          <option value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</option>
                                          <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                                          <option value="Assam">Assam</option>
                                          <option value="Bihar">Bihar</option>
                                          <option value="Chandigarh">Chandigarh</option>
                                          <option value="Chhattisgarh">Chhattisgarh</option>
                                          <option value="Dadar and Nagar Haveli">Dadar and Nagar Haveli</option>
                                          <option value="Daman and Diu">Daman and Diu</option>
                                          <option value="Delhi NCR">Delhi NCR</option>
                                          <option value="Lakshadweep">Lakshadweep</option>
                                          <option value="Puducherry">Puducherry</option>
                                          <option value="Goa">Goa</option>
                                          <option value="Gujarat">Gujarat</option>
                                          <option value="Haryana">Haryana</option>
                                          <option value="Himachal Pradesh">Himachal Pradesh</option>
                                          <option value="Jammu and Kashmir">Jammu and Kashmir</option>
                                          <option value="Jharkhand">Jharkhand</option>
                                          <option value="Karnataka">Karnataka</option>
                                          <option value="Kerala">Kerala</option>
                                          <option value="Madhya Pradesh">Madhya Pradesh</option>
                                          <option value="Maharashtra">Maharashtra</option>
                                          <option value="Manipur">Manipur</option>
                                          <option value="Meghalaya">Meghalaya</option>
                                          <option value="Mizoram">Mizoram</option>
                                          <option value="Nagaland">Nagaland</option>
                                          <option value="Odisha">Odisha</option>
                                          <option value="Punjab">Punjab</option>
                                          <option value="Rajasthan">Rajasthan</option>
                                          <option value="Sikkim">Sikkim</option>
                                          <option value="Tamil Nadu">Tamil Nadu</option>
                                          <option value="Telangana">Telangana</option>
                                          <option value="Tripura">Tripura</option>
                                          <option value="Uttar Pradesh">Uttar Pradesh</option>
                                          <option value="Uttarakhand">Uttarakhand</option>
                                          <option value="West Bengal">West Bengal</option>
                                        </select>
                                        <input type="text" name="searchArea" value={quotations.pickup_location} placeholder="Pandav Nagar" className="startpoint form-control" disabled />
                                      </div>
                                    </div>
                                    <div className="editpickup" style={{display: 'none'}}>
                                      <div className="book-locationPanel">
                                        <div className="selectAddress">
                                          <select className="select-state">
                                            <option value="Andhra Pradesh">Delhi NCR</option>
                                            <option value="Andhra Pradesh">Andhra Pradesh</option>
                                            <option value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</option>
                                            <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                                            <option value="Assam">Assam</option>
                                            <option value="Bihar">Bihar</option>
                                            <option value="Chandigarh">Chandigarh</option>
                                            <option value="Chhattisgarh">Chhattisgarh</option>
                                            <option value="Dadar and Nagar Haveli">Dadar and Nagar Haveli</option>
                                            <option value="Daman and Diu">Daman and Diu</option>
                                            <option value="Delhi NCR">Delhi NCR</option>
                                            <option value="Lakshadweep">Lakshadweep</option>
                                            <option value="Puducherry">Puducherry</option>
                                            <option value="Goa">Goa</option>
                                            <option value="Gujarat">Gujarat</option>
                                            <option value="Haryana">Haryana</option>
                                            <option value="Himachal Pradesh">Himachal Pradesh</option>
                                            <option value="Jammu and Kashmir">Jammu and Kashmir</option>
                                            <option value="Jharkhand">Jharkhand</option>
                                            <option value="Karnataka">Karnataka</option>
                                            <option value="Kerala">Kerala</option>
                                            <option value="Madhya Pradesh">Madhya Pradesh</option>
                                            <option value="Maharashtra">Maharashtra</option>
                                            <option value="Manipur">Manipur</option>
                                            <option value="Meghalaya">Meghalaya</option>
                                            <option value="Mizoram">Mizoram</option>
                                            <option value="Nagaland">Nagaland</option>
                                            <option value="Odisha">Odisha</option>
                                            <option value="Punjab">Punjab</option>
                                            <option value="Rajasthan">Rajasthan</option>
                                            <option value="Sikkim">Sikkim</option>
                                            <option value="Tamil Nadu">Tamil Nadu</option>
                                            <option value="Telangana">Telangana</option>
                                            <option value="Tripura">Tripura</option>
                                            <option value="Uttar Pradesh">Uttar Pradesh</option>
                                            <option value="Uttarakhand">Uttarakhand</option>
                                            <option value="West Bengal">West Bengal</option>
                                          </select>
                                          <input type="text" name="searchArea" defaultValue placeholder="Client Starting point.." className="startpoint form-control" />
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-sm-6">
                                    <div className="formtitle">
                                      <h5>Drop Location</h5>
                                      <div className="quedit"><a href="" className="btnsho8">Edit</a>
                                      </div>
                                    </div>
                                    <div className="book-destinationPanel">
                                      <div className="selectAddress">
                                        <select className="select-state" value={quotations.destination_state} disabled>
                                          <option value="Andhra Pradesh">Manali</option>
                                          <option value="Andhra Pradesh">Andhra Pradesh</option>
                                          <option value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</option>
                                          <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                                          <option value="Assam">Assam</option>
                                          <option value="Bihar">Bihar</option>
                                          <option value="Chandigarh">Chandigarh</option>
                                          <option value="Chhattisgarh">Chhattisgarh</option>
                                          <option value="Dadar and Nagar Haveli">Dadar and Nagar Haveli</option>
                                          <option value="Daman and Diu">Daman and Diu</option>
                                          <option value="Delhi NCR">Delhi NCR</option>
                                          <option value="Lakshadweep">Lakshadweep</option>
                                          <option value="Puducherry">Puducherry</option>
                                          <option value="Goa">Goa</option>
                                          <option value="Gujarat">Gujarat</option>
                                          <option value="Haryana">Haryana</option>
                                          <option value="Himachal Pradesh">Himachal Pradesh</option>
                                          <option value="Jammu and Kashmir">Jammu and Kashmir</option>
                                          <option value="Jharkhand">Jharkhand</option>
                                          <option value="Karnataka">Karnataka</option>
                                          <option value="Kerala">Kerala</option>
                                          <option value="Madhya Pradesh">Madhya Pradesh</option>
                                          <option value="Maharashtra">Maharashtra</option>
                                          <option value="Manipur">Manipur</option>
                                          <option value="Meghalaya">Meghalaya</option>
                                          <option value="Mizoram">Mizoram</option>
                                          <option value="Nagaland">Nagaland</option>
                                          <option value="Odisha">Odisha</option>
                                          <option value="Punjab">Punjab</option>
                                          <option value="Rajasthan">Rajasthan</option>
                                          <option value="Sikkim">Sikkim</option>
                                          <option value="Tamil Nadu">Tamil Nadu</option>
                                          <option value="Telangana">Telangana</option>
                                          <option value="Tripura">Tripura</option>
                                          <option value="Uttar Pradesh">Uttar Pradesh</option>
                                          <option value="Uttarakhand">Uttarakhand</option>
                                          <option value="West Bengal">West Bengal</option>
                                        </select>
                                        <input type="text" name="searchArea" value={quotations.drop_location} placeholder="Manali Bus Stand" className="startpoint form-control" disabled />
                                      </div>
                                    </div>
                                    <div className="editdrp" style={{display: 'none'}}>
                                      <div className="book-destinationPanel">
                                        <div className="selectAddress">
                                          <select className="select-state">
                                            <option value="Andhra Pradesh">Manali</option>
                                            <option value="Andhra Pradesh">Andhra Pradesh</option>
                                            <option value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</option>
                                            <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                                            <option value="Assam">Assam</option>
                                            <option value="Bihar">Bihar</option>
                                            <option value="Chandigarh">Chandigarh</option>
                                            <option value="Chhattisgarh">Chhattisgarh</option>
                                            <option value="Dadar and Nagar Haveli">Dadar and Nagar Haveli</option>
                                            <option value="Daman and Diu">Daman and Diu</option>
                                            <option value="Delhi NCR">Delhi NCR</option>
                                            <option value="Lakshadweep">Lakshadweep</option>
                                            <option value="Puducherry">Puducherry</option>
                                            <option value="Goa">Goa</option>
                                            <option value="Gujarat">Gujarat</option>
                                            <option value="Haryana">Haryana</option>
                                            <option value="Himachal Pradesh">Himachal Pradesh</option>
                                            <option value="Jammu and Kashmir">Jammu and Kashmir</option>
                                            <option value="Jharkhand">Jharkhand</option>
                                            <option value="Karnataka">Karnataka</option>
                                            <option value="Kerala">Kerala</option>
                                            <option value="Madhya Pradesh">Madhya Pradesh</option>
                                            <option value="Maharashtra">Maharashtra</option>
                                            <option value="Manipur">Manipur</option>
                                            <option value="Meghalaya">Meghalaya</option>
                                            <option value="Mizoram">Mizoram</option>
                                            <option value="Nagaland">Nagaland</option>
                                            <option value="Odisha">Odisha</option>
                                            <option value="Punjab">Punjab</option>
                                            <option value="Rajasthan">Rajasthan</option>
                                            <option value="Sikkim">Sikkim</option>
                                            <option value="Tamil Nadu">Tamil Nadu</option>
                                            <option value="Telangana">Telangana</option>
                                            <option value="Tripura">Tripura</option>
                                            <option value="Uttar Pradesh">Uttar Pradesh</option>
                                            <option value="Uttarakhand">Uttarakhand</option>
                                            <option value="West Bengal">West Bengal</option>
                                          </select>
                                          <input type="text" name="searchArea" defaultValue placeholder="Client Droping point.." className="startpoint form-control" />
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col-sm-12">
                                    <div className="formtitle">
                                      <h5>Add Stoppage</h5>
                                      <div className="quedit"><a href="" className="btnsho9">Edit</a>
                                      </div>
                                    </div>
                                    <div className="addstoppage">
                                      <div className="row">
                                        <div className="col-sm-12">
                                          <div className="form-group">
                                            <div className="add-stop">
                                              {inputFields.map((inputField, index) => (
                                                <Fragment key={`${inputField}~${index}`}>
                                                  { 
                                                  index > 0 ?
                                                  <div className="col-sm-6">
                                                    <div className="radio custom-radio" style={{position: 'relative'}}>
                                                      <label htmlFor="stopage">Stopage {index}</label>
                                                      <input disabled
                                                      onChange={event => handleInputChange(index, event)}
                                                      type="text"
                                                      className="route-stop form-control"
                                                      name="stopage"
                                                      value={inputField.stopage}
                                                      />
                                                    </div>
                                                  </div>
                                                  :null
                                                  }
                                                </Fragment>
                                                ))}
                                              </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="stoppageedit" style={{display: 'none'}}>
                                      <div className="addstoppage">
                                        <input type="text" id="myInput2" placeholder="Search Stoppage..." />
                                        <div id="myUL">
                                          <div className="col-sm-3">
                                            <div className="stopbox">
                                              Chandigarh
                                              <a href="#"><i className="fa fa-times" /></a>
                                            </div>
                                          </div>
                                          <div className="col-sm-3"><div className="stopbox">Ambala <a href="#"><i className="fa fa-times" /></a></div></div>
                                          <div className="col-sm-3"><div className="stopbox">Chandigarh <a href="#"><i className="fa fa-times" /></a></div></div>
                                          <div className="col-sm-3"><div className="stopbox">Ambala <a href="#"><i className="fa fa-times" /></a></div></div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col-sm-6">
                                    <div className="formtitle">
                                      <h5>Inclusions</h5>
                                      <div className="quedit"><a href="" className="btnsho10">Edit</a>
                                      </div>
                                    </div>
                                    <div className="form-group">
                                      <textarea name="w3review" rows={4} cols={50} className="form-control" value={quotations.inclusions} placeholder="State Tax, Toll Tax Driver allowance Taxes" disabled defaultValue={""} />
                                    </div>
                                    <div className="inclusionsedit" style={{display: 'none'}}>
                                      <div className="formtitle">
                                        <h5>Inclusions</h5>
                                        <div className="quedit">
                                          <div className="form-group">
                                            <select className="form-control" id="exampleFormControlSelect1">
                                              <option>Add Inclusions</option>
                                              <option>Add Inclusions</option>
                                            </select>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="form-group">
                                        <textarea name="w3review" rows={4} cols={50} className="form-control" defaultValue={""} />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-sm-6">
                                    <div className="formtitle">
                                      <h5>Exclusions</h5>
                                      <div className="quedit"><a href="" className="btnsho11">Edit</a>
                                      </div>
                                    </div>
                                    <div className="form-group">
                                      <textarea name="w3review" value={quotations.exclusions} rows={4} cols={50} className="form-control" placeholder="Parking
Night time allowance (11:00 PM to 06:00 AM)
Additional place/destination visit Any type of Permits and Entrance fees" disabled defaultValue={""} />
                                    </div>
                                    <div className="exclusionsedit" style={{display: 'none'}}>
                                      <div className="formtitle">
                                        <h5>Exclusions</h5>
                                        <div className="quedit">
                                          <div className="form-group">
                                            <select className="form-control" id="exampleFormControlSelect1">
                                              <option>Add Exclusions</option>
                                              <option>Add Exclusions</option>
                                            </select>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="form-group">
                                        <textarea name="w3review" rows={4} cols={50} className="form-control" defaultValue={""} />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col-sm-4">
                                    <div className="formtitle">
                                      <h5>Cab Details</h5>
                                      <div className="quedit"><a href="" className="btnsho12">Edit</a>
                                      </div>
                                    </div>
                                    <div className="form-group">
                                      <select className="custom-select form-control" id="inputGroupSelect01" disabled>
                                        <option>Hatchback</option>
                                        <option value={1}>One</option>
                                        <option value={2}>Two</option>
                                        <option value={3}>Three</option>
                                      </select>
                                    </div>
                                    <div className="cabdetailedit" style={{display: 'none'}}>
                                      <div className="form-group">
                                        <select className="custom-select form-control" value={quotations.cab_type} name="cab_type" onChange={handleInputsChanges} id="inputGroupSelect01">
                                          <option value="">Select Cab Type..</option>
                                          <option value="Hatchback">Hatchback</option>
                                          <option value="Sedan">Sedan</option>
                                          <option value="Suv">Suv</option>
                                          <option value="Tempo Traveller">Tempo Traveller</option>
                                          <option value="Seater">Seater</option>
                                          <option value="12 Seater">12 Seater</option>
                                          <option value="16 Seater">16 Seater</option>
                                          <option value="20 Seater">20 Seater</option>
                                          <option value="24 Seater">24 Seater</option>
                                          <option value="Mini Bus">Mini Bus</option>
                                          <option value="Volvo">Volvo</option>
                                        </select>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-sm-4">
                                    <div className="formtitle">
                                      <h5>Cab Modal</h5>
                                      <div className="quedit"><a href="" className="btnsho13">Edit</a>
                                      </div>
                                    </div>
                                    <div className="form-group">
                                      <input type="text" name="title" placeholder="Dezire" value={quotations.cab_model} className="form-control" disabled />
                                    </div>
                                    <div className="cabmodaledit" style={{display: 'none'}}>
                                      <div className="form-group">
                                        <input type="text" name="title" placeholder="Ex:Dezire" className="form-control" />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-sm-4">
                                    <div className="formtitle">
                                      <h5>Total Kilometers</h5>
                                      <div className="quedit"><a href="" className="btnsho14">Edit</a>
                                      </div>
                                    </div>
                                    <div className="form-group">
                                      <input type="text" name="title" placeholder={570} value={quotations.total_kilometer} className="form-control" disabled />
                                    </div>
                                    <div className="kilometeredit" style={{display: 'none'}}>
                                      <div className="form-group">
                                        <input type="text" name="title" placeholder="Ex:570" className="form-control" />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col-sm-4">
                                    <div className="formtitle">
                                      <h5>Sitting Capacity</h5>
                                      <div className="quedit"><a href="" className="btnsho15">Edit</a>
                                      </div>
                                    </div>
                                    <div className="form-group">
                                      <input type="text" name="title" placeholder={4} value={quotations.sitting_capacity} className="form-control" disabled />
                                    </div>
                                    <div className="sittingedit" style={{display: 'none'}}>
                                      <div className="form-group">
                                        <input type="text" name="title" placeholder="Ex:7" className="form-control" disabled />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-sm-4">
                                    <div className="formtitle">
                                      <h5>Luggage Space</h5>
                                      <div className="quedit"><a href="" className="btnsho16">Edit</a>
                                      </div>
                                    </div>
                                    <div className="form-group">
                                      <select className="custom-select form-control" value={quotations.luggage_space} id="inputGroupSelect01" disabled>
                                        <option>2</option>
                                        <option value={1}>1</option>
                                        <option value={2}>2</option>
                                        <option value={3}>3</option>
                                        <option value={4}>4</option>
                                        <option value={5}>5</option>
                                        <option value={6}>6</option>
                                      </select>
                                    </div>
                                    <div className="luggageedit" style={{display: 'none'}}>
                                      <div className="form-group">
                                        <select className="custom-select form-control" id="inputGroupSelect01">
                                          <option>Select Number of Bag..</option>
                                          <option value={1}>1</option>
                                          <option value={2}>2</option>
                                          <option value={3}>3</option>
                                          <option value={4}>4</option>
                                          <option value={5}>5</option>
                                          <option value={6}>6</option>
                                        </select>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col-sm-12">
                                    <div className="formtitle">
                                      <h5>Note:(Optional)</h5>
                                      <div className="quedit"><a href="" className="btnsho17">Edit</a>
                                      </div>
                                    </div>
                                    <div className="form-group">
                                      <textarea name="w3review" rows={4} cols={50} className="form-control" disabled value={quotations.notes} />
                                    </div>
                                    <div className="noteedit" style={{display: 'none'}}>
                                      <div className="form-group">
                                        <textarea name="w3review" rows={4} cols={50} className="form-control" defaultValue={""} />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>{/*END*/}
                            <div className="placebid">
                              <div className="bookingheader">
                                <div className="row">
                                  <div className="col-sm-12">
                                    <div className="bookdetail">
                                      <h3>Place Bid on this Booking</h3>
                                    </div>
                                  </div>
                                </div>
                              </div>                               
                              <div className="placebidbook">
                                <p>You will be able to edit your bid until the booking is awarded to someone.</p>
                                <div className="row">
                                  <div className="col-sm-4">
                                    <div className="formtitle">
                                      <h5>Bid Details.</h5>
                                    </div>
                                    <span>Cab Details</span>
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col-sm-4">
                                    <div className="input-group">
                                      <span className="input-group-btn">
                                        <i className="fa fa-inr" />
                                      </span>
                                      <input type="number" name="payment" value={quotations.payment} onChange={handleInputChanges} className="form-control" placeholder={6000} />
                                    </div>
                                  </div>
                                </div>
                                <div className="gstdescrip">The Total amount of booking after adding GST and our service charges:{quotations.payment} + 5% GST + 10% SC = <i className="fa fa-inr" /> {quotations.total_payment} </div>
                                <hr />
                                <div className="row">
                                  <div className="col-sm-4">
                                    <div className="formtitle">
                                      <h5>Suggest a advance payment</h5>
                                    </div>
                                  </div>
                                </div>
                                <div className="advancepayment">
                                  <label htmlFor="payment">First Payment</label>
                                  <div className="row">
                                    <div className="form-group col-sm-4">
                                      <div className="input-group">
                                        <span className="input-group-btn">
                                          <i className="fa fa-inr" />
                                        </span>
                                        <input type="number" value={quotations.payment_first} name="payment_first" onChange={handleInputChanges} className="form-control" placeholder={6000} />
                                      </div>
                                    </div>
                                    <div className="form-group col-sm-4">
                                     <input type="text" value={quotations.payment_first_note} name="payment_first_note" onChange={handleInputChanges} className="form-control" placeholder="Note..." />
                                    </div>
                                  </div>
                                </div>                            
                                

                                <div className="clearfix" />
                                <div className="add-payment">
                                  <div className="paymentinstallment">
                                    <a onClick={() => handleAddPaymentFields()} className="payinstall">Add Payment Installment</a>
                                  </div>
                                  <div className="addmore">
                                    {paymentFields.map((paymentField, index) => (
                                    <Fragment key={`${paymentField}~${index}`}>
                                      { 
                                        index > 0 ?
                                        <div key={index}>
                                          <label htmlFor="payment">Payment Amount</label>
                                          <div className="row">
                                            <div className="form-group col-sm-4">
                                              <div className="input-group">
                                                <span className="input-group-btn">
                                                  <i className="fa fa-inr" />
                                                </span>
                                               <input type="number" value={paymentField.payment} name="payment" onChange={event => handlePaymentChange(index, event)} className="form-control" placeholder={6000} />
                                              </div>
                                            </div>
                                            <div className="form-group col-sm-4">
                                              <input type="date" value={paymentField.date} name="date" onChange={event => handlePaymentChange(index, event)} className="form-control" placeholder="date.." />
                                            </div>
                                            <div className="col-sm-3">
                                              <a onClick={event => handleRemovePaymentFields(index, event)}>Remove</a>
                                            </div>
                                          </div>
                                        </div>
                                     :null
                                      }
                                    </Fragment>
                                    ))}
                                  </div>
                                </div>  

                                <div className="placebidbtn">                                 
                                  <a onClick={saveBid} className="btn btn-primary">{quotations.payment == 0 ? 'Place Bid' : 'Edit Bid' }</a>
                                </div>
                                 {success ? <FlashMessage duration={10000} persistOnHover={true}>
                                 <h5 className={"alert alert-danger"}>success: {success}</h5></FlashMessage> : ''}
                                 
                              </div>
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
  
export default Qutations