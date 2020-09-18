<!DOCTYPE html>
<html>
<head>
    @include('layouts.front-head-register')
</head>
<body>
 <!-- Sign In -->
 <div class="signIn">
    <div class="container">
        <div class="row">
            <div class="col-sm-6">
                <h1>Hey, Welcome Back</h1>
                <h3>Sign in using social media accounts</h3>
                <ul class="list-inline social-icons">
                    <li><a href="#"><i class="fa fa-facebook fb-icon"></i></a></li>
                    <li><a href="#"><i class="fa fa-twitter tw-icon"></i></a></li>
                    <li><a href="#"><i class="fa fa-google go-icon"></i></a></li>
                    <li><a href="#"><i class="fa fa-instagram insta-icon"></i></a></li>
                </ul>
                <span>Or use your email account:</span>
                <div class="signIn_form">
                 <form method="POST" action="{{ route('login') }}">
                    @csrf
                    <div class="form-group required">
                        <label>Email</label>
                        <input id="email" type="email" name="email" class="form-control @error('email') is-invalid @enderror" value="{{ old('email') }}" required autocomplete="email" autofocus placeholder="example@gmail.com">
                        @error('email')
                        <span class="invalid-feedback" role="alert">
                            <strong>{{ $message }}</strong>
                        </span>
                        @enderror
                    </div>
                    <div class="form-group required">
                        <label>Password</label>
                        <input id="password" type="password" class="form-control @error('password') is-invalid @enderror" name="password" required autocomplete="current-password" placeholder="Min 6 Characters Required">

                        @error('password')
                        <span class="invalid-feedback" role="alert">
                            <strong>{{ $message }}</strong>
                        </span>
                        @enderror
                    </div>
                    <div class="form-group">
                        <p class="forgot"><a href="{{ route('password.request') }}">Forgot your password ?</a></p>
                    </div>
                    <div class="form-group">
                        <button type="submit" class="btn btn-warning">Sign In</button>
                    </div>
                </form>
                <a href="/">Back to Home</a>
            </div>
        </div>
        <div class="col-sm-6">
            <div class="formBanner">
                <div class="bannerText">
                    <h2>Hello There, Join Us</h2>
                    <p>Enter your personal detail and join the traveljet community for better experience</p>
                    <a href="/register" class="btn btn-primary">Sign Up</a>
                </div>
            </div>
        </div>
    </div>
</div>
</div>
<!-- FOOTER -->

    <footer class="footer">
        <div class="container">
            <div class="col-sm-3">
                <div class="payment-option">
                    <div class="footer-title">payment & security</div>
                    <img src="/frontend/image/icons/payments.png" alt="payments">
                    <div class="footer-title">follow us on</div>
                    <div class="social-icon">
                    <ul class="list-inline">
                      <li>
                        <a href="#">
                          <i class="fa fa-facebook-f icon"></i></a>
                      </li>
                      <li>
                        <a href="#"><i class="fa fa-twitter icon"></i></a>
                      </li>
                      <li>
                        <a href="#"><i class="fa fa-instagram icon"></i></a></li>
                    </ul>
                    </div>
                </div>
            </div>
            <div class="col-sm-2">
                <div class="footer-title">payment & security</div>
                <div class="footer-menu">
                <ul class="list-unstyled">
                    <li><a href="#">Company Info</a></li>
                    <li><a href="#">Payment Procedure</a></li>
                    <li><a href="#">Privacy Policy</a></li>
                    <li><a href="#">Terms and Conditions</a></li>
                    <li><a href="#">Cancellation Policy</a></li>
                    <li><a href="#">Contact Us</a></li>
                </ul>
                </div>
            </div>
            <div class="col-sm-2">
                <div class="footer-title">Services</div>
                <div class="footer-menu">
                <ul class="list-unstyled">
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
            <div class="col-sm-3">
                <div class="footer-title">Popular Outstation rides</div>
                <div class="footer-menu">
                <ul class="list-unstyled">
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
            <div class="col-sm-2">
                <div class="footer-title">Partner with us</div>
                <div class="footer-menu">
                <ul class="list-unstyled">
                    <li><a href="/DriveWithUs">Drive with us</a></li>
                    <li><a href="#">Careers</a></li>
                    <li><a href="/login">Register</a></li>
                    <li><a href="/register">Login</a></li>
                </ul>
                </div>
            </div>
        </div>
    </footer>
    <div class="footer-bottom">
        <div class="container">
            <p>Copyright © 2020 Travel Jet</p>
        </div>
    </div>
</body>
</html>