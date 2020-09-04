<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
	<head>
	@include('layouts.front-agent-head')
	@section('fronthead')

	@endsection
</head>
<body class="ms-body ms-aside-left-open ms-primary-theme ">

	
	<script>
		var user_id = "<?php echo json_encode(Auth::user()->id); ?>";
	</script>
    <div id="agent-app"></div>
    <script type="text/javascript" src="{{asset('js/app.js')}}"></script>
</body>
</html>