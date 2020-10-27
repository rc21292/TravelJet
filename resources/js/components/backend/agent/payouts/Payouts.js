import React from 'react'  
import axios from 'axios';  
import moment from 'react-moment'
import { useHistory, useLocation } from 'react-router-dom'

import Pagination from "react-js-pagination";
import { useState, useEffect } from 'react'  
import FlashMessage from 'react-flash-message'
import Moment from 'react-moment'

function Payouts(props) { 

  const history = useHistory()
  const location = useLocation()

  const [user, setUser] = useState(false);
  const [error, setError] = useState();  
  const [success, setSuccess] = useState('');
  const [payoutsData, setPayoutsData] = useState([]);  
  const [activePage, setActivePage] = useState(1);  
  const [fromCount, setFromCount] = useState(1);  
  const [toCount, setToCount] = useState(1);  
  const [totalPages, setTotalPages] = useState(1);
  const [itemsCountPerPage, setItemsCountPerPage] = useState(1);  
  const [totalItemsCount, setTotalItemsCount] = useState(1);  
  const [pageRangeDisplayed, setPageRangeDisplayed] = useState(3);  
  const [searchTransactionType, setSearchTransactionType] = useState("");
  const [searchDateFrom, setSearchDateFrom] = useState("");
  const [searchDateTo, setSearchDateTo] = useState("");
  const [balance, setBalance] = useState(0);
  const [requestedData, setRequestedData] = useState({});

  const [saveData, setSaveData] = useState(''); 

  useEffect(() => {  

    let stateqq = localStorage["appState"];
    if (stateqq) {
      let AppState = JSON.parse(stateqq);
      setUser(AppState.user);
      axios.get('/api/users/getbalance/'+AppState.user.id)
      .then(response=>{
        setBalance(response.data.balance)
      });
      axios.get('/api/payouts/getRequestedPayouts/'+AppState.user.id)
      .then(response=>{
        setRequestedData(response.data)
      });
      axios('/api/payoutTransactions/'+AppState.user.id).then(result=>{
        setPayoutsData(result.data.payouts.data);
        setFromCount(result.data.payouts.from);  
        setToCount(result.data.payouts.to);  
        setTotalPages(result.data.payouts.last_page);  
        setItemsCountPerPage(result.data.payouts.per_page);  
        setTotalItemsCount(result.data.payouts.total);  
        setActivePage(result.data.payouts.current_page);
      });
    }
  }, []);  

  const handleChange = (event) => {
    setSaveData(event.target.value);
  }

  const requestPayout = (event) => { 

    if (saveData == '') {
      setError('Please Enter Amount!');
      return false;
    }else if (saveData > balance) {
      setError('Please enter Amount less than or equal to the Wallet Balance!');
      return false;
    }else{
       setError('');
       let data = {'amount' :saveData,'user_id' : user.id};
       axios.post('/api/payouts/savePayoutRequest',data)  
      .then((result) => {  
         axios.get('/api/payouts/getRequestedPayouts/'+user.id)
      .then(response=>{
        setRequestedData(response.data)
      });
          setSuccess('Amount Requested successfully!');
      }); 
    }     
  }; 

  const handlePageChange = (pageNumber) => {
    axios.get('/api/payoutTransactions/'+user.id+'?page='+pageNumber)
    .then(result=>{
     setPayoutsData(result.data.payouts.data);
     setItemsCountPerPage(result.data.payouts.per_page);
     setFromCount(result.data.payouts.from);  
     setToCount(result.data.payouts.to);  
     setTotalPages(result.data.payouts.last_page);
     setTotalItemsCount(result.data.payouts.total);  
     setActivePage(result.data.payouts.current_page);
   });
  }

  return (  
     <div className="payout">
        <h1>Payouts</h1>
        <div className="payouttable">
          <table className="table">
            <tbody>
              <tr>
                <td>Total Amount on wallet</td>
                <td>: <i className="fa fa-inr" /> {requestedData.wallet_amount}</td>
              </tr>
              <tr>
                <td>Total Amount requested</td>
                <td>: <i className="fa fa-inr" /> {requestedData.total_requsted_amount}</td>
              </tr>
              <tr>
                <td>Pending amount to be requested</td>
                <td>: <i className="fa fa-inr" /> {requestedData.pending_requsted_amount}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="row">
          <div className="informationform">
            <div className="col-sm-9">
              <h5>Please Enter Amount for Requesting Payment</h5>
              <div className="row">
              {success ? <FlashMessage duration={10000} persistOnHover={true}>
                <h5 className={"alert alert-danger"}>success: {success}</h5></FlashMessage> : ''}
                <div className="form-group col-sm-9">
                  <input type="number" onChange={handleChange} placeholder="Please Enter Amount" className="form-control" />
                </div>
                <div className="form-group col-sm-3">
                  <a onClick={requestPayout} className="btn btn-primary">Request</a>
                </div>
                <div className="form-group col-sm-12" style={{color:'red'}}> {error && error} </div>
              </div>
            </div>
          </div>
          <div className="clearfix" />
          <div className="col-sm-12">
            <table className="table table-bordered leadstatus">
              <thead className="thead-secondary">
                <tr>
                  <th scope="col" className="bd">Date</th>
                  <th scope="col">Amount</th>
                  <th scope="col">Payment Method</th>
                  <th scope="col">Transaction Id</th>
                </tr>
              </thead>
              <tbody>
               {  
                payoutsData.map((query, idx) => {  
                  return  <tr key={idx}>
                      <td> <Moment format="DD-MMM-YYYY">{query.created_at}</Moment></td>  
                      <td>{query.amount}</td>
                      <td>{query.payment_method}</td>  
                      <td>{query.transaction_id}</td>  
                  </tr>  
                  })
                }
                {payoutsData.length > 0 ? '' :<tr><td colSpan={7} style={{ color:'red',textAlign:'center'}}>There are no payouts in the list.</td></tr>}
              </tbody>
            </table>
          </div>
          <div className="clearfix" />
          <div className="col-sm-6" style={{marginTop:'-22px'}}>
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
          <div className="col-sm-6">
            <div className="showingpage">
              <p>Showing {fromCount} to {toCount} of {totalItemsCount} ({totalPages} Pages)</p>
            </div>
          </div>
        </div>
      </div>
  )  
}  
  
export default Payouts