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
    <div className="ms-content-wrapper">
                 <div className="row">
                    <div className="col-md-2">
                        <select className="form-control" value={searchTransactionType} onChange={onChangeSearchTransactionType}>
                            <option value="deposit">Deposit</option>
                            <option value="withdraw">Withdraw</option>
                        </select>
                    </div>
                    <div className="col-md-3">
                        <input type="date" name="date_from" className="form-control" placeholder="Search by date from" value={searchDateFrom} onChange={onChangeSearchDateFrom}  />
                    </div>
                    <div className="col-md-3">
                        <input type="date" name="date_to" className="form-control" placeholder="Search by date from" value={searchDateTo} onChange={onChangeSearchDateTo}  />
                    </div>
                    <div className="col-md-4" style={{ marginTop:'-19px'}}>
                    <button type="button" onClick={findByFilter} className="btn btn-pill btn-gradient-success">Filter</button>
                    <button type="button" onClick={resetFilter} className="btn btn-pill btn-gradient-danger">Reset Filter</button>
                   </div>
                </div>
                <br></br>
                    <div className="table-responsive">  
                      <table className="table table-hover table-striped">
                        <thead>  
                            <tr>  
                                <th scope="col">#</th>
                                <th scope="col">Date</th>
                                <th scope="col">Transaction Type</th>
                                <th scope="col">Transaction Description</th>
                                <th scope="col">Amount</th>
                            </tr>  
                        </thead>  
                        <tbody>  
                            {  
                                bookingData.map((query, idx) => {  
                                return  <tr key={idx}>
                                    <td scope="row">{query.id}</td>
                                    <td>{query.created_on}</td>
                                    <td>{query.type}</td>  
                                    <td dangerouslySetInnerHTML={{__html: query.description}} ></td>
                                    <td>Rs. {query.amount}</td>
                                </tr>  
                            })}  
                        </tbody>  
                    </table> 
                    <div className="d-flex justify-content-center">
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
  )  
}  
  
export default TransactionHistory