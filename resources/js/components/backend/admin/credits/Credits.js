import React from 'react'  
import axios from 'axios';  
import { useHistory, useLocation } from 'react-router-dom'
import FlashMessage from 'react-flash-message'
import Pagination from "react-js-pagination";
import { useState, useEffect } from 'react'  

function Credits(props) { 

  const history = useHistory()
  const location = useLocation()

   const [user, setUser] = useState(false);


  const [success, setSuccess] = useState('');

  const [credits, setCredits] = useState([]);
  const [creditsData, setCreditsData] = useState([]);
  useEffect(() => {  

    let stateqq = localStorage["appState"];
    if (stateqq) {
      let AppState = JSON.parse(stateqq);
      console.log(AppState.user);
      setUser(AppState.user);

      const script = document.createElement("script")
    script.async = true
    script.src = 'https://checkout.razorpay.com/v1/checkout.js'
    document.body.appendChild(script)       

    axios('/api/credits').then(result=>{
        setCreditsData(result.data);
      });

      axios('/api/credits/getCredits/'+AppState.user.id).then(result=>{
        setCredits(result.data);
      });
    }   

  }, []);  

   const openCheckout = (event) => {

   let amount = event.currentTarget.dataset.amount;
    let new_amount = amount;
    let user_id = user.id;
    let options = {
      "key": "rzp_test_FvMwf7j3FOOnh8",
      "amount": amount*100,
      "name": "TravelJet",
      "description": "Pay to Add Balance",
      "image": "http://127.0.0.1:8000/frontend/image/logo.png",
      "handler": function (response){
        console.log(response);
        try {
         const paymentId = response.razorpay_payment_id;
         const query = {
          payment_id:paymentId,
          user_id:user_id,
          amount:(new_amount),
        }
        axios.post('/api/credits/save_user_credits',query)
        .then(response=>{
          setCredits(response.data.credits);
          setSuccess(' '+(response.data.added_credits)+' Credits Added Successfully!');
          });
      } catch (err) {
        console.log(err);
      }
    },
    "prefill": {
      "name": user.name,
      "email": user.email,
      "contact": user.phone,
    },
    "modal": {
        "ondismiss": function () {
            return false;
            // window.location.href ='/';
        },
    },
    "theme": {
      "color": "#F37254"
    }
  };
    
    let rzp = new Razorpay(options);
    rzp.open();
  }

  return (  
    <div id="content-wrapper">
        {/* Main Content */}
        <div id="content">
          {/* Begin Page Content */}
          <div className="container-fluid">
            <div className="transactionhistory manage_credit agentpage" style={{display: 'block'}}>
              {/* Page Heading */}
              <div className="row">
                <div className="col-sm-12">
                  <h1>Manage Credit</h1>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-8">
                  <div className="transactiondiv managecredit">
                    <div className="cardbg total-transaction">
                      <div className="card-body">
                        <table className="table">
                          <thead className="thead-light">
                            <tr>
                              <th scope="col">Credit Title</th>
                              <th scope="col">Credit Quantity</th>
                              <th scope="col">Credit Price</th>
                              <th scope="col">Status</th>
                              <th scope="col">Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>Bronze</td>
                              <td>10</td>
                              <td>100</td>
                              <td>Enabled</td>
                              <td><a href="#" className="btn btn-primary editcredit"><i className="fa fa-edit" /></a><a href="#" className="btn btn-danger"><i className="fa fa-trash" /></a></td>
                            </tr>
                            <tr>
                              <td>Silver</td>
                              <td>20</td>
                              <td>100</td>
                              <td>Enabled</td>
                              <td><a href="#" className="btn btn-primary editcredit"><i className="fa fa-edit" /></a><a href="#" className="btn btn-danger"><i className="fa fa-trash" /></a></td>
                            </tr>
                            <tr>
                              <td>Gold</td>
                              <td>30</td>
                              <td>100</td>
                              <td>Enabled</td>
                              <td><a href="#" className="btn btn-primary editcredit"><i className="fa fa-edit" /></a><a href="#" className="btn btn-danger"><i className="fa fa-trash" /></a></td>
                            </tr>
                            <tr>
                              <td>Platinum</td>
                              <td>70</td>
                              <td>400</td>
                              <td>Enabled</td>
                              <td><a href="#" className="btn btn-primary editcredit"><i className="fa fa-edit" /></a><a href="#" className="btn btn-danger"><i className="fa fa-trash" /></a></td>
                            </tr>
                            <tr>
                              <td>Bronze</td>
                              <td>10</td>
                              <td>100</td>
                              <td>Disabled</td>
                              <td><a href="#" className="btn btn-primary editcredit"><i className="fa fa-edit" /></a><a href="#" className="btn btn-danger"><i className="fa fa-trash" /></a></td>
                            </tr>
                            <tr>
                              <td>Bronze</td>
                              <td>10</td>
                              <td>100</td>
                              <td>Disabled</td>
                              <td><a href="#" className="btn btn-primary editcredit"><i className="fa fa-edit" /></a><a href="#" className="btn btn-danger"><i className="fa fa-trash" /></a></td>
                            </tr>
                            <tr>
                              <td>Bronze</td>
                              <td>10</td>
                              <td>100</td>
                              <td>Disabled</td>
                              <td><a href="#" className="btn btn-primary editcredit"><i className="fa fa-edit" /></a><a href="#" className="btn btn-danger"><i className="fa fa-trash" /></a></td>
                            </tr>
                            <tr>
                              <td>Bronze</td>
                              <td>10</td>
                              <td>100</td>
                              <td>Disabled</td>
                              <td><a href="#" className="btn btn-primary editcredit"><i className="fa fa-edit" /></a><a href="#" className="btn btn-danger"><i className="fa fa-trash" /></a></td>
                            </tr>
                            <tr>
                              <td colSpan={5}>
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
                            <label htmlFor="labelname">Credit Title</label>
                            <input type="text" className="form-control" placeholder="Credit Title" />
                          </div>
                          <div className="form-group col-md-12">
                            <label htmlFor="labelname">Credit Quantity</label>
                            <input type="text" className="form-control" placeholder="Credit Quantity" />
                          </div>
                          <div className="form-group col-md-12">
                            <label htmlFor="labelname">Credit Price</label>
                            <input type="number" className="form-control" placeholder="Credit Price" />
                          </div>
                          <div className="form-group col-md-12">
                            <label htmlFor="labelname">Status</label>
                            <select id="inputState" className="form-control">
                              <option selected>Status</option>
                              <option>Pending</option>
                              <option>Done</option>
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
            </div>
            <div className="transactionhistory edit_credit agentpage" style={{display: 'none'}}>
              {/* Page Heading */}
              <div className="row">
                <div className="col-sm-12">
                  <h1>Edit Credit</h1>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-8">
                  <div className="cardbg total-transaction informationform">
                    <div className="card-header customerheader">
                      <h4 className="card-title">Edit Credit</h4>
                    </div>
                    <div className="card-body">
                      <form className="filterform">
                        <div className="form-row">
                          <div className="form-group col-md-12">
                            <label htmlFor="labelname">Credit Title</label>
                            <input type="text" className="form-control" placeholder="Credit Title" />
                          </div>
                          <div className="form-group col-md-12">
                            <label htmlFor="labelname">Credit Quantity</label>
                            <input type="text" className="form-control" placeholder="Credit Quantity" />
                          </div>
                          <div className="form-group col-md-12">
                            <label htmlFor="labelname">Credit Price</label>
                            <input type="text" className="form-control" placeholder="Credit Price" />
                          </div>
                          <div className="form-group col-md-12">
                            <label htmlFor="labelname">Status</label>
                            <select className="form-control">
                              <option selected>Enabled</option>
                              <option>Disabled</option>
                            </select>
                          </div>
                        </div>
                        <div className="placebidbtn filterbtn">
                          <a href="#" className="btn btn-primary">Update Credit</a>
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
  
export default Credits