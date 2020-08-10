import React from 'react';
import ReactDOM from 'react-dom';
import Bookings from './bookings/Bookings';
import { useState, useEffect } from 'react'
import {BrowserRouter as Router, Link, Route, Redirect} from 'react-router-dom';

function Home() {

	const [user, setUser] = useState(false);
	const [balance, setBalance] = useState(0);
	 const [noticeData, setNoticeData] = useState([]);  
	 const [bookingData, setBookingData] = useState([]);  

	useEffect(() => {
		
		let stateqq = localStorage["appState"];
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
			axios.get('/api/notifications/'+AppState.user.id)
		  		.then(result=>{
		  			setNoticeData(result.data);
	  		});
		  	axios.get('/api/queries')
		  		.then(result=>{
		  			setBookingData(result.data.data);
	  		});
		}   

	},[]); 

	return (            
      <div className="bashboard notification-page">
        {/* Page Heading */}
        <div className="row">
          <div className="col-sm-4">
            <div className="card text-center">
              <div className="card-content">
                <div className="card-body py-3">
                  <div className="line-ellipsis">Welcome Back</div>
                  <div className="agentname">
                    <h3>{user.name}</h3>
                    <span>{user.email}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-4">
            <div className="card text-center">
              <div className="card-content">
                <div className="card-body py-3">
                  <div className="line-ellipsis">Wallet</div>
                  <div className="agentname">
                    <h3>Balance <i className="fa fa-inr" /> 5931</h3>
                    <span><br/></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-4">
            <div className="card text-center">
              <div className="card-content">
                <div className="card-body py-3">
                  <div className="line-ellipsis">Total Booking</div>
                  <div className="agentname">
                    <h3>56</h3>
                    <span><br/></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            <h4>Recently Booked</h4>
            <table className="table table-bordered leadstatus">
              <thead className="thead-secondary">
                <tr>
                  <th scope="col" className="bd">Booking ID</th>
                  <th scope="col">Customer Name</th>
                  <th scope="col">Destination</th>
                  <th scope="col" className="sd">Start Date</th>
                  <th scope="col">Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>0000000</td>
                  <td>Rahul Kumar</td>
                  <td>Manali</td>
                  <td>14-Jul-20</td>
                  <td><i className="fa fa-inr" /> 6000</td>
                </tr>
                <tr>
                  <td>0000000</td>
                  <td>Rahul Kumar</td>
                  <td>Manali</td>
                  <td>14-Jul-20</td>
                  <td><i className="fa fa-inr" /> 6000</td>
                </tr>
                <tr>
                  <td>0000000</td>
                  <td>Rahul Kumar</td>
                  <td>Manali</td>
                  <td>14-Jul-20</td>
                  <td><i className="fa fa-inr" /> 6000</td>
                </tr>
                <tr>
                  <td>0000000</td>
                  <td>Rahul Kumar</td>
                  <td>Manali</td>
                  <td>14-Jul-20</td>
                  <td><i className="fa fa-inr" /> 6000</td>
                </tr>
                <tr>
                  <td>0000000</td>
                  <td>Rahul Kumar</td>
                  <td>Manali</td>
                  <td>14-Jul-20</td>
                  <td><i className="fa fa-inr" /> 6000</td>
                </tr>
                 <tr>
                    <td colspan="5">
                   <div class="placebidbtn">
                      <a href="#" class="btn btn-primary">View More</a>
                    </div>
                  </td>
                  </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            <h4>News Feed</h4>
            <div className="booknotification">
              <div className="bookingnotify">
                <ul className="list-unstyled">
                  <li><a href="#">Booking ID 0000000</a><span>payment is pending.</span></li>
                  <li><span>Admin paid <i className="fa fa-inr" /> 5500 check payout </span><a href="#">details</a></li>
                  <li><a href="#">Booking ID 0000000</a> <span>Provided feedback for completing tour</span><a href="#">check review</a></li>
                  <li><a href="#">Rajeev singh</a> <span>posted a new booking</span><a href="#">check details</a></li>
                  <li><a href="#">Rahul Kumar</a> <span>create a dispute check dispute</span><a href="#">details</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>			  
		);
	}

	export default Home;