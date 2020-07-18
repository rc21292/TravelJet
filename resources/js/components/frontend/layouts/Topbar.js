import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-router-dom';

function Topbar() {
  return (
    <div className="topbar">
      <div className="container">
        <ul className="list-inline">
          <li>Support:</li>
          <li><a href="tel:9971717045"><i className="fa fa-phone-square" /> &nbsp;9971 717 045</a>
          </li>
          <li>|</li>
          <li><a href="mailto:dailytravel360@gmail.com"><i className="fa fa-envelope-open" />&nbsp; dailytravel360@gmail.com</a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Topbar;
