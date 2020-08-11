import React from 'react'  
import axios from 'axios';  
import moment from 'react-moment'
import { useHistory, useLocation } from 'react-router-dom'

import Pagination from "react-js-pagination";
import { useState, useEffect } from 'react'  

function Payouts(props) { 

  const history = useHistory()
  const location = useLocation()

   const [user, setUser] = useState(false);

  const [payoutsData, setPayoutsData] = useState([]);  
  const [activePage, setActivePage] = useState(1);  
  const [selectYear, setSelectYear] = useState([]);  
  const [selectedYear, setSelectedYear] = useState();  
  const [selectedMonth, setSelectedMonth] = useState();  
  const [selectMonth, setSelectMonth] = useState([]);  
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
      axios('/api/payouts/'+AppState.user.id).then(result=>{
        setPayoutsData(result.data.payouts.data);  
        setSelectYear(result.data.years);  
        setSelectedYear(result.data.selected_year);  
        setSelectedMonth(result.data.selected_month);  
        setSelectMonth(result.data.months);  
        setItemsCountPerPage(result.data.payouts.per_page);  
        setTotalItemsCount(result.data.payouts.total);  
        setActivePage(result.data.payouts.current_page);
      });
    }   

  }, []);  


  const handlePageChange = (pageNumber) => {
    console.log(location.pathname)
  axios.get('/api/payouts/'+user.id+'?month='+selectedMonth+'&year='+selectedYear+'&page='+pageNumber)
    
  .then(result=>{
     setPayoutsData(result.data.payouts.data);  
     setSelectedYear(result.data.selected_year);  
        setSelectedMonth(result.data.selected_month);  
      setItemsCountPerPage(result.data.payouts.per_page);  
      setTotalItemsCount(result.data.payouts.total);  
      setActivePage(result.data.payouts.current_page);
  });
}

const onChangeYear = e => {
    const year = e.target.value;
    setSelectedYear(year);  
  };

  const onChangeMonth = e => {
    const month = e.target.value;
    setSelectedMonth(month);  
  };

  const resetFilter = () => {
      setSelectedYear("");  
      setSelectedMonth(""); 
    axios.get('/api/payouts/'+user.id)
  .then(result=>{
     setPayoutsData(result.data.payouts.data);  
     setSelectedYear(result.data.selected_year);  
        setSelectedMonth(result.data.selected_month);  
      setItemsCountPerPage(result.data.payouts.per_page);  
      setTotalItemsCount(result.data.payouts.total);  
      setActivePage(result.data.payouts.current_page);
     
  }); 

  }
  const findByFilter = () => {

    axios(`/api/payouts/${user.id}?month=${selectedMonth}&year=${selectedYear}`)
    .then(result => {
      setPayoutsData(result.data.payouts.data);  
      setItemsCountPerPage(result.data.payouts.per_page);  
      setTotalItemsCount(result.data.payouts.total);  
      setActivePage(result.data.payouts.current_page);
    })
    .catch(e => {
      console.log(e);
    });
  };

  return (  
     <div className="payout">
        {/* Page Heading */}
        <h1>Payouts</h1>
        <div className="payouttable">
          <table className="table">
            <tbody>
              <tr>
                <td>Total Amount on wallet</td>
                <td>: <i className="fa fa-inr" /> 90900</td>
              </tr>
              <tr>
                <td>Total Amount requested</td>
                <td>: <i className="fa fa-inr" /> 0</td>
              </tr>
              <tr>
                <td>Pending amount to be requested</td>
                <td>: <i className="fa fa-inr" /> 90900</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="row">
          <div className="informationform">
            <div className="col-sm-9">
              <h5>Please Enter Amount for Requesting Payment</h5>
              <div className="row">
                <div className="form-group col-sm-9">
                  <input type="text" placeholder="Please Enter Amount" className="form-control" />
                </div>
                <div className="form-group col-sm-3">
                  <a href="#" className="btn btn-primary">Request</a>
                </div>
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
                <tr>
                  <td>14-Jul-20</td>
                  <td><i className="fa fa-inr" /> 5000</td>
                  <td>Bank Transfer</td>
                  <td>123456789</td>
                </tr>
                <tr>
                  <td>14-Jul-20</td>
                  <td><i className="fa fa-inr" /> 5000</td>
                  <td>Bank Transfer</td>
                  <td>123456789</td>
                </tr>
                <tr>
                  <td>14-Jul-20</td>
                  <td><i className="fa fa-inr" /> 5000</td>
                  <td>Bank Transfer</td>
                  <td>123456789</td>
                </tr>
                <tr>
                  <td>14-Jul-20</td>
                  <td><i className="fa fa-inr" /> 5000</td>
                  <td>Bank Transfer</td>
                  <td>123456789</td>
                </tr>
                <tr>
                  <td>14-Jul-20</td>
                  <td><i className="fa fa-inr" /> 5000</td>
                  <td>Bank Transfer</td>
                  <td>123456789</td>
                </tr>
                <tr>
                  <td>14-Jul-20</td>
                  <td><i className="fa fa-inr" /> 5000</td>
                  <td>Bank Transfer</td>
                  <td>123456789</td>
                </tr>
                <tr>
                  <td>14-Jul-20</td>
                  <td><i className="fa fa-inr" /> 5000</td>
                  <td>Bank Transfer</td>
                  <td>123456789</td>
                </tr>
                <tr>
                  <td>14-Jul-20</td>
                  <td><i className="fa fa-inr" /> 5000</td>
                  <td>Bank Transfer</td>
                  <td>123456789</td>
                </tr>
              </tbody>
            </table>
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
  )  
}  
  
export default Payouts