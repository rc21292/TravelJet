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
            {
                noticeData.map((query, idx) => {  
                return  <li key={idx} dangerouslySetInnerHTML={{__html: query.data}} ></li>
                })
              }   
            </ul>
          </div>
        </div>
      </div>
  )  
}  
  
export default Notifications