import React from 'react';
import ReactDOM from 'react-dom';
import { useHistory, useLocation } from 'react-router-dom'

import { useState, useEffect } from 'react'
import {BrowserRouter as Router, Link, Route, Redirect} from 'react-router-dom';



const validEmailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);

function Leads() {

  const [user, setUser] = useState(false);
  const [name, setName] = useState(false);
  const [email, setEmail] = useState(false);
  const [phone, setPhone] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);
  const [errors, setErrors] = useState({});

  const [readonlyName, setReadonlyName] = useState(true);
  const [readonlyEmail, setReadonlyEmail] = useState(true);
  const [readonlyPhone, setReadonlyPhone] = useState(true);

  const [gender, setGender] = useState('');

  const history = useHistory()

  useEffect(() => {
    let stateqq = localStorage["appState"];
    if (stateqq) {
      let AppState = JSON.parse(stateqq);
      setUser(AppState.user);
      setName(AppState.user.name);
      setEmail(AppState.user.email);
      setGender(AppState.user.gender);
      setPhone(AppState.user.phone);
      if (AppState.isLoggedIn == false) {
        history.push('/login');
      }
    }   

  },[]); 

  const handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    let errors = {};

    switch (name) {
      case 'name': 
      errors.name = 
      value.length < 5
      ? 'Name must be 5 characters long!'
      : '';
      setName(value);
      break;
      case 'email': 
      errors.email = 
      validEmailRegex.test(value)
      ? ''
      : 'Email is not valid!';
      setEmail(value);
      break;
      case 'phone': 
      errors.phone = 
      value.length < 10
      ? 'phone must be 10 characters long!'
      : '';
      setPhone(value);
      break;
      default:
      break;
    }

    setErrors(errors);
  }


  const validateForm = () => {

    let errors = {};
    let formIsValid = true;

    if (!name) {
      formIsValid = false;
      errors["name"] = "*Please enter Name.";
    }

    if (!email) {
      formIsValid = false;
      errors["email"] = "*Please enter Email.";
    }

    if(!validEmailRegex.test(email)){
      formIsValid = false;  
      errors["email"] = "*Not a valid email Address.";
    }

    if (!phone) { 
      formIsValid = false;
      errors["phone"] = "*Please enter Phone.";
    }

    setErrors(errors);
    return formIsValid;
  }



  const handleSubmit = (event) => {
    event.preventDefault();
    if(validateForm(errors)) {
      event.preventDefault();
      const query = {
        name:name,
        email:email,
        phone:phone,
      }
      let user_id = user.id;
      axios.post('/api/users/update/'+user.id,query).then(res=>
      {
        axios.get("/api/users/show/"+user_id).then(json => {
          if (json.data) {
            let userData = {
              id: json.data.id,
              name: json.data.name,
              email: json.data.email,
              gender: json.data.gender,
              phone: json.data.phone,
              role: json.data.role,
            };
            let appState = {
              isLoggedIn: true,
              user: userData
            };
localStorage.setItem('appState', JSON.stringify(appState));
}
});

        setIsUpdated(true);
        setReadonlyName(true);
        setReadonlyEmail(true);
        setReadonlyPhone(true);

        window.scrollTo(0, 0);
      }
      );
    }else{
      console.error('Invalid Form')
    }
  }

const handleClick = () => {  
        history.push('/agent/personal-information/edit')   
  };  

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
                        <tr>
                          <td>0000000</td>
                          <td>Delhi Manali Cab Booking for 3 night 4 days with 4 person</td>
                          <td>Rahul Kumar</td>
                          <td>One Way</td>
                          <td>14-Jul-20</td>
                          <td><i className="fa fa-inr" /> 5500</td>
                          <td>Delhi</td>
                          <td>Manali</td>
                          <td><a href="/quotations/10" className="btn btn-primary"><i className="fa fa-eye" /> View</a></td>
                        </tr>
                        <tr>
                          <td>0000000</td>
                          <td>Delhi Manali Cab Booking for 3 night 4 days with 4 person</td>
                          <td>Rahul Kumar</td>
                          <td>One Way</td>
                          <td>14-Jul-20</td>
                          <td><i className="fa fa-inr" /> 5500</td>
                          <td>Delhi</td>
                          <td>Manali</td>
                          <td><a href="/quotations/10" className="btn btn-primary"><i className="fa fa-eye" /> View</a></td>
                        </tr>
                        <tr>
                          <td>0000000</td>
                          <td>Delhi Manali Cab Booking for 3 night 4 days with 4 person</td>
                          <td>Rahul Kumar</td>
                          <td>One Way</td>
                          <td>14-Jul-20</td>
                          <td><i className="fa fa-inr" /> 5500</td>
                          <td>Delhi</td>
                          <td>Manali</td>
                          <td><a href="/quotations/10" className="btn btn-primary"><i className="fa fa-eye" /> View</a></td>
                        </tr>
                        <tr>
                          <td>0000000</td>
                          <td>Delhi Manali Cab Booking for 3 night 4 days with 4 person</td>
                          <td>Rahul Kumar</td>
                          <td>One Way</td>
                          <td>14-Jul-20</td>
                          <td><i className="fa fa-inr" /> 5500</td>
                          <td>Delhi</td>
                          <td>Manali</td>
                          <td><a href="/quotations/10" className="btn btn-primary"><i className="fa fa-eye" /> View</a></td>
                        </tr>
                        <tr>
                          <td>0000000</td>
                          <td>Delhi Manali Cab Booking for 3 night 4 days with 4 person</td>
                          <td>Rahul Kumar</td>
                          <td>One Way</td>
                          <td>14-Jul-20</td>
                          <td><i className="fa fa-inr" /> 5500</td>
                          <td>Delhi</td>
                          <td>Manali</td>
                          <td><a href="/quotations/10" className="btn btn-primary"><i className="fa fa-eye" /> View</a></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="clearfix" />
                  <div className="col-sm-12">
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
                        <tr>
                          <td>0000000</td>
                          <td>Delhi Manali Cab Booking for 3 night 4 days with 4 person</td>
                          <td>Rahul Kumar</td>
                          <td>One Way</td>
                          <td>14-Jul-20</td>
                          <td>Delhi</td>
                          <td>Manali</td>
                          <td><a href="/bookings" className="btn btn-primary"><i className="fa fa-eye" /> View</a></td>
                        </tr>
                        <tr>
                          <td>0000000</td>
                          <td>Delhi Manali Cab Booking for 3 night 4 days with 4 person</td>
                          <td>Rahul Kumar</td>
                          <td>One Way</td>
                          <td>14-Jul-20</td>
                          <td>Delhi</td>
                          <td>Manali</td>
                          <td><a href="/bookings" className="btn btn-primary"><i className="fa fa-eye" /> View</a></td>
                        </tr>
                        <tr>
                          <td>0000000</td>
                          <td>Delhi Manali Cab Booking for 3 night 4 days with 4 person</td>
                          <td>Rahul Kumar</td>
                          <td>One Way</td>
                          <td>14-Jul-20</td>
                          <td>Delhi</td>
                          <td>Manali</td>
                          <td><a href="/bookings" className="btn btn-primary"><i className="fa fa-eye" /> View</a></td>
                        </tr>
                        <tr>
                          <td>0000000</td>
                          <td>Delhi Manali Cab Booking for 3 night 4 days with 4 person</td>
                          <td>Rahul Kumar</td>
                          <td>One Way</td>
                          <td>14-Jul-20</td>
                          <td>Delhi</td>
                          <td>Manali</td>
                          <td><a href="/bookings" className="btn btn-primary"><i className="fa fa-eye" /> View</a></td>
                        </tr>
                        <tr>
                          <td>0000000</td>
                          <td>Delhi Manali Cab Booking for 3 night 4 days with 4 person</td>
                          <td>Rahul Kumar</td>
                          <td>One Way</td>
                          <td>14-Jul-20</td>
                          <td>Delhi</td>
                          <td>Manali</td>
                          <td><a href="/bookings" className="btn btn-primary"><i className="fa fa-eye" /> View</a></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="clearfix" />
                  <div className="col-sm-12">
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
                        <tr>
                          <td>0000000</td>
                          <td>Delhi Manali Cab Booking for 3 night 4 days with 4 person</td>
                          <td>Rahul Kumar</td>
                          <td>One Way</td>
                          <td>14-Jul-20</td>
                          <td>Delhi</td>
                          <td>Manali</td>
                          <td><a href="/booked" className="btn btn-primary"><i className="fa fa-eye" /> View</a></td>
                        </tr>
                        <tr>
                          <td>0000000</td>
                          <td>Delhi Manali Cab Booking for 3 night 4 days with 4 person</td>
                          <td>Rahul Kumar</td>
                          <td>One Way</td>
                          <td>14-Jul-20</td>
                          <td>Delhi</td>
                          <td>Manali</td>
                          <td><a href="/booked" className="btn btn-primary"><i className="fa fa-eye" /> View</a></td>
                        </tr>
                        <tr>
                          <td>0000000</td>
                          <td>Delhi Manali Cab Booking for 3 night 4 days with 4 person</td>
                          <td>Rahul Kumar</td>
                          <td>One Way</td>
                          <td>14-Jul-20</td>
                          <td>Delhi</td>
                          <td>Manali</td>
                          <td><a href="/booked" className="btn btn-primary"><i className="fa fa-eye" /> View</a></td>
                        </tr>
                        <tr>
                          <td>0000000</td>
                          <td>Delhi Manali Cab Booking for 3 night 4 days with 4 person</td>
                          <td>Rahul Kumar</td>
                          <td>One Way</td>
                          <td>14-Jul-20</td>
                          <td>Delhi</td>
                          <td>Manali</td>
                          <td><a href="/booked" className="btn btn-primary"><i className="fa fa-eye" /> View</a></td>
                        </tr>
                        <tr>
                          <td>0000000</td>
                          <td>Delhi Manali Cab Booking for 3 night 4 days with 4 person</td>
                          <td>Rahul Kumar</td>
                          <td>One Way</td>
                          <td>14-Jul-20</td>
                          <td>Delhi</td>
                          <td>Manali</td>
                          <td><a href="/booked" className="btn btn-primary"><i className="fa fa-eye" /> View</a></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="clearfix" />
                  <div className="col-sm-12">
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