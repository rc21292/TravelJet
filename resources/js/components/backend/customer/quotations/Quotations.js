import React from 'react'  
import axios from 'axios';  
import { useHistory, useLocation } from 'react-router-dom'

import Pagination from "react-js-pagination";
import QuotationDetaills from "./QuotationDetaills";
import { useState, useEffect } from 'react'  

import Moment from 'react-moment'

function Quotations(props) { 

  const history = useHistory()
  const location = useLocation()

  const [user, setUser] = useState(false);
  const [bookingId, setBookingId] = useState('');

  const [bookingsData, setBookingsData] = useState([]);  
  const [activePage, setActivePage] = useState(1);  
  const [itemsCountPerPage, setItemsCountPerPage] = useState(1);  
  const [totalItemsCount, setTotalItemsCount] = useState(1);  
  const [pageRangeDisplayed, setPageRangeDisplayed] = useState(5);  

  useEffect(() => {  
    let stateqq = localStorage["appState"];
    if (stateqq) {
      let AppState = JSON.parse(stateqq);
      setUser(AppState.user);
      axios.get('/api/queries/getQueriesByUserId/'+AppState.user.id).then(result=>{
        setBookingsData(result.data.data); 
        setItemsCountPerPage(result.data.per_page);  
        setTotalItemsCount(result.data.total);  
        setActivePage(result.data.current_page);
      });
    }   

  }, []);  


  const deleteQuotation = (id) => {
    if(window.confirm('Are you sure you want to delete ?')) {
      axios.delete('/api/queries/delete/'+ id)  
      .then((result) => {  
        window.location.reload(false);
      }); 
    } 
  };  

  const viewQuotation = (id) => { 
    if (bookingId != '' && bookingId == id) {
       setBookingId('');   
     }else{
      setBookingId(id); 
     }
  };  

  const handlePageChange = (pageNumber) => {
    axios.get('/api/queries/getQueriesByUserId/'+user.id+'?page='+pageNumber)

    .then(result=>{
      setBookingsData(result.data.data);
      setItemsCountPerPage(result.data.per_page);  
      setTotalItemsCount(result.data.total);  
      setActivePage(result.data.current_page);
    });
  }

		return (
           <div>
            <div className="quotation-page">
                <h1>Quotation</h1>
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
                      {bookingsData.map((booking,i)=>{
                        return( <tr key={i}>
                          <td><Moment format="DD-MMM-YYYY">{booking.date}</Moment></td>
                          <td>{booking.booking_name}</td>
                          <td className="iconview">
                            <a onClick={event => deleteQuotation(booking.id)} className="btn btn-danger"><i className="fa fa-trash" /></a>
                          </td>
                          <td><a onClick={event => viewQuotation(booking.id)} className="btn btn-default btn_click">View Quotation</a>
                          </td>                                
                        </tr>
                        )
                      })}
                      {bookingsData.length > 0 ? '' :<tr><td colSpan={7} style={{ color:'red',textAlign:'center'}}>There are no quotations in the list </td></tr>}
                    </tbody>
                  </table>
                  <div className="d-flex justify-content-center" style={{marginTop:'-25px', float:'right'}}>
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
                {bookingId ? <QuotationDetaills id={bookingId}/> : null }
           </div>
		);
	
}
export default Quotations