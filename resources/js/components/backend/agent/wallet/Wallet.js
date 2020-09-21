import React from 'react'  
import axios from 'axios';  
import { useHistory, useLocation } from 'react-router-dom'
import Moment from 'react-moment';

import Pagination from "react-js-pagination";
import { useState, useEffect } from 'react'  

function Wallet(props) {

  const history = useHistory()

  const [user, setUser] = useState(false);
  const [balance, setBalance] = useState(false);

  const [walletTransactions, setWalletTransactions] = useState([]);  
  const [activePage, setActivePage] = useState(1);  
  const [itemsCountPerPage, setItemsCountPerPage] = useState(1);  
  const [totalItemsCount, setTotalItemsCount] = useState(1);  
  const [pageRangeDisplayed, setPageRangeDisplayed] = useState(3);  

  useEffect(() => {  

    let stateqq = localStorage["appState"];
    if (stateqq) {
      let AppState = JSON.parse(stateqq);
      setUser(AppState.user);
      axios.get('/api/users/getbalance/'+AppState.user.id)
      .then(response=>{
        setBalance(response.data.balance);
      });

      axios('/api/transaction_history/'+AppState.user.id).then(result=>{
        setWalletTransactions(result.data.user_transactions.data);  
        setItemsCountPerPage(result.data.user_transactions.per_page);  
        setTotalItemsCount(result.data.user_transactions.total);  
        setActivePage(result.data.user_transactions.current_page);
      });
    }   

  }, []);  


  const handlePageChange = (pageNumber) => {
    axios.get('/api/transaction_history/'+user.id+'?page='+pageNumber)
    .then(result=>{
     setWalletTransactions(result.data.user_transactions.data);  
     setItemsCountPerPage(result.data.user_transactions.per_page);  
     setTotalItemsCount(result.data.user_transactions.total);  
     setActivePage(result.data.user_transactions.current_page); 
   });
  }

  const capitalize = (s) => {
    if (typeof s !== 'string') return ''
      return s.charAt(0).toUpperCase() + s.slice(1)
  }

    return (
          <div className="wallet-page">
            {/* Page Heading */}
            <h1>My Wallet</h1>
            <div className="customerwallet">
              <div className="row">
                <div className="col-sm-12">
                  <div className="total">
                    Total Balance
                  </div>
                  <div className="price">
                    <i className="fa fa-rupee" /> {balance}
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-12">
                  <h4>Recently Transaction</h4>
                  <table className="table table-bordered leadstatus">
                    <thead className="thead-secondary">
                      <tr>
                        <th scope="col" className="bd">Date</th>
                        <th scope="col">Transaction Type</th>
                        <th scope="col">Transaction</th>
                        <th scope="col">Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        walletTransactions.map((query, idx) => {  
                        return  <tr key={idx}>
                          <td>{query.created_on}</td>
                          <td>{query.type}</td>
                          <td dangerouslySetInnerHTML={{__html: query.description}} ></td>
                          <td><i className="fa fa-inr" /> {query.amount}</td>
                        </tr>
                        })
                      }  
                    </tbody>
                  </table>
                </div>
                <div className="clearfix" />
                <div className="col-sm-12">
                  <div className="alltransactions">
                    <a href="/agent/transactions" className="btn btn-primary">View All Transactions</a>
                  </div>
                </div>
              </div>
            </div>
          </div>


    );
  }

  export default Wallet;