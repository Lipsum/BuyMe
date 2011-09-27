$(function(){
  window.fbAsyncInit = function() {
    FB.init({
      appId  : '224111417646401', 
      status : true, 
      cookie : true,
      xfbml  : true
    });

      FB.api('/me/friends', function(response){
        response.data.forEach(function(friend){
		//$('#friends').append('<div>'+friend.getMutualFriends()+'</div>');
		$('#friends').append('<div>'+JSON.stringify(friend)+'</div>');
        });
      });

      FB.XFBML.parse();
    };

    FB.Event.subscribe('auth.sessionChange', session_handle);
    FB.Event.subscribe('auth.login', session_handle);
    FB.getLoginStatus(session_handle);
    FB.Event.subscribe("auth.logout", function() {window.location = "/";});  
  };
  (function() {
    var e = document.createElement('script'); e.async = true;
    e.src = document.location.protocol + '//connect.facebook.net/en_US/all.js';
    document.getElementById('fb-root').appendChild(e);
  }());
});