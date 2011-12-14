var genere_couleurs = function(n) {
    // fonction qui à un entier n associe une tableau contenant de n chaines désignant
    // des couleurs différentes au format hexadécimal "#******"


    var hsl_to_rvb = function(h,s,l) {
	// passe du système hsl à rvb
	// h \in [0,360[
	// s \in [0, 1]
	// l \in [O, 1]

	var rgb = new Object(); // résultat
	var c = (1 - abs(2 * l - 1)); // chroma
	var h = h / 60;
	var x = c * (1 - abs(h % 2 -1)); // don't ask me what it means
	var m = l - 1/2 * c;
	rgb[0] = m; rgb[1] = m; rgb[2] = m;

	if (h < 1){ 
	    rgb[0] += c;
	    rgb[1] += x;
	} else if (h < 2) {
	    rgb[0] += x;
	    rgb[1] += c;
	} else if (h < 3) {
	    rgb[1] += c;
	    rgb[2] += x;
	} else if (h < 4) {
	    rgb[1] += x;
	    rgb[2] += c;
	} else if (h < 5) {
	    rgb[0] += x;
	    rgb[2] += c;
	} else {
	    rgb[0] += c;
	    rgb[2] += x;
	}
	return rgb;
    }
    
    var n_to_n2 = function(k) {
	// décompose k en deux entiers (réciproque d'un des polynômes de Cantor)

	var res = new Object;
	
	if (k == 0) {
	    res[0] = 0;
	    res[1] = 0;
	} else {
	    var n = 1;
	    var old_sumn = 0;
	    var sumn  = 1;
	 
	    // recherche de la diagonale:
	    while(sumn < k) {
		old_sumn = sumn;
		sumn = sumn / n * (n + 2); // exact integer
		n++;
	    }
	    // k est sur la diagonale n
	    
	    res[0] = k - old_sumn;
	    res[1] = sumn - k - 1
	}
	return res;
    }

    var dec_to_hex = function(dec){
	// conversion base 10 -> base 16
	var alph = '0123456789ABCDEF';
	var len=base.length;
	var ret='';
	while(dec>0){
	    ret = alph.charAt(dec % 16) + ret;
	    dec = Math.floor(dec / 16);
	}
	return ret;
    }
    
    var couleurs = new Object();
    var h = 0, s = 1/2, l = 0;
    var rvb = ''
    
    var max_hl = 1;
    var tmp = 1;
    
    // recherche de la diagonale:
    while(tmp < n) {
	tmp = tmp / max_hl * (max_hl + 2); // exact integer
	max_hl++;
    }

    for (k = 0 ; k < n-1 ; k++) {
	// on passe de k à h,l et on normalise (s est fixé)
	tmp = n_to_n2(k);
	h = (tmp[0] * 359) / max_hl; // h \in [0, 360[
	l = tmp[1] / max_hl; // l \in [0,1]

	// on passe de hsl à rvb
	tmp = hsl_to_rvb(h,s,l);
	
	couleurs[k] = '#' + dec_to_hex(tmp[0]) + dec_to_hex(tmp[1]) + dec_to_hex(tmp[2]);
    }
    return couleurs;
}