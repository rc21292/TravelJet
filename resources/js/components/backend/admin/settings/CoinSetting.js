import React, { useState, useEffect, Fragment } from "react";
import ReactDOM from "react-dom";
import CommissionSetting from './CommissionSetting'


const CoinSetting = () => {

  const [isSuccess, setIsSuccess] = useState('');

  const [inputFields, setInputFields] = useState([
    { rangeFrom: '', rangeTo: '', noofCoins: '' }
  ]);

  useEffect(() => {
  		axios.get('/api/settings/getSettings/')
  		.then(response=>{
  			if (response.data) {
  			setInputFields(response.data);
  		}else{
  			setInputFields([
    { rangeFrom: '', rangeTo: '', noofCoins: '' }
  ]);
  		}
  		}); 
  },[]); 



  const handleAddFields = () => {
    const values = [...inputFields];
    values.push({ rangeFrom: '', rangeTo: '', noofCoins: '' });
    setInputFields(values);
  };

  const handleRemoveFields = index => {
    const values = [...inputFields];
    values.splice(index, 1);
    setInputFields(values);
  };

  const handleInputChange = (index, event) => {
    const values = [...inputFields];
    if (event.target.name === "rangeFrom") {
      values[index].rangeFrom = event.target.value;
    } else if (event.target.name === "rangeTo") {
      values[index].rangeTo = event.target.value;
    }else{
    	values[index].noofCoins = event.target.value;
    }

    setInputFields(values);
  };

  const handleSubmit = e => {
    e.preventDefault();
    const query = {
        coin_settings:inputFields
      }
     axios.post('/api/settings/saveSettings/',query).then(res=>
      {
      	if (res.data.type == 'success') {
      		setIsSuccess('Setting saved successfully!');
      	}else{
      		setIsSuccess('Error in Saveind Settings, please try again!');
      	}
      });
  };


  setTimeout(function () {
        setIsSuccess('');
    }, 150000); 


  return (
    <>
    	<div className="ms-content-wrapper">
    		<div className="row">
    			<div className="col-xl-12 col-md-12">
    				<div className="ms-panel">
    					<div className="ms-panel-header  ms-panel-custom">
    						<div className="ms-heading">
    							<h6>No of Coins based on KM's</h6>    						</div>
    					</div>
    					<div className="ms-panel-body">
    					{ isSuccess ? <div class="alert alert-success alert-solid" role="alert">
			                <strong>Well done!</strong> { isSuccess }!.
			              </div> : '' }
    						<form onSubmit={handleSubmit}>
    							<div className="form-row">
    								{inputFields.map((inputField, index) => (
    									<Fragment key={`${inputField}~${index}`}>
    										<div className="form-group col-sm-3">
    											<label htmlFor="rangeFrom">Range From</label>
    											<input
    											type="number"
    											className="form-control"
    											id="rangeFrom"
    											name="rangeFrom"
    											value={inputField.rangeFrom}
    											onChange={event => handleInputChange(index, event)}
    											/>
    										</div>
    										<div className="form-group col-sm-3">
    											<label htmlFor="rangeTo">Range To</label>
    											<input
    											type="number" 
    											className="form-control" 
    											id="rangeTo"
    											name="rangeTo"
    											value={inputField.rangeTo}
    											onChange={event => handleInputChange(index, event)}
    											/>
    										</div>

    										<div className="form-group col-sm-3">
    											<label htmlFor="noofCoins">No of Coins</label>
    											<input
    											type="number" 
    											className="form-control" 
    											id="noofCoins"
    											name="noofCoins"
    											value={inputField.noofCoins}
    											onChange={event => handleInputChange(index, event)}
    											/>
    										</div>
    										<div className="form-group col-sm-3">
    											<button type="button" className="btn btn-info" onClick={() => handleAddFields()}>Add</button>
    											{ index == 0 ? '' :<button type="button" className="btn btn-danger" onClick={() => handleRemoveFields(index)}>Remove</button> }
    										</div>
    									</Fragment>
    									))}
    								</div>
    								<div className="submit-button">
    									<button
    									className="btn btn-primary mr-2"
    									type="submit"
    									onSubmit={handleSubmit}
    									>
    									Save
    								</button>
    							</div>
    						</form>

    					</div>
    				</div>
    			</div>
    		</div>
    	</div>
    <CommissionSetting/>

    </>
  );
};
 export default CoinSetting