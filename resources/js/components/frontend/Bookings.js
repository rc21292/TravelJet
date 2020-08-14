import React from 'react'  
import axios from 'axios';  
import { useHistory, useLocation } from 'react-router-dom'

import Pagination from "react-js-pagination";
import { useState, useEffect } from 'react'  

function Bookings(props) { 

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

     <div>
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
                        <aside id="wt-sidebar" className="wt-sidebar wt-usersidebar viewbookingleft">
                          <div className="wt-widget wt-effectiveholder">
                            <div className="wt-widgettitle">
                              <h2>About the Customer</h2>
                            </div>
                            <div className="customerabout">
                              <ul className="list-unstyled">
                                <li><span><i className="fa fa-user" />Name : Ranjeet Singh</span></li>
                                <li><span><i className="fa fa-phone" />Contact Number : +91 9971717045</span></li>
                                <li><span><i className="fa fa-envelope" />Email : avisheksubi@gmail.com</span></li>
                                <li><span><i className="fa fa-flag" />State : Delhi, INDIA</span></li>
                                <li><span><i className="fa fa-address-card" />Member Since : 24-Jul-2020</span></li>
                              </ul>
                            </div>
                          </div>
                        </aside>
                      </div>
                    </div>
                    <div className="vendersearchlist">
                      <div className="col-sm-9 float-left">
                        <div className="rightColumns viewbookingright">
                          <div className="bookingdetail">
                            <div className="bookeddata">
                              <div className="bookingheader">
                                <div className="row">
                                  <div className="col-sm-6">
                                    <div className="bookdetail">
                                      <h3>Booking Details</h3>
                                    </div>
                                  </div>
                                  <div className="col-sm-6">
                                    <div className="headerbudget">
                                      <div className="budgetprice">
                                        <b>Budget:</b> <i className="fa fa-inr" /> 3500 - 5500
                                      </div>
                                      <span>Booking ID:0000000</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="bookeddetail">
                                <ul className="list-unstyled">
                                  <li><span><div className="oneway">One Way Trip</div></span></li>
                                  <li><span><div className="bktitle">Booking Title: Delhi to Manali Cab Booking</div></span></li>
                                  <li><span>Pickup Location: <b>Delhi</b></span></li>
                                  <li><span>Stoppage During the trip : <b>Kurukshetra - Ambala - Chandigarh</b></span></li>
                                  <li><span>Depart : <b>22nd March 2020</b></span></li>
                                  <li><span>Pickup Time : <b>3:00 AM</b></span></li>
                                  <li><span>Number of Person : <b>4 Adults + 2 Children + 2 infants</b></span></li>
                                  <li><span>Type of Vehicle : <b>Hatchback</b></span></li>
                                  <li><span>Total Kilometers : <b>570</b></span></li>
                                  <li><span>Description: <b>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</b></span></li>
                                </ul>
                              </div>
                            </div>{/*End*/}
                            <div className="createquotation">
                              <div className="bookingheader">
                                <div className="row">
                                  <div className="col-sm-7">
                                    <div className="bookdetail">
                                      <h3>Travelling Details</h3>
                                    </div>
                                  </div>
                                  <div className="col-sm-5">
                                    <div className="headerbudget">
                                      <span>Booking ID:0000000</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="quotationbooked quotaedit">
                                <div className="row">
                                  <div className="col-sm-4">
                                    <div className="formtitle">
                                      <h5>Type of Booking</h5>
                                      <div className="quedit"><a href="JavaScript:void(0)" className="btnsho5">Edit</a>
                                      </div>
                                    </div>
                                    <div className="form-group">
                                      <select className="custom-select form-control" id="inputGroupSelect01" disabled>
                                        <option selected>One Way Trip</option>
                                        <option value={1}>One</option>
                                        <option value={2}>Two</option>
                                        <option value={3}>Three</option>
                                      </select>
                                    </div>
                                    <div className="quotbkedit" style={{display: 'none'}}>
                                      <div className="form-group">
                                        <select className="custom-select form-control" id="inputGroupSelect01">
                                          <option selected>One Way Trip</option>
                                          <option value={1}>One</option>
                                          <option value={2}>Two</option>
                                          <option value={3}>Three</option>
                                        </select>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-sm-8">
                                    <div className="formtitle">
                                      <h5>Subject/Title of Booking</h5>
                                      <div className="quedit"><a href="JavaScript:void(0)" className="btnsho6">Edit</a>
                                      </div>
                                    </div>
                                    <div className="form-group">
                                      <input type="text" name="title" placeholder="Delhi to Manali Cab Booking" className="form-control" disabled />
                                    </div>
                                    <div className="quotintedit" style={{display: 'none'}}>
                                      <div className="form-group">
                                        <input type="text" name="title" placeholder="Subject/Title of Booking" className="form-control" />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col-sm-6">
                                    <div className="formtitle">
                                      <h5>Pickup Location</h5>
                                      <div className="quedit"><a href="JavaScript:void(0)" className="btnsho7">Edit</a>
                                      </div>
                                    </div>
                                    <div className="book-locationPanel">
                                      <div className="selectAddress">
                                        <select className="select-state" disabled>
                                          <option value="Andhra Pradesh">Delhi NCR</option>
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
                                        <input type="text" name="searchArea" defaultValue placeholder="Pandav Nagar" className="startpoint form-control" disabled />
                                      </div>
                                    </div>
                                    <div className="editpickup" style={{display: 'none'}}>
                                      <div className="book-locationPanel">
                                        <div className="selectAddress">
                                          <select className="select-state">
                                            <option value="Andhra Pradesh">Delhi NCR</option>
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
                                          <input type="text" name="searchArea" defaultValue placeholder="Client Starting point.." className="startpoint form-control" />
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-sm-6">
                                    <div className="formtitle">
                                      <h5>Drop Location</h5>
                                      <div className="quedit"><a href="JavaScript:void(0)" className="btnsho8">Edit</a>
                                      </div>
                                    </div>
                                    <div className="book-destinationPanel">
                                      <div className="selectAddress">
                                        <select className="select-state" disabled>
                                          <option value="Andhra Pradesh">Manali</option>
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
                                        <input type="text" name="searchArea" defaultValue placeholder="Manali Bus Stand" className="startpoint form-control" disabled />
                                      </div>
                                    </div>
                                    <div className="editdrp" style={{display: 'none'}}>
                                      <div className="book-destinationPanel">
                                        <div className="selectAddress">
                                          <select className="select-state">
                                            <option value="Andhra Pradesh">Manali</option>
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
                                          <input type="text" name="searchArea" defaultValue placeholder="Client Droping point.." className="startpoint form-control" />
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col-sm-12">
                                    <div className="formtitle">
                                      <h5>Add Stoppage</h5>
                                      <div className="quedit"><a href="JavaScript:void(0)" className="btnsho9">Edit</a>
                                      </div>
                                    </div>
                                    <div className="addstoppage">
                                      <input type="text" id="myInput" onkeyup="myFunction()" placeholder="Search Stoppage..." title="Type in a name" />
                                      <div id="myUL">
                                        <div className="col-sm-3">
                                          <div className="stopbox">
                                            Chandigarh
                                            <a href="#"><i className="fa fa-times" /></a>
                                          </div>
                                        </div>
                                        <div className="col-sm-3"><div className="stopbox">Ambala <a href="#"><i className="fa fa-times" /></a></div></div>
                                        <div className="col-sm-3"><div className="stopbox">Chandigarh <a href="#"><i className="fa fa-times" /></a></div></div>
                                        <div className="col-sm-3"><div className="stopbox">Ambala <a href="#"><i className="fa fa-times" /></a></div></div>
                                      </div>
                                    </div>
                                    <div className="stoppageedit" style={{display: 'none'}}>
                                      <div className="addstoppage">
                                        <input type="text" id="myInput" onkeyup="myFunction()" placeholder="Search Stoppage..." />
                                        <div id="myUL">
                                          <div className="col-sm-3">
                                            <div className="stopbox">
                                              Chandigarh
                                              <a href="#"><i className="fa fa-times" /></a>
                                            </div>
                                          </div>
                                          <div className="col-sm-3"><div className="stopbox">Ambala <a href="#"><i className="fa fa-times" /></a></div></div>
                                          <div className="col-sm-3"><div className="stopbox">Chandigarh <a href="#"><i className="fa fa-times" /></a></div></div>
                                          <div className="col-sm-3"><div className="stopbox">Ambala <a href="#"><i className="fa fa-times" /></a></div></div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col-sm-6">
                                    <div className="formtitle">
                                      <h5>Inclusions</h5>
                                      <div className="quedit"><a href="JavaScript:void(0)" className="btnsho10">Edit</a>
                                      </div>
                                    </div>
                                    <div className="form-group">
                                      <textarea name="w3review" rows={4} cols={50} className="form-control" placeholder="State Tax, Toll Tax Driver allowance Taxes" disabled defaultValue={""} />
                                    </div>
                                    <div className="inclusionsedit" style={{display: 'none'}}>
                                      <div className="formtitle">
                                        <h5>Inclusions</h5>
                                        <div className="quedit">
                                          <div className="form-group">
                                            <select className="form-control" id="exampleFormControlSelect1">
                                              <option>Add Inclusions</option>
                                              <option>Add Inclusions</option>
                                            </select>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="form-group">
                                        <textarea name="w3review" rows={4} cols={50} className="form-control" defaultValue={""} />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-sm-6">
                                    <div className="formtitle">
                                      <h5>Exclusions</h5>
                                      <div className="quedit"><a href="JavaScript:void(0)" className="btnsho11">Edit</a>
                                      </div>
                                    </div>
                                    <div className="form-group">
                                      <textarea name="w3review" rows={4} cols={50} className="form-control" placeholder="Parking
Night time allowance (11:00 PM to 06:00 AM)
Additional place/destination visit Any type of Permits and Entrance fees" disabled defaultValue={""} />
                                    </div>
                                    <div className="exclusionsedit" style={{display: 'none'}}>
                                      <div className="formtitle">
                                        <h5>Exclusions</h5>
                                        <div className="quedit">
                                          <div className="form-group">
                                            <select className="form-control" id="exampleFormControlSelect1">
                                              <option>Add Exclusions</option>
                                              <option>Add Exclusions</option>
                                            </select>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="form-group">
                                        <textarea name="w3review" rows={4} cols={50} className="form-control" defaultValue={""} />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>{/*END*/}
                            {/*Vehical Details*/}
                            <div className="createquotation vehicledetail">
                              <div className="bookingheader">
                                <div className="row">
                                  <div className="col-sm-7">
                                    <div className="bookdetail">
                                      <h3>Vehicle Details</h3>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="quotationbooked quotaedit">
                                <div className="row">
                                  <div className="col-sm-4">
                                    <div className="formtitle">
                                      <h5>Cab Details</h5>
                                      <div className="quedit"><a href="JavaScript:void(0)" className="btnsho12">Edit</a>
                                      </div>
                                    </div>
                                    <div className="form-group">
                                      <select className="custom-select form-control" id="inputGroupSelect01" disabled>
                                        <option selected>Hatchback</option>
                                        <option value={1}>One</option>
                                        <option value={2}>Two</option>
                                        <option value={3}>Three</option>
                                      </select>
                                    </div>
                                    <div className="cabdetailedit" style={{display: 'none'}}>
                                      <div className="form-group">
                                        <select className="custom-select form-control" id="inputGroupSelect01">
                                          <option selected>Select Cab Type..</option>
                                          <option value={1}>One</option>
                                          <option value={2}>Two</option>
                                          <option value={3}>Three</option>
                                        </select>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-sm-4">
                                    <div className="formtitle">
                                      <h5>Cab Modal</h5>
                                      <div className="quedit"><a href="JavaScript:void(0)" className="btnsho13">Edit</a>
                                      </div>
                                    </div>
                                    <div className="form-group">
                                      <input type="text" name="title" placeholder="Dezire" className="form-control" disabled />
                                    </div>
                                    <div className="cabmodaledit" style={{display: 'none'}}>
                                      <div className="form-group">
                                        <input type="text" name="title" placeholder="Ex:Dezire" className="form-control" />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-sm-4">
                                    <div className="formtitle">
                                      <h5>Cab Number</h5>
                                      <div className="quedit"><a href="JavaScript:void(0)" className="btnsho19">Edit</a>
                                      </div>
                                    </div>
                                    <div className="form-group">
                                      <input type="text" name="title" placeholder="DL 35 CL 9867" className="form-control" disabled />
                                    </div>
                                    <div className="cabnumber" style={{display: 'none'}}>
                                      <div className="form-group">
                                        <input type="text" name="title" placeholder="DL 35 CL 9867" className="form-control" />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col-sm-4">
                                    <div className="formtitle">
                                      <h5>Sitting Capacity</h5>
                                      <div className="quedit"><a href="JavaScript:void(0)" className="btnsho15">Edit</a>
                                      </div>
                                    </div>
                                    <div className="form-group">
                                      <input type="text" name="title" placeholder={4} className="form-control" disabled />
                                    </div>
                                    <div className="sittingedit" style={{display: 'none'}}>
                                      <div className="form-group">
                                        <input type="text" name="title" placeholder="Ex:7" className="form-control" disabled />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-sm-4">
                                    <div className="formtitle">
                                      <h5>Luggage Space</h5>
                                      <div className="quedit"><a href="JavaScript:void(0)" className="btnsho16">Edit</a>
                                      </div>
                                    </div>
                                    <div className="form-group">
                                      <select className="custom-select form-control" id="inputGroupSelect01" disabled>
                                        <option selected>2</option>
                                        <option value={1}>1</option>
                                        <option value={2}>2</option>
                                        <option value={3}>3</option>
                                        <option value={4}>4</option>
                                        <option value={5}>5</option>
                                        <option value={6}>6</option>
                                      </select>
                                    </div>
                                    <div className="luggageedit" style={{display: 'none'}}>
                                      <div className="form-group">
                                        <select className="custom-select form-control" id="inputGroupSelect01">
                                          <option selected>Select Number of Bag..</option>
                                          <option value={1}>1</option>
                                          <option value={2}>2</option>
                                          <option value={3}>3</option>
                                          <option value={4}>4</option>
                                          <option value={5}>5</option>
                                          <option value={6}>6</option>
                                        </select>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-sm-4">
                                    <div className="formtitle">
                                      <h5>Total Kilometers</h5>
                                      <div className="quedit"><a href="JavaScript:void(0)" className="btnsho14">Edit</a>
                                      </div>
                                    </div>
                                    <div className="form-group">
                                      <input type="text" name="title" placeholder={570} className="form-control" disabled />
                                    </div>
                                    <div className="kilometeredit" style={{display: 'none'}}>
                                      <div className="form-group">
                                        <input type="text" name="title" placeholder="Ex:570" className="form-control" />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col-sm-6">
                                    <div className="formtitle">
                                      <h5>Driver Name</h5>
                                      <div className="quedit"><a href="JavaScript:void(0)" className="btnsho20">Edit</a>
                                      </div>
                                    </div>
                                    <div className="form-group">
                                      <select className="custom-select form-control" id="inputGroupSelect01" disabled>
                                        <option selected>Manoj Singh</option>
                                        <option value={1}>One</option>
                                        <option value={2}>Two</option>
                                        <option value={3}>Three</option>
                                      </select>
                                    </div>
                                    <div className="driveredit" style={{display: 'none'}}>
                                      <div className="form-group">
                                        <select className="custom-select form-control" id="inputGroupSelect01">
                                          <option selected>Select Driver Name..</option>
                                          <option value={1}>One</option>
                                          <option value={2}>Two</option>
                                          <option value={3}>Three</option>
                                        </select>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-sm-6">
                                    <div className="formtitle">
                                      <h5>Mobile Number</h5>
                                      <div className="quedit"><a href="JavaScript:void(0)" className="btnsho21">Edit</a>
                                      </div>
                                    </div>
                                    <div className="form-group">
                                      <input type="text" name="title" placeholder={9200929292} className="form-control" disabled />
                                    </div>
                                    <div className="mobilenoledit" style={{display: 'none'}}>
                                      <div className="form-group">
                                        <input type="text" name="title" placeholder="Mobile Number" className="form-control" />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col-sm-12">
                                    <div className="formtitle">
                                      <h5>Note:(Optional)</h5>
                                      <div className="quedit"><a href="JavaScript:void(0)" className="btnsho17">Edit</a>
                                      </div>
                                    </div>
                                    <div className="form-group">
                                      <textarea name="w3review" rows={4} cols={50} className="form-control" disabled defaultValue={""} />
                                    </div>
                                    <div className="noteedit" style={{display: 'none'}}>
                                      <div className="form-group">
                                        <textarea name="w3review" rows={4} cols={50} className="form-control" defaultValue={""} />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>{/*END*/}
                            {/*End*/}
                            <div className="placebid">
                              <div className="bookingheader">
                                <div className="row">
                                  <div className="col-sm-12">
                                    <div className="bookdetail">
                                      <h3>Payment Detail</h3>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="placebidbook">
                                <div className="row">
                                  <div className="col-sm-6">
                                    <div className="paymentpart">
                                      Payment Partition
                                    </div>
                                    <div className="paypart">
                                      <table className="table">
                                        <tbody>
                                          <tr>
                                            <td>1) First Part</td>
                                            <td> <i className="fa fa-inr" /> 3000</td>
                                            <td> <b>Paid</b> <a href="#"><i className="fa fa-eye" /></a></td>
                                          </tr>
                                          <tr>
                                            <td>2) Second Part</td>
                                            <td><i className="fa fa-inr" /> 3000</td>
                                            <td><span>Unpaid</span></td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </div>
                                  </div>
                                  <div className="col-sm-6">
                                    <div className="totalpay">
                                      <table className="table">
                                        <tbody>
                                          <tr>
                                            <td className="lablename">Total Amount of whole Trip :</td>
                                            <td className="payprice"> <i className="fa fa-inr" /> 6000</td>
                                          </tr>
                                          <tr>
                                            <td className="lablename">Service Charge 10% :</td>
                                            <td className="payprice"> <i className="fa fa-inr" /> 600</td>
                                          </tr>
                                          <tr>
                                            <td className="lablename">GST 5% :</td>
                                            <td className="payprice"> <i className="fa fa-inr" /> 300</td>
                                          </tr>
                                          <tr>
                                            <td className="lablename">Net Amount :</td>
                                            <td className="payprice"> <i className="fa fa-inr" /> <b>6900</b></td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="placebidbtn movebtn">
                              <a href="#" className="btn btn-primary">Save</a><a href="#" className="btn btn-primary">Move to Booked</a><a href="#" className="btn btn-primary">Cancel This Booking</a>
                            </div>
                          </div>{/*End*/}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* User Listing End*/}
          </div>
        </main>
      </div>
     </div>
  )  
}  
  
export default Bookings