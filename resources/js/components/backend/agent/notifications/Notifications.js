import React from 'react'  
import axios from 'axios';  
import { useHistory, useLocation } from 'react-router-dom'

import Pagination from "react-js-pagination";
import { useState, useEffect } from 'react'  
function Notifications(props) { 

  const history = useHistory()

  const [noticeData, setNoticeData] = useState([]);  
  const [userId, setUserId] = useState(0);


  const [activePage, setActivePage] = useState(1);  
  const [itemsCountPerPage, setItemsCountPerPage] = useState(1);  
  const [totalItemsCount, setTotalItemsCount] = useState(1); 
  const [pageRangeDisplayed, setPageRangeDisplayed] = useState(3);

  useEffect(() => {  
  	let stateqq = localStorage["appState"];
  	if (stateqq) {
  		let AppState = JSON.parse(stateqq);
  		setUserId(AppState.user.id);
  		axios.get('/api/notifications/'+AppState.user.id)
  		.then(result=>{
  			setNoticeData(result.data.data);
        setItemsCountPerPage(result.data.per_page);  
         setTotalItemsCount(result.data.total);  
         setActivePage(result.data.current_page); 
  		});
  	}  
  }, []);  


  const handlePageChange = (pageNumber) => {
  axios.get('/api/notifications/'+userId+'?page='+pageNumber)
  .then(result=>{
    setNoticeData(result.data.data);
        setItemsCountPerPage(result.data.per_page);  
         setTotalItemsCount(result.data.total);  
         setActivePage(result.data.current_page); 
  });
}

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
            <ul className="list-unstyled clearfix">
            <li>
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
                </li>
            </ul>            
          </div>
        </div>
      </div>
  )  
}  
  
export default Notifications