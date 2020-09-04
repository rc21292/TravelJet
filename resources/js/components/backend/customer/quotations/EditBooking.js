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


const EditBooking = (props) => {

  const history = useHistory();


  useEffect(()=>{ 

    let stateqq = localStorage["appState"];
    if (stateqq) {
      let AppState = JSON.parse(stateqq);
      setUser(AppState.user);
      axios.get('/api/queries/show/'+props.id).then(result=>{
        setBookings(result.data);
        setClickedAdult(result.data.no_of_adults);
        setClickedChildren(result.data.no_of_childrens);
        setQuery(result.data.from_places);
        setQuery1(result.data.to_places);
      });
    }   

    loadScript(
      `https://maps.googleapis.com/maps/api/js?key=AIzaSyC5rAQjCpCTECHjSl7fSxVuvSy4TFbXvwE&libraries=places`,
      () => handleScriptLoad(setQuery1, setQuery, autoCompleteRef1, autoCompleteRef)
      );

  },[])

  const [bookings, setBookings] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [clickedAdult, setClickedAdult] = useState(1);
  const [clickedChildren, setClickedChildren] = useState(0);
  const [clickedInfant, setClickedInfant] = useState(0);
  const [inputFields, setInputFields] = useState([{ stopage: ''}]);

  const [user, setUser] = useState(false);

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

  const saveBooking = (event) => {

    event.preventDefault();

    if (bookings.booking_type == "Round Trip with Sightseeing") {
      var data = {
        id:bookings.id,
        user_id: bookings.user_id,
        pickupstate: bookings.pickupstate,
        destinationstate: bookings.pickupstate,
        pickup: bookings.from_places,
        origin: bookings.origin,
        depart: bookings.depart,
        from_places: query,
        stopeges: bookings.stopeges,
        to_places:  query,
        for_sightseeing: 1,
        arrival: bookings.arrival,
        pickup: bookings.pickup,
        in_city: bookings.in_city,
        no_of_adults:bookings.no_of_adults,
        no_of_childrens:bookings.no_of_childrens,
        no_of_infants:bookings.no_of_infants,
        vehicle_type:bookings.vehicle_type,
        vehicle_when:bookings.vehicle_when,
        booking_name:bookings.booking_name,
        booking_type:bookings.booking_type,
        description:bookings.description,
        vehicle_budget:bookings.vehicle_budget
      };
    } else {
      var data = {
        id:bookings.id,
        user_id: bookings.user_id,
        pickupstate: bookings.pickupstate,
        destinationstate: bookings.destinationstate,
        pickup: bookings.from_places,
        origin: bookings.origin,
        depart: bookings.depart,
        from_places: query,
        stopeges: bookings.stopeges,
        to_places:  query1,
        for_sightseeing: 0,
        arrival: bookings.arrival,
        pickup: bookings.pickup,
        in_city: bookings.in_city,
        no_of_adults:bookings.no_of_adults,
        no_of_childrens:bookings.no_of_childrens,
        no_of_infants:bookings.no_of_infants,
        vehicle_type:bookings.vehicle_type,
        vehicle_when:bookings.vehicle_when,
        booking_name:bookings.booking_name,
        booking_type:bookings.booking_type,
        description:bookings.description,
        vehicle_budget:bookings.vehicle_budget
      };
    }

    axios({
      method: 'post',
      url: '/api/queries/update/'+bookings.id,
      data: data,
    })
    .then(response => {
       props.onIdChnage(0);     
      setSubmitted(true);   
    })
    .catch(e => {
      console.log(e);
    });
  };

  const handleChecked = (event) => {
    if (bookings.in_city == 0) {
      setBookings({ ...bookings, in_city: 1 });
    }else{
      setBookings({ ...bookings, in_city: 0 });
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

  console.log(bookings);
		return (
            <div className="editbooking">
              <div className="row">
                <div className="col-sm-6 col-xs-12">
                  <div className="form-group">
                    <div className="book-locationPanel">
                      <div className="panelHeader">
                        <h5>Enter pickup location</h5>
                      </div>
                      <div className="selectAddress">
                        <select className="select-state" name="pickupstate" value={bookings.pickupstate} onChange={handleInputChanges} placeholder="Pick a state...">
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
                        <input                           
                          value={query} 
                          onChange={event => setQuery(event.target.value)}
                          id="from_places"
                          ref={autoCompleteRef} 
                          className="form-control startpoint" 
                          placeholder="Enter a City" />
                      </div>
                    </div>
                  </div>
                  <div className="clearfix" />
                  <div className="book-destinationPanel" style={(bookings.booking_type == "Round Trip with Sightseeing") ? {display:"none"} : {display:"block"} }>
                    <div className="panelHeader">
                      <h5>Enter destination location</h5>
                    </div>
                    <div className="selectAddress">
                      <select className="select-state" name="destinationstate" onChange={handleInputChanges} value={bookings.destinationstate} placeholder="Pick a state...">
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
                      <input
                            ref={autoCompleteRef1}
                            onChange={event => setQuery1(event.target.value)}
                            className="form-control startpoint"
                            value={query1}
                            onTouchEnd={(event) => handleChange(event.target.value)}
                            placeholder="Enter a City"
                          />
                    </div>
                  </div>
                  <div className="clearfix" />
                  <div className="col-sm-12 col-xs-12">
                    <div className="row returnArrival">
                      <div className="col-sm-7">
                        <label className="control-label">Date</label>
                        <div className="form-group book-timing greybg">
                          <input type="date" name="arrival" onChange={handleInputChanges} className="form-control" value={bookings.arrival ||""} placeholder="Arrival" />
                        </div>
                      </div>
                      <div className="col-sm-5">
                        <label className="control-label">Time</label>
                        <div className="form-group book-timing greybg">
                          <input type="time" name="pickup" onChange={handleInputChanges}  className="form-control" value={bookings.pickup ||""} placeholder="Arrival" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="clearfix" />
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
                  </div>
                </div>
                {/*Vehicle*/}
                <div className="col-sm-6">
                  <div className="panelHeader">
                    <h5>Type of Vehicle</h5>
                  </div>
                  <div className="typeof-vehical">
                    <div className="col-sm-10">
                      <div className="radio custom-radio">
                        <label>
                          <input type="radio" name="vehicle_type" onChange={vehicleTypeClick} checked={bookings.vehicle_type === "Hatchback"} value="Hatchback" className="route-stop" /> <span>Hatchback</span>
                        </label>
                      </div>
                    </div>
                    <div className="col-sm-10">
                      <div className="radio custom-radio">
                        <label>
                          <input type="radio" name="vehicle_type" onChange={vehicleTypeClick} checked={bookings.vehicle_type === "Sedan"} value="Sedan" className="route-stop" /> <span>Sedan</span>
                        </label>
                      </div>
                    </div>
                    <div className="col-sm-10">
                      <div className="radio custom-radio">
                        <label>
                          <input type="radio" name="vehicle_type" onChange={vehicleTypeClick} checked={bookings.vehicle_type === "Suv"} value="Suv" className="route-stop" /> <span>Suv</span>
                        </label>
                      </div>
                    </div>
                    <div className="col-sm-10">
                      <div className="radio custom-radio">
                        <label>
                          <input type="radio" name="vehicle_type" onChange={vehicleTypeClick} checked={bookings.vehicle_type === "Tempo Traveller"} value="Tempo Traveller" className="route-stop" /> <span>Tempo Traveller</span>
                        </label>
                      </div>
                    </div>
                    <div className="col-sm-12">
                      <div className="row">
                        <div className="seater">
                          <div className="radio first-radio col-sm-2">
                            <label className="radio-inline">
                              <input type="radio" name="vehicle_type" onChange={vehicleTypeClick} checked={bookings.vehicle_type === "8 Seater"} value="8 Seater" />8 Seater</label>
                          </div>
                          <div className="radio col-sm-2">
                            <label className="radio-inline">
                              <input type="radio" name="vehicle_type" onChange={vehicleTypeClick} checked={bookings.vehicle_type === "12 Seater"} value="12 Seater" />12 Seater</label>
                          </div>
                          <div className="radio col-sm-2">
                            <label className="radio-inline">
                              <input type="radio" name="vehicle_type" onChange={vehicleTypeClick} checked={bookings.vehicle_type === "16 Seater"} value="16 Seater" />16 Seater</label>
                          </div>
                          <div className="radio col-sm-2">
                            <label className="radio-inline">
                              <input type="radio" name="vehicle_type" onChange={vehicleTypeClick} checked={bookings.vehicle_type === "20 Seater"} value="20 Seater" />20 Seater</label>
                          </div>
                          <div className="radio col-sm-2">
                            <label className="radio-inline">
                              <input type="radio" name="vehicle_type" onChange={vehicleTypeClick} checked={bookings.vehicle_type === "24 Seater"} value="24 Seater" />24 Seater</label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="clearfix" />
                    <div className="col-sm-10">
                      <div className="radio custom-radio">
                        <label>
                          <input type="radio" name="vehicle_type" onChange={vehicleTypeClick} checked={bookings.vehicle_type === "Mini"} value="Mini Bus" className="route-stop" /> <span>Mini Bus</span>
                        </label>
                      </div>
                    </div>
                    <div className="col-sm-10">
                      <div className="radio custom-radio">
                        <label>
                          <input type="radio" name="vehicle_type" onChange={vehicleTypeClick} checked={bookings.vehicle_type === "Volvo"} value="Volvo" className="route-stop" /> <span>Volvo</span>
                        </label>
                      </div>
                    </div>
                  </div>
                  {/*end*/}
                </div>
              </div>
              {/*budget*/}
              <div className="col-sm-12">
                <div className="panelHeader">
                  <h5>Budget</h5>
                </div>
                <div className="budget typeof-vehical">
                  <div className="col-sm-4">
                    <div className="radio custom-radio">
                      <label>
                        <input type="radio" name="vehicle_budget" onChange={vehicleBudgetClick} value="3500-5500" checked={bookings.vehicle_budget === "3500-5500"} className="route-stop" /> <span>3500-5500</span>
                      </label>
                    </div>
                  </div>
                  <div className="col-sm-4">
                    <div className="radio custom-radio">
                      <label>
                        <input type="radio" name="vehicle_budget" onChange={vehicleBudgetClick} value="6500-12,000" checked={bookings.vehicle_budget === "6500-12,000"} className="route-stop" /> <span>6500-12,000</span>
                      </label>
                    </div>
                  </div>
                  <div className="col-sm-4">
                    <div className="radio custom-radio">
                      <label>
                        <input type="radio" name="vehicle_budget" onChange={vehicleBudgetClick} value="15000- 25000" checked={bookings.vehicle_budget === "15000- 25000"} className="route-stop" /> <span>15000- 25000</span>
                      </label>
                    </div>
                  </div>
                  <div className="col-sm-4">
                    <div className="radio custom-radio">
                      <label>
                        <input type="radio" name="vehicle_budget" onChange={vehicleBudgetClick} value="35000- 55000" checked={bookings.vehicle_budget === "35000- 55000"} className="route-stop" /> <span>35000- 55000</span>
                      </label>
                    </div>
                  </div>
                  <div className="col-sm-4">
                    <div className="radio custom-radio">
                      <label>
                        <input type="radio" name="vehicle_budget" onChange={vehicleBudgetClick} value="80000- 150000" checked={bookings.vehicle_budget === "80000- 150000"} className="route-stop" /> <span>80000- 150000</span>
                      </label>
                    </div>
                  </div>
                </div>
                <div className="savebtn">
                  <div className="form-group"> <a onClick={saveBooking} className="btn btn-primary">Save</a>
                  </div>
                </div>
              </div>
              {/*end*/}
            </div>
		);
	
}
export default EditBooking