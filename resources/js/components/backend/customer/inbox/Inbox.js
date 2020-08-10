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
              <div className="main-message-box pull-right">
                <div className="message-dt">
                  <div className="message-inner-dt">
                    <p>Thank you for contact with me. What can I help you.</p>
                  </div>
                </div>
                <div className="messg-usr-img">
                  <img src="image/icons/chat-profile.png" alt="" className="chat-image" />
                </div>
              </div>
              <div className="main-message-box chatnow pull-left">
                <div className="messg-usr-img">
                  <img src="image/icons/chat-profile.png" alt="" className="chat-image" />
                </div>
                <div className="message-dt">
                  <div className="message-inner-dt">
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                  </div>
                </div>
              </div>
              <div className="main-message-box pull-right">
                <div className="message-dt">
                  <div className="message-inner-dt">
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                  </div>
                </div>
                <div className="messg-usr-img">
                  <img src="image/icons/chat-profile.png" alt="" className="chat-image" />
                </div>
              </div>
              <div className="main-message-box chatnow pull-left">
                <div className="messg-usr-img">
                  <img src="image/icons/chat-profile.png" alt="" className="chat-image" />
                </div>
                <div className="message-dt">
                  <div className="message-inner-dt">
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                  </div>
                </div>
              </div>
              <div className="main-message-box pull-right">
                <div className="message-dt">
                  <div className="message-inner-dt">
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                  </div>
                </div>
                <div className="messg-usr-img">
                  <img src="image/icons/chat-profile.png" alt="" className="chat-image" />
                </div>
              </div>
              <div className="main-message-box chatnow pull-left">
                <div className="messg-usr-img">
                  <img src="image/icons/chat-profile.png" alt="" className="chat-image" />
                </div>
                <div className="message-dt">
                  <div className="message-inner-dt">
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                  </div>
                </div>
              </div>
              <div className="main-message-box pull-right">
                <div className="message-dt">
                  <div className="message-inner-dt">
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                  </div>
                </div>
                <div className="messg-usr-img">
                  <img src="image/icons/chat-profile.png" alt="" className="chat-image" />
                </div>
              </div>
              <div className="main-message-box chatnow pull-left">
                <div className="messg-usr-img">
                  <img src="image/icons/chat-profile.png" alt="" className="chat-image" />
                </div>
                <div className="message-dt">
                  <div className="message-inner-dt">
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="mf-field">
              <textarea name="w3review" rows={4} cols={50} placeholder="Type a message here" className="form-control" defaultValue={""} />
            </div>
            <div className="pull-right messagesend">
              <a href="#" className="btn btn-primary">Send</a>
            </div>
          </div>
          <div className="col-sm-3">
            <div className="chatrightside">
              <div className="mesg-title">
                <h2>Inbox</h2>
              </div>
              <div className="messages-list">
                <ul>
                  <li className="active">
                    <a href="#">
                      <div className="usr-msg-details">
                        <div className="usr-ms-img">
                          <img src="image/icons/chat-profile.png" alt="chat-profile" />
                          <span className="msg-status" />
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
                          <img src="image/icons/chat-profile.png" alt="chat-profile" />
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
                          <img src="image/icons/chat-profile.png" alt="chat-profile" />
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
                          <img src="image/icons/chat-profile.png" alt="chat-profile" />
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
      </div>
);
}
}