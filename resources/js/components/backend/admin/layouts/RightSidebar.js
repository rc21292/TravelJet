import React, { useState, useEffect } from 'react'
import {BrowserRouter as Router, Link, Route, Redirect} from 'react-router-dom';
import Home from '../Home';

function RightSidebar() {
	return (
		<div>
		<aside id="ms-quick-bar" className="ms-quick-bar fixed ms-d-block-lg">
		<ul className="nav nav-tabs ms-quick-bar-list" role="tablist">
		<li className="ms-quick-bar-item ms-has-qa" role="presentation" data-toggle="tooltip" data-placement="left" title="Launch Chat" data-title="Chat">
		<a href="#qa-chat" aria-controls="qa-chat" role="tab" data-toggle="tab">
		<i className="flaticon-chat" />
		<span className="ms-quick-bar-label">Chat</span>
		</a>
		</li>
		<li className="ms-quick-bar-item ms-has-qa" role="presentation" data-toggle="tooltip" data-placement="left" title="Launch Email" data-title="Email">
		<a href="#qa-email" aria-controls="qa-email" role="tab" data-toggle="tab">
		<i className="flaticon-mail" />
		<span className="ms-quick-bar-label">Email</span>
		</a>
		</li>
		<li className="ms-quick-bar-item ms-has-qa" role="presentation" data-toggle="tooltip" data-placement="left" title="Launch To-do-list" data-title="To-do-list">
		<a href="#qa-toDo" aria-controls="qa-toDo" role="tab" data-toggle="tab">
		<i className="flaticon-list" />
		<span className="ms-quick-bar-label">To-do</span>
		</a>
		</li>
		<li className="ms-quick-bar-item ms-has-qa" role="presentation" data-toggle="tooltip" data-placement="left" title="Launch Reminders" data-title="Reminders">
		<a href="#qa-reminder" aria-controls="qa-reminder" role="tab" data-toggle="tab">
		<i className="flaticon-bell" />
		<span className="ms-quick-bar-label">Reminder</span>
		</a>
		</li>
		<li className="ms-quick-bar-item ms-has-qa" role="presentation" data-toggle="tooltip" data-placement="left" title="Launch Notes" data-title="Notes">
		<a href="#qa-notes" aria-controls="qa-notes" role="tab" data-toggle="tab">
		<i className="flaticon-pencil" />
		<span className="ms-quick-bar-label">Notes</span>
		</a>
		</li>
		<li className="ms-quick-bar-item ms-has-qa" role="presentation" data-toggle="tooltip" data-placement="left" title="Invite Members" data-title="Invite Members">
		<a href="#qa-invite" aria-controls="qa-invite" role="tab" data-toggle="tab">
		<i className="flaticon-share-1" />
		<span className="ms-quick-bar-label">Invite</span>
		</a>
		</li>
		</ul>
		<div className="ms-configure-qa" data-toggle="tooltip" data-placement="left" title="Configure Quick Access">
		<a href="#">
		<i className="flaticon-hammer" />
		<span className="ms-quick-bar-label">Configure</span>
		</a>
		</div>
	{/* Quick bar Content */}
	<div className="ms-quick-bar-content">
	<div className="ms-quick-bar-header clearfix">
	<h5 className="ms-quick-bar-title float-left">Title</h5>
	<button type="button" className="close ms-toggler" data-target="#ms-quick-bar" data-toggle="hideQuickBar" aria-label="Close"><span aria-hidden="true">×</span></button>
	</div>
	<div className="ms-quick-bar-body tab-content">
	<div role="tabpanel" className="tab-pane" id="qa-chat">
	<div className="ms-chat-container">
	<div className="ms-chat-header px-3">
	<div className="ms-chat-user-container media clearfix">
	<div className="ms-chat-status ms-status-online ms-chat-img mr-3 align-self-center">
	<img src="https://via.placeholder.com/270x270" className="ms-img-round" alt="people" />
	</div>
	<div className="media-body ms-chat-user-info mt-1">
	<h6>Anny Farisha</h6>
	<a href="#" className="text-disabled has-chevron fs-12" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
	Available
	</a>
	<ul className="dropdown-menu">
	<li className="ms-dropdown-list">
	<a className="media p-2" href="#">
	<div className="media-body">
	<span>Busy</span>
	</div>
	</a>
	<a className="media p-2" href="#">
	<div className="media-body">
	<span>Away</span>
	</div>
	</a>
	<a className="media p-2" href="#">
	<div className="media-body">
	<span>Offline</span>
	</div>
	</a>
	</li>
	</ul>
	</div>
	</div>
	<form className="ms-form my-3" method="post">
	<div className="ms-form-group my-0 mb-0 has-icon fs-14">
	<input type="search" className="ms-form-input w-100" name="search" placeholder="Search for People and Groups" defaultValue />
	<i className="flaticon-search text-disabled" />
	</div>
	</form>
	</div>
	<div className="ms-chat-body">
	<ul className="nav nav-tabs tabs-bordered d-flex nav-justified px-3" role="tablist">
	<li role="presentation" className="fs-12"><a href="#chats" aria-controls="chats" className="active show" role="tab" data-toggle="tab"> Chats </a></li>
	<li role="presentation" className="fs-12"><a href="#groups" aria-controls="groups" role="tab" data-toggle="tab"> Groups </a></li>
	<li role="presentation" className="fs-12"><a href="#contacts" aria-controls="contacts" role="tab" data-toggle="tab"> Contacts </a></li>
	</ul>
	<div className="tab-content">
	<div role="tabpanel" className="tab-pane active show fade in" id="chats">
	<ul className="ms-scrollable ms-quickbar-container">
	<li className="ms-chat-user-container ms-open-chat ms-deletable p-3 media clearfix">
	<div className="ms-chat-status ms-status-away ms-has-new-msg ms-chat-img mr-3 align-self-center">
	<span className="msg-count">3</span>
	<img src="https://via.placeholder.com/270x270" className="ms-img-round" alt="people" />
	</div>
	<div className="media-body ms-chat-user-info mt-1">
	<h6>James Zathila</h6> <span className="ms-chat-time">2 Hours ago</span>
	<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In in arcu turpis. Nunc</p>
	<i className="flaticon-trash ms-delete-trigger"> </i>
	</div>
	</li>
	<li className="ms-chat-user-container ms-open-chat ms-deletable p-3 media clearfix">
	<div className="ms-chat-status ms-status-online ms-chat-img mr-3 align-self-center">
	<img src="https://via.placeholder.com/270x270" className="ms-img-round" alt="people" />
	</div>
	<div className="media-body ms-chat-user-info mt-1">
	<h6>Raymart Sandiago</h6> <span className="ms-chat-time">3 Hours ago</span>
	<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In in arcu turpis. Nunc</p>
	<i className="flaticon-trash ms-delete-trigger"> </i>
	</div>
	</li>
	<li className="ms-chat-user-container ms-open-chat ms-deletable p-3 media clearfix">
	<div className="ms-chat-status ms-status-offline ms-chat-img mr-3 align-self-center">
	<img src="https://via.placeholder.com/270x270" className="ms-img-round" alt="people" />
	</div>
	<div className="media-body ms-chat-user-info mt-1">
	<h6>Heather Brown</h6> <span className="ms-chat-time">12 Hours ago</span>
	<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In in arcu turpis. Nunc</p>
	<i className="flaticon-trash ms-delete-trigger"> </i>
	</div>
	</li>
	<li className="ms-chat-user-container ms-open-chat ms-deletable p-3 media clearfix">
	<div className="ms-chat-status ms-status-busy ms-chat-img mr-3 align-self-center">
	<img src="https://via.placeholder.com/270x270" className="ms-img-round" alt="people" />
	</div>
	<div className="media-body ms-chat-user-info mt-1">
	<h6>Micheal John</h6> <span className="ms-chat-time">Yesterday</span>
	<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In in arcu turpis. Nunc</p>
	<i className="flaticon-trash ms-delete-trigger"> </i>
	</div>
	</li>
	<li className="ms-chat-user-container ms-open-chat ms-deletable p-3 media clearfix">
	<div className="ms-chat-status ms-status-online ms-chat-img mr-3 align-self-center">
	<img src="https://via.placeholder.com/270x270" className="ms-img-round" alt="people" />
	</div>
	<div className="media-body ms-chat-user-info mt-1">
	<h6>John Doe</h6> <span className="ms-chat-time">3 Days ago</span>
	<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In in arcu turpis. Nunc</p>
	<i className="flaticon-trash ms-delete-trigger"> </i>
	</div>
	</li>
	</ul>
	</div>
	<div role="tabpanel" className="tab-pane fade" id="groups">
	<ul className="ms-scrollable ms-quickbar-container">
	<li className="ms-chat-user-container ms-open-chat p-3 media clearfix">
	<div className="ms-chat-img mr-3 align-self-center">
	<img src="https://via.placeholder.com/270x270" className="ms-img-round" alt="people" />
	</div>
	<div className="media-body ms-chat-user-info mt-1">
	<h6>James Zathila</h6> <a href="#" className="ms-chat-time"> <i className="flaticon-chat" /> </a>
	<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In in arcu turpis. Nunc</p>
	<ul className="ms-group-members clearfix mt-3 mb-0">
	<li> <img src="https://via.placeholder.com/270x270" alt="member" /> </li>
	<li> <img src="https://via.placeholder.com/270x270" alt="member" /> </li>
	<li> <img src="https://via.placeholder.com/270x270" alt="member" /> </li>
	<li className="ms-group-count"> + 12 more </li>
	</ul>
	</div>
	</li>
	<li className="ms-chat-user-container ms-open-chat p-3 media clearfix">
	<div className="ms-chat-img mr-3 align-self-center">
	<img src="https://via.placeholder.com/270x270" className="ms-img-round" alt="people" />
	</div>
	<div className="media-body ms-chat-user-info mt-1">
	<h6>Raymart Sandiago</h6> <a href="#" className="ms-chat-time"> <i className="flaticon-chat" /> </a>
	<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In in arcu turpis. Nunc</p>
	<ul className="ms-group-members clearfix mt-3 mb-0">
	<li> <img src="https://via.placeholder.com/270x270" alt="member" /> </li>
	<li> <img src="https://via.placeholder.com/270x270" alt="member" /> </li>
	</ul>
	</div>
	</li>
	<li className="ms-chat-user-container ms-open-chat p-3 media clearfix">
	<div className="ms-chat-img mr-3 align-self-center">
	<img src="https://via.placeholder.com/270x270" className="ms-img-round" alt="people" />
	</div>
	<div className="media-body ms-chat-user-info mt-1">
	<h6>John Doe</h6> <a href="#" className="ms-chat-time"> <i className="flaticon-chat" /> </a>
	<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In in arcu turpis. Nunc</p>
	<ul className="ms-group-members clearfix mt-3 mb-0">
	<li> <img src="https://via.placeholder.com/270x270" alt="member" /> </li>
	<li> <img src="https://via.placeholder.com/270x270" alt="member" /> </li>
	<li> <img src="https://via.placeholder.com/270x270" alt="member" /> </li>
	<li className="ms-group-count"> + 4 more </li>
	</ul>
	</div>
	</li>
	</ul>
	</div>
	<div role="tabpanel" className="tab-pane fade" id="contacts">
	<ul className="ms-scrollable ms-quickbar-container">
	<li className="ms-chat-user-container ms-open-chat p-3 media clearfix">
	<div className="ms-chat-img mr-3 align-self-center">
	<img src="https://via.placeholder.com/270x270" className="ms-img-round" alt="people" />
	</div>
	<div className="media-body ms-chat-user-info mt-1">
	<h6>John Doe</h6> <a href="#" className="ms-chat-time"> <i className="flaticon-chat" /> </a>
	<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In in arcu turpis. Nunc</p>
	</div>
	</li>
	<li className="ms-chat-user-container ms-open-chat p-3 media clearfix">
	<div className="ms-chat-img mr-3 align-self-center">
	<img src="https://via.placeholder.com/270x270" className="ms-img-round" alt="people" />
	</div>
	<div className="media-body ms-chat-user-info mt-1">
	<h6>Raymart Sandiago</h6> <a href="#" className="ms-chat-time"> <i className="flaticon-chat" /> </a>
	<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In in arcu turpis. Nunc</p>
	</div>
	</li>
	<li className="ms-chat-user-container ms-open-chat p-3 media clearfix">
	<div className="ms-chat-img mr-3 align-self-center">
	<img src="https://via.placeholder.com/270x270" className="ms-img-round" alt="people" />
	</div>
	<div className="media-body ms-chat-user-info mt-1">
	<h6>Micheal John</h6> <a href="#" className="ms-chat-time"> <i className="flaticon-chat" /> </a>
	<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In in arcu turpis. Nunc</p>
	</div>
	</li>
	<li className="ms-chat-user-container ms-open-chat p-3 media clearfix">
	<div className="ms-chat-img mr-3 align-self-center">
	<img src="https://via.placeholder.com/270x270" className="ms-img-round" alt="people" />
	</div>
	<div className="media-body ms-chat-user-info mt-1">
	<h6>Heather Brown</h6> <a href="#" className="ms-chat-time"> <i className="flaticon-chat" /> </a>
	<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In in arcu turpis. Nunc</p>
	</div>
	</li>
	<li className="ms-chat-user-container ms-open-chat p-3 media clearfix">
	<div className="ms-chat-img mr-3 align-self-center">
	<img src="https://via.placeholder.com/270x270" className="ms-img-round" alt="people" />
	</div>
	<div className="media-body ms-chat-user-info mt-1">
	<h6>Mila Freign</h6> <a href="#" className="ms-chat-time"> <i className="flaticon-chat" /> </a>
	<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In in arcu turpis. Nunc</p>
	</div>
	</li>
	<li className="ms-chat-user-container ms-open-chat p-3 media clearfix">
	<div className="ms-chat-img mr-3 align-self-center">
	<img src="https://via.placeholder.com/270x270" className="ms-img-round" alt="people" />
	</div>
	<div className="media-body ms-chat-user-info mt-1">
	<h6>James Zathila</h6> <a href="#" className="ms-chat-time"> <i className="flaticon-chat" /> </a>
	<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In in arcu turpis. Nunc</p>
	</div>
	</li>
	</ul>
	</div>
	</div>
	</div>
	</div>
	</div>
	<div role="tabpanel" className="tab-pane" id="qa-email">
	<div className="ms-email-container">
	<div className="ms-qa-options">
	<a href="#" className="btn btn-primary w-100 mt-0 has-icon"> <i className="flaticon-pencil" /> Compose Email </a>
	</div>
	<ul className="ms-scrollable ms-quickbar-container">
	<li className="p-3  media ms-email clearfix">
	<div className="ms-email-img mr-3 ">
	<img src="https://via.placeholder.com/270x270" className="ms-img-round" alt="people" />
	</div>
	<div className="media-body ms-email-details">
	<span className="ms-email-sender">James Zathila</span>
	<h6 className="ms-email-subject">[WordPress] New Comment</h6> <span className="ms-email-time">2 Hours ago</span>
	<p className="ms-email-msg">Lorem ipsum dolor sit amet, consectetur adipiscing elit. In in arcu turpis. Nunc</p>
	</div>
	</li>
	<li className="p-3  media ms-email clearfix">
	<div className="ms-email-img mr-3 ">
	<img src="https://via.placeholder.com/270x270" className="ms-img-round" alt="people" />
	</div>
	<div className="media-body ms-email-details">
	<span className="ms-email-sender">John Doe</span>
	<h6 className="ms-email-subject">[WordPress] New Comment</h6> <span className="ms-email-time">8 Hours ago</span>
	<p className="ms-email-msg">Lorem ipsum dolor sit amet, consectetur adipiscing elit. In in arcu turpis. Nunc</p>
	</div>
	</li>
	<li className="p-3  media ms-email clearfix">
	<div className="ms-email-img mr-3 ">
	<img src="https://via.placeholder.com/270x270" className="ms-img-round" alt="people" />
	</div>
	<div className="media-body ms-email-details">
	<span className="ms-email-sender">Heather Brown</span>
	<h6 className="ms-email-subject">[WordPress] New Comment</h6> <span className="ms-email-time">1 Day ago</span>
	<p className="ms-email-msg">Lorem ipsum dolor sit amet, consectetur adipiscing elit. In in arcu turpis. Nunc</p>
	</div>
	</li>
	</ul>
	</div>
	</div>
	<div role="tabpanel" className="tab-pane" id="qa-toDo">
	<div className="ms-quickbar-container ms-todo-list-container ms-scrollable">
	<form className="ms-add-task-block">
	<div className="form-group mx-3 mt-0  fs-14 clearfix">
	<input type="text" className="form-control fs-14 float-left" id="task-block" name="todo-block" placeholder="Add Task Block" defaultValue />
	<button type="submit" className="ms-btn-icon bg-primary float-right"><i className="material-icons text-disabled">add</i></button>
	</div>
	</form>
	<ul className="ms-todo-list">
	<li className="ms-card ms-qa-card ms-deletable">
	<div className="ms-card-header clearfix">
	<h6 className="ms-card-title">Task Block Title</h6>
	<button data-toggle="tooltip" data-placement="left" title="Add a Task to this block" className="ms-add-task-to-block ms-btn-icon float-right"> <i className="material-icons text-disabled">add</i> </button>
	</div>
	<div className="ms-card-body">
	<ul className="ms-list ms-task-block">
	<li className="ms-list-item ms-to-do-task ms-deletable">
	<label className="ms-checkbox-wrap ms-todo-complete">
	<input type="checkbox" defaultValue />
	<i className="ms-checkbox-check" />
	</label>
	<span> Task to do </span>
	<button type="submit" className="close"><i className="flaticon-trash ms-delete-trigger"> </i></button>
	</li>
	<li className="ms-list-item ms-to-do-task ms-deletable">
	<label className="ms-checkbox-wrap ms-todo-complete">
	<input type="checkbox" defaultValue />
	<i className="ms-checkbox-check" />
	</label>
	<span>Task to do</span>
	<button type="submit" className="close"><i className="flaticon-trash ms-delete-trigger"> </i></button>
	</li>
	</ul>
	</div>
	<div className="ms-card-footer clearfix">
	<a href="#" className="text-disabled mr-2"> <i className="flaticon-archive"> </i> Archive </a>
	<a href="#" className="text-disabled  ms-delete-trigger float-right"> <i className="flaticon-trash"> </i> Delete </a>
	</div>
	</li>
	</ul>
	</div>
	</div>
	<div role="tabpanel" className="tab-pane" id="qa-reminder">
	<div className="ms-quickbar-container ms-reminders">
	<ul className="ms-qa-options">
	<li> <a href="#" data-toggle="modal" data-target="#reminder-modal"> <i className="flaticon-bell" /> New Reminder </a> </li>
	</ul>
	<div className="ms-quickbar-container ms-scrollable">
	<div className="ms-card ms-qa-card ms-deletable">
	<div className="ms-card-body">
	<p> Developer Meeting in Block B </p>
	<span className="text-disabled fs-12"><i className="material-icons fs-14">access_time</i> Today - 3:45 pm</span>
	</div>
	<div className="ms-card-footer clearfix">
	<div className="ms-note-editor float-right">
	<a href="#" className="text-disabled mr-2" data-toggle="modal" data-target="#reminder-modal"> <i className="flaticon-pencil"> </i> Edit </a>
	<a href="#" className="text-disabled  ms-delete-trigger"> <i className="flaticon-trash"> </i> Delete </a>
	</div>
	</div>
	</div>
	<div className="ms-card ms-qa-card ms-deletable">
	<div className="ms-card-body">
	<p> Start adding change log to version 2 </p>
	<span className="text-disabled fs-12"><i className="material-icons fs-14">access_time</i> Tomorrow - 12:00 pm</span>
	</div>
	<div className="ms-card-footer clearfix">
	<div className="ms-note-editor float-right">
	<a href="#" className="text-disabled mr-2" data-toggle="modal" data-target="#reminder-modal"> <i className="flaticon-pencil"> </i> Edit </a>
	<a href="#" className="text-disabled  ms-delete-trigger"> <i className="flaticon-trash"> </i> Delete </a>
	</div>
	</div>
	</div>
	</div>
	</div>
	</div>
	<div role="tabpanel" className="tab-pane" id="qa-notes">
	<ul className="ms-qa-options">
	<li> <a href="#" data-toggle="modal" data-target="#notes-modal"> <i className="flaticon-sticky-note" /> New Note </a> </li>
	<li> <a href="#"> <i className="flaticon-excel" /> Export to Excel </a> </li>
	</ul>
	<div className="ms-quickbar-container ms-scrollable">
	<div className="ms-card ms-qa-card ms-deletable">
	<div className="ms-card-header">
	<h6 className="ms-card-title">Don't forget to check with the Manager</h6>
	</div>
	<div className="ms-card-body">
	<p>
	Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam vulputate urna in faucibus venenatis. Etiam at dapibus neque,
	vel varius metus. Pellentesque eget orci malesuada, venenatis magna et
	</p>
	<ul className="ms-note-members clearfix mb-0">
	<li className="ms-deletable"> <img src="https://via.placeholder.com/270x270" alt="member" /> </li>
	<li className="ms-deletable"> <img src="https://via.placeholder.com/270x270" alt="member" /> </li>
	</ul>
	</div>
	<div className="ms-card-footer clearfix">
	<div className="dropdown float-left">
	<a href="#" className="text-disabled" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
	<i className="flaticon-share-1" /> Share
	</a>
	<ul className="dropdown-menu">
	<li className="dropdown-menu-header">
	<h6 className="dropdown-header ms-inline m-0"><span className="text-disabled">Share With</span></h6>
	</li>
	<li className="dropdown-divider" />
	<li className="ms-scrollable ms-dropdown-list ms-members-list">
	<a className="media p-2" href="#">
	<div className="mr-2 align-self-center">
	<img src="https://via.placeholder.com/270x270" className="ms-img-round" alt="people" />
	</div>
	<div className="media-body">
	<span>John Doe</span>
	</div>
	</a>
	<a className="media p-2" href="#">
	<div className="mr-2 align-self-center">
	<img src="https://via.placeholder.com/270x270" className="ms-img-round" alt="people" />
	</div>
	<div className="media-body">
	<span>Raymart Sandiago</span>
	</div>
	</a>
	<a className="media p-2" href="#">
	<div className="mr-2 align-self-center">
	<img src="https://via.placeholder.com/270x270" className="ms-img-round" alt="people" />
	</div>
	<div className="media-body">
	<span>Heather Brown</span>
	</div>
	</a>
	</li>
	</ul>
	</div>
	<div className="ms-note-editor float-right">
	<a href="#" className="text-disabled mr-2" data-toggle="modal" data-target="#notes-modal"> <i className="flaticon-pencil"> </i> Edit </a>
	<a href="#" className="text-disabled  ms-delete-trigger"> <i className="flaticon-trash"> </i> Delete </a>
	</div>
	</div>
	</div>
	<div className="ms-card ms-qa-card ms-deletable">
	<div className="ms-card-header">
	<h6 className="ms-card-title">Perform the required unit tests</h6>
	</div>
	<div className="ms-card-body">
	<p>
	Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam vulputate urna in faucibus venenatis. Etiam at dapibus neque,
	vel varius metus. Pellentesque eget orci malesuada, venenatis magna et
	</p>
	<ul className="ms-note-members clearfix mb-0">
	<li className="ms-deletable"> <img src="https://via.placeholder.com/270x270" alt="member" /> </li>
	</ul>
	</div>
	<div className="ms-card-footer clearfix">
	<div className="dropdown float-left">
	<a href="#" className="text-disabled" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
	<i className="flaticon-share-1" /> Share
	</a>
	<ul className="dropdown-menu">
	<li className="dropdown-menu-header">
	<h6 className="dropdown-header ms-inline m-0"><span className="text-disabled">Share With</span></h6>
	</li>
	<li className="dropdown-divider" />
	<li className="ms-scrollable ms-dropdown-list ms-members-list">
	<a className="media p-2" href="#">
	<div className="mr-2 align-self-center">
	<img src="https://via.placeholder.com/270x270" className="ms-img-round" alt="people" />
	</div>
	<div className="media-body">
	<span>John Doe</span>
	</div>
	</a>
	<a className="media p-2" href="#">
	<div className="mr-2 align-self-center">
	<img src="https://via.placeholder.com/270x270" className="ms-img-round" alt="people" />
	</div>
	<div className="media-body">
	<span>Raymart Sandiago</span>
	</div>
	</a>
	<a className="media p-2" href="#">
	<div className="mr-2 align-self-center">
	<img src="https://via.placeholder.com/270x270" className="ms-img-round" alt="people" />
	</div>
	<div className="media-body">
	<span>Heather Brown</span>
	</div>
	</a>
	</li>
	</ul>
	</div>
	<div className="ms-note-editor float-right">
	<a href="#" className="text-disabled mr-2" data-toggle="modal" data-target="#notes-modal"> <i className="flaticon-pencil"> </i> Edit </a>
	<a href="#" className="text-disabled  ms-delete-trigger"> <i className="flaticon-trash"> </i> Delete </a>
	</div>
	</div>
	</div>
	</div>
	</div>
	<div role="tabpanel" className="tab-pane" id="qa-invite">
	<div className="ms-quickbar-container text-center ms-invite-member">
	<i className="flaticon-network" />
	<p>Invite Team Members</p>
	<form>
	<div className="ms-form-group">
	<input type="text" placeholder="Member Email" className="form-control" name="invite-email" defaultValue />
	</div>
	<div className="ms-form-group">
	<button type="submit" name="invite-member" className="btn btn-primary w-100">Invite</button>
	</div>
	</form>
	</div>
	</div>
	</div>
	</div>
	</aside>
	<div>
{/* MODALS */}
{/* Reminder Modal */}
<div className="modal fade" id="reminder-modal" tabIndex={-1} role="dialog" aria-labelledby="reminder-modal">
<div className="modal-dialog modal-dialog-centered" role="document">
<div className="modal-content">
<div className="modal-header bg-secondary">
<h5 className="modal-title has-icon text-white"> New Reminder</h5>
<button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
</div>
<form>
<div className="modal-body">
<div className="ms-form-group">
<label>Remind me about</label>
<textarea className="form-control" name="reminder" defaultValue={""} />
</div>
<div className="ms-form-group">
<span className="ms-option-name fs-14">Repeat Daily</span>
<label className="ms-switch float-right">
<input type="checkbox" />
<span className="ms-switch-slider round" />
</label>
</div>
<div className="row">
<div className="col-md-6">
<div className="ms-form-group">
<input type="text" className="form-control datepicker" name="reminder-date" defaultValue />
</div>
</div>
<div className="col-md-6">
<div className="ms-form-group">
<select className="form-control" name="reminder-time">
<option value>12:00 pm</option>
<option value>1:00 pm</option>
<option value>2:00 pm</option>
<option value>3:00 pm</option>
<option value>4:00 pm</option>
</select>
</div>
</div>
</div>
</div>
<div className="modal-footer">
<button type="button" className="btn btn-light" data-dismiss="modal">Close</button>
<button type="button" className="btn btn-secondary shadow-none" data-dismiss="modal">Add Reminder</button>
</div>
</form>
</div>
</div>
</div>
{/* Notes Modal */}
<div className="modal fade" id="notes-modal" tabIndex={-1} role="dialog" aria-labelledby="notes-modal">
<div className="modal-dialog modal-dialog-centered" role="document">
<div className="modal-content">
<div className="modal-header bg-secondary">
<h5 className="modal-title has-icon text-white" id="NoteModal">New Note</h5>
<button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
</div>
<form>
<div className="modal-body">
<div className="ms-form-group">
<label>Note Title</label>
<input type="text" className="form-control" name="note-title" defaultValue />
</div>
<div className="ms-form-group">
<label>Note Description</label>
<textarea className="form-control" name="note-description" defaultValue={""} />
</div>
</div>
<div className="modal-footer">
<button type="button" className="btn btn-light" data-dismiss="modal">Close</button>
<button type="button" className="btn btn-secondary shadow-none" data-dismiss="modal">Add Note</button>
</div>
</form>
</div>
</div>
</div>
</div>
</div>

);
}

export default RightSidebar