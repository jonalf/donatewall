var showing = false;

function loadWall() {
    var rows = 25;
    var cols = 15;
    var bricknum = 0;
    var html = "";

    for ( var r=0; r < rows; r++ ) {
	html+= "<tr>";
	for ( var c=0; c < cols; c++ ) {
	    html+= "<td><div class=\"brick hoverable\" id=\"" + bricknum + "\"> ";
	    if ( bricknum == 0 ) 
		html+= "Deirdre<br>Weaver</div></td>";
	    else if ( bricknum == 1 )
		html+= "Sarah<br>Hemmert</div></td>";
	    else if ( bricknum == 76 )
		html+= "JonAlf<br>Dyrland-Weaver</div></td>";
	    else
		html+= "SMC<br>Alumnus</div></td>";
	    bricknum++;
	}
    }    
    $("#wall_table").html( html );
    
}

function enlarge(event) {
    var elm = $("#enlarger");    
    var holder  = $("#holder");
    var pos = $(this).offset();

    console.log( this );

    elm.html( $(this).html() );
    elm.css( "top", pos.top );
    elm.css( "left", pos.left );
    elm.css("visibility","visible");

    holder.css( "top", pos.top );
    holder.css( "left", pos.left );
    holder.css("visibility","visible");
}

function shrink() {
    $("#enlarger").css("visibility", "hidden");
}
