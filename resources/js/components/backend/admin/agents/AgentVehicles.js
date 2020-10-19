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

  const [activeTab, setActiveTab] = useState(1); 
  const [customerId, setCustomerId] = useState(0); 

  const [agentData, setAgentData] = useState({}); 


const [activePage, setActivePage] = useState(1);  
  const [itemsCountPerPage, setItemsCountPerPage] = useState(1);  
  const [totalItemsCount, setTotalItemsCount] = useState(1);  
  const [fromCount, setFromCount] = useState(1);  
  const [toCount, setToCount] = useState(1);  
  const [totalPages, setTotalPages] = useState(1);  
  const [pageRangeDisplayed, setPageRangeDisplayed] = useState(3);  
  const [searchTransactionType, setSearchTransactionType] = useState("");
  const [searchDateFrom, setSearchDateFrom] = useState("");
  const [searchDateTo, setSearchDateTo] = useState(""); 

  const [balance, setBalance] = useState(false);

  const [walletTransactions, setWalletTransactions] = useState([]);

  const [payoutsData, setPayoutsData] = useState([]);    

  const [headersData, setHeadersData] = useState([
    { label: "Date", key: "created_on" },
    { label: "Transaction Type", key: "type" },
    { label: "Transaction Description", key: "description_data" },
    { label: "Amount", key: "amount" }
    ]);


  const [csvData, setCsvData] = useState([]);

  const [csvReport, setCsvReport] = useState({data: csvData,headers: headersData,filename: 'Transactions.csv'});   

  useEffect(() => {

    console.log(props.agent_id);

    let parts = location.pathname.split('/');
    let customer_id = parts.pop() || parts.pop();  
    setCustomerId(props.agent_id);

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

       axios.get('/api/users/getbalance/'+customer_id)
      .then(response=>{
        setBalance(response.data.balance);
      });

      axios('/api/transaction_history/'+customer_id).then(result=>{
        setCsvReport({...csvReport,data:result.data.user_transactions.data});  
        setWalletTransactions(result.data.user_transactions.data);  
        setItemsCountPerPage(result.data.user_transactions.per_page);  
        setTotalItemsCount(result.data.user_transactions.total);  
        setActivePage(result.data.user_transactions.current_page);
        setFromCount(result.data.user_transactions.from);  
        setToCount(result.data.user_transactions.to);  
        setTotalPages(result.data.user_transactions.last_page);  
      });

    }   

  }, [props.agent_id]);  


  const handlePageChange = (pageNumber) => {
    axios.get('/api/transaction_history/'+customerId+'?transation_type='+searchTransactionType+'&from_date='+searchDateFrom+'&to_date='+searchDateTo+'&page='+pageNumber)
    .then(result=>{
      setWalletTransactions(result.data.user_transactions.data);  
      setCsvReport({...csvReport,data:result.data.user_transactions.data}); 
      setItemsCountPerPage(result.data.user_transactions.per_page);  
      setTotalItemsCount(result.data.user_transactions.total);  
      setActivePage(result.data.user_transactions.current_page);
      setFromCount(result.data.user_transactions.from);  
      setToCount(result.data.user_transactions.to);  
      setTotalPages(result.data.user_transactions.last_page);  
    });
  }

const onChangeSearchTransactionType = e => {
    const searchTransactionType = e.target.value;
    setSearchTransactionType(searchTransactionType);
  };

  const onChangeSearchDateFrom = e => {
    const searchTransactionType = e.target.value;
    setSearchDateFrom(searchTransactionType);
  };

  const onChangeSearchDateTo = e => {
    const searchTransactionType = e.target.value;
    setSearchDateTo(searchTransactionType);
  };

  const resetFilter = () => {
 setSearchTransactionType("");
       setSearchDateTo("");
      setSearchDateFrom("");
    axios.get('/api/transaction_history/'+customerId)
  .then(result=>{
     setWalletTransactions(result.data.user_transactions.data);  
     setCsvReport({...csvReport,data:result.data.user_transactions.data}); 
      setItemsCountPerPage(result.data.user_transactions.per_page);  
      setTotalItemsCount(result.data.user_transactions.total);  
      setActivePage(result.data.user_transactions.current_page);
      setFromCount(result.data.user_transactions.from);  
      setToCount(result.data.user_transactions.to);  
      setTotalPages(result.data.user_transactions.last_page);  
     
  }); 

  }
  const findByFilter = () => {

    axios(`/api/transaction_history/${customerId}?transation_type=${searchTransactionType}&from_date=${searchDateFrom}&to_date=${searchDateTo}`)
    .then(result => {
      setWalletTransactions(result.data.user_transactions.data); 
      setCsvReport({...csvReport,data:result.data.user_transactions.data});  
      setItemsCountPerPage(result.data.user_transactions.per_page);  
      setTotalItemsCount(result.data.user_transactions.total);  
      setActivePage(result.data.user_transactions.current_page);
      setFromCount(result.data.user_transactions.from);  
      setToCount(result.data.user_transactions.to);  
      setTotalPages(result.data.user_transactions.last_page);  
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
                        <option value="Verified">Verified</option>
                        <option value="Pending">Pending</option>
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
  
export default AgentDetails