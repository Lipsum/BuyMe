var sommets = new Object();
var edges = new Object();
var SOM_COUL = "#f00";
var SOM_COUL2 = "#1015DA";
var EDG_COUL = "#000";
var EDG_COUL2 = "#1015DA";
var current_highlight;
var can;
var loading_bar;
var current_load;
var rayon = 7;
var CAN_X = Largeur;
var CAN_Y = Longueur;

var loading = function(step){
    if(typeof(current_load) != 'undefined'){
	current_load.remove()	
    }
    current_load = can.rect(300, 200, 300, 200 + step*10);
    console.log("load "+step);
    current_load.attr("fill", "red");
}



var highlight_edges = function(name,matAdj){
    for (i in edges[name]){
	edges[name][i].attr("stroke", EDG_COUL2)
	edges[name][i].attr("stroke-width", "4")
    }
    document.getElementById('img_ami').src = "http://graph.facebook.com/"+name+"/picture";
    document.getElementById("infos_ami").innerHTML = matAdj[name][name];
}

var unlight_edges = function(name){
    for (i in edges[name]){
	edges[name][i].attr("stroke", EDG_COUL)
	edges[name][i].attr("stroke-width", "1")
    }
}


var add_edges = function(ami1, ami2, objet){
    if(typeof(edges[ami1]) == 'undefined'){
	edges[ami1] = new Object();
    }
    if(typeof(edges[ami2]) == 'undefined'){
	edges[ami2] = new Object();
    }
    
    edges[ami1][ami2] = objet;
    edges[ami2][ami1] = objet;
}



var normalise = function(pos_x,pos_y) {
// met le dessin à l'échelle du canvas
    console.log("> normalise");

    var max_x = 0;
    var max_y = 0;
    var min_x = 1000;
    var min_y = 1000;

    // recherche des min et max
    for(i in pos_x) {
	max_x = Math.max(max_x,pos_x[i]);
	max_y = Math.max(max_y,pos_y[i]);

	min_x = Math.min(min_x,pos_x[i]);
	min_y = Math.min(min_y,pos_y[i]);
    }

    // mise à l'échelle :
    for(i in pos_x) {
	pos_x[i] = (pos_x[i]-min_x)/(max_x-min_x)*CAN_X;
	pos_y[i] = (pos_y[i]-min_y)/(max_y-min_y)*CAN_Y;
    }

    console.log("< normalise");
}

var dessine = function(matAdj, pos_x, pos_y) {

    console.log("> dessine");

   // var can = new Raphael(document.getElementById('can'), CAN_X, CAN_Y);  
    
    begin();

    current_highlight = -1;
    loading_bar.remove();
    //current_load.remove();
    
    //can.circle(10,10,rayon).attr("fill", SOM_COUL);
 
    for(i in pos_x) {
	for(j in pos_x) {
	    if(i!=j && matAdj[i][j]==true) {
		temp = can.path("M "+pos_x[i]+" "+pos_y[i]+" L "+pos_x[j]+" "+pos_y[j]);
		add_edges(i, j, temp); 
	    }
	}
    }
    
    for(i in pos_x) {
	sommets[i] = can.circle(pos_x[i],pos_y[i],rayon);
	sommets[i].attr("fill", SOM_COUL);
	sommets[i].node.id = i;
	sommets[i].mouseover(function(event) {
	    if(current_highlight != -1) {
		sommets[current_highlight].attr("fill", SOM_COUL)
		unlight_edges(current_highlight)
	    }
	    current_highlight = event.target.id
	    sommets[current_highlight].attr("fill", SOM_COUL2)
	    highlight_edges(current_highlight,matAdj)
	});

	sommets[i].mouseout(function(event) {
	    current_highlight = event.target.id
	    sommets[current_highlight].attr("fill", SOM_COUL)
	    unlight_edges(current_highlight,matAdj)
	});

//	console.log("Coord : ("+pos_x[i]+", "+pos_y[i]+")");
    }


    console.log("< dessine");
}



var begin = function(){
    can = new Raphael(document.getElementById('can'), CAN_X, CAN_Y);  
    loading_bar = can.rect(300, 200, 300, 400);
}