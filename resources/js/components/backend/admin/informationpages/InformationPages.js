import React from 'react'  
import axios from 'axios';  
import { useHistory, useLocation } from 'react-router-dom'
import FlashMessage from 'react-flash-message'
import Pagination from "react-js-pagination";
import { useState, useEffect } from 'react'  

function InformationPages(props) { 

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
            <div className="transactionhistory information_create agentpage" style={{display: 'block'}}>
              {/* Page Heading */}
              <div className="row">
                <div className="col-sm-6">
                  <h1>Information Pages</h1>
                </div>
                <div className="col-sm-3">
                  <div className="creatpage">
                    <a href="#" className="btn btn-primary infocreate">Create Page</a>
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
                              <th scope="col">Page Title</th>
                              <th scope="col">Sort Order</th>
                              <th scope="col">Status</th>
                              <th scope="col">Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>Company Info</td>
                              <td>1</td>
                              <td>Enabled</td>
                              <td><a href="#" className="btn btn-primary"><i className="fa fa-edit" /></a><a href="#" className="btn btn-danger"><i className="fa fa-trash" /></a></td>
                            </tr>
                            <tr>
                              <td>Payment Procedure</td>
                              <td>2</td>
                              <td>Enabled</td>
                              <td><a href="#" className="btn btn-primary"><i className="fa fa-edit" /></a><a href="#" className="btn btn-danger"><i className="fa fa-trash" /></a></td>
                            </tr>
                            <tr>
                              <td>Privacy Policy</td>
                              <td>3</td>
                              <td>Enabled</td>
                              <td><a href="#" className="btn btn-primary"><i className="fa fa-edit" /></a><a href="#" className="btn btn-danger"><i className="fa fa-trash" /></a></td>
                            </tr>
                            <tr>
                              <td>Trem and Condition</td>
                              <td>4</td>
                              <td>Enabled</td>
                              <td><a href="#" className="btn btn-primary"><i className="fa fa-edit" /></a><a href="#" className="btn btn-danger"><i className="fa fa-trash" /></a></td>
                            </tr>
                            <tr>
                              <td>Cancellation Policy</td>
                              <td>5</td>
                              <td>Disabled</td>
                              <td><a href="#" className="btn btn-primary"><i className="fa fa-edit" /></a><a href="#" className="btn btn-danger"><i className="fa fa-trash" /></a></td>
                            </tr>
                            <tr>
                              <td>Drive with us</td>
                              <td>6</td>
                              <td>Disabled</td>
                              <td><a href="#" className="btn btn-primary"><i className="fa fa-edit" /></a><a href="#" className="btn btn-danger"><i className="fa fa-trash" /></a></td>
                            </tr>
                            <tr>
                              <td>How we work</td>
                              <td>7</td>
                              <td>Disabled</td>
                              <td><a href="#" className="btn btn-primary"><i className="fa fa-edit" /></a><a href="#" className="btn btn-danger"><i className="fa fa-trash" /></a></td>
                            </tr>
                            <tr>
                              <td colSpan={4}>
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
            <div className="transactionhistory information_save agentpage" style={{display: 'none'}}>
              {/* Page Heading */}
              <div className="row">
                <div className="col-sm-6">
                  <h1>Information Pages</h1>
                </div>
                <div className="col-sm-3">
                  <div className="creatpage">
                    <a href="#" className="btn btn-primary">Save</a>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-9">
                  <div className="cardbg total-transaction informationform">
                    <div className="card-body">
                      <form className="filterform informationform">
                        <div className="form">
                          <div className="form-group row">
                            <label htmlFor="labelname" className="col-sm-2">Page Title</label>
                            <div className="col-sm-10">
                              <input type="text" className="form-control" placeholder="Page Title" />
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
                        <div className="form-group row">
                          <label htmlFor="labelname" className="col-sm-2">Description</label>
                          <div className="col-sm-10">
                            <div className="discriptioneditor">
                              <div className="panel">
                                <div className="panel-heading">
                                  <div className="btn-group">                         
                                    <button type="button" className="btn btn-default" data-toggle="tooltip" title="Source code">
                                      <i className="fa fa-code" />
                                    </button>
                                  </div>
                                  <div className="btn-group">
                                    <button type="button" className="btn btn-default" data-toggle="tooltip" title="Bold">
                                      <i className="fa fa-bold" />
                                    </button>
                                    <button type="button" className="btn btn-default" data-toggle="tooltip" title="Italic">
                                      <i className="fa fa-italic" />
                                    </button>
                                    <button type="button" className="btn btn-default" data-toggle="tooltip" title="Underline">
                                      <i className="fa fa-underline" />
                                    </button>
                                  </div>
                                  <div className="btn-group">
                                    <button type="button" className="btn btn-default" data-toggle="tooltip" title="Align left">
                                      <i className="fa fa-align-left" />
                                    </button>
                                  </div>
                                  <div className="btn-group">
                                    <button type="button" className="btn btn-default" data-toggle="tooltip" title="Numbered list">
                                      <i className="fa fa-list-ol" />
                                    </button>
                                    <button type="button" className="btn btn-default" data-toggle="tooltip" title="Bulleted list">
                                      <i className="fa fa-list-ul" />
                                    </button>
                                  </div>
                                  <div className="btn-group">
                                    <button type="button" className="btn btn-default" data-toggle="tooltip" title="Link">
                                      <i className="fa fa-link" />
                                    </button>
                                    <button type="button" className="btn btn-default" data-toggle="tooltip" title="Unlink">
                                      <i className="fa fa-unlink" />
                                    </button>
                                  </div>
                                  <div className="btn-group">
                                    <button type="button" className="btn btn-default" data-toggle="tooltip" title="Picture">
                                      <i className="fa fa-picture-o" />
                                    </button>
                                    <button type="button" className="btn btn-default" data-toggle="tooltip" title="HTML table">
                                      <i className="fa fa-table" />
                                    </button>
                                    <button type="button" className="btn btn-default" data-toggle="tooltip" title="Font">
                                      <i className="fa fa-font" />
                                    </button>
                                  </div>
                                </div>
                                <div className="panel-body">
                                  <textarea name="w3review" rows={12} cols={50} className="form-control" defaultValue={""} />
                                </div>
                              </div>
                            </div>
                          </div>
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
  
export default InformationPages