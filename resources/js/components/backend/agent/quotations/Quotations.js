import React, { Component } from 'react';
import {BrowserRouter as Router, Link, Route, Redirect} from 'react-router-dom';

import axios from 'axios';
import Pagination from "react-js-pagination";

export default class Quotations extends Component {
	render() {
		return (
           <div>
  <div className="quotation-page">
    {/* Page Heading */}
    <h1>Quotation</h1>
    <table className="table table-bordered booking">
      <thead className="thead-primary">
        <tr>
          <th scope="col">Date</th>
          <th scope="col">My Booking</th>
          <th scope="col" />
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>22-June-20</td>
          <td>Booking for Delhi to Manali</td>
          <td className="iconview">
            <a href="#"><i className="fa fa-eye" /></a>
            <a href="#"><i className="fa fa-pencil" /></a>
            <a href="#"><i className="fa fa-trash" /></a>
          </td>
          <td><a href="#" className="btn btn-default btn_click">View Quotation</a></td>
        </tr>
        <tr>
          <td>22-June-20</td>
          <td>Booking for Delhi to Manali</td>
          <td className="iconview">
            <a href="#"><i className="fa fa-eye" /></a>
            <a href="#"><i className="fa fa-pencil" /></a>
            <a href="#"><i className="fa fa-trash" /></a>
          </td>
          <td><a href="#" className="btn btn-default btn_click">View Quotation</a></td>
        </tr>
      </tbody>
    </table>
  </div>
  <div className="viewquotation">
    <h3>Booking for Delhi to Manali</h3>
    <div className="wt-userlistinghold wt-featured">
      <div className="wt-rightarea">
        <i className="fa fa-inr" /> 9999
      </div>
      <div className="bookid">
        <span>Booking id : 0000000</span>
        <a href="#">View/Edit Booking</a> | <a href="#">Reactivate</a>
      </div>
      <div className="roundtrip">Quotes for round trip Delhi to Himachal (3N / 4D)</div>
      <figure className="wt-userlistingimg">
        <img src="/frontend/image/icons/chat-profile.png" alt="image description" />
      </figure>
      <div className="wt-userlistingcontent">
        <div className="wt-contenthead">
          <div className="wt-title">
            <a href="bookingprofile.php"> Lorem Ipsum 
              <div className="rating">
                <div className="reviews-profile">
                  <span className="heading">0.0</span>
                  <span className="fa fa-star checked" />
                  <span className="fa fa-star checked" />
                  <span className="fa fa-star checked" />
                  <span className="fa fa-star checked" />
                  <span className="fa fa-star" />
                </div>
              </div>
            </a>
            <h2>507 trips sold | <a href>172 Superb Reviews</a></h2>
          </div>
          <ul className="wt-userlisting-breadcrumb">
            <li><span><a href="#" className="btn btn-primary">Award Booking</a></span></li>
            <li><span> <a href="#" className="btn btn-default chatbtn">Chat Now</a></span></li>
          </ul>
        </div>
      </div>
      <div className="clearfix" />
      <div id="exTab1">
        <ul className="nav nav-pills">
          <li className="active"> <a href="#1a" data-toggle="tab"><i className="fa fa-inr" /> 4100/-
              <br />
              <span>Total Cost</span><br />
              <span><b>Avishek K.</b></span>
            </a> </li>
          <li><a href="#2a" data-toggle="tab"><i className="fa fa-inr" /> 4100/-
              <br />
              <span>Total Cost</span><br />
              <span><b>Avishek K.</b></span>
            </a> </li>
          <li><a href="#3a" data-toggle="tab"><i className="fa fa-inr" /> 4100/-
              <br />
              <span>Total Cost</span><br />
              <span><b>Avishek K.</b></span>
            </a> </li>
          <li><a href="#4a" data-toggle="tab"><i className="fa fa-inr" /> 4100/-
              <br />
              <span>Total Cost</span><br />
              <span><b>Avishek K.</b></span>
            </a> </li>
        </ul>
        <div className="tab-content clearfix">
          <div className="tab-pane active" id="1a">
            <div className="wt-description">
              <table className="table">
                <thead className="thead-dark">
                  <tr>
                    <th scope="col">Booking Details</th>
                    <th scope="col">Trip Route</th>
                    <th scope="col">Inclusion/Exclusion</th>
                    <th scope="col">Cab Details</th>
                  </tr>
                </thead>
                <tbody className="bookbody">
                  <tr>
                    <td className="bookdetail">Booking Details</td>
                    <td />
                    <td />
                    <td className="edit"><a href="#">Edit Booking</a></td>
                  </tr>
                  <tr>
                    <td>Booking Type</td>
                    <td>Round trip</td>
                    <td />
                    <td />
                  </tr>
                  <tr>
                    <td>Destination Covered</td>
                    <td>Himachal</td>
                    <td />
                    <td />
                  </tr>
                  <tr>
                    <td>Date</td>
                    <td>27/03/2020</td>
                    <td />
                    <td />
                  </tr>
                  <tr>
                    <td>Time</td>
                    <td>02:00 PM</td>
                    <td />
                    <td />
                  </tr>
                  <tr>
                    <td>Number of Person</td>
                    <td>2 Adults + 3 child</td>
                    <td />
                    <td />
                  </tr>
                  <tr>
                    <td>Type of Vehicle</td>
                    <td>Hatchback</td>
                    <td />
                    <td />
                  </tr>
                  <tr>
                    <td>Budget</td>
                    <td>3000 - 5500</td>
                    <td />
                    <td />
                  </tr>
                </tbody>
              </table>
              <div className="clearfix" />
              <div className="triproute">
                <div className="row">
                  <div className="col-sm-6">
                    <div className="bookdetail">Trip Route <a href="#">View Google Map</a></div>
                  </div>
                  <div className="col-sm-6">
                    <div className="edit"><a href="#">Edit Booking</a></div>
                  </div>
                </div>
                <div className="vendor">Need changes? Chat with vendor</div>
                <div className="booktrip">Booking for round trip 3Night &amp; 4Days Delhi to Himachal.</div>
                <div className="location">
                  <div className="wizard-inner">
                    <div className="connecting-line" />
                    <ul className="nav nav-tabs">
                      <li className="active">
                        <a href="#">
                        </a>
                      </li>
                      <li className="active">
                        <a href="#">
                        </a>
                      </li>
                      <li className="active">
                        <a href="#">
                        </a>
                      </li>
                      <li className="active">
                        <a href="#">
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <ul className="list-inline triplocation">
                  <li>Delhi</li>
                  <li>Shimla</li>
                  <li>Manali</li>
                  <li>Delhi</li>
                </ul>
              </div>
              <div className="clearfix" />
              <div className="triproute inclusion">
                <div className="row">
                  <div className="col-sm-12">
                    <div className="bookdetail">Inclusion Exclusions</div>
                  </div>
                </div>
                <div className="row">
                  <div className="vendor col-sm-3">State Tax, Toll Tax Driver allowance Taxes</div>
                  <div className="booktrip col-sm-5">
                    Parking<br />
                    Night time allowance (11:00 PM to 06:00 AM)
                    <br />
                    Additional place/destination visit
                    Any type of Permits and Entrance fees 
                  </div>
                </div>
              </div>
              <div className="clearfix" />
              <table className="table cabdetail">
                <tbody className="bookbody">
                  <tr>
                    <td className="bookdetail">Cab Details</td>
                    <td />
                    <td />
                    <td />
                  </tr>
                  <tr>
                    <td>Cab Type</td>
                    <td>Hatchback</td>
                    <td />
                    <td />
                  </tr>
                  <tr>
                    <td>Cab Model</td>
                    <td>Dezire</td>
                    <td />
                    <td />
                  </tr>
                  <tr>
                    <td>Sitting Capacity</td>
                    <td>4</td>
                    <td />
                    <td />
                  </tr>
                  <tr>
                    <td>Luggage Space</td>
                    <td>2 Small Bags</td>
                    <td />
                    <td />
                  </tr>
                </tbody>
              </table>
            </div> 
          </div>
          <div className="tab-pane" id="2a">
            <div className="wt-description">
              <table className="table">
                <thead className="thead-dark">
                  <tr>
                    <th scope="col">Booking Details</th>
                    <th scope="col">Trip Route</th>
                    <th scope="col">Inclusion/Exclusion</th>
                    <th scope="col">Cab Details</th>
                  </tr>
                </thead>
                <tbody className="bookbody">
                  <tr>
                    <td className="bookdetail">Booking Details</td>
                    <td />
                    <td />
                    <td className="edit"><a href="#">Edit Booking</a></td>
                  </tr>
                  <tr>
                    <td>Booking Type</td>
                    <td>Round trip</td>
                    <td />
                    <td />
                  </tr>
                  <tr>
                    <td>Destination Covered</td>
                    <td>Himachal</td>
                    <td />
                    <td />
                  </tr>
                  <tr>
                    <td>Date</td>
                    <td>27/03/2020</td>
                    <td />
                    <td />
                  </tr>
                  <tr>
                    <td>Time</td>
                    <td>02:00 PM</td>
                    <td />
                    <td />
                  </tr>
                  <tr>
                    <td>Number of Person</td>
                    <td>2 Adults + 3 child</td>
                    <td />
                    <td />
                  </tr>
                  <tr>
                    <td>Type of Vehicle</td>
                    <td>Hatchback</td>
                    <td />
                    <td />
                  </tr>
                  <tr>
                    <td>Budget</td>
                    <td>3000 - 5500</td>
                    <td />
                    <td />
                  </tr>
                </tbody>
              </table>
              <div className="clearfix" />
              <div className="triproute">
                <div className="row">
                  <div className="col-sm-6">
                    <div className="bookdetail">Trip Route <a href="#">View Google Map</a></div>
                  </div>
                  <div className="col-sm-6">
                    <div className="edit"><a href="#">Edit Booking</a></div>
                  </div>
                </div>
                <div className="vendor">Need changes? Chat with vendor</div>
                <div className="booktrip">Booking for round trip 3Night &amp; 4Days Delhi to Himachal.</div>
                <div className="location">
                  <div className="wizard-inner">
                    <div className="connecting-line" />
                    <ul className="nav nav-tabs">
                      <li className="active">
                        <a href="#">
                        </a>
                      </li>
                      <li className="active">
                        <a href="#">
                        </a>
                      </li>
                      <li className="active">
                        <a href="#">
                        </a>
                      </li>
                      <li className="active">
                        <a href="#">
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <ul className="list-inline triplocation">
                  <li>Delhi</li>
                  <li>Shimla</li>
                  <li>Manali</li>
                  <li>Delhi</li>
                </ul>
              </div>
              <div className="clearfix" />
              <div className="triproute inclusion">
                <div className="row">
                  <div className="col-sm-12">
                    <div className="bookdetail">Inclusion Exclusions</div>
                  </div>
                </div>
                <div className="row">
                  <div className="vendor col-sm-3">State Tax, Toll Tax Driver allowance Taxes</div>
                  <div className="booktrip col-sm-5">
                    Parking<br />
                    Night time allowance (11:00 PM to 06:00 AM)
                    <br />
                    Additional place/destination visit
                    Any type of Permits and Entrance fees 
                  </div>
                </div>
              </div>
              <div className="clearfix" />
              <table className="table cabdetail">
                <tbody className="bookbody">
                  <tr>
                    <td className="bookdetail">Cab Details</td>
                    <td />
                    <td />
                    <td />
                  </tr>
                  <tr>
                    <td>Cab Type</td>
                    <td>Hatchback</td>
                    <td />
                    <td />
                  </tr>
                  <tr>
                    <td>Cab Model</td>
                    <td>Dezire</td>
                    <td />
                    <td />
                  </tr>
                  <tr>
                    <td>Sitting Capacity</td>
                    <td>4</td>
                    <td />
                    <td />
                  </tr>
                  <tr>
                    <td>Luggage Space</td>
                    <td>2 Small Bags</td>
                    <td />
                    <td />
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="tab-pane" id="3a">
            <div className="wt-description">
              <table className="table">
                <thead className="thead-dark">
                  <tr>
                    <th scope="col">Booking Details</th>
                    <th scope="col">Trip Route</th>
                    <th scope="col">Inclusion/Exclusion</th>
                    <th scope="col">Cab Details</th>
                  </tr>
                </thead>
                <tbody className="bookbody">
                  <tr>
                    <td className="bookdetail">Booking Details</td>
                    <td />
                    <td />
                    <td className="edit"><a href="#">Edit Booking</a></td>
                  </tr>
                  <tr>
                    <td>Booking Type</td>
                    <td>Round trip</td>
                    <td />
                    <td />
                  </tr>
                  <tr>
                    <td>Destination Covered</td>
                    <td>Himachal</td>
                    <td />
                    <td />
                  </tr>
                  <tr>
                    <td>Date</td>
                    <td>27/03/2020</td>
                    <td />
                    <td />
                  </tr>
                  <tr>
                    <td>Time</td>
                    <td>02:00 PM</td>
                    <td />
                    <td />
                  </tr>
                  <tr>
                    <td>Number of Person</td>
                    <td>2 Adults + 3 child</td>
                    <td />
                    <td />
                  </tr>
                  <tr>
                    <td>Type of Vehicle</td>
                    <td>Hatchback</td>
                    <td />
                    <td />
                  </tr>
                  <tr>
                    <td>Budget</td>
                    <td>3000 - 5500</td>
                    <td />
                    <td />
                  </tr>
                </tbody>
              </table>
              <div className="clearfix" />
              <div className="triproute">
                <div className="row">
                  <div className="col-sm-6">
                    <div className="bookdetail">Trip Route <a href="#">View Google Map</a></div>
                  </div>
                  <div className="col-sm-6">
                    <div className="edit"><a href="#">Edit Booking</a></div>
                  </div>
                </div>
                <div className="vendor">Need changes? Chat with vendor</div>
                <div className="booktrip">Booking for round trip 3Night &amp; 4Days Delhi to Himachal.</div>
                <div className="location">
                  <div className="wizard-inner">
                    <div className="connecting-line" />
                    <ul className="nav nav-tabs">
                      <li className="active">
                        <a href="#">
                        </a>
                      </li>
                      <li className="active">
                        <a href="#">
                        </a>
                      </li>
                      <li className="active">
                        <a href="#">
                        </a>
                      </li>
                      <li className="active">
                        <a href="#">
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <ul className="list-inline triplocation">
                  <li>Delhi</li>
                  <li>Shimla</li>
                  <li>Manali</li>
                  <li>Delhi</li>
                </ul>
              </div>
              <div className="clearfix" />
              <div className="triproute inclusion">
                <div className="row">
                  <div className="col-sm-12">
                    <div className="bookdetail">Inclusion Exclusions</div>
                  </div>
                </div>
                <div className="row">
                  <div className="vendor col-sm-3">State Tax, Toll Tax Driver allowance Taxes</div>
                  <div className="booktrip col-sm-5">
                    Parking<br />
                    Night time allowance (11:00 PM to 06:00 AM)
                    <br />
                    Additional place/destination visit
                    Any type of Permits and Entrance fees 
                  </div>
                </div>
              </div>
              <div className="clearfix" />
              <table className="table cabdetail">
                <tbody className="bookbody">
                  <tr>
                    <td className="bookdetail">Cab Details</td>
                    <td />
                    <td />
                    <td />
                  </tr>
                  <tr>
                    <td>Cab Type</td>
                    <td>Hatchback</td>
                    <td />
                    <td />
                  </tr>
                  <tr>
                    <td>Cab Model</td>
                    <td>Dezire</td>
                    <td />
                    <td />
                  </tr>
                  <tr>
                    <td>Sitting Capacity</td>
                    <td>4</td>
                    <td />
                    <td />
                  </tr>
                  <tr>
                    <td>Luggage Space</td>
                    <td>2 Small Bags</td>
                    <td />
                    <td />
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="tab-pane" id="4a">
            <div className="wt-description">
              <table className="table">
                <thead className="thead-dark">
                  <tr>
                    <th scope="col">Booking Details</th>
                    <th scope="col">Trip Route</th>
                    <th scope="col">Inclusion/Exclusion</th>
                    <th scope="col">Cab Details</th>
                  </tr>
                </thead>
                <tbody className="bookbody">
                  <tr>
                    <td className="bookdetail">Booking Details</td>
                    <td />
                    <td />
                    <td className="edit"><a href="#">Edit Booking</a></td>
                  </tr>
                  <tr>
                    <td>Booking Type</td>
                    <td>Round trip</td>
                    <td />
                    <td />
                  </tr>
                  <tr>
                    <td>Destination Covered</td>
                    <td>Himachal</td>
                    <td />
                    <td />
                  </tr>
                  <tr>
                    <td>Date</td>
                    <td>27/03/2020</td>
                    <td />
                    <td />
                  </tr>
                  <tr>
                    <td>Time</td>
                    <td>02:00 PM</td>
                    <td />
                    <td />
                  </tr>
                  <tr>
                    <td>Number of Person</td>
                    <td>2 Adults + 3 child</td>
                    <td />
                    <td />
                  </tr>
                  <tr>
                    <td>Type of Vehicle</td>
                    <td>Hatchback</td>
                    <td />
                    <td />
                  </tr>
                  <tr>
                    <td>Budget</td>
                    <td>3000 - 5500</td>
                    <td />
                    <td />
                  </tr>
                </tbody>
              </table>
              <div className="clearfix" />
              <div className="triproute">
                <div className="row">
                  <div className="col-sm-6">
                    <div className="bookdetail">Trip Route <a href="#">View Google Map</a></div>
                  </div>
                  <div className="col-sm-6">
                    <div className="edit"><a href="#">Edit Booking</a></div>
                  </div>
                </div>
                <div className="vendor">Need changes? Chat with vendor</div>
                <div className="booktrip">Booking for round trip 3Night &amp; 4Days Delhi to Himachal.</div>
                <div className="location">
                  <div className="wizard-inner">
                    <div className="connecting-line" />
                    <ul className="nav nav-tabs">
                      <li className="active">
                        <a href="#">
                        </a>
                      </li>
                      <li className="active">
                        <a href="#">
                        </a>
                      </li>
                      <li className="active">
                        <a href="#">
                        </a>
                      </li>
                      <li className="active">
                        <a href="#">
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <ul className="list-inline triplocation">
                  <li>Delhi</li>
                  <li>Shimla</li>
                  <li>Manali</li>
                  <li>Delhi</li>
                </ul>
              </div>
              <div className="clearfix" />
              <div className="triproute inclusion">
                <div className="row">
                  <div className="col-sm-12">
                    <div className="bookdetail">Inclusion Exclusions</div>
                  </div>
                </div>
                <div className="row">
                  <div className="vendor col-sm-3">State Tax, Toll Tax Driver allowance Taxes</div>
                  <div className="booktrip col-sm-5">
                    Parking<br />
                    Night time allowance (11:00 PM to 06:00 AM)
                    <br />
                    Additional place/destination visit
                    Any type of Permits and Entrance fees 
                  </div>
                </div>
              </div>
              <div className="clearfix" />
              <table className="table cabdetail">
                <tbody className="bookbody">
                  <tr>
                    <td className="bookdetail">Cab Details</td>
                    <td />
                    <td />
                    <td />
                  </tr>
                  <tr>
                    <td>Cab Type</td>
                    <td>Hatchback</td>
                    <td />
                    <td />
                  </tr>
                  <tr>
                    <td>Cab Model</td>
                    <td>Dezire</td>
                    <td />
                    <td />
                  </tr>
                  <tr>
                    <td>Sitting Capacity</td>
                    <td>4</td>
                    <td />
                    <td />
                  </tr>
                  <tr>
                    <td>Luggage Space</td>
                    <td>2 Small Bags</td>
                    <td />
                    <td />
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

		);
	}
}