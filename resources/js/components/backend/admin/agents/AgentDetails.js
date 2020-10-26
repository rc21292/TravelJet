import React from 'react'  
import axios from 'axios';  
import { useHistory, useLocation } from 'react-router-dom'
import { CSVLink } from "react-csv";
import AgentWallet from "./AgentWallet";
import AgentVehicles from "./AgentVehicles";
import AgentDrivers from "./AgentDrivers";
import KYCDetails from "./KYCDetails";
import Pagination from "react-js-pagination";
import { useState, useEffect } from 'react'  
import Moment from 'react-moment';


function AgentDetails(props) {

  const history = useHistory()

  const [user, setUser] = useState(false);

  const [activeTab, setActiveTab] = useState(1); 
  const [customerId, setCustomerId] = useState(0); 

  const [agentData, setAgentData] = useState({}); 


  const [searchDateFrom, setSearchDateFrom] = useState("");
  const [searchDateTo, setSearchDateTo] = useState("");

  const [balance, setBalance] = useState(false);


  const [payoutsData, setPayoutsData] = useState([]);    

  const [headersData, setHeadersData] = useState([
    { label: "Agent Name", key: "name" },
    { label: "Amount", key: "amount" },
    { label: "Payment Method", key: "payment_method" },
    { label: "Processing Date", key: "processing_date" },
    { label: "Transaction Id", key: "transaction_id" }
  ]);

   const [csvData, setCsvData] = useState([]);

  const [csvReport, setCsvReport] = useState({data: csvData,headers: headersData,filename: 'Transactions.csv'});  

  const [pageRangeDisplayed, setPageRangeDisplayed] = useState(3); 

  const [bookingsData, setBookingsData] = useState([]);  
  const [bookedsData, setBookedsData] = useState([]);  
  const [cancelledData, setCancelledData] = useState([]);  


  const [fromCountPayout, setFromCountPayout] = useState(1);  
  const [toCountPayout, setToCountPayout] = useState(1);  
  const [totalPagesPayout, setTotalPagesPayout] = useState(1);

  const [activePagePayout, setActivePagePayout] = useState(1);  
  const [itemsCountPerPagePayout, setItemsCountPerPagePayout] = useState(1);  
  const [totalItemsCountPayout, setTotalItemsCountPayout] = useState(1);  


  const [fromCount, setFromCount] = useState(1);  
  const [toCount, setToCount] = useState(1);  
  const [totalPages, setTotalPages] = useState(1);

  const [activePage, setActivePage] = useState(1);  
  const [itemsCountPerPage, setItemsCountPerPage] = useState(1);  
  const [totalItemsCount, setTotalItemsCount] = useState(1);  

  const [activePage1, setActivePage1] = useState(1);  
  const [itemsCountPerPage1, setItemsCountPerPage1] = useState(1);  
  const [totalItemsCount1, setTotalItemsCount1] = useState(1);

  const [activePage2, setActivePage2] = useState(1);  
  const [itemsCountPerPage2, setItemsCountPerPage2] = useState(1);  
  const [totalItemsCount2, setTotalItemsCount2] = useState(1); 

  const [activePage3, setActivePage3] = useState(1);  
  const [itemsCountPerPage3, setItemsCountPerPage3] = useState(1);  
  const [totalItemsCount3, setTotalItemsCount3] = useState(1); 

  useEffect(() => {

    let parts = location.pathname.split('/');
    let customer_id = parts.pop() || parts.pop();  
    setCustomerId(customer_id);

    const search = window.location.search;
    const params = new URLSearchParams(search);
    const active_tab = params.get('tab');
    if (active_tab > 0) {
      setActiveTab(active_tab);
    }else{
      setActiveTab(1);
    }

    let stateqq = localStorage["appState"];
    if (stateqq) {
      let AppState = JSON.parse(stateqq);
      setUser(AppState.user);
       axios.get('/api/getBookingsByAgentId/'+customer_id).then(result=>{
       setBookingsData(result.data.data); 
        setItemsCountPerPage1(result.data.per_page);  
        setTotalItemsCount1(result.data.total);  
        setActivePage1(result.data.current_page);
      });
      axios.get('/api/getBookedBookingsByAgentId/'+customer_id).then(result=>{
        setBookedsData(result.data.data); 
        setItemsCountPerPage2(result.data.per_page);  
        setTotalItemsCount2(result.data.total);  
        setActivePage2(result.data.current_page);
      });
      axios.get('/api/getCnceledBookingsByAgentId/'+customer_id).then(result=>{
        setCancelledData(result.data.data); 
        setItemsCountPerPage3(result.data.per_page);  
        setTotalItemsCount3(result.data.total);  
        setActivePage3(result.data.current_page);
      });
      axios.get('/api/getAgentDetails/'+customer_id).then(result=>{
        setAgentData(result.data);
      });

      axios('/api/payoutTransactions/'+customer_id).then(result=>{
        setCsvReport({...csvReport,data:result.data.payouts.data});  
        setPayoutsData(result.data.payouts.data);
        setFromCountPayout(result.data.payouts.from);  
        setToCountPayout(result.data.payouts.to);  
        setTotalPagesPayout(result.data.payouts.last_page);  
        setItemsCountPerPagePayout(result.data.payouts.per_page);  
        setTotalItemsCountPayout(result.data.payouts.total);  
        setActivePagePayout(result.data.payouts.current_page);
      });

    }   

  }, []);  


   const onChangeSearchDateFrom = e => {
    const searchTransactionType = e.target.value;
    setSearchDateFrom(searchTransactionType);
  };

  const onChangeSearchDateTo = e => {
    const searchTransactionType = e.target.value;
    setSearchDateTo(searchTransactionType);
  };


  const resetFilter = () => {
    setSearchDateTo("");
    setSearchDateFrom("");
    axios.get('/api/payoutTransactions/'+customerId)
    .then(result=>{
      setPayoutsData(result.data.payouts.data);  
      setItemsCountPerPage(result.data.payouts.per_page);  
      setTotalItemsCount(result.data.payouts.total);  
      setActivePage(result.data.payouts.current_page);

    }); 

  }

   const findByFilter = () => {

    axios(`/api/payoutTransactions/${customerId}?from_date=${searchDateFrom}&to_date=${searchDateTo}`)
    .then(result => {
      setPayoutsData(result.data.payouts.data);  
      setCsvReport({...csvReport,data:result.data.payouts.data});  
      setItemsCountPerPage(result.data.payouts.per_page);  
      setTotalItemsCount(result.data.payouts.total);  
      setActivePage(result.data.payouts.current_page);
    })
    .catch(e => {
      console.log(e);
    });
  };

  const handlePageChangePayout = (pageNumber) => {
    axios.get('/api/payoutTransactions/'+customerId+'?page='+pageNumber)
    .then(result=>{
      setCsvReport({...csvReport,data:result.data.payouts.data}); 
     setPayoutsData(result.data.payouts.data);
     setItemsCountPerPagePayout(result.data.payouts.per_page);
     setFromCountPayout(result.data.payouts.from);  
     setToCountPayout(result.data.payouts.to);  
     setTotalPagesPayout(result.data.payouts.last_page);
     setTotalItemsCountPayout(result.data.payouts.total);  
     setActivePagePayout(result.data.payouts.current_page);
   });
  }


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