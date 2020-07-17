import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Link, Route, Switch} from 'react-router-dom';
import Topbar from './layouts/Topbar'
import Header from './layouts/Header'
import Footer from './layouts/Footer'
import Sidebar from './layouts/Sidebar'
import RightSidebar from './layouts/RightSidebar'
import Home from './Home'

class Index extends Component {
  render() {
    return (
        <div>
        <div id="preloader-wrap">
        <div className="spinner spinner-8">
        <div className="ms-circle1 ms-child" />
        <div className="ms-circle2 ms-child" />
        <div className="ms-circle3 ms-child" />
        <div className="ms-circle4 ms-child" />
        <div className="ms-circle5 ms-child" />
        <div className="ms-circle6 ms-child" />
        <div className="ms-circle7 ms-child" />
        <div className="ms-circle8 ms-child" />
        <div className="ms-circle9 ms-child" />
        <div className="ms-circle10 ms-child" />
        <div className="ms-circle11 ms-child" />
        <div className="ms-circle12 ms-child" />
        </div>
        </div>
    {/* Overlays */}
    <div className="ms-aside-overlay ms-overlay-left ms-toggler" data-target="#ms-side-nav" data-toggle="slideLeft" />
    <div className="ms-aside-overlay ms-overlay-right ms-toggler" data-target="#ms-recent-activity" data-toggle="slideRight" />
    <Sidebar/>
  <main className="body-content">
<Header/>
<Home/>
  </main>
    <RightSidebar/>
  <Footer/>
    </div>
    );
}
}
if ( document.getElementById('agent-app') ) {
    ReactDOM.render(<Index/>, document.getElementById('agent-app'));
}