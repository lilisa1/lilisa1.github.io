//load external files
d3.queue()
    .defer(d3.json, "finalproject.json") 
    .defer(d3.json, "usa.json")
    .awaitAll(function(error,dataArray) {
 
    var data = dataArray[0]; 
    var usTopoJSON = dataArray[1];
        console.log(data);



//magic map loading
    var geoJSON = topojson.feature(usTopoJSON, usTopoJSON.objects.states);

    geoJSON.features = geoJSON.features.filter(function(d) { 
        return d.id != "AK" && d.id != "HI" && d.id != "PR";
    })

    console.log(geoJSON);
    
    var w = 900;
    var h = 600;



//magic map creation
    var proj = d3.geoMercator()
        .fitSize([w, h], geoJSON);

    var path = d3.geoPath()
        .projection(proj);



//note to self: lisa stop touching the #
    var svg = d3.select("#my-map")
        .attr("width", w + "px")
        .attr("height", h + "px")

    var countries = svg.selectAll("path")
        .data(geoJSON.features);



//magic map visual
    countries.enter().append("path")
        .attr("d", function(d) {
            return path(d);
        })
        .attr("stroke", "rgb(24, 24, 24)")
        .attr("fill", "rgb(229,229,229)");



//loading json for points indicating which colleges players went to
    d3.json("finalproject.json", function(data) { 

    var groupCollege = d3.nest()
    .key(function(d) { return d.Coordinates; })
    .rollup(function(v) { return v.length; })
    .entries(data);

      var cities = svg.selectAll("circle")
        .data(data);
    
      var home = svg.selectAll("circle")
        .data(data);
      
      //grouping players by coordinate of college and calculating value of grouped array

        console.log(groupCollege); //<----

      //add circles
      cities.enter().append("circle")
            .attr("transform", function(d) {
                return "translate(" + proj(d.HTCoordinates) + ")";
            })
            .attr("r", 6) //<----
            .attr("fill", "rgba(255, 106, 106, 0.8)")
            .on("mouseover", function(d) {
                var mouse = d3.mouse(document.body);
                d3.select(this)
                    .attr("r", 10)
                    .style("fill", "rgba(252, 147, 61, 0.849)")
                d3.select("#tooltip")
                    .style("display", "block")
                    .html("<h1>" + d.Name + "</h1>" + 
                          "<h3>" + "From: " + d.HomeTown + "</h3>" +
                          "<h4>" + "Went to: " + d.College + "</h4>" +
                          "<img src=" + d.Photo + ">")
                    .style("left", mouse[0] + 25 + "px")
                    .style("top", mouse[1] - 55 + "px");
                    
            })
            .on("click", function(d) {
                var mouse = d3.mouse(document.body);
                d3.select(this)
                    .attr("r", 10)
                    .style("fill", "rgba(252, 147, 61, 0.849)")
                    //circle move coordinates
                    .transition()
                    .attr("transform", function(d) {
                        return "translate(" + proj(d.Coordinates) + ")";
                    })
                    .attr("fill", "red")
                    .duration(3000);
                d3.select("#tooltip")
                    .style("display", "block")
                    .html("<h1>" + d.Name + "</h1>" + 
                          "<h3>" + "From: " + d.HomeTown + "</h3>" +
                          "<h4>" + "Went to: " + d.College + "</h4>" +
                          "<img src=" + d.Photo + ">")
                    .style("left", mouse[0] + 25 + "px")
                    .style("top", mouse[1] - 55 + "px");
                    
            })
            .on("mouseleave", function(d) {
                d3.select(this)
                    .attr("r", 6)
                    .style("fill", "rgba(255, 106, 106, 0.8)")
                    //circle move back
                    .transition()
                    .attr("transform", function(d) {
                        return "translate(" + proj(d.HTCoordinates) + ")";
                    })
                    //circle go back to red
                    .attr("fill", "red")
                    .duration(500);
                d3.select("#tooltip")
                    .style("display", "none")
            });

      })
       
});
