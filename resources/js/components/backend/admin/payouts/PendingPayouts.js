import React from 'react'  
import axios from 'axios'

import Pagination from "react-js-pagination";
import { useHistory } from "react-router-dom";
import { useState, useEffect } from 'react'
import Moment from 'react-moment';

function PendingPayouts() { 

  const [requestedPayouts, setRequestedPayouts] = useState([]);
const [pageRangeDisplayed, setPageRangeDisplayed] = useState(5);  
  const [activePage, setActivePage] = useState(1);  
  const [itemsCountPerPage, setItemsCountPerPage] = useState(1);  
  const [totalItemsCount, setTotalItemsCount] = useState(1);  

  let history = useHistory();

  useEffect(() => {

    axios.get('/api/getPayoutRequested/')
    .then(response=>{
      setRequestedPayouts(response.data.data)
      setItemsCountPerPage(response.data.per_page);  
        setTotalItemsCount(response.data.total);  
        setActivePage(response.data.current_page);
    });

  },[]); 


  const handlePageChange = (pageNumber) => {
    axios.get('/api/getPayoutRequested'+'?page='+pageNumber)

    .then(result=>{
      setRequestedPayouts(result.data.data)
      setItemsCountPerPage(result.data.per_page);  
      setTotalItemsCount(result.data.total);  
      setActivePage(result.data.current_page);
    });
  }

  return (  
      <div id="content-wrapper">
        {/* Main Content */}
        <div id="content">
          {/* Begin Page Content */}
          <div className="container-fluid">
            <div className="transactionhistory agentpage">
              {/* Page Heading */}
              <div className="row">
                <div className="col-sm-12">
                  <h1>Pending Booking Payments</h1>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-12">
                  <div className="transactiondiv">
                    <div className="cardbg total-transaction">
                      <div className="card-body">
                        <table className="table">
                          <thead className="thead-light">
                            <tr>
                              <th scope="col">Agent Name</th>
                              <th scope="col">Travel Agency</th>
                              <th scope="col">Amount Paid</th>
                              <th scope="col">Request On</th>
                              <th scope="col">Action</th>
                            </tr>
                          </thead>
                          <tbody>
                          {requestedPayouts.map((payout,i)=>{
                            return(
                            <tr key={i}>
                              <td>{payout.name} </td>
                              <td>{payout.company} </td>
                              <td><i className="fa fa-inr" /> {payout.amount}</td>
                              <td><Moment format="DD-MMM-YYYY hh:mm a">{payout.created_at}</Moment></td>
                              <td><a href={'/admin/payment-detail/'+payout.id} className="btn btn-primary">View</a></td>
                            </tr>
                            )
                          })
                          }
                          <tr>
                          <td style={{marginLeft: '50%'}} colSpan={5}>
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
            {/* /.container-fluid */}
          </div>
          {/* End of Main Content */}
        </div>
        {/* End of Content Wrapper */}
      </div>
  )  
}  
  
export default PendingPayouts