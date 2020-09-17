import React from 'react'  
import axios from 'axios';  
import { useHistory, useLocation } from 'react-router-dom'

import Pagination from "react-js-pagination";
import { useState, useEffect } from 'react'  

function ViewPdf(props) { 

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
       <div className="invoice">
        <div className="container">
          <div className="row">
            <div className="invoicepdf">
              <div className="row">
                <div className="col-sm-6">
                  <div className="invoicelogo">
                    <img src="image/invoicelogo.png" alt="logo" />
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="taxinvoice">
                    <h2>Tax Invoice</h2>
                    <span>Paid</span>
                  </div>
                </div>
              </div>
              <div className="clearfix" />
              <div className="billto">
                <div className="billtoheading">Bill To</div>
                <div className="row">
                  <div className="col-sm-6">
                    <div className="billaddress">
                      <div className="name">Rahul Kumar</div>
                      <p>C-48, Diesel Shed Road, Kalka ji<br /> Mandir, New Delhi - 44 <br /> GSTIN: Z7AAGCP4442G1ZF</p>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="companyaddress">
                      <div className="name">Star Travels Pvt. Ltd.</div>
                      <p>2nd Floor, B Quadrant,No. C 22,<br /> G Block, Bandra Kurla Complex, Bandra<br /> East Mumbai - 400051, Maharashtra</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="invoicenumber">
                <div className="row">
                  <div className="col-sm-6">
                    <div className="invoicedetai">
                      <p><b>Invoice Number:</b> 00001</p>
                      <p><b>Invoice Date:</b> 27-08-2020</p>
                      <p><b>Due Date:</b> 27-08-2020</p>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="documentdetai">
                      <p><b>CIN:</b> U74990MH2009PTC194653</p>
                      <p><b>GSTIN:</b> 27AAGCP4442G1ZF</p>
                      <p><b>PAN:</b> AAGCP4442G</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="invoicetable">
                <table className="table">
                  <thead className="thead">
                    <tr>
                      <th scope="col">Description</th>
                      <th scope="col">Qty</th>
                      <th scope="col" className="sd">Rate</th>
                      <th scope="col">Amount</th>
                    </tr>
                  </thead>
                  <tbody className="customerbody">
                    <tr>
                      <td><span>Booking Delhi to Manali</span> <br /> Round trip booking for delhi to manali with stoppage chandigarh, kullu, rohtang</td>
                      <td>1</td>
                      <td><i className="fa fa-inr" /> 15000</td>
                      <td><i className="fa fa-inr" /> 15000</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="invoicetotal">
                <table className="table">
                  <tbody className="totalbody">
                    <tr>
                      <td colSpan={5} className="lablename">Sub Total :</td>
                      <td className="payprice"> <i className="fa fa-inr" /> 15000</td>
                    </tr>
                    <tr>
                      <td colSpan={5} className="lablename">Service Charge 10% :</td>
                      <td className="payprice"> <i className="fa fa-inr" /> 1500</td>
                    </tr>
                    <tr>
                      <td colSpan={5} className="lablename">GST 18% :</td>
                      <td className="payprice"> <i className="fa fa-inr" /> 2700</td>
                    </tr>
                    <tr>
                      <td colSpan={5} className="lablename">Total :</td>
                      <td className="payprice"> <i className="fa fa-inr" /> <b>19200</b></td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="invoicenote">
                <p><b>Note:</b> On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they connot foresee the pain and trouble.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
  )  
}  
  
export default ViewPdf