import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class Footer extends Component {
	constructor()
	{
		super();
	}

	componentDidMount(){
    //An array of assets
    let scripts = [
    { src: "/backend/assets/js/jquery-3.3.1.min.js" },
    { src: "/backend/assets/js/popper.min.js"},
    { src: "/backend/assets/js/bootstrap.min.js" },
    { src: "/backend/assets/js/perfect-scrollbar.js" },
    { src: "/backend/assets/js/jquery-ui.min.js" },
    { src: "/backend/assets/js/moment.js" },
    { src: "/backend/assets/js/jquery.webticker.min.js" },
    { src: "/backend/assets/js/Chart.bundle.min.js" },
    // { src: "/backend/assets/js/Chart.Financial.js" },
    // { src: "/backend/assets/js/table-line.js" },
    // { src: "/backend/assets/js/index-chart.js" },
    { src: "/backend/assets/js/d3.v3.min.js" },
    { src: "/backend/assets/js/topojson.v1.min.js" },
    // { src: "/backend/assets/js/datamaps.all.min.js" },
    // { src: "/backend/assets/js/index-map.js" },
    { src: "/backend/assets/js/framework.js" },
    { src: "/backend/assets/js/settings.js" }

    ]
    //Append the script element on each iteration
    scripts.map(item => { 
    	const script = document.createElement("script")
    	script.async = true
    	script.src = item.src
    	document.body.appendChild(script)
    })    
}


render() {
	return (
		<div></div>
		);
}
}
