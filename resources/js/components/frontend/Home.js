import React from 'react';
import ReactDOM from 'react-dom';

import { useState, useEffect } from 'react'

function Home() {


  const [trip_type, setTrip_type] = useState('');
  const [error, setError] = useState('');


  const handleChange = (event) => {
    setTrip_type(event.target.value);
  }

  const bookNow = (event) => {
    event.preventDefault();
    if (trip_type == '') {
      setError('Please select Trip Type!');
      return;
    }
    alert(trip_type);
    if (trip_type == 1) {
      window.location.href = "/bookingtrip";
    }else{
      window.location.href = "/bookingroundtrip";
    }
  }


    return (
      <div>
  {/* BANNER */}
  <div className="banner">
    <div className="container">
        <h1>Book your Cars for Airport, Outstation and Weekend Rides</h1>
        <p className="bestDeals">Now available at affordable rates, choose your best deals from multiple agents</p>
        <div className="row">
          {/* FORM */}
          <div className="col-sm-4">
            <div className="bookForm form-inline">
              <span className="type">Choose your booking type</span>
              <div className="triptypeselect">
                <div className="div-check onewaytrip">
                  <input className="form-check-input" onClick={handleChange} defaultValue={1} type="radio" name="trip_type" />
                  <label className="form-check-label" htmlFor="exampleRadios1">
                    One Way Trip
                  </label>
                </div>
                <div className="div-check roundtrip">
                  <input className="form-check-input" onClick={handleChange} defaultValue={2} type="radio" name="trip_type" />
                  <label className="form-check-label" htmlFor="exampleRadios2">
                    Round Trip with Sightseeing
                  </label>
                </div>
                <div style={{color:'red'}}>
                {error && error}
                </div>
              </div>              
              <div className="form-group searchCabs fullwidth">
                <button onClick={bookNow} className="btn btn-primary btn-block click">Book Now</button>
              </div>
            </div>
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