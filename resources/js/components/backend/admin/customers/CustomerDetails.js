import React from 'react'  
import axios from 'axios';  
import { useHistory, useLocation } from 'react-router-dom'
import { CSVLink } from "react-csv";
import Pagination from "react-js-pagination";
import { useState, useEffect } from 'react'  
import Moment from 'react-moment';


function CustomerDetails(props) { 

  const history = useHistory()

  const [user, setUser] = useState(false);

  const [activeTab, setActiveTab] = useState(1); 
  const [customerId, setCustomerId] = useState(0); 

  const [customerData, setCustomerData] = useState({}); 

  const [balance, setBalance] = useState(false);

  const [walletTransactions, setWalletTransactions] = useState([]);  

  const [pageRangeDisplayed, setPageRangeDisplayed] = useState(3); 

  const [bookingsData, setBookingsData] = useState([]);  
  const [bookedsData, setBookedsData] = useState([]);  
  const [cancelledData, setCancelledData] = useState([]);    

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
       axios.get('/api/getBookingsByUserId/'+customer_id).then(result=>{
       setBookingsData(result.data.data); 
        setItemsCountPerPage1(result.data.per_page);  
        setTotalItemsCount1(result.data.total);  
        setActivePage1(result.data.current_page);
      });
      axios.get('/api/getBookedBookingsByUserId/'+customer_id).then(result=>{
        setBookedsData(result.data.data); 
        setItemsCountPerPage2(result.data.per_page);  
        setTotalItemsCount2(result.data.total);  
        setActivePage2(result.data.current_page);
      });
      axios.get('/api/getCnceledBookingsByUserId/'+customer_id).then(result=>{
        setCancelledData(result.data.data); 
        setItemsCountPerPage3(result.data.per_page);  
        setTotalItemsCount3(result.data.total);  
        setActivePage3(result.data.current_page);
      });
      axios.get('/api/getCustomerDetails/'+customer_id).then(result=>{
        setCustomerData(result.data);
      });

       axios.get('/api/users/getbalance/'+customer_id)
      .then(response=>{
        setBalance(response.data.balance);
      });

      axios('/api/wallet_transactions/'+customer_id).then(result=>{
        setWalletTransactions(result.data.data);  
        setItemsCountPerPage(result.data.per_page);  
        setTotalItemsCount(result.data.total);  
        setActivePage(result.data.current_page);
      });

    }   

  }, []);  


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
                  <h1>Customer</h1>
                </div>
              </div>
              <div className="pillsbg">
                <div id="exTab3"> 
                  <ul className="nav nav-pills">
                    <li className={activeTab == 1 ? 'active' : ''}>
                      <a href="#1" data-toggle="tab">General</a>
                    </li>
                    <li className={activeTab == 2 ? 'active' : ''}>
                      <a href="#2" data-toggle="tab">Booking</a>
                    </li>
                    <li className={activeTab == 3 ? 'active' : ''}>
                      <a href="#3" data-toggle="tab">Booked Bookings</a>
                    </li>
                    <li className={activeTab == 4 ? 'active' : ''}>
                      <a href="#4" data-toggle="tab">cancelled Bookings</a>
                    </li>
                    <li className={activeTab == 5 ? 'active' : ''}>
                      <a href="#5" data-toggle="tab">Wallet</a>
                    </li>
                  </ul>
                  <div className="tab-content clearfix">
                    <div className={activeTab == 1 ? 'tab-pane active' : 'tab-pane'} id={1}>
                      <div className="col-sm-12">
                        <div className="title">Customer Details</div>
                        <form className="filterform informationform">
                          <div className="form">
                            <div className="form-group row">
                              <label htmlFor="labelname" className="col-sm-2">Full Name</label>
                              <div className="col-sm-10">
                                <input type="text" defaultValue={customerData.name} readOnly={true} className="form-control" placeholder="First Name" />
                              </div>
                            </div>
                            <div className="form-group row">
                              <label htmlFor="labelname" className="col-sm-2">Mobile Number</label>
                              <div className="col-sm-10">
                                <input type="number" defaultValue={customerData.phone}readOnly={true}  className="form-control" placeholder="Mobile Number" />
                              </div>
                            </div>
                            <div className="form-group row">
                              <label htmlFor="labelname" className="col-sm-2">Email</label>
                              <div className="col-sm-10">
                                <input type="text" defaultValue={customerData.email} readOnly={true} className="form-control" placeholder="Email" />
                              </div>
                            </div>
                            <div className="form-group row">
                              <label htmlFor="labelname" className="col-sm-2">Address</label>
                              <div className="col-sm-10">
                                <textarea name="w3review" rows={4} cols={50} placeholder="Address" readOnly={true} className="form-control"  defaultValue={customerData.address} />
                              </div>
                            </div>
                            <div className="form-group row">
                              <label htmlFor="labelname" className="col-sm-2">Pincode</label>
                              <div className="col-sm-10">
                                <input type="number" className="form-control" readOnly={true} defaultValue={customerData.pincode} placeholder="Pincode" />
                              </div>
                            </div>
                            <div className="form-group row">
                              <label htmlFor="labelname" className="col-sm-2">City</label>
                              <div className="col-sm-10">
                                <input type="text" className="form-control" readOnly={true} defaultValue={customerData.city} placeholder="City" />
                              </div>
                            </div>
                            <div className="form-group row">
                              <label htmlFor="labelname" className="col-sm-2">State</label>
                              <div className="col-sm-10">
                                <input type="text" className="form-control" readOnly={true} defaultValue={customerData.state} placeholder="City" />
                              </div>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                    <div className={activeTab == 2 ? 'tab-pane active' : 'tab-pane'} id={2}>
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
                    <div className={activeTab == 5 ? 'tab-pane active' : 'tab-pane'} id={5}>
                       <div className="col-sm-12 adminwallet">
                        <div className="wallet-page">
                          <div className="customerwallet">
                            <div className="row">
                              <div className="col-sm-12">
                                <div className="total">
                                  Total Balance
                                </div>
                                <div className="price">
                                  <i className="fa fa-rupee" /> {balance}
                                </div>
                              </div>
                            </div>
                            <div className="row">
                              <div className="transaction">
                                <table className="table">
                                  <thead className="thead-light">
                                    <tr>
                                      <th scope="col">TRANSACTION</th>
                                      <th scope="col">AMOUNT</th>
                                      <th scope="col">STATUS</th>
                                      <th scope="col">COMMENT</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {
                                      walletTransactions.map((query, idx) => {  
                                      return  <tr key={idx}>
                                        <td>
                                          <span className="date"><Moment format="MMMM YYYY">{query.created_at}</Moment></span><br />
                                          <span className="paidloca">Paid for {query.booking_name}</span><br />
                                          <span className="datetime"><Moment format="DD MMMM YYYY h:mm a">{query.created_at}</Moment></span><br />
                                          <span className="bookid">Booking ID:00000{query.booking_id}</span><br />
                                          <span className="bookid">Transaction ID:{query.transaction_id}</span>
                                        </td>
                                        <td>
                                          <span className="paidprice">
                                            {(query.type == 'deposit') ? '+ ' : '- ' } <i className="fa fa-rupee" /> {query.amount}
                                          </span>
                                        </td>
                                        <td>{(query.status) ? 'SUCCESS' : 'Fail'}</td>
                                        <td>{(query.description)}</td>
                                      </tr>
                                      })}  
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
        {/* End of Main Content */}
      </div>
  )  
}  
  
export default CustomerDetails