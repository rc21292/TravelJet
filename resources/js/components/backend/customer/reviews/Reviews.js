import React from 'react'  
import axios from 'axios';  
import { useHistory, useLocation } from 'react-router-dom'

import Pagination from "react-js-pagination";
import { useState, useEffect } from 'react'  

import Moment from 'react-moment'

function Reviews(props) { 

  const history = useHistory()
  const location = useLocation()

  const [user, setUser] = useState(false);
  const [bookingId, setBookingId] = useState('');

  const [reviewsData, setReviewsData] = useState([]);  
  const [activePage, setActivePage] = useState(1);  
  const [itemsCountPerPage, setItemsCountPerPage] = useState(1);  
  const [totalItemsCount, setTotalItemsCount] = useState(1);  
  const [pageRangeDisplayed, setPageRangeDisplayed] = useState(5);  

  useEffect(() => {  
    let stateqq = localStorage["appState"];
    if (stateqq) {
      let AppState = JSON.parse(stateqq);
      setUser(AppState.user);
      axios.get('/api/queries/getBookedQueriesByUserId/'+AppState.user.id).then(result=>{
        setReviewsData(result.data.data); 
        setItemsCountPerPage(result.data.per_page);  
        setTotalItemsCount(result.data.total);  
        setActivePage(result.data.current_page);
      });
    }   

  }, []);  

  const reviewBooking = (id) => {
    history.push('/customer/review/'+id)
  };  

  const handlePageChange = (pageNumber) => {
    axios.get('/api/queries?status=posted'+'&page='+pageNumber)
    .then(result=>{
      setReviewsData(result.data.data);
      setItemsCountPerPage(result.data.per_page);  
      setTotalItemsCount(result.data.total);  
      setActivePage(result.data.current_page);
    });
  }

		return (
           <div>
            <div className="quotation-page">
                <h1>Reviews</h1>
                  <table className="table table-bordered booking">
                    <thead className="thead-primary">
                      <tr>
                        <th scope="col">Date</th>
                        <th scope="col">My Booking</th>
                        <th scope="col">Action</th>
                        <th scope="col" />
                      </tr>
                    </thead>
                    <tbody>
                      {reviewsData.map((booking,i)=>{
                        return( <tr key={i}>
                          <td><Moment format="DD-MMM-YYYY">{booking.date}</Moment></td>
                          <td>{booking.booking_name}</td>
                          <td>
                            <a href={'/customer/review/'+booking.id} class="btn btn-default">Give Your Feedback</a>
                          </td>                                
                        </tr>
                        )
                      })}
                    </tbody>
                  </table>
                  <div className="d-flex justify-content-center" style={{marginTop:'-20px'}}>
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
		);
	
}
export default Reviews