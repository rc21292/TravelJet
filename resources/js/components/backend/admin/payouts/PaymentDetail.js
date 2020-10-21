import React from 'react'  
import axios from 'axios'
import { useHistory } from "react-router-dom";
import { useState, useEffect } from 'react'
import Moment from 'react-moment';

function PaymentDetail(props) { 
  console.log(props);
  const [requestedPayout, setRequestedPayout] = useState({});
  const [saveData, setSaveData] = useState({});  
  const [requestedPayoutId, setRequestedPayoutId] = useState(0);  
  const [error, setError] = useState();  

  let history = useHistory();

  useEffect(() => {

    let parts = location.pathname.split('/');
    let requested_payout_id = parts.pop() || parts.pop(); 

    setRequestedPayoutId(requested_payout_id); 

    axios.get('/api/getRequestedPayoutById/'+requested_payout_id)
    .then(response=>{
      setRequestedPayout(response.data.payouts)
      setSaveData({...saveData,'payment_method':'','amount':response.data.payouts.amount,'user_id':response.data.payouts.user_id,'id':response.data.payouts.id});
    });

  },[]); 

  const updatePayout = (event) => {
    if (saveData.payment_method == '') {
      setError('Please select Payment Method!');
      return false;
    }else{
      setError('');
      let data = saveData;
      axios.post('/api/payouts/updatePayout/',data)  
      .then((result) => {  
        // window.location.href = "/admin/pending-payouts";
      }); 
    }     
  }; 

  const handleChange = (event) => {
    var {name,value} = event.target;
    setSaveData({...saveData,[name]:value});
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
                  <h1>Payment Details</h1>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-12">
                  <div className="transactiondiv">
                    <div className="cardbg total-transaction">
                      <div className="card-body">
                        <form className="filterform paydetail informationform">
                          <div className="form">
                            <div className="form-group row">
                              <label htmlFor="labelname" className="col-sm-4">Select Payment Method</label>
                              <div className="col-sm-8">
                                <select id="inputState" name="payment_method" onChange={handleChange} className="form-control">
                                  <option value="">Select</option>
                                  <option value="Paypal">Paypal</option>
                                  <option value="Razorpay">Razorpay</option>
                                  <option value="Bank Transfer">Bank Transfer</option>
                                  <option value="Other">Other</option>
                                </select>
                                <div style={{color:'red'}}> {error && error} </div>
                              </div>
                            </div>
                            <div className="form-group row">
                              <label htmlFor="labelname" className="col-sm-4">Amount</label>
                              <div className="col-sm-8">
                                <input type="number" className="form-control" defaultValue={requestedPayout.amount} placeholder="₹ 10000" disabled />
                              </div>
                            </div>
                            <div className="form-group row">
                              <label htmlFor="labelname" className="col-sm-4">Transaction ID</label>
                              <div className="col-sm-8">
                                <input type="text" name="transaction_id" className="form-control" onChange={handleChange} placeholder="Enter Transaction ID" />
                              </div>
                            </div>
                          </div>
                          <div className="col-sm-8 col-sm-offset-4 paddingleft">
                            <a onClick={updatePayout} className="btn btn-primary">Update Payment Details</a>
                          </div>
                        </form>
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
        {/* End of Content Wrapper */}
      </div>
  )  
}  
  
export default PaymentDetail