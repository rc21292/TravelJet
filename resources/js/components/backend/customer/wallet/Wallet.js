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

      axios('/api/wallet_transactions/'+AppState.user.id).then(result=>{
        setWalletTransactions(result.data.data);  
        setItemsCountPerPage(result.data.per_page);  
        setTotalItemsCount(result.data.total);  
        setActivePage(result.data.current_page);
      });
    }   

  }, []);  


  const handlePageChange = (pageNumber) => {
  axios.get('/api/wallet_transactions/'+user.id+'?page='+pageNumber)
  .then(result=>{
     setWalletTransactions(result.data.data);  
      setItemsCountPerPage(result.data.per_page);  
      setTotalItemsCount(result.data.total);  
      setActivePage(result.data.current_page); 
  });
}

  return (
          <div className="wallet-page">
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
                  <div className="transaction">
                    <table className="table">
                      <thead className="thead-light">
                        <tr>
                          <th scope="col">TRANSACTION</th>
                          <th scope="col" style={{width: '10%'}}>AMOUNT</th>
                          <th scope="col">STATUS</th>
                          <th scope="col">COMMENT</th>
                        </tr>
                      </thead>
                      <tbody>
                       {
                        walletTransactions.map((query, idx) => {  
                        return  <tr key={idx}>
                          <td>
                            <span className="date"><Moment format="MMMM YYYY">{query.created_at}</Moment></span><br />
                            <span className="paidloca">Paid for {query.booking_name}</span><br />
                            <span className="datetime"><Moment format="DD MMMM YYYY h:mm a">{query.created_at}</Moment></span><br />
                            <span className="bookid">Booking ID:00000{query.booking_id}</span><br />
                            <span className="bookid">Transaction ID:{query.transaction_id}</span>
                          </td>
                          <td>
                            <span className="paidprice">
                              {(query.type == 'deposit') ? '+ ' : '- ' } <i className="fa fa-rupee" /> {query.amount}
                            </span>
                          </td>
                          <td>{(query.status) ? 'SUCCESS' : 'Fail'}</td>
                          <td>{(query.description)}</td>
                        </tr>
                        })}  
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
    );
}

export default Wallet;