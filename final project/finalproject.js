d3.queue()
    .defer(d3.csv, "playerinfo.json") 
    .defer(d3.json, "usa.json")
    .awaitAll(function(error,dataArray) {
 
    var data = dataArray[0]; 
    var usTopoJSON = dataArray[1];
        console.log(data);
      
    var geoJSON = topojson.feature(usTopoJSON, usTopoJSON.objects.states);
    
                        geoJSON.features = geoJSON.features.filter(function(d) { 
                            return d.id != "AK" && d.id != "HI" && d.id != "PR";
                        })

                        console.log(geoJSON);
                        
                        var w = window.innerWidth;
                        var h = 500;

    var proj = d3.geoMercator()
        .fitSize([w, h], geoJSON);

    var path = d3.geoPath()
        .projection(proj);
    
    var svg = d3.select("#my-map")
        .attr("width", w + "px")
        .attr("height", h + "px")

    var countries = svg.selectAll("path")
        .data(geoJSON.features);

                        countries.enter().append("path")
                            .attr("d", function(d) {
                                return path(d);
                            })
                            .attr("stroke", "rgb(24, 24, 24)")
                            .attr("fill", "rgb(229,229,229)");



    // Points drawn on map
    /*
    var pointData = [
        {name: "Boston", "coords": [-71.0589, 42.3601]},
        {name: "NY", "coords": [-74.0060, 40.7128]},
        {name: "LA", "coords": [-118.2437, 34.0522]}
    ]

    var cities = svg.selectAll("circle")
        .data(pointData);
    
    cities.enter().append("circle")
        .attr("transform", function(d) {
            return "translate(" + proj(d.coords) + ")";
        })
        .attr("r", 7)
        .attr("fill", "blue");
        */
});