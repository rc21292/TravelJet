import React from 'react';
import ReactDOM from 'react-dom';
import { useHistory, useLocation } from 'react-router-dom'

import { useState, useEffect } from 'react'
import {BrowserRouter as Router, Link, Route, Redirect} from 'react-router-dom';



const validEmailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);

function Profile() {


    const initialProfileState = {
    user_id: null,
    name:"",
    father_name:"",
    about:"",
    profile:"",
    email:"",
    mobile:"",
    address:"",
    pincode:"",
    city:"",
    state:"",
    country:"",
    alt_number:"",
    dob:"",
    birth_place:"",
    marital_state:"",
    category:"",
    password:"",
    passport_size_photo:"",
    signature_photo:"",
    aadhar_front_photo:"",
    aadhar_back_photo:"",
    driving_license_front_photo:"",
    driving_license_back_photo:"",
    pancard_photo:"",
    passport_front_photo:"",
    passport_back_photo:"",
    business_type:"",
    company:"",
    website:"",
    cinno_photo:"",
    company_pancard_photo:"",
    office_address_proof_photo:"",
    gstno_photo:"",
    business_description:"",
    beneficiary_name:"",
    branch_ifsc_code:"",
    account_number:"",
    confirm_account_number:"",
    paytm_number:"",
  };


  const [profileData, setProfileData] = useState(initialProfileState);
  const [user, setUser] = useState(false);
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
      setProfileData({...profileData, user_id: AppState.user.id,name: AppState.user.name,email: AppState.user.email,phone: AppState.user.phone});
      axios('/api/users/getAgentProfile/'+AppState.user.id).then(result=>{
        setProfileData(result.data);
      });
      if (AppState.isLoggedIn == false) {
        history.push('/login');
      }
    }   

  },[]); 

  const handleChange = (event) => {
    const { name, value } = event.target;
   setProfileData({...profileData, [name]:value})
  }

  const saveProfile = (event) => {
    event.preventDefault();
    var query = profileData;
    axios.post('/api/users/saveAgentProfile/'+user.id,query).then(res=>
    {
      window.location.reload(false);
    });
  }


  const fileSelect = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setProfileData({...profileData, proile : event.target.files[0]});

    const fd = new FormData();
    fd.append('image', event.target.files[0], event.target.files[0].name);
    axios.post('http://13.235.238.138/api/users/insertImages/', fd
      ).then(res=>
      {
        console.log(res);
        const query = {
          avtar:res.data
        }
        axios.post('http://13.235.238.138/api/users/updateAgentProfile/'+user.id,query).then(result=>
        {
          setProfileData({...profileData, proile : result.data});
        });
      });
    }

  return (

         <div className="venderprofile">
        {/* Page Heading */}
        <div className="row">
          <div className="col-sm-6">
            <h1>Profile Information</h1>
          </div>
        </div>
        <div className="venderprofilepage">
          <div className="generaldetail">
            <form>
              <div className="generaldetail informationform">
                <h3>General Details</h3>
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label htmlFor="inputnmae3" className="col-form-label">Your Name</label>
                    <input type="text" className="form-control" onChange={handleChange} name="name" value={profileData.name} placeholder="Your Name" />
                  </div>
                  <div className="form-group col-md-6">
                    <label htmlFor="inputname3" className="col-form-label">Father Name</label>
                    <input type="text" className="form-control" onChange={handleChange} name="father_name" value={profileData.father_name} placeholder="Father Name" />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label htmlFor="inputname3" className="col-form-label">Email</label>
                    <input type="text" className="form-control" onChange={handleChange} name="email" value={profileData.email} placeholder="Email" />
                  </div>
                  <div className="form-group col-md-6">
                    <label htmlFor="inputname3" className="col-form-label">Mobile Number</label>
                    <input type="number" className="form-control" onChange={handleChange} name="phone" value={profileData.phone} placeholder="Mobile Number" />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col-md-12">
                    <label htmlFor="inputname3" className="col-form-label">Address</label>
                    <textarea onChange={handleChange} name="address" rows={4} cols={50} placeholder="Address" className="form-control" onChange={handleChange} name="address" value={profileData.address} />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col-md-3">
                    <div className="uploadprofile">
                      <label htmlFor="inputname3" className="col-form-label">Upload Profile Photo</label>
                      <div className="upload-field2">
                        <input type="text" className="form-control" />
                        <ul className="list-inline upload-icon2">
                          <li>
                            <a href="#" title>
                              <div className="file-upload1">
                                <input type="file" onChange={fileSelect} /><i className="fa fa-cloud-upload" />
                              </div>
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="form-group col-md-9">
                    <label htmlFor="inputname3" className="col-form-label">About us</label>
                    <textarea onChange={handleChange} name="about" value={profileData.about} rows={4} cols={50} placeholder="About us" className="form-control" defaultValue={""} />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label htmlFor="inputname3" className="col-form-label">Pincode</label>
                    <input type="text" className="form-control" onChange={handleChange} name="pincode" value={profileData.pincode} placeholder="Pincode" />
                  </div>
                  <div className="form-group col-md-6">
                    <label htmlFor="inputname3" className="col-form-label">City</label>
                    <input type="text" className="form-control" onChange={handleChange} name="city" value={profileData.city} placeholder="City" />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label htmlFor="inputState">State</label>
                    <select onChange={handleChange} name="state"  value={profileData.state} className="form-control">
                      <option>Select State</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                    </select>
                  </div>
                  <div className="form-group col-md-6">
                    <label htmlFor="inputState">Country</label>
                    <select onChange={handleChange} name="country"  value={profileData.country} className="form-control">
                      <option>Select Country</option>
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                    </select>
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label htmlFor="inputname3" className="col-form-label">Alternate Number</label>
                    <input type="text" className="form-control" onChange={handleChange} name="alt_number" value={profileData.alt_number} placeholder="Alternate Number" />
                  </div>
                  <div className="form-group col-md-6">
                    <label htmlFor="inputname3" className="col-form-label">Date of Birth</label>
                    <input type="date" className="form-control" onChange={handleChange} name="dob" value={profileData.dob} placeholder="Date of Birth" />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label htmlFor="inputname3" className="col-form-label">Town of Birth</label>
                    <input type="text" className="form-control" onChange={handleChange} name="birth_place" value={profileData.birth_place} placeholder="Town of Birth" />
                  </div>
                  <div className="form-group col-md-6">
                    <label htmlFor="inputState">Marital Status</label>
                    <select onChange={handleChange} name="marital_state"  value={profileData.marital_state} className="form-control">
                      <option>Select Marital Status</option>
                      <option value="married" >Maired</option>
                      <option value="unmarried">Single</option>
                      <option>Other</option>
                    </select>
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label htmlFor="inputState">Category</label>
                    <select onChange={handleChange} name="category"  value={profileData.category} className="form-control">
                      <option>Select Category</option>
                      <option onChange={handleChange} name="1">1</option>
                      <option onChange={handleChange} name="2">2</option>
                      <option onChange={handleChange} name="3">3</option>
                    </select>
                  </div>
                  <div className="form-group col-md-6">
                    <label htmlFor="inputname3" className="col-form-label">Password</label>
                    <input readOnly type="password" onChange={handleChange} name="password" value={profileData.password} className="form-control" placeholder="Password" />
                  </div>
                </div>
              </div>
              <div className="clearfix" />
              <div className="personalkyc">
                <h3>Personal KYC (ID Proof Details)</h3>
                <div className="col-sm-12">
                  <div className="row">
                    <div className="col-sm-5">
                      <div className="row">
                        <div className="col-md-6">
                          <label htmlFor="inputname3" className="col-form-label">Passport Photo</label>
                          <div className="upload-field2">
                            <input type="text" onChange={handleChange} name="passport_size_photo" className="form-control" />
                            <ul className="list-inline upload-icon2">
                              <li>
                                <a href="#">
                                  <div className="file-upload1">
                                    <input type="file" onChange={handleChange} name="" /><i className="fa fa-cloud-upload" />
                                  </div>
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <label htmlFor="inputname3" className="col-form-label">Upload Signature</label>
                          <div className="upload-field2">
                            <input type="text" onChange={handleChange} name="signature_photo" className="form-control" />
                            <ul className="list-inline upload-icon2">
                              <li>
                                <a href="#">
                                  <div className="file-upload1">
                                    <input type="file" onChange={handleChange} name="" /><i className="fa fa-cloud-upload" />
                                  </div>
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-7">
                      <div className="row">
                        <div className="col-md-12">
                          <div className="row">
                            <div className="col-md-6">
                              <label htmlFor="inputname3" className="col-form-label">Upload Aadhaar Card</label>
                              <div className="row">
                                <div className="col-md-6">
                                  <div className="upload-field">
                                    <input type="text" className="form-control" onChange={handleChange} name="aadhar_front_photo" placeholder="Front" />
                                    <ul className="list-inline upload-icon">
                                      <li>
                                        <a href="#">
                                          <div className="file-upload1">
                                            <input type="file" onChange={handleChange} name="" />
                                          </div>
                                        </a>
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                                <div className="col-md-6">
                                  <div className="upload-field">
                                    <input type="text" className="form-control" onChange={handleChange} name="aadhar_back_photo" placeholder="Back" />
                                    <ul className="list-inline upload-icon">
                                      <li>
                                        <a href="#">
                                          <div className="file-upload1">
                                            <input type="file" onChange={handleChange} name="" />
                                          </div>
                                        </a>
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="col-md-6">
                              <label htmlFor="inputname3" className="col-form-label">Upload Driving License</label>
                              <div className="row">
                                <div className="col-md-6">
                                  <div className="upload-field">
                                    <input type="text" className="form-control" onChange={handleChange} name="driving_license_front_photo" placeholder="Front" />
                                    <ul className="list-inline upload-icon">
                                      <li>
                                        <a href="#">
                                          <div className="file-upload1">
                                            <input type="file" onChange={handleChange} name="" />
                                          </div>
                                        </a>
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                                <div className="col-md-6">
                                  <div className="upload-field">
                                    <input type="text" className="form-control" onChange={handleChange} name="driving_license_back_photo" placeholder="Back" />
                                    <ul className="list-inline upload-icon">
                                      <li>
                                        <a href="#">
                                          <div className="file-upload1">
                                            <input type="file" onChange={handleChange} name="" />
                                          </div>
                                        </a>
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row pancard">
                        <div className="col-md-6">
                          <label htmlFor="inputname3" className="col-form-label">Upload Pan Card</label>
                          <div className="row">
                            <div className="col-md-12">
                              <div className="upload-field5">
                                <input type="text" className="form-control" onChange={handleChange} name="pancard_photo" placeholder="Upload Pan Card" />
                                <ul className="list-inline upload-icon">
                                  <li>
                                    <a href="#">
                                      <div className="file-upload6">
                                        <input type="file" onChange={handleChange} name="" />
                                      </div>
                                    </a>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <label htmlFor="inputname3" className="col-form-label">Upload Passport (Optional)</label>
                          <div className="row">
                            <div className="col-md-6">
                              <div className="upload-field">
                                <input type="text" className="form-control" onChange={handleChange} name="passport_front_photo" placeholder="Front" />
                                <ul className="list-inline upload-icon">
                                  <li>
                                    <a href="#">
                                      <div className="file-upload1">
                                        <input type="file" onChange={handleChange} name="" />
                                      </div>
                                    </a>
                                  </li>
                                </ul>
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="upload-field">
                                <input type="text" className="form-control" onChange={handleChange} name="passport_back_photo" placeholder="Back" />
                                <ul className="list-inline upload-icon">
                                  <li>
                                    <a href="#">
                                      <div className="file-upload1">
                                        <input type="file" onChange={handleChange} name="" />
                                      </div>
                                    </a>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="clearfix" />
              <div className="generaldetail informationform">
                <h3>Business KYC (Office Details)</h3>
                <div className="form-group">
                  <div className="row">
                    <label className="col-form-label col-sm-4 pt-0">Please Select your business type:</label>
                    <div className="col-sm-3">
                      <select onChange={handleChange} name="business_type"  value={profileData.business_type} className="form-control">
                        <option>Select Business</option>
                        <option value="individual">Individual</option>
                        <option value="company">Company</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label htmlFor="inputname3" className="col-form-label">Company Name</label>
                    <input type="text" className="form-control" onChange={handleChange} name="company" value={profileData.company} placeholder="Company Name" />
                  </div>
                  <div className="form-group col-md-6">
                    <label htmlFor="inputname3" className="col-form-label">Website (Optional)</label>
                    <input type="text" className="form-control" onChange={handleChange} name="website" value={profileData.website} placeholder="Website (Optional)" />
                  </div>
                </div>
                <div className="col-sm-12">
                  <div className="row">
                    <div className="col-md-3">
                      <label htmlFor="inputname3" className="col-form-label">CIN Number if PVT LTD</label>
                      <div className="upload-field4">
                        <input type="text" className="form-control" onChange={handleChange} name="cinno_photo" placeholder="Upload COI" />
                        <ul className="list-inline upload-icon">
                          <li>
                            <a href="#">
                              <div className="file-upload3">
                                <input type="file" onChange={handleChange} name="" />
                              </div>
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="col-md-3">
                      <label htmlFor="inputname3" className="col-form-label">Company Pan Card</label>
                      <div className="upload-field4">
                        <input type="text" className="form-control" onChange={handleChange} name="company_pancard_photo" placeholder="Upload Company Pan" />
                        <ul className="list-inline upload-icon">
                          <li>
                            <a href="#">
                              <div className="file-upload3">
                                <input type="file" onChange={handleChange} name="" />
                              </div>
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="col-md-3">
                      <label htmlFor="inputname3" className="col-form-label">Office address proof</label>
                      <div className="upload-field4">
                        <input type="text" className="form-control" onChange={handleChange} name="office_address_proof_photo" placeholder="Upload Office Address Proof" />
                        <ul className="list-inline upload-icon">
                          <li>
                            <a href="#">
                              <div className="file-upload3">
                                <input type="file" onChange={handleChange} name="" />
                              </div>
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="col-md-3">
                      <label htmlFor="inputname3" className="col-form-label">GST Number (Optional)</label>
                      <div className="upload-field4">
                        <input type="text" className="form-control" onChange={handleChange} name="gstno_photo" value={profileData.gstno_photo} placeholder="Upload GST Certificate" />
                        <ul className="list-inline upload-icon">
                          <li>
                            <a href="#">
                              <div className="file-upload3">
                                <input type="file" onChange={handleChange} name="" />
                              </div>
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="col-sm-12">
                      <label htmlFor="inputname3" className="col-form-label">About your Business</label>
                      <textarea onChange={handleChange} name="w3review" rows={4} cols={50} onChange={handleChange} value={profileData.business_description} name="business_description" placeholder="About your Business..." className="form-control" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="clearfix" />
              <div className="generaldetail2 bankdetail informationform">
                <h3>Bank Details</h3>
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label htmlFor="inputname3" className="col-form-label">Beneficiary Name</label>
                    <input type="text" className="form-control" onChange={handleChange} name="beneficiary_name" value={profileData.beneficiary_name} placeholder="Beneficiary Name" />
                  </div>
                  <div className="form-group col-md-6">
                    <label htmlFor="inputname3" className="col-form-label">Branch IFSC Code</label>
                    <input type="text" className="form-control" onChange={handleChange} name="branch_ifsc_code" value={profileData.branch_ifsc_code} placeholder="Branch IFSC Code" />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label htmlFor="inputname3" className="col-form-label">Account Number</label>
                    <input type="text" className="form-control" onChange={handleChange} name="account_number" value={profileData.account_number} placeholder="Account Number" />
                  </div>
                  <div className="form-group col-md-6">
                    <label htmlFor="inputname3" className="col-form-label">Re Enter Account Number</label>
                    <input type="text" className="form-control" onChange={handleChange} name="confirm_account_number" value={profileData.confirm_account_number} placeholder="Re Enter Account Number" />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label htmlFor="inputname3" className="col-form-label">Paytm (If Any)</label>
                    <input type="text" className="form-control" onChange={handleChange} name="paytm_number" value={profileData.paytm_number} placeholder="Paytm (If Any)" />
                  </div>
                </div>
              </div>
              <div className="form-group row">
                <div className="col-sm-10 text-center"> <a onClick={saveProfile} className="btn btn-primary">Save</a>
                </div>
              </div>
            </form>
          </div>
          {/*Edit Form*/}
        </div>
      </div>

    );
}

export default Profile