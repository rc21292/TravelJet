import React from 'react'  
import axios from 'axios';  
import { useHistory, useLocation } from 'react-router-dom'
import { CSVLink } from "react-csv";
import Pagination from "react-js-pagination";
import { useState, useEffect } from 'react'  
import Moment from 'react-moment';


function AgentDetails(props) { 

  const history = useHistory()

   const [user, setUser] = useState(false);
   const [checkedBoxes, setCheckedBoxes] = useState([]);
   const [checkedIds, setCheckedIds] = useState([]);
   const [allChecked, setAllChecked] = useState([]);

  const [agentData, setAgentData] = useState([]);  
  const [activePage, setActivePage] = useState(1);  
  const [itemsCountPerPage, setItemsCountPerPage] = useState(1);  
  const [totalItemsCount, setTotalItemsCount] = useState(1);  
  const [pageRangeDisplayed, setPageRangeDisplayed] = useState(3); 

  const [searchName, setSearchName] = useState("");
  const [searchEmail, setSearchEmail] = useState("");
  const [searchMobile, setSearchMobile] = useState("");
  const [searchCompany, setSearchCompany] = useState("");

  const [fromCount, setFromCount] = useState(1);  
  const [toCount, setToCount] = useState(1);  
  const [totalPages, setTotalPages] = useState(1);  

  useEffect(() => {

    let stateqq = localStorage["appState"];
    if (stateqq) {
      let AppState = JSON.parse(stateqq);
      setUser(AppState.user);
      axios('/api/getAgents/').then(result=>{        
        setAgentData(result.data.agents.data);  
        setCheckedIds(result.data.customer_ids.data);  
        setItemsCountPerPage(result.data.agents.per_page);  
        setTotalItemsCount(result.data.agents.total);  
        setActivePage(result.data.agents.current_page);
        setFromCount(result.data.agents.from);  
        setToCount(result.data.agents.to);  
        setTotalPages(result.data.agents.last_page);
      });
    }   

  }, []);  


  const handlePageChange = (pageNumber) => {
 axios.get('/api/getAgents/?name='+searchName+'&email='+searchEmail+'&mobile='+searchMobile+'&company='+searchCompany+'&page='+pageNumber)
  .then(result=>{
     setAgentData(result.data.agents.data);  
     setCheckedIds(result.data.customer_ids.data);  
      setItemsCountPerPage(result.data.agents.per_page);  
      setTotalItemsCount(result.data.agents.total);  
      setActivePage(result.data.agents.current_page);
      setFromCount(result.data.agents.from);  
      setToCount(result.data.agents.to);  
      setTotalPages(result.data.agents.last_page);
  });
}

  const onChangeSearchName = e => {
    const searchEmail = e.target.value;
    setSearchName(searchEmail);
  };


const onChangeSearchEmail = e => {
    const searchEmail = e.target.value;
    setSearchEmail(searchEmail);
  };

const onChangeSearchMobile = e => {
    const searchMobile = e.target.value;
    setSearchMobile(searchMobile);
  };

  const onChangeSearchCompany = e => {
    const searchCompany = e.target.value;
    setSearchCompany(searchCompany);
  };

  const resetFilter = () => {
    setSearchName("");
    setSearchMobile("");
    setSearchEmail("");
    setSearchCompany("");
    axios.get('/api/getAgents/')
    .then(result=>{
      setAgentData(result.data.agents.data);  
      setCheckedIds(result.data.customer_ids.data);  
      setItemsCountPerPage(result.data.agents.per_page);  
      setTotalItemsCount(result.data.agents.total);  
      setActivePage(result.data.agents.current_page);
      setFromCount(result.data.agents.from);  
      setToCount(result.data.agents.to);  
      setTotalPages(result.data.agents.last_page);
    });
  }

  const findByFilter = () => {
    axios('/api/getAgents/?name='+searchName+'&email='+searchEmail+'&mobile='+searchMobile+'&company='+searchCompany)
    .then(result => {
      setAgentData(result.data.agents.data);  
      setCheckedIds(result.data.customer_ids.data);  
      setItemsCountPerPage(result.data.agents.per_page);  
      setTotalItemsCount(result.data.agents.total);  
      setActivePage(result.data.agents.current_page);
      setFromCount(result.data.agents.from);  
      setToCount(result.data.agents.to);  
      setTotalPages(result.data.agents.last_page);
    })
    .catch(e => {
      console.log(e);
    });
  };

  const isItemSelected = (id) => {
    let fruites = allChecked
    if (fruites.length > 0) {
      fruites.forEach(fruite => {
        if (fruite === id){
          console.log('if');
          return false;
        }
      })
    }else{
      return false;
    }
  }

  
  const toggleCheckbox = (e, item) => {   
    if(e.target.checked) {
      let arr = checkedBoxes;
      arr.push(item.id);

      setCheckedBoxes(arr);
    } else {       

      let items = checkedBoxes.splice(checkedBoxes.indexOf(item.id), 1);

      setCheckedBoxes(items)
    } 
    console.log(checkedBoxes);
  }


  const handleAllChecked = (event) => {
    let ids = [];
    let fruites = agentData
    fruites.forEach(fruite => {
      fruite.isChecked = event.target.checked
      ids.push(fruite.id)
    })
    setAgentData(fruites);
    setAllChecked(ids);
  }

  const handleCheckChieldElement = (event) => {
    let fruites = agentData
    fruites.forEach(fruite => {
       if (fruite.id == event.target.value){
          fruite.isChecked =  event.target.checked
        }
    })
    setAgentData(fruites);

    
  }
    console.log(agentData);

  return (  
    <div id="content-wrapper">
        {/* Main Content */}
        <div id="content">
          {/* Begin Page Content */}
          <div className="container-fluid">
            <div className="transactionhistory agentpage">
              {/* Page Heading */}
              <div className="row">
                <div className="col-sm-12">
                  <h1>Agents</h1>
                </div>
              </div>
              <div className="pillsbg">
                <div id="exTab3"> 
                  <ul className="nav nav-pills">
                    <li className="active">
                      <a href="#1b" data-toggle="tab">General</a>
                    </li>
                    <li><a href="#2b" data-toggle="tab">Personal/Business KYC</a>
                    </li>
                    <li><a href="#3b" data-toggle="tab">Booking</a>
                    </li>
                    <li><a href="#4a" data-toggle="tab">Bank Details</a>
                    </li>
                    <li><a href="#5a" data-toggle="tab">Vehicles</a>
                    </li>
                    <li><a href="#6a" data-toggle="tab">Drivers</a>
                    </li>
                    <li><a href="#7a" data-toggle="tab">Wallet</a>
                    </li>
                    <li><a href="#8a" data-toggle="tab">Payout</a>
                    </li>
                  </ul>
                  <div className="tab-content clearfix">
                    <div className="tab-pane active" id="1b">
                      <div className="col-sm-12">
                        <div className="title">Agent Details</div>
                        <form className="filterform informationform">
                          <div className="form">
                            <div className="form-group row">
                              <label htmlFor="labelname" className="col-sm-2">Travel Agency Name</label>
                              <div className="col-sm-10">
                                <input type="text" className="form-control" placeholder="Travel Agency Name" />
                              </div>
                            </div>
                            <div className="form-group row">
                              <label htmlFor="labelname" className="col-sm-2">Agent Name</label>
                              <div className="col-sm-10">
                                <input type="text" className="form-control" placeholder="Agent Name" />
                              </div>
                            </div>
                            <div className="form-group row">
                              <label htmlFor="labelname" className="col-sm-2">Father Name</label>
                              <div className="col-sm-10">
                                <input type="text" className="form-control" placeholder="Father Name" />
                              </div>
                            </div>
                            <div className="form-group row">
                              <label htmlFor="labelname" className="col-sm-2">Mobile Number</label>
                              <div className="col-sm-10">
                                <input type="number" className="form-control" placeholder="Mobile Number" />
                              </div>
                            </div>
                            <div className="form-group row">
                              <label htmlFor="labelname" className="col-sm-2">Email</label>
                              <div className="col-sm-10">
                                <input type="text" className="form-control" placeholder="Email" />
                              </div>
                            </div>
                            <div className="form-group row">
                              <label htmlFor="labelname" className="col-sm-2">Address</label>
                              <div className="col-sm-10">
                                <textarea name="w3review" rows={4} cols={50} placeholder="Address" className="form-control" defaultValue={""} />
                              </div>
                            </div>
                            <div className="form-group row">
                              <label htmlFor="labelname" className="col-sm-2">Pincode</label>
                              <div className="col-sm-10">
                                <input type="number" className="form-control" placeholder="Pincode" />
                              </div>
                            </div>
                            <div className="form-group row">
                              <label htmlFor="labelname" className="col-sm-2">City</label>
                              <div className="col-sm-10">
                                <input type="text" className="form-control" placeholder="City" />
                              </div>
                            </div>
                            <div className="form-group row">
                              <label htmlFor="labelname" className="col-sm-2">State</label>
                              <div className="col-sm-10">
                                <select className="form-control">
                                  <option selected>State</option>
                                  <option>1</option>
                                  <option>2</option>
                                  <option>3</option>
                                </select>
                              </div>
                            </div>
                            <div className="form-group row">
                              <label htmlFor="labelname" className="col-sm-2">DOB</label>
                              <div className="col-sm-10">
                                <input type="date" name="date" className="form-control" defaultValue="date" placeholder="DOB" />
                              </div>
                            </div>
                            <div className="form-group row">
                              <label htmlFor="labelname" className="col-sm-2">Town of Birth</label>
                              <div className="col-sm-10">
                                <input type="date" name="date" className="form-control" defaultValue="date" placeholder="Town of Birth" />
                              </div>
                            </div>
                            <div className="form-group row">
                              <label htmlFor="labelname" className="col-sm-2">Category</label>
                              <div className="col-sm-10">
                                <select className="form-control">
                                  <option selected>Category</option>
                                  <option>1</option>
                                  <option>2</option>
                                  <option>3</option>
                                </select>
                              </div>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                    <div className="tab-pane" id="2b">
                      <div className="col-sm-12">
                        <div className="title">Personal KYC Details</div>
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
                                  <td>Passport Photo</td>
                                  <td>
                                    <img src="image/icons/uploadimg.jpg" alt="image description" />
                                  </td>
                                  <td><a href="#"><i className="fa fa-download" /></a></td>
                                </tr>
                                <tr>
                                  <td>Signature</td>
                                  <td>
                                    <img src="image/icons/uploadimg.jpg" alt="image description" />
                                  </td>
                                  <td><a href="#"><i className="fa fa-download" /></a></td>
                                </tr>
                                <tr>
                                  <td>Aadhar Card/Front</td>
                                  <td>
                                    <img src="image/icons/uploadimg.jpg" alt="image description" />
                                  </td>
                                  <td><a href="#"><i className="fa fa-download" /></a></td>
                                </tr>
                                <tr>
                                  <td>Aadhar Card/Back</td>
                                  <td>
                                    <img src="image/icons/uploadimg.jpg" alt="image description" />
                                  </td>
                                  <td><a href="#"><i className="fa fa-download" /></a></td>
                                </tr>
                                <tr>
                                  <td>Driving License/Front</td>
                                  <td>
                                    <img src="image/icons/uploadimg.jpg" alt="image description" />
                                  </td>
                                  <td><a href="#"><i className="fa fa-download" /></a></td>
                                </tr>
                                <tr>
                                  <td>Driving License/Back</td>
                                  <td>
                                    <img src="image/icons/uploadimg.jpg" alt="image description" />
                                  </td>
                                  <td><a href="#"><i className="fa fa-download" /></a></td>
                                </tr>
                                <tr>
                                  <td>Passport / Front</td>
                                  <td>
                                    <img src="image/icons/uploadimg.jpg" alt="image description" />
                                  </td>
                                  <td><a href="#"><i className="fa fa-download" /></a></td>
                                </tr>
                                <tr>
                                  <td>Passport / Back</td>
                                  <td>
                                    <img src="image/icons/uploadimg.jpg" alt="image description" />
                                  </td>
                                  <td><a href="#"><i className="fa fa-download" /></a></td>
                                </tr>
                                <tr>
                                  <td>Pan Card</td>
                                  <td>
                                    <img src="image/icons/uploadimg.jpg" alt="image description" />
                                  </td>
                                  <td><a href="#"><i className="fa fa-download" /></a></td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                      <div className="col-sm-12">
                        <div className="title">Business KYC Details</div>
                        <form className="filterform informationform">
                          <div className="form">
                            <div className="form-group row">
                              <label htmlFor="labelname" className="col-sm-2">Company Name</label>
                              <div className="col-sm-10">
                                <input type="text" className="form-control" placeholder="Company Name" />
                              </div>
                            </div>
                            <div className="form-group row">
                              <label htmlFor="labelname" className="col-sm-2">Website</label>
                              <div className="col-sm-10">
                                <input type="text" className="form-control" placeholder="Website" />
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
                                  <td>CIN Number</td>
                                  <td>
                                    <img src="image/icons/uploadimg.jpg" alt="image description" />
                                  </td>
                                  <td><a href="#"><i className="fa fa-download" /></a></td>
                                </tr>
                                <tr>
                                  <td>Company Pan Card</td>
                                  <td>
                                    <img src="image/icons/uploadimg.jpg" alt="image description" />
                                  </td>
                                  <td><a href="#"><i className="fa fa-download" /></a></td>
                                </tr>
                                <tr>
                                  <td>Office address proof</td>
                                  <td>
                                    <img src="image/icons/uploadimg.jpg" alt="image description" />
                                  </td>
                                  <td><a href="#"><i className="fa fa-download" /></a></td>
                                </tr>
                                <tr>
                                  <td>GST Number (Optional)</td>
                                  <td>
                                    <img src="image/icons/uploadimg.jpg" alt="image description" />
                                  </td>
                                  <td><a href="#"><i className="fa fa-download" /></a></td>
                                </tr>
                                <tr>
                                  <td>Driving License/Front</td>
                                  <td>
                                    <img src="image/icons/uploadimg.jpg" alt="image description" />
                                  </td>
                                  <td><a href="#"><i className="fa fa-download" /></a></td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="tab-pane" id="3b">
                      <div className="col-sm-12">
                        <div className="title">Booking</div>
                        <div className="cardbg total-transaction kycdetail">
                          <div className="card-body">
                            <table className="table">
                              <thead className="thead-light">
                                <tr>
                                  <th scope="col">Date</th>
                                  <th scope="col">Booking Type</th>
                                  <th scope="col">Source</th>
                                  <th scope="col">Destination</th>
                                  <th scope="col">Start Date</th>
                                  <th scope="col">Return Date</th>
                                  <th scope="col">Person</th>
                                  <th scope="col">Action</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td>7-Jul-20</td>
                                  <td>Round Trip</td>
                                  <td>Delhi</td>
                                  <td>Manali</td>
                                  <td>14-Jul-20</td>
                                  <td>20-Jul-20</td>
                                  <td>5</td>
                                  <td><a href="#" className="btn btn-primary">View</a></td>
                                </tr>
                                <tr>
                                  <td>7-Jul-20</td>
                                  <td>Round Trip</td>
                                  <td>Delhi</td>
                                  <td>Manali</td>
                                  <td>14-Jul-20</td>
                                  <td>20-Jul-20</td>
                                  <td>5</td>
                                  <td><a href="#" className="btn btn-primary">View</a></td>
                                </tr>
                                <tr>
                                  <td>7-Jul-20</td>
                                  <td>Round Trip</td>
                                  <td>Delhi</td>
                                  <td>Manali</td>
                                  <td>14-Jul-20</td>
                                  <td>20-Jul-20</td>
                                  <td>5</td>
                                  <td><a href="#" className="btn btn-primary">View</a></td>
                                </tr>
                                <tr>
                                  <td>7-Jul-20</td>
                                  <td>Round Trip</td>
                                  <td>Delhi</td>
                                  <td>Manali</td>
                                  <td>14-Jul-20</td>
                                  <td>20-Jul-20</td>
                                  <td>5</td>
                                  <td><a href="#" className="btn btn-primary">View</a></td>
                                </tr>
                                <tr>
                                  <td>7-Jul-20</td>
                                  <td>Round Trip</td>
                                  <td>Delhi</td>
                                  <td>Manali</td>
                                  <td>14-Jul-20</td>
                                  <td>20-Jul-20</td>
                                  <td>5</td>
                                  <td><a href="#" className="btn btn-primary">View</a></td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="tab-pane" id="4a">
                      <div className="col-sm-12">
                        <div className="title">Bank Account Details</div>
                        <form className="filterform informationform">
                          <div className="form">
                            <div className="form-group row">
                              <label htmlFor="labelname" className="col-sm-2">Beneficiary Name</label>
                              <div className="col-sm-10">
                                <input type="text" className="form-control" placeholder="Beneficiary Name" />
                              </div>
                            </div>
                            <div className="form-group row">
                              <label htmlFor="labelname" className="col-sm-2">Account Number</label>
                              <div className="col-sm-10">
                                <input type="number" className="form-control" placeholder="Account Number" />
                              </div>
                            </div>
                            <div className="form-group row">
                              <label htmlFor="labelname" className="col-sm-2">Bank Name</label>
                              <div className="col-sm-10">
                                <input type="text" className="form-control" placeholder="Bank Name" />
                              </div>
                            </div>
                            <div className="form-group row">
                              <label htmlFor="labelname" className="col-sm-2">Branch IFSC Code</label>
                              <div className="col-sm-10">
                                <input type="text" className="form-control" placeholder="Branch IFSC Code" />
                              </div>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
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
                                    <tr>
                                      <td>
                                        Hatchback
                                      </td>
                                      <td>
                                        Dezire
                                      </td>
                                      <td>
                                        DL3SCL8604
                                      </td>
                                      <td><a href="#">Verified</a>
                                      </td>
                                      <td><a className="btn btn-primary edit">View</a>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>
                                        Hatchback
                                      </td>
                                      <td>
                                        Dezire
                                      </td>
                                      <td>
                                        DL3SCL8604
                                      </td>
                                      <td><a href="#">Verified</a>
                                      </td>
                                      <td><a className="btn btn-primary edit">View</a>
                                      </td>
                                    </tr><tr>
                                      <td>
                                        Hatchback
                                      </td>
                                      <td>
                                        Dezire
                                      </td>
                                      <td>
                                        DL3SCL8604
                                      </td>
                                      <td><a href="#">Verified</a>
                                      </td>
                                      <td><a className="btn btn-primary edit">View</a>
                                      </td>
                                    </tr><tr>
                                      <td>
                                        Hatchback
                                      </td>
                                      <td>
                                        Dezire
                                      </td>
                                      <td>
                                        DL3SCL8604
                                      </td>
                                      <td><a href="#">Verified</a>
                                      </td>
                                      <td><a className="btn btn-primary edit">View</a>
                                      </td>
                                    </tr><tr>
                                      <td>
                                        Hatchback
                                      </td>
                                      <td>
                                        Dezire
                                      </td>
                                      <td>
                                        DL3SCL8604
                                      </td>
                                      <td><a href="#" className="unverified">Unverified</a>
                                      </td>
                                      <td><a className="btn btn-primary edit">View</a>
                                      </td>
                                    </tr><tr>
                                      <td>
                                        Hatchback
                                      </td>
                                      <td>
                                        Dezire
                                      </td>
                                      <td>
                                        DL3SCL8604
                                      </td>
                                      <td><a href="#">Verified</a>
                                      </td>
                                      <td><a className="btn btn-primary edit">View</a>
                                      </td>
                                    </tr><tr>
                                      <td>
                                        Hatchback
                                      </td>
                                      <td>
                                        Dezire
                                      </td>
                                      <td>
                                        DL3SCL8604
                                      </td>
                                      <td><a href="#">Verified</a>
                                      </td>
                                      <td><a className="btn btn-primary edit">View</a>
                                      </td>
                                    </tr><tr>
                                      <td>
                                        Hatchback
                                      </td>
                                      <td>
                                        Dezire
                                      </td>
                                      <td>
                                        DL3SCL8604
                                      </td>
                                      <td><a href="#">Verified</a>
                                      </td>
                                      <td><a className="btn btn-primary edit">View</a>
                                      </td>
                                    </tr><tr>
                                      <td>
                                        Hatchback
                                      </td>
                                      <td>
                                        Dezire
                                      </td>
                                      <td>
                                        DL3SCL8604
                                      </td>
                                      <td><a href="#" className="unverified">Unverified</a>
                                      </td>
                                      <td><a className="btn btn-primary edit">View</a>
                                      </td>
                                    </tr><tr>
                                      <td>
                                        Hatchback
                                      </td>
                                      <td>
                                        Dezire
                                      </td>
                                      <td>
                                        DL3SCL8604
                                      </td>
                                      <td><a href="#">Verified</a>
                                      </td>
                                      <td><a className="btn btn-primary edit">View</a>
                                      </td>
                                    </tr>
                                    <tr><td colSpan={5}>
                                        <div className="col-sm-6">
                                          <nav aria-label="Page navigation">
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
                                    <input type="text" className="form-control" placeholder="Vehicle Type" />
                                  </div>
                                  <div className="form-group col-md-12">
                                    <label htmlFor="labelname">Vehicle Model</label>
                                    <input type="text" className="form-control" placeholder="Vehicle Model" />
                                  </div>
                                  <div className="form-group col-md-12">
                                    <label htmlFor="labelname">Vehicle Number</label>
                                    <input type="text" className="form-control" placeholder="Vehicle Number" />
                                  </div>
                                  <div className="form-group col-md-12">
                                    <label htmlFor="labelname">Document Status</label>
                                    <select id="inputState" className="form-control">
                                      <option selected>Verified</option>
                                      <option>Pending</option>
                                    </select>
                                  </div>
                                </div>
                                <div className="placebidbtn filterbtn">
                                  <a href="#" className="btn btn-primary">Filter</a>
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
                                    <option selected>Verified</option>
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
                                    <tr>
                                      <td>
                                        Rahul Kumar
                                      </td>
                                      <td>
                                        9200929292
                                      </td>
                                      <td>
                                        DL-000000000
                                      </td>
                                      <td><a href="#">Verified</a>
                                      </td>
                                      <td><a className="btn btn-primary editdriver">View</a>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>
                                        Rahul Kumar
                                      </td>
                                      <td>
                                        9200929292
                                      </td>
                                      <td>
                                        DL-000000000
                                      </td>
                                      <td><a href="#">Verified</a>
                                      </td>
                                      <td><a className="btn btn-primary editdriver">View</a>
                                      </td>
                                    </tr><tr>
                                      <td>
                                        Rahul Kumar
                                      </td>
                                      <td>
                                        9200929292
                                      </td>
                                      <td>
                                        DL-000000000
                                      </td>
                                      <td><a href="#">Verified</a>
                                      </td>
                                      <td><a className="btn btn-primary editdriver">View</a>
                                      </td>
                                    </tr><tr>
                                      <td>
                                        Rahul Kumar
                                      </td>
                                      <td>
                                        9200929292
                                      </td>
                                      <td>
                                        DL-000000000
                                      </td>
                                      <td><a href="#">Verified</a>
                                      </td>
                                      <td><a className="btn btn-primary editdriver">View</a>
                                      </td>
                                    </tr><tr>
                                      <td>
                                        Rahul Kumar
                                      </td>
                                      <td>
                                        9200929292
                                      </td>
                                      <td>
                                        DL-000000000
                                      </td>
                                      <td><a href="#">Verified</a>
                                      </td>
                                      <td><a className="btn btn-primary editdriver">View</a>
                                      </td>
                                    </tr><tr>
                                      <td>
                                        Rahul Kumar
                                      </td>
                                      <td>
                                        9200929292
                                      </td>
                                      <td>
                                        DL-000000000
                                      </td>
                                      <td><a href="#">Verified</a>
                                      </td>
                                      <td><a className="btn btn-primary editdriver">View</a>
                                      </td>
                                    </tr><tr>
                                      <td>
                                        Rahul Kumar
                                      </td>
                                      <td>
                                        9200929292
                                      </td>
                                      <td>
                                        DL-000000000
                                      </td>
                                      <td><a href="#">Verified</a>
                                      </td>
                                      <td><a className="btn btn-primary editdriver">View</a>
                                      </td>
                                    </tr><tr>
                                      <td>
                                        Rahul Kumar
                                      </td>
                                      <td>
                                        9200929292
                                      </td>
                                      <td>
                                        DL-000000000
                                      </td>
                                      <td><a href="#">Verified</a>
                                      </td>
                                      <td><a className="btn btn-primary editdriver">View</a>
                                      </td>
                                    </tr><tr>
                                      <td>
                                        Rahul Kumar
                                      </td>
                                      <td>
                                        9200929292
                                      </td>
                                      <td>
                                        DL-000000000
                                      </td>
                                      <td><a href="#" className="unverified">Unverified</a>
                                      </td>
                                      <td><a className="btn btn-primary editdriver">View</a>
                                      </td>
                                    </tr><tr>
                                      <td>
                                        Rahul Kumar
                                      </td>
                                      <td>
                                        9200929292
                                      </td>
                                      <td>
                                        DL-000000000
                                      </td>
                                      <td><a href="#">Verified</a>
                                      </td>
                                      <td><a className="btn btn-primary editdriver">View</a>
                                      </td>
                                    </tr>
                                    <tr><td colSpan={5}>
                                        <div className="col-sm-6">
                                          <nav aria-label="Page navigation">
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
                                    <label htmlFor="labelname">Driver Name</label>
                                    <input type="text" className="form-control" placeholder="Driver Name" />
                                  </div>
                                  <div className="form-group col-md-12">
                                    <label htmlFor="labelname">Mobile Number</label>
                                    <input type="text" className="form-control" placeholder="Mobile Number" />
                                  </div>
                                  <div className="form-group col-md-12">
                                    <label htmlFor="labelname">Driving Licence</label>
                                    <input type="text" className="form-control" placeholder="Driving Licence" />
                                  </div>
                                  <div className="form-group col-md-12">
                                    <label htmlFor="labelname">Document Status</label>
                                    <select id="inputState" className="form-control">
                                      <option selected>Verified</option>
                                      <option>Pending</option>
                                    </select>
                                  </div>
                                </div>
                                <div className="placebidbtn filterbtn">
                                  <a href="#" className="btn btn-primary">Filter</a>
                                </div>
                              </form>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="driveredit" style={{display: 'none'}}>
                        <div className="col-sm-12">
                          <div className="title">Driver Details</div>
                          <form className="filterform informationform">
                            <div className="form">
                              <div className="form-group row">
                                <label htmlFor="labelname" className="col-sm-2">Driver Name</label>
                                <div className="col-sm-10">
                                  <input type="text" className="form-control" placeholder="Driver Name" />
                                </div>
                              </div>
                              <div className="form-group row">
                                <label htmlFor="labelname" className="col-sm-2">Mobile Number</label>
                                <div className="col-sm-10">
                                  <input type="text" className="form-control" placeholder="Mobile Number" />
                                </div>
                              </div>
                              <div className="form-group row">
                                <label htmlFor="labelname" className="col-sm-2">Driving Liecence</label>
                                <div className="col-sm-10">
                                  <input type="text" className="form-control" placeholder="Driving Liecence" />
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
                                    <td>Driving Liecence</td>
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
                                    <option selected>Verified</option>
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
                    <div className="tab-pane" id="7a">
                      <div className="col-sm-12">
                        <div className="title">Wallet</div>
                      </div>
                      <div className="col-sm-6">
                        <div className="informationform">
                          <div className="row">
                            <div className="col-sm-4">
                              <div className="form-group">
                                <select className="form-control">
                                  <option>Transations Type</option>
                                  <option>Deposit</option>
                                  <option>Withdraw</option>
                                </select>
                              </div>
                            </div>
                            <div className="col-sm-4">
                              <input type="date" name="date" className="form-control" defaultValue="date" /> 
                            </div>
                            <div className="col-sm-4">
                              <input type="date" name="date" className="form-control" defaultValue="date" />
                            </div>    
                          </div>
                        </div>
                      </div>  
                      <div className="col-sm-4">
                        <div className="transaction-show">
                          <ul className="list-inline">
                            <li><a href="#" className="btn btn-primary">Filter</a></li>
                            <li><a href="#" className="btn btn-light">Export</a></li>
                            <li><a href="#" className="btn btn-primary">Reset</a></li>
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
                                  <tr>
                                    <td>14-Jul-20</td>
                                    <td>Deposit</td>
                                    <td><span>Released 30% Payment from</span> <a href="#">Rahul Kumar</a> <span>for Booking</span> <a href="#">Delhi to Manali</a></td>
                                    <td><i className="fa fa-inr" /> 5000</td>
                                  </tr>
                                  <tr>
                                    <td>14-Jul-20</td>
                                    <td>Deposit</td>
                                    <td><span>Done Commision Payment to Travel Jet for Booking</span> <a href="#">Delhi to Manali</a></td>
                                    <td><i className="fa fa-inr" /> 5000</td>
                                  </tr>
                                  <tr>
                                    <td>14-Jul-20</td>
                                    <td>Deposit</td>
                                    <td><span>Released 30% Payment from</span> <a href="#">Rahul Kumar</a> <span>for Booking</span> <a href="#">Delhi to Manali</a></td>
                                    <td><i className="fa fa-inr" /> 5000</td>
                                  </tr>
                                  <tr>
                                    <td>14-Jul-20</td>
                                    <td>Deposit</td>
                                    <td><span>Done Commision Payment to Travel Jet for Booking</span> <a href="#">Delhi to Manali</a></td>
                                    <td><i className="fa fa-inr" /> 5000</td>
                                  </tr>
                                  <tr>
                                    <td>14-Jul-20</td>
                                    <td>Deposit</td>
                                    <td><span>Released 30% Payment from</span> <a href="#">Rahul Kumar</a> <span>for Booking</span> <a href="#">Delhi to Manali</a></td>
                                    <td><i className="fa fa-inr" /> 5000</td>
                                  </tr>
                                  <tr>
                                    <td>14-Jul-20</td>
                                    <td>Deposit</td>
                                    <td><span>Done Commision Payment to Travel Jet for Booking</span> <a href="#">Delhi to Manali</a></td>
                                    <td><i className="fa fa-inr" /> 5000</td>
                                  </tr>
                                  <tr>
                                    <td>14-Jul-20</td>
                                    <td>Deposit</td>
                                    <td><span>Released 30% Payment from</span> <a href="#">Rahul Kumar</a> <span>for Booking</span> <a href="#">Delhi to Manali</a></td>
                                    <td><i className="fa fa-inr" /> 5000</td>
                                  </tr>
                                  <tr>
                                    <td>14-Jul-20</td>
                                    <td>Deposit</td>
                                    <td><span>Done Commision Payment to Travel Jet for Booking</span> <a href="#">Delhi to Manali</a></td>
                                    <td><i className="fa fa-inr" /> 5000</td>
                                  </tr>
                                  <tr>
                                    <td colSpan={4}>
                                      <div className="col-sm-6">
                                        <nav aria-label="Page navigation">
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
                                        <div className="showpage">Showing 1 to 13 of 20 (2 Pages)</div>
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
                                        <i className="fa fa-rupee" /> 4999
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
                    <div className="tab-pane" id="8a">
                      <div className="col-sm-12">
                        <div className="title">Patout</div>
                      </div>
                      <div className="col-sm-6">
                        <div className="informationform">
                          <div className="row">
                            <div className="col-sm-4">
                              <label htmlFor="labelname">Filter by From Date</label>
                              <input type="date" name="date" className="form-control" defaultValue="date" /> 
                            </div>
                            <div className="col-sm-4">
                              <label htmlFor="labelname">Filter by To Date</label>
                              <input type="date" name="date" className="form-control" defaultValue="date" />
                            </div>    
                          </div>
                        </div>
                      </div>  
                      <div className="col-sm-4">
                        <div className="transaction-show payout">
                          <ul className="list-inline">
                            <li><a href="#" className="btn btn-primary">Filter</a></li>
                            <li><a href="#" className="btn btn-light">Export</a></li>
                            <li><a href="#" className="btn btn-primary">Reset</a></li>
                          </ul>
                        </div>
                      </div> 
                      <div className="col-sm-9">
                        <br />
                        <div className="transactiondiv">
                          <div className="cardbg total-transaction">
                            <div className="card-body">
                              <table className="table">
                                <thead className="thead-light">
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
                                  <tr>
                                    <td colSpan={4}>
                                      <div className="col-sm-6">
                                        <nav aria-label="Page navigation">
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
                                        <div className="showpage">Showing 1 to 13 of 20 (2 Pages)</div>
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
  
export default AgentDetails