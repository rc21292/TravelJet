import React from 'react';
import ReactDOM from 'react-dom';
import Bookings from './bookings/Bookings';
import Users from './users/Users';
import { useState, useEffect } from 'react'
import Moment from 'react-moment';
import { useHistory } from "react-router-dom";
import {BrowserRouter as Router, Link, Route, Redirect} from 'react-router-dom';

import Pagination from "react-js-pagination";


function Home(props) {

  const [user, setUser] = useState(false);

  const [activePage, setActivePage] = useState(1);  
  const [itemsCountPerPage, setItemsCountPerPage] = useState(1);  
  const [fromCount, setFromCount] = useState(1);  
  const [toCount, setToCount] = useState(1);  
  const [totalPages, setTotalPages] = useState(1);  
  const [totalItemsCount, setTotalItemsCount] = useState(1);    
  const [pageRangeDisplayed, setPageRangeDisplayed] = useState(3);
  const [userId, setUserId] = useState(props.user_id);
  const [traderCount, setTraderCount] = useState(false);
  const [totalCommission, setTotalCommission] = useState(0);
  const [customerCount, setCustomerCount] = useState(false);
  const [bookingsData, setBookingsData] = useState(false);
  const [confirmedBookingsData, setConfirmedBookingsData] = useState(false);
  const [transactionsData, setTransactionsData] = useState([]);  
  const [notifications, setNotifications] = useState([]);  
  const [bookedBookingData, setBookedBookingData] = useState([]);
  const [requestedPayouts, setRequestedPayouts] = useState([]);

  let history = useHistory();

  useEffect(() => {

    axios.get("/api/users/show/"+userId).then(response => {
      return response;
    }).then(json => {
      if (json.data) {
        let userData = {
          id: json.data.id,
          name: json.data.name,
          gender: json.data.gender,
          email: json.data.email,
          phone: json.data.phone,
          role: json.data.role,
        };
        let appState = {
          isLoggedIn: true,
          user: userData
        };
        setUser(appState.user);
        localStorage["appState"] = JSON.stringify(appState);
      }
    });
    axios.get('/api/getAdminDashboardData/')
    .then(result=>{
      setTraderCount(result.data.trader_count)
      setTotalCommission(result.data.total_commission)
      setCustomerCount(result.data.customer_count)
      setBookingsData(result.data.bookings)
      setConfirmedBookingsData(result.data.confirmed_bookings)
      setTransactionsData(result.data.transactions.data)
      setRequestedPayouts(result.data.payouts.data)
    });

    axios('/api/getAdminNotifications').then(result=>{
      setNotifications(result.data.data);  
      setItemsCountPerPage(result.data.per_page);  
      setTotalItemsCount(result.data.total);  
      setActivePage(result.data.current_page);
      setFromCount(result.data.from);  
      setToCount(result.data.to);  
      setTotalPages(result.data.last_page);  
    });

    axios.get('/api/getBookingsBooked')
    .then(result=>{
      setBookedBookingData(result.data.data);
    });

  },[]); 

  const handlePageChange = (pageNumber) => {
    axios.get('/api/getAdminNotifications?page='+pageNumber)
    .then(result=>{
      setNotifications(result.data.data);  
      setItemsCountPerPage(result.data.per_page);  
      setTotalItemsCount(result.data.total);  
      setActivePage(result.data.current_page);
      setFromCount(result.data.from);  
      setToCount(result.data.to);  
      setTotalPages(result.data.last_page);  
    });
  }

	return (
		<div id="content-wrapper">
        {/* Main Content */}
        <div id="content">
          {/* Begin Page Content */}
          <div className="container-fluid">
            <div className="bashboard notification-page">
              <div className="row">
                <div className="col-sm-3">
                  <div className="card">
                    <div className="card-content">
                      <div className="card-body py-3">
                        <div className="row">
                          <div className="col-sm-8">
                            <div className="line-ellipsis">Total Agents</div>
                            <div className="agentname">
                              <span>{traderCount}</span>
                            </div>
                          </div>
                          <div className="col-sm-4">
                            <div className="usericon">
                              <i className="fa fa-user" />
                            </div>
                            <div className="viewmore">
                              <a href="/admin/agents">View</a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-sm-3">
                  <div className="card">
                    <div className="card-content">
                      <div className="card-body py-3">
                        <div className="row">
                          <div className="col-sm-8">
                            <div className="line-ellipsis">Total Customers</div>
                            <div className="agentname">
                              <span>{customerCount}</span>
                            </div>
                          </div>
                          <div className="col-sm-4">
                            <div className="usericon">
                              <i className="fa fa-user" />
                            </div>
                            <div className="viewmore">
                              <a href="/admin/customers">View</a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-sm-3">
                  <div className="card">
                    <div className="card-content">
                      <div className="card-body py-3">
                        <div className="row">
                          <div className="col-sm-8">
                            <div className="line-ellipsis">Total Booking</div>
                            <div className="agentname">
                              <span>{bookingsData}</span>
                            </div>
                          </div>
                          <div className="col-sm-4">
                            <div className="usericon">
                              <i className="fa fa-file" />
                            </div>
                            <div className="viewmore">
                              <a href="#">View</a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-sm-3">
                  <div className="card">
                    <div className="card-content">
                      <div className="card-body py-3">
                        <div className="row">
                          <div className="col-sm-8">
                            <div className="line-ellipsis">Total Booked</div>
                            <div className="agentname">
                              <span>{confirmedBookingsData }</span>
                            </div>
                          </div>
                          <div className="col-sm-4">
                            <div className="usericon">
                              <i className="fa fa-file" />
                            </div>
                            <div className="viewmore">
                              <a href="#">View</a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-8">
                  <div className="transactiondiv">
                    <div className="cardbg total-transaction">
                      <div className="card-header">
                        <h4 className="card-title">Recent Transactions</h4>
                      </div>
                      <div className="card-body">
                        <table className="table leadstatus">
                          <thead className="thead-secondary">
                            <tr>
                              <th scope="col" style={{width:'12%'}} className="bd">Date</th>
                              <th scope="col">Transaction Detail</th>
                              <th scope="col">Amount</th>
                            </tr>
                          </thead>
                          <tbody>
                            {transactionsData.map((query,i)=>{
                           return(
                           <tr key={i}>
                              <td><Moment format="DD-MMM-YYYY">{query.created_at}</Moment></td>
                              <td dangerouslySetInnerHTML={{__html: query.description}} ></td>
                              <td><i className="fa fa-inr" /> {query.amount}</td>
                           </tr>
                           )
                           })
                           }
                            <tr>
                              <td colSpan={5}>
                                <div className="placebidbtn">
                                  <a href="/admin/transaction-history" className="btn btn-primary">View All Transactions</a>
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-sm-4">
                  <div className="row">
                    <div className="col-sm-12">
                      <div className="cardbg total-transaction">
                        <div className="card-header">
                          <h4 className="card-title">Welcome back</h4>
                        </div>
                        <div className="card-body">
                          <div className="useremail">
                            <h3>{user.name}</h3>
                            <span>{user.email}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-12">
                      <div className="cardbg total-transaction">
                        <div className="card-header">
                          <h4 className="card-title">Total Commision</h4>
                        </div>
                        <div className="card-body">
                          <div className="commision">
                            <h5><i className="fa fa-inr"/> {totalCommission} </h5>
                          </div>
                        </div>
                        <div className="placebidbtn viewcommision">
                          <a href="/admin/transaction-history" className="btn btn-primary">View Commision</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-6">
                <div className="row">
                  <div className="col-sm-12">
                    <div className="cardbg total-transaction">
                      <div className="card-header">
                        <h4 className="card-title">Payout</h4>
                      </div>
                      <div className="card-body">
                        <table className="table leadstatus">
                          <tbody>
                          {requestedPayouts.map((payout,i)=>{
                            return(
                            <tr key={i}>
                              <td>{payout.name} requested payment of <i className="fa fa-inr" /> {payout.amount}</td>
                              <td><a href="/admin/pending-payouts" className="btn btn-primary">View</a></td>
                            </tr>
                            )
                          })
                          }
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-12">
                    <div className="cardbg total-transaction">
                      <div className="card-header">
                        <h4 className="card-title">Recent Booked</h4>
                      </div>
                      <div className="card-body">
                        <table className="table leadstatus">
                          <thead className="thead-secondary">
                            <tr>
                              <th scope="col">Booking Type</th>
                              <th scope="col" style={{width:'15%'}}>Start Date</th>
                              <th scope="col" style={{width:'15%'}}>End Date</th>
                              <th scope="col">Source</th>
                              <th scope="col">Destination</th>
                            </tr>
                          </thead>
                          <tbody>
                             {bookedBookingData.map((query,i)=>{
                               return(
                               <tr key={i}>
                                  <td>{query.booking_type}</td>
                                  <td><Moment format="DD-MM-YYYY">{query.depart}</Moment></td>
                                  <td><Moment format="DD-MM-YYYY">{query.arrival}</Moment></td>
                                  <td>{query.from_places}</td>
                                  <td>{query.to_places}</td>
                               </tr>
                               )
                               })
                             }
                            <tr>
                              <td>One Way</td>
                              <td>30-07-2020</td>
                              <td>30-07-2020</td>
                              <td>Delhi</td>
                              <td>Manali</td>
                            </tr>
                            <tr>
                              <td colSpan={5}>
                                <div className="placebidbtn">
                                  <a href="#" className="btn btn-primary">View All Booked</a>
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-6">
                <div className="transactiondiv">
                  <div className="cardbg total-transaction">
                    <div className="card-header">
                      <h4 className="card-title">Recent Activity</h4>
                    </div>
                    <div className="card-body">
                      <table className="table leadstatus">
                        <tbody>
                        {notifications.map((query,i)=>{
                           return(
                           <tr key={i}>
                              <td dangerouslySetInnerHTML={{__html: query.data}} ></td>
                           </tr>
                           )
                           })
                           }   
                           <tr>
                            <td colSpan={5}>
                              <div className="col-sm-6">
                                <Pagination 
                          activePage={activePage}
                          itemsCountPerPage={itemsCountPerPage}
                          totalItemsCount={totalItemsCount}
                          pageRangeDisplayed={pageRangeDisplayed}
                          onChange={handlePageChange}
                          itemClass="page-item"
                          linkClass="page-link"
                          />
                              </div>
                              <div className="col-sm-6">
                                <div className="showpage">Showing {fromCount} to {toCount} of {totalItemsCount} ({totalPages} Pages)</div>
                              </div>
                            </td>
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

	export default Home;