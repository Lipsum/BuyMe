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

	    var amisTbl = new Hash(); //Tbl(); //correspondance ID => IDs des amis
	    alert("cqds");

	    
	    amisTbl.set(me(),new Hash());

	    var nouvelAmi = function(tbl,id1,id2) {
		/*    
		      if(typeof(tbl.get(id1)) == 'undefined') { // si id1 n'a pas d'amis...
		      tbl.set(id1,new Hash()); //HashTbl()); // on lui crée une liste d'amis (vide)
		      }
		      if(typeof(tbl.get(id2)) == 'undefined') { // si id2 n'a pas d'amis...
		      tbl.set(id2, new Hash()); //HashTbl()); // on lui crée une liste d'amis (vide)
		      }
		*/	    
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
	    
	    amisTbl.each(function(i)
			 {
			     //		noeud_tmp = document.createElement('amis_'+parseInt(i));
			     //		noeud_tmp.append('<div>'+JSON.stringify(i)+'</div>')
			     $('#friends').append('<div>'+JSON.stringify(i)+'</div>');
			     alert("coucou"+JSON.stringify(i));
			     amisTbl.get(i).each(function(j) {
				 $('#friends').append('<div>    |-> '+ JSON.stringify(j)+'</div>');
				 //		    noeud_tmp.appendChild(createTextNode('    |-> '+ JSON.stringify(j)+' )'));
			     });
			     //		document.getElementById('fb-root').appendChild(noeud_tmp);
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
