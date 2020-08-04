import React, { Component, useState, useEffect, Fragment } from 'react';
import {BrowserRouter as Router, Link, Route, useHistory} from 'react-router-dom';
const Add = () => {
	 const initialProductState = {
    id: null,
    pickupstate: "",
    destinationstate: "",
    pickup: "",
    origin:"",
    drop:"",
    depart:"",
    arrival:"",
    pickup:"",
    name:""
  };
  const [tutorial, setProduct] = useState(initialProductState);
  const [submitted, setSubmitted] = useState(false);

  const saveProduct = () => {
    var data = {
      pickupstate: tutorial.pickupstate,
      destinationstate: tutorial.destinationstate,
      pickup: tutorial.from_places,
      origin: tutorial.origin,
      depart: tutorial.depart,
      arrival: tutorial.arrival,
      pickup: tutorial.pickup_time,
      name: tutorial.name
    };



axios({
    method: 'post',
    url: '/queries/store',
    data: data,
    })
     .then(response => {
        setProduct({
          id: response.data.id,
          pickupstate: response.data.pickupstate,
          destinationstate: response.data.destinationstate  ,
          pickup: response.data.pickup,
          origin: response.data.origin,
          drop: response.data.drop,
          depart: response.data.depart,
          arrival: response.data.arrival,
          pickup: response.data.pickup,
          name: response.data.name
        });
        setSubmitted(true);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const newProduct = () => {
    setProduct(initialProductState);
    setSubmitted(false);
  };

  const handleInputChanges = event => {
  	console.log(event.target.value)
    const { name, value } = event.target;
    setProduct({ ...tutorial, [name]: value });
  };


  const history = useHistory();

  const gotoProducts = () => {
    history.push('/products')
  };

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

			const [inputFields, setInputFields] = useState([
				{ stopage: ''}
				]);

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
			};

			const handleAddFields = () => {

				const values = [...inputFields];

				if(values.length < 5){
					values.push({ stopage: '' });
					setInputFields(values);
				}

			};

			const handleRemoveFields = index => {
                e.preventDefault();
				const values = [...inputFields];
				values.splice(index, 1);
				setInputFields(values);

			};
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
						<span>One Way Trip</span>
					</div>
				</div>
			</div>
			<div className="progress">
				<div className="progress-bar progress-bar-striped active" role="progressbar" aria-valuemin={0} aria-valuemax={100} />
			</div>
			<div className="alert alert-success hide" />
			<div className="col-lg-7">
				<form id="regiration_form" noValidate>
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
									              required
									              value={tutorial.selectstate}
									              onChange={handleInputChanges}
									              name="pickupstate">
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
								              id="from_places"
								              placeholder="Enter Pick Up Location"
								              required
								              value={tutorial.from_places || ""}
								              onChange={handleInputChanges}
								              name="from_places"/>
											<input 
											  type="hidden"
											  className="form-control"
											  id="origin" 
											  name="origin" 
											  required="" 
											  value={tutorial.origin || ""}
								              onChange={handleInputChanges}
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
															<button onClick={() => handleRemoveFields(index)} id="remove1" class="btn btn-danger remove-me" style={{position: 'absolute',top: '21px', right:'1px'}}><i className="fa fa-minus-circle" /></button>
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
									              value={tutorial.selectdestinationstate}
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
								              required
								              value={tutorial.to_places || ""}
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
												<input type="checkbox" />
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
				<input type="button" name="password" className="next btn btn-success" defaultValue="Next" />
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
										value={tutorial.depart || ""}
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
										value={tutorial.arrival || ""}
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
										value={tutorial.pickup_time || ""}
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
							id="name"
							name="name" 
							className="form-control" 
							placeholder="Booking Name" 
							value={tutorial.name || ""}
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
									<li className="active">
										<a className="page-link" href="#">1</a>
									</li>
									<li><a href="#">2</a></li>
									<li><a href="#">3</a></li>
									<li><a href="#">4</a></li>
									<li><a href="#">5</a></li>
									<li><a href="#">6</a></li>
									<li><a href="#">7</a></li>
									<li><a href="#">8</a></li>
									<li><a href="#">9</a></li>
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
									<li><a href="#">1</a></li>
									<li><a href="#">2</a></li>
									<li><a href="#">3</a></li>
									<li><a href="#">4</a></li>
									<li><a href="#">5</a></li>
									<li><a href="#">6</a></li>
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
									<li><a href="#">1</a></li>
									<li><a href="#">2</a></li>
									<li><a href="#">3</a></li>
									<li><a href="#">4</a></li>
									<li><a href="#">5</a></li>
									<li><a href="#">6</a></li>
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
										<div className="radio custom-radio col-sm-2">
											<input type="radio" name="stop" className="route-stop" />
											<label htmlFor="control-label">8 Seater</label>
										</div>
										<div className="radio custom-radio col-sm-2">
											<input type="radio" name="stop" className="route-stop" />
											<label htmlFor="control-label">12 Seater</label>
										</div>
										<div className="radio custom-radio col-sm-2">
											<input type="radio" name="stop" className="route-stop" />
											<label htmlFor="control-label">16 Seater</label>
										</div>
										<div className="radio custom-radio col-sm-2">
											<input type="radio" name="stop" className="route-stop" />
											<label htmlFor="control-label">20 Seater</label>
										</div>
										<div className="radio custom-radio col-sm-2">
											<input type="radio" name="stop" className="route-stop" />
											<label htmlFor="control-label">24 Seater</label>
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
							<textarea className="form-control" rows={8} placeholder="Any Message" defaultValue={""} />
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
								<input type="text" className="form-control" placeholder="Name" />
							</div>
							<div className="form-group col-sm-9">
								<input type="text" className="form-control" placeholder="Email" />
							</div>
							<div className="form-group col-sm-9">
								<input type="number" className="form-control" placeholder="Mobile" />
							</div>
							<div className="form-group col-sm-9">
								<p>OTP will send your number</p>
							</div>
							<div className="form-group col-sm-9">
								<input type="number" className="form-control" placeholder="Enter OTP" />
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
	<div className="col-lg-5 mapspace" id="map" style={{width:'41%',height:'100%',float:'right'}}>
	</div>
</div>
</div>
{/* END */}
</div>
	);

}

export default Add;