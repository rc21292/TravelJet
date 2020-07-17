import React, { useState, useEffect } from 'react'
import {BrowserRouter as Router, Link, Route, Redirect} from 'react-router-dom';
import Home from '../Home';

function Sidebar() {
return (
  <div>{/* Sidebar Navigation Left */}
<aside id="ms-side-nav" className="side-nav fixed ms-aside-scrollable ms-aside-left">
  {/* Logo */}
  <div className="logo-sn ms-d-block-lg">
    <a className="pl-0 ml-0 text-center" href="/"> <img src="https://via.placeholder.com/216x62" alt="logo" /> </a>
  </div>
  {/* Navigation */}
  <ul className="accordion ms-main-aside fs-14" id="side-nav-accordion">
    {/* Dashboard */}
    <li className="menu-item">
      <a href="#" className="has-chevron" data-toggle="collapse" data-target="#dashboard" aria-expanded="false" aria-controls="dashboard">
        <span><i className="material-icons fs-16">dashboard</i>Dashboard </span>
      </a>
      <ul id="dashboard" className="collapse" aria-labelledby="dashboard" data-parent="#side-nav-accordion">
        <li> <a href="/">Dashboard</a> </li>
      </ul>
    </li>
    {/* /Dashboard */}
    {/* Order Page Elements */}
    <li className="menu-item">
      <a href="#" className="has-chevron" data-toggle="collapse" data-target="#order-page" aria-expanded="false" aria-controls="order-page">
        <span><i className="fas fa-clipboard-list" />Order</span>
      </a>
      <ul id="order-page" className="collapse" aria-labelledby="order-page" data-parent="#side-nav-accordion">
        <li> <a href="pages/order/order-status.html">Order Status</a> </li>
      </ul>
    </li>
    {/* /order page */}
    {/* Product Page Elements */}
    <li className="menu-item">
      <a href="#" className="has-chevron" data-toggle="collapse" data-target="#product-page" aria-expanded="false" aria-controls="product-page">
        <span><i className="fas fa-cannabis" />Products</span>
      </a>
      <ul id="product-page" className="collapse" aria-labelledby="product-page" data-parent="#side-nav-accordion">
        <li> <a href="pages/product/product-list.html">Products-list</a> </li>
        <li> <a href="pages/product/product-grid.html">Products-Grid</a> </li>
        <li> <a href="pages/product/product-detail.html">Products-Details</a> </li>
        <li> <a href="pages/product/cancel-product.html"> Cancel Products</a> </li>
        <li> <a href="pages/product/return-product.html">Return Products</a> </li>
      </ul>
    </li>
    {/* /Product page */}
    {/*-Customer Page Elements */}
    <li className="menu-item">
      <a href="#" className="has-chevron" data-toggle="collapse" data-target="#customer" aria-expanded="false" aria-controls="customer">
        <span><i className="fas fa-users" />Customers</span>
      </a>
      <ul id="customer" className="collapse" aria-labelledby="customer" data-parent="#side-nav-accordion">
        <li> <a href="pages/customer/customer.html">Customers-list</a> </li>
        <li> <a href="pages/customer/reviews.html">Reviwes</a> </li>
      </ul>
    </li>
    {/* /Customer page */}
    {/* Invoice */}
    <li className="menu-item">
      <a href="#" className="has-chevron" data-toggle="collapse" data-target="#invoice" aria-expanded="false" aria-controls="invoice">
        <span><i className="fas fa-receipt" />Invoice</span>
      </a>
      <ul id="invoice" className="collapse" aria-labelledby="invoice" data-parent="#side-nav-accordion">
        <li> <a href="pages/invoice/invoice.html">Invoice</a> </li>
        <li> <a href="pages/invoice/invoice-list.html">Invoice-List</a> </li>
      </ul>
    </li>
    {/* /Invoice */}
    {/* Add product */}
    <li className="menu-item">
      <a href="pages/add-product.html">
        <span><i className="far fa-plus-square" />Add Product</span>
      </a>
    </li>
    {/* /Add product */}
    {/* Pricing */}
    <li className="menu-item">
      <a href="pages/pricing.html">
        <span><i className="fas fa-dollar-sign" />Pricing</span>
      </a>
    </li>
    {/* /Pricing */}
    {/* Shipment */}
    <li className="menu-item">
      <a href="pages/shipment.html">
        <span><i className="fas fa-truck" />Shipment</span>
      </a>
    </li>
    {/* /Shipment */}
    <li className="menu-item">
      <a href="pages/widgets.html">
        <span><i className="material-icons fs-16">widgets</i>Widgets</span>
      </a>
    </li>
    {/* Basic UI Elements */}
    <li className="menu-item">
      <a href="#" className="has-chevron" data-toggle="collapse" data-target="#basic-elements" aria-expanded="false" aria-controls="basic-elements">
        <span><i className="material-icons fs-16">filter_list</i>Basic UI Elements</span>
      </a>
      <ul id="basic-elements" className="collapse" aria-labelledby="basic-elements" data-parent="#side-nav-accordion">
        <li> <a href="pages/ui-basic/accordions.html">Accordions</a> </li>
        <li> <a href="pages/ui-basic/alerts.html">Alerts</a> </li>
        <li> <a href="pages/ui-basic/buttons.html">Buttons</a> </li>
        <li> <a href="pages/ui-basic/breadcrumbs.html">Breadcrumbs</a> </li>
        <li> <a href="pages/ui-basic/badges.html">Badges</a> </li>
        <li> <a href="pages/ui-basic/cards.html">Cards</a> </li>
        <li> <a href="pages/ui-basic/progress-bars.html">Progress Bars</a> </li>
        <li> <a href="pages/ui-basic/preloaders.html">Pre-loaders</a> </li>
        <li> <a href="pages/ui-basic/pagination.html">Pagination</a> </li>
        <li> <a href="pages/ui-basic/tabs.html">Tabs</a> </li>
        <li> <a href="pages/ui-basic/typography.html">Typography</a> </li>
      </ul>
    </li>
    {/* /Basic UI Elements */}
    {/* Advanced UI Elements */}
    <li className="menu-item">
      <a href="#" className="has-chevron" data-toggle="collapse" data-target="#advanced-elements" aria-expanded="false" aria-controls="advanced-elements">
        <span><i className="material-icons fs-16">code</i>Advanced UI Elements</span>
      </a>
      <ul id="advanced-elements" className="collapse" aria-labelledby="advanced-elements" data-parent="#side-nav-accordion">
        <li> <a href="pages/ui-advanced/draggables.html">Draggables</a> </li>
        <li> <a href="pages/ui-advanced/sliders.html">Sliders</a> </li>
        <li> <a href="pages/ui-advanced/modals.html">Modals</a> </li>
        <li> <a href="pages/ui-advanced/rating.html">Rating</a> </li>
        <li> <a href="pages/ui-advanced/tour.html">Tour</a> </li>
        <li> <a href="pages/ui-advanced/cropper.html">Cropper</a> </li>
        <li> <a href="pages/ui-advanced/range-slider.html">Range Slider</a> </li>
      </ul>
    </li>
    {/* /Advanced UI Elements */}
    <li className="menu-item">
      <a href="pages/animation.html">
        <span><i className="material-icons fs-16">format_paint</i>Animations</span>
      </a>
    </li>
    {/* Form Elements */}
    <li className="menu-item">
      <a href="#" className="has-chevron" data-toggle="collapse" data-target="#form-elements" aria-expanded="false" aria-controls="form-elements">
        <span><i className="material-icons fs-16">input</i>Form Elements</span>
      </a>
      <ul id="form-elements" className="collapse" aria-labelledby="form-elements" data-parent="#side-nav-accordion">
        <li> <a href="pages/form/form-elements.html">Form Elements</a> </li>
        <li> <a href="pages/form/form-layout.html">Form Layouts</a> </li>
        <li> <a href="pages/form/form-validation.html">Form Validation</a> </li>
        <li> <a href="pages/form/form-wizard.html">Form Wizard</a> </li>
      </ul>
    </li>
    {/* /Form Elements */}
    {/* Charts */}
    <li className="menu-item">
      <a href="#" className="has-chevron" data-toggle="collapse" data-target="#charts" aria-expanded="false" aria-controls="charts">
        <span><i className="material-icons fs-16">equalizer</i>Charts</span>
      </a>
      <ul id="charts" className="collapse" aria-labelledby="charts" data-parent="#side-nav-accordion">
        <li> <a href="pages/charts/chartjs.html">Chart JS</a> </li>
        <li> <a href="pages/charts/morris-charts.html">Morris Chart</a> </li>
      </ul>
    </li>
    {/* /Charts */}
    {/* Tables */}
    <li className="menu-item">
      <a href="#" className="has-chevron" data-toggle="collapse" data-target="#tables" aria-expanded="false" aria-controls="tables">
        <span><i className="material-icons fs-16">tune</i>Tables</span>
      </a>
      <ul id="tables" className="collapse" aria-labelledby="tables" data-parent="#side-nav-accordion">
        <li> <a href="pages/tables/basic-tables.html">Basic Tables</a> </li>
        <li> <a href="pages/tables/data-tables.html">Data tables</a> </li>
      </ul>
    </li>
    {/* /Tables */}
    {/* Popups */}
    <li className="menu-item">
      <a href="#" className="has-chevron" data-toggle="collapse" data-target="#popups" aria-expanded="false" aria-controls="popups">
        <span><i className="material-icons fs-16">message</i>Popups</span>
      </a>
      <ul id="popups" className="collapse" aria-labelledby="popups" data-parent="#side-nav-accordion">
        <li> <a href="pages/popups/sweet-alerts.html">Sweet Alerts</a> </li>
        <li> <a href="pages/popups/toast.html">Toast</a> </li>
      </ul>
    </li>
    {/* /Popups */}
    {/* Icons */}
    <li className="menu-item">
      <a href="#" className="has-chevron" data-toggle="collapse" data-target="#icons" aria-expanded="false" aria-controls="icons">
        <span><i className="material-icons fs-16">border_color</i>Icons</span>
      </a>
      <ul id="icons" className="collapse" aria-labelledby="icons" data-parent="#side-nav-accordion">
        <li> <a href="pages/icons/fontawesome.html">Fontawesome</a> </li>
        <li> <a href="pages/icons/flaticons.html">Flaticons</a> </li>
        <li> <a href="pages/icons/materialize.html">Materialize</a> </li>
      </ul>
    </li>
    {/* /Icons */}
    {/* Maps */}
    <li className="menu-item">
      <a href="#" className="has-chevron" data-toggle="collapse" data-target="#maps" aria-expanded="false" aria-controls="maps">
        <span><i className="material-icons fs-16">map</i>Maps</span>
      </a>
      <ul id="maps" className="collapse" aria-labelledby="maps" data-parent="#side-nav-accordion">
        <li> <a href="pages/maps/google-maps.html">Google Maps</a> </li>
        <li> <a href="pages/maps/vector-maps.html">Vector Maps</a> </li>
      </ul>
    </li>
    {/* /Maps */}
    {/* Pages */}
    <li className="menu-item">
      <a href="#" className="has-chevron" data-toggle="collapse" data-target="#pages" aria-expanded="false" aria-controls="pages">
        <span><i className="material-icons fs-16">insert_drive_file</i>Pages</span>
      </a>
      <ul id="pages" className="collapse" aria-labelledby="pages" data-parent="#side-nav-accordion">
        <li className="menu-item">
          <a href="#" className="has-chevron" data-toggle="collapse" data-target="#authentication" aria-expanded="false" aria-controls="authentication">Authentication</a>
          <ul id="authentication" className="collapse" aria-labelledby="authentication" data-parent="#pages">
            <li> <a href="pages/prebuilt-pages/default-login.html">Default Login</a> </li>
            <li> <a href="pages/prebuilt-pages/modal-login.html">Modal Login</a> </li>
            <li> <a href="pages/prebuilt-pages/default-register.html">Default Registration</a> </li>
            <li> <a href="pages/prebuilt-pages/modal-register.html">Modal Registration</a> </li>
            <li> <a href="pages/prebuilt-pages/lock-screen.html">Lock Screen</a> </li>
          </ul>
        </li>
        <li> <a href="pages/prebuilt-pages/coming-soon.html">Coming Soon</a> </li>
        <li> <a href="pages/prebuilt-pages/error.html">Error Page</a> </li>
        <li className="menu-item"> <a href="pages/prebuilt-pages/faq.html"> FAQ </a> </li>
        <li className="menu-item"> <a href="pages/prebuilt-pages/portfolio.html"> Portfolio </a> </li>
        <li className="menu-item"> <a href="pages/prebuilt-pages/user-profile.html"> User Profile </a> </li>
        <li className="menu-item"> <a href="pages/prebuilt-pages/invoice.html"> Invoice </a> </li>
      </ul>
    </li>
    {/* /Pages */}
    {/* Bonus Pages */}
    <li className="menu-item">
      <a href="#" className="has-chevron" data-toggle="collapse" data-target="#bonuspages" aria-expanded="false" aria-controls="pages">
        <span><i className="material-icons fs-16">insert_drive_file</i> Bonus Pages</span>
      </a>
      <ul id="bonuspages" className="collapse" aria-labelledby="pages" data-parent="#side-nav-accordion">
        <li> <a href="pages/dashboard/cryptocurrency.html">Crypto Currency</a> </li>
        <li> <a href="pages/dashboard/web-analytics.html"> Web Analytics </a> </li>
        <li> <a href="pages/dashboard/social-media.html">Social Media</a> </li>
        <li> <a href="pages/dashboard/project-management.html">Project Management</a> </li>
        <li> <a href="pages/dashboard/client-management.html">Client Management</a> </li>
      </ul>
    </li>
    {/* /Bonus Pages */}
    {/* Apps */}
    <li className="menu-item">
      <a href="#" className="has-chevron" data-toggle="collapse" data-target="#apps" aria-expanded="false" aria-controls="apps">
        <span><i className="material-icons fs-16">phone_iphone</i>Apps</span>
      </a>
      <ul id="apps" className="collapse" aria-labelledby="apps" data-parent="#side-nav-accordion">
        <li> <a href="pages/apps/chat.html">Chat</a> </li>
        <li> <a href="pages/apps/email.html">Email</a> </li>
        <li> <a href="pages/apps/to-do-list.html">To-do List</a> </li>
      </ul>
    </li>
    {/* /Apps */}
  </ul>
</aside>
{/* Sidebar Right */}
<aside id="ms-recent-activity" className="side-nav fixed ms-aside-right ms-scrollable">
  <div className="ms-aside-header">
    <ul className="nav nav-tabs tabs-bordered d-flex nav-justified mb-3" role="tablist">
      <li role="presentation" className="fs-12"><a href="#activityLog" aria-controls="activityLog" className="active" role="tab" data-toggle="tab"> Activity Log</a></li>
      <li role="presentation" className="fs-12"><a href="#recentPosts" aria-controls="recentPosts" role="tab" data-toggle="tab"> Settings </a></li>
      <li><button type="button" className="close ms-toggler text-center" data-target="#ms-recent-activity" data-toggle="slideRight"><span aria-hidden="true">×</span></button></li>
    </ul>
  </div>
  <div className="ms-aside-body">
    <div className="tab-content">
      <div role="tabpanel" className="tab-pane active fade show" id="activityLog">
        <ul className="ms-activity-log">
          <li>
            <div className="ms-btn-icon btn-pill icon btn-light">
              <i className="flaticon-gear" />
            </div>
            <h6>Update 1.0.0 Pushed</h6>
            <span> <i className="material-icons">event</i>1 January, 2019</span>
            <p className="fs-14">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque scelerisque diam non nisi semper, ula in sodales vehicula....</p>
          </li>
          <li>
            <div className="ms-btn-icon btn-pill icon btn-success">
              <i className="flaticon-tick-inside-circle" />
            </div>
            <h6>Profile Updated</h6>
            <span> <i className="material-icons">event</i>4 March, 2018</span>
            <p className="fs-14">Curabitur purus sem, malesuada eu luctus eget, suscipit sed turpis. Nam pellentesque felis vitae justo accumsan, sed semper nisi sollicitudin...</p>
          </li>
          <li>
            <div className="ms-btn-icon btn-pill icon btn-warning">
              <i className="flaticon-alert-1" />
            </div>
            <h6>Your payment is due</h6>
            <span> <i className="material-icons">event</i>1 January, 2019</span>
            <p className="fs-14">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque scelerisque diam non nisi semper, ula in sodales vehicula....</p>
          </li>
          <li>
            <div className="ms-btn-icon btn-pill icon btn-danger">
              <i className="flaticon-alert" />
            </div>
            <h6>Database Error</h6>
            <span> <i className="material-icons">event</i>4 March, 2018</span>
            <p className="fs-14">Curabitur purus sem, malesuada eu luctus eget, suscipit sed turpis. Nam pellentesque felis vitae justo accumsan, sed semper nisi sollicitudin...</p>
          </li>
          <li>
            <div className="ms-btn-icon btn-pill icon btn-info">
              <i className="flaticon-information" />
            </div>
            <h6>Checkout what's Trending</h6>
            <span> <i className="material-icons">event</i>1 January, 2019</span>
            <p className="fs-14">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque scelerisque diam non nisi semper, ula in sodales vehicula....</p>
          </li>
          <li>
            <div className="ms-btn-icon btn-pill icon btn-secondary">
              <i className="flaticon-diamond" />
            </div>
            <h6>Your Dashboard is ready</h6>
            <span> <i className="material-icons">event</i>4 March, 2018</span>
            <p className="fs-14">Curabitur purus sem, malesuada eu luctus eget, suscipit sed turpis. Nam pellentesque felis vitae justo accumsan, sed semper nisi sollicitudin...</p>
          </li>
        </ul>
        <a href="#" className="btn btn-primary d-block"> View All </a>
      </div>
      <div role="tabpanel" className="tab-pane fade" id="recentPosts">
        <h6>General Settings</h6>
        <div className="ms-form-group">
          <span className="ms-option-name fs-14">Location Tracking</span>
          <label className="ms-switch float-right">
            <input type="checkbox" />
            <span className="ms-switch-slider round" />
          </label>
        </div>
        <div className="ms-form-group">
          <span className="ms-option-name fs-14">Allow Notifications</span>
          <label className="ms-switch float-right">
            <input type="checkbox" />
            <span className="ms-switch-slider round" />
          </label>
        </div>
        <div className="ms-form-group">
          <span className="ms-option-name fs-14">Allow Popups</span>
          <label className="ms-switch float-right">
            <input type="checkbox" defaultChecked />
            <span className="ms-switch-slider round" />
          </label>
        </div>
        <h6>Log Settings</h6>
        <div className="ms-form-group">
          <span className="ms-option-name fs-14">Enable Logging</span>
          <label className="ms-switch float-right">
            <input type="checkbox" defaultChecked />
            <span className="ms-switch-slider round" />
          </label>
        </div>
        <div className="ms-form-group">
          <span className="ms-option-name fs-14">Audit Logs</span>
          <label className="ms-switch float-right">
            <input type="checkbox" />
            <span className="ms-switch-slider round" />
          </label>
        </div>
        <div className="ms-form-group">
          <span className="ms-option-name fs-14">Error Logs</span>
          <label className="ms-switch float-right">
            <input type="checkbox" defaultChecked />
            <span className="ms-switch-slider round" />
          </label>
        </div>
        <h6>Advanced Settings</h6>
        <div className="ms-form-group">
          <span className="ms-option-name fs-14">Enable Logging</span>
          <label className="ms-switch float-right">
            <input type="checkbox" defaultChecked />
            <span className="ms-switch-slider round" />
          </label>
        </div>
        <div className="ms-form-group">
          <span className="ms-option-name fs-14">Audit Logs</span>
          <label className="ms-switch float-right">
            <input type="checkbox" />
            <span className="ms-switch-slider round" />
          </label>
        </div>
        <div className="ms-form-group">
          <span className="ms-option-name fs-14">Error Logs</span>
          <label className="ms-switch float-right">
            <input type="checkbox" defaultChecked />
            <span className="ms-switch-slider round" />
          </label>
        </div>
      </div>
    </div>
  </div>
</aside>

</div>
  );
}


export default Sidebar