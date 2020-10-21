import React from 'react'  
import axios from 'axios';  
import { useHistory, useLocation } from 'react-router-dom'
import { CSVLink } from "react-csv";
import Pagination from "react-js-pagination";
import { useState, useEffect } from 'react'  
import Moment from 'react-moment';


function AgentWallet(props) {

  const history = useHistory()

  const [user, setUser] = useState(false);

  const [activeTab, setActiveTab] = useState(1); 
  const [customerId, setCustomerId] = useState(0); 

  const [agentData, setAgentData] = useState({}); 


const [activePage, setActivePage] = useState(1);  
  const [itemsCountPerPage, setItemsCountPerPage] = useState(1);  
  const [totalItemsCount, setTotalItemsCount] = useState(1);  
  const [fromCount, setFromCount] = useState(1);  
  const [toCount, setToCount] = useState(1);  
  const [totalPages, setTotalPages] = useState(1);  
  const [pageRangeDisplayed, setPageRangeDisplayed] = useState(3);  
  const [searchTransactionType, setSearchTransactionType] = useState("");
  const [searchDateFrom, setSearchDateFrom] = useState("");
  const [searchDateTo, setSearchDateTo] = useState(""); 

  const [balance, setBalance] = useState(false);

  const [walletTransactions, setWalletTransactions] = useState([]);

  const [payoutsData, setPayoutsData] = useState([]);    

  const [headersData, setHeadersData] = useState([
    { label: "Date", key: "created_on" },
    { label: "Transaction Type", key: "type" },
    { label: "Transaction Description", key: "description_data" },
    { label: "Amount", key: "amount" }
    ]);


  const [csvData, setCsvData] = useState([]);

  const [csvReport, setCsvReport] = useState({data: csvData,headers: headersData,filename: 'Transactions.csv'});   

  useEffect(() => {

    let parts = location.pathname.split('/');
    let customer_id = parts.pop() || parts.pop();  
    setCustomerId(customer_id);

    let stateqq = localStorage["appState"];
    if (stateqq) {
      let AppState = JSON.parse(stateqq);
      setUser(AppState.user);    

       axios.get('/api/users/getbalance/'+customer_id)
      .then(response=>{
        setBalance(response.data.balance);
      });

      axios('/api/transaction_history/'+customer_id).then(result=>{
        setCsvReport({...csvReport,data:result.data.user_transactions.data});  
        setWalletTransactions(result.data.user_transactions.data);  
        setItemsCountPerPage(result.data.user_transactions.per_page);  
        setTotalItemsCount(result.data.user_transactions.total);  
        setActivePage(result.data.user_transactions.current_page);
        setFromCount(result.data.user_transactions.from);  
        setToCount(result.data.user_transactions.to);  
        setTotalPages(result.data.user_transactions.last_page);  
      });

    }   

  }, []);  


  const handlePageChange = (pageNumber) => {
    axios.get('/api/transaction_history/'+customerId+'?transation_type='+searchTransactionType+'&from_date='+searchDateFrom+'&to_date='+searchDateTo+'&page='+pageNumber)
    .then(result=>{
      setWalletTransactions(result.data.user_transactions.data);  
      setCsvReport({...csvReport,data:result.data.user_transactions.data}); 
      setItemsCountPerPage(result.data.user_transactions.per_page);  
      setTotalItemsCount(result.data.user_transactions.total);  
      setActivePage(result.data.user_transactions.current_page);
      setFromCount(result.data.user_transactions.from);  
      setToCount(result.data.user_transactions.to);  
      setTotalPages(result.data.user_transactions.last_page);  
    });
  }

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
    axios.get('/api/transaction_history/'+customerId)
  .then(result=>{
     setWalletTransactions(result.data.user_transactions.data);  
     setCsvReport({...csvReport,data:result.data.user_transactions.data}); 
      setItemsCountPerPage(result.data.user_transactions.per_page);  
      setTotalItemsCount(result.data.user_transactions.total);  
      setActivePage(result.data.user_transactions.current_page);
      setFromCount(result.data.user_transactions.from);  
      setToCount(result.data.user_transactions.to);  
      setTotalPages(result.data.user_transactions.last_page);  
     
  }); 

  }
  const findByFilter = () => {

    axios(`/api/transaction_history/${customerId}?transation_type=${searchTransactionType}&from_date=${searchDateFrom}&to_date=${searchDateTo}`)
    .then(result => {
      setWalletTransactions(result.data.user_transactions.data); 
      setCsvReport({...csvReport,data:result.data.user_transactions.data});  
      setItemsCountPerPage(result.data.user_transactions.per_page);  
      setTotalItemsCount(result.data.user_transactions.total);  
      setActivePage(result.data.user_transactions.current_page);
      setFromCount(result.data.user_transactions.from);  
      setToCount(result.data.user_transactions.to);  
      setTotalPages(result.data.user_transactions.last_page);  
    })
    .catch(e => {
      console.log(e);
    });
  };


  return (  
    <div>
      <div className={activeTab == 9 ? 'tab-pane active' : 'tab-pane'} id={9}>
        <div className="col-sm-12">
          <div className="title">Wallet</div>
        </div>
        <div className="col-sm-6">
          <div className="informationform">
            <div className="row">
              <div className="col-sm-4">
                <div className="form-group">
                  <select className="form-control" value={searchTransactionType}  onChange={onChangeSearchTransactionType}>
                    <option value="">Transations Type</option>
                    <option value="Deposit">Deposit</option>
                    <option value="Withdraw">Withdraw</option>
                  </select>
                </div>
              </div>
              <div className="col-sm-4">
                <input type="date" name="from_date" className="form-control" value={searchDateFrom}  onChange={onChangeSearchDateFrom} /> 
              </div>
              <div className="col-sm-4">
                <input type="date" name="to_date" className="form-control" value={searchDateTo} onChange={onChangeSearchDateTo}/>
              </div>    
            </div>
          </div>
        </div>  
        <div className="col-sm-4">
          <div className="transaction-show">
            <ul className="list-inline">
              <li><a onClick={findByFilter} className="btn btn-primary">Filter</a></li>
              <li>
              <CSVLink className="btn btn-primary" {...csvReport}>Export</CSVLink>
              </li>
              <li><a onClick={resetFilter} className="btn btn-primary">Reset</a></li>
            </ul>
          </div>
        </div> 
        <div className="col-sm-9">
          <div className="transactiondiv">
            <div className="cardbg total-transaction">
              <div className="card-body">
                <table className="table">
                  <thead className="thead-light">
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
                    <tr>
                      <td colSpan={4}>
                        <div className="col-sm-6">
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
                        <div className="showpage">Showing {fromCount} to {toCount} of {totalItemsCount} ({totalPages} Pages)</div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div className="col-sm-3">
          <div className="transactiondiv">
            <div className="cardbg total-transaction">
              <div className="card-body">
                <table className="table">
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">Wallet</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <div className="total">
                          Total Balance
                        </div>
                        <div className="price">
                          <i className="fa fa-rupee" /> {balance}
                        </div>
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
  )  
}  
  
export default AgentWallet