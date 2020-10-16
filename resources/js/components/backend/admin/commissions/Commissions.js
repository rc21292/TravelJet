import React from 'react'  
import axios from 'axios';  
import { useHistory, useLocation } from 'react-router-dom'
import { CSVLink } from "react-csv";
import Pagination from "react-js-pagination";
import { useState, useEffect } from 'react'  
import Moment from 'react-moment';


function Commissions(props) { 

  const history = useHistory()

   const [user, setUser] = useState(false);

  const [commissionData, setCommissionData] = useState([]);  
  const [activePage, setActivePage] = useState(1);  
  const [itemsCountPerPage, setItemsCountPerPage] = useState(1);  
  const [totalItemsCount, setTotalItemsCount] = useState(1);  
  const [pageRangeDisplayed, setPageRangeDisplayed] = useState(3); 

  const [searchBookingType, setSearchBookingType] = useState("");
  const [searchAgentName, setSearchAgentName] = useState("");
  const [searchSource, setSearchSource] = useState("");
  const [searchDestination, setSearchDestination] = useState("");

  const [fromCount, setFromCount] = useState(1);  
  const [toCount, setToCount] = useState(1);  
  const [totalPages, setTotalPages] = useState(1);  

  useEffect(() => {

    let stateqq = localStorage["appState"];
    if (stateqq) {
      let AppState = JSON.parse(stateqq);
      setUser(AppState.user);
      axios('/api/getAdminCommissions/').then(result=>{        
        setCommissionData(result.data.commissions.data);  
        setItemsCountPerPage(result.data.commissions.per_page);  
        setTotalItemsCount(result.data.commissions.total);  
        setActivePage(result.data.commissions.current_page);
        setFromCount(result.data.commissions.from);  
        setToCount(result.data.commissions.to);  
        setTotalPages(result.data.commissions.last_page);
      });
    }   

  }, []);  


  const handlePageChange = (pageNumber) => {
 axios.get('/api/getAdminCommissions/?agent='+searchAgentName+'&source='+searchSource+'&destination='+searchDestination+'&booking_type='+searchBookingType+'&page='+pageNumber)
  .then(result=>{
     setCommissionData(result.data.commissions.data);  
      setItemsCountPerPage(result.data.commissions.per_page);  
      setTotalItemsCount(result.data.commissions.total);  
      setActivePage(result.data.commissions.current_page);
      setFromCount(result.data.commissions.from);  
      setToCount(result.data.commissions.to);  
      setTotalPages(result.data.commissions.last_page);
  });
}

  const onChangeSearchSource = e => {
    const searchSource = e.target.value;
    setSearchSource(searchSource);
  };


const onChangeSearchDestination = e => {
    const searchDestination = e.target.value;
    setSearchDestination(searchDestination);
  };

const onChangeSearchBookingType = e => {
    const searchBookingType = e.target.value;
    setSearchBookingType(searchBookingType);
  };

const onChangeSearchAgentName = e => {
    const searchAgentName = e.target.value;
    setSearchAgentName(searchAgentName);
  };  

  const resetFilter = () => {
    setSearchAgentName("");
    setSearchBookingType("");
    setSearchSource("");
    setSearchDestination("");
    axios.get('/api/getAdminCommissions/')
    .then(result=>{
      setCommissionData(result.data.commissions.data);  
      setItemsCountPerPage(result.data.commissions.per_page);  
      setTotalItemsCount(result.data.commissions.total);  
      setActivePage(result.data.commissions.current_page);
      setFromCount(result.data.commissions.from);  
      setToCount(result.data.commissions.to);  
      setTotalPages(result.data.commissions.last_page);
    });
  }

  const findByFilter = () => {
    axios('/api/getAdminCommissions/?agent='+searchAgentName+'&source='+searchSource+'&destination='+searchDestination+'&booking_type='+searchBookingType)
    .then(result => {
      setCommissionData(result.data.commissions.data);  
      setItemsCountPerPage(result.data.commissions.per_page);  
      setTotalItemsCount(result.data.commissions.total);  
      setActivePage(result.data.commissions.current_page);
      setFromCount(result.data.commissions.from);  
      setToCount(result.data.commissions.to);  
      setTotalPages(result.data.commissions.last_page);
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
    <div id="content-wrapper">
        {/* Main Content */}
        <div id="content">
          {/* Begin Page Content */}
          <div className="container-fluid">
            <div className="transactionhistory agentpage">
              {/* Page Heading */}
              <div className="row">
                <div className="col-sm-9">
                  <h1>Commisions</h1>
                </div>
                <div className="col-sm-3">
                  <div className="commisiondiv">
                    <div className="row">
                      <div className="col-sm-6"><div className="totalcommison">Total Commision</div></div>
                      <div className="col-sm-6"><div className="totalprice"><i className="fa fa-inr" /> 15000</div></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-9">
                  <div className="transactiondiv commisiontable">
                    <div className="cardbg total-transaction">
                      <div className="card-body">
                        <table className="table leadstatus">
                          <thead className="thead-secondary">
                            <tr>
                              <th scope="col" className="bd">Booking ID</th>
                              <th scope="col">Agent Name</th>
                              <th scope="col" className="bt">Booking Type</th>
                              <th scope="col" className="sd">Start Date</th>
                              <th scope="col" className="mb">Source</th>
                              <th scope="col">Destination</th>
                              <th scope="col">Total cost</th>
                              <th scope="col">Commision</th>
                            </tr>
                          </thead>
                          <tbody>
                             {commissionData.map((query,i)=>{
                               return(
                               <tr key={i}>
                               <td>{'000000'+query.booking_id}</td>
                              <td>{query.agent}</td>
                              <td>{query.booking_type}</td>
                              <td>{query.depart}</td>
                              <td>{query.from_places}</td>
                              <td>{query.to_places}</td>
                              <td><i className="fa fa-inr" /> {query.total_cost}</td>
                              <td><i className="fa fa-inr" /> {query.commision}</td>
                               </tr>
                           )
                           })
                           }
                            
                            <tr>
                              <td colSpan={8}>
                                <div className="col-sm-6">
                                  <Pagination 
                                    activePage={activePage}
                                    itemsCountPerPage={itemsCountPerPage}
                                    totalItemsCount={totalItemsCount}
                                    pageRangeDisplayed={pageRangeDisplayed}
                                    onChange={handlePageChange}
                                    itemClass="page-item"
                                    linkClass="page-link"
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
                  <div className="cardbg total-transaction informationform">
                    <div className="card-header customerheader">
                      <h4 className="card-title">Filter</h4>
                    </div>
                    <div className="card-body">
                      <form className="filterform">
                        <div className="form-row">
                          <div className="form-group col-md-12">
                            <label htmlFor="labelname">Agent Name</label>
                            <input type="text" className="form-control" name="agent" value={searchAgentName} onChange={onChangeSearchAgentName} placeholder="Agent Name" />
                          </div>
                          <div className="form-group col-md-12">
                            <label htmlFor="labelname">Booking Type</label>
                            <select className="form-control" name="booking_type" value={searchBookingType} onChange={onChangeSearchBookingType}>
                            <option value="">Please select Type of Booking</option>
                            <option value="Round Trip with Sightseeing">Round Trip with Sightseeing</option>
                            <option value="One Way Trip">One Way Trip</option>
                            </select>
                          </div>
                          <div className="form-group col-md-12">
                            <label htmlFor="labelname">Source</label>
                            <input type="text" className="form-control" name="source" value={searchSource} onChange={onChangeSearchSource} placeholder="Source" />
                          </div>
                          <div className="form-group col-md-12">
                            <label htmlFor="labelname">Destination</label>
                            <input type="text" className="form-control" name="destination" value={searchDestination} onChange={onChangeSearchDestination} placeholder="Destination" />
                          </div>
                        </div>
                        <div className="placebidbtn filterbtn">
                          <a onClick={findByFilter} className="btn btn-primary">Filter</a>
                          <a onClick={resetFilter} className="btn btn-primary">Reset Filter</a>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* /.container-fluid */}
          </div>
          {/* End of Main Content */}
        </div>
        {/* End of Content Wrapper */}
      </div>
  )  
}  
  
export default Commissions