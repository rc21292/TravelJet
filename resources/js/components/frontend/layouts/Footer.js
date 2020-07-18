import React from 'react';
import ReactDOM from 'react-dom';

function Footer() {
  return (
      <div>
        <footer className="footer">
          <div className="container">
            <div className="col-sm-3">
              <div className="payment-option">
                <div className="footer-title">payment &amp; security</div>
                <img src="/frontend/image/icons/payments.png" alt="payments" />
                <div className="footer-title">follow us on</div>
                <div className="social-icon">
                  <ul className="list-inline">
                    <li>
                      <a href="#">
                        <i className="fa fa-facebook-f icon" /></a>
                    </li>
                    <li>
                      <a href="#"><i className="fa fa-twitter icon" /></a>
                    </li>
                    <li>
                      <a href="#"><i className="fa fa-instagram icon" /></a></li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-sm-2">
              <div className="footer-title">payment &amp; security</div>
              <div className="footer-menu">
                <ul className="list-unstyled">
                  <li><a href="/CompanyInfo">Company Info</a></li>
                  <li><a href="#">Payment Procedure</a></li>
                  <li><a href="#">Privacy Policy</a></li>
                  <li><a href="#">Terms and Conditions</a></li>
                  <li><a href="#">Cancellation Policy</a></li>
                  <li><a href="#">Contact Us</a></li>
                </ul>
              </div>
            </div>
            <div className="col-sm-2">
              <div className="footer-title">Services</div>
              <div className="footer-menu">
                <ul className="list-unstyled">
                  <li><a href="#">Local Car Booking</a></li>
                  <li><a href="#">Round Trip Booking</a></li>
                  <li><a href="#">Round Trip with Sight Seeing</a></li>
                  <li><a href="#">Airport Ride</a></li>
                  <li><a href="#">Outstation Trip</a></li>
                  <li><a href="#">Pilgrimage Tour</a></li>
                  <li><a href="#">Weekend Ride</a></li>
                  <li><a href="#">Road Trip</a></li>
                </ul>
              </div>
            </div>
            <div className="col-sm-3">
              <div className="footer-title">Popular Outstation rides</div>
              <div className="footer-menu">
                <ul className="list-unstyled">
                  <li><a href="#">Delhi to Shimla</a></li>
                  <li><a href="#">Delhi to Manali</a></li>
                  <li><a href="#">Delhi to jaipur</a></li>
                  <li><a href="#">Delhi to Mumbai</a></li>
                  <li><a href="#">Delhi to Mussoorie</a></li>
                  <li><a href="#">Delhi to Nainital</a></li>
                  <li><a href="#">Delhi to Haridwar</a></li>
                  <li><a href="#">Shimla to Manali</a></li>
                  <li><a href="#">Manali to Ladakh</a></li>
                  <li><a href="#">Manali to Spiti</a></li>
                </ul>
              </div>
            </div>
            <div className="col-sm-2">
              <div className="footer-title">Partner with us</div>
              <div className="footer-menu">
                <ul className="list-unstyled">
                  <li><a href="/DriveWithUs">Drive with us</a></li>
                  <li><a href="#">Careers</a></li>
                  <li><a href="/Login">Register</a></li>
                  <li><a href="/Register">Login</a></li>
                </ul>
              </div>
            </div>
          </div>
        </footer>
        <div className="footer-bottom">
          <div className="container">
            <p>Copyright © 2020 Travel Jet</p>
          </div>
        </div>
      </div>
    );
}

export default Footer;