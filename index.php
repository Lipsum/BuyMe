<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:fb="https://www.facebook.com/2008/fbml">
<head>
  <title>AlgoRes template</title>
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.5.2/jquery.min.js" type="text/javascript" charset="utf-8"></script>
  <script src="scripts/raphael-min.js" type="text/javascript" charset="utf-8"></script>
  <link rel="stylesheet" href="/stylesheets/style.css" type="text/css" media="screen" title="no title" charset="utf-8" />
</head>
<body>
  <div id="fb-root"></div>
  
  <div id="login">
    <fb:login-button>Connect with Facebook</fb:login-button>
  </div>
  
  <pre id="friends"></pre>

  <script>
    window.fbAsyncInit = function() {
      FB.init({
        appId  : 'YOUR_APP_ID', 
        status : true, 
        cookie : true,
        xfbml  : true
      });
      
      var session_handle = function(response){
        if (!response.session) return $('#login').show();
        
        $('#login').hide();
        
        FB.api('/me/friends', function(response){
          response.data.forEach(function(friend){
            $('#friends').append('<div>'+JSON.stringify(friend)+'</div>');
          });
        });
        
        FB.XFBML.parse();
      };
      FB.Event.subscribe('auth.sessionChange', session_handle);
      FB.Event.subscribe('auth.login', session_handle);
      FB.getLoginStatus(session_handle);
    };
    (function() {
      var e = document.createElement('script'); e.async = true;
      e.src = document.location.protocol + '//connect.facebook.net/en_US/all.js';
      document.getElementById('fb-root').appendChild(e);
    }());
  </script>
</body>
</html>