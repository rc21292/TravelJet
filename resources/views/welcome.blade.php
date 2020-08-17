  <!DOCTYPE html>
  <html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
  <head>
    @include('layouts.front-head')
</head>
<body>
	{{ Session::get('url.intended') }}
	<script>
		var user_id = "<?php echo (Auth::user()) ? json_encode(Auth::user()->id) : '' ?>";
	</script>
    <div id="root">

    </div>
    <script type="text/javascript" src="{{asset('js/app.js')}}"></script>
    <script type="text/javascript" src="{{asset('/frontend/js/main/map.js')}}"></script>
</body>
</html>