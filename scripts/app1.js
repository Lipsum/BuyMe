/*
app1.js
*/

var amisTbl = new Array(); // matrice d'adjacence (les liens inexistants ne sont pas stockés : cool!)
var temp;

var nouvelAmi = function(tbl,id1,id2) {
    // relie id1 et id2 par un lien d'amitié (que c'est poétique!)

    if(typeof(tbl[id1]) == 'undefined') {
	tbl[id1] = new Array()
    }
    if(typeof(tbl[id2]) == 'undefined') {
	tbl[id2] = new Array()
    }
    
    tbl[id1][id2] = true // id2 est l'ami de id1
    tbl[id2][id1] = true // id1 est l'ami de id2
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
		//	$('#friends').append("héhé:"+ amisTbl[rep.uid1][rep.uid2]);
		    });
//		    console.log("jeffoulefifou");
		    temp = amisTbl;
		    console.log(temp["501543318"]["1295908866"]);
		});
	    console.log(temp["501543318"]["1295908866"]);	    
//	    console.log(typeof(amisTbl["100002442377316"]))
//	    var friend = document.getElementById("friends"); //endroit ou mettre le texte
	    
//	    $('#friends').append("<h1>Liste des amis :</h1>");
	    for (var i in amisTbl) {
		alert('oulala');
		$('#friends').append("<div>"+JSON.stringify(i)+"</div>");
//		$("<div>JSON.stringify(i)</div>").appendTo("friends");
//		var new_node = document.createElement("div");
//		new_node.innerHTML = JSON.stringify(i);
//		friend.appendChild(new_node);


		for(var j in  amisTbl[i]) {
		    $('#friends').append("<div>    |-> "+ JSON.stringify(j)+"</div>");
//		    $("<div>    |-> "+ JSON.stringify(j)+"</div>").appendTo("friends");
//		    var new_node2 = document.createElement("div");
//		    new_node2.innerHTML = '    |-> '+ JSON.stringify(j);
//		    new_node.appendChild(new_node2);   
		}
	    }
	    $('#friends').append("<h1>----</h1>");
	    
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
