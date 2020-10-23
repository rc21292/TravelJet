import React, { Component } from 'react';
import {BrowserRouter as Router, Link, Route, Redirect} from 'react-router-dom';

import axios from 'axios';
import Pagination from "react-js-pagination";


import { useHistory, useLocation } from 'react-router-dom'

import { useState, useEffect } from 'react'

import FlashMessage from 'react-flash-message'


export default function Address() {

 const [user, setUser] = useState(false);

  const [isUpdated, setIsUpdated] = useState('');
  const [errors, setErrors] = useState('');


const [name, setName ] = useState('');
const [addresses, setAddresses ] = useState([]);
const [mobile, setMobile ] = useState('');
const [pincode, setPincode ] = useState('');
const [locality, setLocality ] = useState('');
const [address, setAddress ] = useState('');
const [city, setCity ] = useState('');
const [state, setState ] = useState('');
const [landmark, setLandmark ] = useState('');
const [alternate_phone, setAlternate_phone ] = useState('');
const [address_type, setAddress_type ] = useState('Home');


  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');


  const history = useHistory()

  useEffect(() => {
    let stateqq = localStorage["appState"];
    if (stateqq) {
      let AppState = JSON.parse(stateqq);
      setUser(AppState.user);
      if (AppState.isLoggedIn == false) {
        history.push('/login');
      }

      axios.get('/api/getAddresses/'+AppState.user.id)
      .then(response=>{
        setAddresses(response.data.addresses);
      });

    }   

  },[]); 

  const validateForm = () => {

    let errors = {};
    let formIsValid = true;

    if (!name) {
      formIsValid = false;
      errors["name"] = "field is Required!";
    }

     if (!mobile) {
      formIsValid = false;
      errors["mobile"] = "field is Required!";
    }

     if (!pincode) {
      formIsValid = false;
      errors["pincode"] = "field is Required!";
    }

     if (!locality) {
      formIsValid = false;
      errors["locality"] = "field is Required!";
    }
     if (!name) {
      formIsValid = false;
      errors["name"] = "field is Required!";
    }
     if (!address) {
      formIsValid = false;
      errors["address"] = "field is Required!";
    }
     if (!city) {
      formIsValid = false;
      errors["city"] = "field is Required!";
    }
     if (!state) {
      formIsValid = false;
      errors["state"] = "field is Required!";
    }
    /* if (!landmark) {
      formIsValid = false;
      errors["landmark"] = "field is Required!";
    }
     if (!alternate_phone) {
      formIsValid = false;
      errors["alternate_phone"] = "field is Required!";
    }*/
    //  if (!address_type) {
    //   formIsValid = false;
    //   errors["address_type"] = "field is Required!";
    // }

    setErrors(errors);
    return formIsValid;
  }

  const handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    let errors = {};

    switch (name) {
      case 'name': 
      errors.name = 
      value.length < 1
      ? 'field is Required!'
      : '';
      setName(value);
      break;

      case 'mobile': 
      errors.mobile = 
      value.length < 1
      ? 'field is Required!'
      : '';
      setMobile(value);
      break;

      case 'pincode': 
      errors.pincode = 
      value.length < 1
      ? 'field is Required!'
      : '';
      setPincode(value);
      break;

      case 'locality': 
      errors.locality = 
      value.length < 1
      ? 'field is Required!'
      : '';
      setLocality(value);
      break;

      case 'address': 
      errors.address = 
      value.length < 1
      ? 'field is Required!'
      : '';
      setAddress(value);
      break;


      case 'city': 
      errors.city = 
      value.length < 1
      ? 'field is Required!'
      : '';
      setCity(value);
      break;

      case 'state': 
      errors.state = 
      value.length < 1
      ? 'field is Required!'
      : '';
      setState(value);
      break;

      case 'landmark': 
      setLandmark(value);
      break;

      case 'alternate_phone': 
      setAlternate_phone(value);
      break;

      case 'address_type': 
      setAddress_type(value);
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
        name:name,
        user_id:user.id,
        mobile:mobile,
        pincode:pincode,
        locality:locality,
        address:address,
        city:city,
        state:state,
        landmark:landmark,
        alternate_phone:alternate_phone,
        address_type:address_type,
      }
      let user_id = user.id;
      axios.post('/api/save_address/'+user.id,query).then(res=>
      { 
        if (res.data.success === true) {
          setIsUpdated(true);
          setSuccess(res.data.message);
          setAddresses(res.data.addresses);
          setName('');
          setMobile('');
          setPincode('');
          setLocality('');
          setAddress('');
          setCity('');
          setState('');
          setLandmark('');
          setAlternate_phone('');
          setAddress_type('');
          window.scrollTo(0, 0);
        }else{
          setError(res.data.message);
        } 
      })
    }else{
      console.error('Invalid Form')
      return false;
    }
  }  


		return (
      <div className="manageaddress-page">

      {success ? <FlashMessage duration={10000} persistOnHover={true}>
      <h5 className={"alert alert-success"}>Success: {success}</h5></FlashMessage> : ''}

      {error ? <FlashMessage duration={10000} persistOnHover={true}>
      <h5 className={"alert alert-danger"}>Error: {error}</h5></FlashMessage> : ''}

        <h1>Manage Addresses</h1>
        <div className="customer-detail" id="test">
          <div className="panel panel-default test" style={{display: 'block'}}>
            <div className="panel-heading"><i className="fa fa-plus" /> ADD NEW ADDRESS</div>
          </div>
          <form className="newaddress forminput" style={{display: 'none'}}>
            <div className="heading">ADD NEW ADDRESS</div>
            <div className="row">
              <div className="form-group col-sm-4">
                <input type="text" onChange={handleChange} name="name" value={name} placeholder="Enter Name"  className="form-control" />
                <div style={{color:'red'}}>{errors.name}</div>
              </div>
              <div className="form-group col-sm-4">
                <input type="number" onChange={handleChange} name="mobile" placeholder="10-digit mobile number" value={mobile} className="form-control" />
                <div style={{color:'red'}}>{errors.mobile}</div>
              </div>
            </div>
            <div className="row">
              <div className="form-group col-sm-4">
                <input type="number" onChange={handleChange} name="pincode" value={pincode} placeholder="Pincode" className="form-control" />
                <div style={{color:'red'}}>{errors.pincode}</div>
              </div>
              <div className="form-group col-sm-4">
                <input type="text" onChange={handleChange} name="locality" value={locality} placeholder="Locality" className="form-control" />
                <div style={{color:'red'}}>{errors.locality}</div>
              </div>
            </div>
            <div className="row">
              <div className="form-group col-sm-8">
                <textarea onChange={handleChange} name="address" rows={4} cols={50} placeholder="Address (Area and Street)" className="form-control"  value={address}/>
                <div style={{color:'red'}}>{errors.address}</div>
              </div>
            </div>
            <div className="row">
              <div className="form-group col-sm-4">
                <input type="text" onChange={handleChange} name="city" value={city} placeholder="City / District / Town" className="form-control" />
                <div style={{color:'red'}}>{errors.city}</div>
              </div>
              <div className="form-group col-sm-4">
                <select className="custom-select form-control" onChange={handleChange} name="state" value={state} id="inputGroupSelect01">
                  <option value="Andhra Pradesh">Pick a state...</option>
                  <option value="Andhra Pradesh">Andhra Pradesh</option>
                  <option value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</option>
                  <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                  <option value="Assam">Assam</option>
                  <option value="Bihar">Bihar</option>
                  <option value="Chandigarh">Chandigarh</option>
                  <option value="Chhattisgarh">Chhattisgarh</option>
                  <option value="Dadar and Nagar Haveli">Dadar and Nagar Haveli</option>
                  <option value="Daman and Diu">Daman and Diu</option>
                  <option value="Delhi NCR">Delhi NCR</option>
                  <option value="Lakshadweep">Lakshadweep</option>
                  <option value="Puducherry">Puducherry</option>
                  <option value="Goa">Goa</option>
                  <option value="Gujarat">Gujarat</option>
                  <option value="Haryana">Haryana</option>
                  <option value="Himachal Pradesh">Himachal Pradesh</option>
                  <option value="Jammu and Kashmir">Jammu and Kashmir</option>
                  <option value="Jharkhand">Jharkhand</option>
                  <option value="Karnataka">Karnataka</option>
                  <option value="Kerala">Kerala</option>
                  <option value="Madhya Pradesh">Madhya Pradesh</option>
                  <option value="Maharashtra">Maharashtra</option>
                  <option value="Manipur">Manipur</option>
                  <option value="Meghalaya">Meghalaya</option>
                  <option value="Mizoram">Mizoram</option>
                  <option value="Nagaland">Nagaland</option>
                  <option value="Odisha">Odisha</option>
                  <option value="Punjab">Punjab</option>
                  <option value="Rajasthan">Rajasthan</option>
                  <option value="Sikkim">Sikkim</option>
                  <option value="Tamil Nadu">Tamil Nadu</option>
                  <option value="Telangana">Telangana</option>
                  <option value="Tripura">Tripura</option>
                  <option value="Uttar Pradesh">Uttar Pradesh</option>
                  <option value="Uttarakhand">Uttarakhand</option>
                  <option value="West Bengal">West Bengal</option>
                </select>
                <div style={{color:'red'}}>{errors.state}</div>
              </div>
            </div>
            <div className="row">
              <div className="form-group col-sm-4">
                <input type="text" onChange={handleChange} name="landmark" value={landmark} placeholder="Landmark (Optional)" className="form-control" />
              </div>
              <div className="form-group col-sm-4">
                <input type="number" onChange={handleChange} name="alternate_phone" value={alternate_phone} placeholder="Alternate Phone (Optional)" className="form-control" />
              </div>
            </div>
            <div className="addresstype">
              <div className="row">
                <div className="col-sm-12">
                  <div className="addtype">
                    Address Type
                  </div>
                </div>
                <div className="col-sm-2">
                  <div className="form-check">
                    <input className="form-check-input" type="radio" onChange={handleChange} name="address_type" value="Home" id="exampleRadios1" selected={true} />
                    <label className="form-check-label" htmlFor="exampleRadios1">
                      Home
                    </label>
                  </div>
                </div>
                <div className="col-sm-2">
                  <div className="form-check">
                    <input className="form-check-input" type="radio" onChange={handleChange} name="address_type" value="Work" id="exampleRadios2" />
                    <label className="form-check-label" htmlFor="exampleRadios2">
                      Work
                    </label>
                  </div>
                    <div style={{color:'red'}}>{errors.address_type}</div>
                </div>
                <div className="col-sm-2">
                  <div className="form-group">
                    <a onClick={handleSubmit} className="btn btn-primary">Save</a>
                  </div>
                </div>
                <div className="col-sm-2">
                  <div className="form-group">
                    <div id="close-address">Cancel</div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
         {  
          addresses.map((query, idx) => {  
          return  <div className="customerinfo" key={idx}>
            <table className="table">
              <tbody>
                <tr>
                  <td><span>{query.address_type}</span></td>
                </tr>
                <tr>
                  <td className="namewith">{query.name}</td>
                  <td>{query.mobile}</td>
                </tr>
                <tr>
                  <td>{query.landmark}, {query.locality}, {query.address}, {query.city}, {query.state} - {query.pincode}</td>
                </tr>
              </tbody>
            </table>
          </div>
        })}         
      </div>
		);
	}