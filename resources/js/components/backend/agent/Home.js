import React from 'react';
import ReactDOM from 'react-dom';

function Home() {
	return (
		<div className="ms-content-wrapper">
		<div className="row">
		<div className="col-xl-3 col-md-6">
		<div className="ms-card card-gradient-success ms-widget ms-infographics-widget">
		<div className="ms-card-body media">
		<div className="media-body">
		<h6>Total Orders</h6>
		<p className="ms-card-change"> <i className="material-icons">arrow_upward</i> 4567</p>
		<p className="fs-12">48% From Last 24 Hours</p>
		</div>
		</div>
		<i className="flaticon-archive" />
		</div>
		</div>
		<div className="col-xl-3 col-md-6">
		<div className="ms-card card-gradient-secondary ms-widget ms-infographics-widget">
		<div className="ms-card-body media">
		<div className="media-body">
		<h6>Compeleted Orders</h6>
		<p className="ms-card-change"> $80,950</p>
		<p className="fs-12">2% Decreased from last day</p>
		</div>
		</div>
		<i className="flaticon-supermarket" />
		</div>
		</div>
		<div className="col-xl-3 col-md-6">
		<div className="ms-card card-gradient-warning ms-widget ms-infographics-widget">
		<div className="ms-card-body media">
		<div className="media-body">
		<h6>Pending Orders</h6>
		<p className="ms-card-change"> <i className="material-icons">arrow_upward</i> 4567</p>
		<p className="fs-12">48% From Last 24 Hours</p>
		</div>
		</div>
		<i className="flaticon-reuse" />
		</div>
		</div>
		<div className="col-xl-3 col-md-6">
		<div className="ms-card card-gradient-info ms-widget ms-infographics-widget">
		<div className="ms-card-body pos media">
		<div className="media-body">
		<h6>Total Products</h6>
		<p className="ms-card-change"> $80,950</p>
		<p className="fs-12">2% Decreased from last week</p>
		</div>
		</div>
		<i className="fas fa-cannabis" />
		</div>
		</div>
		<div className="col-md-12 col-xl-6">
		<div className="ms-panel ms-panel-fh">
		<div className="ms-panel-header ms-panel-custom align-items-center">
		<h6>Orders Graph</h6>
		<ul className="nav nav-tabs d-flex nav-justified mb-0" role="tablist">
		<li><a href="#tab13" aria-controls="tab13" className=" pb-0" role="tab" data-toggle="tab" aria-selected="false"><i className="fas fa-chart-bar fa-2x " /></a></li>
		<li><a href="#tab14" aria-controls="tab14" role="tab" data-toggle="tab" className="active pb-0 show" aria-selected="true"><i className="fas fa-chart-line fa-2x " /> </a></li>
		</ul>
		</div>
		<div className="ms-panel-body clearfix">
		<div className="tab-content">
		<div role="tabpanel" className="tab-pane fade in" id="tab13">
		<div className="ms-panel-body">
		<canvas id="bar-chart" />
		</div>
		</div>
		<div role="tabpanel" className="tab-pane fade active show" id="tab14">
		<div className="ms-panel-body">
		<canvas id="line-chart" />
		</div>
		</div>
		<div role="tabpanel" className="tab-pane fade" id="tab15">
		</div>
		</div>
		</div>
		</div>
		</div>
		<div className="col-xl-6 col-md-12">
		<div className="ms-panel ms-panel-fh ms-crypto-orders">
		<div className="ms-panel-header">
		<div className="d-flex justify-content-between">
		<div className="ms-header-text">
		<h6>Current Sales</h6>
		<p>Manage your current sale and buy orders</p>
		</div>
		<ul className="btn-group btn-group-toggle nav nav-tabs ms-graph-metrics" role="tablist">
		<li role="presentation"><a href="#b-orders" aria-controls="b-orders" className="btn btn-sm active show" role="tab" data-toggle="tab" aria-selected="true"> Buy Orders </a></li>
		<li role="presentation"><a href="#s-orders" aria-controls="s-orders" className="btn btn-sm" role="tab" data-toggle="tab" aria-selected="false"> Sell Orders </a></li>
		</ul>
		</div>
		</div>
		<div className="ms-panel-body p-0">
		<div className="tab-content">
		<div role="tabpanel" className="tab-pane fade in active show" id="b-orders">
		<div className="table-responsive">
		<table className="table table-hover thead-light">
		<thead>
		<tr>
		<th scope="col">Price ($)</th>
		<th scope="col">Amount</th>
		<th scope="col">Track ID</th>
		<th scope="col">Date</th>
		</tr>
		</thead>
		<tbody>
		<tr>
		<td>$7860.24</td>
		<td><i className="fas fa-dollar-sign BTC" />0.528</td>
		<td>#TR34351</td>
		<td>12.01.2019</td>
		</tr>
		<tr>
		<td>$5813.44</td>
		<td><i className="fas fa-pound-sign ETH" />0.345</td>
		<td>#TR34351</td>
		<td>12.01.2019</td>
		</tr>
		<tr>
		<td>$1264.99</td>
		<td><i className="fas fa-dollar-sign BTC" /> 0.117</td>
		<td>#TR34351</td>
		<td>12.01.2019</td>
		</tr>
		<tr>
		<td>$3789.31</td>
		<td><i className="fas fa-euro-sign PPC-alt" />0.217</td>
		<td>#TR34351</td>
		<td>12.01.2019</td>
		</tr>
		<tr>
		<td>$7860.24</td>
		<td><i className="fas fa-dollar-sign BTC" />0.528</td>
		<td>#TR34351</td>
		<td>12.01.2019</td>
		</tr>
		<tr>
		<td>$7860.24</td>
		<td><i className="fas fa-dollar-sign BTC" />0.528</td>
		<td>#TR34351</td>
		<td>12.01.2019</td>
		</tr>
		<tr>
		<td>$7860.24</td>
		<td><i className="fas fa-dollar-sign BTC" />0.528</td>
		<td>#TR34351</td>
		<td>12.01.2019</td>
		</tr>
		<tr>
		<td>$5813.44</td>
		<td><i className="fas fa-pound-sign ETH" />0.345</td>
		<td>#TR34351</td>
		<td>12.01.2019</td>
		</tr>
		</tbody>
		</table>
		</div>
		</div>
		<div role="tabpanel" className="tab-pane fade" id="s-orders">
		<div className="table-responsive">
		<table className="table table-hover">
		<thead>
		<tr>
		<th scope="col">Price ($)</th>
		<th scope="col">Amount</th>
		<th scope="col">Track ID</th>
		<th scope="col">Date</th>
		</tr>
		</thead>
		<tbody>
		<tr>
		<td>$7860.24</td>
		<td><i className="fas fa-dollar-sign BTC" />0.528</td>
		<td>#TR34351</td>
		<td>12.01.2019</td>
		</tr>
		<tr>
		<td>$5813.44</td>
		<td><i className="fas fa-pound-sign ETH" />0.345</td>
		<td>#TR34351</td>
		<td>12.01.2019</td>
		</tr>
		<tr>
		<td>$1264.99</td>
		<td><i className="fas fa-dollar-sign BTC" /> 0.117</td>
		<td>#TR34351</td>
		<td>12.01.2019</td>
		</tr>
		<tr>
		<td>$3789.31</td>
		<td><i className="fas fa-euro-sign PPC-alt" />0.217</td>
		<td>#TR34351</td>
		<td>12.01.2019</td>
		</tr>
		<tr>
		<td>$7860.24</td>
		<td><i className="fas fa-dollar-sign BTC" />0.528</td>
		<td>#TR34351</td>
		<td>12.01.2019</td>
		</tr>
		<tr>
		<td>$7860.24</td>
		<td><i className="fas fa-dollar-sign BTC" />0.528</td>
		<td>#TR34351</td>
		<td>12.01.2019</td>
		</tr>
		<tr>
		<td>$7860.24</td>
		<td><i className="fas fa-dollar-sign BTC" />0.528</td>
		<td>#TR34351</td>
		<td>12.01.2019</td>
		</tr>
		<tr>
		<td>$5813.44</td>
		<td><i className="fas fa-pound-sign ETH" />0.345</td>
		<td>#TR34351</td>
		<td>12.01.2019</td>
		</tr>
		</tbody>
		</table>
		</div>
		</div>
		</div>
		</div>
		</div>
		</div>
		<div className="col-xl-12 col-md-12">
		<div className="ms-panel">
		<div className="ms-panel-header ms-panel-custom ">
		<div className="ms-heading">
		<h6>Top Sallers Products</h6>
		<p>Lorem Ipsum is simply dummy text of the printing</p>
		</div>
		</div>
		<div className="ms-panel-body">
		<div className="table-responsive">
		<table className="table table-hover thead-primary">
		<thead>
		<tr>
		<th>Product Name</th>
		<th>Avalability</th>
		<th>Last Purchase</th>
		<th>Ratings</th>
		<th>Price</th>
		<th>Total Orders</th>
		</tr>
		</thead>
		<tbody>
		<tr>
		<td className="ms-table-f-w"> <img src="https://via.placeholder.com/270x270" alt="people" /> <a href="#">White Widow </a></td>
		<td><span className="badge badge-success">In Stock</span></td>
		<td>26-10-2019</td>
		<td>
		<ul className="ms-star-rating rating-fill mb-0 rating-circle heart-rating">
		<li className="ms-rating-item rating-custome"> <i className="material-icons">star</i> </li>
		<li className="ms-rating-item rating-custome rated"> <i className="material-icons">star</i> </li>
		<li className="ms-rating-item rating-custome rated"> <i className="material-icons">star</i> </li>
		<li className="ms-rating-item rating-custome rated"> <i className="material-icons">star</i> </li>
		<li className="ms-rating-item rating-custome rated"> <i className="material-icons">star</i> </li>
		</ul>
		</td>
		<td>$450.50</td>
		<td>752</td>
		</tr>
		<tr>
		<td className="ms-table-f-w"> <img src="https://via.placeholder.com/270x270" alt="people" /> <a href="#">Super Sunk </a></td>
		<td><span className="badge badge-success">In Stock</span></td>
		<td>27-10-2019</td>
		<td>
		<ul className="ms-star-rating mb-0 rating-fill rating-circle heart-rating">
		<li className="ms-rating-item rating-custome"> <i className="material-icons">star</i> </li>
		<li className="ms-rating-item rating-custome rated"> <i className="material-icons">star</i> </li>
		<li className="ms-rating-item rating-custome rated"> <i className="material-icons">star</i> </li>
		<li className="ms-rating-item rating-custome rated"> <i className="material-icons">star</i> </li>
		<li className="ms-rating-item rating-custome rated"> <i className="material-icons">star</i> </li>
		</ul>
		</td>
		<td>$350.50</td>
		<td>365</td>
		</tr>
		<tr>
		<td className="ms-table-f-w"> <img src="https://via.placeholder.com/270x270" alt="people" /><a href="#">Low Rider</a></td>
		<td><span className="badge badge-danger">Out Of Stock</span></td>
		<td>28-10-2019</td>
		<td>
		<ul className="ms-star-rating mb-0 rating-fill rating-circle heart-rating">
		<li className="ms-rating-item rating-custome"> <i className="material-icons">star</i> </li>
		<li className="ms-rating-item  rating-custome rated"> <i className="material-icons">star</i> </li>
		<li className="ms-rating-item  rating-custome rated"> <i className="material-icons">star</i> </li>
		<li className="ms-rating-item  rating-custome rated"> <i className="material-icons">star</i> </li>
		<li className="ms-rating-item rating-custome rated"> <i className="material-icons">star</i> </li>
		</ul>
		</td>
		<td>$550.50</td>
		<td>165</td>
		</tr>
		</tbody>
		</table>
		</div>
		</div>
		</div>
		</div>
		<div className="col-xl-8 col-md-12">
		<div className="ms-panel">
		<div className="ms-panel-header  ms-panel-custom">
		<div className="ms-heading">
		<h6>Product Ratings</h6>
		<p>Lorem Ipsum is simply dummy text of the printing</p>
		</div>
		</div>
		<div className="ms-panel-body">
		<div className="table-responsive">
		<table className="table table-hover thead-primary">
		<thead>
		<tr>
		<th>Product Name</th>
		<th>Product Ratings</th>
		<th>Total Order </th>
		<th>Repeat Order</th>
		</tr>
		</thead>
		<tbody>
		<tr>
		<td className="ms-table-f-w"> <img src="https://via.placeholder.com/270x270" alt="people" /><a href="#">White Widow</a> </td>
		<td>
		<ul className="ms-star-rating mb-0 rating-fill rating-circle heart-rating">
		<li className="ms-rating-item rating-custome"> <i className="material-icons">star</i> </li>
		<li className="ms-rating-item  rating-custome rated"> <i className="material-icons">star</i> </li>
		<li className="ms-rating-item rating-custome rated"> <i className="material-icons">star</i> </li>
		<li className="ms-rating-item rating-custome  rated"> <i className="material-icons">star</i> </li>
		<li className="ms-rating-item rating-custome rated"> <i className="material-icons">star</i> </li>
		</ul>
		</td>
		<td>245</td>
		<td>45</td>
		</tr>
		<tr>
		<td className="ms-table-f-w"> <img src="https://via.placeholder.com/270x270" alt="people" /><a href="#">Super Skunk</a></td>
		<td>
		<ul className="ms-star-rating mb-0 rating-fill rating-circle heart-rating">
		<li className="ms-rating-item rating-custome"> <i className="material-icons">star</i> </li>
		<li className="ms-rating-item rated rating-custome"> <i className="material-icons">star</i> </li>
		<li className="ms-rating-item rated rating-custome"> <i className="material-icons">star</i> </li>
		<li className="ms-rating-item rated rating-custome"> <i className="material-icons">star</i> </li>
		<li className="ms-rating-item rated rating-custome"> <i className="material-icons">star</i> </li>
		</ul>
		</td>
		<td>546</td>
		<td>146</td>
		</tr>
		<tr>
		<td className="ms-table-f-w"> <img src="https://via.placeholder.com/270x270" alt="people" /> <a href="#">Low Rider</a> </td>
		<td>
		<ul className="ms-star-rating mb-0 rating-fill rating-circle heart-rating">
		<li className="ms-rating-item rating-custome"> <i className="material-icons">star</i> </li>
		<li className="ms-rating-item rated rating-custome"> <i className="material-icons">star</i> </li>
		<li className="ms-rating-item rated rating-custome"> <i className="material-icons">star</i> </li>
		<li className="ms-rating-item rated rating-custome"> <i className="material-icons">star</i> </li>
		<li className="ms-rating-item rated rating-custome"> <i className="material-icons">star</i> </li>
		</ul>
		</td>
		<td>365</td>
		<td>265</td>
		</tr>
		</tbody>
		</table>
		</div>
		</div>
		</div>
		</div>
		<div className="col-xl-4 col-md-12">
		<div className="ms-panel ms-panel-fh">
		<div className="ms-panel-header">
		<h6>Social Media Followers</h6>
		</div>
		<div className="ms-panel-body p-0">
		<div className="ms-social-media-followers">
		<div className="ms-social-grid">
		<i className="fab fa-linkedin-in bg-linkedin" />
		<p className="ms-text-dark">8,033</p>
		<span>Followers</span>
		</div>
		<div className="ms-social-grid">
		<i className="fab fa-twitter bg-twitter" />
		<p className="ms-text-dark">8,039</p>
		<span>Followers</span>
		</div>
		</div>
		<div className="ms-social-media-followers">
		<div className="ms-social-grid">
		<i className="fab fa-facebook-f bg-facebook" />
		<p className="ms-text-dark">8,039</p>
		<span>Likes</span>
		</div>
		<div className="ms-social-grid">
		<i className="fab fa-instagram bg-instagram" />
		<p className="ms-text-dark">98,039</p>
		<span>Followers</span>
		</div>
		</div>
		</div>
		</div>
		</div>
	{/* Active Orders Graph */}
{/* Orders Table Expanded */}
<div className="col-md-12">
<div className="ms-panel ms-crypto-orders-expanded">
<div className="ms-panel-header">
<div className="d-flex justify-content-between">
<div className="ms-header-text">
<h6>Order History</h6>
<p>Track your active orders</p>
</div>
</div>
</div>
<div className="ms-panel-body p-0">
<div className="table-responsive">
<table className="table table-hover thead-primary ">
<thead>
<tr>
<th scope="col">Date</th>
<th scope="col">Name</th>
<th scope="col">Product ID</th>
<th scope="col">Amount</th>
<th scope="col">Category</th>
<th scope="col">Orders</th>
<th scope="col">Repeats</th>
</tr>
</thead>
<tbody>
<tr>
<td>12.01.2019</td>
<td>Hemp Oil</td>
<td>#TR137381</td>
<td>$900.50</td>
<td> Oil </td>
<td className="ms-trend"> <canvas id="trend-01" /> </td>
<td>$5.85</td>
</tr>
<tr>
<td>11.01.2019</td>
<td>Gummy Bears</td>
<td>#TR371893</td>
<td>$335.50</td>
<td> Edibles </td>
<td className="ms-trend"> <canvas id="trend-02" /> </td>
<td>$5.85</td>
</tr>
<tr>
<td>10.01.2019</td>
<td>Mango Kush</td>
<td>#TR137381</td>
<td>$378.50</td>
<td> Plants </td>
<td className="ms-trend"> <canvas id="trend-03" /> </td>
<td>$5.85</td>
</tr>
<tr>
<td>09.01.2019</td>
<td>Purple Haze</td>
<td>#TR371893</td>
<td>$219.30</td>
<td> FLowers</td>
<td className="ms-trend"> <canvas id="trend-04" /> </td>
<td>$5.85</td>
</tr>
<tr>
<td>08.01.2019</td>
<td>UK Cheese</td>
<td>#TR137381</td>
<td>$438.50</td>
<td>Leafs</td>
<td className="ms-trend"> <canvas id="trend-05" /> </td>
<td>$5.85</td>
</tr>
</tbody>
</table>
</div>
</div>
</div>
</div>
<div className="col-md-12 col-xl-4 ">
<div className="ms-panel ms-panel-fh">
<div className="ms-panel-header">
<h6>Total Revenue </h6>
</div>
<div className="ms-panel-body">
<span className="progress-label bold">Weekly Earnings</span>
<div className="progress">
<div className="progress-bar bg-primary" role="progressbar" style={{width: '55%'}} aria-valuenow={55} aria-valuemin={0} aria-valuemax={100}>55%</div>
</div>
<span className="progress-label  bold">Monthly Earnings</span>
<div className="progress">
<div className="progress-bar bg-dark" role="progressbar" style={{width: '25%'}} aria-valuenow={25} aria-valuemin={0} aria-valuemax={100}>25%</div>
</div>
<span className="progress-label  bold">Quaterly Earnings</span>
<div className="progress">
<div className="progress-bar bg-primary" role="progressbar" style={{width: '20%'}} aria-valuenow={20} aria-valuemin={0} aria-valuemax={100}>20%</div>
</div>
<span className="progress-label  bold">Yearly Earnings</span>
<div className="progress">
<div className="progress-bar bg-dark" role="progressbar" style={{width: '60%'}} aria-valuenow={60} aria-valuemin={0} aria-valuemax={100}>60%</div>
</div>
</div>
</div>
</div>
<div className="col-xl-8 col-md-12">
<div className="ms-panel ms-panel-fh">
<div className="ms-panel-header header-mini">
<h6>Average Users By Country</h6>
<p>The top locations where users of your product are located</p>
</div>
<div className="ms-panel-body ms-average-users-country">
<div className="row">
<div className="col-xl-4 col-md-12">
<span className="progress-label">United States</span>
<span className="progress-status">14,805</span>
<div className="progress progress-tiny">
<div className="progress-bar bg-secondary" role="progressbar" style={{width: '80%'}} aria-valuenow={80} aria-valuemin={0} aria-valuemax={100} />
</div>
<span className="progress-label">Brazil</span>
<span className="progress-status">11,651</span>
<div className="progress progress-tiny">
<div className="progress-bar bg-primary" role="progressbar" style={{width: '70%'}} aria-valuenow={70} aria-valuemin={0} aria-valuemax={100} />
</div>
<span className="progress-label">Russia</span>
<span className="progress-status">9,157</span>
<div className="progress progress-tiny">
<div className="progress-bar bg-warning" role="progressbar" style={{width: '60%'}} aria-valuenow={60} aria-valuemin={0} aria-valuemax={100} />
</div>
<span className="progress-label">India</span>
<span className="progress-status">7,846</span>
<div className="progress progress-tiny">
<div className="progress-bar bg-danger" role="progressbar" style={{width: '45%'}} aria-valuenow={45} aria-valuemin={0} aria-valuemax={100} />
</div>
<span className="progress-label">Australia</span>
<span className="progress-status">6,789</span>
<div className="progress progress-tiny mb-0">
<div className="progress-bar bg-success" role="progressbar" style={{width: '30%'}} aria-valuenow={30} aria-valuemin={0} aria-valuemax={100} />
</div>
</div>
<div className="offset-xl-1 col-xl-7 col-md-12">
<div id="world-map" className="vector-map" />
</div>
</div>
</div>
</div>
</div>
</div>
</div>

);
}

export default Home;