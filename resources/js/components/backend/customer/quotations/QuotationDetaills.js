import React from 'react'  
import axios from 'axios';  
import { useHistory, useLocation } from 'react-router-dom'

import Pagination from "react-js-pagination";
import { useState, useEffect,useCallback } from 'react'  

import Moment from 'react-moment'

function QuotationDetaills({id}) { 

  const history = useHistory()
  const location = useLocation()
  const [, forceUpdate] = useState();

  const [user, setUser] = useState(false);
  const [quotation_id, setQuotation_id] = useState(0);
  const [voucher_id, setVoucher_id] = useState(0);

  const [bookingId, setBookingId] = useState(id);

  const [bookingsData, setBookingsData] = useState({});  
  const [stopages, setStopages] = useState([]);  
  const [quotationData, setQuotationData] = useState([]);  
  const [activePage, setActivePage] = useState(1);  
  const [itemsCountPerPage, setItemsCountPerPage] = useState(1);  
  const [isQuotation, setIsQuotation] = useState(false);  
  const [totalItemsCount, setTotalItemsCount] = useState(1);  
  const [pageRangeDisplayed, setPageRangeDisplayed] = useState(5);  

  useEffect(() => {  
    let stateqq = localStorage["appState"];
    if (stateqq) {
      let AppState = JSON.parse(stateqq);
      setUser(AppState.user);
      axios.get('/api/queries/show/'+id).then(result=>{
        setBookingsData(result.data);
      });

      axios.get('/api/quotations/getQuotationByBookingId/'+id).then(result=>{
        setQuotationData(result.data);
      });

      axios.get('/api/quotations/checkQuotaions/'+id).then(result2=>{
        setIsQuotation(result2.data);
      });

      const result1 = axios('/api/queries/getStopagesData/'+id).then(result1=>{ 
      setStopages(result1.data.stopages);  
    });
    

    }   

  }, [id]);  


 const chnageId = (id) => {
  setQuotation_id(id)
  setVoucher_id(id)
  };  



  const awardBooking = (id) => {
    axios.post('/api/quotations/awardBooking/'+ id)  
    .then((result) => { 
    if (result.data.success) {
      // alert('Awarded');
      window.location.reload(false);
    } 
    });  
  };  

  const deleteQuotation = (id) => {
  axios.delete('/api/queries/delete/'+ id)  
      .then((result) => {  
      window.location.reload(false);
      });  
  };  

  const viewQuotation = (id) => {
    forceUpdate();
   axios.delete('/api/queries/cancel/'+ id)  
      .then((result) => {  
       setBookingData(result.data);  
      });  
  };  

  const handlePageChange = (pageNumber) => {
    console.log(location.pathname)
    axios.get('/api/queries?status=posted'+'&page='+pageNumber)

    .then(result=>{
      setBookingsData(result.data.data);
      setItemsCountPerPage(result.data.per_page);  
      setTotalItemsCount(result.data.total);  
      setActivePage(result.data.current_page);
    });
  }

		return (
        

        <div className="">
        <div className="quotation-page">
        </div>
        <div className="viewquotation" style={{display: 'block'}}>
          <h3>{bookingsData.booking_name}</h3>
          <div className="wt-userlistinghold wt-featured">
          <div style={(isQuotation) ? {display:'block'} : {display:'none'} } >
          { quotationData.map((quotation3,l)=>{
                  return (
          <div style={(voucher_id == l ) ? {display:'block'} : {display:'none'} }>
           
            <div className="wt-rightarea"> <a href="#"><span>Download Quote{quotation3.id}</span></a>
              <i className="fa fa-inr" /> {quotation3.total_payment}/- Total <span>Exclusive of Convenience Fee</span>
            </div>
            </div>
              )
                })
              }
              </div>
            <div className="bookid"> <span>Booking id : 000000{bookingsData.id}</span>
            </div>
            <div className="roundtrip">Quotes for {bookingsData.booking_name}</div>
            <div style={(isQuotation) ? {display:'block'} : {display:'none'} } >
            { quotationData.map((quotation2,k)=>{
                  return (
                  <div style={(quotation_id == k ) ? {display:'block'} : {display:'none'} } >
            <figure className="wt-userlistingimg">
              <img src="/frontend/image/icons/chat-profile.png" alt="image description" />
            </figure>
            
            <div className="wt-userlistingcontent">
              <div className="wt-contenthead">
                <div className="wt-title"> <a href="bookingprofile.php"> #{quotation2.id} {quotation2.name}
                <p> </p>
                    <div className="rating">
                      <div className="reviews-profile">
                        <span className="heading">0.0</span>
                        <span className="fa fa-star checked" />
                        <span className="fa fa-star checked" />
                        <span className="fa fa-star checked" />
                        <span className="fa fa-star checked" />
                        <span className="fa fa-star" />
                      </div>
                    </div>
                  </a>
                  <h2>507 trips sold | <a href="#">172 Superb Reviews</a></h2>
                </div>
              </div>
              <ul className="wt-userlisting-breadcrumb awardbookig">
                <li><span><a onClick={event => awardBooking(quotation2.id)} className="btn btn-primary">Award Booking</a></span>
                </li>
                <li><span> <a href="#" className="btn btn-default chatbtn">Chat Now</a></span>
                </li>
                <li><span> <a href="#" className="btn btn-info">Contact Vendor</a></span>
                </li>
              </ul>
            </div>
            </div>
             )
                })
              }
             </div>

            <div className="clearfix" />
            <div id="exTab1">
              <ul className="nav nav-pills" style={(isQuotation) ? {display:'block'} : {display:'none'} }>
              {
                quotationData.map((quotation,i)=>{
                  return (
                    <li  key={i} className={i==0 ? 'active' : ''}> <a onClick={event => chnageId(i)} href={"#"+i+"a"} data-toggle="tab"><i className="fa fa-inr" /> {quotation.total_payment}/-
                    <br />
                    <span>Total Cost</span>
                    <span><b>{quotation.name}</b></span>
                    </a> 
                    </li>
                    )
                })
              }
              </ul>
              <div className="tab-content clearfix">
              {
                quotationData.map((quotation1,j)=>{
                  return (
                <div key={j} className={(j == 0) ? "tab-pane active" : "tab-pane" } id={j+"a"}>
                  <div className="wt-description">
                    <table className="table">
                      <thead className="thead-dark">
                        <tr>
                          <th scope="col">Booking Details</th>
                          <th scope="col">Trip Route</th>
                          <th scope="col">Inclusion/Exclusion</th>
                          <th scope="col">Cab Details</th>
                        </tr>
                      </thead>
                      <tbody className="bookbody">
                        <tr>
                          <td className="bookdetail">Booking Details{quotation1.id}</td>
                          <td />
                          <td />
                          <td className="edit"><a href="#" className="btnsho">Edit Booking</a>
                          </td>
                        </tr>
                        <tr>
                          <td>Booking Type</td>
                          <td>{ bookingsData.booking_type}</td>
                          <td />
                          <td />
                        </tr>
                        <tr>
                          <td>Destination Covered</td>
                          <td>{ ''}</td>
                          <td />
                          <td />
                        </tr>
                        <tr>
                          <td>Date</td>
                          <td>{ bookingsData.depart}</td>
                          <td />
                          <td />
                        </tr>
                        <tr>
                          <td>Time</td>
                          <td>{ bookingsData.pickup}</td>
                          <td />
                          <td />
                        </tr>
                        <tr>
                          <td>Number of Person</td>
                          <td>{ bookingsData.no_of_adults+bookingsData.no_of_childrens+bookingsData.no_of_infants}</td>
                          <td />
                          <td />
                        </tr>
                        <tr>
                          <td>Type of Vehicle</td>
                          <td>{ bookingsData.vehicle_type}</td>
                          <td />
                          <td />
                        </tr>
                        <tr>
                          <td>Budget</td>
                          <td>{ bookingsData.vehicle_budget}</td>
                          <td />
                          <td />
                        </tr>
                      </tbody>
                    </table>
                    <div className="clearfix" />
                    <div className="triproute">
                      <div className="row">
                        <div className="col-sm-6">
                          <div className="bookdetail">Trip Route <a href="https://maps.google.com/maps?q=university%20of%20san%20francisco&t=&z=13&ie=UTF8&iwloc=&output=embed">View Google Map</a>
                          </div>
                        </div>
                        <div className="col-sm-6">
                          <div className="edit"><a href="#" className="btnsho2">Edit Booking</a>
                          </div>
                        </div>
                      </div>
                      <div className="vendor">Need changes? Chat with vendor</div>
                      <div className="booktrip">{bookingsData.booking_name}.</div>
                      <div className="location">
                        <div className="wizard-inner">
                          <div className="connecting-line" />
                          <ul className="nav nav-tabs">
                           {
                        stopages.map((stopage,i)=>{
                          return(
                            <li className="active">
                              <a href="#" />
                            </li>
                             )
                        }
                        )
                      }
                          </ul>
                        </div>
                      </div>
                      <ul className="list-inline triplocation">
                      {
                        stopages.map((stopage,i)=>{
                          return(
                           <li>{stopage}</li>
                          )
                        }
                        )
                      }
                      </ul>
                    </div>  
                    <div className="clearfix" />
                    <div className="triproute inclusion">
                      <div className="row">
                        <div className="col-sm-5">
                          <div className="bookdetail">Inclusion</div>
                        </div>
                        <div className="col-sm-5">
                          <div className="bookdetail">Exclusions</div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="vendor col-sm-5">{quotation1.inclusions}</div>
                        <div className="booktrip col-sm-5">{quotation1.exclusions}</div>
                      </div>
                    </div>
                    <div className="clearfix" />
                    <table className="table cabdetail">
                      <tbody className="bookbody">
                        <tr>
                          <td className="bookdetail">Cab Details</td>
                          <td />
                          <td />
                          <td />
                        </tr>
                        <tr>
                          <td>Cab Type</td>
                          <td>{quotation1.cab_type}</td>
                          <td />
                          <td />
                        </tr>
                        <tr>
                          <td>Cab Model</td>
                          <td>{quotation1.cab_model}</td>
                          <td />
                          <td />
                        </tr>
                        <tr>
                          <td>Sitting Capacity</td>
                          <td>{quotation1.sitting_capacity}</td>
                          <td />
                          <td />
                        </tr>
                        <tr>
                          <td>Luggage Space</td>
                          <td>{quotation1.luggage_space} Small Bags</td>
                          <td />
                          <td />
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                 )
                })
              }
              </div>
            </div>
          </div>
        </div>
      </div>                  
             
		);
	
}
export default QuotationDetaills