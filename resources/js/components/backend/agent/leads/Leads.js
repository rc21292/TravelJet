import React from 'react'  
import axios from 'axios';  
import { useHistory, useLocation } from 'react-router-dom'

import Pagination from "react-js-pagination";
import { useState, useEffect } from 'react'  

import Moment from 'react-moment'

function Leads(props) { 

  const history = useHistory()
  const location = useLocation()

  const [user, setUser] = useState(false);

  const [quotationsData, setQuotationsData] = useState([]);  
  const [bookingsData, setBookingsData] = useState([]);  
  const [bookedsData, setBookedsData] = useState([]);  
  const [cancelledData, setCancelledData] = useState([]);  
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

  const [pageRangeDisplayed, setPageRangeDisplayed] = useState(5);  

  useEffect(() => {  

    let stateqq = localStorage["appState"];
    if (stateqq) {
      let AppState = JSON.parse(stateqq);
      setUser(AppState.user);
      axios.get('/api/queries/'+AppState.user.id+'?type=quotation').then(result=>{
        setQuotationsData(result.data.data); 
        setItemsCountPerPage(result.data.per_page);  
        setTotalItemsCount(result.data.total);  
        setActivePage(result.data.current_page);
      });
      axios.get('/api/queries/'+AppState.user.id+'?type=booking').then(result=>{
        setBookingsData(result.data.data); 
        setItemsCountPerPage1(result.data.per_page);  
        setTotalItemsCount1(result.data.total);  
        setActivePage1(result.data.current_page);
      });
      axios.get('/api/queries/'+AppState.user.id+'?type=booked').then(result=>{
        setBookedsData(result.data.data); 
        setItemsCountPerPage2(result.data.per_page);  
        setTotalItemsCount2(result.data.total);  
        setActivePage2(result.data.current_page);
      });
       axios.get('/api/queries/'+AppState.user.id+'?type=cancel').then(result=>{
        setCancelledData(result.data.data); 
        setItemsCountPerPage3(result.data.per_page);  
        setTotalItemsCount3(result.data.total);  
        setActivePage3(result.data.current_page);
      });
    }   

  }, []);  


  const handlePageChange = (pageNumber) => {
    console.log(location.pathname)
    axios.get('/api/queries/'+user.id+'?type=quotation'+'&page='+pageNumber)

    .then(result=>{
      setQuotationsData(result.data.data);
      setItemsCountPerPage(result.data.per_page);  
      setTotalItemsCount(result.data.total);  
      setActivePage(result.data.current_page);
    });
  }

   const handlePageChange1 = (pageNumber) => {
    axios.get('/api/queries/'+user.id+'?type=booking'+'&page='+pageNumber)

    .then(result=>{
      setBookingsData(result.data.data);
      setItemsCountPerPage1(result.data.per_page);  
      setTotalItemsCount1(result.data.total);  
      setActivePage1(result.data.current_page);
    });
  }

   const handlePageChange2 = (pageNumber) => {
    axios.get('/api/queries/'+user.id+'?type=booked'+'&page='+pageNumber)

    .then(result=>{
      setBookedsData(result.data.data);
      setItemsCountPerPage2(result.data.per_page);  
      setTotalItemsCount2(result.data.total);  
      setActivePage2(result.data.current_page);
    });
  }

  const handlePageChange3 = (pageNumber) => {
    axios.get('/api/queries/'+user.id+'?type=cancel'+'&page='+pageNumber)

    .then(result=>{
      setBookedsData(result.data.data);
      setItemsCountPerPage3(result.data.per_page);  
      setTotalItemsCount3(result.data.total);  
      setActivePage3(result.data.current_page);
    });
  }

  return (

     <div className="myleads">
      {/* Page Heading */}
      <h1>My Leads</h1>
      <div className="myleadsstatus">
        <div id="exTab2"> 
          <ul className="nav nav-tabs">
            <li className="active">
              <a href="#1" data-toggle="tab">quotations</a>
            </li>
            <li><a href="#2" data-toggle="tab">Upcoming Booking</a>
            </li>
            <li><a href="#3" data-toggle="tab">Booked</a>
            </li>
            <li><a href="#4" data-toggle="tab">Cancelled</a>
            </li>
          </ul>
          <div className="tab-content ">
            <div className="tab-pane active" id={1}>
              <div className="leadquotation">
                <div className="row">
                  <div className="col-sm-8">
                    <div className="input-group searchbar">
                      <input type="name" name="project bid" className="form-control" placeholder="Search Lead Name" />
                      <span className="input-group-btn">
                        <a href="#" className="btn btn-primary"><i className="fa fa-search" /></a>
                      </span>
                    </div>
                  </div>
                  <div className="clearfix" />
                  <div className="col-sm-12">
                    <table className="table table-bordered leadstatus">
                      <thead className="thead-secondary">
                        <tr>
                          <th scope="col" className="bd">Booking ID</th>
                          <th scope="col">Booking Title</th>
                          <th scope="col">Name</th>
                          <th scope="col" className="bt">Booking Type</th>
                          <th scope="col" className="sd">Start Date</th>
                          <th scope="col" className="mb">My Bid</th>
                          <th scope="col">Source</th>
                          <th scope="col">Destination</th>
                          <th scope="col">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                      {quotationsData.map((quotation,i)=>{
                           return(   <tr key={i}>
                          <td>000000{quotation.id}</td>
                          <td>{quotation.booking_name}</td>
                          <td>{quotation.name}</td>
                          <td>{quotation.booking_type}</td>
                          <td><Moment format="DD-MMM-YYYY">{quotation.created_at}</Moment></td>
                          <td><i className="fa fa-inr" /> {quotation.total_payment}</td>
                          <td>{quotation.from_places}</td>
                          <td>{quotation.to_places}</td>
                          <td><a href={'/quotations/'+quotation.id} className="btn btn-primary"><i className="fa fa-eye" /> View</a></td>
                        </tr>
                        )
                              })
                            }
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
            <div className="tab-pane" id={2}>
              <div className="leadquotation">
                <div className="row">
                  <div className="col-sm-8">
                    <div className="input-group searchbar">
                      <input type="name" name="project bid" className="form-control" placeholder="Search Lead Name" />
                      <span className="input-group-btn">
                        <a href="#" className="btn btn-primary"><i className="fa fa-search" /></a>
                      </span>
                    </div>
                  </div>
                  <div className="clearfix" />
                  <div className="col-sm-12">
                    <table className="table table-bordered leadstatus">
                      <thead className="thead-secondary">
                        <tr>
                          <th scope="col" className="bd">Booking ID</th>
                          <th scope="col">Booking Title</th>
                          <th scope="col">Name</th>
                          <th scope="col" className="bt">Booking Type</th>
                          <th scope="col" className="sd">Start Date</th>
                          <th scope="col">Source</th>
                          <th scope="col">Destination</th>
                          <th scope="col">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                       {
                          bookingsData.map((booking,i)=>{
                            return(   
                            <tr key={i}>
                              <td>000000{booking.id}</td>
                              <td>{booking.booking_name}</td>
                              <td>{booking.name}</td>
                              <td>{booking.booking_type}</td>
                              <td><Moment format="DD-MMM-YYYY">{booking.created_at}</Moment></td>
                              <td>{booking.from_places}</td>
                              <td>{booking.to_places}</td>
                              <td><a href={'/bookings/'+booking.id} className="btn btn-primary"><i className="fa fa-eye" /> View</a></td>
                            </tr>
                            )
                          })
                        }
                      </tbody>
                    </table>
                  </div>
                  <div className="clearfix" />
                  <div className="col-sm-12">
                    <div className="d-flex justify-content-center" style={{marginLeft: '20%'}}>
                     <Pagination
                     activePage={activePage1}
                     itemsCountPerPage={itemsCountPerPage1}
                     totalItemsCount={totalItemsCount1}
                     pageRangeDisplayed={pageRangeDisplayed}
                     onChange={handlePageChange1}
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
            <div className="tab-pane" id={3}>
              <div className="leadquotation">
                <div className="row">
                  <div className="col-sm-8">
                    <div className="input-group searchbar">
                      <input type="name" name="project bid" className="form-control" placeholder="Search Lead Name" />
                      <span className="input-group-btn">
                        <a href="#" className="btn btn-primary"><i className="fa fa-search" /></a>
                      </span>
                    </div>
                  </div>
                  <div className="clearfix" />
                  <div className="col-sm-12">
                    <table className="table table-bordered leadstatus">
                      <thead className="thead-secondary">
                        <tr>
                          <th scope="col" className="bd">Booking ID</th>
                          <th scope="col">Booking Title</th>
                          <th scope="col">Name</th>
                          <th scope="col" className="bt">Booking Type</th>
                          <th scope="col" className="sd">Start Date</th>
                          <th scope="col">Source</th>
                          <th scope="col">Destination</th>
                          <th scope="col">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                       {
                          bookedsData.map((booked,i)=>{
                            return(   
                            <tr key={i}>
                              <td>000000{booked.id}</td>
                              <td>{booked.booking_name}</td>
                              <td>{booked.name}</td>
                              <td>{booked.booking_type}</td>
                              <td><Moment format="DD-MMM-YYYY">{booked.created_at}</Moment></td>
                              <td>{booked.from_places}</td>
                              <td>{booked.to_places}</td>
                              <td><a href={'/booked/'+booked.id} className="btn btn-primary"><i className="fa fa-eye" /> View</a></td>
                            </tr>
                            )
                          })
                        }
                      </tbody>
                    </table>
                  </div>
                  <div className="clearfix" />
                  <div className="col-sm-12">
                    <div className="d-flex justify-content-center" style={{marginLeft: '20%'}}>
                     <Pagination
                     activePage={activePage2}
                     itemsCountPerPage={itemsCountPerPage2}
                     totalItemsCount={totalItemsCount2}
                     pageRangeDisplayed={pageRangeDisplayed}
                     onChange={handlePageChange2}
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
            <div className="tab-pane" id={4}>
              <div className="leadquotation">
                <div className="row">
                  <div className="col-sm-8">
                    <div className="input-group searchbar">
                      <input type="name" name="project bid" className="form-control" placeholder="Search Lead Name" />
                      <span className="input-group-btn">
                        <a href="#" className="btn btn-primary"><i className="fa fa-search" /></a>
                      </span>
                    </div>
                  </div>
                  <div className="clearfix" />
                  <div className="col-sm-12">
                    <table className="table table-bordered leadstatus">
                      <thead className="thead-secondary">
                        <tr>
                          <th scope="col" className="bd">Booking ID</th>
                          <th scope="col">Booking Title</th>
                          <th scope="col">Name</th>
                          <th scope="col" className="bt">Booking Type</th>
                          <th scope="col" className="sd">Start Date</th>
                          <th scope="col">Source</th>
                          <th scope="col">Destination</th>
                          <th scope="col">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                       {
                          cancelledData.map((booked,i)=>{
                            return(   
                            <tr key={i}>
                              <td>000000{booked.id}</td>
                              <td>{booked.booking_name}</td>
                              <td>{booked.name}</td>
                              <td>{booked.booking_type}</td>
                              <td><Moment format="DD-MMM-YYYY">{booked.created_at}</Moment></td>
                              <td>{booked.from_places}</td>
                              <td>{booked.to_places}</td>
                              <td><a href={'/cancelled/'+booked.id} className="btn btn-primary"><i className="fa fa-eye" /> View</a></td>
                            </tr>
                            )
                          })
                        }
                      </tbody>
                    </table>
                  </div>
                  <div className="clearfix" />
                  <div className="col-sm-12">
                    <div className="d-flex justify-content-center" style={{marginLeft: '20%'}}>
                     <Pagination
                     activePage={activePage3}
                     itemsCountPerPage={itemsCountPerPage3}
                     totalItemsCount={totalItemsCount3}
                     pageRangeDisplayed={pageRangeDisplayed}
                     onChange={handlePageChange3}
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
        </div>
      </div>
    </div>

    );
}

export default Leads