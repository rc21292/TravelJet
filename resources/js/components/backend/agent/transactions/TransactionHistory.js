import React from 'react'  
import axios from 'axios';  
import { useHistory, useLocation } from 'react-router-dom'
import { CSVLink } from "react-csv";
import Pagination from "react-js-pagination";
import { useState, useEffect } from 'react'  

function TransactionHistory(props) { 

  const history = useHistory()

   const [user, setUser] = useState(false);

  const [bookingData, setBookingData] = useState([]);  

  const [headersData, setHeadersData] = useState([
    { label: "Date", key: "created_on" },
    { label: "Transaction Type", key: "type" },
    { label: "Transaction Description", key: "description_data" },
    { label: "Amount", key: "amount" }
  ]);

 
const [csvData, setCsvData] = useState([]);

  const [csvReport, setCsvReport] = useState({data: csvData,headers: headersData,filename: 'Transactions.csv'});  


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

  useEffect(() => {  

    let stateqq = localStorage["appState"];
      if (stateqq) {
        let AppState = JSON.parse(stateqq);
        setUser(AppState.user);
         axios('/api/transaction_history/'+AppState.user.id).then(result=>{
      setBookingData(result.data.user_transactions.data);  
      setCsvReport({...csvReport,data:result.data.user_transaction_data});  
      setItemsCountPerPage(result.data.user_transactions.per_page);  
      setTotalItemsCount(result.data.user_transactions.total);  
      setFromCount(result.data.user_transactions.from);  
      setToCount(result.data.user_transactions.to);  
      setTotalPages(result.data.user_transactions.last_page);  
      setActivePage(result.data.user_transactions.current_page);
    });
      }   

  }, []);  


  const handlePageChange = (pageNumber) => {
  axios.get('/api/transaction_history/'+user.id+'?transation_type='+searchTransactionType+'&from_date='+searchDateFrom+'&to_date='+searchDateTo+'&page='+pageNumber)
  .then(result=>{
     setBookingData(result.data.user_transactions.data);  
     setCsvReport({...csvReport,data:result.data.user_transaction_data}); 
      setItemsCountPerPage(result.data.user_transactions.per_page);  
      setTotalItemsCount(result.data.user_transactions.total);  
      setActivePage(result.data.user_transactions.current_page);
      setFromCount(result.data.user_transactions.from);  
      setToCount(result.data.user_transactions.to);  
      setTotalPages(result.data.user_transactions.last_page);  
  });
}

  const downloadReport = (event, done) => {
    // API call to get data
    const objReport = {
      filename: 'transactions.csv',
      headers: headersData,
      data: csvData
    };
    setCsvReport({ csvReport: objReport }, () => {
      done();
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
    axios.get('/api/transaction_history/'+user.id)
  .then(result=>{
     setBookingData(result.data.user_transactions.data);  
     setCsvReport({...csvReport,data:result.data.user_transaction_data}); 
      setItemsCountPerPage(result.data.user_transactions.per_page);  
      setTotalItemsCount(result.data.user_transactions.total);  
      setActivePage(result.data.user_transactions.current_page);
      setFromCount(result.data.user_transactions.from);  
      setToCount(result.data.user_transactions.to);  
      setTotalPages(result.data.user_transactions.last_page);  
     
  }); 

  }
  const findByFilter = () => {

    axios(`/api/transaction_history/${user.id}?transation_type=${searchTransactionType}&from_date=${searchDateFrom}&to_date=${searchDateTo}`)
    .then(result => {
      setBookingData(result.data.user_transactions.data); 
      setCsvReport({...csvReport,data:result.data.user_transaction_data});  
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

  const viewBooking = (id) => {  
    history.push({  
      pathname: '/booking/' + id  
    });  
  };  
  
  return (  
   <div className="transactionhistory">
        {/* Page Heading */}
        <h1>Transaction History</h1>
        <div className="row">
          <div className="col-sm-8">
            <div className="informationform">
              <div className="row">
                <div className="col-sm-4">
                  <div className="form-group">
                  <select className="form-control" name="transation_type" value={searchTransactionType} onChange={onChangeSearchTransactionType}>
                    <option value="deposit">Deposit</option>
                    <option value="withdraw">Withdraw</option>
                  </select>
                  </div>
                </div>
                <div className="col-sm-4">
                  <input type="date" name="from_date" className="form-control" value={searchDateFrom} onChange={onChangeSearchDateFrom}/> 
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
        </div>
        <div className="row">
          <div className="col-sm-12">
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
                bookingData.map((query, idx) => {  
                return  <tr key={idx}>
                  <td>{query.created_on}</td>
                  <td>{query.type}</td>
                  <td dangerouslySetInnerHTML={{__html: query.description}} ></td>
                  <td><i className="fa fa-inr" /> {query.amount}</td>
                </tr>
                })}  
              </tbody>
            </table>
          </div>
          <div className="clearfix" />
          <div className="col-sm-6" style={{ marginTop:'-20px' }}>
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
  
export default TransactionHistory