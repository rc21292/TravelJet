<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
	@include('layouts.back-head')
</head>
<body class="ms-body ms-aside-left-open ms-primary-theme ">
<div id="customer-app"></div>
<script type="text/javascript" src="{{asset('js/app.js')}}"></script>
</body>
</html>