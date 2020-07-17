import React from 'react';
import ReactDOM from 'react-dom';

function Home() {
    return (
      <div>
  {/* BANNER */}
  <div className="banner">
    <div className="container">
      <h1>Book your Cars for Airport, Outstation and Weekend Rides</h1>
      <p className="bestDeals">
        Now available at affordable rates, choose your best deals from multiple
        agents
      </p>
      <div className="row">
        {/* FORM */}
        <div className="col-sm-5">
          <form className="bookForm form-inline">
            <span className="type">Choose your booking type</span>
            <ul className="nav nav-tabs">
              <li className="active">
                <a data-toggle="tab" href="#single">
                  One Way Trip
                </a>
              </li>
              <li>
                <a data-toggle="tab" href="#round">
                  Round Trip
                </a>
              </li>
              <li>
                <a data-toggle="tab" href="#sight">
                  Round Trip with Sightseeing
                </a>
              </li>
            </ul>
            <hr />
            <div className="tab-content">
              {/* SINGLE TRIP */}
              <div id="single" className="tab-pane fade in active">
                <div className="form-group greybg">
                  <label className="control-label">Pickup</label>
                  <input
                    type="text"
                    name="Pickup"
                    className="form-control location"
                    placeholder="Enter your location"
                  />
                </div>
                <div className="form-group greybg">
                  <label className="control-label">Drop</label>
                  <input
                    type="text"
                    name="Drop"
                    className="form-control destination"
                    placeholder="Enter your Destination"
                  />
                </div>
                <div className="form-group greybg">
                  <label className="control-label">When</label>
                  <select name="schedule">
                    <option value="Urgently">Urgently</option>
                    <option value="Within 2 Days">Within 2 Days</option>
                    <option value="Within 1 Week">Within 1 Week</option>
                    <option value="Within 1 Month">Within 1 Month</option>
                    <option value="Months+">Months+</option>
                  </select>
                </div>
                <div className="form-group searchCabs fullwidth">
                  <button className="btn btn-primary btn-block">
                    Search Cars
                  </button>
                </div>
              </div>
              {/* ROUND TRIP */}
              <div id="round" className="tab-pane fade">
                <div className="form-group greybg">
                  <label className="control-label">Pickup</label>
                  <input
                    type="text"
                    name="Pickup"
                    className="form-control location"
                    placeholder="Enter your location"
                  />
                </div>
                <div className="form-group greybg mb-8">
                  <label className="control-label">Where to go</label>
                  <input
                    type="text"
                    name="Drop"
                    className="form-control destination"
                    placeholder="Enter your Destination"
                  />
                </div>
                <div className="row returnArrival">
                  <div className="col-sm-6">
                    <label className="control-label">Depart</label>
                    <div className="form-group greybg">
                      <input
                        type="date"
                        name="depart"
                        className="form-control"
                        placeholder="Depart"
                      />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <label className="control-label">Arrival</label>
                    <div className="form-group greybg">
                      <input
                        type="date"
                        name="arrival"
                        className="form-control"
                        placeholder="Arrival"
                      />
                    </div>
                  </div>
                </div>
                <div className="form-group searchCabs fullwidth">
                  <button className="btn btn-primary btn-block">
                    Search Cars
                  </button>
                </div>
              </div>
              {/* ROUND TRIP WITH SIGHT SEEING*/}
              <div id="sight" className="tab-pane fade">
                <div className="form-group greybg">
                  <label className="control-label">Pickup</label>
                  <input
                    type="text"
                    name="Pickup"
                    className="form-control location"
                    placeholder="Enter your location"
                  />
                </div>
                <div className="form-group greybg mb-8">
                  <label className="control-label">Where to go</label>
                  <input
                    type="text"
                    name="Drop"
                    className="form-control destination"
                    placeholder="Enter your Destination"
                  />
                </div>
                <div className="row returnArrival">
                  <div className="col-sm-6">
                    <label className="control-label">Depart</label>
                    <div className="form-group greybg">
                      <input
                        type="date"
                        name="depart"
                        className="form-control"
                        placeholder="Depart"
                      />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <label className="control-label">Arrival</label>
                    <div className="form-group greybg">
                      <input
                        type="date"
                        name="arrival"
                        className="form-control"
                        placeholder="Arrival"
                      />
                    </div>
                  </div>
                </div>
                <div className="form-group searchCabs fullwidth">
                  <button className="btn btn-primary btn-block">
                    Search Cars
                  </button>
                </div>
              </div>
              <div className="locationPanel">
                <div className="panelHeader">
                  <button className="goBack">
                    <i className="fas fa-arrow-left" />
                  </button>
                  <h5>Enter pickup location</h5>
                </div>
                <div className="selectAddress">
                  <select
                    className="select-state"
                    placeholder="Pick a state..."
                  >
                    <option value="Andhra Pradesh">Pick a state...</option>
                    <option value="Andhra Pradesh">Andhra Pradesh</option>
                    <option value="Andaman and Nicobar Islands">
                      Andaman and Nicobar Islands
                    </option>
                    <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                    <option value="Assam">Assam</option>
                    <option value="Bihar">Bihar</option>
                    <option value="Chandigarh">Chandigarh</option>
                    <option value="Chhattisgarh">Chhattisgarh</option>
                    <option value="Dadar and Nagar Haveli">
                      Dadar and Nagar Haveli
                    </option>
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
                    name="searchArea"
                    defaultValue
                    placeholder="Tell us your starting point.."
                    className="startpoint form-control"
                  />
                </div>
                <div className="form-group fullwidth text-center">
                  <button className="btn btn-default">
                    Use Current Location
                  </button>
                </div>
              </div>
              <div className="destinationPanel">
                <div className="panelHeader">
                  <button className="goBack">
                    <i className="fas fa-arrow-left" />
                  </button>
                  <h5>Enter destination location</h5>
                </div>
                <div className="selectAddress">
                  <select
                    className="select-state"
                    placeholder="Pick a state..."
                  >
                    <option value="Andhra Pradesh">Pick a state...</option>
                    <option value="Andhra Pradesh">Andhra Pradesh</option>
                    <option value="Andaman and Nicobar Islands">
                      Andaman and Nicobar Islands
                    </option>
                    <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                    <option value="Assam">Assam</option>
                    <option value="Bihar">Bihar</option>
                    <option value="Chandigarh">Chandigarh</option>
                    <option value="Chhattisgarh">Chhattisgarh</option>
                    <option value="Dadar and Nagar Haveli">
                      Dadar and Nagar Haveli
                    </option>
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
                    name="searchArea"
                    defaultValue
                    placeholder="Tell us your starting point.."
                    className="startpoint form-control"
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  {/* END OF BANNER AND FORM */}
  {/* BENEFITS OF TRAVEL JET */}
  <div className="container">
    <div className="benefits">
      <h2>Benefits of Travel Jet</h2>
      <div className="row">
        <div className="col-sm-4">
          <div className="canalList">
            <div className="icons">
              <svg
                width={70}
                height={70}
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
              >
                <image
                  xlinkHref="frontend/image/icons/quote.svg"
                  height={70}
                  width={70}
                />
              </svg>
            </div>
            <div className="lists">
              <h5>Get your quote</h5>
              <p>
                Post your travel booking and get multiple quotes from agents
              </p>
            </div>
          </div>
        </div>
        <div className="col-sm-4">
          <div className="canalList">
            <div className="icons">
              <svg
                width={70}
                height={70}
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
              >
                <image
                  xlinkHref="frontend/image/icons/risk.svg"
                  height={70}
                  width={70}
                />
              </svg>
            </div>
            <div className="lists">
              <h5>Risk Free</h5>
              <p>We will refund your amount in case of any mishappening</p>
            </div>
          </div>
        </div>
        <div className="col-sm-4">
          <div className="canalList">
            <div className="icons">
              <svg
                width={70}
                height={70}
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
              >
                <image xlinkHref="frontend/image/icons/car.svg" height={70} width={70} />
              </svg>
            </div>
            <div className="lists">
              <h5>Budget Cabs</h5>
              <p>
                Now you can choose your budget cabs from the listing offered by
                us
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* TRAVEL JET WITH ALL YOUR NEEDS */}
  <div className="container-fluid">
    <div className="allneeds">
      <h2>Travel Jet with all your needs</h2>
      <div className="row">
        <div
          className="no-padding col-sm-3 col-xs-6 wow fadeIn animated animated animated"
          data-wow-delay="0.2s"
          style={{
            visibility: "visible",
            animationDelay: "0.2s",
            animationName: "fadeIn"
          }}
        >
          <div className="img_wrapper">
            <div className="img_container">
              <a href="#" className="scrollLink">
                <img src="frontend/image/airport.jpg" className="img-responsive" alt="img" />
                <div className="short_info">
                  <h3>Airport</h3>
                  <em>&nbsp;</em>
                </div>
              </a>
            </div>
          </div>
        </div>
        <div
          className="no-padding col-sm-3 col-xs-6 wow fadeIn animated animated animated"
          data-wow-delay="0.2s"
          style={{
            visibility: "visible",
            animationDelay: "0.2s",
            animationName: "fadeIn"
          }}
        >
          <div className="img_wrapper">
            <div className="img_container">
              <a href="#" className="scrollLink">
                <img
                  src="frontend/image/outstation.jpg"
                  className="img-responsive"
                  alt="img1"
                />
                <div className="short_info">
                  <h3>Outstation</h3>
                  <em>&nbsp;</em>
                </div>
              </a>
            </div>
          </div>
        </div>
        <div
          className="no-padding col-sm-3 col-xs-6 wow fadeIn animated animated animated"
          data-wow-delay="0.2s"
          style={{
            visibility: "visible",
            animationDelay: "0.2s",
            animationName: "fadeIn"
          }}
        >
          <div className="img_wrapper">
            <div className="img_container">
              <a href="#" className="scrollLink">
                <img
                  src="frontend/image/pilgrimage.jpg"
                  className="img-responsive"
                  alt="img2"
                />
                <div className="short_info">
                  <h3>Pilgrimage</h3>
                  <em>&nbsp;</em>
                </div>
              </a>
            </div>
          </div>
        </div>
        <div
          className="no-padding col-sm-3 col-xs-6 wow fadeIn animated animated animated"
          data-wow-delay="0.2s"
          style={{
            visibility: "visible",
            animationDelay: "0.2s",
            animationName: "fadeIn"
          }}
        >
          <div className="img_wrapper">
            <div className="img_container">
              <a href="#" className="scrollLink">
                <img src="frontend/image/roadtrip.jpg" className="img-responsive" alt="img3" />
                <div className="short_info">
                  <h3>Road trip</h3>
                  <em>&nbsp;</em>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* CARS AVAILABLE ON TRAVEL JET */}
  <div className="container">
    <div className="carsCollection">
      <div className="row">
        <div className="col-sm-6">
          <h3>Cars available on Travel Jet</h3>
          <p>Choose from the collection according to your budget</p>
        </div>
        <div className="col-sm-6">
          <ul className="nav nav-tabs">
            <li className="active">
              <a data-toggle="tab" href="#Hatchback">
                Hatchback
              </a>
            </li>
            <li>
              <a data-toggle="tab" href="#Sedan">
                Sedan
              </a>
            </li>
            <li>
              <a data-toggle="tab" href="#PrimeSedan">
                Prime Sedan
              </a>
            </li>
            <li>
              <a data-toggle="tab" href="#SUVs">
                SUVs
              </a>
            </li>
            <li>
              <a data-toggle="tab" href="#Luxury">
                Luxury
              </a>
            </li>
          </ul>
        </div>
      </div>
      <hr />
      <div className="tab-content">
        <div id="Hatchback" className="tab-pane fade in active show">
          <div
            id="carousel-example-generic"
            className="carousel slide"
            data-ride="carousel"
          >
            {/* Indicators */}
            <ol className="carousel-indicators">
              <li
                data-target="#carousel-example-generic"
                data-slide-to={0}
                className="active"
              />
              <li data-target="#carousel-example-generic" data-slide-to={1} />
              <li data-target="#carousel-example-generic" data-slide-to={2} />
            </ol>
            {/* Wrapper for slides */}
            <div className="carousel-inner" role="listbox">
              <div className="item active">
                <div className="row">
                  <div className="col-sm-6">
                    <div className="prime-sedan">
                      <img
                        src="frontend/image/maruti-swift.png"
                        className="img-responsive"
                        align="Swift Dzire"
                      />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="travel-jet">
                      <h4>Maruti Swift</h4>
                      <p>
                        AC Cab, Perfect Hatchback, 4 passangers + Driver, Boot
                        capacity of 2 big bags, Executive Ride, Qualified
                        Driver, Economy Friendly
                      </p>
                      <div className="text-left">
                        {" "}
                        <a href="#" className="btn btn-default">
                          Book Now
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="item">
                <div className="row">
                  <div className="col-sm-6">
                    <div className="prime-sedan">
                      <img
                        src="frontend/image/i10.png"
                        className="img-responsive"
                        align="Swift Dzire"
                      />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="travel-jet">
                      <h4>Grand i10</h4>
                      <p>
                        AC Cab, Perfect Hatchback, 4 passangers + Driver, Boot
                        capacity of 2 big bags, Executive Ride, Qualified
                        Driver, Economy Friendly
                      </p>
                      <div className="text-left">
                        <a href="#" className="btn btn-default">
                          Book Now
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="item">
                <div className="row">
                  <div className="col-sm-6">
                    <div className="prime-sedan">
                      <img
                        src="frontend/image/indica.png"
                        className="img-responsive"
                        align="Swift Dzire"
                      />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="travel-jet">
                      <h4>Indica Vista</h4>
                      <p>
                        AC Cab, Perfect Hatchback, 4 passangers + Driver, Boot
                        capacity of 2 big bags, Executive Ride, Qualified
                        Driver, Economy Friendly
                      </p>
                      <div className="text-left">
                        <a href="#" className="btn btn-default">
                          Book Now
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Controls */}
            <a
              className="left carousel-control"
              href="#carousel-example-generic"
              role="button"
              data-slide="prev"
            >
              <span className="fa fa-chevron-left" aria-hidden="true" />
              <span className="sr-only">Previous</span>
            </a>
            <a
              className="right carousel-control"
              href="#carousel-example-generic"
              role="button"
              data-slide="next"
            >
              <span className="fa fa-chevron-right" aria-hidden="true" />
              <span className="sr-only">Next</span>
            </a>
          </div>
        </div>
        <div id="Sedan" className="tab-pane fade">
          <div
            id="carousel-example-generic2"
            className="carousel slide"
            data-ride="carousel"
          >
            {/* Indicators */}
            <ol className="carousel-indicators">
              <li
                data-target="#carousel-example-generic2"
                data-slide-to={0}
                className="active"
              />
              <li data-target="#carousel-example-generic2" data-slide-to={1} />
              <li data-target="#carousel-example-generic2" data-slide-to={2} />
            </ol>
            {/* Wrapper for slides */}
            <div className="carousel-inner" role="listbox">
              <div className="item active">
                <div className="row">
                  <div className="col-sm-6">
                    <div className="prime-sedan">
                      <img
                        src="frontend/image/cars/dzire.jpg"
                        className="img-responsive"
                        alt="Swift Dzire"
                      />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="travel-jet">
                      <h4>Swift Dzire</h4>
                      <p>
                        AC Cab, Perfect Sedan, 4 passangers + Driver, Boot
                        capacity of 3 big bags, Executive Ride, Qualified
                        Driver, Economy Friendly
                      </p>
                      <div className="text-left">
                        {" "}
                        <a href="#" className="btn btn-default">
                          Book Now
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="item">
                <div className="row">
                  <div className="col-sm-6">
                    <div className="prime-sedan">
                      <img
                        src="frontend/image/cars/amaze.jpg"
                        className="img-responsive"
                        alt="Honda Amaze"
                      />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="travel-jet">
                      <h4>Honda Amaze</h4>
                      <p>
                        AC Cab, Perfect Sedan, 4 passangers + Driver, Boot
                        capacity of 3 big bags, Executive Ride, Qualified
                        Driver, Economy Friendly
                      </p>
                      <div className="text-left">
                        <a href="#" className="btn btn-default">
                          Book Now
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="item">
                <div className="row">
                  <div className="col-sm-6">
                    <div className="prime-sedan">
                      <img
                        src="frontend/image/cars/xcent.jpg"
                        className="img-responsive"
                        alt="Hyundai Xcent"
                      />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="travel-jet">
                      <h4>Hyundai Xcent</h4>
                      <p>
                        AC Cab, Perfect Sedan, 4 passangers + Driver, Boot
                        capacity of 3 big bags, Executive Ride, Qualified
                        Driver, Economy Friendly
                      </p>
                      <div className="text-left">
                        <a href="#" className="btn btn-default">
                          Book Now
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="item">
                <div className="row">
                  <div className="col-sm-6">
                    <div className="prime-sedan">
                      <img
                        src="frontend/image/cars/zest.jpg"
                        className="img-responsive"
                        alt="Hyundai Xcent"
                      />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="travel-jet">
                      <h4>Tata Zest</h4>
                      <p>
                        AC Cab, Perfect Sedan, 4 passangers + Driver, Boot
                        capacity of 3 big bags, Executive Ride, Qualified
                        Driver, Economy Friendly
                      </p>
                      <div className="text-left">
                        <a href="#" className="btn btn-default">
                          Book Now
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Controls */}
            <a
              className="left carousel-control"
              href="#carousel-example-generic2"
              role="button"
              data-slide="prev"
            >
              <span className="fa fa-chevron-left" aria-hidden="true" />
              <span className="sr-only">Previous</span>
            </a>
            <a
              className="right carousel-control"
              href="#carousel-example-generic2"
              role="button"
              data-slide="next"
            >
              <span className="fa fa-chevron-right" aria-hidden="true" />
              <span className="sr-only">Next</span>
            </a>
          </div>
        </div>
        <div id="PrimeSedan" className="tab-pane fade">
          <div
            id="carousel-example-generic3"
            className="carousel slide"
            data-ride="carousel"
          >
            {/* Indicators */}
            <ol className="carousel-indicators">
              <li
                data-target="#carousel-example-generic3"
                data-slide-to={0}
                className="active"
              />
              <li data-target="#carousel-example-generic3" data-slide-to={1} />
              <li data-target="#carousel-example-generic3" data-slide-to={2} />
            </ol>
            {/* Wrapper for slides */}
            <div className="carousel-inner" role="listbox">
              <div className="item active">
                <div className="row">
                  <div className="col-sm-6">
                    <div className="prime-sedan">
                      <img
                        src="frontend/image/cars/city.jpg"
                        className="img-responsive"
                        alt="Honda City"
                      />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="travel-jet">
                      <h4>Honda City</h4>
                      <p>
                        AC Cab, Perfect Sedan, 4 passangers + Driver, Boot
                        capacity of 3 big bags, Luxirious Ride, Qualified
                        Driver, Economy Friendly
                      </p>
                      <div className="text-left">
                        {" "}
                        <a href="#" className="btn btn-default">
                          Book Now
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="item">
                <div className="row">
                  <div className="col-sm-6">
                    <div className="prime-sedan">
                      <img
                        src="frontend/image/cars/camry.jpg"
                        className="img-responsive"
                        alt="Toyota Camry"
                      />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="travel-jet">
                      <h4>Toyota Camry</h4>
                      <p>
                        AC Cab, Perfect Sedan, 4 passangers + Driver, Boot
                        capacity of 3 big bags, Luxirious Ride, Qualified
                        Driver, Economy Friendly
                      </p>
                      <div className="text-left">
                        <a href="#" className="btn btn-default">
                          Book Now
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="item">
                <div className="row">
                  <div className="col-sm-6">
                    <div className="prime-sedan">
                      <img
                        src="frontend/image/cars/ciaz.jpg"
                        className="img-responsive"
                        alt="Maruti Ciaz"
                      />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="travel-jet">
                      <h4>Maruti Ciaz</h4>
                      <p>
                        AC Cab, Perfect Sedan, 4 passangers + Driver, Boot
                        capacity of 3 big bags, Luxirious Ride, Qualified
                        Driver, Economy Friendly
                      </p>
                      <div className="text-left">
                        <a href="#" className="btn btn-default">
                          Book Now
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="item">
                <div className="row">
                  <div className="col-sm-6">
                    <div className="prime-sedan">
                      <img
                        src="frontend/image/cars/verna.jpg"
                        className="img-responsive"
                        alt="Hyundai Verna"
                      />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="travel-jet">
                      <h4>Hyundai Verna</h4>
                      <p>
                        AC Cab, Perfect Sedan, 4 passangers + Driver, Boot
                        capacity of 3 big bags, Luxirious Ride, Qualified
                        Driver, Economy Friendly
                      </p>
                      <div className="text-left">
                        <a href="#" className="btn btn-default">
                          Book Now
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Controls */}
            <a
              className="left carousel-control"
              href="#carousel-example-generic3"
              role="button"
              data-slide="prev"
            >
              <span className="fa fa-chevron-left" aria-hidden="true" />
              <span className="sr-only">Previous</span>
            </a>
            <a
              className="right carousel-control"
              href="#carousel-example-generic3"
              role="button"
              data-slide="next"
            >
              <span className="fa fa-chevron-right" aria-hidden="true" />
              <span className="sr-only">Next</span>
            </a>
          </div>
        </div>
        <div id="SUVs" className="tab-pane fade">
          <div
            id="carousel-example-generic4"
            className="carousel slide"
            data-ride="carousel"
          >
            {/* Indicators */}
            <ol className="carousel-indicators">
              <li
                data-target="#carousel-example-generic4"
                data-slide-to={0}
                className="active"
              />
              <li data-target="#carousel-example-generic4" data-slide-to={1} />
              <li data-target="#carousel-example-generic4" data-slide-to={2} />
            </ol>
            {/* Wrapper for slides */}
            <div className="carousel-inner" role="listbox">
              <div className="item active">
                <div className="row">
                  <div className="col-sm-6">
                    <div className="prime-sedan">
                      <img
                        src="frontend/image/cars/innova.jpg"
                        className="img-responsive"
                        alt="Toyota Innova"
                      />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="travel-jet">
                      <h4>Toyota Innova</h4>
                      <p>
                        AC Cab, Big Suv, 6 passangers + Driver, Boot capacity of
                        4 big bags, Luxirious Ride, Qualified Driver
                      </p>
                      <div className="text-left">
                        {" "}
                        <a href="#" className="btn btn-default">
                          Book Now
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="item">
                <div className="row">
                  <div className="col-sm-6">
                    <div className="prime-sedan">
                      <img
                        src="frontend/image/cars/crysta.jpg"
                        className="img-responsive"
                        alt="Toyota Innova Crysta"
                      />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="travel-jet">
                      <h4>Toyota Innova Crysta</h4>
                      <p>
                        AC Cab, Big Suv, 6 passangers + Driver, Boot capacity of
                        4 big bags, Luxirious Ride, Qualified Driver
                      </p>
                      <div className="text-left">
                        <a href="#" className="btn btn-default">
                          Book Now
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="item">
                <div className="row">
                  <div className="col-sm-6">
                    <div className="prime-sedan">
                      <img
                        src="frontend/image/cars/xuv.jpg"
                        className="img-responsive"
                        alt="XUV 500"
                      />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="travel-jet">
                      <h4>XUV 500</h4>
                      <p>
                        AC Cab, Big Suv, 6 passangers + Driver, Boot capacity of
                        4 big bags, Luxirious Ride, Qualified Driver
                      </p>
                      <div className="text-left">
                        <a href="#" className="btn btn-default">
                          Book Now
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="item">
                <div className="row">
                  <div className="col-sm-6">
                    <div className="prime-sedan">
                      <img
                        src="frontend/image/cars/ertiga.jpg"
                        className="img-responsive"
                        alt="Maruti Suzuki Ertiga"
                      />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="travel-jet">
                      <h4>Maruti Suzuki Ertiga</h4>
                      <p>
                        AC Cab, Big Suv, 6 passangers + Driver, Boot capacity of
                        4 big bags, Luxirious Ride, Qualified Driver
                      </p>
                      <div className="text-left">
                        <a href="#" className="btn btn-default">
                          Book Now
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Controls */}
            <a
              className="left carousel-control"
              href="#carousel-example-generic4"
              role="button"
              data-slide="prev"
            >
              <span className="fa fa-chevron-left" aria-hidden="true" />
              <span className="sr-only">Previous</span>
            </a>
            <a
              className="right carousel-control"
              href="#carousel-example-generic4"
              role="button"
              data-slide="next"
            >
              <span className="fa fa-chevron-right" aria-hidden="true" />
              <span className="sr-only">Next</span>
            </a>
          </div>
        </div>
        <div id="Luxury" className="tab-pane fade">
          <div
            id="carousel-example-generic5"
            className="carousel slide"
            data-ride="carousel"
          >
            {/* Indicators */}
            <ol className="carousel-indicators">
              <li
                data-target="#carousel-example-generic5"
                data-slide-to={0}
                className="active"
              />
              <li data-target="#carousel-example-generic5" data-slide-to={1} />
              <li data-target="#carousel-example-generic5" data-slide-to={2} />
            </ol>
            {/* Wrapper for slides */}
            <div className="carousel-inner" role="listbox">
              <div className="item active">
                <div className="row">
                  <div className="col-sm-6">
                    <div className="prime-sedan">
                      <img
                        src="frontend/image/cars/audi.jpg"
                        className="img-responsive"
                        alt="Audi A3"
                      />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="travel-jet">
                      <h4>Audi A3</h4>
                      <p>
                        AC Cab, Big Sedan, 4 passangers + Driver, Boot capacity
                        of 4 big bags, Super Luxirious Ride, Qualified Driver,
                        Extra Leg Room
                      </p>
                      <div className="text-left">
                        {" "}
                        <a href="#" className="btn btn-default">
                          Book Now
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="item">
                <div className="row">
                  <div className="col-sm-6">
                    <div className="prime-sedan">
                      <img
                        src="frontend/image/cars/mercedes.jpg"
                        className="img-responsive"
                        alt="Mercedes C200"
                      />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="travel-jet">
                      <h4>Mercedes C200</h4>
                      <p>
                        AC Cab, Big Sedan, 4 passangers + Driver, Boot capacity
                        of 4 big bags, Super Luxirious Ride, Qualified Driver,
                        Extra Leg Room
                      </p>
                      <div className="text-left">
                        <a href="#" className="btn btn-default">
                          Book Now
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="item">
                <div className="row">
                  <div className="col-sm-6">
                    <div className="prime-sedan">
                      <img
                        src="frontend/image/cars/bmw.jpg"
                        className="img-responsive"
                        alt="BMW 3 Series"
                      />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="travel-jet">
                      <h4>BMW 3 Series</h4>
                      <p>
                        AC Cab, Big Sedan, 4 passangers + Driver, Boot capacity
                        of 4 big bags, Super Luxirious Ride, Qualified Driver,
                        Extra Leg Room
                      </p>
                      <div className="text-left">
                        <a href="#" className="btn btn-default">
                          Book Now
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Controls */}
            <a
              className="left carousel-control"
              href="#carousel-example-generic5"
              role="button"
              data-slide="prev"
            >
              <span className="fa fa-chevron-left" aria-hidden="true" />
              <span className="sr-only">Previous</span>
            </a>
            <a
              className="right carousel-control"
              href="#carousel-example-generic5"
              role="button"
              data-slide="next"
            >
              <span className="fa fa-chevron-right" aria-hidden="true" />
              <span className="sr-only">Next</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* HOW TRAVEL JET WORKS*/}
  <div className="container">
    <div className="howWorks">
      <h4>How Travel Jet Works</h4>
      <div className="col-sm-4">
        <div className="workBox">
          <div className="canalList">
            <div className="icons">
              <svg
                width={70}
                height={70}
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
              >
                <image
                  xlinkHref="frontend/image/icons/booking.svg"
                  height={70}
                  width={70}
                />
              </svg>
            </div>
            <div className="lists">
              <h5>Submit your booking</h5>
            </div>
          </div>
        </div>
      </div>
      <div className="col-sm-4">
        <div className="workBox">
          <div className="canalList">
            <div className="icons">
              <svg
                width={70}
                height={70}
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
              >
                <image
                  xlinkHref="frontend/image/icons/quotation.svg"
                  height={70}
                  width={70}
                />
              </svg>
            </div>
            <div className="lists">
              <h5>Get quotation from agents</h5>
            </div>
          </div>
        </div>
      </div>
      <div className="col-sm-4">
        <div className="workBox">
          <div className="canalList">
            <div className="icons">
              <svg
                width={55}
                height={55}
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
              >
                <image
                  xlinkHref="frontend/image/icons/telephone.svg"
                  height={55}
                  width={55}
                />
              </svg>
            </div>
            <div className="lists">
              <h5>Choose agents who offers best deals</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/*END*/}
  {/*CLIENTS TESTIMONIALS*/}
  <div className="Client-testimonial">
    <div className="container content">
      <h5>What our Customers says about us</h5>
      <div
        id="carousel-example-generic6"
        className="carousel slide"
        data-ride="carousel"
      >
        {/* Indicators */}
        <ol className="carousel-indicators">
          <li
            data-target="#carousel-example-generic6"
            data-slide-to={0}
            className="active"
          />
          <li data-target="#carousel-example-generic6" data-slide-to={1} />
          <li data-target="#carousel-example-generic6" data-slide-to={2} />
        </ol>
        {/* Wrapper for slides */}
        <div className="carousel-inner">
          <div className="item active">
            <div className="row">
              <div className="col-sm-6">
                <div className="adjust1">
                  <div className="col-md-2 col-sm-2 col-xs-12">
                    {" "}
                    <img
                      className="media-object img-circle img-responsive"
                      src="frontend/image/john-doe.png"
                      alt="client"
                    />{" "}
                  </div>
                  <div className="col-md-10 col-sm-10 col-xs-12">
                    <div className="caption">
                      <div className="customer-name">John Doe</div>
                      <p>
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum has been the
                        industry's standard dummy text ever since the 1500s,
                        when an unknown printer took a galley of type and
                        scrambled it to make a type specimen book. It has
                        survived not only five centuries, but also the leap into
                        electronic typesetting, remaining essentially unchanged.
                        It was popularised in the 1960s with the release of
                        Letraset sheets containing Lorem Ipsum passages, and
                        more recently with desktop publishing software like
                        Aldus PageMaker including versions of Lorem Ipsum.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-6">
                <div className="adjust1">
                  <div className="col-md-2 col-sm-2 col-xs-12">
                    {" "}
                    <img
                      className="media-object img-circle img-responsive"
                      src="frontend/image/james-herbert.png"
                    />{" "}
                  </div>
                  <div className="col-md-10 col-sm-10 col-xs-12">
                    <div className="caption">
                      <div className="customer-name">Mr James Herbert</div>
                      <p>
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum has been the
                        industry's standard dummy text ever since the 1500s,
                        when an unknown printer took a galley of type and
                        scrambled it to make a type specimen book. It has
                        survived not only five centuries, but also the leap into
                        electronic typesetting, remaining essentially unchanged.
                        It was popularised in the 1960s with the release of
                        Letraset sheets containing Lorem Ipsum passages, and
                        more recently with desktop publishing software like
                        Aldus PageMaker including versions of Lorem Ipsum.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="item">
            <div className="row">
              <div className="col-sm-6">
                <div className="adjust1">
                  <div className="col-md-2 col-sm-2 col-xs-12">
                    {" "}
                    <img
                      className="media-object img-circle img-responsive"
                      src="frontend/image/john-doe.png"
                      alt="client"
                    />{" "}
                  </div>
                  <div className="col-md-10 col-sm-10 col-xs-12">
                    <div className="caption">
                      <div className="customer-name">John Doe</div>
                      <p>
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum has been the
                        industry's standard dummy text ever since the 1500s,
                        when an unknown printer took a galley of type and
                        scrambled it to make a type specimen book. It has
                        survived not only five centuries, but also the leap into
                        electronic typesetting, remaining essentially unchanged.
                        It was popularised in the 1960s with the release of
                        Letraset sheets containing Lorem Ipsum passages, and
                        more recently with desktop publishing software like
                        Aldus PageMaker including versions of Lorem Ipsum.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-6">
                <div className="adjust1">
                  <div className="col-md-2 col-sm-2 col-xs-12">
                    {" "}
                    <img
                      className="media-object img-circle img-responsive"
                      src="frontend/image/james-herbert.png"
                    />{" "}
                  </div>
                  <div className="col-md-10 col-sm-10 col-xs-12">
                    <div className="caption">
                      <div className="customer-name">Mr James Herbert</div>
                      <p>
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum has been the
                        industry's standard dummy text ever since the 1500s,
                        when an unknown printer took a galley of type and
                        scrambled it to make a type specimen book. It has
                        survived not only five centuries, but also the leap into
                        electronic typesetting, remaining essentially unchanged.
                        It was popularised in the 1960s with the release of
                        Letraset sheets containing Lorem Ipsum passages, and
                        more recently with desktop publishing software like
                        Aldus PageMaker including versions of Lorem Ipsum.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="item">
            <div className="row">
              <div className="col-sm-6">
                <div className="adjust1">
                  <div className="col-md-2 col-sm-2 col-xs-12">
                    {" "}
                    <img
                      className="media-object img-circle img-responsive"
                      src="frontend/image/john-doe.png"
                      alt="client"
                    />{" "}
                  </div>
                  <div className="col-md-10 col-sm-10 col-xs-12">
                    <div className="caption">
                      <div className="customer-name">John Doe</div>
                      <p>
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum has been the
                        industry's standard dummy text ever since the 1500s,
                        when an unknown printer took a galley of type and
                        scrambled it to make a type specimen book. It has
                        survived not only five centuries, but also the leap into
                        electronic typesetting, remaining essentially unchanged.
                        It was popularised in the 1960s with the release of
                        Letraset sheets containing Lorem Ipsum passages, and
                        more recently with desktop publishing software like
                        Aldus PageMaker including versions of Lorem Ipsum.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-6">
                <div className="adjust1">
                  <div className="col-md-2 col-sm-2 col-xs-12">
                    {" "}
                    <img
                      className="media-object img-circle img-responsive"
                      src="frontend/image/james-herbert.png"
                    />{" "}
                  </div>
                  <div className="col-md-10 col-sm-10 col-xs-12">
                    <div className="caption">
                      <div className="customer-name">Mr James Herbert</div>
                      <p>
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum has been the
                        industry's standard dummy text ever since the 1500s,
                        when an unknown printer took a galley of type and
                        scrambled it to make a type specimen book. It has
                        survived not only five centuries, but also the leap into
                        electronic typesetting, remaining essentially unchanged.
                        It was popularised in the 1960s with the release of
                        Letraset sheets containing Lorem Ipsum passages, and
                        more recently with desktop publishing software like
                        Aldus PageMaker including versions of Lorem Ipsum.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Controls */}
        <a
          className="left carousel-control"
          href="#carousel-example-generic6"
          role="button"
          data-slide="prev"
        >
          <span className="fa fa-chevron-left" aria-hidden="true" />
          <span className="sr-only">Previous</span>
        </a>
        <a
          className="right carousel-control"
          href="#carousel-example-generic6"
          role="button"
          data-slide="next"
        >
          <span className="fa fa-chevron-right" aria-hidden="true" />
          <span className="sr-only">Next</span>
        </a>
      </div>
    </div>
  </div>
  {/*END*/}
  {/* CUSTOMER SUPPORT*/}
  <div className="customer-support">
    <div className="container">
      <div className="col-sm-4">
        <div className="canalList">
          <div className="icons">
            <svg
              width={50}
              height={50}
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
            >
              <image
                xlinkHref="frontend/image/icons/traveljet-support.svg"
                height={50}
                width={50}
              />
            </svg>
          </div>
          <div className="lists">
            <h5>24/7 Customer Support</h5>
            <p>
              A dedicated 24x7 customer support team always at your service to
              help solve any problem
            </p>
          </div>
        </div>
      </div>
      <div className="col-sm-4">
        <div className="canalList">
          <div className="icons">
            <svg
              width={50}
              height={50}
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
            >
              <image
                xlinkHref="frontend/image/icons/traveljet_out_succour.svg"
                height={50}
                width={50}
              />
            </svg>
          </div>
          <div className="lists">
            <h5>Your Safety First</h5>
            <p>
              Keep your loved ones informed about your travel routes or call
              emergency services when in need
            </p>
          </div>
        </div>
      </div>
      <div className="col-sm-4">
        <div className="canalList">
          <div className="icons">
            <svg
              width={50}
              height={50}
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
            >
              <image
                xlinkHref="frontend/image/icons/traveljet-best-driver.svg"
                height={50}
                width={50}
              />
            </svg>
          </div>
          <div className="lists">
            <h5>Top Rated Driver-Partners</h5>
            <p>
              All our driver-partners are background verified and trained to
              deliver only the best experience
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/*END*/}
</div>

    );
}

export default Home;