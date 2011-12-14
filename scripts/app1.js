/*
app1.js
*/

var amisTbl = new Object(); // matrice d'adjacence (les liens inexistants ne sont pas stockés : cool!)
var nPers = 0;
var nLiens = 0;
var cliques = new Object();
var degres = new Object();
var community_manager = new Object();
var community_belong = new Object();
var number_of_cliques = 0;
var clique_size = 3; // this can't be changed 


var nouvelAmi = function(tbl,id1,id2) {
    // relie id1 et id2 par un lien d'amitié (que c'est poétique!)

    if(typeof(tbl[id1]) == 'undefined') {
	tbl[id1] = new Object();
	console.log("azert"+id1);
	//tbl[id1][id1] = nm1;
	degres[id1] = 0;
	nPers = nPers + 1;
	community_belong[id1] = new Object();
    }
    if(typeof(tbl[id2]) == 'undefined') {
	tbl[id2] = new Object();
	//tbl[id2][id2] = nm2;
	degres[id2] = 0;
	nPers = nPers + 1;
	community_belong[id2] = new Object();
    }
  
    community_manager[nLiens] = id1;
    community_belong[id2][id1] = nLiens;
    community_belong[id1][id2] = nLiens;
    degres[id2] = degres[id2]+1;
    degres[id1] = degres[id1]+1;
    
    tbl[id1][id2] = true // id2 est l'ami de id1
    tbl[id2][id1] = true // id1 est l'ami de id2
    
    nLiens = nLiens+1;
}

var merge_cliques = function(s1,s2,s3){
    // On a au plus trois communautés à fusionner
    // Ils appartiennent nécessairement a la meme communauté (celle de leur clique)
    // 1 - déterminer l'ensemble des cliques à fusionner comme l'ensemble des communautés auxquelles (s1 et s2) ou (s1 et s3) ou (s2 et s3) appartiennent

    var e1 = community_belong[s1][s2];
    var e2 = community_belong[s2][s3];    
    var e3 = community_belong[s3][s1];

    community_manager[e1] = s1;    
    community_manager[e2] = s1;
    community_manager[e3] = s1;
    console.log("merged!!!!!!!");
} 



var detect_new_clique = function(tbl, id1, id2){
    if(degres[id1] >= 2 && degres[id2] >= 2){
	var mutual_friends = 0;
	var mutual_friends_set = new Object();
	for(var voisin in tbl[id1]){
	    if(tbl[id2][voisin] == true){
		merge_cliques(id1,id2,voisin);
	    }
	}
    }
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
		    
		    FB.api('/me/friends', function(response){
			response.data.forEach(function(friend){
			    //    console.log(friend);
			    amisTbl[friend.id] = new Object();
			    amisTbl[friend.id][friend.id] = friend.name
			    nPers = nPers + 1;
			    degres[friend.id] = 0;
			    community_belong[friend.id] = new Object();			    
			});
		    });



		    //    console.log(liste);
		    liste.forEach(function(rep) {
			for(var iter in liste) {
			    //console.log(liste[iter]);
			    nouvelAmi(amisTbl,rep.uid1,rep.uid2); // on mémorise chaque couple d'amis
			    //console.log("vgvbj,=" + rep.uid1.name);
			    detect_new_clique(amisTbl, rep.uid1, rep.uid2);
			    
			}
		    })
		    console.log("JAMAIS LA");
		    nLiens = nLiens/2; //on a compté les liens dans les deux sens donc deux fois trop
		    graphe(amisTbl,nPers,nLiens);
		    normalise(position_x,position_y);
		    dessine(amisTbl, position_x,position_y);
		    document.getElementById("infos").innerHTML = "Admirez le graphe de vos amis."
		});

	    FB.XFBML.parse();
	}
    
	
    
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