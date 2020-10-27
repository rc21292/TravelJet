import React from 'react'  
import axios from 'axios';  

import { Link } from 'react-router-dom';


import { useHistory, useLocation } from 'react-router-dom'

import Moment from 'react-moment';

import { useState, useEffect, useRef ,Fragment } from 'react'  

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

function Bookings({match}) { 

  const history = useHistory()

  const [bookingData, setBookingData] = useState({});  

  const [saveData, setSaveData] = useState('');  

  const [quotationDetails, setQuotationDetails] = useState({});

  const [customer, setCustomer] = useState({});  
  const [stopeges, setStopages] = useState(false);  

  const [error, setError] = useState();  

  const [cancelReasons, setCancelReasons] = useState([]);  
  const [drivers, setDrivers] = useState([]);  

  const [inputFields, setInputFields] = useState([{stopege:''}]);
  const [paymentFields, setPaymentFields] = useState([{payment:'',date:''}]);
  const [user, setUser] = useState(false);

  const [editData, setEditData] = useState(false);
   const [query1, setQuery1] = useState("");
  const [query, setQuery] = useState("");

  const [quotationData, setQuotationData] = useState({});

  const [payment_sc, setPayment_sc] = useState(0);  
  const [payment_gst, setPayment_gst] = useState(0);  

  const autoCompleteRef1 = useRef(null);
  const autoCompleteRef = useRef(null);
  useEffect(() => {  

     let stateqq = localStorage["appState"];
    if (stateqq) {
      let AppState = JSON.parse(stateqq);
      setUser(AppState.user);
      const result2 = axios.get('/api/quotations/getQuotationByBookingId/'+match.params.id+'?status=awarded').then((result2) => {   
      setQuotationData(result2.data);  
      let pay = result2.data.payment;
      setPayment_sc(((parseInt(pay)*5)/100));  
      setPayment_gst(((parseInt(pay)*10)/100));  
    });

    const GetData = async () => { 
      axios.get('/api/queries/show/'+match.params.id+'?type=booking').then((result) => { 
        setBookingData(result.data); 
       axios.get('/api/users/getCancelReasons')
        .then(response=>{
          if (response.data) {
            setCancelReasons(response.data);
          }else{
          }
        });

        axios.get('/api/quotations/getQuotationDetailById/'+result.data.id)
          .then(response=>{
            if (response.data) {
              setQuotationDetails(response.data)  ;
              setQuery(response.data.pickup_location)  ;
              setQuery1(response.data.drop_location)  ;
            } 
          }); 


        axios.get('/api/queries/getQuotationStoppages/'+match.params.id+'/'+AppState.user.id).then(result=>{
          setInputFields(result.data);
        });

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

    axios('/api/drivers/getDriverNames/'+AppState.user.id)
    .then(response=>{ 
      setDrivers(response.data);  
    }); 

    GetData();  
  }

       loadScript(
      `https://maps.googleapis.com/maps/api/js?key=AIzaSyDVR2fXPoEVoCNLIqagX5GQzna3feez4lI&libraries=places`,
      () => handleScriptLoad(setQuery1, setQuery, autoCompleteRef1, autoCompleteRef)
      );   

  }, []); 


  const editField = (name) => {
    if(editData[name]){
      setEditData({[name] : false})
    }else{
      setEditData({[name] : true})
    }
  }


  const handleChange = (event) => {
    setSaveData(event.target.value);
  }


  const cancelBooking = (event) => {
    if (saveData == '') {
      setError('please select Cancellation Reason!');
      return false;
    }else{
       setError('');
       let data = {'reason' :saveData,'quotation_id' : quotationData.id};
       axios.post('/api/queries/cancel/'+ match.params.id,data)  
      .then((result) => {  
        window.location.href = "/agent/leads";
      }); 
    }
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


  const handleStopageChange = (index, event) => {
    const values = [...inputFields];
    if (event.target.name === "stopage") {
      values[index].stopage = event.target.value;
    }
    setInputFields(values);
    setQuotationDetails({ ...quotationDetails, stopeges: values });
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


  const handleRemoveFields = (index, event) => {
    const values = [...inputFields];
    values.splice(index, 1);
    setInputFields(values);
    setQuotationDetails({ ...quotationDetails, stopeges: values });
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
        cab_number:quotationDetails.cab_number,
        driver_name:quotationDetails.driver_name,
        mobile_no:quotationDetails.mobile_no,
        total_kilometer:quotationDetails.total_kilometer,
        sitting_capacity:quotationDetails.sitting_capacity,
        luggage_space:quotationDetails.luggage_space,
        notes:quotationDetails.notes,
      };

      var data1 = BookingDetailsData;
      axios({
        method: 'post',
        url: '/api/quotations/updateQuotationDetails/'+quotationDetails.quotation_id,
        data: data1,
      })
      .then(response => {
       // window.location.href = "/agent/leads";
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
        cab_number:quotationDetails.cab_number,
        driver_name:quotationDetails.driver_name,
        mobile_no:quotationDetails.mobile_no,
        total_kilometer:quotationDetails.total_kilometer,
        sitting_capacity:quotationDetails.sitting_capacity,
        luggage_space:quotationDetails.luggage_space,
        notes:quotationDetails.notes,
      };

      var data1 = BookingDetailsData;
      axios({
        method: 'post',
        url: '/api/quotations/updateQuotationDetails/'+quotationDetails.quotation_id,
        data: data1,
      })
      .then(response => {
       window.location.href = "/agent/leads";
     })

    }  
  };


  const bookBooking = (id) => {  
    axios.post('/api/queries/moveToBooked/'+ id,{quotation_id:quotationDetails.quotation_id})  
    .then((result) => {  
      window.location.href = "/agent/leads";
    });  
  };  

  return (  

     <div>
     <div className="bookingvenderlist">
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
                                        <b>Total Cost:</b> <i className="fa fa-inr" /> {bookingData.vehicle_budget}
                                      </div>
                                      <span>Booking ID:000000{match.params.id}</span>
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
                                      <h3>Travelling Details</h3>
                                    </div>
                                  </div>
                                  <div className="col-sm-5">
                                    <div className="headerbudget">
                                      <span>Booking ID:000000{bookingData.id}</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="quotationbooked quotaedit">
                                <div className="row">
                                  <div className="col-sm-4">
                                    <div className="formtitle">
                                      <h5>Type of Booking</h5>
                                      <div className="quedit"><Link onClick={() => editField('type_of_booking')} className="btnsho5">Edit</Link>
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
                                      <div className="quedit"><Link onClick={() => editField('title_of_booking')} className="btnsho6">Edit</Link>
                                      </div>
                                    </div>
                                    <div className="form-group">
                                      <input type="text" placeholder="Title of Booking" value={quotationDetails.title_of_booking} className="form-control" disabled />
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
                                      <div className="quedit"><Link onClick={() => editField('pickup')} className="btnsho7">Edit</Link>
                                      </div>
                                    </div>
                                    <div className="book-locationPanel">
                                      <div className="selectAddress">
                                        <select className="select-state" value={quotationDetails.pickup_state} disabled>
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
                                        <input type="text" value={quotationDetails.pickup_location} placeholder="Pandav Nagar" className="startpoint form-control" disabled />
                                      </div>
                                    </div>
                                    <div className="editpickup" style={(!editData.pickup) ? {display:'none'} : {display:'block'} }>
                                      <div className="book-locationPanel">
                                        <div className="selectAddress">
                                          <select className="select-state" value={quotationDetails.pickup_state} name="pickup_state" onChange={handleInputsChanges}>
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
                                          <input type="text" 
                                          onChange={event => setQuery(event.target.value)}
                                          value={query}
                                          id="pickup_location"
                                          ref={autoCompleteRef} 
                                          name="pickup_location" 
                                          placeholder="Starting point.." 
                                          className="startpoint form-control" 
                                        />
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-sm-6" style={(quotationDetails.type_of_booking == "Round Trip with Sightseeing") ? {display:"none"} : {display:"block"} }>
                                    <div className="formtitle">
                                      <h5>Drop Location</h5>
                                      <div className="quedit"><Link onClick={() => editField('drop')} className="btnsho8">Edit</Link>
                                      </div>
                                    </div>
                                    <div className="book-destinationPanel">
                                      <div className="selectAddress">
                                        <select className="select-state" value={quotationDetails.destination_state} disabled>
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
                                        <input type="text" value={quotationDetails.drop_location} placeholder="Manali Bus Stand" className="startpoint form-control" disabled />
                                      </div>
                                    </div>
                                    <div className="editdrp" style={(!editData.drop) ? {display:'none'} : {display:'block'} }>
                                      <div className="book-destinationPanel">
                                        <div className="selectAddress">
                                          <select className="select-state" value={quotationDetails.destination_state} name="destination_state" onChange={handleInputsChanges}>
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
                                          <input
                                          ref={autoCompleteRef1}
                                          onChange={event => setQuery1(event.target.value)}
                                          value={query1}
                                          className="form-control startpoint"
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
                                      <div className="quedit"><Link onClick={() => editField('stopeges')} className="btnsho9">Edit</Link>
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
                                      <div className="quedit"><Link onClick={() => editField('inclusions')} className="btnsho10">Edit</Link>
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
                                      <div className="quedit"><Link onClick={() => editField('exclusions')} className="btnsho11">Edit</Link>
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
                                </div>
                            </div>{/*END*/}
                            {/*Vehical Details*/}
                            <div className="createquotation vehicledetail">
                              <div className="bookingheader">
                                <div className="row">
                                  <div className="col-sm-7">
                                    <div className="bookdetail">
                                      <h3>Vehicle Details</h3>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="quotationbooked quotaedit">
                                 <div className="row">
                                  <div className="col-sm-4">
                                    <div className="formtitle">
                                      <h5>Cab Details</h5>
                                      <div className="quedit"><Link onClick={() => editField('cab_type')} className="btnsho12">Edit</Link>
                                      </div>
                                    </div>
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
                                      <div className="quedit"><Link onClick={() => editField('cab_model')} className="btnsho13">Edit</Link>
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
                                      <h5>Cab Number</h5>
                                      <div className="quedit"><Link onClick={() => editField('cab_number')} className="btnsho19">Edit</Link>
                                      </div>
                                    </div>
                                    <div className="form-group">
                                      <input type="text" placeholder="DL 35 CL 9867" value={quotationDetails.cab_number} className="form-control" disabled />
                                    </div>
                                    <div className="cabnumber" style={(!editData.cab_number) ? {display:'none'} : {display:'block'} }>
                                      <div className="form-group">
                                        <input type="text" name="cab_number" placeholder="DL 35 CL 9867" value={quotationDetails.cab_number} onChange={handleInputsChanges} className="form-control" />
                                      </div>
                                    </div>
                                  </div>                                  
                                </div>
                                <div className="row">
                                  <div className="col-sm-4">
                                    <div className="formtitle">
                                      <h5>Sitting Capacity</h5>
                                      <div className="quedit"><Link onClick={() => editField('sitting_capacity')} className="btnsho15">Edit</Link>
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
                                      <div className="quedit"><Link onClick={() => editField('luggage_space')} className="btnsho16">Edit</Link>
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
                                  <div className="col-sm-4">
                                    <div className="formtitle">
                                      <h5>Total Kilometers</h5>
                                      <div className="quedit"><Link onClick={() => editField('total_kilometer')} className="btnsho14">Edit</Link>
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
                                  <div className="col-sm-6">
                                    <div className="formtitle">
                                      <h5>Driver Name</h5>
                                      <div className="quedit"><Link onClick={() => editField('driver_name')} className="btnsho20">Edit</Link>
                                      </div>
                                    </div>
                                    <div className="form-group">
                                      <select className="custom-select form-control" value={quotationDetails.driver_name} id="inputGroupSelect01" disabled>
                                        <option value="">Select Driver Name..</option>
                                        {
                                          drivers.map((x,i)=>{
                                          return(
                                            <option key={i} value={x}>{x}</option>
                                            )
                                          })
                                        }    
                                      </select>
                                    </div>
                                    <div className="driveredit" style={(!editData.driver_name) ? {display:'none'} : {display:'block'} }>
                                      <div className="form-group">
                                        <select className="custom-select form-control" value={quotationDetails.driver_name} name="driver_name" onChange={handleInputsChanges} id="inputGroupSelect01">
                                          <option value="">Select Driver Name..</option>
                                          {
                                            drivers.map((x,i)=>{
                                            return(
                                              <option key={i} value={x}>{x}</option>
                                              )
                                            })
                                          }    
                                        </select>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-sm-6">
                                    <div className="formtitle">
                                      <h5>Mobile Number</h5>
                                      <div className="quedit"><Link onClick={() => editField('mobile_no')} className="btnsho21">Edit</Link>
                                      </div>
                                    </div>
                                    <div className="form-group">
                                      <input type="text" name="title" placeholder={9200929292} value={quotationDetails.mobile_no} className="form-control" disabled />
                                    </div>
                                    <div className="mobilenoledit" style={(!editData.mobile_no) ? {display:'none'} : {display:'block'} }>
                                      <div className="form-group">
                                        <input type="text" name="title" value={quotationDetails.mobile_no} name="mobile_no" onChange={handleInputsChanges} placeholder="Mobile Number" className="form-control" />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col-sm-12">
                                    <div className="formtitle">
                                      <h5>Note:(Optional)</h5>
                                      <div className="quedit"><Link onClick={() => editField('notes')} className="btnsho17">Edit</Link>
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
                            {/*End*/}
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
                                            <td> <b>Paid</b></td>
                                          </tr>
                                           {
                                            quotationData.payments ?
                                            quotationData.payments.map((payments_data,i)=>{
                                              return( <tr key={i}>
                                              <td>{i+2}) {i==0 && 'Second'} {i==1 && 'Third'} {i==2 && 'Fourth'} {i==3 && 'Fifth'} Part</td>
                                              <td> <i className="fa fa-inr" />{payments_data.payment}</td>
                                              <td>{payments_data.status == 'paid' ? <b>Paid </b> : <b>Unpaid</b> }</td>
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
                              <Link onClick={saveBid} className="btn btn-primary">Save</Link>
                              <a onClick={event => bookBooking(match.params.id)} className="btn btn-primary">Move to Booked</a>
                              <a className="btn btn-primary"  data-toggle="modal" data-target="#myModal3">Cancel This Booking</a>
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
     </div>
  )  
}  
  
export default Bookings