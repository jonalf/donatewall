function loadWall() {
    var rows = 25;
    var cols = 15;
    var bricknum = 0;
    var html = "";
    var name = "";

    //add the hidden div for resizing
    $("<div />", {id: "resizer"}).hide().appendTo(document.body);

    //get the regular size of the brick
    var x = $("<div class=\"brick\" />").hide().appendTo(document.body);
    var goalWidth = $(".brick").width();
    x.remove();

    
    for ( var r=0; r < rows; r++ ) {
	html+= "<tr>";
	for ( var c=0; c < cols; c++ ) {
	    html+= "<td><div class=\"brick hoverable\" id=\"" + bricknum + "\"></div></td> ";
	    bricknum++;
	}
	html+= "</tr>";
    }    
    $("#wall_table").html( html );    

    var numBricks = bricknum;
    for (bricknum = 0; bricknum < numBricks; bricknum++ ) {
	if ( bricknum == 0 ) 
	    name = "Deirdre <br>Weaver";
	else if ( bricknum == 1 )
	    name = "Sarah <br>Hemmert";
	else if ( bricknum == 76 )
	    name = "JonAlf <br>Dyrland-Weaver";
	else
	    name = "";
	resizeBrick( goalWidth, name, bricknum, 14 );		
    }
}

function resizeBrick( goalWidth, name, bricknum, size ) {

    var resizer = $("#resizer");
    resizer.css("font-size", size);
    resizer.html( name );    

    while( resizer.width() > goalWidth ) {
	resizer.css("font-size", size--);
    }
    
    $("#" + bricknum).css("font-size", size).html(resizer.html());
}

function enlarge(event) {
    var elm = $("#enlarger");    
    var holder  = $("#holder");
    var pos = $(this).offset();

    //resizing occurs here
    resizeBrick( elm.width(), $(this).html(), "enlarger", 26 );		
    //    elm.html( $(this).html() );
    
    var top = pos.top - $(this).height() / 2;
    var left = pos.left - $(this).width() / 2;
    
    if ( top < 0 )
	top = 0;
    if ( left < 0 )
	left = 5;
    else if ( left + elm.width() > $("body").width() ) 
	left = $("body").width() - elm.width() - 5;

    elm.css( "top", top );
    elm.css( "left", left );
    elm.css("visibility","visible");

    holder.css( "top", pos.top );
    holder.css( "left", pos.left );
    holder.css("visibility","visible");
}

function shrink() {
    $("#enlarger").css("visibility", "hidden");
    $("#holder").css("visibility", "hidden");
}

function overlay() {
   var v = $("#overlay").css("visibility");
    $("#overlay").height( $(document).height() );
        
    if ( v == "hidden" ) {
	$("#overlay").css("visibility", "visible");
	
	if ( $("#enlarger").text() == "" )
	    donate();
	else
	    info();
    }
    else
	$("#overlay").css("visibility", "hidden");
}

function donate() {
    var html = "This brick has yet to be claimed, but if you donate right now it can be yours!<br>";
    html+= "<br><button onclick=\"overlay()\">close</button>";
    
    $("#modal").html(html);
}

function info() {
    var html = "<h2>" + $("#enlarger").text() + "</h2><hr><br>";
    html+= "<br><button onclick=\"overlay()\">close</button>";
    
    $("#modal").html(html);
}

function loadCanvas() {
    var c = document.getElementById("wall_canvas");
    var canvas = c.getContext("2d");
    var height = $("#wall_canvas").height();
    var width = $("#wall_canvas").width();

    var groups = { "lions":33, "tigers":28, "bears":8.5, "toto":15.5, "jamie":15 };
    var colors = [ "red", "blue", "pink", "yellow", "gold" ]
    var c = 0;

    var startx = 0;
    var starty = 0;
    var flip = true;
    var totalArea = width * height;

    console.log( groups );

    for ( group in groups ) {
	var weight = groups[group] * .01 * totalArea;
	canvas.fillStyle = colors[ c++ ];

	if ( flip ) {
	    var boxHeight = height;
	    var boxWidth = weight / height;
	    canvas.fillRect(startx, starty, boxWidth, boxHeight);
	    
	    var textSize = setTextSize( group, boxWidth, canvas );
	    canvas.fillStyle = "black";
	    canvas.fillText( group, 
			     startx + boxWidth/2 - textSize.width/2, 
			     starty + boxHeight / 2);
	    
	    startx+= boxWidth;
	    width-= boxWidth;
	    flip = !flip;
	}
	else {
	    var boxWidth = width;
	    var boxHeight = weight/ width;
	    canvas.fillRect(startx, starty, boxWidth, boxHeight);

	    var textSize = setTextSize( group, boxWidth, canvas );
	    canvas.fillStyle = "black";
	    canvas.fillText( group, 
			     startx + boxWidth/2 - textSize.width/2, 
			     starty + boxHeight / 2);

	    starty+= boxHeight;
	    height-= boxHeight;
	    flip = !flip;
	}	    
    }
}

function setTextSize( text, maxWidth, canvas) {
    
    console.log("setting size");
    var size = 75;
    do {
	canvas.font = size + "px Arial";
	var width = canvas.measureText( text ).width;
	size--;
	console.log("\t" + size);
    }    
    while ( width > maxWidth );
    return canvas.measureText( text );
}
