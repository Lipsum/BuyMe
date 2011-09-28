

$(function(){
  window.fbAsyncInit = function() {
    FB.init({
      appId : '224111417646401',
      status : true,
      cookie : true,
      xfbml : true
    });

    var session_handle = function(response){
      if (!response.session) return $('#login').show();

      document.getElementById("boutonlogin").value = "Log out";
      
      FB.api('/me/friends', function(response){
        response.data.forEach(function(friend){
		//$('#friends').append('<div>'+ friend.name/*JSON.stringify(friend)*/+'</div>');
        });
      });
      
      FB.api(
          {
            method: 'fql.query',
            query: 'SELECT id FROM profile WHERE id IN (SELECT uid2 FROM friend WHERE uid1=me())'
          },
	  function(liste){
	      liste.data.forEach(function(elem){

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