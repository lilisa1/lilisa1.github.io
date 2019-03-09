
var width = 1000;
var height = 700;

var svg = d3.select( "#mapcontainer" )
    .append( "svg" )
    .attr( "width", width )
    .attr( "height", height );

var g = svg.append( "g" );



var albersProjection = d3.geoAlbers()
    .scale( 190000 )
    .rotate( [71.057,0] )
    .center( [0, 42.313] )
    .translate( [width/2,height/2] );

var geoPath = d3.geoPath()
    .projection( albersProjection );



g.selectAll( "path" )
    .data( neighborhoods_json.features )
    .enter()
    .append( "path" )
    .attr( "fill", "#ccc" )
    .attr( "stroke", "#333")
    .attr( "d", geoPath );

var players = svg.append( "g" );

players.selectAll( "path" )
    .data( playerinfo_json.features )
    .enter()
    .append( "path" )
    .attr( "fill", "#900" )
    .attr( "stroke", "#999" )
    .attr( "r", "50")
    .attr( "d", geoPath )
    .attr( "class", "mapdot")
    .on("mouseover", function(d){
      d3.select("h3").text(d.properties.Name);
      d3.select(this).attr("class","mapdot hover");
    })
    .on("mouseout", function(d){
      d3.select("h3").text("");
      d3.select(this).attr("class","mapdot");
    });