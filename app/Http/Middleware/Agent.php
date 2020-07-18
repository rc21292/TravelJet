<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Response;
class Agent
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
       if ($request->user() && $request->user()->role != "agent")
{
return new Response(view("unauthorized")->with("role", "Agent"));
}
return $next($request);
    }
}
