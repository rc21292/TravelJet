import React, { useState, useEffect } from "react";


function Vehicles() {
  const [inputList, setInputList] = useState([{ id: "", vehicle_type: "", vehicle_model: "", vehicle_number: "", number_plate_photo:"", registration_copy_photo:"", insurance_photo:"", route_permit_photo:"", fitness_certificate_photo:"", lease_paper_photo:"" }]);
  const [user, setUser] = useState(false);

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
  };

  useEffect(() => {
    let stateqq = localStorage["appState"];
    if (stateqq) {
      let AppState = JSON.parse(stateqq);
      setUser(AppState.user);
      axios.get('/api/vehicles/getVehicles/'+AppState.user.id).then(result=>{
        if(result.data.length > 0){
          setInputList(result.data);
        }else{
          setInputList([{ id: "", vehicle_type: "", vehicle_model: "", vehicle_number: "", number_plate_photo:"", registration_copy_photo:"", insurance_photo:"", route_permit_photo:"", fitness_certificate_photo:"", lease_paper_photo:"" }]);
        }
      });
    }   
  },[]);


  const handleFileChange =  (e, index) => {
      const { name, value } = e.target;
      const list = [...inputList];
      list[index][name] = e.target.files[0] ;
      setInputList(list);     
  }; 

  const handleRemoveClick = index => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };

  const handleAddClick = () => {
    setInputList([...inputList, { id: "", vehicle_type: "", vehicle_model: "", vehicle_number: "", number_plate_photo:"", registration_copy_photo:"", insurance_photo:"", route_permit_photo:"", fitness_certificate_photo:"", lease_paper_photo:"" }]);
  };

  console.log(inputList); 

  const saveVehiclesData = (event) => {

    event.preventDefault();

    let errors = {};

    var data = new FormData();

    Object.keys(inputList).map(function(keyName, keyIndex) {
      data.append("id["+keyName+"]",inputList[keyName].id)
      data.append("vehicle_type["+keyName+"]",inputList[keyName].vehicle_type)
      data.append("vehicle_model["+keyName+"]",inputList[keyName].vehicle_model)
      data.append("vehicle_number["+keyName+"]",inputList[keyName].vehicle_number)
      data.append("number_plate_photo["+keyName+"]",inputList[keyName].number_plate_photo)
      data.append("registration_copy_photo["+keyName+"]",inputList[keyName].registration_copy_photo)
      data.append("insurance_photo["+keyName+"]",inputList[keyName].insurance_photo)
      data.append("route_permit_photo["+keyName+"]",inputList[keyName].route_permit_photo)
      data.append("fitness_certificate_photo["+keyName+"]",inputList[keyName].fitness_certificate_photo)
      data.append("lease_paper_photo["+keyName+"]",inputList[keyName].lease_paper_photo)
    })
    axios({
      method: 'post',
      url: '/api/vehicles/saveVehicles/'+user.id,
      data: data,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then(response => {
      window.location.reload(false);
    })
    .catch(e => {
      console.log(e);
    });

  }


  return (
      <div className="transactionhistory myvehicle">
        <h1>My Vehicle</h1>
        <div className="row">
          <div className="col-sm-12">
            <div className="vehicletable">
            {inputList.map((x,i)=>{
            return(   
            <div key={`${x}~${i}`}>    
              <div className="panel panel-default">
                <div className="panel-heading">
                  <h5 className="modal-title">{x.status ? x.status : 'Approval Pending'}</h5>
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close"  disabled={inputList.length == 1} onClick={() => handleRemoveClick(i)}> <i className="fa fa-times" /></button>
                </div>
                <div className="panel-body">
                  <div className="vehicleverified informationform">
                    <div className="row">
                      <div className="col-sm-4">
                        <select className="form-control" name="vehicle_type" value={x.vehicle_type}  onChange={e => handleInputChange(e, i)}>
                          <option value="">Select Vehicle Type</option>
                          <option value="Hatchback">Hatchback</option>
                          <option value="Sedan">Sedan</option>
                          <option value="Suv">Suv</option>
                          <option value="Tempo Traveller">Tempo Traveller</option>
                          <option value="Mini Bus">Mini Bus</option>
                          <option value="Volvo">Volvo</option>
                          <option value="8 Seater">8 Seater</option>
                          <option value="12 Seater">12 Seater</option>
                          <option value="16 Seater">16 Seater</option>
                          <option value="20 Seater">20 Seater</option>
                          <option value="24 Seater">24 Seater</option>
                          <option value="Mini Bus">Mini Bus</option>
                          <option value="Volvo">Volvo</option>
                        </select>
                      </div>
                      <div className="col-sm-4">
                      <input type="text" className="form-control" name="vehicle_model" placeholder="Enter Vehicle Model" value={x.vehicle_model}  onChange={e => handleInputChange(e, i)} />
                      <input type="hidden" name="id" defaultValue={x.id} />
                      </div>
                      <div className="col-sm-4">
                        <input type="text" className="form-control verifiinput" name="vehicle_number" placeholder="Enter Vehicle Number" value={x.vehicle_number}  onChange={e => handleInputChange(e, i)} />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-4">
                        <div className="input-group searchbar">
                          <div className="upload-field7">
                            <input type="text" className="form-control" placeholder={(x.number_plate_photo != '') ? x.number_plate_photo : 'Upload Number Plate' } />
                            <ul className="list-inline upload-icon">
                              <li>
                                <a href="#" title="">
                                  <div className="file-upload8">
                                    <input type="file"  name="number_plate_photo" onChange={e => handleFileChange(e, i)}/>
                                  </div>
                                </a>
                              </li>
                            </ul>
                          </div> <span className="input-group-btn">
                            <a href="#">
                            </a><a className="close2" data-dismiss="modal" aria-label="Close">
                              <i className="fa fa-times" />
                            </a>
                          </span>
                        </div>
                      </div>
                      <div className="col-sm-4">
                        <div className="input-group searchbar">
                          <div className="upload-field7">
                            <input type="text" className="form-control" placeholder={(x.registration_copy_photo != '') ? x.registration_copy_photo : 'Upload Registration Copy' } />
                            <ul className="list-inline upload-icon">
                              <li>
                                <a href="#" title="">
                                  <div className="file-upload8">
                                    <input type="file" name="registration_copy_photo" onChange={e => handleFileChange(e, i)}/>
                                  </div>
                                </a>
                              </li>
                            </ul>
                          </div> <span className="input-group-btn">
                            <a href="#">
                            </a><a className="close2" data-dismiss="modal" aria-label="Close">
                              <i className="fa fa-times" />
                            </a>
                          </span>
                        </div>
                      </div>
                      <div className="col-sm-4">
                        <div className="input-group searchbar">
                          <div className="upload-field7">
                            <input type="text" className="form-control" placeholder={(x.insurance_photo != '') ? x.insurance_photo : 'Upload Insurance'} />
                            <ul className="list-inline upload-icon">
                              <li>
                                <a href="#" title="">
                                  <div className="file-upload8">
                                    <input type="file"  name="insurance_photo" onChange={e => handleFileChange(e, i)}/>
                                  </div>
                                </a>
                              </li>
                            </ul>
                          </div> <span className="input-group-btn">
                            <a href="#">
                            </a><a className="close2" data-dismiss="modal" aria-label="Close">
                              <i className="fa fa-times" />
                            </a>
                          </span>
                        </div>
                      </div>
                      <div className="col-sm-4">
                        <div className="input-group searchbar">
                          <div className="upload-field7">
                            <input type="text" className="form-control" placeholder={(x.route_permit_photo != '') ? x.route_permit_photo : 'Upload Route Permit' } />
                            <ul className="list-inline upload-icon">
                              <li>
                                <a href="#" title="">
                                  <div className="file-upload8">
                                    <input type="file" name="route_permit_photo" onChange={e => handleFileChange(e, i)}/>
                                  </div>
                                </a>
                              </li>
                            </ul>
                          </div> <span className="input-group-btn">
                            <a href="#">
                            </a><a className="close2" data-dismiss="modal" aria-label="Close">
                              <i className="fa fa-times" />
                            </a>
                          </span>
                        </div>
                      </div>
                      <div className="col-sm-4">
                        <div className="input-group searchbar">
                          <div className="upload-field7">
                            <input type="text" className="form-control" placeholder={(x.fitness_certificate_photo != '') ? x.fitness_certificate_photo : 'Upload Fitness Certificate' } />
                            <ul className="list-inline upload-icon">
                              <li>
                                <a href="#" title="">
                                  <div className="file-upload8">
                                    <input type="file" name="fitness_certificate_photo" onChange={e => handleFileChange(e, i)}/>
                                  </div>
                                </a>
                              </li>
                            </ul>
                          </div> <span className="input-group-btn">
                            <a href="#">
                            </a><a className="close2" data-dismiss="modal" aria-label="Close">
                              <i className="fa fa-times" />
                            </a>
                          </span>
                        </div>
                      </div>
                      <div className="col-sm-4">
                        <div className="input-group searchbar">
                          <div className="upload-field7">
                            <input type="text" className="form-control" placeholder={(x.lease_paper_photo != '') ? x.lease_paper_photo : 'Upload Lease Paper' } />
                            <ul className="list-inline upload-icon">
                              <li>
                                <a href="#" title="">
                                  <div className="file-upload8">
                                    <input type="file" name="lease_paper_photo" onChange={e => handleFileChange(e, i)} />
                                  </div>
                                </a>
                              </li>
                            </ul>
                          </div> <span className="input-group-btn">
                            <a href="#">
                            </a><a className="close2" data-dismiss="modal" aria-label="Close">
                              <i className="fa fa-times" />
                            </a>
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="ifcab">If cab is not yours</div>
                  </div>
                </div>
              </div>
              {inputList.length - 1 === i &&
              <div className="addmorebtn"> <button className="btn btn-primary" onClick={handleAddClick}><i className="fa fa-plus"/> Add More</button></div>
              }
                 </div>
                 );
                })
              }  
            </div>
          </div>
           
          <div className="placebidbtn movebtn"> <a onClick={saveVehiclesData} className="btn btn-primary">Save</a>
          </div>
        </div>
      </div>
  );
}

export default Vehicles;