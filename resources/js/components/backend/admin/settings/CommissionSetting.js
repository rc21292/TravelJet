import React, { useState, useEffect, Fragment } from "react";
import ReactDOM from "react-dom";

const CommissionSetting = () => {
  const [inputCommission, setInputCommission] = useState(0);
    const [isSuccess, setIsSuccess] = useState('');


  useEffect(() => {
  		axios.get('/api/settings/getCommissionSettings/')
  		.then(response=>{
  			if (response.data) {
  			setInputCommission(response.data);
  		}else{
  			setInputCommission(0);
  		}
  		}); 
  },[]); 


  setTimeout(function () {
        setIsSuccess('');
    }, 1500); 

  const handleInputChange = (event) => {
    if (event.target.name === "inputCommission") {
    setInputCommission(event.target.value);
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    const query = {
        commission_settings:inputCommission
      }
     axios.post('/api/settings/saveCommissionSettings/',query).then(res=>
      {
      	if (res.data.type == 'success') {
      		setIsSuccess('Setting saved successfully!');
      	}else{
      		setIsSuccess('Error in Saveind Settings, please try again!');
      	}
      });
  };

  return (
    <>
    	<div className="ms-content-wrapper">
    		<div className="row">
    			<div className="col-xl-12 col-md-12">
    				<div className="ms-panel">
    					<div className="ms-panel-header  ms-panel-custom">
    						<div className="ms-heading">
    							<h6>Commission %</h6>
    						</div>
    					</div>
    					<div className="ms-panel-body">
    					{ isSuccess ? <div class="close-me alert alert-success alert-solid" role="alert">
			                <strong>Well done!</strong> { isSuccess }!.
			              </div> : '' }
    						<form onSubmit={handleSubmit}>
    							<div className="form-row">
    										<div className="form-group col-sm-4">
    											<label htmlFor="inputCommission"></label>
    											<input
    											type="number"
    											className="form-control"
    											id="inputCommission"
    											name="inputCommission"
    											value={inputCommission}
    											onChange={event => handleInputChange(event)}
    											/>
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
	    						</div>    								
    						</form>
    					</div>
    				</div>
    			</div>
    		</div>
    	</div>

    </>
  );
};
 export default CommissionSetting