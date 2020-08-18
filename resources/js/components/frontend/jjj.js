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
  autoComplete1 = new window.google.maps.places.Autocomplete(
    autoCompleteRef1.current,
    { types: ["(cities)"], componentRestrictions: { country: "in" } }
  );
  autoComplete1.setFields(["address_components", "formatted_address"]);
  autoComplete1.addListener("place_changed", () =>
    handlePlaceSelect1(updateQuery1)
  );

  autoComplete = new window.google.maps.places.Autocomplete(
    autoCompleteRef.current,
    { types: ["(cities)"], componentRestrictions: { country: "in" } }
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

	const initialProductState = {
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
		vehicle_type:"",
		vehicle_when:"",
		vehicle_budget:"",
		no_of_adults:1,
		no_of_childrens:0,
		no_of_infants:0
	};

	const [products, setProduct] = useState(initialProductState);
	const [submitted, setSubmitted] = useState(false);
	const [clickedAdult, setClickedAdult] = useState(1);
	const [clickedChildren, setClickedChildren] = useState(0);
	const [clickedInfant, setClickedInfant] = useState(0);
	const [inputFields, setInputFields] = useState([{ stopage: ''}]);

	const [isUpdated, setIsUpdated] = useState(false);
	const [errors, setErrors] = useState({});
	const [isErrors, setIsErrors] = useState(0);


	const [query1, setQuery1] = useState("");
	const [query, setQuery] = useState("");


	const autoCompleteRef1 = useRef(null);
	const autoCompleteRef = useRef(null);

	useEffect(()=>{	
		const script = document.createElement("script");

		script.src = "/frontend/js/main/book.js";
		script.async = true;

		document.body.appendChild(script);

		const script1 = document.createElement("script");

		script1.src = "/frontend/js/main/map.js";
		script1.async = true;

		document.body.appendChild(script1);


		loadScript(
			`https://maps.googleapis.com/maps/api/js?key=AIzaSyC5rAQjCpCTECHjSl7fSxVuvSy4TFbXvwE&libraries=places`,
			() => handleScriptLoad(setQuery1, setQuery, autoCompleteRef1, autoCompleteRef)
			);

	},[])

	const saveProduct = () => {
		var data = {
			user_id: products.user_id,
			pickupstate: products.pickupstate,
			destinationstate: products.destinationstate,
			pickup: products.from_places,
			origin: products.origin,
			depart: products.depart,
			from_places: query,
			stopeges: products.stopeges,
			to_places: query1,
			arrival: products.arrival,
			pickup: products.pickup_time,
			name: products.name,
			in_city: products.in_city,
			no_of_adults:products.no_of_adults,
			no_of_childrens:products.no_of_childrens,
			no_of_infants:products.no_of_infants,
			vehicle_type:products.vehicle_type,
			vehicle_when:products.vehicle_when,
			booking_name:products.booking_name,
			email:products.email,
			mobile:products.mobile,
			description:products.description,
			otp:products.otp,
			vehicle_budget:products.vehicle_budget
		};
		axios({
			method: 'post',
			url: '/api/queries/store',
			data: data,
		})
		.then(response => {
			setSubmitted(true);
			window.location = '/customer/bookings';			
		})
		.catch(e => {
			console.log(e);
		});
	};

	const handleChecked = (event) => {
		if (products.in_city == 0) {
			setProduct({ ...products, in_city: 1 });
		}else{
			setProduct({ ...products, in_city: 0 });
		}
	}

	const validateStep1 = event => {

		event.preventDefault();
		let errors = {};
		let formIsValid = true;

		if ((products.pickupstate === '') || (!products.pickupstate)) {  
			formIsValid = false;
			errors["pickupstate"] = "*Please Select State.";
			setErrors(errors);
			setIsErrors(1);
		}
	}

	const handleInputChanges = event => {

		const { name, value } = event.target;

		setProduct({ ...products, [name]: value });
	};

	const handleAdultClick = event => {
		setClickedAdult(event.currentTarget.dataset.id);
		setProduct({ ...products, no_of_adults: event.currentTarget.dataset.id });
	};

	const handleChildrenClick = event => {
		setClickedChildren(event.currentTarget.dataset.id);
		setProduct({ ...products, no_of_childrens: event.currentTarget.dataset.id });
	};

	const handleInfantsClick = event => {
		setClickedInfant(event.currentTarget.dataset.id);
		setProduct({ ...products, no_of_infants: event.currentTarget.dataset.id });
	};

	const vehicleTypeClick = event => {
		setProduct({ ...products, vehicle_type: event.target.value });
	};

	const vehicleBudgetClick = event => {
		setProduct({ ...products, vehicle_budget: event.target.value });
	};

	const vehicleWhenClick = event => {
		setProduct({ ...products, vehicle_when: event.target.value });
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
		setProduct({ ...products, stopeges: values });
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

	console.log(products);

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
              <div className="progress-bar progress-bar-striped active" role="progressbar" aria-valuemin={0} aria-valuemax={100} />
            </div>
            <div className="alert alert-success hide" />
            <form id="regiration_form" noValidate>
              <fieldset>
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
                          <select className="select-state" placeholder="Pick a state...">
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
                          <input type="text" name="searchArea" defaultValue placeholder="Tell us your starting point.." className="startpoint form-control" />
                        </div>
                        <div className="add-stop">
                          <div className="addstop-title">
                            <i className="fa fa-plus-circle" /> <span>Add Stop</span>
                            <h4>Add Destinations/Sightseeing you want to add in your trip.</h4>
                          </div>
                          <div className="col-sm-6">
                            <div className="radio custom-radio">
                              <label>
                                <input type="checkbox" name="stop" className="route-stop" />
                                <span>Manali</span>
                              </label>
                            </div>
                          </div>
                          <div className="col-sm-6">
                            <div className="radio custom-radio">
                              <label>
                                <input type="checkbox" name="stop" className="route-stop" />
                                <span>Shimla</span>
                              </label>
                            </div>
                          </div>
                          <div className="col-sm-6">
                            <div className="radio custom-radio">
                              <label>
                                <input type="checkbox" name="stop" className="route-stop" />
                                <span>Dharamshala</span>
                              </label>
                            </div>
                          </div>
                          <div className="col-sm-6">
                            <div className="radio custom-radio">
                              <label>
                                <input type="checkbox" name="stop" className="route-stop" />
                                <span>Kasol</span>
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="clearfix" />
                      <div className="kilometrediv rounddiv">
                        <div className="custom-control custom-switch">
                          <label className="custom-control-label" htmlFor="customSwitch1">I want to drop my car in a different city</label>
                          <label className="switch">
                            <input type="checkbox" onclick="myFunction()" />
                            <span className="slider round" />
                          </label>
                        </div>
                        <p>Total Kilometre 2500</p>
                      </div>
                      <div className="clearfix" />
                      <div className="book-destinationPanel" id="enterdestin" style={{display: 'none'}}>
                        <div className="panelHeader">
                          <h5>Enter destination location</h5>
                        </div>
                        <div className="selectAddress">
                          <select className="select-state" placeholder="Pick a state...">
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
                          <input type="text" name="searchArea" defaultValue placeholder="Tell us your starting point.." className="startpoint form-control" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-5 col-xs-12">
                    <div className="mapouter"><div className="gmap_canvas"><iframe width="100%" height={350} id="gmap_canvas" src="https://maps.google.com/maps?q=university%20of%20san%20francisco&t=&z=13&ie=UTF8&iwloc=&output=embed" frameBorder={0} scrolling="no" marginHeight={0} marginWidth={0} /><a href="https://2torrentz.net" /></div></div>
                  </div>
                </div>
                <div className="clearfix" />
                <input type="button" name="password" className="next btn btn-success" defaultValue="Next" />
              </fieldset>
              <fieldset>
                <div className="field-title">
                  Select your date and timing
                </div>
                <div className="row">
                  <div className="col-sm-7 col-xs-12">
                    <div className="row returnArrival">
                      <div className="col-sm-4">
                        <label className="control-label">Depart</label>
                        <div className="form-group book-timing greybg">
                          <input type="date" name="depart" className="form-control" placeholder="Depart" />
                        </div>
                      </div>
                      <div className="col-sm-4">
                        <label className="control-label">Return</label>
                        <div className="form-group book-timing greybg">
                          <input type="date" name="arrival" className="form-control" placeholder="Return" />
                        </div>
                      </div>
                      <div className="col-sm-4">
                        <label className="control-label">Pickup Time</label>
                        <div className="form-group book-timing greybg">
                          <input type="time" name="arrival" className="form-control" placeholder="Arrival" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-5 col-xs-12">
                    <div className="mapouter"><div className="gmap_canvas"><iframe width="100%" height={350} id="gmap_canvas" src="https://maps.google.com/maps?q=university%20of%20san%20francisco&t=&z=13&ie=UTF8&iwloc=&output=embed" frameBorder={0} scrolling="no" marginHeight={0} marginWidth={0} /><a href="https://2torrentz.net" /></div></div>
                  </div>
                </div>
                <div className="clearfix" />
                <input type="button" name="previous" className="previous btn btn-secondary" defaultValue="Previous" />
                <input type="button" name="next" className="next btn btn-success" defaultValue="Next" />
              </fieldset>
              <fieldset>
                <div className="field-title">
                  Give your Booking a title
                </div>
                <div className="row">
                  <div className="col-sm-7 col-xs-12">
                    <div className="form-group booking-title">
                      <input type="text" name="booking-location" className="form-control" placeholder="Booking Name" />
                    </div>
                  </div>
                  <div className="col-sm-5 col-xs-12">
                    <div className="mapouter"><div className="gmap_canvas"><iframe width="100%" height={350} id="gmap_canvas" src="https://maps.google.com/maps?q=university%20of%20san%20francisco&t=&z=13&ie=UTF8&iwloc=&output=embed" frameBorder={0} scrolling="no" marginHeight={0} marginWidth={0} /><a href="https://2torrentz.net" /></div></div>
                  </div>
                </div>
                <div className="clearfix" />
                <input type="button" name="previous" className="previous btn btn-secondary" defaultValue="Previous" />
                <input type="button" name="next" className="next btn btn-success" defaultValue="Next" />
              </fieldset>
              <fieldset>
                <div className="field-title">
                  Number of Person
                </div>
                <div className="row">
                  <div className="col-sm-7 col-xs-12">
                    <div className="numberof-person">
                      <label className="control-label">ADULTS (12y+)</label>
                      <div className="form-group">
                        <ul className="pagination">
                          <li className="active">
                            <a className="page-link" href="#">1</a>
                          </li>
                          <li><a href="javascript:void(0);">2</a></li>
                          <li><a href="javascript:void(0);">3</a></li>
                          <li><a href="javascript:void(0);">4</a></li>
                          <li><a href="javascript:void(0);">5</a></li>
                          <li><a href="javascript:void(0);">6</a></li>
                          <li><a href="javascript:void(0);">7</a></li>
                          <li><a href="javascript:void(0);">8</a></li>
                          <li><a href="javascript:void(0);">9</a></li>
                        </ul>
                      </div>
                    </div>
                    <div className="numberof-person">
                      <label className="control-label">CHILDREN (2y-12y)</label>
                      <div className="form-group">
                        <ul className="pagination">
                          <li className="active">
                            <a className="page-link" href="#">0</a>
                          </li>
                          <li><a href="javascript:void(0);">1</a></li>
                          <li><a href="javascript:void(0);">2</a></li>
                          <li><a href="javascript:void(0);">3</a></li>
                          <li><a href="javascript:void(0);">4</a></li>
                          <li><a href="javascript:void(0);">5</a></li>
                          <li><a href="javascript:void(0);">6</a></li>
                        </ul>
                      </div>
                    </div>
                    <div className="numberof-person">
                      <label className="control-label">INFANTS (below 2y)</label>
                      <div className="form-group">
                        <ul className="pagination">
                          <li className="active">
                            <a className="page-link" href="#">0</a>
                          </li>
                          <li><a href="javascript:void(0);">1</a></li>
                          <li><a href="javascript:void(0);">2</a></li>
                          <li><a href="javascript:void(0);">3</a></li>
                          <li><a href="javascript:void(0);">4</a></li>
                          <li><a href="javascript:void(0);">5</a></li>
                          <li><a href="javascript:void(0);">6</a></li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-5 col-xs-12">
                    <div className="mapouter"><div className="gmap_canvas"><iframe width="100%" height={350} id="gmap_canvas" src="https://maps.google.com/maps?q=university%20of%20san%20francisco&t=&z=13&ie=UTF8&iwloc=&output=embed" frameBorder={0} scrolling="no" marginHeight={0} marginWidth={0} /><a href="https://2torrentz.net" /></div></div>
                  </div>
                </div>
                <div className="clearfix" />
                <input type="button" name="previous" className="previous btn btn-secondary" defaultValue="Previous" />
                <input type="button" name="next" className="next btn btn-success" defaultValue="Next" />
              </fieldset>
              <fieldset>
                <div className="field-title">
                  Type of Vehicle 
                </div>
                <div className="row">
                  <div className="col-sm-7 col-xs-12">
                    <div className="typeof-vehical">
                      <div className="col-sm-10">
                        <div className="radio custom-radio">
                          <label>
                            <input type="radio" name="stop" className="route-stop" />
                            <span>Hatchback</span>
                          </label>
                        </div>
                      </div>
                      <div className="col-sm-10">
                        <div className="radio custom-radio">
                          <label>
                            <input type="radio" name="stop" className="route-stop" />
                            <span>Sedan</span>
                          </label>
                        </div>
                      </div>
                      <div className="col-sm-10">
                        <div className="radio custom-radio">
                          <label>
                            <input type="radio" name="stop" className="route-stop" />
                            <span>Suv</span>
                          </label>
                        </div>
                      </div>
                      <div className="col-sm-10">
                        <div className="radio custom-radio">
                          <label>
                            <input type="radio" name="stop" className="route-stop" />
                            <span>Tempo Traveller</span>
                          </label>
                        </div>
                      </div>
                      <div className="col-sm-12">
                        <div className="row">
                          <div className="seater">
                            <div className="radio first-radio col-sm-2">
                              <label className="radio-inline">
                                <input type="radio" name="optradio" />8 Seater
                              </label>
                            </div>
                            <div className="radio col-sm-2">
                              <label className="radio-inline">
                                <input type="radio" name="optradio" />12 Seater
                              </label>
                            </div>
                            <div className="radio col-sm-2">
                              <label className="radio-inline">
                                <input type="radio" name="optradio" />16 Seater
                              </label>
                            </div>
                            <div className="radio col-sm-2">
                              <label className="radio-inline">
                                <input type="radio" name="optradio" />20 Seater
                              </label>
                            </div>
                            <div className="radio col-sm-2">
                              <label className="radio-inline">
                                <input type="radio" name="optradio" />24 Seater
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="clearfix" />	
                      <div className="col-sm-10">
                        <div className="radio custom-radio">
                          <label>
                            <input type="radio" name="stop" className="route-stop" />
                            <span>Mini Bus</span>
                          </label>
                        </div>
                      </div>
                      <div className="col-sm-10">
                        <div className="radio custom-radio">
                          <label>
                            <input type="radio" name="stop" className="route-stop" />
                            <span>Volvo</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-5 col-xs-12">
                    <div className="mapouter"><div className="gmap_canvas"><iframe width="100%" height={350} id="gmap_canvas" src="https://maps.google.com/maps?q=university%20of%20san%20francisco&t=&z=13&ie=UTF8&iwloc=&output=embed" frameBorder={0} scrolling="no" marginHeight={0} marginWidth={0} /><a href="https://2torrentz.net" /></div></div>
                  </div>
                </div>
                <div className="clearfix" />
                <input type="button" name="previous" className="previous btn btn-secondary" defaultValue="Previous" />
                <input type="button" name="next" className="next btn btn-success" defaultValue="Next" />
              </fieldset>
              <fieldset>
                <div className="field-title">
                  Description 
                </div>
                <div className="row">
                  <div className="col-sm-7 col-xs-12">
                    <div className="form-group any-message">
                      <textarea className="form-control" rows={8} placeholder="Any Message" defaultValue={""} />
                    </div>
                  </div>
                  <div className="col-sm-5 col-xs-12">
                    <div className="mapouter"><div className="gmap_canvas"><iframe width="100%" height={350} id="gmap_canvas" src="https://maps.google.com/maps?q=university%20of%20san%20francisco&t=&z=13&ie=UTF8&iwloc=&output=embed" frameBorder={0} scrolling="no" marginHeight={0} marginWidth={0} /><a href="https://2torrentz.net" /></div></div>
                  </div>
                </div>
                <div className="clearfix" />
                <input type="button" name="previous" className="previous btn-secondary" defaultValue="Previous" />
                <input type="button" name="next" className="next btn btn-success" defaultValue="Next" />
              </fieldset>
              <fieldset>
                <div className="field-title">
                  Budget
                </div>
                <div className="row">
                  <div className="col-sm-7 col-xs-12">
                    <div className="budget typeof-vehical">
                      <div className="col-sm-10">
                        <div className="radio custom-radio">
                          <label>
                            <input type="radio" name="stop" className="route-stop" />
                            <span>3500-5500</span>
                          </label>
                        </div>
                      </div>
                      <div className="col-sm-10">
                        <div className="radio custom-radio">
                          <label>
                            <input type="radio" name="stop" className="route-stop" />
                            <span>6500-12,000</span>
                          </label>
                        </div>
                      </div>
                      <div className="col-sm-10">
                        <div className="radio custom-radio">
                          <label>
                            <input type="radio" name="stop" className="route-stop" />
                            <span>15000- 25000</span>
                          </label>
                        </div>
                      </div>
                      <div className="col-sm-10">
                        <div className="radio custom-radio">
                          <label>
                            <input type="radio" name="stop" className="route-stop" />
                            <span>35000- 55000</span>
                          </label>
                        </div>
                      </div>
                      <div className="col-sm-10">
                        <div className="radio custom-radio">
                          <label>
                            <input type="radio" name="stop" className="route-stop" />
                            <span>80000- 150000</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-5 col-xs-12">
                    <div className="mapouter"><div className="gmap_canvas"><iframe width="100%" height={350} id="gmap_canvas" src="https://maps.google.com/maps?q=university%20of%20san%20francisco&t=&z=13&ie=UTF8&iwloc=&output=embed" frameBorder={0} scrolling="no" marginHeight={0} marginWidth={0} /><a href="https://2torrentz.net" /></div></div>
                  </div>
                </div>
                <div className="clearfix" />
                <input type="button" name="previous" className="previous btn btn-secondary" defaultValue="Previous" />
                <input type="button" name="next" className="next btn btn-success" defaultValue="Next" />
              </fieldset>
              <fieldset>
                <div className="field-title">
                  Contact Details
                </div>
                <div className="row">
                  <div className="col-sm-7 col-xs-12">
                    <div className="contact-detail">	
                      <div className="form-group col-sm-9">
                        <input type="text" className="form-control" placeholder="Name" />
                      </div>
                      <div className="form-group col-sm-9">
                        <input type="text" className="form-control" placeholder="Email" />
                      </div>
                      <div className="form-group col-sm-9">
                        <input type="number" className="form-control" placeholder="Mobile" />
                      </div>
                      <div className="row">
                        <div className="form-group col-sm-5">
                          <p>OTP will send your number</p>
                        </div>
                        <div className="form-group col-sm-4">
                          <button className="btn btn-default generateOTP">Generate OTP</button>
                        </div>
                      </div>
                      <div className="form-group col-sm-9">
                        <input type="number" className="form-control" placeholder="Enter OTP" />
                      </div>
                      <div className="form-group col-sm-9">
                        <input type="password" className="form-control" placeholder="Password" />
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-5 col-xs-12">
                    <div className="mapouter"><div className="gmap_canvas"><iframe width="100%" height={350} id="gmap_canvas" src="https://maps.google.com/maps?q=university%20of%20san%20francisco&t=&z=13&ie=UTF8&iwloc=&output=embed" frameBorder={0} scrolling="no" marginHeight={0} marginWidth={0} /><a href="https://2torrentz.net" /></div></div>
                  </div>
                </div>
                <div className="clearfix" />
                <input type="button" name="previous" className="previous btn btn-secondary" defaultValue="Previous" />
                <input type="button" name="next" className="next btn btn-success" defaultValue="Next" />
              </fieldset>
              <fieldset>
                <div className="field-title">
                  When would you like to book your cab ?
                </div>
                <div className="row">
                  <div className="col-sm-7 col-xs-12">
                    <div className="bookyour-cab typeof-vehical">
                      <div className="col-sm-10">
                        <div className="radio custom-radio">
                          <label>
                            <input type="radio" name="stop" className="route-stop" />
                            <span>Urgently</span>
                          </label>
                        </div>
                      </div>
                      <div className="col-sm-10">
                        <div className="radio custom-radio">
                          <label>
                            <input type="radio" name="stop" className="route-stop" />
                            <span>Within 2 days</span>
                          </label>
                        </div>
                      </div>
                      <div className="col-sm-10">
                        <div className="radio custom-radio">
                          <label>
                            <input type="radio" name="stop" className="route-stop" />
                            <span>Within 2 weeks</span>
                          </label>
                        </div>
                      </div>
                      <div className="col-sm-10">
                        <div className="radio custom-radio">
                          <label>
                            <input type="radio" name="stop" className="route-stop" />
                            <span>Within 2 months</span>
                          </label>
                        </div>
                      </div>
                      <div className="col-sm-10">
                        <div className="radio custom-radio">
                          <label>
                            <input type="radio" name="stop" className="route-stop" />
                            <span>2 months+</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <input type="button" name="previous" className="previous btn btn-secondary" defaultValue="Previous" />
                <input type="submit" name="submit" className="submit btn btn-success" defaultValue="Done" />
              </fieldset>
            </form>
          </div>
        </div>
        {/* END */}
      </div>
	);

}

export default BookingRoundTrip;
