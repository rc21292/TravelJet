import React from 'react'  
import axios from 'axios';  
import { useHistory, useLocation } from 'react-router-dom'
import { CSVLink } from "react-csv";
import Pagination from "react-js-pagination";
import { useState, useEffect } from 'react'  
import Moment from 'react-moment';


function AgentDrivers(props) { 

  const history = useHistory()

  const [user, setUser] = useState(false);

  const [driversData, setDriversData] = useState([]);  
  const [activePage, setActivePage] = useState(1);  
  const [itemsCountPerPage, setItemsCountPerPage] = useState(1);  
  const [totalItemsCount, setTotalItemsCount] = useState(1);  
  const [pageRangeDisplayed, setPageRangeDisplayed] = useState(3); 

  const [agentId,setAgentId] = useState();

  const [searchName, setSearchName] = useState("");
  const [searchDrivingLicence, setSearchDrivingLicence] = useState("");
  const [searchMobile, setSearchMobile] = useState("");
  const [searchStatus, setSearchStatus] = useState("");

  const [fromCount, setFromCount] = useState(1);  
  const [toCount, setToCount] = useState(1);  
  const [totalPages, setTotalPages] = useState(1);  

  useEffect(() => {
    
    let parts = location.pathname.split('/');
    let customer_id = parts.pop() || parts.pop();  
    setAgentId(customer_id);

    let stateqq = localStorage["appState"];

    if (stateqq) {
      let AppState = JSON.parse(stateqq);
      setUser(AppState.user);
      axios('/api/getDriversByAgentId/'+customer_id).then(result=>{        
        setDriversData(result.data.data);  
        setItemsCountPerPage(result.data.per_page);  
        setTotalItemsCount(result.data.total);  
        setActivePage(result.data.current_page);
        setFromCount(result.data.from);  
        setToCount(result.data.to);  
        setTotalPages(result.data.last_page);
      });
    }   

  }, []);  

  const handlePageChange = (pageNumber) => {
   axios.get('/api/getDriversByAgentId/'+agentId+'?name='+searchName+'&licence='+drivingLicence+'&mobile='+searchMobile+'&company='+searchStatus+'&page='+pageNumber)
   .then(result=>{
     setDriversData(result.data.data);  
     setItemsCountPerPage(result.data.per_page);  
     setTotalItemsCount(result.data.total);  
     setActivePage(result.data.current_page);
     setFromCount(result.data.from);  
     setToCount(result.data.to);  
     setTotalPages(result.data.last_page);
   });
 }

  const onChangeSearchName = e => {
    const drivingLicence = e.target.value;
    setSearchName(drivingLicence);
  };


const onChangeSearchDrivingLicence = e => {
    const drivingLicence = e.target.value;
    setSearchDrivingLicence(drivingLicence);
  };

const onChangeSearchMobile = e => {
    const searchMobile = e.target.value;
    setSearchMobile(searchMobile);
  };

  const onChangeSearchStatus = e => {
    const searchStatus = e.target.value;
    setSearchStatus(searchStatus);
  };

  const resetFilter = () => {
    setSearchName("");
    setSearchMobile("");
    setSearchDrivingLicence("");
    setSearchStatus("");
    axios.get('/api/getDriversByAgentId/'+agentId)
    .then(result=>{
      setDriversData(result.data.data);  
      setItemsCountPerPage(result.data.per_page);  
      setTotalItemsCount(result.data.total);  
      setActivePage(result.data.current_page);
      setFromCount(result.data.from);  
      setToCount(result.data.to);  
      setTotalPages(result.data.last_page);
    });
  }

  const findByFilter = () => {
    axios('/api/getDriversByAgentId/'+agentId+'?name='+searchName+'&licence='+drivingLicence+'&mobile='+searchMobile+'&company='+searchStatus)
    .then(result => {
      setDriversData(result.data.data);  
      setItemsCountPerPage(result.data.per_page);  
      setTotalItemsCount(result.data.total);  
      setActivePage(result.data.current_page);
      setFromCount(result.data.from);  
      setToCount(result.data.to);  
      setTotalPages(result.data.last_page);
    })
    .catch(e => {
      console.log(e);
    });
  };

  return (  
    <div className="tab-pane" id="6a">
        <div className="driverdiv test2" style={{display: 'block'}}>
          <div className="col-sm-12">
            <div className="title">Drivers</div>
          </div>
          <div className="col-sm-8">
            <div className="transactiondiv">
              <div className="cardbg total-transaction">
                <div className="card-body">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Driver Name</th>
                        <th>Mobile Number</th>
                        <th>Driving Licence</th>
                        <th>Document Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {driversData.map((query,i)=>{
                               return(
                               <tr key={i}>
                               <td>{query.name}</td>
                              <td>{query.mobile}</td>
                              <td>{query.driving_licence}</td>
                              <td><a href="#">{query.status}</a></td>
                              <td><a href={'/admin/drivers/edit/'+query.id} className="btn btn-primary editdriver">View</a></td>
                               </tr>
                             )
                             })
                             }
                      <tr><td colSpan={5}>
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
                      </tr></tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-4">
            <div className="cardbg total-transaction informationform">
              <div className="card-header">
                <h4 className="card-title">Filter</h4>
              </div>
              <div className="card-body">
                <form className="filterform">
                  <div className="form-row">
                    <div className="form-group col-md-12">
                      <label htmlFor="labelname">Driver Name</label>
                      <input type="text" className="form-control" value={searchName} onChange={onChangeSearchName} placeholder="Driver Name" />
                    </div>
                    <div className="form-group col-md-12">
                      <label htmlFor="labelname">Mobile Number</label>
                      <input type="text" className="form-control" value={searchDrivingLicence} onChange={onChangeSearchDrivingLicence} placeholder="Mobile Number" />
                    </div>
                    <div className="form-group col-md-12">
                      <label htmlFor="labelname">Driving Licence</label>
                      <input type="text" className="form-control" value={searchMobile} onChange={onChangeSearchMobile} placeholder="Driving Licence" />
                    </div>
                    <div className="form-group col-md-12">
                      <label htmlFor="labelname">Document Status</label>
                      <select id="inputState" className="form-control" value={searchStatus} onChange={onChangeSearchStatus}>
                        <option value="Verified">Verified</option>
                        <option value="Approval Pending">Approval Pending</option>
                      </select>
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
  )  
}  
  
export default AgentDrivers