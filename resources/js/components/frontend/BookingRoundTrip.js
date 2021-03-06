import React, { Component, useState,useRef, useEffect, Fragment } from 'react';
import {BrowserRouter as Router, Link, Route, useHistory} from 'react-router-dom';


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

	var myLatLng = {
		lat: 28.29,
		lng: 79.86
	};
	var map = new google.maps.Map(document.getElementById('google-map'), {zoom: 5, center: myLatLng});

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


const BookingRoundTrip = (props) => {


	const history = useHistory();

	const initialBookingState = {
		id: null,
		user_id: props.user_id,
		pickupstate: "",
		from_places: "",
		destinationstate: "",
		to_places: "",
		in_city: 0,
		pickup: "",
		origin:"",
		drop:"",
		depart:"",
		arrival:"",
		booking_name:"",
		name:"",
		email:"",
		mobile:"",
		stopeges:null,
		description:"",
		otp:"",
		password:"",
		vehicle_type:"",
		vehicle_when:"",
		vehicle_budget:"",
		no_of_adults:1,
		no_of_childrens:0,
		no_of_infants:0
	};

	const [bookings, setBookings] = useState(initialBookingState);
	const [submitted, setSubmitted] = useState(false);
	const [clickedAdult, setClickedAdult] = useState(1);
	const [clickedChildren, setClickedChildren] = useState(0);
	const [clickedInfant, setClickedInfant] = useState(0);
	const [inputFields, setInputFields] = useState([{ stopage: ''}]);

	const [isUpdated, setIsUpdated] = useState(false);
	const [errors, setErrors] = useState({});	
	const [success, setSuccess] = useState({});
	const [isErrors, setIsErrors] = useState(0);

	const [show, setShow] = useState(0);


	const [query1, setQuery1] = useState("");
	const [query, setQuery] = useState("");

	const [widthProgressBar, setWidthProgressBar] = useState('');


	const autoCompleteRef1 = useRef(null);
	const autoCompleteRef = useRef(null);

	useEffect(()=>{	

		let current = 1;
		let curStep = parseInt(show)+1;
		let steps = $("fieldset").length;
		let percent = parseFloat(100 / steps) * curStep;
		percent = percent.toFixed();
		setWidthProgressBar(percent);

		loadScript(
			`https://maps.googleapis.com/maps/api/js?key=AIzaSyDVR2fXPoEVoCNLIqagX5GQzna3feez4lI&libraries=places`,
			() => handleScriptLoad(setQuery1, setQuery, autoCompleteRef1, autoCompleteRef)
			);

	},[])

	const saveBooking = (event) => {
		event.preventDefault();
		let errors = {};
		let formIsValid = true;

		if ((bookings.vehicle_when === '') || (!bookings.vehicle_when)) {  
			formIsValid = false;
			errors["vehicle_when"] = "*Please Select when would you like to book your cab.";
			setErrors(errors);
			return;
		}

		var data = {
			user_id: bookings.user_id,
			pickupstate: bookings.pickupstate,
			destinationstate: bookings.pickupstate,
			pickup: bookings.from_places,
			origin: bookings.origin,
			depart: bookings.depart,
			from_places: query,
			stopeges: bookings.stopeges,
			to_places: query,
			for_sightseeing: 1,
			arrival: bookings.arrival,
			pickup: bookings.pickup_time,
			name: bookings.name,
			in_city: bookings.in_city,
			no_of_adults:bookings.no_of_adults,
			no_of_childrens:bookings.no_of_childrens,
			no_of_infants:bookings.no_of_infants,
			vehicle_type:bookings.vehicle_type,
			vehicle_when:bookings.vehicle_when,
			booking_name:bookings.booking_name,
			booking_type:'Round Trip with Sightseeing',
			email:bookings.email,
			mobile:bookings.mobile,
			description:bookings.description,
			otp:bookings.otp,
			password:bookings.password,
			vehicle_budget:bookings.vehicle_budget
		};
		axios({
			method: 'post',
			url: '/api/queries/store',
			data: data,
		})
		.then(response => {
			setSubmitted(true);
			window.location = '/login/';			
		})
		.catch(e => {
			console.log(e);
		});
	};

	const validateLoginRegister = event => {
		event.preventDefault();
		let errors = {};
		if ((bookings.name === '') || (!bookings.name)) {  
			errors["name"] = "*Please Enter Name.";
			setErrors(errors);
			return;
		}

		if (!bookings.email) {    
            errors["email"] = "Email id is required.";    
            setErrors(errors);
			return;
        }    
        else if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(bookings.email))) {        
            errors["email"] = "Invalid email id.";    
            setErrors(errors);
			return;
        }    

		if ((bookings.password === '') || (!bookings.password)) {  
			errors["password"] = "*Please Enter Password.";
			setErrors(errors);
			return;
		}


		if (!bookings.mobile) {    
			errors["mobile"] = "Phone number is required.";    
			setErrors(errors);
			return;
		}    
		else {    
			var mobPattern = /^(?:(?:\\+|0{0,2})91(\s*[\\-]\s*)?|[0]?)?[789]\d{9}$/;    
			if (!mobPattern.test(bookings.mobile)) {    
				errors["mobile"] = "Invalid phone number.";  
				setErrors(errors);
				return;  
			}    
		}    

		if ((bookings.otp === '') || (!bookings.otp)) {  
			errors["otp"] = "*Please Enter Otp (Generate Otp and enter here).";
			setErrors(errors);
			return;
		}

		var data = {
			name: bookings.name,
			email: bookings.email,
			phone: bookings.mobile,
			password: bookings.password,
			otp: bookings.otp
		};
		axios({
			method: 'post',
			url: '/api/verifyotp',
			data: data,
		})
		.then(response => {
			console.log(response);
			if ((response.data.message == 'success') || (response.data.message == 'Success') || (response.data.message =='Otp Verified Succesfully')) {
				setBookings({...bookings,user_id:response.data.id});
			setShow(8);
			let curStep = 9;
			let steps = $("fieldset").length;
			let percent = parseFloat(100 / steps) * curStep;
			percent = percent.toFixed();
			setWidthProgressBar(percent);
			}else{
				errors["otp"] = "*Otp not varified (Generate Otp and enter here).";
			setErrors(errors);
				return;
			}
		})
		.catch(e => {
			console.log(e);
			return;
		});
	}

	const handleChecked = (event) => {
		if (bookings.in_city == 0) {
			setBookings({ ...bookings, in_city: 1 });
		}else{
			setBookings({ ...bookings, in_city: 0 });
		}
	}

	const validateStep1 = event => {

		event.preventDefault();
		let errors = {};
		let formIsValid = true;

		if ((bookings.pickupstate === '') || (!bookings.pickupstate)) {  
			formIsValid = false;
			errors["pickupstate"] = "*Please Select Pickup State.";
			setErrors(errors);
			return;
		}
		if ((query === '') || (!query)) {  
			formIsValid = false;
			errors["from_places"] = "*Please Enter Starting Point.";
			setErrors(errors);
			setIsErrors(1);
			return
		}
		setShow(1);

		let curStep = 2;
		let steps = $("fieldset").length;
		let percent = parseFloat(100 / steps) * curStep;
		percent = percent.toFixed();
		setWidthProgressBar(percent);
	}

	const generateOTP = (event) => {
		event.preventDefault();
		if(!bookings.mobile){
			setErrors({mobile:'Please enter mobile number!'});
			return false;
		}else{
			var data = {
				phone: bookings.mobile
			};
			axios({
				method: 'post',
				url: '/api/sendotp',
				data: data,
			})
			.then(response => {
				setSuccess({otpSended:'Otp sended successfully!'});
			})
			.catch(e => {
				console.log(e);
			});
		}
	}

	const validateStep4 = event => {
		setShow(4);
		let curStep = 5;
		let steps = $("fieldset").length;
		let percent = parseFloat(100 / steps) * curStep;
		percent = percent.toFixed();
		setWidthProgressBar(percent);
	}

	const validateStep5 = event => {
		setShow(6);
		let curStep = 7;
		let steps = $("fieldset").length;
		let percent = parseFloat(100 / steps) * curStep;
		percent = percent.toFixed();
		setWidthProgressBar(percent);
	}


	const previousStep = (count) => { 
		setShow(count);
		let curStep = parseInt(count)+1;
		let steps = $("fieldset").length;
		let percent = parseFloat(100 / steps) * curStep;
		percent = percent.toFixed();
		setWidthProgressBar(percent);

		if (props.user_id != '' && count==7) {
			setShow(count-1);
			let curStep = parseInt(count)+2;
			setWidthProgressBar(80);
		}

	};  

	const validateStep2 = event => {

		event.preventDefault();
		let errors = {};

		if ((bookings.depart === '') || (!bookings.depart)) {  
			errors["depart"] = "*Please Select Date of Depart.";
			setErrors(errors);
			return;
		}

		if (bookings.depart) {
			var myDate = new Date(bookings.depart);
			var today = new Date();
			if ( myDate < today ) { 
				errors["depart"] = "*Date of Depart must be garter than today's date!";
				setErrors(errors)
				return;
			}
			errors["depart"] = "";
			setErrors(errors)	
		}

		if ((bookings.arrival === '') || (!bookings.arrival)) {  
			errors["arrival"] = "*Please Select Date to Arrival.";
			setErrors(errors);
			setIsErrors(1);
			return
		}


		if (bookings.arrival) {
			var myDate = new Date(bookings.arrival);
			var today = new Date();
			if ( myDate < today ) { 
				errors["arrival"] = "*Date of Arrival must be garter than today's date!";
				setErrors(errors)
				return;
			}
			errors["arrival"] = "";
			setErrors(errors)
		}

		if (bookings.arrival) {
			var myDate = new Date(bookings.arrival);
			var today = new Date(bookings.depart);
			if ( myDate <= today ) { 
				errors["arrival"] = "Arrival Date must be garter than Depart date!";
				setErrors(errors)
				return false;
			}
			errors["arrival"] = "";
			setErrors(errors)
		}

		
		if ((bookings.pickup_time === '') || (!bookings.pickup_time)) {  
			errors["pickup_time"] = "*Please Select Pickup Time.";
			setErrors(errors);
			setIsErrors(1);
			return
		}
		setShow(2);
		let curStep = 3;
		let steps = $("fieldset").length;
		let percent = parseFloat(100 / steps) * curStep;
		percent = percent.toFixed();
		setWidthProgressBar(percent);
	}

	const validateStep3 = event => {

		event.preventDefault();
		let errors = {};

		if ((bookings.booking_name === '') || (!bookings.booking_name)) {  
			errors["booking_name"] = "*Please give a Title to Your Booking.";
			setErrors(errors);
			return;
		}
		setShow(3);
		let curStep = 4;
		let steps = $("fieldset").length;
		let percent = parseFloat(100 / steps) * curStep;
		percent = percent.toFixed();
		setWidthProgressBar(percent);
	}

	const validateStep6 = event => {

		event.preventDefault();
		let errors = {};

		if ((bookings.vehicle_type === '') || (!bookings.vehicle_type)) {  
			errors["vehicle_type"] = "*Please select type of Vehicle.";
			setErrors(errors);
			return;
		}
		setShow(5);
		let curStep = 6;
		let steps = $("fieldset").length;
		let percent = parseFloat(100 / steps) * curStep;
		percent = percent.toFixed();
		setWidthProgressBar(percent);
	}


	const validateStep7 = event => {

		event.preventDefault();
		let errors = {};

		if ((bookings.vehicle_budget === '') || (!bookings.vehicle_budget)) {  
			errors["vehicle_budget"] = "*Please Select your Budget.";
			setErrors(errors);
			return;
		}
		setShow(7);
		let curStep = 8;
		let steps = $("fieldset").length;
		let percent = parseFloat(100 / steps) * curStep;
		percent = percent.toFixed();
		setWidthProgressBar(percent);

		if (props.user_id != '') {
			setShow(8);
			let curStep = 9;
			setWidthProgressBar(100);
		}
	}

	const handleInputChanges = event => {

		const { name, value } = event.target;

		setBookings({ ...bookings, [name]: value });
	};

	const handleAdultClick = event => {
		setClickedAdult(event.currentTarget.dataset.id);
		setBookings({ ...bookings, no_of_adults: event.currentTarget.dataset.id });
	};

	const handleChildrenClick = event => {
		setClickedChildren(event.currentTarget.dataset.id);
		setBookings({ ...bookings, no_of_childrens: event.currentTarget.dataset.id });
	};

	const handleInfantsClick = event => {
		setClickedInfant(event.currentTarget.dataset.id);
		setBookings({ ...bookings, no_of_infants: event.currentTarget.dataset.id });
	};

	const vehicleTypeClick = event => {
		setBookings({ ...bookings, vehicle_type: event.target.value });
	};

	const vehicleBudgetClick = event => {
		setBookings({ ...bookings, vehicle_budget: event.target.value });
	};

	const vehicleWhenClick = event => {
		setBookings({ ...bookings, vehicle_when: event.target.value });
	};
	
	const handleSubmit = e => {
		e.preventDefault();
		console.log("inputFields", inputFields);
	};

	const handleInputChange = (index, event) => {
		const values = [...inputFields];
		if (event.target.name === "stopage") {
			values[index].stopage = event.target.value;
		}
		setInputFields(values);
		setBookings({ ...bookings, stopeges: values });
	};

	const handleAddFields = () => {
		const values = [...inputFields];
		if(values.length < 5){
			values.push({ stopage: '' });
			setInputFields(values);
		}
	};

	const handleRemoveFields = (index, event) => {
		event.preventDefault();
		const values = [...inputFields];
		values.splice(index, 1);
		setInputFields(values);

	};

	console.log(bookings);

    return (
		
		 <div>
        {/* BOOKING-BANNER */}
        <div className="booking-banner">
          <div className="container">
            <div className="row">
              <div className="col-sm-4 col-xs-12">
              </div>
              <div className="col-sm-8 col-xs-12">
                <h1>Book your Cars for Airport, Outstation and Weekend Rides</h1>
              </div>
            </div>
          </div>
        </div>
        {/* END */}
        {/* BOOKING FORM */}
        <div className="container">
          <div className="booking-form">
            <div className="row">
              <div className="col-sm-12">
                <div className="book-cabs-trip">
                  <span>Round Trip with Sightseeing</span>
                </div>
              </div>
            </div>
            <div className="progress">
              <div className="progress-bar progress-bar-striped active" role="progressbar" aria-valuemin={0} aria-valuemax={100} style={{width:widthProgressBar+"%"}} />
            </div>
            <div className="alert alert-success hide" />
            <form id="regiration_form" name="regiration_form" autoComplete="off">
            <input type="hidden" value="prayer" />
              <fieldset style={show==0 ? {display:'block'} : {display:'none'}}>
                <div className="field-title">
                  Your Current Location
                </div>
                <div className="row">
                  <div className="col-sm-7 col-xs-12">
                    <div className="form-group">
                      <div className="book-locationPanel">
                        <div className="panelHeader">
                          <h5>Enter pickup location</h5>
                        </div>
                        <div className="selectAddress">
                          <select className="select-state" id="pickupstate" onChange={handleInputChanges} name="pickupstate" placeholder="Pick a state...">
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
                          <input type="hidden" name="from_places" />
                          <input type="text" name="from_places" autoComplete="off" ref={autoCompleteRef} className="form-control force-focus startpoint" placeholder="Enter a City" />
                        </div>
                        <div style={{color:'red',marginTop:'-15px'}}>{errors.pickupstate}{errors.from_places}</div>
                        <div className="add-stop">
							<div className="addstop-title" onClick={() => handleAddFields()}>
								<i className="fa fa-plus-circle" /> <span>Add Stop</span>
								<h4>Add Destinations/Sightseeing you want to add in your trip.</h4>
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
											id="stopage"
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
						</div>
                      <div className="clearfix" />
                      <div className="kilometrediv rounddiv">
                        <div className="custom-control custom-switch">
                          <label className="custom-control-label" htmlFor="customSwitch1">I want to drop my car in a different city</label>
                          <label className="switch">
                            <input type="checkbox" onChange={handleChecked} name="in_city"/>
                            <span className="slider round" />
                          </label>
                        </div>
                        {/*<p>Total Kilometre 2500</p>*/}
                      </div>
                      <div className="clearfix" />
                      <div className="book-destinationPanel" id="enterdestin" style={{display: 'none'}}>
                        <div className="panelHeader">
                          <h5>Enter destination location</h5>
                        </div>
                        <div className="selectAddress">
                          <select onChange={handleInputChanges} name="destinationstate" value={bookings.destinationstate} className="select-state" placeholder="Pick a state...">
                            <option value="Andhra Pradesh">Pick a state...</option>
                            <option value="Andhra  Pradesh">Andhra Pradesh</option>
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
                            id="to_places"
                            onChange={event => setQuery1(event.target.value)}
                            className="form-control force-focus startpoint"
                            onTouchEnd={(event) => handleChange(event.target.value)}
                            placeholder="Enter a City"
                            name="to_places"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-5 col-xs-12">
                    <div className="col-lg-5 mapspace" id="google-map" style={{width:'100%',height:'350px',float:'right'}}></div>
                  </div>
                </div>
                <div className="clearfix" />
                <input type="button" name="password" onClick={validateStep1} className="next btn btn-success" defaultValue="Next" />
              </fieldset>
              <fieldset style={show==1 ? {display:'block'} : {display:'none'}}>
                <div className="field-title">
                  Select your date and timing
                </div>
                <div className="row">
                  <div className="col-sm-7 col-xs-12">
                    <div className="row returnArrival">
                      <div className="col-sm-4">
                        <label className="control-label">Depart</label>
                        <div className="form-group book-timing greybg">
                          <input type="date" name="depart" onChange={handleInputChanges} className="form-control" placeholder="Depart" />
                        </div>
                      </div>
                      <div className="col-sm-4">
                        <label className="control-label">Return</label>
                        <div className="form-group book-timing greybg">
                          <input type="date" name="arrival" onChange={handleInputChanges} className="form-control" placeholder="Return" />
                        </div>
                      </div>
                      <div className="col-sm-4">
                        <label className="control-label">Pickup Time</label>
                        <div className="form-group book-timing greybg">
                          <input type="time" onChange={handleInputChanges} name="pickup_time" className="form-control" placeholder="Pickup Time" />
                        </div>
                      </div>
                    </div>
                    <div style={{color:'red',marginTop:'-15px'}}>{errors.depart}{errors.arrival}{errors.pickup_time}</div>
                  </div>
                  <div className="col-sm-5 col-xs-12">
                    <div className="mapouter"><div className="gmap_canvas"><iframe width="100%" height={350} id="gmap_canvas" src="https://maps.google.com/maps?q=university%20of%20san%20francisco&t=&z=13&ie=UTF8&iwloc=&output=embed" frameBorder={0} scrolling="no" marginHeight={0} marginWidth={0} /><a href="https://2torrentz.net" /></div></div>
                  </div>
                </div>
                <div className="clearfix" />
                <input type="button"  type="button" onClick={event => previousStep(0)} name="previous" className="previous btn btn-secondary" defaultValue="Previous" />
                <input type="button"  type="button" onClick={validateStep2} name="next" className="next btn btn-success" defaultValue="Next" />
              </fieldset>
              <fieldset style={show==2 ? {display:'block'} : {display:'none'}}>
                <div className="field-title">
                  Give your Booking a title
                </div>
                <div className="row">
                  <div className="col-sm-7 col-xs-12">
                    <div className="form-group booking-title">
                      <input type="text" name="booking_name" onChange={handleInputChanges} className="form-control" placeholder="Booking Name" />
                    </div>
                    <div style={{color:'red',marginTop:'-15px'}}>{errors.booking_name}</div>
                  </div>
                  <div className="col-sm-5 col-xs-12">
                    <div className="mapouter"><div className="gmap_canvas"><iframe width="100%" height={350} id="gmap_canvas" src="https://maps.google.com/maps?q=university%20of%20san%20francisco&t=&z=13&ie=UTF8&iwloc=&output=embed" frameBorder={0} scrolling="no" marginHeight={0} marginWidth={0} /><a href="https://2torrentz.net" /></div></div>
                  </div>
                </div>
                <div className="clearfix" />
                <input type="button"  type="button" onClick={event => previousStep(1)} name="previous" className="previous btn btn-secondary" defaultValue="Previous" />
                <input type="button"  type="button" onClick={validateStep3} name="next" className="next btn btn-success" defaultValue="Next" />
              </fieldset>
              <fieldset style={show==3 ? {display:'block'} : {display:'none'}}>
                <div className="field-title">
                  Number of Person
                </div>
                <div className="row">
                  <div className="col-sm-7 col-xs-12">
                    <div className="numberof-person">
                      <label className="control-label">ADULTS (12y+)</label>
                      <div className="form-group">
                        <ul className="pagination">
                          <li className={clickedAdult == 1 ? 'active' : 'inactive'}>
								<a className="page-link" onClick={handleAdultClick} data-id="1">1</a>
							</li>
							<li className={clickedAdult == 2 ? 'active' : ''}><a onClick={handleAdultClick} data-id="2">2</a></li>
							<li className={clickedAdult == 3 ? 'active' : ''}><a onClick={handleAdultClick} data-id="3">3</a></li>
							<li className={clickedAdult == 4 ? 'active' : ''}><a onClick={handleAdultClick} data-id="4">4</a></li>
							<li className={clickedAdult == 5 ? 'active' : ''}><a onClick={handleAdultClick} data-id="5">5</a></li>
							<li className={clickedAdult == 6 ? 'active' : ''}><a onClick={handleAdultClick} data-id="6">6</a></li>
							<li className={clickedAdult == 7 ? 'active' : ''}><a onClick={handleAdultClick} data-id="7">7</a></li>
							<li className={clickedAdult == 8 ? 'active' : ''}><a onClick={handleAdultClick} data-id="8">8</a></li>
							<li className={clickedAdult == 9 ? 'active' : ''}><a onClick={handleAdultClick} data-id="9">9</a></li>
						</ul>
                      </div>
                    </div>
                    <div className="numberof-person">
                      <label className="control-label">CHILDREN (2y-12y)</label>
                      <div className="form-group">
                        <ul className="pagination">
                          <li className={clickedChildren == 0 ? 'active' : ''}>
								<a onClick={handleChildrenClick} data-id="0" className="page-link">0</a>
							</li>
							<li className={clickedChildren == 1 ? 'active' : ''}><a onClick={handleChildrenClick} data-id="1">1</a></li>
							<li className={clickedChildren == 2 ? 'active' : ''}><a onClick={handleChildrenClick} data-id="2">2</a></li>
							<li className={clickedChildren == 3 ? 'active' : ''}><a onClick={handleChildrenClick} data-id="3">3</a></li>
							<li className={clickedChildren == 4 ? 'active' : ''}><a onClick={handleChildrenClick} data-id="4">4</a></li>
							<li className={clickedChildren == 5 ? 'active' : ''}><a onClick={handleChildrenClick} data-id="5">5</a></li>
							<li className={clickedChildren == 6 ? 'active' : ''}><a onClick={handleChildrenClick} data-id="6">6</a></li>
						</ul>
                      </div>
                    </div>
                    <div className="numberof-person">
                      <label className="control-label">INFANTS (below 2y)</label>
                      <div className="form-group">
                        <ul className="pagination">
                          <li className={clickedInfant == 0 ? 'active' : ''}>
								<a onClick={handleInfantsClick} data-id="0" className="page-link">0</a>
							</li>
							<li className={clickedInfant == 1 ? 'active' : ''}><a onClick={handleInfantsClick} data-id="1">1</a></li>
							<li className={clickedInfant == 2 ? 'active' : ''}><a onClick={handleInfantsClick} data-id="2">2</a></li>
							<li className={clickedInfant == 3 ? 'active' : ''}><a onClick={handleInfantsClick} data-id="3">3</a></li>
							<li className={clickedInfant == 4 ? 'active' : ''}><a onClick={handleInfantsClick} data-id="4">4</a></li>
							<li className={clickedInfant == 5 ? 'active' : ''}><a onClick={handleInfantsClick} data-id="5">5</a></li>
							<li className={clickedInfant == 6 ? 'active' : ''}><a onClick={handleInfantsClick} data-id="6">6</a></li>
						</ul>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-5 col-xs-12">
                    <div className="mapouter"><div className="gmap_canvas"><iframe width="100%" height={350} id="gmap_canvas" src="https://maps.google.com/maps?q=university%20of%20san%20francisco&t=&z=13&ie=UTF8&iwloc=&output=embed" frameBorder={0} scrolling="no" marginHeight={0} marginWidth={0} /><a href="https://2torrentz.net" /></div></div>
                  </div>
                </div>
                <div className="clearfix" />
                <input type="button"  type="button" onClick={event => previousStep(2)} name="previous" className="previous btn btn-secondary" defaultValue="Previous" />
                <input type="button"  type="button" onClick={validateStep4} name="next" className="next btn btn-success" defaultValue="Next" />
              </fieldset>
              <fieldset style={show==4 ? {display:'block'} : {display:'none'}}>
                <div className="field-title">
                  Type of Vehicle 
                </div>
                <div className="row">
                  <div className="col-sm-7 col-xs-12">
                    <div className="typeof-vehical">
                      <div className="col-sm-10">
							<div className="radio custom-radio">
								<label>
									<input type="radio" name="vehicle_type" onChange={vehicleTypeClick} value="Hatchback" className="route-stop" />
									<span>Hatchback</span>
								</label>
							</div>
						</div>
						<div className="col-sm-10">
							<div className="radio custom-radio">
								<label>
									<input type="radio" name="vehicle_type" onChange={vehicleTypeClick} value="Sedan" className="route-stop" />
									<span>Sedan</span>
								</label>
							</div>
						</div>
						<div className="col-sm-10">
							<div className="radio custom-radio">
								<label>
									<input type="radio" name="vehicle_type" onChange={vehicleTypeClick} value="Suv" className="route-stop" />
									<span>Suv</span>
								</label>
							</div>
						</div>
						<div className="col-sm-10">
							<div className="radio custom-radio">
								<label>
									<input type="radio" name="vehicle_type" onChange={vehicleTypeClick} value="Tempo" className="route-stop" />
									<span>Tempo Traveller</span>
								</label>
							</div>
						</div>
                      <div className="col-sm-12">
                        <div className="row">
                          <div className="seater">
                            <div className="radio first-radio col-sm-2">
                              <label className="radio-inline">
                                <input type="radio" name="vehicle_type" onChange={vehicleTypeClick} value="8 Seater" />8 Seater
                              </label>
                            </div>
                            <div className="radio col-sm-2">
                              <label className="radio-inline">
                                <input type="radio" name="vehicle_type" onChange={vehicleTypeClick} value="12 Seater" />12 Seater
                              </label>
                            </div>
                            <div className="radio col-sm-2">
                              <label className="radio-inline">
                                <input type="radio" name="vehicle_type" onChange={vehicleTypeClick} value="16 Seater" />16 Seater
                              </label>
                            </div>
                            <div className="radio col-sm-2">
                              <label className="radio-inline">
                                <input type="radio" name="vehicle_type" onChange={vehicleTypeClick} value="20 Seater" />20 Seater
                              </label>
                            </div>
                            <div className="radio col-sm-2">
                              <label className="radio-inline">
                                <input type="radio" name="vehicle_type" onChange={vehicleTypeClick} value="24 Seater" />24 Seater
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="clearfix" />	
                      <div className="col-sm-10">
                        <div className="radio custom-radio">
                          <label>
                            <input type="radio" name="vehicle_type" onChange={vehicleTypeClick} value="Mini Bus" className="route-stop" />
                            <span>Mini Bus</span>
                          </label>
                        </div>
                      </div>
                      <div className="col-sm-10">
                        <div className="radio custom-radio">
                          <label>
                            <input type="radio" name="vehicle_type" onChange={vehicleTypeClick} value="Volvo" className="route-stop" />
                            <span>Volvo</span>
                          </label>
                        </div>
                      </div>
                    </div>
                    <div style={{color:'red',marginTop:'-15px'}}>{errors.vehicle_type}</div>
                  </div>
                  <div className="col-sm-5 col-xs-12">
                    <div className="mapouter"><div className="gmap_canvas"><iframe width="100%" height={350} id="gmap_canvas" src="https://maps.google.com/maps?q=university%20of%20san%20francisco&t=&z=13&ie=UTF8&iwloc=&output=embed" frameBorder={0} scrolling="no" marginHeight={0} marginWidth={0} /><a href="https://2torrentz.net" /></div></div>
                  </div>
                </div>
                <div className="clearfix" />
                <input type="button"  type="button" onClick={event => previousStep(3)} name="previous" className="previous btn btn-secondary" defaultValue="Previous" />
                <input type="button"  type="button" onClick={validateStep6} name="next" className="next btn btn-success" defaultValue="Next" />
              </fieldset>
              <fieldset style={show==5 ? {display:'block'} : {display:'none'}}>
                <div className="field-title">
                  Description 
                </div>
                <div className="row">
                  <div className="col-sm-7 col-xs-12">
                    <div className="form-group any-message">
                      <textarea className="form-control" rows={8} placeholder="Any Message" name="description" onChange={handleInputChanges} defaultValue={""} />
                    </div>
                  </div>
                  <div className="col-sm-5 col-xs-12">
                    <div className="mapouter"><div className="gmap_canvas"><iframe width="100%" height={350} id="gmap_canvas" src="https://maps.google.com/maps?q=university%20of%20san%20francisco&t=&z=13&ie=UTF8&iwloc=&output=embed" frameBorder={0} scrolling="no" marginHeight={0} marginWidth={0} /><a href="https://2torrentz.net" /></div></div>
                  </div>
                </div>
                <div className="clearfix" />
                <input type="button"  type="button" onClick={event => previousStep(4)} name="previous" className="previous btn-secondary" defaultValue="Previous" />
                <input type="button"  type="button" onClick={validateStep5} name="next" className="next btn btn-success" defaultValue="Next" />
              </fieldset>
              <fieldset style={show==6 ? {display:'block'} : {display:'none'}}>
                <div className="field-title">
                  Budget
                </div>
                <div className="row">
                  <div className="col-sm-7 col-xs-12">
                    <div className="budget typeof-vehical">
                      <div className="col-sm-10">
                        <div className="radio custom-radio">
                          <label>
                            <input type="radio" name="budget" onChange={vehicleBudgetClick} value="3500-5500" className="route-stop" />
                            <span>3500-5500</span>
                          </label>
                        </div>
                      </div>
                      <div className="col-sm-10">
                        <div className="radio custom-radio">
                          <label>
                            <input type="radio" name="budget" onChange={vehicleBudgetClick} value="6500-12,000" className="route-stop" />
                            <span>6500-12,000</span>
                          </label>
                        </div>
                      </div>
                      <div className="col-sm-10">
                        <div className="radio custom-radio">
                          <label>
                            <input type="radio" name="budget" onChange={vehicleBudgetClick} value="15000- 25000" className="route-stop" />
                            <span>15000- 25000</span>
                          </label>
                        </div>
                      </div>
                      <div className="col-sm-10">
                        <div className="radio custom-radio">
                          <label>
                            <input type="radio" name="budget" onChange={vehicleBudgetClick} value="35000- 55000" className="route-stop" />
                            <span>35000- 55000</span>
                          </label>
                        </div>
                      </div>
                      <div className="col-sm-10">
                        <div className="radio custom-radio">
                          <label>
                            <input type="radio" name="budget" onChange={vehicleBudgetClick} value="80000- 150000" className="route-stop" />
                            <span>80000- 150000</span>
                          </label>
                        </div>
                      </div>
                    </div>
                    <div style={{color:'red',marginTop:'-15px'}}>{errors.vehicle_budget}</div>
                  </div>
                  <div className="col-sm-5 col-xs-12">
                    <div className="mapouter"><div className="gmap_canvas"><iframe width="100%" height={350} id="gmap_canvas" src="https://maps.google.com/maps?q=university%20of%20san%20francisco&t=&z=13&ie=UTF8&iwloc=&output=embed" frameBorder={0} scrolling="no" marginHeight={0} marginWidth={0} /><a href="https://2torrentz.net" /></div></div>
                  </div>
                </div>
                <div className="clearfix" />
                <input type="button"  type="button" onClick={event => previousStep(5)} name="previous" className="previous btn btn-secondary" defaultValue="Previous" />
                <input type="button"  type="button" onClick={validateStep7} name="next" className="next btn btn-success" defaultValue="Next" />
              </fieldset>
              <fieldset style={show==7 ? {display:'block'} : {display:'none'}}>
	                <div className="field-title">
	                  Contact Details
	                </div>
	                <div className="row">
	                  <div className="col-sm-7 col-xs-12">
	                    <div className="contact-detail">	
	                      <div className="form-group col-sm-9">
	                        <input type="text" className="form-control"  onChange={handleInputChanges} name="name" placeholder="Name" />
	                      <div style={{color:'red'}}>{errors.name}</div>
	                      </div>
	                      <div className="form-group col-sm-9">
	                        <input type="text" className="form-control"  onChange={handleInputChanges} name="email" placeholder="Email" />
	                      <div style={{color:'red'}}>{errors.email}</div>
	                      </div>
	                      <div className="form-group col-sm-9">
	                        <input type="number" className="form-control"  onChange={handleInputChanges} name="mobile" placeholder="Mobile" />
	                      <div style={{color:'red'}}>{errors.mobile}</div>
	                      </div>
	                      <div className="row">
	                        <div className="form-group col-sm-5">
	                          <p>OTP will send your number</p>
	                        </div>
	                        <div className="form-group col-sm-4">
	                          <button onClick={generateOTP} className="btn btn-default generateOTP">Generate OTP</button>
	                        </div>
	                        <div className="row col-md-12 col-md-offset-5 ">
	                        <div style={{color:'blue'}}>{success.otpSended}</div>
	                        <div style={{color:'red'}}>{errors.otpSended}</div>
	                        </div>
	                      </div>
	                      <div className="form-group col-sm-9">
	                        <input type="number" className="form-control"  onChange={handleInputChanges} name="otp" placeholder="Enter OTP" />
	                      <div style={{color:'red'}}>{errors.otp}</div>
	                      </div>
	                      <div className="form-group col-sm-9">
	                        <input type="password" className="form-control"  onChange={handleInputChanges} name="password" placeholder="Password" />
	                        <div style={{color:'red'}}>{errors.password}</div>
	                      </div>
	                    </div>
	                  </div>
	                  <div className="col-sm-5 col-xs-12">
	                    <div className="mapouter"><div className="gmap_canvas"><iframe width="100%" height={350} id="gmap_canvas" src="https://maps.google.com/maps?q=university%20of%20san%20francisco&t=&z=13&ie=UTF8&iwloc=&output=embed" frameBorder={0} scrolling="no" marginHeight={0} marginWidth={0} /><a href="https://2torrentz.net" /></div></div>
	                  </div>
	                </div>
	                <div className="clearfix" />
	                <input type="button" onClick={event => previousStep(6)} name="previous" className="previous btn btn-secondary" defaultValue="Previous" />
	                <input type="button" onClick={validateLoginRegister} name="next" className="next btn btn-success" defaultValue="Next" />
	              </fieldset>
              <fieldset style={show==8 ? {display:'block'} : {display:'none'}}>
                <div className="field-title">
                  When would you like to book your cab ?
                </div>
                <div className="row">
                  <div className="col-sm-7 col-xs-12">
                    <div className="bookyour-cab typeof-vehical">
                      <div className="col-sm-10">
                        <div className="radio custom-radio">
                          <label>
                            <input name="vehicle_when" onChange={vehicleWhenClick} type="radio" value="Urgently" className="route-stop" />
                            <span>Urgently</span>
                          </label>
                        </div>
                      </div>
                      <div className="col-sm-10">
                        <div className="radio custom-radio">
                          <label>
                            <input name="vehicle_when" onChange={vehicleWhenClick} type="radio" value="Within 2 days" className="route-stop" />
                            <span>Within 2 days</span>
                          </label>
                        </div>
                      </div>
                      <div className="col-sm-10">
                        <div className="radio custom-radio">
                          <label>
                            <input name="vehicle_when" onChange={vehicleWhenClick} type="radio" value="Within 2 weeks" className="route-stop" />
                            <span>Within 2 weeks</span>
                          </label>
                        </div>
                      </div>
                      <div className="col-sm-10">
                        <div className="radio custom-radio">
                          <label>
                            <input name="vehicle_when" onChange={vehicleWhenClick} type="radio" value="Within 2 months" className="route-stop" />
                            <span>Within 2 months</span>
                          </label>
                        </div>
                      </div>
                      <div className="col-sm-10">
                        <div className="radio custom-radio">
                          <label>
                            <input name="vehicle_when" onChange={vehicleWhenClick} type="radio" value="2 months+" className="route-stop" />
                            <span>2 months+</span>
                          </label>
                        </div>
                      </div>
                    </div>
                    <div style={{color:'red',marginTop:'-15px'}}>{errors.vehicle_when}</div>
                  </div>
                </div>
                <input type="button" name="previous" onClick={event => previousStep(7)} className="previous btn btn-secondary" defaultValue="Previous" />
                <input type="button" onClick={saveBooking} name="submit" className="submit btn btn-success" defaultValue="Done" />
              </fieldset>
            </form>
          </div>
        </div>
        {/* END */}
      </div>
	);

}

export default BookingRoundTrip;
