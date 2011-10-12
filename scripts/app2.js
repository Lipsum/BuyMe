$(function(){
    window.fbAsyncInit = function() {
	FB.init({
	    appId : '224111417646401',
	    status : true,
	    cookie : true,
	    xfbml : true
	});


	//alert("cqds");
	
	var session_handle = function(response) {
	
	    if (!response.session) {
		//alert('iffff'+document.getElementById('login').innerHTML);
		document.getElementById('boutonlogin').value = "Log in";
		return;
	    }

	    //alert('tralala');
	    document.getElementById("boutonlogin").value = "Log out";

	    //alert('coucou');
	    var amisTbl = new Hash(); //Tbl(); //correspondance ID => IDs des amis


	    
	    amisTbl.set(me(),new Hash());

	    var nouvelAmi = function(tbl,id1,id2) {
		tbl.get(id1).set(id2,true) // id2 est l'ami de id1
		tbl.get(id2).set(id1,true) // id1 est l'ami de id2
	    }


	    FB.api( // crée les listes d'amis de mes amis
		{
		    method: 'fql.query',
		    query: 'SELECT uid1 FROM friend'
		},
		function(ami){
		    amisTbl.set(ami, new Hash());
		});

	    FB.api(
		{
		    method: 'fql.query',
		    query: 'SELECT uid1, uid2 FROM friend WHERE uid1 IN (SELECT uid2 FROM friend WHERE uid1= me()) AND uid2 IN (SELECT uid2 FROM friend WHERE uid1= me())'
		},
		function(liste){
		    liste.forEach(function(rep){
			nouvelAmi(amisTbl,rep.uid1,rep.uid2);
		    });
		});
	    
	    var noeud_tmp;

	    var friend = document.getElementById("friends"); //endroit ou mettre le texte
	    
	    amisTbl.each(function(i)
			 {

			     var new_node = document.createElement("div");
			     new_node.innerHTML = JSON.stringify(i);
			     friend.appendChild(new_node);


			     amisTbl.get(i).each(function(j) {
				 var new_node2 = document.createElement("div");
				 new_node2.innerHTML = '    |-> '+ JSON.stringify(j);
				 new_node.appendChild(new_node2);

			     });
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
