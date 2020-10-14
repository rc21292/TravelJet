import React from 'react'  
import axios from 'axios';  
import { useHistory, useLocation } from 'react-router-dom'

import Pagination from "react-js-pagination";
import { useState, useEffect } from 'react'  

function TransactionHistory(props) { 

  const history = useHistory()

   const [user, setUser] = useState(false);

  const [bookingData, setBookingData] = useState([]);  
  const [activePage, setActivePage] = useState(1);  
  const [itemsCountPerPage, setItemsCountPerPage] = useState(1);  
  const [totalItemsCount, setTotalItemsCount] = useState(1);  
  const [pageRangeDisplayed, setPageRangeDisplayed] = useState(3);  
  const [searchTransactionType, setSearchTransactionType] = useState("");
  const [searchDateFrom, setSearchDateFrom] = useState("");
  const [searchDateTo, setSearchDateTo] = useState("");

  useEffect(() => {  

    let stateqq = localStorage["appState"];
      if (stateqq) {
        let AppState = JSON.parse(stateqq);
        setUser(AppState.user);
         axios('/api/transaction_history/'+AppState.user.id).then(result=>{
      setBookingData(result.data.user_transactions.data);  
      setItemsCountPerPage(result.data.user_transactions.per_page);  
      setTotalItemsCount(result.data.user_transactions.total);  
      setActivePage(result.data.user_transactions.current_page);
    });
      }   

  }, []);  


  const handlePageChange = (pageNumber) => {
  axios.get('/api/transaction_history/'+user.id+'?page='+pageNumber)
  .then(result=>{
     setBookingData(result.data.user_transactions.data);  
      setItemsCountPerPage(result.data.user_transactions.per_page);  
      setTotalItemsCount(result.data.user_transactions.total);  
      setActivePage(result.data.user_transactions.current_page);
  });
}

  const deleteBooking = (id) => {  
    axios.delete('api/queries/delete/'+ id)  
      .tden((result) => {  
        history.push('/Bookings')  
      });  
  };  


const onChangeSearchTransactionType = e => {
    const searchTransactionType = e.target.value;
    setSearchTransactionType(searchTransactionType);
  };

  const onChangeSearchDateFrom = e => {
    const searchTransactionType = e.target.value;
    setSearchDateFrom(searchTransactionType);
  };

  const onChangeSearchDateTo = e => {
    const searchTransactionType = e.target.value;
    setSearchDateTo(searchTransactionType);
  };

  const resetFilter = () => {
 setSearchTransactionType("");
       setSearchDateTo("");
      setSearchDateFrom("");
    axios.get('/api/transaction_history/'+user.id)
  .then(result=>{
     setBookingData(result.data.user_transactions.data);  
      setItemsCountPerPage(result.data.user_transactions.per_page);  
      setTotalItemsCount(result.data.user_transactions.total);  
      setActivePage(result.data.user_transactions.current_page);
     
  }); 

  }
  const findByFilter = () => {

    axios(`/api/transaction_history/${user.id}?transation_type=${searchTransactionType}&from_date=${searchDateFrom}&to_date=${searchDateTo}`)
    .then(result => {
      setBookingData(result.data.user_transactions.data);  
      setItemsCountPerPage(result.data.user_transactions.per_page);  
      setTotalItemsCount(result.data.user_transactions.total);  
      setActivePage(result.data.user_transactions.current_page);
    })
    .catch(e => {
      console.log(e);
    });
  };

  const viewBooking = (id) => {  
    history.push({  
      pathname: '/booking/' + id  
    });  
  };  
  
  return (  
    <div id="content-wrapper">
        {/* Main Content */}
        <div id="content">
          {/* Begin Page Content */}
          <div className="container-fluid">
            <div className="transactionhistory agentpage">
              {/* Page Heading */}
              <div className="row">
                <div className="col-sm-6">
                  <h1>Customers</h1>
                </div>
                <div className="col-sm-6">
                  <div className="trash">
                    <a href="#" className="btn btn-danger">
                      <i className="fa fa-trash" />
                    </a>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-8">
                  <div className="informationform">
                    <div className="row">
                      <div className="col-sm-4">
                        <div className="form-group">
                          <select className="form-control">
                            <option>Transations Type</option>
                            <option>Deposit</option>
                            <option>Withdraw</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-sm-4">
                        <input type="date" name="date" className="form-control" defaultValue="date" /> 
                      </div>
                      <div className="col-sm-4">
                        <input type="date" name="date" className="form-control" defaultValue="date" />
                      </div>    
                    </div>
                  </div>
                </div>  
                <div className="col-sm-4">
                  <div className="transaction-show">
                    <ul className="list-inline">
                      <li><a href="#" className="btn btn-primary">Filter</a></li>
                      <li><a href="#" className="btn btn-light">Export</a></li>
                      <li><a href="#" className="btn btn-primary">Reset</a></li>
                    </ul>
                  </div>
                </div>  
              </div>
              <div className="row">
                <div className="col-sm-12">
                  <div className="transactiondiv">
                    <div className="cardbg total-transaction">
                      <div className="card-header">
                        <h4 className="card-title">Recent Transactions</h4>
                      </div>
                      <div className="card-body">
                        <table className="table leadstatus">
                          <thead className="thead-secondary">
                            <tr>
                              <th scope="col" className="bd">Date</th>
                              <th scope="col">Transaction Detail</th>
                              <th scope="col">Amount</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>14-Jul-20</td>
                              <td>Commision From <a href="#">Abhishek</a> for Booking <a href="#">Delhi to Manali</a></td>
                              <td><i className="fa fa-inr" /> 6000</td>
                            </tr>
                            <tr>
                              <td>14-Jul-20</td>
                              <td>Commision From <a href="#">Abhishek</a> for Booking <a href="#">Delhi to Manali</a></td>
                              <td><i className="fa fa-inr" /> 6000</td>
                            </tr>
                            <tr>
                              <td>14-Jul-20</td>
                              <td>Commision From <a href="#">Abhishek</a> for Booking <a href="#">Delhi to Manali</a></td>
                              <td><i className="fa fa-inr" /> 6000</td>
                            </tr>
                            <tr>
                              <td>14-Jul-20</td>
                              <td>Commision From <a href="#">Abhishek</a> for Booking <a href="#">Delhi to Manali</a></td>
                              <td><i className="fa fa-inr" /> 6000</td>
                            </tr>
                            <tr>
                              <td>14-Jul-20</td>
                              <td>Commision From <a href="#">Abhishek</a> for Booking <a href="#">Delhi to Manali</a></td>
                              <td><i className="fa fa-inr" /> 6000</td>
                            </tr>
                            <tr>
                              <td>14-Jul-20</td>
                              <td>Commision From <a href="#">Abhishek</a> for Booking <a href="#">Delhi to Manali</a></td>
                              <td><i className="fa fa-inr" /> 6000</td>
                            </tr>
                            <tr>
                              <td colSpan={6}>
                                <div className="col-sm-6">
                                  <nav aria-label="Page navigation">
                                    <ul className="pagination">
                                      <li className="page-item">
                                        <a href="#" aria-label="Previous">
                                          <i className="fa fa-angle-left" />
                                        </a>
                                      </li>
                                      <li className="active"><a className="page-link" href="#">1</a></li>
                                      <li><a className="page-link" href="#">2</a></li>
                                      <li>
                                        <a href="#" aria-label="Next">
                                          <i className="fa fa-angle-right" />
                                        </a>
                                      </li>
                                    </ul>
                                  </nav>
                                </div>
                                <div className="col-sm-6">
                                  <div className="showpage">Showing 1 to 13 of 20 (2 Pages)</div>
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="clearfix" />
                <div className="col-sm-6">
                  <nav aria-label="Page navigation" className="paginationdiv">
                    <ul className="pagination">
                      <li className="page-item">
                        <a href="#" aria-label="Previous">
                          <i className="fa fa-angle-left" />
                        </a>
                      </li>
                      <li className="active"><a className="page-link" href="#">1</a></li>
                      <li><a className="page-link" href="#">2</a></li>
                      <li>
                        <a href="#" aria-label="Next">
                          <i className="fa fa-angle-right" />
                        </a>
                      </li>
                    </ul>
                  </nav>
                </div>
                <div className="col-sm-6">
                  <div className="showingpage">
                    <p>Showing 1 to 8 of 15 (2 Pages)</p>
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
  
export default TransactionHistory