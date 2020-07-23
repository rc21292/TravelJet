import React from 'react';
import ReactDOM from 'react-dom';
import Bookings from './bookings/Bookings';
import Users from './users/Users';
import { useState, useEffect } from 'react'
import {BrowserRouter as Router, Link, Route, Redirect} from 'react-router-dom';



function Home() {

	const [user, setUser] = useState(false);
	const [traderCount, setTraderCount] = useState(false);
	const [customerCount, setCustomerCount] = useState(false);
	const [bookingsData, setBookingsData] = useState(false);
	const [confirmedBookingsData, setConfirmedBookingsData] = useState(false);
	const [balance, setBalance] = useState(0);
	const [transactionsData, setTransactionsData] = useState([]);  
	const [userssData, setUserssData] = useState([]);
	const [noticeData, setNoticeData] = useState([]);  
	const [bookingData, setBookingData] = useState([]);  

	useEffect(() => {


		let stateqq = localStorage["appState"];
		// console.log(stateqq);
		if (stateqq) {
			let AppState = JSON.parse(stateqq);
			setUser(AppState.user);
			if (AppState.isLoggedIn == false) {
				history.push('/login');
			}
			axios.get('/api/users/getbalance/'+AppState.user.id)
				.then(response=>{
					setBalance(response.data.balance);
			});

		  	axios.get('/api/getdashboardData/'+AppState.user.id)
		  	.then(result=>{
		  		setTraderCount(result.data.trader_count)
		  		setCustomerCount(result.data.customer_count)
		  		setBookingsData(result.data.bookings)
		  		setConfirmedBookingsData(result.data.confirmed_bookings)
		  		setTransactionsData(result.data.transactions.data)
		  		setUserssData(result.data.users_data.data)
		  		setNoticeData(result.data.notices.data);
		  	});

		  	axios.get('/api/queries')
		  		.then(result=>{
		  			setBookingData(result.data.data);
	  		});
		}   

	},[]); 



	return (
		<div className="ms-content-wrapper">
		   <div className="row">
		      <div className="col-xl-3 col-md-6">
		         <div className="ms-card card-gradient-success ms-widget ms-infographics-widget">
		            <div className="ms-card-body media">
		               <div className="media-body">
		                  <h6>Total Agent</h6>
		                  <p className="ms-card-change"> <i className="material-icons">arrow_upward</i> { traderCount }</p>
		               </div>
		            </div>
		            <i className="flaticon-archive" />
		         </div>
		      </div>
		      <div className="col-xl-3 col-md-6">
		         <div className="ms-card card-gradient-secondary ms-widget ms-infographics-widget">
		            <div className="ms-card-body media">
		               <div className="media-body">
		                  <h6>Total Customer</h6>
		                  <p className="ms-card-change"> { customerCount }</p>
		               </div>
		            </div>
		            <i className="flaticon-supermarket" />
		         </div>
		      </div>
		      <div className="col-xl-3 col-md-6">
		         <div className="ms-card card-gradient-warning ms-widget ms-infographics-widget">
		            <div className="ms-card-body media">
		               <div className="media-body">
		                  <h6>Total Booking</h6>
		                  <p className="ms-card-change"> <i className="material-icons">arrow_upward</i> { bookingsData }</p>
		               </div>
		            </div>
		            <i className="flaticon-reuse" />
		         </div>
		      </div>
		      <div className="col-xl-3 col-md-6">
		         <div className="ms-card card-gradient-info ms-widget ms-infographics-widget">
		            <div className="ms-card-body pos media">
		               <div className="media-body">
		                  <h6>Confirmed Booking</h6>
		                  <p className="ms-card-change"> { confirmedBookingsData }</p>
		               </div>
		            </div>
		            <i className="fas fa-cannabis" />
		         </div>
		      </div>
		      <div className="col-xl-8 col-md-12">
		         <div className="ms-panel">
		            <div className="ms-panel-header  ms-panel-custom">
		               <div className="col-sm-6">
		                  <h6>Recent Transactions</h6>
		               </div>
		               <div className="col-sm-6">
		                  <div style={{ float:'right'}}>
		                     <Link to={'admin/transactions'} className="btn btn-gradient-info">More</Link>
		                  </div>
		               </div>
		            </div>
		            <div className="ms-panel-body">
		               <div className="table-responsive">
			               <table className="table table-hover table-striped">
			                  <thead>
			                     <tr>
			                        <th scope="col">Date</th>
			                        <th scope="col">Transaction Detail</th>
			                        <th scope="col">Amount</th>
			                     </tr>
			                  </thead>
			                  <tbody>
			                     {transactionsData.map((query,i)=>{
			                     return(
			                     <tr key={i}>
			                        <td>{query.created_at}</td>
			                        <td dangerouslySetInnerHTML={{__html: query.description}} ></td>
			                        <td>{query.amount}</td>
			                     </tr>
			                     )
			                     })
			                     }
			                  </tbody>
			               </table>
			               <hr/>
	                  <center>
	                     <Link to="/admin/transactions" className="btn btn-pill btn-gradient-info">More Transactions</Link>
	                  </center>
		            </div>
		         </div>
		      </div>
		      </div>
		      <div className="col-xl-4 col-md-12">
		         <div className="ms-panel">
		            <div className="ms-panel-header  ms-panel-custom">
		               <div >
		                  <h6>Latest Users</h6>
		               </div>
		            </div>
		               <div className="ms-panel-body">
			              <table className="table table-hover table-striped">
			                  <thead>
			                     <tr>
			                        <th scope="col">Name</th>
			                        <th scope="col">Role</th>
			                        <th scope="col">Action</th>
			                     </tr>
			                  </thead>
			                  <tbody>
			                     {userssData.map((query,i)=>{
			                     return(
			                     <tr key={i}>
			                        <td><img src="http://worksheriff.com/images/user.jpg"/></td>
			                        <td>{query.name}<br/>{query.role}</td>
			                        <td><Link to={'/admin/user/'+query.id} className="btn btn-sm btn-warning">View</Link></td>
			                     </tr>
			                     )
			                     })
			                     }
			                  </tbody>
			               </table>
			               <hr/>
	                  <center>
	                     <Link to="/admin/users" className="btn btn-pill btn-gradient-info">More Users</Link>
	                  </center>
		         </div>
		         </div>
		      </div>
		       <div className="col-xl-8 col-md-12">
		         <div className="ms-panel">
		            <div className="ms-panel-header  ms-panel-custom">
		               <div className="col-sm-6">
		                  <h6>Recent Bookings</h6>
		               </div>
		               <div className="col-sm-6">
		                  <div style={{ float:'right'}}>
		                     <Link to={'admin/bookings'} className="btn btn-gradient-info">More</Link>
		                  </div>
		               </div>
		            </div>
		            <div className="ms-panel-body">
			               <table className="table table-hover table-striped">
			                  <thead>
			                     <tr>
			                        <th scope="col">Booking Type</th>
			                        <th scope="col">Start Date</th>
			                        <th scope="col">End Date</th>
			                        <th scope="col">Pick Up</th>
			                        <th scope="col">Destination</th>
			                        <th scope="col">Sight Seeing</th>
			                        <th scope="col">Cab Type</th>
			                     </tr>
			                  </thead>
			                  <tbody>
			                     {bookingData.map((query,i)=>{
			                     return(
			                     <tr key={i}>
			                        <td>{query.booking_type}</td>
			                        <td>{query.start_at}</td>
			                        <td>{query.end_on}</td>
			                        <td>{query.pick_up}</td>
			                        <td>{query.destination}</td>
			                        <td>{query.sightseeing}</td>
			                        <td>{query.cab_type}</td>
			                     </tr>
			                     )
			                     })
			                     }
			                  </tbody>
			               </table>
			               <hr/>
	                  <center>
	                     <Link to="/admin/bookings" className="btn btn-pill btn-gradient-info">More Bookings</Link>
	                  </center>
		         </div>
		      </div>
		      </div>
		      <div className="col-xl-4 col-md-12">
		         <div className="">
		               <div className="ms-panel ms-panel-hoverable has-border ms-widget ms-has-new-msg ms-notification-widget">
		                  <div className="ms-panel-body media">
		                     <div className="media-body">
		                        <h6>Welcome back</h6>
		                        <hr/>
		                        <p>{user.name} ( {user.role} )</p>
		                        <p>{user.email}</p>
		                     </div>
		                  </div>
		               </div>
		         </div>
		      </div>
		      <div className="col-xl-10 col-md-12">
	            <div className="ms-panel">
	              <div className="ms-panel-header  ms-panel-custom">
	                <div className="ms-heading">
	                  <h6>Recent Activity</h6>
	                </div>
	              </div>
	              <div className="ms-panel-body">
	                <div className="table-responsive">
	                  <table className="table table-hover table-striped thead-primary">
	                     <tbody>
	                      {  
	                        noticeData.map((query, idx) => {  
	                        return  <tr key={idx}>
	                          <td className="ms-table-f-w"><span dangerouslySetInnerHTML={{__html: query.data}} ></span>
	                            <div style={{ marginLeft : '50px' }}><b>{query.created_at}</b>
	                            </div>
	                          </td>
	                        </tr>  
	                      })}  
	                    </tbody>
	                  </table>
	                   <hr/>
	                  <center>
	                     <Link to="/admin/notifications" className="btn btn-pill btn-gradient-info">View All</Link>
	                  </center>
	                </div>
	              </div>
	            </div>
	          </div>
		   </div>
		</div>
		);
	}

	export default Home;