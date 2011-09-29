
$(function(){
    window.fbAsyncInit = function() {
	FB.init({
	    appId : '224111417646401',
	    status : true,
	    cookie : true,
	    xfbml : true
	});

	var amisTbl = HashTbl(); //correspondance ID => IDs des amis
	
	var nouvelAmis = function(id1,id2) {
	    if(typeof(amisTbl.getItem(id1)) != 'undefinied') { // si id1 n'a pas d'amis...
		amisTbl.setItem(id1) = HashTbl();
	    }
	    if(typeof(amisTbl.getItem(id2)) != 'undefinied') { // si id2 n'a pas d'amis...
		amisTbl.setItem(id2) = HashTbl();
	    }
	    
	    amisTbl.getItem(id1).setItem(id2,true)
	    amisTbl.getItem(id2).setItem(id1,true)
	    //amisTbl.setItem(id1,amisTbl.getItem(id1).push(id2)); // ajoute id2 à id1
	    //amisTbl.setItem(id2,amisTbl.getItem(id2).push(id1)); // ajoute id1 à id2
	}


	var session_handle = function(response){
	    if (!response.session) return $('#login').show();

	    document.getElementById("boutonlogin").value = "Log out";

	    FB.api(
		{
		    method: 'fql.query',
		    query: 'SELECT uid1, uid2 FROM friend WHERE uid1 IN
                                (SELECT uid2 FROM friend WHERE uid1= me())
                                AND uid2 IN (SELECT uid2 FROM friend WHERE uid1= me())'
		},
		function(liste){
		    liste.forEach(function(rep){
			nouvelAmis(rep.uid1,rep.uid2);
		    });
		});
	    
	    var noeud_tmp;
	    for(var i in amisTbl.items) {
		noeud_tmp = document.createElement('amis_'+parseInt(i));
		noeud_tmp.append('<div>'+JSON.stringify(i)+'</div>')
		for(j in amisTbl.getItem(i)) {
		    noeud_tmp.appendChild('<div>    |-> '+ JSON.stringify(j)+'</div>');
		}
		document.getElementById('fb-root').appendChild(noeud_tmp);
	    }

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
