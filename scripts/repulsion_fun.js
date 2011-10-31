position_x = new Array();
position_y = new Array();
velocity_x = new Array();
velocity_y = new Array();
var forceConstant;
var damp = Largeur / 10;

function repulsion(delt, deltalenght){
    var result = 0;
    var force = (forceConstant * forceConstant)/deltalenght;
    return (delt / deltalenght) * force;
}

function graphe(matrix, nb_v, nb_e){
    var global_energy = 0;
    forceConstant = 3*(Largeur * Longueur/matrix.lenght)/4
    for (noeud in matrix){
	position_x[noeud] = Math.random();
	position_y[noeud] = Math.random();
	velocity_x[noeud] = 0;
	velocity_y[noeud] = 0;
    }
    for(cmp = 0; cmp< 700; cmp++){
	global_energy = 0;
	for (noeud in matrix){
	    var net_force_x = 0;
	    var net_force_y = 0;
	    for (voisin in matrix){
		if(voisin != noeud){
		    if(matrix[noeud][voisin] == true){
			var delta_x = position_x[noeud] - position_x[voisin];
			var delta_y = position_y[noeud] - position_y[voisin];
			var lenght = Math.max(1, Math.sqrt(delta_x * delta_x + delta_y * delta_y));
			net_force_x = net_force_x - repulsion(delta_x, length);
			net_force_y = net_force_y - repulsion(delta_y, length);
			velocity_x[voisin] = (velocity_x[voisin] - repulsion(delta_x, length));
			velocity_y[voisin] = (velocity_y[voisin] - repulsion(delta_x, length));
		    }
		    else{
			var delta_x = position_x[noeud] - position_x[voisin];
			var delta_y = position_y[noeud] - position_y[voisin];
			var lenght = Math.max(1, Math.sqrt(delta_x * delta_x + delta_y * delta_y));
			net_force_x = net_force_x + repulsion(delta_x, length);
			net_force_y = net_force_y + repulsion(delta_y, length);
		    }
		}
	    }
	    velocity_x[noeud] = (velocity_x[noeud] + net_force_x);
	    velocity_y[noeud] = (velocity_y[noeud] + net_force_y);
	}
	for (noeud in matrix){
	    lenght = Math.max(1, Math.sqrt(velocity_x[noeud] * velocity_x[noeud] 
					   + velocity_y[noeud] * velocity_y[noeud]));
	    position_x[noeud] = position_x[noeud] + (velocity_x[noeud] / lenght)*Math.min(damp, length)
	    position_y[noeud] = position_y[noeud] + (velocity_y[noeud] / lenght)*Math.min(damp, length)	    
	}

	damp = damp * (1 - cmp / 700)
    }	

}