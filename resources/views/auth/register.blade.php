<!DOCTYPE html>
<html>
<head>
    @include('layouts.front-head')
</head>
<body>
    <div class="signIn create-account">
        <div class="container">
            <div class="row">
                <div class="col-sm-6">
                    <h1>Create an account</h1>
                    <div>&nbsp;</div>
                    <div class="signIn_form">
                       <form method="POST" action="{{ route('register') }}">
                        @csrf
                        <div class="form-group required">
                            <label>Who Are You ?</label>
                            <div class="custom-control custom-radio custom-control-inline">
                                <input type="radio" class="custom-control-input" name="role" id="customRadio1" value="agent">
                                <label class="custom-control-label" for="role" required>Agent</label>
                            </div>
                            <div class="custom-control custom-radio custom-control-inline">
                                <input type="radio" class="custom-control-input" name="role" id="customRadio2" value="customer" checked>
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
                                        <input type="number" name="phone" class="form-control" placeholder="Mobile No." Required>
                                    </div>
                                </div>
                                <div class="col-sm-4">
                                    <div class="form-group">
                                        <button class="btn btn-default generateOTP">Generate OTP</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="form-group required">
                            <label>Enter OTP</label>
                            <input type="name" name="otp" class="form-control" placeholder="One time Password">
                        </div>
                        <div class="row confirmPass">
                            <div class="col-sm-6">
                                <div class="form-group required">
                                    <label>Password</label>
                                    <input id="password" type="password" class="form-control @error('password') is-invalid @enderror" name="password" required autocomplete="new-password" placeholder="Set Password">

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
                            <button type="submit" class="btn btn-warning">Sign Up</button>
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
</body>
</html>