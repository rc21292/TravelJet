<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Response;
class Customer
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        if ($request->user() && $request->user()->role != "customer")
{
return new Response(view('unauthorized')->with('role', "Customer"));
}
return $next($request);
    }
}
