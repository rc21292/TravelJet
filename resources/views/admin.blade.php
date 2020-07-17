<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
	@include('layouts.head')
</head>
<body class="ms-body ms-aside-left-open ms-primary-theme ">
<form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
	@csrf
</form>
<div id="admin-app"></div>
<script type="text/javascript" src="{{asset('js/app.js')}}"></script>
</body>
</html>

