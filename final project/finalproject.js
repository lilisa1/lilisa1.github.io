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
    
    var w = 1000;
    var h = 600;



//magic map creation
    var proj = d3.geoMercator()
        .fitSize([w, h], geoJSON);

    var path = d3.geoPath()
        .projection(proj);



//map svg
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

        console.log(groupCollege);


      //add circles
      cities.enter().append("circle")
            .attr("transform", function(d) {
                return "translate(" + proj(d.HTCoordinates) + ")";
            })
            .attr("r", 6)
            .attr("fill", "rgba(255, 106, 106, 0.8)")
            .on("mouseover", function(d) {
                //on over, tool tip displays
                var mouse = d3.mouse(document.body);
                d3.select("#tooltip")
                    .style("display", "block")
                    .html("<img src=" + d.Photo + ">" +
                          "<h1>" + d.Name + "</h1>" + 
                          "<h2>" + d.Position + "</h2>" +
                          "<h4>" + "FROM:  " + d.HomeTown + "</h4>" +
                          "<h4>" + "PRIOR:  " + d.College + "</h4>" + 
                          "<h4>" + "CURRENT:  " + d.Club + "</h4>")
                    .style("left", mouse[0] + 25 + "px")
                    .style("top", mouse[1] - 55 + "px");
            })
            .on("click", function(d) {
                console.log(d.moved);
                if (d.moved) {
                    d.moved = false;
                    d3.select(this)
                    .transition()
                    .attr("transform", function(d) {
                        return "translate(" + proj(d.HTCoordinates) + ")";
                    })
                    .attr("r", 6)
                    .attr("fill", "rgba(255, 106, 106, 0.8)")
                    .duration(3000);
                }
                else {
                    d.moved = true;
                    d3.select(this)
                        //keep bigger red dot
                        .attr("r", 10)
                        .attr("fill", "rgba(255, 106, 106, 0.8)")
                        //home red circle --> college purple circle
                        .transition()
                        .attr("transform", function(d) {
                            return "translate(" + proj(d.Coordinates) + ")";
                        })
                        .attr("fill", "rgba(188, 114, 248, 0.8)")
                        .duration(5000)
                        //college black circle --> club blue circle
                        .transition()
                        .attr("transform", function(d) {
                            return "translate(" + proj(d.ClubCoordinates) + ")";
                        })
                        .attr("fill", "rgba(67, 111, 255, 0.8)")
                        .duration(5000);
                }
                var mouse = d3.mouse(document.body);
                d3.select("#tooltip")
                    .style("display", "block")
                    .html("<img src=" + d.Photo + ">" +
                          "<h1>" + d.Name + "</h1>" + 
                          "<h2>" + d.Position + "</h2>" +
                          "<h4>" + "FROM:  " + d.HomeTown + "</h4>" +
                          "<h4>" + "PRIOR:  " + d.College + "</h4>" + 
                          "<h4>" + "CURRENT:  " + d.Club + "</h4>")
                    .style("left", mouse[0] + 25 + "px")
                    .style("top", mouse[1] - 55 + "px");
            })
            .on("mouseleave", function(d) {
                //on leave, tooltip goes away
                d3.select("#tooltip")
                    .style("display", "none")
            });

            d3.select(".btnAll").on("click", function() {
                moveAll("circle");
            });
            function moveAll(circle) {
                // select an element instead of "this"
                d3.selectAll(circle)
                    //make into bigger red circle
                    .transition()
                    .attr("r", 10)
                    .attr("fill", "rgba(255, 106, 106, 0.8)")
                    .duration(500)

                    //home town red circle --> college purple circle
                    .transition()
                    .attr("transform", function(d) {
                        return "translate(" + proj(d.Coordinates) + ")";
                    })
                    .attr("fill", "rgba(188, 114, 248, 0.8)")
                    .duration(5000)

                    //college black circle --> club blue circle
                    .transition()
                    .attr("transform", function(d) {
                        return "translate(" + proj(d.ClubCoordinates) + ")";
                    })
                    .attr("fill", "rgba(67, 111, 255, 0.8)")
                    .duration(5000)

                    //club blue circle --> home town red circle
                    .transition()
                    .attr("transform", function(d) {
                        return "translate(" + proj(d.HTCoordinates) + ")";
                    })
                    .attr("r", 6)
                    .attr("fill", "rgba(255, 106, 106, 0.8)")
                    .duration(5000);
                }

      })

});
