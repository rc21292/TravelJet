import React from 'react'  
import axios from 'axios';  
import { useHistory, useLocation } from 'react-router-dom'

import Pagination from "react-js-pagination";
import { useState, useEffect } from 'react'  

import Moment from 'react-moment'

function BrowseBookings(props) { 

  const history = useHistory()
  const location = useLocation()

  const [initcabs, setInitCabs] = useState(['Hatchback','Sedan','Suv','Tempo Traveller','Mini Bus','Volvo']);
  const [initLocations, setInitLocations] = useState([]);
  const [cabs, setCabs] = useState([]);
  const [locations, setLocations] = useState([]);


  const [user, setUser] = useState(false);
  const [checkbox, setCheckbox] = useState([]);

  const [bookingsData, setBookingsData] = useState([]);  
  const [activePage, setActivePage] = useState(1);  
  const [itemsCountPerPage, setItemsCountPerPage] = useState(1);  
  const [totalItemsCount, setTotalItemsCount] = useState(1);  
  const [pageRangeDisplayed, setPageRangeDisplayed] = useState(5);  

  const [searchByName, setSearchByName] = useState("");
  const [searchByCategory, setSearchByCategory] = useState([]);
  const [searchByLocation, setSearchByLocation] = useState([]);
  const [searchByCab, setSearchByCab] = useState([]);

  useEffect(() => {  

    setCabs(initcabs);

    var loadScript = function(src) {
      var tag = document.createElement('script');
      tag.async = false;
      tag.src = src;
      document.body.appendChild(tag);
    }

    loadScript('/frontend/js/main/filters.js')

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

      axios.get('/api/queries/getDestinations').then(result=>{
        setInitLocations(result.data);
        setLocations(result.data);
      });

    }   

  }, []);  

  const handleCheckbox = (event) => {
    let nCheckbox = searchByCab.slice(); 
    if(isValueExist(nCheckbox, event)){ 
      const index = nCheckbox.indexOf(event.target.value);
      nCheckbox.splice(index, 1); 
    }else{
      nCheckbox.push(event.target.value); 
    }
    setSearchByCab(nCheckbox);
  }

  const handleLocationCheckbox = (event) => {
    let nCheckbox = searchByLocation.slice(); 
    if(isValueExist(nCheckbox, event)){ 
      const index = nCheckbox.indexOf(event.target.value);
      nCheckbox.splice(index, 1); 
    }else{
      nCheckbox.push(event.target.value); 
    }
    setSearchByLocation(nCheckbox);
  }

  const handleCatCheckbox = (event) => {
    let nCheckbox = searchByCategory.slice(); 
    if(isValueExist(nCheckbox, event)){ 
      const index = nCheckbox.indexOf(event.target.value);
      nCheckbox.splice(index, 1); 
    }else{
      nCheckbox.push(event.target.value); 
    }
    setSearchByCategory(nCheckbox);
  }

  const isValueExist = (data, event) => {
    console.log(data);
    if(data.length == 0){
      return false;
    }

    for(let i = 0; i<= data.length; i++){
      if(event.target.value == data[i]){
        return true;
      }
    }
    return false;
  }

  const handlePageChange = (pageNumber) => {
    axios.get('/api/queries?status=posted&name='+searchByName+'&category='+searchByCategory+'&location='+searchByLocation+'&cab='+searchByCab+'&page='+pageNumber)
    .then(result=>{
      setBookingsData(result.data.data);
      setItemsCountPerPage(result.data.per_page);  
      setTotalItemsCount(result.data.total);  
      setActivePage(result.data.current_page);
    });
  }

  const onChangeSearchByName = e => {
    const searchByName = e.target.value;
    setSearchByName(searchByName);
  };

  const onChangeSearchByCategory = e => {
    const searchByCategory = e.target.value;
    setSearchByCategory(searchByCategory);
  };

  const onChangeSearchByLocation = e => {
    const searchByLocation = e.target.value;
    setSearchByLocation(searchByLocation);
  };

  const onChangeSearchByCab = e => {
    const searchByCab = e.target.value;
    setSearchByCab(searchByCab);
  };

  const resetFilter = () => {
    window.location.reload(false);
  }
  
  const filterCab = ()  => {
    var updatedList = initcabs;
    updatedList = updatedList.filter(function(item) {
      return item.toLowerCase().search(event.target.value.toLowerCase()) !== -1;
    });
    setCabs(updatedList);
  }

  const filterLocation = ()  => {
    var updatedList = initLocations;
    updatedList = updatedList.filter(function(item) {
      return (item.to_places).toLowerCase().search(event.target.value.toLowerCase()) !== -1;
    });
    setLocations(updatedList);
  }

  const findByFilter = () => {
    axios.get('/api/queries?status=posted&name='+searchByName+'&category='+searchByCategory+'&location='+searchByLocation+'&cab='+searchByCab)
    .then(result => {
      setBookingsData(result.data.data);  
      setItemsCountPerPage(result.data.per_page);  
      setTotalItemsCount(result.data.total);  
      setActivePage(result.data.current_page);
    })
    .catch(e => {
      console.log(e);
    });
  };


  const findByName = () => {
    axios.get('/api/queries?status=posted&name='+searchByName+'&category='+searchByCategory+'&location='+searchByLocation+'&cab='+searchByCab)
    .then(result => {
      setBookingsData(result.data.data);  
      setItemsCountPerPage(result.data.per_page);  
      setTotalItemsCount(result.data.total);  
      setActivePage(result.data.current_page);
    })
    .catch(e => {
      console.log(e);
    });
  };

  const findByCategory = () => {
    axios.get('/api/queries?status=posted&name='+searchByName+'&category='+searchByCategory+'&location='+searchByLocation+'&cab='+searchByCab)
    .then(result => {
      setBookingsData(result.data.data);  
      setItemsCountPerPage(result.data.per_page);  
      setTotalItemsCount(result.data.total);  
      setActivePage(result.data.current_page);
    })
    .catch(e => {
      console.log(e);
    });
  };

  const findByLocation = () => {
    axios.get('/api/queries?status=posted&name='+searchByName+'&category='+searchByCategory+'&location='+searchByLocation+'&cab='+searchByCab)
    .then(result => {
      setBookingsData(result.data.data);  
      setItemsCountPerPage(result.data.per_page);  
      setTotalItemsCount(result.data.total);  
      setActivePage(result.data.current_page);
    })
    .catch(e => {
      console.log(e);
    });
  };

  const findByCab = () => {
    axios.get('/api/queries?status=posted&cab='+searchByCab)
    .then(result => {
      console.log(result.data.data);
      setBookingsData(result.data.data);  
      setItemsCountPerPage(result.data.per_page);  
      setTotalItemsCount(result.data.total);  
      setActivePage(result.data.current_page);
    })
    .catch(e => {
      console.log(e);
    });
  };

  // console.log(initLocations);

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
                                    <input type="text" name="Search" onChange={event => setSearchByName(event.target.value)} className="form-control" placeholder="Search Booking" />
                                    <a onClick={findByName} className="wt-searchgbtn"><i className="fa fa-search" /></a>
                                  </div>
                                </fieldset>
                              </form>
                            </div>
                          </div>
                          <div className="wt-widget wt-effectiveholder">
                            <div className="wt-widgettitle">
                              <h2>Trip Type</h2>
                            </div>
                            <div className="wt-widgetcontent">
                              <form className="wt-formtheme wt-formsearch">
                                <fieldset>
                                  <div className="form-group">
                                    <input type="text" name="Search" className="form-control" placeholder="Search by Type of Trip" />
                                    <a onClick={findByCategory} className="wt-searchgbtn"><i className="fa fa-search" /></a>
                                  </div>
                                </fieldset>
                              </form>
                            </div>
                            <div className="wt-widgetcontent">
                              <form className="wt-formtheme wt-formsearch">
                                <fieldset>
                                  <div className="wt-checkboxholder wt-verticalscrollbar">
                                    <span className="wt-checkbox">
                                      <input id="wordpress" type="checkbox" name="searchByCategory" onChange={handleCatCheckbox} value="One Way Trip" />
                                      <label htmlFor="wordpress"> One Way Trip</label>
                                    </span>
                                    <span className="wt-checkbox">
                                      <input id="graphic" type="checkbox" name="searchByCategory" onChange={handleCatCheckbox} value="Round Trip with Sightseeing" />
                                      <label htmlFor="graphic"> Round Trip with Sightseeing</label>
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
                                    <input type="text" name="fullname" className="filter-records form-control" placeholder="Search By Locations" />
                                    <a onClick={findByLocation} className="wt-searchgbtn"><i className="fa fa-search" /></a>
                                  </div>
                                </fieldset>
                                <fieldset>
                                  <div className="wt-checkboxholder wt-verticalscrollbar" style={{ maxHeight: '235px', overflowY: 'scroll'}}>
                                    {
                                      locations.map((location, index) => {
                                        return <span key={index} className="wt-checkbox">
                                          <input type="checkbox"  onChange={handleLocationCheckbox} name="searchByLocation" value={location.id}/>
                                          <label htmlFor="rate1">{location.to_places}</label>
                                        </span>
                                      })
                                    }
                                  </div>
                                </fieldset>
                              </form>
                            </div>
                          </div>
                          <div className="wt-widget wt-effectiveholder">
                            <div className="wt-widgettitle">
                              <h2>Cabs Type</h2>
                            </div>
                            <div className="wt-widgetcontent">
                              <form className="wt-formtheme wt-formsearch">
                                <fieldset>
                                  <div className="form-group">
                                    <input type="text" name="Search" className="filter-records form-control" placeholder="Search by Type of Cab" />
                                    <a onClick={findByCab} className="wt-searchgbtn"><i className="fa fa-search" /></a>
                                  </div>
                                </fieldset>
                                <fieldset>
                                  <div className="wt-checkboxholder wt-verticalscrollbar">
                                    {
                                      cabs.map((item, index) => {
                                        return <span key={index} className="wt-checkbox">
                                          <input type="checkbox" onChange={handleCheckbox} name="searchByCab" value={item}/>
                                          <label htmlFor="rate1">{item}</label>
                                        </span>
                                      })
                                    }
                                  </div>
                                </fieldset>
                              </form>
                            </div>
                          </div>
                          <div className="wt-widget wt-applyfilters-holder">
                            <div className="wt-widgetcontent">
                              <div className="wt-applyfilters">
                                <a onClick={findByFilter} className="wt-btn btn btn-primary">Apply Filters</a>
                                <br/>
                                <br/>
                                <a onClick={resetFilter} className="btn btn-primary">Reset</a>
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
                                              <li><span><b>Posted</b>  <Moment fromNow> {booking.created_at }</Moment> - {booking.count} qoute</span></li>
                                              <li><span><i className="fa fa-calendar" /> Starting Date: <Moment format="Do MMMM YYYY">{booking.depart}</Moment></span></li>
                                            </ul>
                                          </div>
                                          <div className="col-sm-3 paddingright">
                                            <div className="viewbooking">
                                              <div className="bookingprice">
                                                <i className="fa fa-inr" />{booking.vehicle_budget}
                                              </div>
                                              <span>Booking id : 000000{booking.id}</span>
                                              {booking.agent_id == user.id ?
                                              <a title="You already bidded" disabled className="btn btn-primary">View Booking</a>
                                              :
                                              <a href={'/booking-details/'+booking.id} className="btn btn-primary">View Booking</a>
                                            }
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