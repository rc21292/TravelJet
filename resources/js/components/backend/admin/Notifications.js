import React from 'react'  
import axios from 'axios';  
import { useHistory, useLocation } from 'react-router-dom'

import { useState, useEffect } from 'react'  
function Notifications(props) { 

  const history = useHistory()

  const [noticeData, setNoticeData] = useState([]);  
  const [userId, setUserId] = useState(0);

  useEffect(() => {  
  	let stateqq = localStorage["appState"];
  	if (stateqq) {
  		let AppState = JSON.parse(stateqq);
  		setUserId(AppState.user.id);
  		axios.get('/api/notifications/'+AppState.user.id)
  		.then(result=>{
  			setNoticeData(result.data);
  		});
  	}  
  }, []);  

  return (  
      <div className="ms-content-wrapper">
        <div className="row">
          <div className="col-xl-12 col-md-12">
            <div className="ms-panel">
              <div className="ms-panel-header  ms-panel-custom">
                <div className="ms-heading">
                  <h6>News Feed</h6>
                </div>
              </div>
              <div className="ms-panel-body">
                <div className="table-responsive">
                  <table className="table table-hover table-striped thead-primary">
                    <tbody>
                      {  
                        noticeData.map((query, idx) => {  
                        return  <tr key={idx}>
                          <td className="ms-table-f-w"> <img src="http://worksheriff.com/images/icons/app.svg" alt="people" />
                            <span dangerouslySetInnerHTML={{__html: query.data}} ></span>
                            <div style={{ marginLeft : '50px' }}><b>{query.created_at}</b>
                            </div>
                          </td>
                        </tr>  
                      })}  
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>                  
      </div>  
  )  
}  
  
export default Notifications