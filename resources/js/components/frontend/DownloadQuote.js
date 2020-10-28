import React from 'react'  
import axios from 'axios';  
import { useHistory, useLocation } from 'react-router-dom'

import Moment from 'react-moment';

import Pagination from "react-js-pagination";
import { useState, useEffect } from 'react' 

import Pdf from "react-to-pdf";

const ref = React.createRef();

function DownloadQuote({match}) { 

  const history = useHistory()
  const location = useLocation()

  const [user, setUser] = useState(false);

  const [bookingData, setBookingData] = useState({}); 

  const [quoteId, setQuoteId] = useState(''); 
  const [agent, setAgent] = useState({});

  const [stopages, setStopages] = useState([]);  
  const [quotationData, setQuotationData] = useState([]); 

  useEffect(() => {

    let id = match.params.id;  
    setQuoteId(id);

    let stateqq = localStorage["appState"];
    if (stateqq) {
      let AppState = JSON.parse(stateqq);
      setUser(AppState.user);
      axios.get('/api/quotations/getQuotationByBookingId/'+id).then(result=>{
        setQuotationData(result.data);
      });

      const result1 = axios('/api/queries/getStopagesData/'+id).then(result1=>{ 
      setStopages(result1.data.stopages);  
    });
    }   

  }, []);  
		return (
         <div className="quotation" >
         <Pdf targetRef={ref} filename={"invoice_"+match.params.id+".pdf"}>
              {({ toPdf }) => <button onClick={toPdf}>Download Pdf</button>}
            </Pdf>
         <div className="container">
          <div className="row">
        <div className="quotationpdf" ref={ref}>
          <table className="table table-head">
            <tbody>
              <tr>
                <td className="logo"><img src="/frontend/image/logo.png" alt="logo" /></td>
                <td className="quotitle" style={{paddingTop: '13px', fontSize: '20px'}}><b>Quotation for Round Trip to Jammu</b></td>
                <td className="quo-amt" style={{color: '#007bff', width: '100%', textAlign: 'center'}}><span style={{display: 'table', margin: '0 auto', color: '#007bff', fontSize: '13px'}}>Total Cost</span><b style={{color: '#007bff', fontSize: '22px'}}><i>₹ 17250</i></b></td>
              </tr>
            </tbody>
          </table>
          <hr style={{marginBottom: '30px'}} />
          <div className="Customeragent-detail">
            <table className="table tableone">
              <thead className="thead-light" style={{backgroundColor: '#e9ecef'}}>
                <tr>
                  <th scope="col" colSpan={2}>Customer Details</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Name</td>
                  <td><b>Abhishek Sinha</b></td>
                </tr>
                <tr>
                  <td>Contact No.</td>
                  <td><b>9793646415</b></td>
                </tr>
                <tr>
                  <td>Email</td>
                  <td><b>abhisheksinha@gmail.com</b></td>
                </tr>
                <tr>
                  <td>Address</td>
                  <td><b>47/1 Kalkaji Mandir, New Delhi</b></td>
                </tr>
              </tbody>
            </table>
            <table className="table tabletwo">
              <thead className="thead-light" style={{backgroundColor: '#e9ecef'}}>
                <tr>
                  <th scope="col" colSpan={2}>Agent Details</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Name</td>
                  <td><b>Abhishek Sinha</b></td>
                </tr>
                <tr>
                  <td>Contact No.</td>
                  <td><b>9793646415</b></td>
                </tr>
                <tr>
                  <td>Email</td>
                  <td><b>abhisheksinha@gmail.com</b></td>
                </tr>
                <tr>
                  <td>Address</td>
                  <td><b>47/1 Kalkaji Mandir, New Delhi</b></td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="booking-detail">
            <table className="table">
              <thead className="thead-light" style={{backgroundColor: '#e9ecef'}}>
                <tr>
                  <th scope="col" colSpan={2}>Booking Details</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Booking Type</td>
                  <td><b>Round Trip with Sightseeing</b></td>
                </tr>
                <tr>
                  <td>Pickup Location</td>
                  <td><b>Badarpur, New Delhi, Delhi India</b></td>
                </tr>
                <tr>
                  <td>Drop Location</td>
                  <td><b>Badarpur, New Delhi, Delhi India</b></td>
                </tr>
                <tr>
                  <td>Date</td>
                  <td><b>08-Aug-2020</b></td>
                </tr>
                <tr>
                  <td>Time</td>
                  <td><b>12:45 PM</b></td>
                </tr>
                <tr>
                  <td>Number of Person</td>
                  <td><b>5</b></td>
                </tr>
                <tr>
                  <td>Type of Vehicle</td>
                  <td><b>Suv</b></td>
                </tr>
                <tr>
                  <td>Budget</td>
                  <td><b>3500-5500</b></td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="triproute">
            <table className="table">
              <thead className="thead-light" style={{backgroundColor: '#e9ecef'}}>
                <tr>
                  <th scope="col" colSpan={4}>Trip Route</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan={4}><b>Round Trip to Jammu.</b></td>
                </tr>
                <tr>
                  <td className="trip-location" style={{width: '4%'}}><b>Shimla</b><span>Stoppage</span></td>
                  <td className="trip-location" style={{width: '3%'}}><b>Kullu</b><span>Stoppage</span></td>
                  <td className="trip-location" style={{width: '3%'}}><b>Manali</b><span>Stoppage</span></td>
                  <td className="trip-location" style={{width: '28%'}}><b>Rohtank</b><span>Stoppage</span></td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="inclusion">
            <table className="table tableone">
              <thead className="thead-light" style={{backgroundColor: '#e9ecef'}}>
                <tr>
                  <th scope="col" colSpan={2}>Inclusion</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan={2}>Lorem Ipsum Doler</td>
                </tr>
                <tr>
                  <td colSpan={2}>Lorem Ipsum Doler</td>
                </tr>
                <tr>
                  <td colSpan={2}>Lorem Ipsum Doler</td>
                </tr>
                <tr>
                  <td colSpan={2}>Lorem Ipsum Doler</td>
                </tr>
              </tbody>
            </table>
            <table className="table tabletwo">
              <thead className="thead-light" style={{backgroundColor: '#e9ecef'}}>
                <tr>
                  <th scope="col" colSpan={2}>Exclusions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan={2}>Lorem Ipsum Doler</td>
                </tr>
                <tr>
                  <td colSpan={2}>Lorem Ipsum Doler</td>
                </tr>
                <tr>
                  <td colSpan={2}>Lorem Ipsum Doler</td>
                </tr>
                <tr>
                  <td colSpan={2}>Lorem Ipsum Doler</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="suggest-payment">
            <table className="table">
              <thead className="thead-light" style={{backgroundColor: '#e9ecef'}}>
                <tr>
                  <th scope="col" colSpan={4}>Suggest a advance payment</th>
                </tr>
              </thead>
              <tbody className="paypart">
                <tr>
                  <td>1) First Part</td>
                  <td>₹ 9000</td>
                  <td>Immediately</td>
                </tr>
                <tr>
                  <td>1) Second Part</td>
                  <td>₹ 8250</td>
                  <td>24-Aug-2020</td>
                </tr>
              </tbody>
              <tbody className="totalpay-pdf">
                <tr>
                  <td>Total Amount of whole Trip</td>
                  <td>₹ 15000</td>
                </tr>
                <tr>
                  <td>Service Charge 10%:</td>
                  <td>₹ 1500</td>
                </tr>
                <tr>
                  <td>GST 5%:</td>
                  <td>₹ 750</td>
                </tr>
                <tr>
                  <td><b>Net Amount:</b></td>
                  <td><b>₹ 17250</b></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        </div>
        </div>
      </div>
		);
	
}
export default DownloadQuote