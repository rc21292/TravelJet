import React, { Component } from 'react';
import {BrowserRouter as Router, Link, Route} from 'react-router-dom';
export default class Add extends Component {
	constructor()
	{
		super();
		this.onChangeBookingType=this.onChangeBookingType.bind(this);
		this.onChangeStartAt=this.onChangeStartAt.bind(this);
		this.onChangeEndsOn=this.onChangeEndsOn.bind(this);
		this.onChangePickUp=this.onChangePickUp.bind(this);
		this.onChangeDropAt=this.onChangeDropAt.bind(this);
		this.onChangeDestination=this.onChangeDestination.bind(this);
		this.onChangeSightSeeing=this.onChangeSightSeeing.bind(this);
		this.onChangePersons=this.onChangePersons.bind(this);
		this.onChangeCabType=this.onChangeCabType.bind(this);
		this.onChangeBookIn=this.onChangeBookIn.bind(this);
		this.onChangeBudget=this.onChangeBudget.bind(this);
		this.onChangeDescription=this.onChangeDescription.bind(this);
		this.onSubmit=this.onSubmit.bind(this);
		this.state={
			booking_type:'',
			start_at:'',
			end_on:'',
			pick_up:'',
			drop_on:'',
			destination:'',
			sight:'',
			persons:'',
			cab_type:'',
			book_in:'',
			budget:'',
			description:''
		}
	}


componentDidMount(){
	var loadScript = function(src) {
  var tag = document.createElement('script');
  tag.async = false;
  tag.src = src;
  document.body.appendChild(tag);
}
loadScript('/frontend/js/main/book.js')
loadScript('/frontend/js/main/map.js')
loadScript('https://maps.googleapis.com/maps/api/js?key=AIzaSyC5rAQjCpCTECHjSl7fSxVuvSy4TFbXvwE&callback=initAutocomplete&libraries=places&v=weekly')
}

	onChangeBookingType(e){
		this.setState({
			booking_type:e.target.value
		});
	}
	onChangeStartAt(e){
		this.setState({
			start_at:e.target.value
		});
	}
	onChangeEndsOn(e){
		this.setState({
			end_on:e.target.value
		});
	}
	onChangePickUp(e){
		this.setState({
			pick_up:e.target.value
		});
	}
	onChangeDropAt(e){
		this.setState({
			drop_on:e.target.value
		});
	}
	onChangeDestination(e){
		this.setState({
			destination:e.target.value
		});
	}
	onChangeSightSeeing(e){
		this.setState({
			sight:e.target.value
		});
	}
	onChangePersons(e){
		this.setState({
			persons:e.target.value
		});
	}
	onChangeCabType(e){
		this.setState({
			cab_type:e.target.value
		});
	}
	onChangeBookIn(e){
		this.setState({
			book_in:e.target.value
		});
	}
	onChangeBudget(e){
		this.setState({
			budget:e.target.value
		});
	}
	onChangeDescription(e){
		this.setState({
			description:e.target.value
		});
	}

	onSubmit(e){
		e.preventDefault();
		const query = {
			booking_type:this.state.booking_type,
			start_at:this.state.start_at,
			end_on:this.state.end_on,
			pick_up:this.state.pick_up,
			drop_at:this.state.drop_at,
			destination:this.state.destination,
			sight:this.state.sight,
			persons:this.state.persons,
			cab_type:this.state.cab_type,
			book_in:this.state.book_in,
			budget:this.state.budget,
			description:this.state.description
		}
		axios.post('http://127.0.0.1:8000/queries/store',query);
	}
	render() {
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
<select className="select-state" placeholder="Pick a state..." id="selectstate">
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
<input className="form-control force-focus startpoint" id="from_places" placeholder="Enter Pick Up Location"/>
                    <input id="origin" name="origin" required="" type="hidden"/>
                 
</div>
<div className="add-stop">
<div className="addstop-title">
<i className="fa fa-plus-circle" /> <span>Add Stop</span>
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
<div className="book-destinationPanel">
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
<input className="form-control force-focus startpoint" id="to_places" placeholder="Enter Destination"/>
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
<input type="date" name="depart" className="form-control" placeholder="Depart" />
</div>
</div>
<div className="col-sm-4">
<label className="control-label">Arrival</label>
<div className="form-group book-timing greybg">
<input type="date" name="arrival" className="form-control" placeholder="Arrival" />
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
<input type="text" name="booking-location" className="form-control" placeholder="Booking Name" />
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
}