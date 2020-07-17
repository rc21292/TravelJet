<!DOCTYPE html>
<html>
<head>
    @include('layouts.front-head')
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
<!-- Sign In // End-->
</body>
</html>