import React from 'react';
import ReactDOM from 'react-dom';
import { useHistory, useLocation } from 'react-router-dom'

import { useState, useEffect } from 'react'
import {BrowserRouter as Router, Link, Route, Redirect} from 'react-router-dom';

import FlashMessage from 'react-flash-message'


function ChangePassword() {

  const [user, setUser] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isUpdated, setIsUpdated] = useState('');
  const [errors, setErrors] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [errorMessage, setErrorMessage] = useState([]);

  const history = useHistory()

  useEffect(() => {
    let stateqq = localStorage["appState"];
    if (stateqq) {
      let AppState = JSON.parse(stateqq);
      setUser(AppState.user);
      if (AppState.isLoggedIn == false) {
        history.push('/login');
      }
    }   

  },[]); 


  const validateForm = () => {

    let errors = {};
    let formIsValid = true;

    if (!oldPassword) {
      formIsValid = false;
      errors["oldPassword"] = "*Please enter Current Password.";
    }

    if (!newPassword) {
      formIsValid = false;
      errors["newPassword"] = "*Please enter New Password.";
    }

    if (!confirmPassword) {
      formIsValid = false;
      errors["confirmPassword"] = "*Please select confirm Password same as New Password.";
    }

    setErrors(errors);
    return formIsValid;
  }

  const handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    let errors = {};

    switch (name) {
      case 'oldPassword': 
      errors.oldPassword = 
      value.length < 1
      ? 'Name must be 1 characters long!'
      : '';
      setOldPassword(value);
      break;
      case 'newPassword': 
      errors.newPassword = 
      value.length < 8
      ? 'Name must be 8 characters long!'
      : '';
      setNewPassword(value);
      break;
      case 'confirmPassword': 
      errors.confirmPassword = 
      value.length < 8
      ? 'phone must be 8 characters long!'
      : '';
      setConfirmPassword(value);
      break;
      default:
      break;
    }

    setErrors(errors);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if(validateForm(errors)) {
      const query = {
        oldPassword:oldPassword,
        newPassword:newPassword,
        confirmPassword:confirmPassword,
      }
      let user_id = user.id;
      axios.post('/api/change-password/'+user.id,query).then(res=>
      { 

        if (res.data.success === true) {
          setIsUpdated(true);
          setSuccess(res.data.message);
          window.scrollTo(0, 0);
        }else{
          setError(res.data.message);
        }
        
      }
      ).catch(error => {if (error.response) {
        // The request was made and the server responded with a status code that falls out of the range of 2xx
        let err = error.response.data;
        setError(err.message);
        setErrorMessage(err.errors);
      }
      else if (error.request) {
        // The request was made but no response was received `error.request` is an instance of XMLHttpRequest in the browser and an instance of http.ClientRequest in node.js
        let err = error.request;
        setError(err.message);
        setErrorMessage(err.errors);
      } else {
       // Something happened in setting up the request that triggered an Error
       let err = error.message;
       setError(err.message);
       setErrorMessage(err.errors);
     }
   }).finally(setError(''));
    }else{
      console.error('Invalid Form')
      return false;
    }
  }  

  return (

    

    <div className="information-page">
        <h3>Change Password </h3>
        <div className="informationform">

            {success ? <FlashMessage duration={10000} persistOnHover={true}>
                <h5 className={"alert alert-danger"}>success: {success}</h5></FlashMessage> : ''}


                {error ? <FlashMessage duration={10000} persistOnHover={true}>
                    <h5 className={"alert alert-danger"}>Error: {error}</h5></FlashMessage> : ''}

                    <form>
                        <h4>Current Password :</h4>
                        <div className="row">
                            <div className="form-group col-sm-4">
                                <input type="password" onChange={handleChange} name="oldPassword" value={oldPassword} placeholder="Enter Current Password" className="form-control" />
                                <div className="errorMsg">{errors.oldPassword}</div>
                            </div>
                        </div>
                        <div className="emailaddress">
                            <h4>New Password :</h4>
                            <div className="row">
                                <div className="form-group col-sm-4">
                                    <input type="password" onChange={handleChange} name="newPassword" value={newPassword} placeholder="Enter New Password" className="form-control" />
                                    <div className="errorMsg">{errors.newPassword}</div>
                                </div>
                            </div>
                        </div>
                        <div className="phone">
                            <h4>Confirm Password :</h4>
                            <div className="row">
                                <div className="form-group col-sm-4">
                                    <input type="password" onChange={handleChange} name="confirmPassword" value={confirmPassword} placeholder="Enter Confirm Password" className="form-control" />
                                    <div className="errorMsg">{errors.confirmPassword}</div>
                                </div>
                            </div>
                        </div>
                        <div className="form-group col-sm-4">
                            <a onClick={handleSubmit} className="btn btn-primary">Save</a>
                        </div>
                    </form>
                </div>
            </div>
            
    );
  }

  export default ChangePassword