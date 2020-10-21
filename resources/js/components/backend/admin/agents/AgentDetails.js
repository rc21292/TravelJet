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
                  <h1>Agent</h1>
                </div>
              </div>
              <div className="pillsbg">
                <div id="exTab3"> 
                  <ul className="nav nav-pills">
                    <li className={activeTab == 1 ? 'active' : ''}>
                      <a href="#1" data-toggle="tab">General</a>
                    </li>
                    <li className={activeTab == 2 ? 'active' : ''}>
                      <a href="#2" data-toggle="tab">Personal/Business KYC</a>
                    </li>
                    <li className={activeTab == 3 ? 'active' : ''}>
                      <a href="#3" data-toggle="tab">Bookings</a>
                    </li>                    
                    <li className={activeTab == 4 ? 'active' : ''}>
                      <a href="#4" data-toggle="tab">Booked Bookings</a>
                    </li>
                    <li className={activeTab == 5 ? 'active' : ''}>
                      <a href="#5" data-toggle="tab">cancelled Bookings</a>
                    </li>
                    <li className={activeTab == 6 ? 'active' : ''}>
                      <a href="#6" data-toggle="tab">Bank Details</a>
                    </li>
                     <li className={activeTab == 7 ? 'active' : ''}>
                      <a href="#7" data-toggle="tab">Vehicles</a>
                    </li>
                    <li className={activeTab == 8 ? 'active' : ''}>
                      <a href="#8" data-toggle="tab">Drivers</a>
                    </li>
                    <li className={activeTab == 9 ? 'active' : ''}>
                      <a href="#9" data-toggle="tab">Wallet</a>
                    </li>                   
                    <li className={activeTab == 10 ? 'active' : ''}>
                      <a href="#10" data-toggle="tab">Payout</a>
                    </li>
                  </ul>
                  <div className="tab-content clearfix">
                   
                     <div className="tab-content clearfix">
                      <div className={activeTab == 1 ? 'tab-pane active' : 'tab-pane'} id={1}>
                        <div className="col-sm-12">
                          <div className="title">Customer Details</div>
                          <form className="filterform informationform">
                            <div className="form">
                              <div className="form-group row">
                                <label htmlFor="labelname" className="col-sm-2">Travel Agency Name</label>
                                <div className="col-sm-10">
                                  <input type="text" className="form-control" defaultValue={agentData.company} readOnly={true} placeholder="Travel Agency Name" />
                                </div>
                              </div>
                              <div className="form-group row">
                                <label htmlFor="labelname" className="col-sm-2">Agent Name</label>
                                <div className="col-sm-10">
                                  <input type="text" defaultValue={agentData.name} readOnly={true} className="form-control" placeholder="First Name" />
                                </div>
                              </div>
                              <div className="form-group row">
                                <label htmlFor="labelname" className="col-sm-2">Agent Name</label>
                                <div className="col-sm-10">
                                  <input type="text" defaultValue={agentData.father_name} readOnly={true} className="form-control" placeholder="Agent Name" />
                                </div>
                              </div>
                              <div className="form-group row">
                                <label htmlFor="labelname" className="col-sm-2">Mobile Number</label>
                                <div className="col-sm-10">
                                  <input type="number" defaultValue={agentData.phone}readOnly={true}  className="form-control" placeholder="Mobile Number" />
                                </div>
                              </div>
                              <div className="form-group row">
                                <label htmlFor="labelname" className="col-sm-2">Email</label>
                                <div className="col-sm-10">
                                  <input type="text" defaultValue={agentData.email} readOnly={true} className="form-control" placeholder="Email" />
                                </div>
                              </div>
                              <div className="form-group row">
                                <label htmlFor="labelname" className="col-sm-2">Address</label>
                                <div className="col-sm-10">
                                  <textarea name="w3review" rows={4} cols={50} placeholder="Address" readOnly={true} className="form-control"  defaultValue={agentData.address} />
                                </div>
                              </div>
                              <div className="form-group row">
                                <label htmlFor="labelname" className="col-sm-2">Pincode</label>
                                <div className="col-sm-10">
                                  <input type="number" className="form-control" readOnly={true} defaultValue={agentData.pincode} placeholder="Pincode" />
                                </div>
                              </div>
                              <div className="form-group row">
                                <label htmlFor="labelname" className="col-sm-2">City</label>
                                <div className="col-sm-10">
                                  <input type="text" className="form-control" readOnly={true} defaultValue={agentData.city} placeholder="City" />
                                </div>
                              </div>
                              <div className="form-group row">
                                <label htmlFor="labelname" className="col-sm-2">State</label>
                                <div className="col-sm-10">
                                  <input type="text" className="form-control" readOnly={true} defaultValue={agentData.state} placeholder="City" />
                                </div>
                              </div>
                              <div className="form-group row">
                                <label htmlFor="labelname" className="col-sm-2">DOB</label>
                                <div className="col-sm-10">
                                  <input type="date" name="date" readOnly={true} defaultValue={agentData.dob} className="form-control" placeholder="DOB" />
                                </div>
                              </div>
                              <div className="form-group row">
                                <label htmlFor="labelname" className="col-sm-2">Town of Birth</label>
                                <div className="col-sm-10">
                                  <input type="text" name="date" className="form-control" readOnly={true} defaultValue={agentData.birth_place} placeholder="Town of Birth" />
                                </div>
                              </div>
                              <div className="form-group row">
                                <label htmlFor="labelname" className="col-sm-2">Category</label>
                                <div className="col-sm-10">
                                  <input type="text" className="form-control" readOnly={true} defaultValue={agentData.category} placeholder="Category" />
                                </div>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                      <div className={activeTab == 2 ? 'tab-pane active' : 'tab-pane'} id={2}>
                        <KYCDetails agent_id={customerId} />
                      </div>
                       <div className={activeTab == 3 ? 'tab-pane active' : 'tab-pane'} id={3}>
                        <div className="booking_list test3" style={{display: 'block'}}>
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
                                    {
                                      bookingsData.map((booked,i)=>{
                                        return(   
                                        <tr key={i}>
                                          <td><Moment format="DD-MMM-YYYY">{booked.created_at}</Moment></td>
                                          <td>{booked.booking_type}</td>
                                          <td>{booked.from_places}</td>
                                          <td>{booked.to_places}</td>
                                          <td><Moment format="DD-MMM-YYYY">{booked.depart}</Moment></td>
                                          <td><Moment format="DD-MMM-YYYY">{booked.arrival}</Moment></td>
                                          <td>{booked.no_of_adults+booked.no_of_childrens+booked.no_of_infants}</td>
                                          <td><a href={'/booked/'+booked.id} className="btn btn-primary bookingstatus">View</a></td>
                                        </tr>
                                        )
                                      })
                                    }
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="booking_detail" style={{display: 'none'}}>
                          <div className="col-sm-9">
                            <div className="bookedstatus">
                              <div className="viewbookingright">
                                <div className="bookingdetail">
                                  <div className="bookeddata">
                                    <div className="bookingheader">
                                      <div className="row">
                                        <div className="col-sm-6">
                                          <div className="bookdetail">
                                            <h3>Booking Details</h3>
                                          </div>
                                        </div>
                                        <div className="col-sm-6">
                                          <div className="headerbudget">
                                            <div className="budgetprice">
                                              <b>Budget:</b> <i className="fa fa-inr" /> 3500 - 5500
                                            </div>
                                            <span>Booking ID:0000000</span>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="bookeddetail conformbooked">
                                      <ul className="list-unstyled">
                                        <li><span><div className="oneway">One Way Trip</div><div className="paiddiv">Paid</div></span></li>
                                        <li><span><div className="bktitle">Booking Title: Delhi to Manali Cab Booking</div></span></li>
                                        <li><span>Pickup Location: <b>Delhi</b></span></li>
                                        <li><span>Stoppage During the trip : <b>Kurukshetra - Ambala - Chandigarh</b></span></li>
                                        <li><span>Depart : <b>22nd March 2020</b></span></li>
                                        <li><span>Pickup Time : <b>3:00 AM</b></span></li>
                                        <li><span>Number of Person : <b>4 Adults + 2 Children + 2 infants</b></span></li>
                                        <li><span>Type of Vehicle : <b>Hatchback</b></span></li>
                                        <li><span>Total Kilometers : <b>570</b></span></li>
                                        <li>
                                          <div className="row">
                                            <div className="col-sm-6">
                                              <div className="bookedinclusion">Inclusions</div>
                                              <div className="form-group">
                                                <div className="bookinclusion">
                                                  State Tax,<br /> Toll Tax <br />Driver allowance<br /> Taxes
                                                </div>
                                              </div>
                                            </div>
                                            <div className="col-sm-6">
                                              <div className="bookedinclusion">Exclusions</div>
                                              <div className="form-group">
                                                <div className="bookinclusion">
                                                  Parking<br />
                                                  Night time allowance<br />
                                                  Additional place/destination visit<br /> Any type of Permits and Entrance fees.
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </li>
                                        <li><span>Description: <b>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</b></span></li>
                                      </ul>
                                    </div>
                                  </div>{/*End*/}
                                </div>
                                <div className="placebid">
                                  <div className="bookingheader">
                                    <div className="row">
                                      <div className="col-sm-12">
                                        <div className="bookdetail">
                                          <h3>Payment Detail</h3>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="placebidbook bookpayment">
                                    <div className="row">
                                      <div className="col-sm-6">
                                        <div className="paymentpart">
                                          Payment Partition
                                        </div>
                                        <div className="paypart">
                                          <table className="table">
                                            <thead className="thead-light">
                                              <tr>
                                                <th scope="col">Part</th>
                                                <th scope="col">Amount</th>
                                                <th scope="col">Status</th>
                                                <th scope="col">Transaction Id</th>
                                              </tr>
                                            </thead>
                                            <tbody>
                                              <tr>
                                                <td>1) First Part</td>
                                                <td> <i className="fa fa-inr" /> 3000</td>
                                                <td> <b>Paid</b> <a href="#" /></td>
                                                <td>00000000000</td>
                                              </tr>
                                              <tr>
                                                <td>2) Second Part</td>
                                                <td><i className="fa fa-inr" /> 3900</td>
                                                <td> <b>Paid</b> <a href="#" /></td>
                                                <td>00000000000</td>
                                              </tr>
                                            </tbody>
                                          </table>
                                        </div>
                                      </div>
                                      <div className="col-sm-6">
                                        <div className="totalpay">
                                          <table className="table">
                                            <tbody>
                                              <tr>
                                                <td className="lablename">Total Amount of whole Trip :</td>
                                                <td className="payprice"> <i className="fa fa-inr" /> 6000</td>
                                              </tr>
                                              <tr>
                                                <td className="lablename">Service Charge 10% :</td>
                                                <td className="payprice"> <i className="fa fa-inr" /> 600</td>
                                              </tr>
                                              <tr>
                                                <td className="lablename">GST 5% :</td>
                                                <td className="payprice"> <i className="fa fa-inr" /> 300</td>
                                              </tr>
                                              <tr>
                                                <td className="lablename">Net Amount :</td>
                                                <td className="payprice"> <i className="fa fa-inr" /> <b>6900</b></td>
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
                      </div>
                      <div className={activeTab == 4 ? 'tab-pane active' : 'tab-pane'} id={4}>
                        <div className="booking_list test3" style={{display: 'block'}}>
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
                                    {
                                      bookedsData.map((booked,i)=>{
                                        return(   
                                        <tr key={i}>
                                          <td><Moment format="DD-MMM-YYYY">{booked.created_at}</Moment></td>
                                          <td>{booked.booking_type}</td>
                                          <td>{booked.from_places}</td>
                                          <td>{booked.to_places}</td>
                                          <td><Moment format="DD-MMM-YYYY">{booked.depart}</Moment></td>
                                          <td><Moment format="DD-MMM-YYYY">{booked.arrival}</Moment></td>
                                          <td>{booked.no_of_adults+booked.no_of_childrens+booked.no_of_infants}</td>
                                          <td><a href={'/booked/'+booked.id} className="btn btn-primary bookingstatus">View</a></td>
                                        </tr>
                                        )
                                      })
                                    }
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="booking_detail" style={{display: 'none'}}>
                          <div className="col-sm-9">
                            <div className="bookedstatus">
                              <div className="viewbookingright">
                                <div className="bookingdetail">
                                  <div className="bookeddata">
                                    <div className="bookingheader">
                                      <div className="row">
                                        <div className="col-sm-6">
                                          <div className="bookdetail">
                                            <h3>Booking Details</h3>
                                          </div>
                                        </div>
                                        <div className="col-sm-6">
                                          <div className="headerbudget">
                                            <div className="budgetprice">
                                              <b>Budget:</b> <i className="fa fa-inr" /> 3500 - 5500
                                            </div>
                                            <span>Booking ID:0000000</span>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="bookeddetail conformbooked">
                                      <ul className="list-unstyled">
                                        <li><span><div className="oneway">One Way Trip</div><div className="paiddiv">Paid</div></span></li>
                                        <li><span><div className="bktitle">Booking Title: Delhi to Manali Cab Booking</div></span></li>
                                        <li><span>Pickup Location: <b>Delhi</b></span></li>
                                        <li><span>Stoppage During the trip : <b>Kurukshetra - Ambala - Chandigarh</b></span></li>
                                        <li><span>Depart : <b>22nd March 2020</b></span></li>
                                        <li><span>Pickup Time : <b>3:00 AM</b></span></li>
                                        <li><span>Number of Person : <b>4 Adults + 2 Children + 2 infants</b></span></li>
                                        <li><span>Type of Vehicle : <b>Hatchback</b></span></li>
                                        <li><span>Total Kilometers : <b>570</b></span></li>
                                        <li>
                                          <div className="row">
                                            <div className="col-sm-6">
                                              <div className="bookedinclusion">Inclusions</div>
                                              <div className="form-group">
                                                <div className="bookinclusion">
                                                  State Tax,<br /> Toll Tax <br />Driver allowance<br /> Taxes
                                                </div>
                                              </div>
                                            </div>
                                            <div className="col-sm-6">
                                              <div className="bookedinclusion">Exclusions</div>
                                              <div className="form-group">
                                                <div className="bookinclusion">
                                                  Parking<br />
                                                  Night time allowance<br />
                                                  Additional place/destination visit<br /> Any type of Permits and Entrance fees.
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </li>
                                        <li><span>Description: <b>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</b></span></li>
                                      </ul>
                                    </div>
                                  </div>{/*End*/}
                                </div>
                                <div className="placebid">
                                  <div className="bookingheader">
                                    <div className="row">
                                      <div className="col-sm-12">
                                        <div className="bookdetail">
                                          <h3>Payment Detail</h3>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="placebidbook bookpayment">
                                    <div className="row">
                                      <div className="col-sm-6">
                                        <div className="paymentpart">
                                          Payment Partition
                                        </div>
                                        <div className="paypart">
                                          <table className="table">
                                            <thead className="thead-light">
                                              <tr>
                                                <th scope="col">Part</th>
                                                <th scope="col">Amount</th>
                                                <th scope="col">Status</th>
                                                <th scope="col">Transaction Id</th>
                                              </tr>
                                            </thead>
                                            <tbody>
                                              <tr>
                                                <td>1) First Part</td>
                                                <td> <i className="fa fa-inr" /> 3000</td>
                                                <td> <b>Paid</b> <a href="#" /></td>
                                                <td>00000000000</td>
                                              </tr>
                                              <tr>
                                                <td>2) Second Part</td>
                                                <td><i className="fa fa-inr" /> 3900</td>
                                                <td> <b>Paid</b> <a href="#" /></td>
                                                <td>00000000000</td>
                                              </tr>
                                            </tbody>
                                          </table>
                                        </div>
                                      </div>
                                      <div className="col-sm-6">
                                        <div className="totalpay">
                                          <table className="table">
                                            <tbody>
                                              <tr>
                                                <td className="lablename">Total Amount of whole Trip :</td>
                                                <td className="payprice"> <i className="fa fa-inr" /> 6000</td>
                                              </tr>
                                              <tr>
                                                <td className="lablename">Service Charge 10% :</td>
                                                <td className="payprice"> <i className="fa fa-inr" /> 600</td>
                                              </tr>
                                              <tr>
                                                <td className="lablename">GST 5% :</td>
                                                <td className="payprice"> <i className="fa fa-inr" /> 300</td>
                                              </tr>
                                              <tr>
                                                <td className="lablename">Net Amount :</td>
                                                <td className="payprice"> <i className="fa fa-inr" /> <b>6900</b></td>
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
                      </div>
                      <div className={activeTab == 5 ? 'tab-pane active' : 'tab-pane'} id={5}>
                        <div className="booking_list test3" style={{display: 'block'}}>
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
                                    {
                                      cancelledData.map((booked,i)=>{
                                        return(   
                                        <tr key={i}>
                                          <td><Moment format="DD-MMM-YYYY">{booked.created_at}</Moment></td>
                                          <td>{booked.booking_type}</td>
                                          <td>{booked.from_places}</td>
                                          <td>{booked.to_places}</td>
                                          <td><Moment format="DD-MMM-YYYY">{booked.depart}</Moment></td>
                                          <td><Moment format="DD-MMM-YYYY">{booked.arrival}</Moment></td>
                                          <td>{booked.no_of_adults+booked.no_of_childrens+booked.no_of_infants}</td>
                                          <td><a href={'/booked/'+booked.id} className="btn btn-primary bookingstatus">View</a></td>
                                        </tr>
                                        )
                                      })
                                    }
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="booking_detail" style={{display: 'none'}}>
                          <div className="col-sm-9">
                            <div className="bookedstatus">
                              <div className="viewbookingright">
                                <div className="bookingdetail">
                                  <div className="bookeddata">
                                    <div className="bookingheader">
                                      <div className="row">
                                        <div className="col-sm-6">
                                          <div className="bookdetail">
                                            <h3>Booking Details</h3>
                                          </div>
                                        </div>
                                        <div className="col-sm-6">
                                          <div className="headerbudget">
                                            <div className="budgetprice">
                                              <b>Budget:</b> <i className="fa fa-inr" /> 3500 - 5500
                                            </div>
                                            <span>Booking ID:0000000</span>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="bookeddetail conformbooked">
                                      <ul className="list-unstyled">
                                        <li><span><div className="oneway">One Way Trip</div><div className="paiddiv">Paid</div></span></li>
                                        <li><span><div className="bktitle">Booking Title: Delhi to Manali Cab Booking</div></span></li>
                                        <li><span>Pickup Location: <b>Delhi</b></span></li>
                                        <li><span>Stoppage During the trip : <b>Kurukshetra - Ambala - Chandigarh</b></span></li>
                                        <li><span>Depart : <b>22nd March 2020</b></span></li>
                                        <li><span>Pickup Time : <b>3:00 AM</b></span></li>
                                        <li><span>Number of Person : <b>4 Adults + 2 Children + 2 infants</b></span></li>
                                        <li><span>Type of Vehicle : <b>Hatchback</b></span></li>
                                        <li><span>Total Kilometers : <b>570</b></span></li>
                                        <li>
                                          <div className="row">
                                            <div className="col-sm-6">
                                              <div className="bookedinclusion">Inclusions</div>
                                              <div className="form-group">
                                                <div className="bookinclusion">
                                                  State Tax,<br /> Toll Tax <br />Driver allowance<br /> Taxes
                                                </div>
                                              </div>
                                            </div>
                                            <div className="col-sm-6">
                                              <div className="bookedinclusion">Exclusions</div>
                                              <div className="form-group">
                                                <div className="bookinclusion">
                                                  Parking<br />
                                                  Night time allowance<br />
                                                  Additional place/destination visit<br /> Any type of Permits and Entrance fees.
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </li>
                                        <li><span>Description: <b>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</b></span></li>
                                      </ul>
                                    </div>
                                  </div>{/*End*/}
                                </div>
                                <div className="placebid">
                                  <div className="bookingheader">
                                    <div className="row">
                                      <div className="col-sm-12">
                                        <div className="bookdetail">
                                          <h3>Payment Detail</h3>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="placebidbook bookpayment">
                                    <div className="row">
                                      <div className="col-sm-6">
                                        <div className="paymentpart">
                                          Payment Partition
                                        </div>
                                        <div className="paypart">
                                          <table className="table">
                                            <thead className="thead-light">
                                              <tr>
                                                <th scope="col">Part</th>
                                                <th scope="col">Amount</th>
                                                <th scope="col">Status</th>
                                                <th scope="col">Transaction Id</th>
                                              </tr>
                                            </thead>
                                            <tbody>
                                              <tr>
                                                <td>1) First Part</td>
                                                <td> <i className="fa fa-inr" /> 3000</td>
                                                <td> <b>Paid</b> <a href="#" /></td>
                                                <td>00000000000</td>
                                              </tr>
                                              <tr>
                                                <td>2) Second Part</td>
                                                <td><i className="fa fa-inr" /> 3900</td>
                                                <td> <b>Paid</b> <a href="#" /></td>
                                                <td>00000000000</td>
                                              </tr>
                                            </tbody>
                                          </table>
                                        </div>
                                      </div>
                                      <div className="col-sm-6">
                                        <div className="totalpay">
                                          <table className="table">
                                            <tbody>
                                              <tr>
                                                <td className="lablename">Total Amount of whole Trip :</td>
                                                <td className="payprice"> <i className="fa fa-inr" /> 6000</td>
                                              </tr>
                                              <tr>
                                                <td className="lablename">Service Charge 10% :</td>
                                                <td className="payprice"> <i className="fa fa-inr" /> 600</td>
                                              </tr>
                                              <tr>
                                                <td className="lablename">GST 5% :</td>
                                                <td className="payprice"> <i className="fa fa-inr" /> 300</td>
                                              </tr>
                                              <tr>
                                                <td className="lablename">Net Amount :</td>
                                                <td className="payprice"> <i className="fa fa-inr" /> <b>6900</b></td>
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
                      </div>
                      <div className={activeTab == 6 ? 'tab-pane active' : 'tab-pane'} id={6}>
                          <div className="col-sm-12">
                           <div className="title">Bank Account Details</div>
                           <form className="filterform informationform">
                              <div className="form">
                                 <div className="form-group row">
                                    <label htmlFor="labelname" className="col-sm-2">Beneficiary Name</label>
                                    <div className="col-sm-10">
                                       <input type="text" className="form-control" readOnly={true} defaultValue={agentData.beneficiary_name} placeholder="Beneficiary Name" />
                                    </div>
                                 </div>
                                 <div className="form-group row">
                                    <label htmlFor="labelname" className="col-sm-2">Account Number</label>
                                    <div className="col-sm-10">
                                       <input type="number" className="form-control" readOnly={true} defaultValue={agentData.account_number} placeholder="Account Number" />
                                    </div>
                                 </div>
                                 <div className="form-group row">
                                    <label htmlFor="labelname" className="col-sm-2">Bank Name</label>
                                    <div className="col-sm-10">
                                       <input type="text" className="form-control" readOnly={true} defaultValue={agentData.bank_name} placeholder="Bank Name" />
                                    </div>
                                 </div>
                                 <div className="form-group row">
                                    <label htmlFor="labelname" className="col-sm-2">Branch IFSC Code</label>
                                    <div className="col-sm-10">
                                       <input type="text" className="form-control" readOnly={true} defaultValue={agentData.branch_ifsc_code} placeholder="Branch IFSC Code" />
                                    </div>
                                 </div>
                              </div>
                           </form>
                        </div>
                      </div>
                      <div className={activeTab == 7 ? 'tab-pane active' : 'tab-pane'} id={7}>
                        <AgentVehicles agent_id={customerId} />
                      </div>
                      <div className={activeTab == 8 ? 'tab-pane active' : 'tab-pane'} id={8}>
                        <AgentDrivers agent_id={customerId} />
                      </div>
                      <div className={activeTab == 9 ? 'tab-pane active' : 'tab-pane'} id={9}>
                       <AgentWallet agent_id={customerId} />
                      </div>
                      <div className={activeTab == 10 ? 'tab-pane active' : 'tab-pane'} id={10}>
                        <div className="col-sm-12">
                          <div className="title">Patout</div>
                        </div>
                        <div className="col-sm-6">
                          <div className="informationform">
                            <div className="row">
                              <div className="col-sm-4">
                                <label htmlFor="labelname">Filter by From Date</label>
                                <input type="date" name="from_date" className="form-control" value={searchDateFrom}  onChange={onChangeSearchDateFrom} /> 
                              </div>
                              <div className="col-sm-4">
                                <label htmlFor="labelname">Filter by To Date</label>
                                <input type="date" name="to_date" className="form-control" value={searchDateTo} onChange={onChangeSearchDateTo}/>
                              </div>    
                            </div>
                          </div>
                        </div>  
                        <div className="col-sm-4">
                          <div className="transaction-show payout">
                            <ul className="list-inline">
                              <li><a onClick={findByFilter} className="btn btn-primary">Filter</a></li>
                              <li><CSVLink className="btn btn-primary" {...csvReport}>Export</CSVLink></li>
                              <li><a onClick={resetFilter} className="btn btn-primary">Reset</a></li>
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
                                    {  
                                      payoutsData.map((query, idx) => {  
                                        return  <tr key={idx}>
                                            <td> <Moment format="DD-MMM-YYYY">{query.created_at}</Moment></td>  
                                            <td>{query.amount}</td>
                                            <td>{query.payment_method}</td>  
                                            <td>{query.transaction_id}</td>  
                                        </tr>  
                                        })
                                      }
                                    <tr>
                                      <td colSpan={4}>
                                        <div className="col-sm-6">
                                           <Pagination
                                            activePage={activePagePayout}
                                            itemsCountPerPage={itemsCountPerPagePayout}
                                            totalItemsCount={totalItemsCountPayout}
                                            pageRangeDisplayed={pageRangeDisplayed}
                                            onChange={handlePageChangePayout}
                                            itemClass="page-item"
                                            linkClass="page-link"
                                            prevPageText="Prev"
                                            nextPageText="Next"
                                            lastPageText="Last"
                                            firstPageText="First"
                                            />
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
            </div>
          </div>
          {/* /.container-fluid */}
        </div>
      </div>
  )  
}  
  
export default AgentDetails