<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    @include('layouts.head')
</head>
<body class="ms-body ms-aside-left-open ms-primary-theme ">
    <div id="agent-app"></div>
    <script type="text/javascript" src="{{asset('js/app.js')}}"></script>
</body>
</html>