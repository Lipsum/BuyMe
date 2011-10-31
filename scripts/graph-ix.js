var sommets = Object();
var SOM_COUL = "#f00";
var CAN_X = 700
var CAN_Y = 700

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

    var can = new Raphael(document.getElementById('can'), CAN_X, CAN_Y);   
    var rayon = 2;

    for(i in pos_x) {
	sommets[i] = can.circle(pos_x,pos_y,rayon);
	sommets[i].attr("fill", SOM_COUL);
    }
    for(i in pos_x) {
	for(j in pos_x) {
	    if(i!=j && matAdj[i][j]==true) {
		can.path("M "+pos_x[i]+" "+pos_y[i]+" L "+pos_x[j]+" "+pos_y[j]);
	    }
	}
    }

    console.log("< dessine");
}

