import React from 'react'  
import axios from 'axios';  
import { useHistory, useLocation } from 'react-router-dom'

import Pagination from "react-js-pagination";
import Moment from 'react-moment';
import { useState, useEffect, Fragment,useRef } from 'react'  

import FlashMessage from 'react-flash-message'

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
  const [quotationDetails, setQuotationDetails] = useState({});
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

  const [query1, setQuery1] = useState("");
  const [query, setQuery] = useState("");

  const autoCompleteRef1 = useRef(null);
  const autoCompleteRef = useRef(null);

  useEffect(() => {  
    let stateqq = localStorage["appState"];
    if (stateqq) {
      let AppState = JSON.parse(stateqq);
      setUser(AppState.user);
      setQuotations({ ...quotations, user_id: AppState.user.id });

      axios.get('/api/quotations/getQuotationByBookingUserId/'+match.params.id+'/'+AppState.user.id)
      .then(response=>{
        if (response.data) {
          setQuotations({ ...quotations, user_id: AppState.user.id,payment:response.data.payment,total_payment: response.data.total_payment,payment_first:response.data.payment_first,payment_first_note:response.data.payment_first_note,payment_second:response.data.payment_second });
          axios.get('/api/quotations/getQuotationDetailById/'+response.data.id)
          .then(response=>{
            if (response.data) {
              setQuotationDetails(response.data)  ;
              setQuery(response.data.pickup_location)  ;
              setQuery1(response.data.drop_location)  ;
            } 
          });     
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

     loadScript(
      `https://maps.googleapis.com/maps/api/js?key=AIzaSyDVR2fXPoEVoCNLIqagX5GQzna3feez4lI&libraries=places`,
      () => handleScriptLoad(setQuery1, setQuery, autoCompleteRef1, autoCompleteRef)
      );   

    GetData();  
    }   
  }, []);  


  const editField = (name) => {
    if(editData[name]){
      setEditData({[name] : false})
    }else{
      setEditData({[name] : true})
    }
  }

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

  const handleStopageChange = (index, event) => {
     const values = [...inputFields];
    if (event.target.name === "stopage") {
      values[index].stopage = event.target.value;
    }
    setInputFields(values);
    setQuotationDetails({ ...quotationDetails, stopeges: values });
  };

const handlePaymentChange = (index, event) => {
  const values = [...paymentFields];
  if (event.target.name === "payment" || event.target.name === "date") {
    values[index][event.target.name] = event.target.value;
  }
  setPaymentFields(values);
  setQuotations({ ...quotations, payments: values });
};


const handleInputsChanges = event => {
    const { name, value } = event.target;
    setQuotationDetails({ ...quotationDetails, [name]: value });
  };

const handleAddFields = () => {
  const values = [...inputFields];
  if(values.length < 5){
    setInputFields([...inputFields, { stopege:''}]);
  }
};

const handleAddPaymentFields = () => {
  const values = [...paymentFields];
  if(values.length < 5){
    setPaymentFields([...paymentFields, { payment:'', date:''}]);
  }
};

const handleRemoveFields = (index, event) => {
  const values = [...inputFields];
  values.splice(index, 1);
  setInputFields(values);
  setQuotationDetails({ ...quotationDetails, stopeges: values });
};

const handleRemovePaymentFields = (index, event) => {
  event.preventDefault();
  const values = [...paymentFields];
  values.splice(index, 1);
  setPaymentFields(values);
  setQuotations({ ...quotations, payments: values });
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
        stopeges:inputFields,
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
        notes:quotationDetails.notes,
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
        url: '/api/quotations/storeBid',
        data: data,
      })
      .then(response => {
        var data1 = BookingDetailsData;
        axios({
          method: 'post',
          url: '/api/quotations/updateQuotationDetails/'+quotationDetails.quotation_id,
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
        stopeges:inputFields,
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
        notes:quotationDetails.notes,
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
        url: '/api/quotations/storeBid',
        data: data,
      })
      .then(response => {
        var data1 = BookingDetailsData;
        axios({
          method: 'post',
          url: '/api/quotations/updateQuotationDetails/'+quotationDetails.quotation_id,
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


  console.log(quotationDetails)
  console.log(quotations)

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
                                      <span>Booking ID:000000{match.params.id}</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="quotationbooked quotaedit">
                                <div className="row">
                                  <div className="col-sm-4">
                                    <div className="formtitle">
                                      <h5>Type of Booking</h5>
                                      <div className="quedit"><a onClick={() => editField('type_of_booking')} className="btnsho5">Edit</a>
                                      </div>
                                    </div>
                                    <div className="form-group">
                                      <select className="custom-select form-control" disabled value={quotationDetails.type_of_booking}>
                                        <option>Select Booking Type</option>
                                        <option value="One Way Trip">One Way Trip</option>
                                        <option value="Round Trip with Sightseeing">Round Trip with Sightseeing</option>
                                      </select>
                                    </div>
                                    <div className="quotbkedit" style={(!editData.type_of_booking) ? {display:'none'} : {display:'block'} }>
                                      <div className="form-group">
                                        <select className="custom-select form-control" name="type_of_booking" value={quotationDetails.type_of_booking} onChange={handleInputsChanges}  id="inputGroupSelect01">
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
                                      <div className="quedit"><a onClick={() => editField('title_of_booking')} className="btnsho6">Edit</a>
                                      </div>
                                    </div>
                                    <div className="form-group">
                                      <input type="text" name="title" placeholder="Title of Booking" value={quotationDetails.title_of_booking} className="form-control" disabled />
                                    </div>
                                    <div className="quotintedit" style={(!editData.title_of_booking) ? {display:'none'} : {display:'block'} }>
                                      <div className="form-group">
                                        <input type="text" name="title_of_booking" value={quotationDetails.title_of_booking} onChange={handleInputsChanges} placeholder="Subject/Title of Booking" className="form-control" />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col-sm-6">
                                    <div className="formtitle">
                                      <h5>Pickup Location</h5>
                                      <div className="quedit"><a onClick={() => editField('pickup')} className="btnsho7">Edit</a>
                                      </div>
                                    </div>
                                    <div className="book-locationPanel">
                                      <div className="selectAddress">
                                        <input type="text" name="searchArea" value={quotationDetails.pickup_location} placeholder="Pandav Nagar" className="form-control" disabled />
                                      </div>
                                    </div>
                                    <div className="editpickup" style={(!editData.pickup) ? {display:'none'} : {display:'block'} }>
                                      <div className="book-locationPanel">
                                        <div className="selectAddress">
                                          <input type="text" 
                                          onChange={event => setQuery(event.target.value)}
                                          value={query}
                                          id="pickup_location"
                                          ref={autoCompleteRef} 
                                          name="pickup_location" 
                                          placeholder="Starting point.." 
                                          className="form-control" 
                                        />
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-sm-6" style={(quotationDetails.type_of_booking == "Round Trip with Sightseeing") ? {display:"none"} : {display:"block"} }>
                                    <div className="formtitle">
                                      <h5>Drop Location</h5>
                                      <div className="quedit"><a onClick={() => editField('drop')} className="btnsho8">Edit</a>
                                      </div>
                                    </div>
                                    <div className="book-destinationPanel">
                                      <div className="selectAddress">
                                        <input type="text" name="searchArea" value={quotationDetails.drop_location} placeholder="Manali Bus Stand" className="form-control" disabled />
                                      </div>
                                    </div>
                                    <div className="editdrp" style={(!editData.drop) ? {display:'none'} : {display:'block'} }>
                                      <div className="book-destinationPanel">
                                        <div className="selectAddress">
                                          <input
                                          ref={autoCompleteRef1}
                                          onChange={event => setQuery1(event.target.value)}
                                          value={query1}
                                          className="form-control"
                                          name="drop_location"
                                          onTouchEnd={(event) => handleChange(event.target.value)}
                                          placeholder="Droping point.."
                                        />
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col-sm-12">
                                    <div className="formtitle">
                                      <h5>Add Stoppage</h5>
                                      <div className="quedit"><a onClick={() => editField('stopeges')} className="btnsho9">Edit</a>
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
                                    <div className="stoppageedit" style={(!editData.stopeges) ? {display:'none'} : {display:'block'} }>
                                      <div className="addstoppage">
                                         <div className="row">
                                          <div className="col-sm-12">
                                            <div className="form-group">

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
                                                        onChange={event => handleStopageChange(index, event)}
                                                        type="text"
                                                        className="route-stop form-control"
                                                        name="stopage"
                                                        value={inputField.stopage}
                                                        />
                                                        <button onClick={event => handleRemoveFields(index, event)} id="remove1" className="btn btn-danger remove-me" style={{position: 'absolute',top: '23px', right:'1px', lineHeight:'24px'}}><i className="fa fa-minus-circle" /></button>
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
                                    </div>
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col-sm-6">
                                    <div className="formtitle">
                                      <h5>Inclusions</h5>
                                      <div className="quedit"><a onClick={() => editField('inclusions')} className="btnsho10">Edit</a>
                                      </div>
                                    </div>
                                    <div className="form-group">
                                      <textarea name="w3review" rows={4} cols={50} className="form-control" value={quotationDetails.inclusions} placeholder="State Tax, Toll Tax Driver allowance Taxes" disabled defaultValue={""} />
                                    </div>
                                    <div className="inclusionsedit" style={(!editData.inclusions) ? {display:'none'} : {display:'block'} }>
                                      <div className="formtitle">
                                        <h5>Inclusions</h5>
                                      </div>
                                      <div className="form-group">
                                        <textarea name="w3review" rows={4} cols={50} className="form-control" value={quotationDetails.inclusions} name="inclusions" onChange={handleInputsChanges} />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-sm-6">
                                    <div className="formtitle">
                                      <h5>Exclusions</h5>
                                      <div className="quedit"><a onClick={() => editField('exclusions')} className="btnsho11">Edit</a>
                                      </div>
                                    </div>
                                    <div className="form-group">
                                      <textarea name="w3review" value={quotationDetails.exclusions} rows={4} cols={50} className="form-control" placeholder="" disabled defaultValue={""} />
                                    </div>
                                    <div className="exclusionsedit" style={(!editData.exclusions) ? {display:'none'} : {display:'block'} }>
                                      <div className="formtitle">
                                        <h5>Exclusions</h5>
                                      </div>
                                      <div className="form-group">
                                        <textarea name="w3review" rows={4} cols={50} className="form-control" value={quotationDetails.exclusions} name="exclusions" onChange={handleInputsChanges} />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col-sm-4">
                                    <div className="formtitle">
                                      <h5>Cab Details</h5>
                                      <div className="quedit"><a onClick={() => editField('cab_type')} className="btnsho12">Edit</a>
                                      </div>
                                    </div>
                                    <div className="form-group">
                                       <select className="custom-select form-control" value={quotationDetails.cab_type} name="cab_type" onChange={handleInputsChanges} id="inputGroupSelect01" disabled>
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
                                    <div className="cabdetailedit" style={(!editData.cab_type) ? {display:'none'} : {display:'block'} }>
                                      <div className="form-group">
                                        <select className="custom-select form-control" value={quotationDetails.cab_type} name="cab_type" onChange={handleInputsChanges} id="inputGroupSelect01">
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
                                  </div>
                                  <div className="col-sm-4">
                                    <div className="formtitle">
                                      <h5>Cab Modal</h5>
                                      <div className="quedit"><a onClick={() => editField('cab_model')} className="btnsho13">Edit</a>
                                      </div>
                                    </div>
                                    <div className="form-group">
                                      <input type="text" name="title" placeholder="Dezire" value={quotationDetails.cab_model} className="form-control" disabled />
                                    </div>
                                    <div className="cabmodaledit" style={(!editData.cab_model) ? {display:'none'} : {display:'block'} }>
                                      <div className="form-group">
                                        <input type="text" placeholder="Ex:Dezire" value={quotationDetails.cab_model} name="cab_model" onChange={handleInputsChanges} className="form-control" />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-sm-4">
                                    <div className="formtitle">
                                      <h5>Total Kilometers</h5>
                                      <div className="quedit"><a onClick={() => editField('total_kilometer')} className="btnsho14">Edit</a>
                                      </div>
                                    </div>
                                    <div className="form-group">
                                      <input type="text" name="title" placeholder={570} value={quotationDetails.total_kilometer} className="form-control" disabled />
                                    </div>
                                    <div className="kilometeredit" style={(!editData.total_kilometer) ? {display:'none'} : {display:'block'} }>
                                      <div className="form-group">
                                        <input type="text" value={quotationDetails.total_kilometer} name="total_kilometer" onChange={handleInputsChanges} placeholder="Ex:570" className="form-control" />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col-sm-4">
                                    <div className="formtitle">
                                      <h5>Sitting Capacity</h5>
                                      <div className="quedit"><a onClick={() => editField('sitting_capacity')} className="btnsho15">Edit</a>
                                      </div>
                                    </div>
                                    <div className="form-group">
                                      <input type="text" name="title" placeholder={4} value={quotationDetails.sitting_capacity} className="form-control" disabled />
                                    </div>
                                    <div className="sittingedit" style={(!editData.sitting_capacity) ? {display:'none'} : {display:'block'} }>
                                      <div className="form-group">
                                        <input type="text" value={quotationDetails.sitting_capacity} name="sitting_capacity" onChange={handleInputsChanges} placeholder="Ex:7" className="form-control" />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-sm-4">
                                    <div className="formtitle">
                                      <h5>Luggage Space</h5>
                                      <div className="quedit"><a onClick={() => editField('luggage_space')} className="btnsho16">Edit</a>
                                      </div>
                                    </div>
                                    <div className="form-group">
                                      <select className="custom-select form-control" value={quotationDetails.luggage_space} id="inputGroupSelect01" disabled>
                                        <option>2</option>
                                        <option value={1}>1</option>
                                        <option value={2}>2</option>
                                        <option value={3}>3</option>
                                        <option value={4}>4</option>
                                        <option value={5}>5</option>
                                        <option value={6}>6</option>
                                      </select>
                                    </div>
                                    <div className="luggageedit" style={(!editData.luggage_space) ? {display:'none'} : {display:'block'} }>
                                      <div className="form-group">
                                        <select className="custom-select form-control" value={quotationDetails.luggage_space} name="luggage_space" onChange={handleInputsChanges} id="inputGroupSelect01">
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
                                      <div className="quedit"><a onClick={() => editField('notes')} className="btnsho17">Edit</a>
                                      </div>
                                    </div>
                                    <div className="form-group">
                                      <textarea name="w3review" rows={4} cols={50} className="form-control" disabled value={quotationDetails.notes} />
                                    </div>
                                    <div className="noteedit" style={(!editData.notes) ? {display:'none'} : {display:'block'} }>
                                      <div className="form-group">
                                        <textarea rows={4} cols={50} className="form-control" value={quotationDetails.notes} name="notes" onChange={handleInputsChanges} />
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
                                        <input type="number" value={quotations.payment_first} name="payment_first" onChange={handlePaymentChanges} className="form-control" placeholder={6000} />
                                      </div>
                                    </div>
                                    <div className="form-group col-sm-4">
                                     <input type="text" value={quotations.payment_first_note} name="payment_first_note" onChange={handlePaymentChanges} className="form-control" placeholder="Note..." />
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