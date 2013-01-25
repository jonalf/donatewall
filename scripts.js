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
	    name = "Deirdre<br>Weaver";
	else if ( bricknum == 1 )
	    name = "Sarah<br>Hemmert";
	else if ( bricknum == 76 )
	    name = "JonAlf<br>Dyrland-Weaver";
	else
	    name = "SMC<br>Alumnus";
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
}
