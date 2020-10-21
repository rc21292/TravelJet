import React from 'react'  
import axios from 'axios';  
import { useHistory, useLocation } from 'react-router-dom'
import Pagination from "react-js-pagination";
import { useState, useEffect } from 'react'  
import Moment from 'react-moment';


function KYCDetails(props) {

  const history = useHistory()

  const [user, setUser] = useState(false);

  const [customerId, setCustomerId] = useState(0); 
  const [agentProfile, setAgentProfile] = useState({});

  useEffect(() => {

    let parts = location.pathname.split('/');
    let customer_id = parts.pop() || parts.pop();  
    setCustomerId(customer_id);

    let stateqq = localStorage["appState"];
    if (stateqq) {
      let AppState = JSON.parse(stateqq);
      setUser(AppState.user);    

      axios('/api/users/getAgentProfile/'+customer_id).then(result=>{
        setAgentProfile(result.data); 
      });

    }   

  }, []);  


  const handlePageChange = (pageNumber) => {
    axios.get('/api/users/getAgentProfile/'+customerId+'?page='+pageNumber)
    .then(result=>{
      setAgentProfile(result.data);  
    });
  }

  const downloadFile = (type,filename) => {

    var a = document.createElement("a");
    a.href = '/uploads/users/'+customerId+'/'+type+'/'+filename;
    a.setAttribute("download", filename);
    a.click();

  } 

  return (  
    <div className="tab-pane" id="2b">
        <div className="col-sm-12">
          <div className="title">Personal KYC Details</div>
          <div className="cardbg total-transaction kycdetail">
            <div className="card-body">
              <table className="table">
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Document Name</th>
                    <th scope="col">Image</th>
                    <th scope="col">Download</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Passport Photo</td>
                    <td>
                      <img style={{height:'106px'}} src={'/uploads/users/'+customerId+'/passport_size_photo/'+agentProfile.passport_size_photo} alt="image description" />
                    </td>
                    <td><a href="#" onClick={() => downloadFile('document',agentProfile.passport_size_photo)}><i className="fa fa-download" /></a></td>
                  </tr>
                  <tr>
                    <td>Signature</td>
                    <td>
                      <img style={{height:'106px'}} src={'/uploads/users/'+customerId+'/signature_photo/'+agentProfile.signature_photo} alt="image description" />
                    </td>
                    <td><a href="#" onClick={() => downloadFile('signature_photo',agentProfile.signature_photo)}><i className="fa fa-download" /></a></td>
                  </tr>
                  <tr>
                    <td>Aadhar Card/Front</td>
                    <td>
                      <img style={{height:'106px'}} src={'/uploads/users/'+customerId+'/documents/'+agentProfile.aadhar_front_photo} alt="image description" />
                    </td>
                    <td><a href={true} onClick={() => downloadFile('documents',agentProfile.aadhar_front_photo)}><i className="fa fa-download" /></a></td>
                  </tr>
                  <tr>
                    <td>Aadhar Card/Back</td>
                    <td>
                      <img style={{height:'106px'}} src={'/uploads/users/'+customerId+'/documents/'+agentProfile.aadhar_back_photo} alt="image description" />
                    </td>
                    <td><a href="#" onClick={() => downloadFile('documents',agentProfile.aadhar_back_photo)}><i className="fa fa-download" /></a></td>
                  </tr>
                  <tr>
                    <td>Driving License/Front</td>
                    <td>
                      <img style={{height:'106px'}} src={'/uploads/users/'+customerId+'/documents/'+agentProfile.driving_license_front_photo} alt="image description" />
                    </td>
                    <td><a href="#" onClick={() => downloadFile('documents',agentProfile.driving_license_front_photo)}><i className="fa fa-download" /></a></td>
                  </tr>
                  <tr>
                    <td>Driving License/Back</td>
                    <td>
                      <img style={{height:'106px'}} src={'/uploads/users/'+customerId+'/documents/'+agentProfile.driving_license_back_photo} alt="image description" />
                    </td>
                    <td><a href="#" onClick={() => downloadFile('documents',agentProfile.driving_license_back_photo)}><i className="fa fa-download" /></a></td>
                  </tr>
                  <tr>
                    <td>Passport / Front</td>
                    <td>
                      <img style={{height:'106px'}} src={'/uploads/users/'+customerId+'/documents/'+agentProfile.passport_front_photo} alt="image description" />
                    </td>
                    <td><a href="#" onClick={() => downloadFile('documents',agentProfile.passport_front_photo)}><i className="fa fa-download" /></a></td>
                  </tr>
                  <tr>
                    <td>Passport / Back</td>
                    <td>
                      <img style={{height:'106px'}} src={'/uploads/users/'+customerId+'/documents/'+agentProfile.passport_back_photo} alt="image description" />
                    </td>
                    <td><a href="#" onClick={() => downloadFile('documents',agentProfile.passport_back_photo)}><i className="fa fa-download" /></a></td>
                  </tr>
                  <tr>
                    <td>Pan Card</td>
                    <td>
                      <img style={{height:'106px'}} src={'/uploads/users/'+customerId+'/documents/'+agentProfile.pancard_photo} alt="image description" />
                    </td>
                    <td><a href="#" onClick={() => downloadFile('documents',agentProfile.pancard_photo)}><i className="fa fa-download" /></a></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="col-sm-12">
          <div className="title">Business KYC Details</div>
          <form className="filterform informationform">
            <div className="form">
              <div className="form-group row">
                <label htmlFor="labelname" className="col-sm-2">Company Name</label>
                <div className="col-sm-10">
                  <input type="text" className="form-control" readOnly={true} defaultValue={agentProfile.company} placeholder="Company Name" />
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor="labelname" className="col-sm-2">Website</label>
                <div className="col-sm-10">
                  <input type="text" className="form-control" readOnly={true} defaultValue={agentProfile.website} placeholder="Website" />
                </div>
              </div>
            </div>
          </form>
        </div>
        <div className="col-sm-12">
          <div className="cardbg total-transaction kycdetail">
            <div className="card-body">
              <table className="table">
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Document Name</th>
                    <th scope="col">Image</th>
                    <th scope="col">Download</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>CIN Number</td>
                    <td>
                      <img style={{height:'106px'}} src={'/uploads/users/'+customerId+'/documents/'+agentProfile.cinno_photo} alt="image description" />
                    </td>
                    <td><a href="#" onClick={() => downloadFile('documents',agentProfile.cinno_photo)}><i className="fa fa-download" /></a></td>
                  </tr>
                  <tr>
                    <td>Company Pan Card</td>
                    <td>
                      <img style={{height:'106px'}} src={'/uploads/users/'+customerId+'/documents/'+agentProfile.company_pancard_photo} alt="image description" />
                    </td>
                    <td><a href="#" onClick={() => downloadFile('documents',agentProfile.company_pancard_photo)}><i className="fa fa-download" /></a></td>
                  </tr>
                  <tr>
                    <td>Office address proof</td>
                    <td>
                      <img style={{height:'106px'}} src={'/uploads/users/'+customerId+'/office_address_proof_photo/'+agentProfile.office_address_proof_photo} alt="image description" />
                    </td>
                    <td><a href="#" onClick={() => downloadFile('office_address_proof_photo',agentProfile.office_address_proof_photo)}><i className="fa fa-download" /></a></td>
                  </tr>
                  <tr>
                    <td>GST Number (Optional)</td>
                    <td>
                      <img style={{height:'106px'}} src={'/uploads/users/'+customerId+'/gstno_photo/'+agentProfile.gstno_photo} alt="image description" />
                    </td>
                    <td><a href="#" onClick={() => downloadFile('gstno_photo',agentProfile.gstno_photo)}><i className="fa fa-download" /></a></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
  )  
}  
  
export default KYCDetails