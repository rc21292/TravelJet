import React from 'react';
import ReactDOM from 'react-dom';
import Bookings from './bookings/Bookings';
import { useState, useEffect } from 'react'
import {BrowserRouter as Router, Link, Route, Redirect} from 'react-router-dom';

function Home(props) {
  // console.log(props.user_id);

	const [user, setUser] = useState(false);
  const [userId, setUserId] = useState(props.user_id);
	const [balance, setBalance] = useState(0);
	 const [noticeData, setNoticeData] = useState([]);  
	 const [bookingData, setBookingData] = useState([]);  

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
		
			axios.get('/api/users/getbalance/'+userId)
				.then(response=>{
					setBalance(response.data.balance);
			});
			axios.get('/api/notifications/'+userId)
		  		.then(result=>{
		  			setNoticeData(result.data);
	  		});
		  	axios.get('/api/queries/'+userId)
		  		.then(result=>{
		  			setBookingData(result.data.data);
	  		});   

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
                    <h3>{(user) ? user.name : ''}</h3>
                    <span>{(user) ? user.email : ''}</span>
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
                {bookingData.map((query,i)=>{
                   return(
                   <tr key={i}>
                    <td>000000{query.id}</td>
                    <td>{query.name}</td>
                    <td>{query.to_places}</td>
                    <td>{query.arrival}</td>
                    <td><i className="fa fa-inr" /> 6000</td>
                  </tr>
                  )
                  })
                  }
                  <tr>
                   <td colSpan="5">
                     <div className="placebidbtn">
                       <a href="customer/bookings" className="btn btn-primary">View More</a>
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