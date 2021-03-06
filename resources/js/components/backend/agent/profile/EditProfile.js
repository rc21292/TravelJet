import React from 'react';
import ReactDOM from 'react-dom';
import { useHistory, useLocation } from 'react-router-dom'

import { useState, useEffect } from 'react'
import {BrowserRouter as Router, Link, Route, Redirect} from 'react-router-dom';



const validEmailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);

function EditProfile() {

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


  const handleClick = () => {  
    history.push('/customer/change-password')   
  };  


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
// localStorage["appState"] = JSON.stringify(appState);
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



  return (

        <div className="venderprofile">
          {/* Page Heading */}
          <div className="row">
            <div className="col-sm-6">
              <h1>Profile Information11</h1>
            </div>            
          </div>
          <div className="venderprofilepage">
           <form>
                <div className="generaldetail2 informationform">
                  <h3>General Details</h3>
                  <div className="form-group row">
                    <label htmlFor="inputnmae3" className="col-sm-3 col-form-label">Your Name1</label>
                    <div className="col-sm-4">
                      <input type="text" className="form-control" placeholder="Your Name" />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label htmlFor="inputname3" className="col-sm-3 col-form-label">Email</label>
                    <div className="col-sm-4">
                      <input type="text" className="form-control" placeholder="Email" />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label htmlFor="inputname3" className="col-sm-3 col-form-label">Mobile</label>
                    <div className="col-sm-4">
                      <input type="number" className="form-control" placeholder="Mobile No." />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label htmlFor="inputPassword3" className="col-sm-3 col-form-label">Password</label>
                    <div className="col-sm-4">
                      <input type="password" className="form-control" placeholder="Password" />
                    </div>
                  </div>
                </div>
                <div className="generaldetail2 informationform">
                  <h3>Business Details</h3>
                  <div className="form-group row">
                    <label htmlFor="inputnmae3" className="col-sm-3 col-form-label">Business Name</label>
                    <div className="col-sm-4">
                      <input type="text" className="form-control" placeholder="Business Name" />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label htmlFor="inputname3" className="col-sm-3 col-form-label">Business Address</label>
                    <div className="col-sm-4">
                      <textarea name="w3review" rows={4} cols={50} placeholder="Business Address" className="form-control" defaultValue={""} />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label htmlFor="inputname3" className="col-sm-3 col-form-label">About Your Business</label>
                    <div className="col-sm-4">
                      <textarea name="w3review" rows={4} cols={50} placeholder="About Your Business" className="form-control" defaultValue={""} />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label htmlFor="inputPassword3" className="col-sm-3 col-form-label">Pincode</label>
                    <div className="col-sm-4">
                      <input type="number" className="form-control" placeholder="Pincode" />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label htmlFor="inputnmae3" className="col-sm-3 col-form-label">City</label>
                    <div className="col-sm-4">
                      <input type="text" className="form-control" placeholder="City" />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label htmlFor="inputnmae3" className="col-sm-3 col-form-label">State</label>
                    <div className="col-sm-4">
                      <input type="text" className="form-control" placeholder="State" />
                    </div>
                  </div>
                  <div className="form-group businessselect">
                    <div className="col-sm-3" />
                    <div className="row">
                      <label className="col-form-label col-sm-5 pt-0">Is your Operating address same as business address?</label>
                      <div className="col-sm-2">
                        <div className="form-check">
                          <input className="form-check-input" type="radio" name="gridRadios" id="gridRadios1" defaultValue="option1" defaultChecked />
                          <label className="form-check-label" htmlFor="gridRadios1">
                            Yes
                          </label>
                          <input className="form-check-input" type="radio" name="gridRadios" id="gridRadios2" defaultValue="option2" />
                          <label className="form-check-label" htmlFor="gridRadios2">
                            No
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="generaldetail2 informationform">
                  <h3>Bank Details</h3>
                  <div className="form-group row">
                    <label htmlFor="inputnmae3" className="col-sm-3 col-form-label">Account Holder's Name</label>
                    <div className="col-sm-4">
                      <input type="text" className="form-control" placeholder="Account Holder's Name" />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label htmlFor="inputname3" className="col-sm-3 col-form-label">Bank Account Number</label>
                    <div className="col-sm-4">
                      <input type="number" className="form-control" placeholder="Bank Account Number" />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label htmlFor="inputname3" className="col-sm-3 col-form-label">IFSC Code</label>
                    <div className="col-sm-4">
                      <input type="text" className="form-control" placeholder="IFSC Code" />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label htmlFor="inputPassword3" className="col-sm-3 col-form-label">GST No</label>
                    <div className="col-sm-4">
                      <input type="number" className="form-control" placeholder="GST No" />
                    </div>
                  </div>
                </div>
                <div className="form-group row">
                  <div className="col-sm-10 text-center">
                    <a className="btn btn-primary">Save</a>
                  </div>
                </div>
              </form>
            </div>
          </div>

    );
}

export default EditProfile