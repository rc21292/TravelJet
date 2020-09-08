<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
	@include('layouts.front-customer-head')
	@section('fronthead')

	@endsection
</head>
<body>
	<script>
		var user_id = "<?php echo (Auth::user()) ? json_encode(Auth::user()->id) : '' ?>";
	</script>
	<div id="customer-app"></div>
	<script type="text/javascript" src="{{asset('js/app.js')}}"></script>
	<script type="text/javascript">
		$(document).ready(function(){
			$("#test").click(function(){
				$(".newaddress").css("display", "block");
				$(".test").css("display", "none");
			});
			$(document).on('click','#close-address',function () {
				$(".newaddress").css("display", "none");
				$(".test").css("display", "block");
			})
		});  
	</script>
</body>
</html>