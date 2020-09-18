<title>Travel Jet</title>
	<meta name="viewport" content="width=device-width, initial-scale=1">
<link href="{{asset('frontend/css/bootstrap.min.css')}}" rel="stylesheet">
	<link href="https://fonts.googleapis.com/css?family=Montserrat:300,400,500,600,700,900|Poppins:300,400,500,600,700,900|Roboto:300,400,500,700,900&display=swap" rel="stylesheet">
	<link href="https://fonts.googleapis.com/css2?family=Heebo:wght@300;500;600;700&display=swap" rel="stylesheet">
	<link href="https://fonts.googleapis.com/css2?family=Satisfy&display=swap" rel="stylesheet">
	<script src="{{asset('frontend/js/jquery-2.1.1.min.js')}}"></script>
	<script src="{{asset('frontend/js/bootstrap.min.js')}}"></script>
	<link rel="stylesheet" type="text/css" href="{{asset('frontend/css/animate.cs')}}s">
	<link rel="stylesheet" type="text/css" href="{{asset('frontend/font-awesome/css/font-awesome.css')}}">
	<script src="{{asset('frontend/js/selectize.min.js')}}"></script>
	<link rel="stylesheet" href="{{asset('frontend/css/selectize.bootstrap3.min.css')}}" />
	<link rel="stylesheet" type="text/css" href="{{asset('frontend/css/front/stylesheet.css')}}">
	<!-- <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.6.3/css/all.css" integrity="sha384-UHRtZLI+pbxtHCWp1t77Bi1L4ZtiqrqD80Kn4Z8NTSRyMA2Fd33n5dQ8lWUE00s/" crossorigin="anonymous"> -->
	<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.4.1/js/bootstrap-datepicker.min.js"></script>
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.4.1/css/bootstrap-datepicker3.css"/>
	@yield('fronthead')

	  <!-- TOP BAR -->
    <div class="topbar">
        <div class="container">
            <ul class="list-inline">
                <li>Support:</li>
                <li><a href="tel:9971717045"><i class="fa fa-phone-square"></i> &nbsp;9971 717 045</a>
                </li>
                <li>|</li>
                <li><a href="mailto:dailytravel360@gmail.com"><i class="fa fa-envelope-open"></i>&nbsp; dailytravel360@gmail.com</a>
                </li>
            </ul>
        </div>
    </div>
    <!-- HEADER -->
    <header>
        <div class="container">
            <div class="row">
                <!-- LOGO -->
                <div class="col-sm-3">
                    <div class="logo">
                        <a href="/">
                        <img src="/frontend/image/logo.png" className="img-responsive" alt="Travel Jet" />
                    </a>
                    </div>
                </div>
                <!-- MENU -->
                <div class="col-sm-9">
                    <ul class="menu list-inline">
                    	<li><Link to="/DriveWithUs">Drive With Us</Link>
                    	</li>
                    	<li><Link to="/HowitWorks">How it Works</Link>
                    	</li>
                    	<li><Link to="/CompanyInfo">Company Info</Link>
                    	</li>    
                        <li><a href="/login">Login</a>
                        </li>|
                        <li><a href="/register">Become a vender</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </header>