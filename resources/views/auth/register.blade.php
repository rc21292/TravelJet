<!DOCTYPE html>
<html>
<head>
    @include('layouts.front-head-register')
</head>
@section('fronthead')

@endsection
<body>
    <meta name="csrf-token" content="{{ csrf_token() }}" />
    <div class="signIn create-account">
        <div class="container">
            <div class="row">
                <div class="col-sm-6">
                    <h1>Create an account</h1>
                    <div>&nbsp;</div>
                    <div class="signIn_form">
                       <form method="POST" action="{{ route('register') }}">
                        @csrf
                        <div class="form-group required" style="display: none;" >
                            <label>Who Are You ?</label>
                            <div class="custom-control custom-radio custom-control-inline">
                                <input type="radio" class="custom-control-input" name="role" id="customRadio1" value="agent" checked>
                                <label class="custom-control-label" for="role" required>Agent</label>
                            </div>
                            <div class="custom-control custom-radio custom-control-inline">
                                <input type="radio" class="custom-control-input" name="role" id="customRadio2" value="customer">
                                <label class="custom-control-label" for="role" required>Customer</label>
                            </div>
                        </div>
                        <div class="form-group required">
                            <label for="name">Full name</label>
                            <input id="name" type="text" class="form-control @error('name') is-invalid @enderror" name="name" value="{{ old('name') }}" required autocomplete="name" autofocus placeholder="Full Name">
                            @error('name')
                            <span class="invalid-feedback" role="alert">
                                <strong>{{ $message }}</strong>
                            </span>
                            @enderror
                        </div>
                        <div class="form-group required">
                            <label>Email</label>
                            <input id="email" type="email" class="form-control @error('email') is-invalid @enderror" name="email" value="{{ old('email') }}" required autocomplete="email" placeholder="Email">
                            @error('email')
                            <span class="invalid-feedback" role="alert">
                                <strong>{{ $message }}</strong>
                            </span>
                            @enderror
                        </div>
                        <div class="otpPanel">
                            <label>Enter your Mobile no to get OTP</label>
                            <div class="row">
                                <div class="col-sm-7 col-sm-offset-1">
                                    <div class="form-group required">
                                        <input type="number" name="phone" value="{{ old('phone') }}" id="phone" class="form-control" placeholder="Mobile No." Required>
                                         @error('phone')
                            <span class="invalid-feedback" role="alert">
                                <strong>{{ $message }}</strong>
                            </span>
                            @enderror
                                        <div id="mobile-error" style="color: red;"></div>
                                    </div>
                                </div>
                                <div class="col-sm-4">
                                    <div class="form-group">
                                        <button class="btn btn-default generateOTP" id="send-otp">Generate OTP</button>
                                    </div>
                                    <div id="otp-error" style="float: left;color: red;"></div>
                                    <div id="otp-success" style="float: left;"></div>
                                </div>
                            </div>
                        </div>
                        <div class="form-group required">
                            <label>Enter OTP</label>
                            <input type="name" name="otp" value="{{ old('otp') }}" class="form-control" placeholder="One time Password">
                            @error('otp')
                            <span class="invalid-feedback" role="alert">
                                <strong>{{ $message }}</strong>
                            </span>
                            @enderror
                            @if (Session::has('otp'))
                               <div style="color:red;">{{ Session::get('otp') }}</div>
                            @endif
                        </div>
                        <div class="row confirmPass">
                            <div class="col-sm-6">
                                <div class="form-group required">
                                    <label>Password</label>
                                    <input id="password" type="password" class="form-control @error('password') is-invalid @enderror" name="password" required autocomplete="new-password" value="{{ old('password') }}" placeholder="Set Password">

                                    @error('password')
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                    @enderror
                                </div>
                            </div>
                            <div class="col-sm-6">
                                <div class="form-group required">
                                    <label>Confirm Password</label>
                                    <input id="password-confirm" type="password" class="form-control" name="password_confirmation" required autocomplete="new-password" placeholder="Confirm Password">
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <button type="submit" id="signUp" class="btn btn-warning">Sign Up</button>
                        </div>
                    </form>
                    <a href="/">Back to Home</a>
                </div>
            </div>
            <div class="col-sm-6">
                <div class="formBanner">
                    <div class="bannerText">
                        <h2>Hello There</h2>
                        <p>Already have an account, enter your login details and explore all your activity</p>
                        <a href="/login" class="btn btn-primary">Sign In</a>
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
                    <li><a href="/register">Register</a></li>
                    <li><a href="/login">Login</a></li>
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
<script type="text/javascript">
    $(document).on('click','#send-otp',function(e) {

        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        });

        $("#signUp").prop('disabled', false);
        var phone = $('#phone').val();
        if (phone == '') {
            $("#mobile-error").html('Please enter mobile number!');
            return;
        }
        $.ajax({
            type:'POST',
            url:"{{ route('sendOtp') }}",
            data:{phone:phone},
            success:function(data){
                if (data.message == 'Otp Sent Successfully') {
                    $("#otp-success").html('Otp sended successfully!');
                    $("#signUp").prop('disabled', false);
                }else{
                    $("#otp-error").html('Error in sending otp!');
                    $("#signUp").prop('disabled', true);
                }
            }
        });    
    });
</script>