import React from 'react'  
import axios from 'axios';  
import { useHistory, useLocation } from 'react-router-dom'

import Pagination from "react-js-pagination";
import Moment from 'react-moment';
import { useState, useEffect, Fragment, useRef } from 'react'  


let autoComplete;
let autoComplete1;

const loadScript = (url, callback) => {
  let script = document.createElement("script");
  script.type = "text/javascript";

  if (script.readyState) {
    script.onreadystatechange = function () {
      if (script.readyState === "loaded" || script.readyState === "complete") {
        script.onreadystatechange = null;
        callback();
      }
    };
  } else {
    script.onload = () => callback();
  }

  script.src = url;
  document.getElementsByTagName("head")[0].appendChild(script);
};

function handleScriptLoad(
  updateQuery1,
  updateQuery,
  autoCompleteRef1,
  autoCompleteRef
  ) {

  autoComplete1 = new window.google.maps.places.Autocomplete(
    autoCompleteRef1.current,
    { types: ["(regions)"], componentRestrictions: { country: "in" } }
    );
  autoComplete1.setFields(["address_components", "formatted_address"]);
  autoComplete1.addListener("place_changed", () =>
    handlePlaceSelect1(updateQuery1)
    );

  autoComplete = new window.google.maps.places.Autocomplete(
    autoCompleteRef.current,
    { types: ["(regions)"], componentRestrictions: { country: "in" } }
    );
  autoComplete.setFields(["address_components", "formatted_address"]);
  autoComplete.addListener("place_changed", () =>
    handlePlaceSelect(updateQuery)
    );
}

async function handlePlaceSelect1(updateQuery1) {
  const addressObject = autoComplete1.getPlace();
  const query = addressObject.formatted_address;
  updateQuery1(query);
}

async function handlePlaceSelect(updateQuery) {
  const addressObject = autoComplete.getPlace();
  const query = addressObject.formatted_address;
  updateQuery(query);
}

function BookingDetails({match}) { 

  const history = useHistory()
  const location = useLocation()


  const initialQuotationState = {
    booking_id: match.params.id,
    user_id: null,
    payment: '' ,
    total_payment: 0,
    payment_first: 0,
    payment_first_note: '',
    payment_second: 0,
    payments: null
  };


  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');


  const initialState = {
    user_id: null,
    agent_id:"",
    booking_id:match.params.id,
    type_of_booking:"",
    title_of_booking:"",
    pickup_state:"",
    pickup_location:"",
    destination_state:"",
    drop_location:"",
    inclusions:"",
    exclusions:"",
    cab_type:"",
    cab_model:"",
    stopeges:null,
    total_kilometer:"",
    sitting_capacity:"",
    luggage_space:"",
    notes:"",
  };

  const [quotationDetails, setQuotationDetails] = useState(initialState);
  const [quotations, setQuotations] = useState(initialQuotationState);
  const [bookingData, setBookingData] = useState({});  
  const [stopeges, setStopages] = useState(false);  

  const [query1, setQuery1] = useState("");
  const [query, setQuery] = useState("");

  const [errors, setErrors] = useState({});
  const [isErrors, setIsErrors] = useState(0);
  const [user, setUser] = useState(false);
  const [customer, setCustomer] = useState(false);


  const autoCompleteRef1 = useRef(null);
  const autoCompleteRef = useRef(null);
  const [inputFields, setInputFields] = useState([{stopege:''}]);
  const [paymentFields, setPaymentFields] = useState([{payment:'',date:''}]);

  useEffect(() => {  
    let stateqq = localStorage["appState"];
    if (stateqq) {
      let AppState = JSON.parse(stateqq);
      setUser(AppState.user);
      setQuotations({ ...quotations, user_id: AppState.user.id });

      const GetData = async () => {  
        const result = await axios('/api/queries/show/'+match.params.id);  
        setBookingData(result.data); 

        axios.get('/api/users/show/'+result.data.user_id)
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

    }

    loadScript(
      `https://maps.googleapis.com/maps/api/js?key=AIzaSyC5rAQjCpCTECHjSl7fSxVuvSy4TFbXvwE&libraries=places`,
      () => handleScriptLoad(setQuery1, setQuery, autoCompleteRef1, autoCompleteRef)
      );   
  }, []);  


  const handlePaymentChange = (index, event) => {
    const values = [...paymentFields];
    // if (event.target.name === "payment" || event.target.name === "date") {
      values[index][event.target.name] = event.target.value;
    // }
    setPaymentFields(values);
    setQuotations({ ...quotations, payments: values });
  };


  const handlePaymentChanges = event => {
    const { name, value } = event.target;
    setQuotations({ ...quotations, [name]: value });
  };



  const handleInputChanges = event => {
    const { name, value } = event.target;
    if (name === "payment") {
      const total_paymentt = parseInt(value) + ((value * 15)/100);
      setQuotations({ ...quotations, payment:value, total_payment: total_paymentt });
    }else{

      setQuotations({ ...quotations, [name]: value });
    }
  };


  const handleInputsChanges = event => {
    const { name, value } = event.target;
    setQuotationDetails({ ...quotationDetails, [name]: value });
  };


  const handleInputChange = (index, event) => {
    const values = [...inputFields];
    if (event.target.name === "stopage") {
      values[index].stopage = event.target.value;
    }
    setInputFields(values);
    setQuotationDetails({ ...quotationDetails, stopeges: values });
  };

  const handleAddFields = () => {
    const values = [...inputFields];
    if(values.length < 5){
      values.push({ stopage: '' });
      setInputFields(values);
    }
  };

  const handleAddPaymentFields = () => {
    const values = [...paymentFields];
    values.push({ payment: '', date:'' });
    setPaymentFields(values);
  };


  const handleRemovePaymentFields = (index, event) => {
    event.preventDefault();
    const values = [...paymentFields];
    values.splice(index, 1);
    setPaymentFields(values);

  };


  const handleRemoveFields = (index, event) => {
    event.preventDefault();
    const values = [...inputFields];
    values.splice(index, 1);
    setInputFields(values);

  };


  const saveBid = () => {

    if (quotationDetails.type_of_booking == "Round Trip with Sightseeing") {

      let BookingDetailsData = {
        user_id: user.id,
        agent_id:user.id,
        booking_id:match.params.id,
        type_of_booking:quotationDetails.type_of_booking,
        title_of_booking:quotationDetails.title_of_booking,
        pickup_state:quotationDetails.pickup_state,
        stopeges:quotationDetails.stopeges,
        pickup_location:query,
        destination_state:quotationDetails.pickup_state,
        drop_location:query,
        inclusions:quotationDetails.inclusions,
        exclusions:quotationDetails.exclusions,
        cab_type:quotationDetails.cab_type,
        cab_model:quotationDetails.cab_model,
        total_kilometer:quotationDetails.total_kilometer,
        sitting_capacity:quotationDetails.sitting_capacity,
        luggage_space:quotationDetails.luggage_space,
        notes:"",
      };
      if (quotations.payment == '' || quotations.payment < 1) {
        setError('please enter amount!');
        return false;
      }else{
        setError('');
      }

      var data = quotations;
      axios({
        method: 'post',
        url: '/api/quotations/storeQuotation',
        data: data,
      })
      .then(response => {
        var data1 = BookingDetailsData;
        axios({
          method: 'post',
          url: '/api/quotations/storeQuotationDetails/'+response.data.id,
          data: data1,
        })
        .then(response => {
          window.location.href = "/agent/leads";
        })
      })
      .catch(e => {
        console.log(e);
      });

    } else{

      let BookingDetailsData = {
        user_id: user.id,
        agent_id:user.id,
        booking_id:match.params.id,
        type_of_booking:quotationDetails.type_of_booking,
        title_of_booking:quotationDetails.title_of_booking,
        pickup_state:quotationDetails.pickup_state,
        stopeges:quotationDetails.stopeges,
        pickup_location:query,
        destination_state:quotationDetails.destination_state,
        drop_location:query1,
        inclusions:quotationDetails.inclusions,
        exclusions:quotationDetails.exclusions,
        cab_type:quotationDetails.cab_type,
        cab_model:quotationDetails.cab_model,
        total_kilometer:quotationDetails.total_kilometer,
        sitting_capacity:quotationDetails.sitting_capacity,
        luggage_space:quotationDetails.luggage_space,
        notes:"",
      };
      if (quotations.payment == '' || quotations.payment < 1) {
        setError('please enter amount!');
        return false;
      }else{
        setError('');
      }

      var data = quotations;
      axios({
        method: 'post',
        url: '/api/quotations/storeQuotation',
        data: data,
      })
      .then(response => {
        var data1 = BookingDetailsData;
        axios({
          method: 'post',
          url: '/api/quotations/storeQuotationDetails/'+response.data.id,
          data: data1,
        })
        .then(response => {
          window.location.href = "/agent/leads";
        })
      })
      .catch(e => {
        console.log(e);
      });

    }  
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
                                      <span>Booking ID:000000{bookingData.id}</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="quotationbooked">
                                <div className="row">
                                  <div className="col-sm-4">
                                    <div className="formtitle">
                                      <h5>Type of Booking</h5>
                                    </div>
                                    <div className="form-group">
                                      <select className="custom-select form-control" name="type_of_booking" onChange={handleInputsChanges} value={quotationDetails.type_of_booking}  id="inputGroupSelect01">
                                        <option>Select Booking Type</option>
                                        <option value="One Way Trip">One Way Trip</option>
                                        <option value="Round Trip with Sightseeing">Round Trip with Sightseeing</option>
                                      </select>
                                    </div>
                                  </div>
                                  <div className="col-sm-8">
                                    <div className="formtitle">
                                      <h5>Subject/Title of Booking</h5>
                                    </div>
                                    <div className="form-group">
                                      <input type="text" name="title_of_booking" onChange={handleInputsChanges} placeholder="Subject/Title of Booking" className="form-control" />
                                    </div>
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col-sm-6">
                                    <div className="formtitle">
                                      <h5>Pickup Location</h5>
                                    </div>
                                    <div className="book-locationPanel">
                                      <div className="selectAddress">
                                        <select className="select-state" name="pickup_state" onChange={handleInputsChanges} placeholder="Pick a state...">
                                          <option value="Andhra Pradesh">Pick a state...</option>
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
                                        <input type="text" 
                                          onChange={event => setQuery(event.target.value)}
                                          id="pickup_location"
                                          ref={autoCompleteRef} 
                                          name="pickup_location" 
                                          placeholder="Starting point.." 
                                          className="startpoint form-control" 
                                        />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-sm-6" style={(quotationDetails.type_of_booking == "Round Trip with Sightseeing") ? {display:"none"} : {display:"block"} }>
                                    <div className="formtitle">
                                      <h5>Drop Location</h5>
                                    </div>
                                    <div className="book-destinationPanel">
                                      <div className="selectAddress">
                                        <select className="select-state" name="destination_state" onChange={handleInputsChanges} placeholder="Pick a state...">
                                          <option value="Andhra Pradesh">Pick a state...</option>
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
                                        <input
                                          ref={autoCompleteRef1}
                                          onChange={event => setQuery1(event.target.value)}
                                          className="form-control startpoint"
                                          id="drop_location"
                                          onTouchEnd={(event) => handleChange(event.target.value)}
                                          placeholder="Droping point.."
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col-sm-12">
                                    <div className="formtitle">
                                      <h5>Add Stoppage</h5>
                                    </div>

                                    <div className="add-stop">
                                      <div className="addstop-title" onClick={() => handleAddFields()}>
                                        <i className="fa fa-plus-circle" /> <span>Add Stop</span>
                                      </div>
                                      {inputFields.map((inputField, index) => (
                                        <Fragment key={`${inputField}~${index}`}>
                                          { 
                                          index > 0 ?
                                          <div className="col-sm-6">
                                            <div className="radio custom-radio" style={{position: 'relative'}}>
                                              <label htmlFor="stopage">Stopage {index}</label>
                                              <input
                                              onChange={event => handleInputChange(index, event)}
                                              type="text"
                                              className="route-stop form-control"
                                              name="stopage"
                                              value={inputField.stopage}
                                              />
                                              <button onClick={event => handleRemoveFields(index, event)} id="remove1" className="btn btn-danger remove-me" style={{position: 'absolute',top: '21px', right:'1px'}}><i className="fa fa-minus-circle" /></button>
                                            </div>
                                          </div>
                                          :null
                                          }
                                        </Fragment>
                                        ))}
                                      </div>
                                      <br/>

                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col-sm-6">
                                    <div className="formtitle">
                                      <h5>Inclusions</h5>
                                    </div>
                                    <div className="form-group">
                                      <textarea name="inclusions" rows={4} cols={50} className="form-control" onChange={handleInputsChanges} />
                                    </div>
                                  </div>
                                  <div className="col-sm-6">
                                    <div className="formtitle">
                                      <h5>Exclusions</h5>
                                    </div>
                                    <div className="form-group">
                                      <textarea name="exclusions" rows={4} cols={50} className="form-control" onChange={handleInputsChanges} />
                                    </div>
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col-sm-4">
                                    <div className="formtitle">
                                      <h5>Cab Details</h5>
                                    </div>
                                    <div className="form-group">
                                      <select className="custom-select form-control" name="cab_type" onChange={handleInputsChanges} id="inputGroupSelect01">
                                        <option value="">Select Cab Type..</option>
                                        <option value="Hatchback">Hatchback</option>
                                        <option value="Sedan">Sedan</option>
                                        <option value="Suv">Suv</option>
                                        <option value="Tempo Traveller">Tempo Traveller</option>
                                        <option value="12 Seater">12 Seater</option>
                                        <option value="16 Seater">16 Seater</option>
                                        <option value="20 Seater">20 Seater</option>
                                        <option value="24 Seater">24 Seater</option>
                                        <option value="Mini Bus">Mini Bus</option>
                                        <option value="Volvo">Volvo</option>
                                      </select>
                                    </div>
                                  </div>
                                  <div className="col-sm-4">
                                    <div className="formtitle">
                                      <h5>Cab Modal</h5>
                                    </div>
                                    <div className="form-group">
                                      <input type="text" name="cab_model" onChange={handleInputsChanges} placeholder="Ex:Dezire" className="form-control" />
                                    </div>
                                  </div>
                                  <div className="col-sm-4">
                                    <div className="formtitle">
                                      <h5>Total Kilometers</h5>
                                    </div>
                                    <div className="form-group">
                                      <input type="text" placeholder="Ex:570" name="total_kilometer" onChange={handleInputsChanges} className="form-control" />
                                    </div>
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col-sm-4">
                                    <div className="formtitle">
                                      <h5>Sitting Capacity</h5>
                                    </div>
                                    <div className="form-group">
                                      <input type="text" name="sitting_capacity" onChange={handleInputsChanges} placeholder="Ex:7" className="form-control" />
                                    </div>
                                  </div>
                                  <div className="col-sm-4">
                                    <div className="formtitle">
                                      <h5>Luggage Space</h5>
                                    </div>
                                    <div className="form-group">
                                      <select name="luggage_space" onChange={handleInputsChanges} className="custom-select form-control" id="inputGroupSelect01">
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
                                <div className="row">
                                  <div className="col-sm-12">
                                    <div className="formtitle">
                                      <h5>Note:(Optional)</h5>
                                    </div>
                                    <div className="form-group">
                                      <textarea name="notes" onChange={handleInputsChanges} rows={4} cols={50} className="form-control" />
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
                                      <div style={{ color:'red' }}>{error ? error :null}</div>
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
                                        <input type="number" name="payment_first" onChange={handlePaymentChanges} className="form-control" placeholder={6000} />
                                      </div>
                                    </div>
                                    <div className="form-group col-sm-4">
                                     <input type="text" name="payment_first_note" onChange={handlePaymentChanges} className="form-control" placeholder="Note..." />
                                    </div>
                                  </div>
                                </div>                            
                                

                                <div className="clearfix" />
                                <div className="add-payment">
                                  <div className="paymentinstallment">
                                    <a onClick={() => handleAddPaymentFields() } className="payinstall">Add Payment Installment</a>
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
                                  <a onClick={saveBid} className="btn btn-primary">Place Bid</a>
                                </div>
                                 {success ? <FlashMessage duration={10000} persistOnHover={true}>
                                 <h5 className={"alert alert-danger"}>success: {success}</h5></FlashMessage> : ''}
                                 
                              </div>
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
  
export default BookingDetails