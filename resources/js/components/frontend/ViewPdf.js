import React from 'react'  
import axios from 'axios';  
import { useHistory, useLocation } from 'react-router-dom'
import Moment from 'react-moment';

import { useState, useEffect } from 'react'  

function ViewPdf({match}) { 

  const history = useHistory()
  const location = useLocation()

  const [user, setUser] = useState(false);

  const [invoiceData, setInvoiceData] = useState({});

  const [bookingData, setBookingData] = useState({}); 
  const [invoiceId, setInvoiceId] = useState(''); 
  const [customer, setCustomer] = useState({});   
  const [address, setAddress] = useState({});   
  const [error, setError] = useState('');   

  const [invoiceDetail, setInvoiceDetail] = useState([]);


  useEffect(() => {

    let invoice_id = match.params.id;  

    setInvoiceId(invoice_id);

    let stateqq = localStorage["appState"];
    if (stateqq) {
      let AppState = JSON.parse(stateqq);
      setUser(AppState.user);

      axios('/api/invoices/show/'+invoice_id).then(result=>{
        if (result.data) {
          setInvoiceData(result.data);   
          axios('/api/invoices/invoiceDetails/'+invoice_id).then(result=>{
            if (result.data) {
              setInvoiceDetail(result.data);          
            }
          });     
          axios.get('/api/getAgentAddresses/'+AppState.user.id)
          .then(response=>{
            setAddress(response.data);
          });  
        }
      });
    }   

  }, []);  


  return (  
       <div className="invoice">
        <div className="container">
          <div className="row">
            <div className="invoicepdf">
              <div className="row">
                <div className="col-sm-6">
                  <div className="invoicelogo">
                  {address.business_type == 'company' ? 
                    <img src={'/uploads/users/'+user.id+'/business_logo/'+address.business_logo} alt="logo" />
                     : <h1 style={{ fontWeight: 'bold' }}>{address.name}</h1> }
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="taxinvoice">
                    <h2>Tax Invoice</h2>
                    <span>{invoiceData.status}</span>
                  </div>
                </div>
              </div>
              <div className="clearfix" />
              <div className="billto">
                <div className="billtoheading">Bill To</div>
                <div className="row">
                  <div className="col-sm-6">
                    <div className="billaddress">
                      <div className="name">{invoiceData.customer_name}</div>
                      <p>{invoiceData.billing_address}</p>
                    </div>
                  </div>
                  <div className="col-sm-5 col-sm-offset-1">
                    <div className="companyaddress">
                      <div className="name">{address.business_type == 'company' ? address.company : address.name }.</div>
                      <p>{address.address}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="invoicenumber">
                <div className="row">
                  <div className="col-sm-6">
                    <div className="invoicedetai">
                      <p><b>Invoice Number:</b> {invoiceData.invoice_number}</p>
                      <p><b>Invoice Date:</b> <Moment format="DD-MM-YYYY">{invoiceData.invoice_date}</Moment></p>
                      <p><b>Due Date:</b> <Moment format="DD-MM-YYYY">{invoiceData.due_date}</Moment></p>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="documentdetai">
                      <p><b>CIN:</b> U74990MH2009PTC194653</p>
                      <p><b>GSTIN:</b> 27AAGCP4442G1ZF</p>
                      <p><b>PAN:</b> AAGCP4442G</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="invoicetable">
                <table className="table">
                  <thead className="thead">
                    <tr>
                      <th scope="col">Description</th>
                      <th scope="col">Qty</th>
                      <th scope="col" className="sd">Rate</th>
                      <th scope="col">Amount</th>
                    </tr>
                  </thead>
                  {invoiceDetail.map((x, i) => {
                      return ( <tbody key={i} className="customerbody">
                        <tr>
                      <td><span>{x.booking_name}</span> <br /> {x.booking_description}</td>
                      <td>{x.qty}</td>
                      <td><i className="fa fa-inr" /> {x.rate}</td>
                      <td><i className="fa fa-inr" /> {x.amount}</td>
                    </tr>
                      </tbody>
                      );
                    })}
                </table>
              </div>
              <div className="invoicetotal">
                <table className="table">
                  <tbody className="totalbody">
                    <tr>
                      <td colSpan={5} className="lablename">Sub Total :</td>
                      <td className="payprice"> <i className="fa fa-inr" /> {invoiceData.sub_total}</td>
                    </tr>
                    <tr>
                      <td colSpan={5} className="lablename">Service Charge 10% :</td>
                      <td className="payprice"> <i className="fa fa-inr" /> { ((invoiceData.sub_total*10)/100) }</td>
                    </tr>
                    <tr>
                      <td colSpan={5} className="lablename">GST 8% :</td>
                      <td className="payprice"> <i className="fa fa-inr" /> { ((invoiceData.sub_total*8)/100) }</td>
                    </tr>
                    <tr>
                      <td colSpan={5} className="lablename">Total :</td>
                      <td className="payprice"> <i className="fa fa-inr" /> <b>{invoiceData.total}</b></td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="invoicenote">
                <p><b>Note:</b> On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they connot foresee the pain and trouble.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
  )  
}  
  
export default ViewPdf