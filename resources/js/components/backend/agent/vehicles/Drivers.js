import React, { useState ,useEffect } from "react";

function Drivers() {
  const [inputList, setInputList] = useState([{  name: "", mobile: "", driving_licence: "", licence_photo: "", status:"Approval Pending" }]);

  const [user, setUser] = useState(false);

  useEffect(() => {
    let stateqq = localStorage["appState"];
    if (stateqq) {
      let AppState = JSON.parse(stateqq);
      setUser(AppState.user);
      axios.get('/api/drivers/getDrivers/'+AppState.user.id).then(result=>{
        if(result.data.length > 0){
        setInputList(result.data);
      }else{
        setInputList([{ id: "", name: "", mobile: "", driving_licence: "", licence_photo: "", status:"Approval Pending" }])
      }
      });
    }   
  },[]); 

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
  };inputList


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
    setInputList([...inputList, { id: "", name: "", mobile: "", driving_licence: "", licence_photo: "", status:"Approval Pending" }]);
  };

  const saveDriverData = (event) => {

    event.preventDefault();

    let errors = {};

    var data = new FormData();

    Object.keys(inputList).map(function(keyName, keyIndex) {
      data.append("id["+keyName+"]",inputList[keyName].id)
      data.append("name["+keyName+"]",inputList[keyName].name)
      data.append("mobile["+keyName+"]",inputList[keyName].mobile)
      data.append("driving_licence["+keyName+"]",inputList[keyName].driving_licence)
      data.append("licence_photo["+keyName+"]",inputList[keyName].licence_photo)

    })
    axios({
      method: 'post',
      url: '/api/drivers/saveDriver/'+user.id,
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
    <div className="transactionhistory mydriver">
        {/* Page Heading */}
        <h1>My Driver</h1>
        <div className="row">
          <div className="col-sm-12">
            <div className="vehicletable">
              <table className="table">
                <thead>
                  <tr>
                    <th>Driver Name</th>
                    <th>Mobile Number</th>
                    <th>Driving Licence</th>
                    <th style={{width:'22%'}}>Upload Licence Image</th>
                    <th>Status</th>
                </tr>
                </thead>
                
                <tbody>
                 {inputList.map((x,i)=>{
                           return(   
                  <>                      
                  <tr>
                    <td>
                      <input type="text" name="name" placeholder="Driver Name" value={x.name}  onChange={e => handleInputChange(e, i)} className="form-control" />
                    </td>
                    <td>
                      <input type="text" name="mobile" placeholder="Mobile No." value={x.mobile}  onChange={e => handleInputChange(e, i)} className="form-control" />
                    </td>
                    <td>
                      <input type="text" name="driving_licence" placeholder="DL-000000000" value={x.driving_licence}  onChange={e => handleInputChange(e, i)} className="form-control" />
                    </td>
                    <td>
                      <div className="upload-field">
                        <input type="text" className="form-control" placeholder={(x.licence_photo != '') ? x.licence_photo : 'Upload Document' } />
                        <ul className="list-inline upload-icon">
                          <li>
                            <a href="#" title>
                              <div className="file-upload1">
                                <input type="file" name="licence_photo" onChange={e => handleFileChange(e, i)} />                           
                                <i className="fa fa-paperclip" />
                              </div>
                            </a>
                          </li>
                        </ul>
                      </div>
                    </td>
                    <td>
                      <a href="#" className={x.status == 'Verified' ? '' : 'approval'}>{x.status}</a>
                    </td>
                    <td>
                      {inputList.length !== 1 && 
                      <a className="btn btn-link"  onClick={() => handleRemoveClick(i)}>Remove</a>
                      }
                    </td>
                  </tr>
                  {inputList.length - 1 === i &&
                    <tr>
                      <td colSpan={6}><button type="button" className="btn btn-primary" onClick={handleAddClick}>Add More</button></td>
                    </tr>
                   }
                  </>


                 );


                  })
                }                                    
                                
                </tbody>
              </table>
            </div>
          </div>

          <div className="placebidbtn movebtn">
            <a href="#" className="btn btn-primary"  onClick={saveDriverData}>Save</a>
          </div>
        </div>
      </div>


  );
}

export default Drivers;