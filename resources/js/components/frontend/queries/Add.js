import React, { Component, useState, useEffect, Fragment } from 'react';
import {BrowserRouter as Router, Link, Route, useHistory} from 'react-router-dom';


const Add = (props) => {


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

	useEffect(()=>{


		var loadScript = function(src) {
			var tag = document.createElement('script');
			tag.async = false;
			tag.src = src;
			document.body.appendChild(tag);
		}

		loadScript('/frontend/js/main/book.js')
		loadScript('/frontend/js/main/map.js')
		loadScript('https://maps.googleapis.com/maps/api/js?key=AIzaSyC5rAQjCpCTECHjSl7fSxVuvSy4TFbXvwE&callback=initAutocomplete&libraries=places&v=weekly')
	},[])

	const saveProduct = () => {
		var data = {
			user_id: products.user_id,
			pickupstate: products.pickupstate,
			destinationstate: products.destinationstate,
			pickup: products.from_places,
			origin: products.origin,
			depart: products.depart,
			from_places: products.from_places,
			stopeges: products.stopeges,
			to_places: products.to_places,
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

		const { name, value, dataId } = event.target;

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
			<div className="container">
				<div className="booking-form">
					<div className="row">
						<div className="col-sm-12">
							<div className="book-cabs-trip">
								<span>One Way Trip</span>
							</div>
						</div>
					</div>
					<div className="progress">
						<div className="progress-bar progress-bar-striped active" role="progressbar" aria-valuemin={0} aria-valuemax={100} />
					</div>
					<div className="alert alert-success hide" />
					<div className="col-lg-7">
						 <form id="regiration_form"  name="regiration_form">

							<fieldset>
								<div className="field-title">
									Your Current Location
								</div>

								<div className="row">
									<div className="col-sm-12 col-xs-12">
										<div className="form-group">
											<div className="book-locationPanel">
												<div className="panelHeader">
													<h5>Enter pickup location</h5>
												</div>
												<div className="selectAddress">
													<select
											              className="select-state"
											              id="pickupstate"
											              placeholder="Pick a state..."
											              onChange={handleInputChanges}
											              name="pickupstate">
														<option value="">Pick a state...</option>
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
													<div style={{ color: "red" }} className="errorMsg"></div>
													<input
													  type="text"
										              className="form-control force-focus startpoint"
										              id="from_places"
										              data-id=""
										              placeholder="Enter Pick Up Location"
										              onChange={handleInputChanges}
										              name="from_places"/>
													<input 
													  type="hidden"
													  className="form-control"
													  onChange={handleInputChanges}
													  id="origin" 
													  name="origin"
										              />
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
											<div className="book-destinationPanel">
												<div className="panelHeader">
													<h5>Enter destination location</h5>
												</div>
												<div className="selectAddress">
													<select
											              className="select-state"
											              id="destinationstate"
											              placeholder="Pick a state..."
											              required
											              value={products.selectdestinationstate}
											              onChange={handleInputChanges}
											              name="destinationstate">
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
													  type="text"
										              className="form-control force-focus startpoint"
										              id="to_places"
										              placeholder="Enter Destination"
										              onChange={handleInputChanges}
										              name="to_places"/>
													<input id="destination" name="destination" required="" type="hidden"/></div>
												</div>
											</div>
											<div className="clearfix" />
											<div className="kilometrediv">
												<div className="custom-control custom-switch">
													<label className="custom-control-label" htmlFor="customSwitch1">I want to drop my car in a different city</label>
													<label className="switch">
														<input type="checkbox" onChange={handleChecked} />
														<span className="slider round" />
													</label>
												</div>
												<div className="col-sm-4">
													<div style={{marginLeft: '123px'}} id="result" className="hide">
														<ul className="list-group">
															<li id="in_mile" className="list-group-item d-flex justify-content-between align-items-center"></li> <br>
														</br>
														<li id="in_kilo" className="list-group-item d-flex justify-content-between align-items-center"></li> <br>
													</br>

													<li id="duration_text" className="list-group-item d-flex justify-content-between align-items-center"></li> <br>
												</br>

											</ul>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="clearfix" />
						<input type="hidden" id="isErrors" value={isErrors} />
						<input type="button" name="password" onClick={validateStep1} className="next btn btn-success" defaultValue="Next" />
					</fieldset>
					<fieldset>
						<div className="field-title">
							Select your date and timing
						</div>
						<div className="row">
							<div className="col-sm-12 col-xs-12">
								<div className="row returnArrival">
									<div className="col-sm-4">
										<label className="control-label">Depart</label>
										<div className="form-group book-timing greybg">
											<input 
												type="date" 
												id="depart"
												name="depart" 
												className="form-control" 
												placeholder="Depart"
												value={products.depart || ""}
											    onChange={handleInputChanges} 
											    />
										</div>
									</div>
									<div className="col-sm-4">
										<label className="control-label">Arrival</label>
										<div className="form-group book-timing greybg">
											<input 
											    type="date" 
												id="arrival"
												name="arrival" 
												className="form-control" 
												placeholder="Arrival"
												value={products.arrival || ""}
											    onChange={handleInputChanges}
											     />
										</div>
									</div>
									<div className="col-sm-4">
										<label className="control-label">Pickup Time</label>
										<div className="form-group book-timing greybg">
											<input 
											    type="time" 
												id="pickup_time"
												name="pickup_time" 
												className="form-control" 
												placeholder="Pickup Time"
												value={products.pickup_time || ""}
											    onChange={handleInputChanges}
											/>
										</div>
									</div>
								</div>
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
							<div className="col-sm-12 col-xs-12">
								<div className="form-group booking-title">
									<input 
									type="text" 
									id="booking_name"
									name="booking_name" 
									className="form-control" 
									placeholder="Booking Name" 
									value={products.booking_name || ""}
									onChange={handleInputChanges}
									/>
								</div>
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
							<div className="col-sm-12 col-xs-12">
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
							<div className="col-sm-12 col-xs-12">
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
												<div className="radio custom-radio col-sm-2">
													<input type="radio" name="vehicle_type" onChange={vehicleTypeClick} value="8 Seater" className="route-stop" />
													<label htmlFor="control-label">8 Seater</label>
												</div>
												<div className="radio custom-radio col-sm-2">
													<input type="radio" name="vehicle_type" onChange={vehicleTypeClick} value="12 Seater" className="route-stop" />
													<label htmlFor="control-label">12 Seater</label>
												</div>
												<div className="radio custom-radio col-sm-2">
													<input type="radio" name="vehicle_type" onChange={vehicleTypeClick} value="16 Seater" className="route-stop" />
													<label htmlFor="control-label">16 Seater</label>
												</div>
												<div className="radio custom-radio col-sm-2">
													<input type="radio" name="vehicle_type" onChange={vehicleTypeClick} value="20 Seater" className="route-stop" />
													<label htmlFor="control-label">20 Seater</label>
												</div>
												<div className="radio custom-radio col-sm-2">
													<input type="radio" name="vehicle_type" onChange={vehicleTypeClick} value="24 Seater" className="route-stop" />
													<label htmlFor="control-label">24 Seater</label>
												</div>
											</div>
										</div>
									</div>
									<div className="clearfix" />	
									<div className="col-sm-10">
										<div className="radio custom-radio">
											<label>
												<input type="radio" name="vehicle_type" onChange={vehicleTypeClick} value="Mini" className="route-stop" />
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
							<div className="col-sm-12 col-xs-12">
								<div className="form-group any-message">
									<textarea className="form-control" rows={8} placeholder="Any Message"  name="description" onChange={handleInputChanges} ></textarea>
								</div>
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
							<div className="col-sm-12 col-xs-12">
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
							<div className="col-sm-12 col-xs-12">
								<div className="contact-detail">	
									<div className="form-group col-sm-9">
										<input type="text" onChange={handleInputChanges} name="name" className="form-control" placeholder="Name" />
									</div>
									<div className="form-group col-sm-9">
										<input type="text" onChange={handleInputChanges} name="email" className="form-control" placeholder="Email" />
									</div>
									<div className="form-group col-sm-9">
										<input type="number" onChange={handleInputChanges} name="mobile" className="form-control" placeholder="Mobile" />
									</div>
									<div className="form-group col-sm-9">
										<p>OTP will send your number</p>
									</div>
									<div className="form-group col-sm-9">
										<input type="number" onChange={handleInputChanges} name="otp" className="form-control" placeholder="Enter OTP" />
									</div>
								</div>
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
							<div className="col-sm-12 col-xs-12">
								<div className="bookyour-cab typeof-vehical">
									<div className="col-sm-10">
										<div className="radio custom-radio">
											<label>
												<input type="radio" name="vehicle_when" onChange={vehicleWhenClick} value="Urgently" className="route-stop" />
												<span>Urgently</span>
											</label>
										</div>
									</div>
									<div className="col-sm-10">
										<div className="radio custom-radio">
											<label>
												<input type="radio" name="vehicle_when" onChange={vehicleWhenClick} value="Within 2 days" className="route-stop" />
												<span>Within 2 days</span>
											</label>
										</div>
									</div>
									<div className="col-sm-10">
										<div className="radio custom-radio">
											<label>
												<input type="radio" name="vehicle_when" onChange={vehicleWhenClick} value="Within 2 weeks" className="route-stop" />
												<span>Within 2 weeks</span>
											</label>
										</div>
									</div>
									<div className="col-sm-10">
										<div className="radio custom-radio">
											<label>
												<input type="radio" name="vehicle_when" onChange={vehicleWhenClick} value="Within 2 months" className="route-stop" />
												<span>Within 2 months</span>
											</label>
										</div>
									</div>
									<div className="col-sm-10">
										<div className="radio custom-radio">
											<label>
												<input type="radio" name="vehicle_when" onChange={vehicleWhenClick} value="2 months+" className="route-stop" />
												<span>2 months+</span>
											</label>
										</div>
									</div>
								</div>
							</div>
						</div>
						<input type="button" name="previous" className="previous btn btn-secondary" defaultValue="Previous" />
						<input type="button" onClick={saveProduct} name="submit" className="submit btn btn-success" defaultValue="Done" />
					</fieldset>
				</form>
			</div>
			<div className="col-lg-5 mapspace" id="map" style={{width:'41%',height:'100%',float:'right'}}>
			</div>
		</div>
	</div>
</div>
	);

}

export default Add;
