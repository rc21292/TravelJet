import React from 'react'  
import axios from 'axios';  
import moment from 'react-moment'
import { useHistory, useLocation } from 'react-router-dom'

import Pagination from "react-js-pagination";
import { useState, useEffect } from 'react'  

function Vehicles(props) { 

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
     <div className="transactionhistory myvehicle">
        {/* Page Heading */}
        <h1>My Vehicle</h1>
        <div className="row">
          <div className="col-sm-12">
            <div className="vehicletable">
              <table className="table">
                <thead>
                  <tr>
                    <th>Vehicle Type</th>
                    <th>Vehicle Model</th>
                    <th>Vehicle Number</th>
                    <th>Upload Document</th>
                    <th>Status</th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><input type="text" name="title" placeholder="Vehicle Type" className="form-control" /></td>
                    <td><input type="text" name="title" placeholder="Vehicle Model" className="form-control" /></td>
                    <td><input type="text" name="title" placeholder="Vehicle Number" className="form-control" /></td>
                    <td>
                      <div className="upload-field">
                        <input type="text" className="form-control" placeholder="Upload Document" />
                        <ul className="list-inline upload-icon">
                          <li><a href="#" title><div className="file-upload1"><input type="file" /><i className="fa fa-paperclip" /></div></a></li>
                        </ul>
                      </div>
                    </td>
                    <td><a href="#">Verified</a></td>
                    <td><a href="#" className="btn btn-link">Remove</a></td>
                  </tr>
                  <tr>
                    <td><input type="text" name="title" placeholder="Vehicle Type" className="form-control" /></td>
                    <td><input type="text" name="title" placeholder="Vehicle Model" className="form-control" /></td>
                    <td><input type="text" name="title" placeholder="Vehicle Number" className="form-control" /></td>
                    <td>
                      <div className="upload-field">
                        <input type="text" className="form-control" placeholder="Upload Document" />
                        <ul className="list-inline upload-icon">
                          <li><a href="#" title><div className="file-upload1"><input type="file" /><i className="fa fa-paperclip" /></div></a></li>
                        </ul>
                      </div>
                    </td>
                    <td><a href="#" className="approval">Approval Pending</a></td>
                    <td><a href="#" className="btn btn-link">Remove</a></td>
                  </tr>
                  <tr>
                    <td><input type="text" name="title" placeholder="Vehicle Type" className="form-control" /></td>
                    <td><input type="text" name="title" placeholder="Vehicle Model" className="form-control" /></td>
                    <td><input type="text" name="title" placeholder="Vehicle Number" className="form-control" /></td>
                    <td>
                      <div className="upload-field">
                        <input type="text" className="form-control" placeholder="Upload Document" />
                        <ul className="list-inline upload-icon">
                          <li><a href="#" title><div className="file-upload1"><input type="file" /><i className="fa fa-paperclip" /></div></a></li>
                        </ul>
                      </div>
                    </td>
                    <td><a href="#">Verified</a></td>
                    <td><a href="#" className="btn btn-link">Remove</a></td>
                  </tr>
                  <tr>
                    <td><input type="text" name="title" placeholder="Vehicle Type" className="form-control" /></td>
                    <td><input type="text" name="title" placeholder="Vehicle Model" className="form-control" /></td>
                    <td><input type="text" name="title" placeholder="Vehicle Number" className="form-control" /></td>
                    <td>
                      <div className="upload-field">
                        <input type="text" className="form-control" placeholder="Upload Document" />
                        <ul className="list-inline upload-icon">
                          <li><a href="#" title><div className="file-upload1"><input type="file" /><i className="fa fa-paperclip" /></div></a></li>
                        </ul>
                      </div>
                    </td>
                    <td><a href="#" className="approval">Approval Pending</a></td>
                    <td><a href="#" className="btn btn-link">Remove</a></td>
                  </tr>
                  <tr>
                    <td><input type="text" name="title" placeholder="Vehicle Type" className="form-control" /></td>
                    <td><input type="text" name="title" placeholder="Vehicle Model" className="form-control" /></td>
                    <td><input type="text" name="title" placeholder="Vehicle Number" className="form-control" /></td>
                    <td>
                      <div className="upload-field">
                        <input type="text" className="form-control" placeholder="Upload Document" />
                        <ul className="list-inline upload-icon">
                          <li><a href="#" title><div className="file-upload1"><input type="file" /><i className="fa fa-paperclip" /></div></a></li>
                        </ul>
                      </div>
                    </td>
                    <td><a href="#">Verified</a></td>
                    <td><a href="#" className="btn btn-link">Remove</a></td>
                  </tr>
                  <tr>
                    <td><input type="text" name="title" placeholder="Vehicle Type" className="form-control" /></td>
                    <td><input type="text" name="title" placeholder="Vehicle Model" className="form-control" /></td>
                    <td><input type="text" name="title" placeholder="Vehicle Number" className="form-control" /></td>
                    <td>
                      <div className="upload-field">
                        <input type="text" className="form-control" placeholder="Upload Document" />
                        <ul className="list-inline upload-icon">
                          <li><a href="#" title><div className="file-upload1"><input type="file" /><i className="fa fa-paperclip" /></div></a></li>
                        </ul>
                      </div>
                    </td>
                    <td><a href="#" className="approval">Approval Pending</a></td>
                    <td><a href="#" className="btn btn-link">Remove</a></td>
                  </tr>
                  <tr>
                    <td><input type="text" name="title" placeholder="Vehicle Type" className="form-control" /></td>
                    <td><input type="text" name="title" placeholder="Vehicle Model" className="form-control" /></td>
                    <td><input type="text" name="title" placeholder="Vehicle Number" className="form-control" /></td>
                    <td>
                      <div className="upload-field">
                        <input type="text" className="form-control" placeholder="Upload Document" />
                        <ul className="list-inline upload-icon">
                          <li><a href="#" title><div className="file-upload1"><input type="file" /><i className="fa fa-paperclip" /></div></a></li>
                        </ul>
                      </div>
                    </td>
                    <td><a href="#">Verified</a></td>
                    <td><a href="#" className="btn btn-link">Remove</a></td>
                  </tr>
                  <tr>
                    <td><input type="text" name="title" placeholder="Vehicle Type" className="form-control" /></td>
                    <td><input type="text" name="title" placeholder="Vehicle Model" className="form-control" /></td>
                    <td><input type="text" name="title" placeholder="Vehicle Number" className="form-control" /></td>
                    <td>
                      <div className="upload-field">
                        <input type="text" className="form-control" placeholder="Upload Document" />
                        <ul className="list-inline upload-icon">
                          <li><a href="#" title><div className="file-upload1"><input type="file" /><i className="fa fa-paperclip" /></div></a></li>
                        </ul>
                      </div>
                    </td>
                    <td><a href="#" className="approval">Approval Pending</a></td>
                    <td><a href="#" className="btn btn-link">Remove</a></td>
                  </tr>
                  <tr>
                    <td><input type="text" name="title" placeholder="Vehicle Type" className="form-control" /></td>
                    <td><input type="text" name="title" placeholder="Vehicle Model" className="form-control" /></td>
                    <td><input type="text" name="title" placeholder="Vehicle Number" className="form-control" /></td>
                    <td>
                      <div className="upload-field">
                        <input type="text" className="form-control" placeholder="Upload Document" />
                        <ul className="list-inline upload-icon">
                          <li><a href="#" title><div className="file-upload1"><input type="file" /><i className="fa fa-paperclip" /></div></a></li>
                        </ul>
                      </div>
                    </td>
                    <td><a href="#">Verified</a></td>
                    <td><a href="#" className="btn btn-link">Remove</a></td>
                  </tr>
                  <tr>
                    <td><input type="text" name="title" placeholder="Vehicle Type" className="form-control" /></td>
                    <td><input type="text" name="title" placeholder="Vehicle Model" className="form-control" /></td>
                    <td><input type="text" name="title" placeholder="Vehicle Number" className="form-control" /></td>
                    <td>
                      <div className="upload-field">
                        <input type="text" className="form-control" placeholder="Upload Document" />
                        <ul className="list-inline upload-icon">
                          <li><a href="#" title><div className="file-upload1"><input type="file" /><i className="fa fa-paperclip" /></div></a></li>
                        </ul>
                      </div>
                    </td>
                    <td><a href="#" className="approval">Approval Pending</a></td>
                    <td><a href="#" className="btn btn-link">Remove</a></td>
                  </tr>
                  <tr>
                    <td colSpan={6}><a href="#" className="btn btn-primary">Add More</a></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="placebidbtn movebtn">
            <a href="#" className="btn btn-primary">Save</a>
          </div>
        </div>
      </div>

  )  
}  
  
export default Vehicles