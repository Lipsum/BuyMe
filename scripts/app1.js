/*
app1.js
*/

var amisTbl = new Object(); // matrice d'adjacence (les liens inexistants ne sont pas stockés : cool!)
var nPers = 0;
var nLiens = 0;

var nouvelAmi = function(tbl,id1,id2) {
    // relie id1 et id2 par un lien d'amitié (que c'est poétique!)

    if(typeof(tbl[id1]) == 'undefined') {
	tbl[id1] = new Object();
	nPers = nPers + 1;
    }
    if(typeof(tbl[id2]) == 'undefined') {
	tbl[id2] = new Object();
	nPers = nPers + 1;
    }
    
    tbl[id1][id2] = true // id2 est l'ami de id1
    tbl[id2][id1] = true // id1 est l'ami de id2
    
    nLiens = nLiens+1;
}


$(function(){
    window.fbAsyncInit = function() {
	FB.init({
	    appId : '224111417646401',
	    status : true,
	    cookie : true,
	    xfbml : true
	});
	
	var session_handle = function(response) {
	
	    if (!response.session) {
		document.getElementById('boutonlogin').value = "Log in";
		return;
	    }

	    document.getElementById("boutonlogin").value = "Log out";

	    // requête FQL pour connaitre les liens d'amitié : 
	    FB.api(
		{
		    method: 'fql.query',
		    query: 'SELECT uid1, uid2 FROM friend WHERE uid1 IN (SELECT uid2 FROM friend WHERE uid1= me()) AND uid2 IN (SELECT uid2 FROM friend WHERE uid1= me())'
		},
		function(liste) {
		    liste.forEach(function(rep) {
			nouvelAmi(amisTbl,rep.uid1,rep.uid2); // on mémorise chaque couple d'amis
		    });
		    nLiens = nLiens/2; //on a compté les liens dans les deux sens donc deux fois trop
		    graphe(amisTbl,nPers,nLiens);
		    normalise(position_x,position_y)
		    dessine(amisTbl, position_x,position_y);
		    
		});

	    FB.XFBML.parse();
	};

    
	FB.Event.subscribe('auth.sessionChange', session_handle);
	FB.Event.subscribe('auth.login', session_handle);
	FB.getLoginStatus(session_handle);
	FB.Event.subscribe("auth.logout", function() {window.location = "/jeanflorent.raymond/algores/";});
    };
    (function() {
	var e = document.createElement('script'); e.async = true;
	e.src = document.location.protocol + '//connect.facebook.net/en_US/all.js';
	document.getElementById('fb-root').appendChild(e);
    }());
});
