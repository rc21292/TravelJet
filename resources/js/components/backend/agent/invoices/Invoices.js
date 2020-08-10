import React from 'react'  
import axios from 'axios';  
import { useHistory, useLocation } from 'react-router-dom'

import Pagination from "react-js-pagination";
import { useState, useEffect } from 'react'  

function Credits(props) { 

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
    <div className="travelcredit">
        {/* Page Heading */}
        <h1>Travel Jet - Credits</h1>
        <div className="row">
          <div className="col-sm-12">
            <div className="creditleft">
              <a href="#" className="btn btn-dark">Credits Left: 100</a>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-3">
            <div className="card2 text-center">
              <div className="card-content">
                <div className="card-body py-3">
                  <div className="line-ellipsis">Bronze</div>
                  <div className="price">
                    <i className="fa fa-inr" /> 100
                  </div>
                  <div className="agentname">
                    <h3>10 Credits</h3>
                    <a href="#" className="btn btn-light">Select Plan</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-3">
            <div className="card2 text-center">
              <div className="card-content">
                <div className="card-body py-3">
                  <div className="line-ellipsis">Silver</div>
                  <div className="price">
                    <i className="fa fa-inr" /> 200
                  </div>
                  <div className="agentname">
                    <h3>22 Credits</h3>
                    <a href="#" className="btn btn-light">Select Plan</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-3">
            <div className="card2 text-center">
              <div className="card-content">
                <div className="card-body py-3">
                  <div className="line-ellipsis">Gold</div>
                  <div className="price">
                    <i className="fa fa-inr" /> 300
                  </div>
                  <div className="agentname">
                    <h3>35 Credits</h3>
                    <a href="#" className="btn btn-light">Select Plan</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-3">
            <div className="card2 text-center">
              <div className="card-content">
                <div className="card-body py-3">
                  <div className="line-ellipsis">Platinum</div>
                  <div className="price">
                    <i className="fa fa-inr" /> 500
                  </div>
                  <div className="agentname">
                    <h3>70 Credits</h3>
                    <a href="#" className="btn btn-light">Select Plan</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  )  
}  
  
export default Credits