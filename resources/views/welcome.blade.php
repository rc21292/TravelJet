  <!DOCTYPE html>
  <html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
  <head>
    @include('layouts.front-head')
</head>
<body>
	{{ Session::get('url.intended') }}
    <div id="root">

    </div>
    <script type="text/javascript" src="{{asset('js/app.js')}}"></script>
</body>
</html>