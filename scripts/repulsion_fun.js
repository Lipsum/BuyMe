position_x = new Object();
position_y = new Object();
velocity_x = new Object();
velocity_y = new Object();
var Largeur = 900;
var Longueur = 600;
var loading_bar;
var current_load;
var can;


var forceConstant;
var damp = Largeur / 10;

var loading = function(step){
    if(typeof(current_load) != 'undefined'){
	current_load.remove()	
    }
    current_load = can.rect(300, 200, 300, 200 + step*10);
//    setTimeout("console.log(\"timeout\")", 0);
//    console.log("load "+step);
    current_load.attr("fill", "red");
//    document.getElementById("infos").innerHTML = "Chargement... " + step + " %";
//    $('div.infos').replaceWith('<div id = "infos">"Chargement... " + step + " %"</div>');
}


function repulsion(delt, deltalength){
    var force = (forceConstant * forceConstant)/deltalength;
    return ((delt / deltalength) * force);
}

function graphe(matrix, nb_v, nb_e){
    console.log("> graphe"+nb_v);
    document.getElementById("infos").innerHTML = "Calcul de la posistion des sommets...";
    
    can = new Raphael(document.getElementById('can'), Largeur, Longueur);  

//    loading_bar = can.rect(300, 200, 300, 400);

    var nbTours = 25;
    var global_energy = 0;
    forceConstant = 3*(Largeur * Longueur/nb_v)/4
    for (noeud in matrix){
	position_x[noeud] = Math.random()*Largeur;
	position_y[noeud] = Math.random()*Longueur;
	velocity_x[noeud] = 0;
	velocity_y[noeud] = 0;
    }
    for(cmp = 0; cmp< nbTours; cmp++){
	//loading(cmp*100/nbTours);
	global_energy = 0;
	for (noeud in matrix){
	    var net_force_x = 0;
	    var net_force_y = 0;
	    for (voisin in matrix){
		if(voisin != noeud){
		    if(matrix[noeud][voisin] == true){
			var delta_x = position_x[noeud] - position_x[voisin];
			var delta_y = position_y[noeud] - position_y[voisin];
			var length = Math.max(1, Math.sqrt(delta_x * delta_x + delta_y * delta_y));
			net_force_x = net_force_x - repulsion(delta_x, length);
			net_force_y = net_force_y - repulsion(delta_y, length);
			velocity_x[voisin] = (velocity_x[voisin] - repulsion(delta_x, length));
			velocity_y[voisin] = (velocity_y[voisin] - repulsion(delta_x, length));
		    }
		    else{
			var delta_x = position_x[noeud] - position_x[voisin];
			var delta_y = position_y[noeud] - position_y[voisin];
			var length = Math.max(1, Math.sqrt(delta_x * delta_x + delta_y * delta_y));
			net_force_x = net_force_x + 150*length;
			net_force_y = net_force_y + 150*length;
		    }
		}
	    }
	    velocity_x[noeud] = (velocity_x[noeud] + net_force_x);
	    velocity_y[noeud] = (velocity_y[noeud] + net_force_y);
	}
	for (noeud in matrix){
	    length = Math.max(1, Math.sqrt(velocity_x[noeud] * velocity_x[noeud] 
					   + velocity_y[noeud] * velocity_y[noeud]));
	    position_x[noeud] = position_x[noeud] + (velocity_x[noeud] / length)*Math.min(damp, length)
	    position_y[noeud] = position_y[noeud] + (velocity_y[noeud] / length)*Math.min(damp, length)	    
	}
	damp = damp * (1 - cmp / nbTours)
    }
    console.log("< graphe");
}