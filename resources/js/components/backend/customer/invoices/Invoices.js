import React from 'react'  
import axios from 'axios';  
import { useHistory, useLocation } from 'react-router-dom'

import Pagination from "react-js-pagination";

import FlashMessage from 'react-flash-message'

import { useState, useEffect } from 'react'  


import Moment from 'react-moment';

function Invoices(props) { 

  const history = useHistory()
  const location = useLocation()

  const [user, setUser] = useState(false);
  const [success, setSuccess] = useState(false);

  const [invoicesData, setInvoicesData] = useState([]);  
  const [isSeraching, setIsSeraching] = useState(false);  
  const [searchData, setSearchData] = useState('');
  const [activePage, setActivePage] = useState(1);  
  const [itemsCountPerPage, setItemsCountPerPage] = useState(1);  
  const [totalItemsCount, setTotalItemsCount] = useState(1);  
  const [pageRangeDisplayed, setPageRangeDisplayed] = useState(3);  
  const [searchTransactionType, setSearchTransactionType] = useState("");
  useEffect(() => {  

    let stateqq = localStorage["appState"];
    if (stateqq) {
      let AppState = JSON.parse(stateqq);
      setUser(AppState.user);
      axios('/api/invoices/getInvoices/'+AppState.user.id).then(result=>{
        setInvoicesData(result.data.data);  
        setItemsCountPerPage(result.data.per_page);  
        setTotalItemsCount(result.data.total);  
        setActivePage(result.data.current_page);
      });
    }   

  }, []);  


  const searchInvoice = (event) => {

  axios(`/api/invoices/getInvoices/${user.id}?search=${searchData}`)
    .then(result => {
      setIsSeraching(true);
      setInvoicesData(result.data.data);  
      setItemsCountPerPage(result.data.per_page);  
      setTotalItemsCount(result.data.total);  
      setActivePage(result.data.current_page);
    })
    .catch(e => {
      console.log(e);
    });

  }
  const handleSearch = (event) => {
    setSearchData(event.target.value);
  }

  const handlePageChange = (pageNumber) => {
    axios.get('/api/invoices/getInvoices/'+user.id+'?page='+pageNumber)
    .then(result=>{
      setInvoicesData(result.data.data);  
      setItemsCountPerPage(result.data.per_page);  
      setTotalItemsCount(result.data.total);  
      setActivePage(result.data.current_page);
    });
  }

  const viewInvoice = (id) => {
    window.location.href = '/view-invoicepdf/'+id;
  }

  const downloadPdf = (id) => {
    window.location.href = '/invoice-pdf/'+id;
  }

  return (  
    <div className="transactionhistory portfollopage">
        {/* Page Heading */}
        <h1>Invoices</h1>
        <div className="invoices informationform">
          <div className="leadquotation">
            <div className="row">
              <div className="col-sm-8">
                <div className="input-group searchbar">
                  <input type="name" name="project bid" name="search" onChange={handleSearch} className="form-control" placeholder="Search Invoice by Name or Id" />
                  <span className="input-group-btn">
                    <a onClick={searchInvoice} className="btn btn-primary"><i className="fa fa-search" /></a>
                  </span>
                </div>
              </div>
              <div className="col-sm-12">
               {isSeraching ? 'Search Results : ' : ''}
              </div>
              <div className="clearfix" />
              <div className="col-sm-12">
                <table className="table table-bordered leadstatus">
                  <thead className="thead-secondary">
                    <tr>
                      <th scope="col" className="bd">Invoice No.</th>
                      <th scope="col">Booking Title</th>
                      <th scope="col">Customer Name</th>
                      <th scope="col" className="sd">Date</th>
                      <th scope="col" className="mb">Tax</th>
                      <th scope="col">Amount</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                     {
                      invoicesData ?
                      invoicesData.map((invoice,i)=>{
                        return( <tr key={i}>
                      <td>000000{invoice.id}</td>
                      <td>{invoice.booking_name}</td>
                      <td>{invoice.customer_name}</td>
                      <td><Moment format="DD-MMM-YY">{invoice.created_at}</Moment></td>
                      <td><i className="fa fa-inr" /> {invoice.tax}</td>
                      <td><i className="fa fa-inr" /> {invoice.total}</td>
                      <td>
                        <a id="dLabel" role="button" data-toggle="dropdown" className="btn btn-primary" data-target="#" onClick={(e) => downloadPdf(invoice.id)} >
                            View && Download Invoice
                          </a>
                      </td>
                    </tr>
                      )
                    })
                    : null
                  }
                  {invoicesData.length > 0 ? '' :<tr><td colSpan={7} style={{ color:'red',textAlign:'center'}}>Search result not Found</td></tr>}
                  </tbody>
                </table>
              </div>
              <div className="clearfix" />
              <div className="col-sm-12">
               <div className="d-flex justify-content-center" style={{marginLeft: '20%'}}>
                     <Pagination
                     activePage={activePage}
                     itemsCountPerPage={itemsCountPerPage}
                     totalItemsCount={totalItemsCount}
                     pageRangeDisplayed={pageRangeDisplayed}
                     onChange={handlePageChange}
                     itemClass="page-item"
                     linkClass="page-link"
                     prevPageText="Prev"
                     nextPageText="Next"
                     lastPageText="Last"
                     firstPageText="First"
                     />
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  )  
}  
  
export default Invoices