<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
	@include('layouts.front-head')
	@section('fronthead')

	@endsection
</head>
<body>
	<script>
		var user_id = "<?php echo json_encode(Auth::user()->id); ?>";
	</script>
	<div id="customer-app"></div>
	<script type="text/javascript" src="{{asset('js/app.js')}}"></script>
	<script type="text/javascript">
		$(document).ready(function(){
			$("#test").click(function(){
				$(".newaddress").css("display", "block");
				$(".test").css("display", "none");
			});
		});  
	</script>
</body>
</html>