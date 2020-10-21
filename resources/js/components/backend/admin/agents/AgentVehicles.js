import React from 'react'  
import axios from 'axios';  
import { useHistory, useLocation } from 'react-router-dom'
import { CSVLink } from "react-csv";
import Pagination from "react-js-pagination";
import { useState, useEffect } from 'react'  
import Moment from 'react-moment';


function AgentVehicles(props) { 

  const history = useHistory()

  const [user, setUser] = useState(false);

  const [vehiclesData, setVehiclesData] = useState([]);  
  const [activePage, setActivePage] = useState(1);  
  const [itemsCountPerPage, setItemsCountPerPage] = useState(1);  
  const [totalItemsCount, setTotalItemsCount] = useState(1);  
  const [pageRangeDisplayed, setPageRangeDisplayed] = useState(3); 

  const [agentId,setAgentId] = useState();

  const [searchType, setSearchType] = useState("");
  const [searchModel, setSearchModel] = useState("");
  const [searchNumber, setSearchNumber] = useState("");
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
      axios('/api/getVehiclesByAgentId/'+customer_id).then(result=>{        
        setVehiclesData(result.data.data);  
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
   axios.get('/api/getVehiclesByAgentId/'+agentId+'?type='+searchType+'&model='+searchModel+'&number='+searchNumber+'&status='+searchStatus+'&page='+pageNumber)
   .then(result=>{
     setVehiclesData(result.data.data);  
     setItemsCountPerPage(result.data.per_page);  
     setTotalItemsCount(result.data.total);  
     setActivePage(result.data.current_page);
     setFromCount(result.data.from);  
     setToCount(result.data.to);  
     setTotalPages(result.data.last_page);
   });
 }

  const onChangeSearchType = e => {
    const searchType = e.target.value;
    setSearchType(searchType);
  };


const onChangeSearchModel = e => {
    const searchModel = e.target.value;
    setSearchModel(searchModel);
  };

const onChangeSearchNumber = e => {
    const searchNumber = e.target.value;
    setSearchNumber(searchNumber);
  };

  const onChangeSearchStatus = e => {
    const searchStatus = e.target.value;
    setSearchStatus(searchStatus);
  };

  const resetFilter = () => {
    setSearchType("");
    setSearchNumber("");
    setSearchModel("");
    setSearchStatus("");
    axios.get('/api/getVehiclesByAgentId/'+agentId)
    .then(result=>{
      setVehiclesData(result.data.data);  
      setItemsCountPerPage(result.data.per_page);  
      setTotalItemsCount(result.data.total);  
      setActivePage(result.data.current_page);
      setFromCount(result.data.from);  
      setToCount(result.data.to);  
      setTotalPages(result.data.last_page);
    });
  }

  const findByFilter = () => {
    axios('/api/getVehiclesByAgentId/'+agentId+'?type='+searchType+'&model='+searchModel+'&number='+searchNumber+'&status='+searchStatus)
    .then(result => {
      setVehiclesData(result.data.data);  
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
    <div className="tab-pane" id="5a">
        <div className="vehiclediv test" style={{display: 'block'}}>
          <div className="col-sm-12">
            <div className="title">Vehicles</div>
          </div>
          <div className="col-sm-8">
            <div className="transactiondiv">
              <div className="cardbg total-transaction">
                <div className="card-body">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Vehicle Type</th>
                        <th>Vehicle Model</th>
                        <th>Vehicle Number</th>
                        <th>Document Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {vehiclesData.map((query,i)=>{
                         return(
                         <tr key={i}>
                         <td>{query.vehicle_type}</td>
                        <td>{query.vehicle_model}</td>
                        <td>{query.vehicle_number}</td>
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
                            <div className="showpage">Showing 1 to 13 of 20 (2 Pages)</div>
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
                      <label htmlFor="labelname">Vehicle Type</label>
                      <input type="text" className="form-control" value={searchType} onChange={onChangeSearchType} placeholder="Vehicle Type" />
                    </div>
                    <div className="form-group col-md-12">
                      <label htmlFor="labelname">Vehicle Model</label>
                      <input type="text" className="form-control" value={searchModel} onChange={onChangeSearchModel} placeholder="Vehicle Model" />
                    </div>
                    <div className="form-group col-md-12">
                      <label htmlFor="labelname">Vehicle Number</label>
                      <input type="text" className="form-control" value={searchNumber} onChange={onChangeSearchNumber} placeholder="Vehicle Number" />
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
        <div className="vehicledivedit" style={{display: 'none'}}>
          <div className="col-sm-12">
            <div className="title">Vehicles Details</div>
            <form className="filterform informationform">
              <div className="form">
                <div className="form-group row">
                  <label htmlFor="labelname" className="col-sm-2">Vehicle Type</label>
                  <div className="col-sm-10">
                    <input type="text" className="form-control" placeholder="Vehicle Type" />
                  </div>
                </div>
                <div className="form-group row">
                  <label htmlFor="labelname" className="col-sm-2">Vehicle Model</label>
                  <div className="col-sm-10">
                    <input type="text" className="form-control" placeholder="Vehicle Model" />
                  </div>
                </div>
                <div className="form-group row">
                  <label htmlFor="labelname" className="col-sm-2">Vehicle Number</label>
                  <div className="col-sm-10">
                    <input type="text" className="form-control" placeholder="Vehicle Number" />
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div className="col-sm-12">
            <div className="cardbg total-transaction kycdetail">
              <div className="card-body">
                <table className="table">
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">Document Name</th>
                      <th scope="col">Image</th>
                      <th scope="col">Download</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Number Plate</td>
                      <td>
                        <img src="image/icons/uploadimg.jpg" alt="image description" />
                      </td>
                      <td><a href="#"><i className="fa fa-download" /></a>
                      </td>
                    </tr>
                    <tr>
                      <td>Registration copy</td>
                      <td>
                        <img src="image/icons/uploadimg.jpg" alt="image description" />
                      </td>
                      <td><a href="#"><i className="fa fa-download" /></a>
                      </td>
                    </tr>
                    <tr>
                      <td>Insurance</td>
                      <td>
                        <img src="image/icons/uploadimg.jpg" alt="image description" />
                      </td>
                      <td><a href="#"><i className="fa fa-download" /></a>
                      </td>
                    </tr>
                    <tr>
                      <td>Route Permit</td>
                      <td>
                        <img src="image/icons/uploadimg.jpg" alt="image description" />
                      </td>
                      <td><a href="#"><i className="fa fa-download" /></a>
                      </td>
                    </tr>
                    <tr>
                      <td>Fitness Certificate</td>
                      <td>
                        <img src="image/icons/uploadimg.jpg" alt="image description" />
                      </td>
                      <td><a href="#"><i className="fa fa-download" /></a>
                      </td>
                    </tr>
                    <tr>
                      <td>Lease Paper</td>
                      <td>
                        <img src="image/icons/uploadimg.jpg" alt="image description" />
                      </td>
                      <td><a href="#"><i className="fa fa-download" /></a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="statusdiv informationform">
            <div className="col-sm-12">
              <div className="form">
                <div className="form-group row">
                  <label htmlFor="labelname" className="col-sm-1">Status</label>
                  <div className="col-sm-7">
                    <select id="inputState" className="form-control">
                      <option >Verified</option>
                      <option>Pending</option>
                      <option>Done</option>
                    </select>
                  </div>
                  <div className="col-sm-4">
                    <a href="#" className="btn btn-primary">Submit</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  )  
}  
  
export default AgentVehicles