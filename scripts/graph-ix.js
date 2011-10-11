



window.onload = function() {  
    var rayon = 5;
    var decal = rayon; //Math.sqrt(2*rayon*rayon);
    var paper = new Raphael(document.getElementById('canvas_container'), 700, 700);   
    var circle = paper.circle(100, 500, rayon);
    var circle2 = paper.circle(200, 200, rayon);
    var test = circle.getBBox();
    var test2 = circle2.getBBox();
    circle.attr("fill", "#f00");
    circle2.attr("fill", "#f00");
    var circle3 = paper.circle(test.x+decal, test.y+decal, 50);
    diff_x = test2.x -test.x;
    diff_y = test2.y -test.y;
    var chemin = paper.path("M "+(test.x+decal)+" "+(test.y+decal)+" l "+(diff_x)+" "+(diff_y));
//    chemin.attr("fill", "#f00");
}