import React from 'react';
import ReactDOM from 'react-dom';
import { useHistory, useLocation } from 'react-router-dom'

import { useState, useEffect } from 'react'
import {BrowserRouter as Router, Link, Route, Redirect} from 'react-router-dom';



const validEmailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);

function Profile() {

  const [user, setUser] = useState(false);
  const [name, setName] = useState(false);
  const [email, setEmail] = useState(false);
  const [phone, setPhone] = useState(false);
  const [profileData, setProfileData] = useState({});
  const [isUpdated, setIsUpdated] = useState(false);
  const [errors, setErrors] = useState({});

  const [readonlyName, setReadonlyName] = useState(true);
  const [readonlyEmail, setReadonlyEmail] = useState(true);
  const [readonlyPhone, setReadonlyPhone] = useState(true);

  const [genderValue, setGenderValue] = useState('');

  const history = useHistory()

  useEffect(() => {
    let stateqq = localStorage["appState"];
    if (stateqq) {
      let AppState = JSON.parse(stateqq);
      setUser(AppState.user);
      setName(AppState.user.name);
      setEmail(AppState.user.email);
      setGenderValue(AppState.user.gender);
      setPhone(AppState.user.phone);
      if (AppState.isLoggedIn == false) {
        history.push('/login');
      }

      axios('/api/users/getCustomerProfile/'+AppState.user.id).then(result=>{
        setProfileData(result.data.data);
      });

    }   

  },[]); 


  const fileSelect = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    const field_name = event.target.name;
    setProfileData({...profileData, name : event.target.files[0]});

    var bodyFormData = new FormData();
    bodyFormData.append('name', field_name);
    bodyFormData.append('user_id', user.id);
    bodyFormData.append(name, event.target.files[0]);
    axios({
    method: 'post',
    url: '/api/users/insertImages',
    data: bodyFormData,
    config: { headers: {'Content-Type': 'multipart/form-data' }}
    })
    .then(function (response) {
        const query = {
          name : field_name,
          image:response.data
        }
        axios.post('/api/users/updateCustomerProfile/'+user.id,query).then(result=>
        {
          setProfileData({...profileData, 'profile' : result.data});
        });
    })
    .catch(function (response) {
        console.log(response);
    });

    }

  const handleGenderChange = (event) => {
    setGenderValue(event.target.value);

    let user_id = user.id;
    const query = {
      gender:event.target.value
    }
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
      window.scrollTo(0, 0);
    });

  }

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

        // window.location.reload(false);

        // this.props.history.push("/admin/profile/edit");

        // window.location.reload(false);
      }
      );
    }else{
      console.error('Invalid Form')
    }
  }

  return (

    <div className="information-page">

    { isUpdated ? <div className="alert alert-success alert-solid" role="alert">
    <strong>Well done!</strong> Profile Updated sucessfully!.
    </div> : ''}

    <h3>Personal Information <a onClick={() => setReadonlyName(false)} >Edit</a></h3>
    <div className="informationform">
    <form>
    <div className="row">
    <div className="form-group col-sm-4">
    <input type="text" name="name" value={name} onChange={handleChange} placeholder="Enter Full Name" className="form-control" readOnly = {readonlyName}/>
    <div className="errorMsg">{errors.name}</div>
    </div>
    {!readonlyName ?
      <div className="form-group col-sm-4">
      <a onClick={handleSubmit} className="btn btn-primary">Save</a>
      </div>
      : ''}

      </div>
      <div className="form-group">
      <label htmlFor="gender">Your Gender</label>
      <div className="row">
      <div className="form-check col-sm-2">
      <input type="radio" name="gender" value="Male" checked={genderValue == "Male"} onChange={handleGenderChange} />
      <label className="form-check-label" htmlFor="gender1">
      Male
      </label>
      </div>
      <div className="form-check col-sm-2">
      <input type="radio" name="gender" value="Female" checked={genderValue =="Female"} onChange={handleGenderChange} />
      <label className="form-check-label" htmlFor="gender2">
      Female
      </label>
      </div>
      </div>
      </div>
      <div className="emailaddress">
      <h3>Email Address <a onClick={() => setReadonlyEmail(false)}>Edit</a> <a onClick={() => handleClick()} className="change">Change Password</a></h3>
      <div className="row">
      <div className="form-group col-sm-4">
      <input type="text" name="email" value={email} onChange={handleChange} readOnly={readonlyEmail} placeholder="Enter Email" className="form-control" />
      <div className="errorMsg">{errors.email}</div>
      </div>
      {!readonlyEmail ?
        <div className="form-group col-sm-4">
        <a onClick={handleSubmit} className="btn btn-primary">Save</a>
        </div>
        : ''}
        </div>
        </div>
        <div className="phone">
        <h3>Mobile Number <a onClick={() => setReadonlyPhone(false)}>Edit</a></h3>
        <div className="row">
        <div className="form-group col-sm-4">
        <input type="text" name="phone" value={phone} onChange={handleChange} readOnly={readonlyPhone} placeholder="Enter Phone" className="form-control" />
        <div className="errorMsg">{errors.phone}</div>
        </div>
        {!readonlyPhone ?
          <div className="form-group col-sm-4">
          <a onClick={handleSubmit} className="btn btn-primary">Save</a>
          </div>
          : ''}
          </div>
          </div>

          <div className="row">
                  <div className="form-group col-md-3">
                    <div className="uploadprofile">
                      <label htmlFor="inputname3" className="col-form-label">Upload Profile Photo</label>
                      <div className="upload-field2">
                        <input type="text" className="form-control" />
                        <ul className="list-inline upload-icon2">
                          <li>
                            <a href="#" title="">
                              <div className="file-upload1">
                                <input type="file" name="profile" title={profileData.profile} onChange={fileSelect} />{profileData.profile ? <img style={{marginLeft: '1px'}} src={'/uploads/users/'+user.id+'/profile/medium-'+profileData.profile}></img> : <i className="fa fa-cloud-upload" /> }
                              </div>
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

          </form>
          </div>
          </div>
          );
}

export default Profile