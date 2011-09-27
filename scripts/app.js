$(function(){
  window.fbAsyncInit = function() {
    FB.init({
      appId  : '224111417646401', 
      status : true, 
      cookie : true,
      xfbml  : true
    });

    var session_handle = function(response){
      if (!response.session) return $('#login').show();

      document.getElementById("boutonlogin").value = "Log out";

      FB.api('/me/friends', function(response){
        response.data.forEach(function(friend){
		$('#friends').append('<div>'+friend.getMutualFriends()+'</div>');
		//          $('#friends').append('<div>'+JSON.stringify(friend)+'</div>');
        });
      });

      FB.XFBML.parse();
    };
//     FB.api(
//           {
//             method: 'fql.query',
//             query: 'SELECT id FROM profile WHERE id IN (SELECT uid2 FROM friend WHERE uid1=me())'
//           },
//           function(response) {
//             $.each(response, function(json) {
// 		    //                console.info(response[json].id);
//                         FB.api(
//                           {
//                             method: 'friends.getMutualFriends',
//                             target_uid: 'INSERT ANOTHER FRIEND ID HERE'
//                           },
//                           function(response) {
			      
// 			      //       console.info(response);
//                           }
//                           );
//                 return false;
//             });

//           }
//         );


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