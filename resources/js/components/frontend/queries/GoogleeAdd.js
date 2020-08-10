import React, { Component, useState, useEffect, Fragment } from 'react';
import {BrowserRouter as Router, Link, Route, useHistory} from 'react-router-dom';


const GoogleeAdd = () => {


	const history = useHistory();

	const initialProductState = {
		id: null,
		user_id: null,
		from_places: "",
		to_places: "",
	};

	const [products, setProduct] = useState(initialProductState);

	useEffect(()=>{
		let stateqq = localStorage["appState"];
		if (stateqq) {
			let AppState = JSON.parse(stateqq);
			setProduct({ ...products, user_id: AppState.user.id });
		}
		var loadScript = function(src) {
			var tag = document.createElement('script');
			tag.async = false;
			tag.src = src;
			document.body.appendChild(tag);
		}

		loadScript('/frontend/js/main/book.js')
		loadScript('/frontend/js/main/map1.js')
		loadScript('https://maps.googleapis.com/maps/api/js?key=AIzaSyC5rAQjCpCTECHjSl7fSxVuvSy4TFbXvwE&callback=initAutocomplete&libraries=places&v=weekly')
	},[])



	const saveProduct = () => {
		var data = {
			user_id: products.user_id,
			from_places: products.from_places,
			to_places: products.to_places
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

	

	const handleInputChanges = event => {
		const { name, value } = event.target;
		setProduct({ ...products, [name]: value });
	};

	const handleSubmit = e => {
		e.preventDefault();
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
											              required
											              value={products.selectstate}
											              onChange={handleInputChanges}
											              name="pickupstate">
														<option value="Andhra Pradesh">Pick a state...</option>
														<option value="Andhra Pradesh">Andhra Pradesh</option>
														
														<option value="West Bengal">West Bengal</option>
													</select>
													<input
													  type="text"
										              className="form-control force-focus startpoint"
										              id="from_places"
										              placeholder="Enter Pick Up Location"
										              onChange={handleInputChanges}
										              name="from_places"/>
													
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
													
														<option value="West Bengal">West Bengal</option>
													</select>
													<input
													  type="text"
										              className="form-control force-focus startpoint"
										              id="to_places"
										              placeholder="Enter Destination"
										              onChange={handleInputChanges}
										              name="to_places"/>
										              </div>
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

export default GoogleeAdd;
