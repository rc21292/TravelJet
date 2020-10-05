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

  const handleClick = () => {  
    history.push('/agent/change-password')   
  };  

  const saveProfile = (event) => {
    event.preventDefault();
    var data = new FormData();
    Object.keys(profileData).map(function(keyName) {
      data.append(keyName,profileData[keyName]);
    });
    axios({
      method: 'post',
      url: '/api/users/saveAgentProfile/'+user.id,
      data: data,
      config: { headers: {'Content-Type': 'multipart/form-data' }}
    }).then(res=>
    {
     window.location.reload(false);
   });
  }

  const fileChange = (event) => {
     event.preventDefault();
    const { name, value } = event.target;
    setProfileData({...profileData, [name] : event.target.files[0]});
  }

  console.log(profileData);

  const fileSelect = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setProfileData({...profileData, proile : event.target.files[0]});

     var bodyFormData = new FormData();
    bodyFormData.append('image', event.target.files[0]);
    axios({
    method: 'post',
    url: '/api/users/insertImages',
    data: bodyFormData,
    config: { headers: {'Content-Type': 'multipart/form-data' }}
    })
    .then(function (response) {
        const query = {
          avtar:response.data
        }
        axios.post('/api/users/updateAgentProfile/'+user.id,query).then(result=>
        {
          setProfileData({...profileData, proile : result.data});
        });
    })
    .catch(function (response) {
        console.log(response);
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
                    <input type="text" className="form-control" onChange={handleChange} name="name" value={(profileData.name == 'null' ? '' : profileData.name)} placeholder="Your Name" />
                  </div>
                  <div className="form-group col-md-6">
                    <label htmlFor="inputname3" className="col-form-label">Father Name</label>
                    <input type="text" className="form-control" onChange={handleChange} name="father_name" value={(profileData.father_name == 'null' ? '' : profileData.father_name)} placeholder="Father Name" />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label htmlFor="inputname3" className="col-form-label">Email</label>
                    <input type="text" className="form-control" onChange={handleChange} name="email" value={(profileData.email == 'null' ? '' : profileData.email)} placeholder="Email" />
                  </div>
                  <div className="form-group col-md-6">
                    <label htmlFor="inputname3" className="col-form-label">Mobile Number</label>
                    <input type="number" className="form-control" onChange={handleChange} name="phone" value={(profileData.phone == 'null' ? '' : profileData.phone)} placeholder="Mobile Number" />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col-md-12">
                    <label htmlFor="inputname3" className="col-form-label">Address</label>
                    <textarea onChange={handleChange} name="address" rows={4} cols={50} placeholder="Address" className="form-control" onChange={handleChange} name="address" value={(profileData.address == 'null' ? '' : profileData.address)} />
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
                            <a href="#" title="">
                              <div className="file-upload1">
                                <input type="file" title={profileData.profile} onChange={fileSelect} /><i className="fa fa-cloud-upload" />
                              </div>
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="form-group col-md-9">
                    <label htmlFor="inputname3" className="col-form-label">About us</label>
                    <textarea onChange={handleChange} name="about" value={(profileData.about == 'null' ? '' : profileData.about)} rows={4} cols={50} placeholder="About us" className="form-control" />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label htmlFor="inputname3" className="col-form-label">Pincode</label>
                    <input type="text" className="form-control" onChange={handleChange} name="pincode" value={(profileData.pincode == 'null' ? '' : profileData.pincode)} placeholder="Pincode" />
                  </div>
                  <div className="form-group col-md-6">
                    <label htmlFor="inputname3" className="col-form-label">City</label>
                    <input type="text" className="form-control" onChange={handleChange} name="city" value={(profileData.city == 'null' ? '' : profileData.city)} placeholder="City" />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label htmlFor="inputState">State</label>
                    <select onChange={handleChange} name="state"  value={(profileData.state == 'null' ? '' : profileData.state)} className="form-control">
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
                  </div>
                  <div className="form-group col-md-6">
                    <label htmlFor="inputState">Country</label>
                    <select onChange={handleChange} name="country"  value={(profileData.country == 'null' ? '' : profileData.country)} className="form-control">
                      <option value="India">India</option>
                    </select>
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label htmlFor="inputname3" className="col-form-label">Alternate Number</label>
                    <input type="text" className="form-control" onChange={handleChange} name="alt_number" value={(profileData.alt_number == 'null' ? '' : profileData.alt_number)} placeholder="Alternate Number" />
                  </div>
                  <div className="form-group col-md-6">
                    <label htmlFor="inputname3" className="col-form-label">Date of Birth</label>
                    <input type="date" className="form-control" onChange={handleChange} name="dob" value={(profileData.dob == 'null' ? '' : profileData.dob)} placeholder="Date of Birth" />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label htmlFor="inputname3" className="col-form-label">Town of Birth</label>
                    <input type="text" className="form-control" onChange={handleChange} name="birth_place" value={(profileData.birth_place == 'null' ? '' : profileData.birth_place)} placeholder="Town of Birth" />
                  </div>
                  <div className="form-group col-md-6">
                    <label htmlFor="inputState">Marital Status</label>
                    <select onChange={handleChange} name="marital_state"  value={(profileData.marital_state == 'null' ? '' : profileData.marital_state)} className="form-control">
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
                    <select onChange={handleChange} name="category"  value={(profileData.category == 'null' ? '' : profileData.category)} className="form-control">
                      <option value="">Select Category</option>
                      <option onChange={handleChange} name="Male">Male</option>
                      <option onChange={handleChange} name="Female">Female</option>
                      <option onChange={handleChange} name="Other">Other</option>
                    </select>
                  </div>
                  <div className="form-group col-md-6">
                    <label htmlFor="inputname3" className="col-form-label">Password <a onClick={() => handleClick()} className="change">Change Password</a></label>
                    <input readOnly type="password" onChange={handleChange} name="password" value={(profileData.password == 'null' ? '' : profileData.password)} className="form-control" placeholder="Password" />
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
                            <input type="text" className="form-control" />
                            <ul className="list-inline upload-icon2">
                              <li>
                                <a href="#">
                                  <div className="file-upload1">
                                    <input type="file" title={profileData.passport_size_photo} onChange={fileChange} name="passport_size_photo" /><i className="fa fa-cloud-upload" />
                                  </div>
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <label htmlFor="inputname3" className="col-form-label">Upload Signature</label>
                          <div className="upload-field2">
                            <input type="text" className="form-control" />
                            <ul className="list-inline upload-icon2">
                              <li>
                                <a href="#">
                                  <div className="file-upload1">
                                    <input type="file" title={profileData.signature_photo} onChange={fileChange} name="signature_photo" /><i className="fa fa-cloud-upload" />
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
                                    <input type="text" className="form-control" placeholder="Front" />
                                    <ul className="list-inline upload-icon">
                                      <li>
                                        <a href="#">
                                          <div className="file-upload1">
                                            <input type="file" title={profileData.aadhar_front_photo} onChange={fileChange} name="aadhar_front_photo" />
                                          </div>
                                        </a>
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                                <div className="col-md-6">
                                  <div className="upload-field">
                                    <input type="text" className="form-control" placeholder="Back" />
                                    <ul className="list-inline upload-icon">
                                      <li>
                                        <a href="#">
                                          <div className="file-upload1">
                                            <input type="file" title={profileData.aadhar_back_photo} onChange={fileChange} name="aadhar_back_photo" />
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
                                    <input type="text" className="form-control"  placeholder="Front" />
                                    <ul className="list-inline upload-icon">
                                      <li>
                                        <a href="#">
                                          <div className="file-upload1">
                                            <input type="file" title={profileData.driving_license_front_photo} onChange={fileChange} name="driving_license_front_photo" />
                                          </div>
                                        </a>
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                                <div className="col-md-6">
                                  <div className="upload-field">
                                    <input type="text" className="form-control" placeholder="Back" />
                                    <ul className="list-inline upload-icon">
                                      <li>
                                        <a href="#">
                                          <div className="file-upload1">
                                            <input type="file" title={profileData.driving_license_back_photo} onChange={fileChange} name="driving_license_back_photo" />
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
                                <input type="text" className="form-control" placeholder="Upload Pan Card" />
                                <ul className="list-inline upload-icon">
                                  <li>
                                    <a href="#">
                                      <div className="file-upload6">
                                        <input type="file" title={profileData.pancard_photo} onChange={fileChange} name="pancard_photo" />
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
                                <input type="text" className="form-control"  placeholder="Front" />
                                <ul className="list-inline upload-icon">
                                  <li>
                                    <a href="#">
                                      <div className="file-upload1">
                                        <input type="file" title={profileData.passport_front_photo} onChange={fileChange} name="passport_front_photo" />
                                      </div>
                                    </a>
                                  </li>
                                </ul>
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="upload-field">
                                <input type="text" className="form-control"  placeholder="Back" />
                                <ul className="list-inline upload-icon">
                                  <li>
                                    <a href="#">
                                      <div className="file-upload1">
                                        <input type="file" title={profileData.passport_back_photo} onChange={fileChange} name="passport_back_photo" />
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
                      <select onChange={handleChange} name="business_type"  value={(profileData.business_type == 'null' ? '' : profileData.business_type)} className="form-control">
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
                    <input type="text" className="form-control" onChange={handleChange} name="company" value={(profileData.company == 'null' ? '' : profileData.company)} placeholder="Company Name" />
                  </div>
                  <div className="form-group col-md-6">
                    <label htmlFor="inputname3" className="col-form-label">Website (Optional)</label>
                    <input type="text" className="form-control" onChange={handleChange} name="website" value={(profileData.website == 'null' ? '' : profileData.website)} placeholder="Website (Optional)" />
                  </div>
                </div>
                <div className="col-sm-12">
                  <div className="row">
                    <div className="col-md-3">
                      <label htmlFor="inputname3" className="col-form-label">CIN Number if PVT LTD</label>
                      <div className="upload-field4">
                        <input type="text" className="form-control" placeholder="Upload COI" />
                        <ul className="list-inline upload-icon">
                          <li>
                            <a href="#">
                              <div className="file-upload3">
                                <input type="file" title={profileData.cinno_photo} value="" onChange={fileChange} name="cinno_photo" />
                              </div>
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="col-md-3">
                      <label htmlFor="inputname3" className="col-form-label">Company Pan Card</label>
                      <div className="upload-field4">
                        <input type="text" className="form-control" placeholder="Upload Company Pan" />
                        <ul className="list-inline upload-icon">
                          <li>
                            <a href="#">
                              <div className="file-upload3">
                                <input type="file" title={profileData.company_pancard_photo} onChange={fileChange} name="company_pancard_photo" />
                              </div>
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="col-md-3">
                      <label htmlFor="inputname3" className="col-form-label">Office address proof</label>
                      <div className="upload-field4">
                        <input type="text" className="form-control" placeholder="Upload Office Address Proof" />
                        <ul className="list-inline upload-icon">
                          <li>
                            <a href="#">
                              <div className="file-upload3">
                                <input type="file" title={profileData.office_address_proof_photo} onChange={fileChange} name="office_address_proof_photo" />
                              </div>
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="col-md-3">
                      <label htmlFor="inputname3" className="col-form-label">GST Number (Optional)</label>
                      <div className="upload-field4">
                        <input type="text" className="form-control" placeholder="Upload GST Certificate" />
                        <ul className="list-inline upload-icon">
                          <li>
                            <a href="#">
                              <div className="file-upload3">
                                <input type="file" title={profileData.gstno_photo} onChange={fileChange} name="gstno_photo" />
                              </div>
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="col-sm-12">
                      <label htmlFor="inputname3" className="col-form-label">About your Business</label>
                      <textarea onChange={handleChange} name="w3review" rows={4} cols={50} onChange={handleChange} value={(profileData.business_description == 'null' ? '' : profileData.business_description)} name="business_description" placeholder="About your Business..." className="form-control" />
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
                    <input type="text" className="form-control" onChange={handleChange} name="beneficiary_name" value={(profileData.beneficiary_name == 'null' ? '' : profileData.beneficiary_name)} placeholder="Beneficiary Name" />
                  </div>
                  <div className="form-group col-md-6">
                    <label htmlFor="inputname3" className="col-form-label">Branch IFSC Code</label>
                    <input type="text" className="form-control" onChange={handleChange} name="branch_ifsc_code" value={(profileData.branch_ifsc_code == 'null' ? '' : profileData.branch_ifsc_code)} placeholder="Branch IFSC Code" />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label htmlFor="inputname3" className="col-form-label">Account Number</label>
                    <input type="text" className="form-control" onChange={handleChange} name="account_number" value={(profileData.account_number == 'null' ? '' : profileData.account_number)} placeholder="Account Number" />
                  </div>
                  <div className="form-group col-md-6">
                    <label htmlFor="inputname3" className="col-form-label">Re Enter Account Number</label>
                    <input type="text" className="form-control" onChange={handleChange} name="confirm_account_number" value={(profileData.confirm_account_number == 'null' ? '' : profileData.confirm_account_number)} placeholder="Re Enter Account Number" />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label htmlFor="inputname3" className="col-form-label">Paytm (If Any)</label>
                    <input type="text" className="form-control" onChange={handleChange} name="paytm_number" value={(profileData.paytm_number == 'null' ? '' : profileData.paytm_number)} placeholder="Paytm (If Any)" />
                  </div>
                </div>
              </div>
              <div className="form-group row">
                <div className="col-sm-10 text-center"> <a onClick={saveProfile} className="btn btn-primary">Save</a>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

    );
}

export default Profile