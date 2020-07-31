import React, { Component } from 'react';
import {BrowserRouter as Router, Link, Route, Redirect} from 'react-router-dom';

import axios from 'axios';
import Pagination from "react-js-pagination";

export default class Inbox extends Component {
	render() {
		return (
      <div className="inbox-page">
  {/* Page Heading */}
  <h1>Booking for Delhi to Manali</h1>
  <div className="row">
    <div className="col-sm-9">
      <div className="main-conversation-box">
        <div className="message-dt">
          <span> 17 Dec 2019, 1:08 PM</span>
        </div>
        <div className="conversation-card">
          <div className="heading">Lorem Ipsum is simply dummy text</div>
          <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
          <a href="#" className="btn btn-primary btn-block">Create</a>
        </div>
        <div className="main-message-box">
          <div className="messg-usr-img">
            <img src="images/chat-img.png" alt="" className="chat-image" />
          </div>
          <div className="message-dt">
            <div className="message-inner-dt">
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
          </div>
        </div>
        <div className="message-box">
          <div className="heading">Lorem ipsum dolor</div>
          <p>Lorem ipsum: "80% Completion"</p>
          <span><i className="fa fa-pound-sign" /> 1500.00</span>
        </div>
        <div className="message-box">
          <div className="heading">Lorem ipsum dolor</div>
          <p>Lorem ipsum: "80% Completion"</p>
          <span><i className="fa fa-pound-sign" /> 1500.00</span>
        </div>
      </div>
      <div className="mf-field">
        <input type="text" name="message" placeholder="Type a message here" className="form-control" />
      </div>
      <div className="pull-right">
        <a href="#" className="btn btn-primary">Send</a>
      </div>
    </div>
    <div className="col-sm-3">
      <div className="messages-list">
        <ul>
          <li className="active">
            <a href="#">
              <div className="usr-msg-details">
                <div className="usr-ms-img">
                  <img src="images/chat-profile.png" alt="chat-profile" />
                  <span className="msg-status" />
                </div>
                <div className="usr-mg-info">
                  <div className="user-name">Lorem Ipsum</div>
                  <p>Lorem Ipsum...</p>
                </div>{/*usr-mg-info end*/}
                <div className="msg-notifc">2</div>
              </div>{/*usr-msg-details end*/}
            </a>
          </li>
          <li>
            <a href="#">
              <div className="usr-msg-details">
                <div className="usr-ms-img">
                  <img src="images/chat-profile.png" alt="chat-profile" />
                </div>
                <div className="usr-mg-info">
                  <div className="user-name">Lorem Ipsum</div>
                  <p>Lorem Ipsum...</p>
                </div>{/*usr-mg-info end*/}
              </div>{/*usr-msg-details end*/}
            </a>
          </li>
          <li>
            <a href="#">
              <div className="usr-msg-details">
                <div className="usr-ms-img">
                  <img src="images/chat-profile.png" alt="chat-profile" />
                </div>
                <div className="usr-mg-info">
                  <div className="user-name">Lorem Ipsum</div>
                  <p>Lorem Ipsum is simply...</p>
                </div>{/*usr-mg-info end*/}
              </div>{/*usr-msg-details end*/}
            </a>
          </li>
          <li>
            <a href="#">
              <div className="usr-msg-details">
                <div className="usr-ms-img">
                  <img src="images/chat-profile.png" alt="chat-profile" />
                  <span className="msg-status" />
                </div>
                <div className="usr-mg-info">
                  <div className="user-name">Lorem Ipsum</div>
                  <p>Lorem Ipsum is simply...</p>
                </div>{/*usr-mg-info end*/}
              </div>{/*usr-msg-details end*/}
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</div>

		);
	}
}