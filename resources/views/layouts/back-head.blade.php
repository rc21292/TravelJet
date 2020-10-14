<meta charset="utf-8">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Travel Jet-Admin</title>

<!-- Favicon -->
<link rel="icon" type="backend/image/png" sizes="32x32" href="favicon.ico">

<link href="{{asset('backend/css/bootstrap.min.css')}}" rel="stylesheet">
<link href="https://fonts.googleapis.com/css?family=Montserrat:300,400,500,600,700,900|Poppins:300,400,500,600,700,900|Roboto:300,400,500,700,900&display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Heebo:wght@300;500;600;700&display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Satisfy&display=swap" rel="stylesheet">
<link rel="stylesheet" type="text/css" href="{{asset('backend/css/animate.css')}}">
<link rel="stylesheet" type="text/css" href="{{asset('backend/font-awesome/css/font-awesome.css')}}">
<link rel="stylesheet" type="text/css" href="{{asset('backend/css/stylesheet.css')}}">
<link rel="stylesheet" href="{{asset('backend/css/scrollbar.css')}}" type="text/css">
<link rel="stylesheet" href="{{asset('backend/css/linearicons.css')}}" type="text/css">
<link rel="stylesheet" href="{{asset('backend/assets/css/style.css')}}" type="text/css">
<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossorigin="anonymous">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/magnific-popup.js/1.1.0/magnific-popup.css" />
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.4.1/css/bootstrap-datepicker3.css"/>

<script src="{{asset('backend/js/jquery-2.1.1.min.js')}}></script>
<script src="{{asset('backend/js/bootstrap.min.js')}}></script>
<script src="{{asset('backend/js/selectize.min.js')}}></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.isotope/3.0.6/isotope.pkgd.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/magnific-popup.js/1.1.0/jquery.magnific-popup.js')}}></script>
<script src="{{asset('backend/js/payment.js')}}></script>
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.4.1/js/bootstrap-datepicker.min.js')}}></script>
<script type="text/javascript">
	$(document).ready(function() {
		$('.location').on('focusin focusout', function() {
			$('.locationPanel').show();
			$('#single').hide();
			$('#round').hide();
			$('#sight').hide();
		});
		$('.destination').on('focusin focusout', function() {
			$('.destinationPanel').show();
			$('#single').hide();
			$('#round').hide();
			$('#sight').hide();
		});
		$('.select-state').selectize({
			sortField: 'text'
		});

		var current = 1,current_step,next_step,steps;
		steps = $("fieldset").length;
		$(".next").click(function(){
			current_step = $(this).parent();
			next_step = $(this).parent().next();
			next_step.show();
			current_step.hide();
			setProgressBar(++current);
		});
		$(".previous").click(function(){
			current_step = $(this).parent();
			next_step = $(this).parent().prev();
			next_step.show();
			current_step.hide();
			setProgressBar(--current);
		});
		setProgressBar(current);
			  // Change progress bar action
			  function setProgressBar(curStep){
			  	var percent = parseFloat(100 / steps) * curStep;
			  	percent = percent.toFixed();
			  	$(".progress-bar")
			  	.css("width",percent+"%")
			  	.html(percent+"%");   
			  }
			});
		</script>