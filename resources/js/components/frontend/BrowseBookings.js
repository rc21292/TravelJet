import React from 'react'  
import axios from 'axios';  
import { useHistory, useLocation } from 'react-router-dom'

import Pagination from "react-js-pagination";
import { useState, useEffect } from 'react'  

function BrowseBookings(props) { 

  const history = useHistory()
  const location = useLocation()

   const [user, setUser] = useState(false);

  const [payoutsData, setPayoutsData] = useState([]);  
  const [activePage, setActivePage] = useState(1);  
  const [selectYear, setSelectYear] = useState([]);  
  const [selectedYear, setSelectedYear] = useState();  
  const [selectedMonth, setSelectedMonth] = useState();  
  const [selectMonth, setSelectMonth] = useState([]);  
  const [itemsCountPerPage, setItemsCountPerPage] = useState(1);  
  const [totalItemsCount, setTotalItemsCount] = useState(1);  
  const [pageRangeDisplayed, setPageRangeDisplayed] = useState(3);  
  const [searchTransactionType, setSearchTransactionType] = useState("");
  const [searchDateFrom, setSearchDateFrom] = useState("");
  const [searchDateTo, setSearchDateTo] = useState("");

  useEffect(() => {  

    let stateqq = localStorage["appState"];
    if (stateqq) {
      let AppState = JSON.parse(stateqq);
      setUser(AppState.user);
      axios('/api/payouts/'+AppState.user.id).then(result=>{
        setPayoutsData(result.data.payouts.data);  
        setSelectYear(result.data.years);  
        setSelectedYear(result.data.selected_year);  
        setSelectedMonth(result.data.selected_month);  
        setSelectMonth(result.data.months);  
        setItemsCountPerPage(result.data.payouts.per_page);  
        setTotalItemsCount(result.data.payouts.total);  
        setActivePage(result.data.payouts.current_page);
      });
    }   

  }, []);  


  const handlePageChange = (pageNumber) => {
    console.log(location.pathname)
  axios.get('/api/payouts/'+user.id+'?month='+selectedMonth+'&year='+selectedYear+'&page='+pageNumber)
    
  .then(result=>{
     setPayoutsData(result.data.payouts.data);  
     setSelectedYear(result.data.selected_year);  
        setSelectedMonth(result.data.selected_month);  
      setItemsCountPerPage(result.data.payouts.per_page);  
      setTotalItemsCount(result.data.payouts.total);  
      setActivePage(result.data.payouts.current_page);
  });
}

const onChangeYear = e => {
    const year = e.target.value;
    setSelectedYear(year);  
  };

  const onChangeMonth = e => {
    const month = e.target.value;
    setSelectedMonth(month);  
  };

  const resetFilter = () => {
      setSelectedYear("");  
      setSelectedMonth(""); 
    axios.get('/api/payouts/'+user.id)
  .then(result=>{
     setPayoutsData(result.data.payouts.data);  
     setSelectedYear(result.data.selected_year);  
        setSelectedMonth(result.data.selected_month);  
      setItemsCountPerPage(result.data.payouts.per_page);  
      setTotalItemsCount(result.data.payouts.total);  
      setActivePage(result.data.payouts.current_page);
     
  }); 

  }
  const findByFilter = () => {

    axios(`/api/payouts/${user.id}?month=${selectedMonth}&year=${selectedYear}`)
    .then(result => {
      setPayoutsData(result.data.payouts.data);  
      setItemsCountPerPage(result.data.payouts.per_page);  
      setTotalItemsCount(result.data.payouts.total);  
      setActivePage(result.data.payouts.current_page);
    })
    .catch(e => {
      console.log(e);
    });
  };

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
                                <a href="javascript:void(0);" className="wt-btn btn btn-primary">Apply Filters</a>
                              </div>
                            </div>
                          </div>
                        </aside>
                      </div>
                    </div>
                    <div className="vendersearchlist">
                      <div className="col-sm-9 float-left">
                        <div className="rightColumns">
                          <div className="wt-userlistingholder wt-userlisting wt-haslayout">
                            <div className="row">
                              <div className="wt-userlistinghold wt-featured">
                                <div className="col-sm-9 paddingleft">
                                  <div className="wt-userlistingcontent">
                                    <div className="wt-contenthead">
                                      <div className="wt-title">
                                        <span>One Way Trip</span>
                                        <h2>Delhi to Shimla Cab</h2>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="wt-description">
                                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>
                                  </div>
                                  <ul className="wt-userlisting-breadcrumb">
                                    <li><span><i className="fa fa-map-marker" /> Pickup from: Delhi</span></li>
                                    <li><span> <i className="fa fa-taxi" /> Cab: Hachback</span></li>
                                    <br />
                                    <li><span><b>Posted</b> 2 minute ago - 0 qoute</span></li>
                                    <li><span><i className="fa fa-calendar" /> Starting Date: 24th March 2020</span></li>
                                  </ul>
                                </div>
                                <div className="col-sm-3 paddingright">
                                  <div className="viewbooking">
                                    <div className="bookingprice">
                                      <i className="fa fa-inr" /> 45000
                                    </div>
                                    <span>Booking id : 0000000</span>
                                    <a href="/booking-details" className="btn btn-primary">View Booking</a>
                                  </div>
                                </div>
                              </div>{/*END*/}
                              <div className="clearfix" />
                              <div className="wt-userlistinghold wt-featured">
                                <div className="col-sm-9 paddingleft">
                                  <div className="wt-userlistingcontent">
                                    <div className="wt-contenthead">
                                      <div className="wt-title">
                                        <span>One Way Trip</span>
                                        <h2>Delhi to Shimla Cab</h2>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="wt-description">
                                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>
                                  </div>
                                  <ul className="wt-userlisting-breadcrumb">
                                    <li><span><i className="fa fa-map-marker" /> Pickup from: Delhi</span></li>
                                    <li><span> <i className="fa fa-taxi" /> Cab: Hachback</span></li>
                                    <br />
                                    <li><span><b>Posted</b> 2 minute ago - 0 qoute</span></li>
                                    <li><span><i className="fa fa-calendar" /> Starting Date: 24th March 2020</span></li>
                                  </ul>
                                </div>
                                <div className="col-sm-3 paddingright">
                                  <div className="viewbooking">
                                    <div className="bookingprice">
                                      <i className="fa fa-inr" /> 45000
                                    </div>
                                    <span>Booking id : 0000000</span>
                                    <a href="/booking-details" className="btn btn-primary">View Booking</a>
                                  </div>
                                </div>
                              </div>{/*END*/}
                              <div className="clearfix" />
                              <div className="wt-userlistinghold wt-featured">
                                <div className="col-sm-9 paddingleft">
                                  <div className="wt-userlistingcontent">
                                    <div className="wt-contenthead">
                                      <div className="wt-title">
                                        <span>One Way Trip</span>
                                        <h2>Delhi to Shimla Cab</h2>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="wt-description">
                                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>
                                  </div>
                                  <ul className="wt-userlisting-breadcrumb">
                                    <li><span><i className="fa fa-map-marker" /> Pickup from: Delhi</span></li>
                                    <li><span> <i className="fa fa-taxi" /> Cab: Hachback</span></li>
                                    <br />
                                    <li><span><b>Posted</b> 2 minute ago - 0 qoute</span></li>
                                    <li><span><i className="fa fa-calendar" /> Starting Date: 24th March 2020</span></li>
                                  </ul>
                                </div>
                                <div className="col-sm-3 paddingright">
                                  <div className="viewbooking">
                                    <div className="bookingprice">
                                      <i className="fa fa-inr" /> 45000
                                    </div>
                                    <span>Booking id : 0000000</span>
                                    <a href="/booking-details" className="btn btn-primary">View Booking</a>
                                  </div>
                                </div>
                              </div>{/*END*/}
                              <div className="clearfix" />
                              <div className="wt-userlistinghold wt-featured">
                                <div className="col-sm-9 paddingleft">
                                  <div className="wt-userlistingcontent">
                                    <div className="wt-contenthead">
                                      <div className="wt-title">
                                        <span>One Way Trip</span>
                                        <h2>Delhi to Shimla Cab</h2>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="wt-description">
                                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>
                                  </div>
                                  <ul className="wt-userlisting-breadcrumb">
                                    <li><span><i className="fa fa-map-marker" /> Pickup from: Delhi</span></li>
                                    <li><span> <i className="fa fa-taxi" /> Cab: Hachback</span></li>
                                    <br />
                                    <li><span><b>Posted</b> 2 minute ago - 0 qoute</span></li>
                                    <li><span><i className="fa fa-calendar" /> Starting Date: 24th March 2020</span></li>
                                  </ul>
                                </div>
                                <div className="col-sm-3 paddingright">
                                  <div className="viewbooking">
                                    <div className="bookingprice">
                                      <i className="fa fa-inr" /> 45000
                                    </div>
                                    <span>Booking id : 0000000</span>
                                    <a href="/booking-details" className="btn btn-primary">View Booking</a>
                                  </div>
                                </div>
                              </div>{/*END*/}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
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