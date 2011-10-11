$(function(){
  window.fbAsyncInit = function() {
    FB.init({
      appId : '224111417646401',
      status : true,
      cookie : true,
      xfbml : true
    });

    var session_handle = function(response){
	if (!response.session) return document.getElementById('login').show();

      document.getElementById("boutonlogin").value = "Log out";
      /*
      FB.api('/me/friends', function(response){
        response.data.forEach(function(friend){
		$('#friends').append('<div>'+ friend.name/*JSON.stringify(friend)* /+'</div>');
        });
      });*/


      var noeud_add = document.createElement('noeudnoeud');
	var friend = document.getElementById("friends");
      FB.api(
          {
            method: 'fql.query',
            query: 'SELECT uid1, uid2 FROM friend WHERE uid1 IN (SELECT uid2 FROM friend WHERE uid1= me()) AND uid2 IN (SELECT uid2 FROM friend WHERE uid1= me())'
          },
	  function(liste){
	      liste.forEach(function(bob){
		  var new_node = document.createElement("div");
		  new_node.innerHTML = JSON.stringify(bob.uid2) +' '+JSON.stringify(bob.uid1);
		  friend.appendChild(new_node);
		  });
	      document.getElementById('fb-root').appendChild(noeud_add);
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