function HachTbl()
{
    this.length = 0;
    this.items = new Array();
    for (var i = 0; i < arguments.length; i += 2) {
	if (typeof(arguments[i + 1]) != 'undefined') {
	    this.items[arguments[i]] = arguments[i + 1];
	    this.length++;
	}
    }
   
    this.removeItem = function(clef)
    {
	var tmp='undefined';
	if (typeof(this.items[clef]) != 'undefined') {
	    this.length--;
	    var tmp = this.items[clef];
	    delete this.items[clef];
	}
	return tmp;
    }

    this.getItem = function(clef) {
	return this.items[clef];
    }

    this.setItem = function(clef, valeur)
    {
	var tmp;
	if (typeof(valeur) != 'undefined') {
	    if (typeof(this.items[clef]) == 'undefined') {
		this.length++;
	    }
	    else {
		tmp = this.items[clef];
	    }

	    this.items[clef] = valeur;
	}
	   
	return tmp;
    }

    this.hasItem = function(in_key)
    {
	return typeof(this.items[in_key]) != 'undefined';
    }

    this.clear = function()
    {
	for (var i in this.items) {
	    delete this.items[i];
	}

	this.length = 0;
    }
}