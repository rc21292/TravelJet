import React from 'react'  
import axios from 'axios';  
import { useHistory, useLocation } from 'react-router-dom'
import { CSVLink } from "react-csv";
import Pagination from "react-js-pagination";
import { useState, useEffect } from 'react'  
import Moment from 'react-moment';


function KYCDetails(props) {

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
  )  
}  
  
export default KYCDetails