import React, { Component } from 'react';
import {BrowserRouter as Router, Link, Route, Redirect} from 'react-router-dom';

import axios from 'axios';
import Pagination from "react-js-pagination";

export default class Quotations extends Component {
	render() {
		return (
            <div>
              
                <div>
        <div className="quotation-page">
          {/* Page Heading */}
          <h1>Quotation</h1>
          <table className="table table-bordered booking">
            <thead className="thead-primary">
              <tr>
                <th scope="col">Date</th>
                <th scope="col">My Booking</th>
                <th scope="col">Action</th>
                <th scope="col" />
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>22-June-20</td>
                <td>Booking for Delhi to Manali</td>
                <td className="iconview">
                  <a href="#" className="btn btn-danger"><i className="fa fa-trash" /></a>
                </td>
                <td><a href="JavaScript:void(0)" onclick="showhide();" className="btn btn-default btn_click">View Quotation</a>
                </td>
              </tr>
              <tr>
                <td>22-June-20</td>
                <td>Booking for Delhi to Manali</td>
                <td className="iconview">
                  <a href="#" className="btn btn-danger"><i className="fa fa-trash" /></a>
                </td>
                <td><a href="JavaScript:void(0)" onclick="showhide();" className="btn btn-default btn_click">View Quotation</a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="viewquotation" style={{display: 'block'}}>
          <h3>Booking for Delhi to Manali</h3>
          <div className="wt-userlistinghold wt-featured">
            <div className="wt-rightarea"> <a href="#"><span>Download Quote</span></a>
              <i className="fa fa-inr" /> 9999/- Total <span>Exclusive of Convenience Fee</span>
            </div>
            <div className="bookid"> <span>Booking id : 0000000</span>
              <a href="#">View/Edit Booking</a> | <a href="#">Reactivate</a>
            </div>
            <div className="roundtrip">Quotes for round trip Delhi to Himachal (3N / 4D)</div>
            <figure className="wt-userlistingimg">
              <img src="image/icons/chat-profile.png" alt="image description" />
            </figure>
            <div className="wt-userlistingcontent">
              <div className="wt-contenthead">
                <div className="wt-title"> <a href="bookingprofile.php"> Lorem Ipsum 
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
              </div>
              <ul className="wt-userlisting-breadcrumb awardbookig">
                <li><span><a href="#" className="btn btn-primary">Award Booking</a></span>
                </li>
                <li><span> <a href="#" className="btn btn-default chatbtn">Chat Now</a></span>
                </li>
                <li><span> <a href="#" className="btn btn-info">Contact Vendor</a></span>
                </li>
              </ul>
            </div>
            <div className="clearfix" />
            <div id="exTab1">
              <ul className="nav nav-pills">
                <li className="active"> <a href="#1a" data-toggle="tab"><i className="fa fa-inr" /> 4100/-
                    <br />
                    <span>Total Cost</span>
                    <span><b>Avishek K.</b></span>
                  </a> 
                </li>
                <li><a href="#2a" data-toggle="tab"><i className="fa fa-inr" /> 4100/-
                    <br />
                    <span>Total Cost</span>
                    <span><b>Avishek K.</b></span>
                  </a> 
                </li>
                <li><a href="#3a" data-toggle="tab"><i className="fa fa-inr" /> 4100/-
                    <br />
                    <span>Total Cost</span>
                    <span><b>Avishek K.</b></span>
                  </a> 
                </li>
                <li><a href="#4a" data-toggle="tab"><i className="fa fa-inr" /> 4100/-
                    <br />
                    <span>Total Cost</span>
                    <span><b>Avishek K.</b></span>
                  </a> 
                </li>
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
                          <td className="edit"><a href="JavaScript:void(0)" className="btnsho">Edit Booking</a>
                          </td>
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
                    <div className="editbooking" style={{display: 'none'}}>
                      <div className="row">
                        <div className="col-sm-6 col-xs-12">
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
                              <input type="text" name="searchArea" defaultValue placeholder="Tell us your starting point.." className="startpoint form-control" />
                            </div>
                          </div>
                          <div className="clearfix" />
                          <div className="col-sm-12 col-xs-12">
                            <div className="row returnArrival">
                              <div className="col-sm-7">
                                <label className="control-label">Date</label>
                                <div className="form-group book-timing greybg">
                                  <input type="date" name="arrival" className="form-control" placeholder="Arrival" />
                                </div>
                              </div>
                              <div className="col-sm-5">
                                <label className="control-label">Time</label>
                                <div className="form-group book-timing greybg">
                                  <input type="time" name="arrival" className="form-control" placeholder="Arrival" />
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
                                  <li className="active"> <a className="page-link" href="#">1</a>
                                  </li>
                                  <li><a href="javascript:void(0);">2</a>
                                  </li>
                                  <li><a href="javascript:void(0);">3</a>
                                  </li>
                                  <li><a href="javascript:void(0);">4</a>
                                  </li>
                                  <li><a href="javascript:void(0);">5</a>
                                  </li>
                                  <li><a href="javascript:void(0);">6</a>
                                  </li>
                                  <li><a href="javascript:void(0);">7</a>
                                  </li>
                                  <li><a href="javascript:void(0);">8</a>
                                  </li>
                                  <li><a href="javascript:void(0);">9</a>
                                  </li>
                                </ul>
                              </div>
                            </div>
                            <div className="numberof-person">
                              <label className="control-label">CHILDREN (2y-12y)</label>
                              <div className="form-group">
                                <ul className="pagination">
                                  <li className="active"> <a className="page-link" href="#">0</a>
                                  </li>
                                  <li><a href="javascript:void(0);">1</a>
                                  </li>
                                  <li><a href="javascript:void(0);">2</a>
                                  </li>
                                  <li><a href="javascript:void(0);">3</a>
                                  </li>
                                  <li><a href="javascript:void(0);">4</a>
                                  </li>
                                  <li><a href="javascript:void(0);">5</a>
                                  </li>
                                  <li><a href="javascript:void(0);">6</a>
                                  </li>
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
                                  <input type="radio" name="stop" className="route-stop" /> <span>Hatchback</span>
                                </label>
                              </div>
                            </div>
                            <div className="col-sm-10">
                              <div className="radio custom-radio">
                                <label>
                                  <input type="radio" name="stop" className="route-stop" /> <span>Sedan</span>
                                </label>
                              </div>
                            </div>
                            <div className="col-sm-10">
                              <div className="radio custom-radio">
                                <label>
                                  <input type="radio" name="stop" className="route-stop" /> <span>Suv</span>
                                </label>
                              </div>
                            </div>
                            <div className="col-sm-10">
                              <div className="radio custom-radio">
                                <label>
                                  <input type="radio" name="stop" className="route-stop" /> <span>Tempo Traveller</span>
                                </label>
                              </div>
                            </div>
                            <div className="col-sm-12">
                              <div className="row">
                                <div className="seater">
                                  <div className="radio first-radio col-sm-2">
                                    <label className="radio-inline">
                                      <input type="radio" name="optradio" />8 Seater</label>
                                  </div>
                                  <div className="radio col-sm-2">
                                    <label className="radio-inline">
                                      <input type="radio" name="optradio" />12 Seater</label>
                                  </div>
                                  <div className="radio col-sm-2">
                                    <label className="radio-inline">
                                      <input type="radio" name="optradio" />16 Seater</label>
                                  </div>
                                  <div className="radio col-sm-2">
                                    <label className="radio-inline">
                                      <input type="radio" name="optradio" />20 Seater</label>
                                  </div>
                                  <div className="radio col-sm-2">
                                    <label className="radio-inline">
                                      <input type="radio" name="optradio" />24 Seater</label>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="clearfix" />
                            <div className="col-sm-10">
                              <div className="radio custom-radio">
                                <label>
                                  <input type="radio" name="stop" className="route-stop" /> <span>Mini Bus</span>
                                </label>
                              </div>
                            </div>
                            <div className="col-sm-10">
                              <div className="radio custom-radio">
                                <label>
                                  <input type="radio" name="stop" className="route-stop" /> <span>Volvo</span>
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
                                <input type="radio" name="stop" className="route-stop" /> <span>3500-5500</span>
                              </label>
                            </div>
                          </div>
                          <div className="col-sm-4">
                            <div className="radio custom-radio">
                              <label>
                                <input type="radio" name="stop" className="route-stop" /> <span>6500-12,000</span>
                              </label>
                            </div>
                          </div>
                          <div className="col-sm-4">
                            <div className="radio custom-radio">
                              <label>
                                <input type="radio" name="stop" className="route-stop" /> <span>15000- 25000</span>
                              </label>
                            </div>
                          </div>
                          <div className="col-sm-4">
                            <div className="radio custom-radio">
                              <label>
                                <input type="radio" name="stop" className="route-stop" /> <span>35000- 55000</span>
                              </label>
                            </div>
                          </div>
                          <div className="col-sm-4">
                            <div className="radio custom-radio">
                              <label>
                                <input type="radio" name="stop" className="route-stop" /> <span>80000- 150000</span>
                              </label>
                            </div>
                          </div>
                        </div>
                        <div className="savebtn">
                          <div className="form-group"> <a href="#" className="btn btn-primary">Save</a>
                          </div>
                        </div>
                      </div>
                      {/*end*/}
                    </div>
                    <div className="triproute">
                      <div className="row">
                        <div className="col-sm-6">
                          <div className="bookdetail">Trip Route <a href="https://maps.google.com/maps?q=university%20of%20san%20francisco&t=&z=13&ie=UTF8&iwloc=&output=embed">View Google Map</a>
                          </div>
                        </div>
                        <div className="col-sm-6">
                          <div className="edit"><a href="JavaScript:void(0)" className="btnsho2">Edit Booking</a>
                          </div>
                        </div>
                      </div>
                      <div className="vendor">Need changes? Chat with vendor</div>
                      <div className="booktrip">Booking for round trip 3Night &amp; 4Days Delhi to Himachal.</div>
                      <div className="location">
                        <div className="wizard-inner">
                          <div className="connecting-line" />
                          <ul className="nav nav-tabs">
                            <li className="active">
                              <a href="#" />
                            </li>
                            <li className="active">
                              <a href="#" />
                            </li>
                            <li className="active">
                              <a href="#" />
                            </li>
                            <li className="active">
                              <a href="#" />
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
                    <div className="edittrip" style={{display: 'block'}}>
                      <div className="row">
                        <div className="col-sm-6">
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
                            </div>
                          </div>
                        </div>
                        <div className="col-sm-6">
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
                              <input type="text" name="searchArea" defaultValue placeholder="Tell us your starting point.." className="startpoint form-control" />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="savebtn">
                        <div className="form-group"> <a href="#" className="btn btn-primary">Save</a>
                        </div>
                      </div>
                    </div>
                    <div className="clearfix" />
                    <div className="triproute inclusion">
                      <div className="row">
                        <div className="col-sm-5">
                          <div className="bookdetail">Inclusion</div>
                        </div>
                        <div className="col-sm-5">
                          <div className="bookdetail">Exclusions</div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="vendor col-sm-5">State Tax, Toll Tax Driver allowance Taxes</div>
                        <div className="booktrip col-sm-5">Parking
                          <br />Night time allowance (11:00 PM to 06:00 AM)
                          <br />Additional place/destination visit Any type of Permits and Entrance fees</div>
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
                          <td className="bookdetail">Booking Details 2</td>
                          <td />
                          <td />
                          <td className="edit"><a href="#">Edit Booking</a>
                          </td>
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
                          <div className="bookdetail">Trip Route <a href="#">View Google Map</a>
                          </div>
                        </div>
                        <div className="col-sm-6">
                          <div className="edit"><a href="#">Edit Booking</a>
                          </div>
                        </div>
                      </div>
                      <div className="vendor">Need changes? Chat with vendor</div>
                      <div className="booktrip">Booking for round trip 3Night &amp; 4Days Delhi to Himachal.</div>
                      <div className="location">
                        <div className="wizard-inner">
                          <div className="connecting-line" />
                          <ul className="nav nav-tabs">
                            <li className="active">
                              <a href="#" />
                            </li>
                            <li className="active">
                              <a href="#" />
                            </li>
                            <li className="active">
                              <a href="#" />
                            </li>
                            <li className="active">
                              <a href="#" />
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
                        <div className="col-sm-5">
                          <div className="bookdetail">Inclusion</div>
                        </div>
                        <div className="col-sm-5">
                          <div className="bookdetail">Exclusions</div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="vendor col-sm-5">State Tax, Toll Tax Driver allowance Taxes</div>
                        <div className="booktrip col-sm-5">Parking
                          <br />Night time allowance (11:00 PM to 06:00 AM)
                          <br />Additional place/destination visit Any type of Permits and Entrance fees</div>
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
                          <td className="bookdetail">Booking Details 3</td>
                          <td />
                          <td />
                          <td className="edit"><a href="#">Edit Booking</a>
                          </td>
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
                          <div className="bookdetail">Trip Route <a href="#">View Google Map</a>
                          </div>
                        </div>
                        <div className="col-sm-6">
                          <div className="edit"><a href="#">Edit Booking</a>
                          </div>
                        </div>
                      </div>
                      <div className="vendor">Need changes? Chat with vendor</div>
                      <div className="booktrip">Booking for round trip 3Night &amp; 4Days Delhi to Himachal.</div>
                      <div className="location">
                        <div className="wizard-inner">
                          <div className="connecting-line" />
                          <ul className="nav nav-tabs">
                            <li className="active">
                              <a href="#" />
                            </li>
                            <li className="active">
                              <a href="#" />
                            </li>
                            <li className="active">
                              <a href="#" />
                            </li>
                            <li className="active">
                              <a href="#" />
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
                        <div className="col-sm-5">
                          <div className="bookdetail">Inclusion</div>
                        </div>
                        <div className="col-sm-5">
                          <div className="bookdetail">Exclusions</div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="vendor col-sm-5">State Tax, Toll Tax Driver allowance Taxes</div>
                        <div className="booktrip col-sm-5">Parking
                          <br />Night time allowance (11:00 PM to 06:00 AM)
                          <br />Additional place/destination visit Any type of Permits and Entrance fees</div>
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
                          <td className="bookdetail">Booking Details 4</td>
                          <td />
                          <td />
                          <td className="edit"><a href="#">Edit Booking</a>
                          </td>
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
                          <div className="bookdetail">Trip Route <a href="#">View Google Map</a>
                          </div>
                        </div>
                        <div className="col-sm-6">
                          <div className="edit"><a href="#">Edit Booking</a>
                          </div>
                        </div>
                      </div>
                      <div className="vendor">Need changes? Chat with vendor</div>
                      <div className="booktrip">Booking for round trip 3Night &amp; 4Days Delhi to Himachal.</div>
                      <div className="location">
                        <div className="wizard-inner">
                          <div className="connecting-line" />
                          <ul className="nav nav-tabs">
                            <li className="active">
                              <a href="#" />
                            </li>
                            <li className="active">
                              <a href="#" />
                            </li>
                            <li className="active">
                              <a href="#" />
                            </li>
                            <li className="active">
                              <a href="#" />
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
                        <div className="col-sm-5">
                          <div className="bookdetail">Inclusion</div>
                        </div>
                        <div className="col-sm-5">
                          <div className="bookdetail">Exclusions</div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="vendor col-sm-5">State Tax, Toll Tax Driver allowance Taxes</div>
                        <div className="booktrip col-sm-5">Parking
                          <br />Night time allowance (11:00 PM to 06:00 AM)
                          <br />Additional place/destination visit Any type of Permits and Entrance fees</div>
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
                    
      </div>

		);
	}
}