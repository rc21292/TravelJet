import React from 'react'  
import axios from 'axios';  
import { useHistory, useLocation } from 'react-router-dom'
import { CSVLink } from "react-csv";
import Pagination from "react-js-pagination";
import { useState, useEffect } from 'react'  
import Moment from 'react-moment';


function Customers(props) { 

  const history = useHistory()

   const [user, setUser] = useState(false);
   const [checkedBoxes, setCheckedBoxes] = useState([]);
   const [checkedIds, setCheckedIds] = useState([]);

  const [customerData, setCustomerData] = useState([]);  
  const [activePage, setActivePage] = useState(1);  
  const [itemsCountPerPage, setItemsCountPerPage] = useState(1);  
  const [totalItemsCount, setTotalItemsCount] = useState(1);  
  const [pageRangeDisplayed, setPageRangeDisplayed] = useState(3); 

  const [searchName, setSearchName] = useState("");
  const [searchEmail, setSearchEmail] = useState("");
  const [searchMobile, setSearchMobile] = useState("");

  const [fromCount, setFromCount] = useState(1);  
  const [toCount, setToCount] = useState(1);  
  const [totalPages, setTotalPages] = useState(1);  

  useEffect(() => {

    let stateqq = localStorage["appState"];
    if (stateqq) {
      let AppState = JSON.parse(stateqq);
      setUser(AppState.user);
      axios('/api/getCustomers/').then(result=>{        
        setCustomerData(result.data.customers.data);  
        setCheckedIds(result.data.customer_ids.data);  
        setItemsCountPerPage(result.data.customers.per_page);  
        setTotalItemsCount(result.data.customers.total);  
        setActivePage(result.data.customers.current_page);
        setFromCount(result.data.customers.from);  
        setToCount(result.data.customers.to);  
        setTotalPages(result.data.customers.last_page);
      });
    }   

  }, []);  


  const handlePageChange = (pageNumber) => {
   axios.get('/api/getCustomers/?name='+searchName+'&email='+searchEmail+'&mobile='+searchMobile+'&page='+pageNumber)
   .then(result=>{
     setCustomerData(result.data.customers.data);  
     setCheckedIds(result.data.customer_ids.data);  
     setItemsCountPerPage(result.data.customers.per_page);  
     setTotalItemsCount(result.data.customers.total);  
     setActivePage(result.data.customers.current_page);
     setFromCount(result.data.customers.from);  
     setToCount(result.data.customers.to);  
     setTotalPages(result.data.customers.last_page);
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

  const resetFilter = () => {
    setSearchName("");
    setSearchMobile("");
    setSearchEmail("");
    axios.get('/api/getCustomers/')
    .then(result=>{
      setCustomerData(result.data.customers.data);  
      setCheckedIds(result.data.customer_ids.data);  
      setItemsCountPerPage(result.data.customers.per_page);  
      setTotalItemsCount(result.data.customers.total);  
      setActivePage(result.data.customers.current_page);
      setFromCount(result.data.customers.from);  
      setToCount(result.data.customers.to);  
      setTotalPages(result.data.customers.last_page);
    });
  }

  const findByFilter = () => {
    axios('/api/getCustomers/?name='+searchName+'&email='+searchEmail+'&mobile='+searchMobile)
    .then(result => {
      setCustomerData(result.data.customers.data);  
      setCheckedIds(result.data.customer_ids.data);  
      setItemsCountPerPage(result.data.customers.per_page);  
      setTotalItemsCount(result.data.customers.total);  
      setActivePage(result.data.customers.current_page);
      setFromCount(result.data.customers.from);  
      setToCount(result.data.customers.to);  
      setTotalPages(result.data.customers.last_page);
    })
    .catch(e => {
      console.log(e);
    });
  };
  
  const handleAllChecked = (event) => {
    let ids = [];
    let fruites = [...customerData]
    fruites.forEach(fruite => {
      console.log(event.target.checked)
      fruite.isChecked = event.target.checked
      ids.push(fruite.id)
    })
    setCustomerData(fruites);
  }

  const handleCheckChieldElement = (event) => {
    let fruites = [...customerData]
    fruites.forEach(fruite => {
       if (fruite.id == event.target.value){
          fruite.isChecked =  event.target.checked
        }
    })
    setCustomerData(fruites);

    
  }


const deleteCustomer = () => {
  if(window.confirm('Are you sure, want to delete the selected product?')) {
  axios.post('/api/deleteCustomer/',customerData)  
      .then((result) => {  
      window.location.reload(false);
      });  
    }
  };  

    console.log(customerData);

  return (  
    <div id="content-wrapper">
        {/* Main Content */}
        <div id="content">
          {/* Begin Page Content */}
          <div className="container-fluid">
            <div className="transactionhistory agentpage">
              {/* Page Heading */}
              <div className="row">
                <div className="col-sm-6">
                  <h1>Customers</h1>
                </div>
                <div className="col-sm-6">
                  <div className="trash">
                    <a onClick={deleteCustomer} className="btn btn-danger">
                      <i className="fa fa-trash" />
                    </a>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-8">
                  <div className="transactiondiv">
                    <div className="cardbg total-transaction">
                      <div className="card-body">
                        <table className="table">
                          <thead className="thead-light">
                            <tr>
                              <th scope="col"><input className="form-check-input form-control" onChange={(e) => handleAllChecked(e)} type="checkbox" /></th>
                              <th scope="col">Customer Name</th>
                              <th scope="col">Email</th>
                              <th scope="col">Mobile Number</th>
                              <th scope="col">Action</th>
                            </tr>
                          </thead>
                          <tbody>
                           {customerData.map((query,i)=>{
                               return(
                               <tr key={i}>
                               <td><input type="checkbox" className="form-check-input" checked={query.isChecked} value={query.id} onClick={(e) => handleCheckChieldElement(e)}/></td>
                               <td>{query.name}</td>
                              <td>{query.email}</td>
                              <td>{query.phone}</td>
                              <td><a href={'/admin/customer/'+query.id} className="btn btn-primary">View</a></td>
                               </tr>
                           )})
                           }
                            <tr>
                              <td colSpan={6}>
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
                <div className="col-sm-4">
                  <div className="cardbg total-transaction informationform">
                    <div className="card-header customerheader">
                      <h4 className="card-title">Filter</h4>
                    </div>
                    <div className="card-body">
                      <form className="filterform">
                        <div className="form-row">
                          <div className="form-group col-md-12">
                            <label htmlFor="labelname">Customer Name</label>
                            <input type="text" className="form-control" name="name" value={searchName} onChange={onChangeSearchName} placeholder="Customer Name" />
                          </div>
                          <div className="form-group col-md-12">
                            <label htmlFor="labelname">Email</label>
                            <input type="text" className="form-control" name="email" value={searchEmail} onChange={onChangeSearchEmail} placeholder="Eamil" />
                          </div>
                          <div className="form-group col-md-12">
                            <label htmlFor="labelname">Mobile Number</label>
                            <input type="number" className="form-control" name="mobile" value={searchMobile} onChange={onChangeSearchMobile} placeholder="Mobile Number" />
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
  
export default Customers