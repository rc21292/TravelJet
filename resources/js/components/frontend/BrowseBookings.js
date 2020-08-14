import React from 'react'  
import axios from 'axios';  
import { useHistory, useLocation } from 'react-router-dom'

import Pagination from "react-js-pagination";
import { useState, useEffect } from 'react'  

import Moment from 'react-moment'

function BrowseBookings(props) { 

  const history = useHistory()
  const location = useLocation()

  const [user, setUser] = useState(false);

  const [bookingsData, setBookingsData] = useState([]);  
  const [activePage, setActivePage] = useState(1);  
  const [itemsCountPerPage, setItemsCountPerPage] = useState(1);  
  const [totalItemsCount, setTotalItemsCount] = useState(1);  
  const [pageRangeDisplayed, setPageRangeDisplayed] = useState(5);  

  useEffect(() => {  

    let stateqq = localStorage["appState"];
    if (stateqq) {
      let AppState = JSON.parse(stateqq);
      setUser(AppState.user);
      axios.get('/api/queries?status=posted').then(result=>{
        setBookingsData(result.data.data); 
        setItemsCountPerPage(result.data.per_page);  
        setTotalItemsCount(result.data.total);  
        setActivePage(result.data.current_page);
      });
    }   

  }, []);  


  const handlePageChange = (pageNumber) => {
    console.log(location.pathname)
    axios.get('/api/queries?status=posted'+'&page='+pageNumber)

    .then(result=>{
      setBookingsData(result.data.data);
      setItemsCountPerPage(result.data.per_page);  
      setTotalItemsCount(result.data.total);  
      setActivePage(result.data.current_page);
    });
  }

  return (  
     <div className="bookingvenderlist">
        <main id="wt-main" className="wt-main wt-haslayout wt-innerbgcolor">
          <div className="wt-main-section wt-haslayout">
            {/* User Listing Start*/}
            <div className="wt-haslayout">
              <div className="container">
                <div className="row">
                  <div id="wt-twocolumns" className="wt-twocolumns wt-haslayout">
                    <div className="vendersearchtrip">
                      <div className="col-sm-3 float-left">
                        <aside id="wt-sidebar" className="wt-sidebar wt-usersidebar">
                          <div className="wt-widget wt-effectiveholder">
                            <div className="wt-widgettitle">
                              <h2>Start Your Search</h2>
                            </div>
                            <div className="wt-widgetcontent">
                              <form className="wt-formtheme wt-formsearch">
                                <fieldset>
                                  <div className="form-group">
                                    <input type="text" name="Search" className="form-control" placeholder="Search Booking" />
                                    <a href="javascrip:void(0);" className="wt-searchgbtn"><i className="fa fa-search" /></a>
                                  </div>
                                </fieldset>
                              </form>
                            </div>
                          </div>
                          <div className="wt-widget wt-effectiveholder">
                            <div className="wt-widgettitle">
                              <h2>Categories</h2>
                            </div>
                            <div className="wt-widgetcontent">
                              <form className="wt-formtheme wt-formsearch">
                                <fieldset>
                                  <div className="form-group">
                                    <input type="text" name="Search" className="form-control" placeholder="Search Categories" />
                                    <a href="javascrip:void(0);" className="wt-searchgbtn"><i className="fa fa-search" /></a>
                                  </div>
                                </fieldset>
                              </form>
                            </div>
                            <div className="wt-widgetcontent">
                              <form className="wt-formtheme wt-formsearch">
                                <fieldset>
                                  <div className="wt-checkboxholder wt-verticalscrollbar">
                                    <span className="wt-checkbox">
                                      <input id="wordpress" type="checkbox" name="description" defaultValue="company" defaultChecked />
                                      <label htmlFor="wordpress"> One Way Trip</label>
                                    </span>
                                    <span className="wt-checkbox">
                                      <input id="graphic" type="checkbox" name="description" defaultValue="company" />
                                      <label htmlFor="graphic"> Round with Sightseeing Trip</label>
                                    </span>
                                  </div>
                                </fieldset>
                              </form>
                            </div>
                          </div>
                          <div className="wt-widget wt-effectiveholder">
                            <div className="wt-widgettitle">
                              <h2>Locations</h2>
                            </div>
                            <div className="wt-widgetcontent">
                              <form className="wt-formtheme wt-formsearch">
                                <fieldset>
                                  <div className="form-group">
                                    <input type="text" name="fullname" className="form-control" placeholder="Search Categories" />
                                    <a href="javascrip:void(0);" className="wt-searchgbtn"><i className="fa fa-search" /></a>
                                  </div>
                                </fieldset>
                                <fieldset>
                                  <div className="wt-checkboxholder wt-verticalscrollbar">
                                    <span className="wt-checkbox">
                                      <input id="wt-description" type="checkbox" name="description" defaultValue="company" defaultChecked />
                                      <label htmlFor="wt-description"> Shimla</label>
                                    </span>
                                    <span className="wt-checkbox">
                                      <input id="us" type="checkbox" name="description" defaultValue="company" />
                                      <label htmlFor="us"> Jaipur</label>
                                    </span>
                                    <span className="wt-checkbox">
                                      <input id="canada" type="checkbox" name="description" defaultValue="company" />
                                      <label htmlFor="canada"> Rishikesh</label>
                                    </span>
                                    <span className="wt-checkbox">
                                      <input id="england" type="checkbox" name="description" defaultValue="company" />
                                      <label htmlFor="england"> Manali</label>
                                    </span>
                                    <span className="wt-checkbox">
                                      <input id="emirates" type="checkbox" name="description" defaultValue="company" />
                                      <label htmlFor="emirates"> Goa</label>
                                    </span>
                                  </div>
                                </fieldset>
                              </form>
                            </div>
                          </div>
                          <div className="wt-widget wt-effectiveholder">
                            <div className="wt-widgettitle">
                              <h2>Cabs</h2>
                            </div>
                            <div className="wt-widgetcontent">
                              <form className="wt-formtheme wt-formsearch">
                                <fieldset>
                                  <div className="form-group">
                                    <input type="text" name="Search" className="form-control" placeholder="Search Categories" />
                                    <a href="javascrip:void(0);" className="wt-searchgbtn"><i className="fa fa-search" /></a>
                                  </div>
                                </fieldset>
                                <fieldset>
                                  <div className="wt-checkboxholder wt-verticalscrollbar">
                                    <span className="wt-checkbox">
                                      <input id="rate1" type="checkbox" name="description" defaultValue="company" defaultChecked />
                                      <label htmlFor="rate1">Hatchback</label>
                                    </span>
                                    <span className="wt-checkbox">
                                      <input id="rate2" type="checkbox" name="description" defaultValue="company" />
                                      <label htmlFor="rate2">Sedan</label>
                                    </span>
                                    <span className="wt-checkbox">
                                      <input id="rate3" type="checkbox" name="description" defaultValue="company" />
                                      <label htmlFor="rate3">Suv</label>
                                    </span>
                                    <span className="wt-checkbox">
                                      <input id="rate4" type="checkbox" name="description" defaultValue="company" />
                                      <label htmlFor="rate4">Tempo Traveller</label>
                                    </span>
                                    <span className="wt-checkbox">
                                      <input id="rate5" type="checkbox" name="description" defaultValue="company" />
                                      <label htmlFor="rate5"> Mini Bus</label>
                                    </span>
                                    <span className="wt-checkbox">
                                      <input id="rate2v" type="checkbox" name="description" defaultValue="company" />
                                      <label htmlFor="rate2v">Volvo</label>
                                    </span>
                                  </div>
                                </fieldset>
                              </form>
                            </div>
                          </div>
                          <div className="wt-widget wt-applyfilters-holder">
                            <div className="wt-widgetcontent">
                              <div className="wt-applyfilters">
                                <a href="" className="wt-btn btn btn-primary">Apply Filters</a>
                              </div>
                            </div>
                          </div>
                        </aside>
                      </div>
                    </div>
                    <div className="vendersearchlist">
                      {bookingsData.map((booking,i)=>{
                           return(
                                <div key={i} className="col-sm-9 float-left">
                                  <div className="rightColumns">
                                    <div className="wt-userlistingholder wt-userlisting wt-haslayout">
                                      <div className="row">
                                        <div className="clearfix" />
                                        <div className="wt-userlistinghold wt-featured">
                                          <div className="col-sm-9 paddingleft">
                                            <div className="wt-userlistingcontent">
                                              <div className="wt-contenthead">
                                                <div className="wt-title">
                                                  <span>{booking.booking_type}</span>
                                                  <h2>{booking.booking_name}</h2>
                                                </div>
                                              </div>
                                            </div>
                                            <div className="wt-description">
                                              <p>{booking.description}</p>
                                            </div>
                                            <ul className="wt-userlisting-breadcrumb">
                                              <li><span><i className="fa fa-map-marker" /> Pickup from: {booking.from_places}</span></li>
                                              <li><span> <i className="fa fa-taxi" /> Cab: {booking.vehicle_type}</span></li>
                                              <br />
                                              <li><span><b>Posted</b>  <Moment interval={1000} parse="YYYY-MM-DD HH:mm" fromNow>{booking.created_at}</Moment> - {booking.count} qoute</span></li>
                                              <li><span><i className="fa fa-calendar" /> Starting Date: <Moment format="Do MMMM YYYY">{booking.created_at}</Moment></span></li>
                                            </ul>
                                          </div>
                                          <div className="col-sm-3 paddingright">
                                            <div className="viewbooking">
                                              <div className="bookingprice">
                                                <i className="fa fa-inr" />{booking.vehicle_budget}
                                              </div>
                                              <span>Booking id : 000000{booking.id}</span>
                                              <a href={'/booking-details/'+booking.id} className="btn btn-primary">View Booking</a>
                                            </div>
                                          </div>
                                        </div>
                                        <div className="clearfix" />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                )
                              })
                            }

                  </div>
                    </div>
                      <div className="d-flex justify-content-center" style={{marginLeft: '50%'}}>
                     <Pagination
                     activePage={activePage}
                     itemsCountPerPage={itemsCountPerPage}
                     totalItemsCount={totalItemsCount}
                     pageRangeDisplayed={pageRangeDisplayed}
                     onChange={handlePageChange}
                     itemClass="page-item"
                     linkClass="page-link"
                     prevPageText="Prev"
                     nextPageText="Next"
                     lastPageText="Last"
                     firstPageText="First"
                     />
                  </div>                 
                </div>
              </div>
              {/* User Listing End*/}
            </div>
          </div></main>
      </div>
  )  
}  
  
export default BrowseBookings