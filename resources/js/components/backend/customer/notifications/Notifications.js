import React from 'react'  
import axios from 'axios';  
import { useHistory, useLocation } from 'react-router-dom'

import { useState, useEffect } from 'react'  
function Notifications(props) { 

  const history = useHistory()

  const [noticeData, setNoticeData] = useState([]);  
  const [userId, setUserId] = useState(0);

  useEffect(() => {  
  	let stateqq = localStorage["appState"];
  	if (stateqq) {
  		let AppState = JSON.parse(stateqq);
  		setUserId(AppState.user.id);
  		axios.get('/api/notifications/'+AppState.user.id)
  		.then(result=>{
  			setNoticeData(result.data);
  		});
  	}  
  }, []);  

  return (  
     <div className="notification-page">
        {/* Page Heading */}
        <h1>Notification</h1>
        <div className="booknotification">
          <div className="bookingnotify">
            <ul className="list-unstyled">
              <li><a href="#">Booking ID 0000000</a><span>payment is pending.</span></li>
              <li><span>Admin paid <i className="fa fa-inr" /> 5500 check payout </span><a href="#">details</a></li>
              <li><a href="#">Booking ID 0000000</a> <span>Provided feedback for completing tour</span><a href="#">check review</a></li>
              <li><a href="#">Rajeev singh</a> <span>posted a new booking</span><a href="#">check details</a></li>
              <li><a href="#">Rahul Kumar</a> <span>create a dispute check dispute</span><a href="#">details</a></li>
              <li><span>Admin paid <i className="fa fa-inr" /> 5500 check payout </span><a href="#">details</a></li>
              <li><a href="#">Booking ID 0000000</a> <span>Provided feedback for completing tour</span><a href="#">check review</a></li>
              <li><a href="#">Rahul Kumar</a> <span>create a dispute check dispute</span><a href="#">details</a></li>
              <li><a href="#">Rajeev singh</a> <span>posted a new booking</span><a href="#">check details</a></li>
              <li><a href="#">Rahul Kumar</a> <span>create a dispute check dispute</span><a href="#">details</a></li>
              <li><span>Admin paid <i className="fa fa-inr" /> 5500 check payout </span><a href="#">details</a></li>
              <li><a href="#">Rajeev singh</a> <span>posted a new booking</span><a href="#">check details</a></li>
              <li><a href="#">Rahul Kumar</a> <span>create a dispute check dispute</span><a href="#">details</a></li>
            </ul>
          </div>
        </div>
      </div>
  )  
}  
  
export default Notifications