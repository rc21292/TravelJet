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
            <div className="transactionhistory profile_create agentpage" style={{display: 'block'}}>
              {/* Page Heading */}
              <div className="row">
                <div className="col-sm-6">
                  <h1>User Profile</h1>
                </div>
                <div className="col-sm-3">
                  <div className="creatpage">
                    <a href="#" className="btn btn-primary usercreate">Create user</a>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-9">
                  <div className="transactiondiv">
                    <div className="cardbg total-transaction">
                      <div className="card-body">
                        <table className="table">
                          <thead className="thead-light">
                            <tr>
                              <th scope="col">Email</th>
                              <th scope="col">Status</th>
                              <th scope="col">Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>admin@traveljet.com</td>
                              <td>Enabled</td>
                              <td><a href="#" className="btn btn-primary"><i className="fa fa-edit" /></a><a href="#" className="btn btn-danger"><i className="fa fa-trash" /></a></td>
                            </tr>
                            <tr>
                              <td>admin@traveljet.com</td>
                              <td>Enabled</td>
                              <td><a href="#" className="btn btn-primary"><i className="fa fa-edit" /></a><a href="#" className="btn btn-danger"><i className="fa fa-trash" /></a></td>
                            </tr>
                            <tr>
                              <td>admin@traveljet.com</td>
                              <td>Enabled</td>
                              <td><a href="#" className="btn btn-primary"><i className="fa fa-edit" /></a><a href="#" className="btn btn-danger"><i className="fa fa-trash" /></a></td>
                            </tr>
                            <tr>
                              <td>admin@traveljet.com</td>
                              <td>Enabled</td>
                              <td><a href="#" className="btn btn-primary"><i className="fa fa-edit" /></a><a href="#" className="btn btn-danger"><i className="fa fa-trash" /></a></td>
                            </tr>
                            <tr>
                              <td>admin@traveljet.com</td>
                              <td>Disabled</td>
                              <td><a href="#" className="btn btn-primary"><i className="fa fa-edit" /></a><a href="#" className="btn btn-danger"><i className="fa fa-trash" /></a></td>
                            </tr>
                            <tr>
                              <td>admin@traveljet.com</td>
                              <td>Disabled</td>
                              <td><a href="#" className="btn btn-primary"><i className="fa fa-edit" /></a><a href="#" className="btn btn-danger"><i className="fa fa-trash" /></a></td>
                            </tr>
                            <tr>
                              <td>admin@traveljet.com</td>
                              <td>Disabled</td>
                              <td><a href="#" className="btn btn-primary"><i className="fa fa-edit" /></a><a href="#" className="btn btn-danger"><i className="fa fa-trash" /></a></td>
                            </tr>
                            <tr>
                              <td colSpan={3}>
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
              </div>
            </div>
            <div className="transactionhistory profile_save agentpage" style={{display: 'none'}}>
              {/* Page Heading */}
              <div className="row">
                <div className="col-sm-6">
                  <h1>Edit User</h1>
                </div>
                <div className="col-sm-3">
                  <div className="creatpage">
                    <a href="#" className="btn btn-primary">Save</a>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-9">
                  <div className="transactiondiv">
                    <div className="cardbg total-transaction informationform">
                      <div className="card-header customerheader">
                        <h4 className="card-title">Edit</h4>
                      </div>
                      <div className="card-body">
                        <form className="filterform informationform">
                          <div className="form">
                            <div className="form-group row">
                              <label htmlFor="labelname" className="col-sm-2">Email</label>
                              <div className="col-sm-10">
                                <input type="text" className="form-control" placeholder="Email" />
                              </div>
                            </div>
                            <div className="form-group row">
                              <label htmlFor="labelname" className="col-sm-2">First Name</label>
                              <div className="col-sm-10">
                                <input type="text" className="form-control" placeholder="First Name" />
                              </div>
                            </div>
                            <div className="form-group row">
                              <label htmlFor="labelname" className="col-sm-2">Last Name</label>
                              <div className="col-sm-10">
                                <input type="text" className="form-control" placeholder="Last Name" />
                              </div>
                            </div>
                            <div className="form-group row">
                              <label htmlFor="labelname" className="col-sm-2">Image</label>
                              <div className="col-sm-3">
                                <div className="upload-field2 upload-img">
                                  <input type="text" className="form-control" />
                                  <ul className="list-inline upload-icon2">
                                    <li>
                                      <a href="#" title>
                                        <div className="file-upload1">
                                          <input type="file" /><i className="fa fa-camera" />
                                        </div>
                                      </a>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                            <div className="form-group row">
                              <label htmlFor="labelname" className="col-sm-2">Password</label>
                              <div className="col-sm-10">
                                <input type="text" className="form-control" placeholder="Password" />
                              </div>
                            </div>
                            <div className="form-group row">
                              <label htmlFor="labelname" className="col-sm-2">Confirm</label>
                              <div className="col-sm-10">
                                <input type="text" className="form-control" placeholder="Confirm" />
                              </div>
                            </div>
                            <div className="form-group row">
                              <label htmlFor="labelname" className="col-sm-2">Status</label>
                              <div className="col-sm-10">
                                <select className="form-control">
                                  <option selected>Enabled</option>
                                  <option>Disabled</option>
                                </select>
                              </div>
                            </div>
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
  
export default Credits