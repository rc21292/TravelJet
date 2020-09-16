<div class="topbar">
    <div class="container">
        <ul class="list-inline">
            <li>Support:</li>
            <li><a href="tel:9971717045"><i class="fa fa-phone-square"></i> &nbsp;9971 717 045</a>
            </li>
            <li>|</li>
            <li><a href="mailto:dailytravel360@gmail.com"><i class="fa fa-envelope-open"></i>&nbsp; dailytravel360@gmail.com</a>
            </li>
        </ul>
    </div>
</div>
<header>
    <div class="container">
        <div class="row">
            <!-- LOGO -->
            <div class="col-sm-3">
                <div class="logo">
                    <a href="/">
                        <img src="/frontend/image/logo.png" className="img-responsive" alt="Travel Jet" />
                    </a>
                </div>
            </div>
            <!-- MENU -->
            <div class="col-sm-9">
                <ul class="menu list-inline">
                    @php
                    $role = Auth::user()->role;
                    @endphp
                    @if($role == "agent")
                    <li><a href="/browse-bookings">Browse Booking</a>
                    </li>
                    @endif
                    <li><a href="/DriveWithUs">Drive With Us</a>
                    </li>
                    <li><a href="/HowitWorks">How it Works</a>
                    </li>
                    <li><a href="/CompanyInfo">Company Info</a>
                    </li>                    
                    @auth
                    <li ><a href="/login">My Account</a></li>
                    
                    <li ><a href="/logout">Logout</a></li>
                    @else
                    <li><a href="/login">Login</a></li>
                    
                    <span>|</span>
                    
                    <li ><a href="/register">Become a Vender</a></li>
                    @endauth
                </ul>
            </div>
        </div>
    </div>
</header>
@include('Chatify::layouts.headLinks')
<div class="messenger">
    {{-- ----------------------Users/Groups lists side---------------------- --}}
    <div class="messenger-listView">
        {{-- Header and search bar --}}
        <div class="m-header">
            <nav>
                <a href="#"><i class="fas fa-inbox"></i> <span class="messenger-headTitle">MESSAGES</span> </a>
                {{-- header buttons --}}
                <nav class="m-header-right">
                    <a href="#"><i class="fas fa-cog settings-btn"></i></a>
                    <a href="#" class="listView-x"><i class="fas fa-times"></i></a>
                </nav>
            </nav>
            {{-- Search input --}}
            <input type="text" class="messenger-search" placeholder="Search" />
            {{-- Tabs --}}
            <div class="messenger-listView-tabs">
                <a href="#" @if($route == 'user') class="active-tab" @endif data-view="users">
                    <span class="far fa-user"></span> People</a>
                </div>
            </div>
            {{-- tabs and lists --}}
            <div class="m-body">
               {{-- Lists [Users/Group] --}}
               {{-- ---------------- [ User Tab ] ---------------- --}}
               <div class="@if($route == 'user') show @endif messenger-tab app-scroll" data-view="users">

                   {{-- Favorites --}}
                   <p class="messenger-title">Favorites</p>
                   <div class="messenger-favorites app-scroll-thin"></div>

                   {{-- Saved Messages --}}
                   {!! view('Chatify::layouts.listItem', ['get' => 'saved','id' => $id])->render() !!}

                   {{-- Contact --}}
                   <div class="listOfContacts" style="width: 100%;height: calc(100% - 200px);"></div>

               </div>

               {{-- ---------------- [ Group Tab ] ---------------- --}}
               <div class="@if($route == 'group') show @endif messenger-tab app-scroll" data-view="groups">
                {{-- items --}}
                <p style="text-align: center;color:grey;">Soon will be available</p>
            </div>

            {{-- ---------------- [ Search Tab ] ---------------- --}}
            <div class="messenger-tab app-scroll" data-view="search">
                {{-- items --}}
                <p class="messenger-title">Search</p>
                <div class="search-records">
                    <p class="message-hint"><span>Type to search..</span></p>
                </div>
            </div>
        </div>
    </div>

    {{-- ----------------------Messaging side---------------------- --}}
    <div class="messenger-messagingView">
        {{-- header title [conversation name] amd buttons --}}
        <div class="m-header m-header-messaging">
            <nav>
                {{-- header back button, avatar and user name --}}
                <div style="display: inline-flex;">
                    <a href="#" class="show-listView"><i class="fas fa-arrow-left"></i></a>
                    <div class="avatar av-s header-avatar" style="margin: 0px 10px; margin-top: -5px; margin-bottom: -5px;">
                    </div>
                    <a href="#" class="user-name">{{ config('chatify.name') }}</a>
                </div>
                {{-- header buttons --}}
                <nav class="m-header-right">
                    <a href="#" class="add-to-favorite"><i class="fas fa-star"></i></a>
                    @php
                    $role = Auth::user()->role;
                    @endphp
                    @if($role == "admin")
                    <a href="/admin"><i class="fas fa-home"></i></a>
                    @elseif($role == "agent")
                    <a href="/agent"><i class="fas fa-home"></i></a>
                    @elseif($role == "customer")
                    <a href="/customer"><i class="fas fa-home"></i></a>
                    @endif

                    <a href="#" class="show-infoSide"><i class="fas fa-info-circle"></i></a>
                </nav>
            </nav>
        </div>
        {{-- Internet connection --}}
        <div class="internet-connection">
            <span class="ic-connected">Connected</span>
            <span class="ic-connecting">Connecting...</span>
            <span class="ic-noInternet">No internet access</span>
        </div>
        {{-- Messaging area --}}
        <div class="m-body app-scroll">
            <div class="messages">
                <p class="message-hint" style="margin-top: calc(30% - 126.2px);"><span>Please select a chat to start messaging</span></p>
            </div>
            {{-- Typing indicator --}}
            <div class="typing-indicator">
                <div class="message-card typing">
                    <p>
                        <span class="typing-dots">
                            <span class="dot dot-1"></span>
                            <span class="dot dot-2"></span>
                            <span class="dot dot-3"></span>
                        </span>
                    </p>
                </div>
            </div>
            {{-- Send Message Form --}}
            @include('Chatify::layouts.sendForm')
        </div>
    </div>
    {{-- ---------------------- Info side ---------------------- --}}
    <div class="messenger-infoView app-scroll">
        {{-- nav actions --}}
        <nav>
            <a href="#"><i class="fas fa-times"></i></a>
        </nav>
        {!! view('Chatify::layouts.info')->render() !!}
    </div>
</div>

@include('Chatify::layouts.modals')
@include('Chatify::layouts.footerLinks')