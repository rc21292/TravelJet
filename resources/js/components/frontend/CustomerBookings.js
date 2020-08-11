import React from 'react'  
import axios from 'axios';  
import { useHistory, useLocation } from 'react-router-dom'

import Pagination from "react-js-pagination";
import { useState, useEffect } from 'react'  

function CustomerBookings(props) { 

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
                        <aside id="wt-sidebar" className="wt-sidebar wt-usersidebar viewbookingleft">
                          <div className="wt-widget wt-effectiveholder">
                            <div className="wt-widgettitle">
                              <h2>About the Agent</h2>
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
                                    <div className="headerbudget totalcost">
                                      <div className="budgetprice">
                                        <b>Total Cost:</b> <i className="fa fa-inr" /> 3500 - 5500
                                      </div>
                                      <span>Booking ID:0000000</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="bookeddetail conformbooked">
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
                                            <td><span>Unpaid</span> <a href="#" className="btn btn-primary">Pay Now</a> </td>
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
                              <a href="#" className="btn btn-primary">Cancel This Booking</a>
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
  )  
}  
  
export default CustomerBookings