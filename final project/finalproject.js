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
    
    var w = 600;
    var h = 400;



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

      var cities = svg.selectAll("circle")
        .data(data);
      
      //grouping players by coordinate of college and calculating value of grouped array
      var groupCollege = d3.nest()
        .key(function(d) { return d.Coordinates; })
        .rollup(function(v) { return v.length; })
        .entries(data);

        console.log(groupCollege); //<----

      //add circles
      cities.enter().append("circle")
            .attr("transform", function(groupCollege) {
                return "translate(" + proj(groupCollege.Coordinates) + ")";
            })
            .attr("r", 3) //<----
            .attr("fill", "rgba(255, 106, 106, 0.8)")
            .on("mousemove", function(d) {
                var mouse = d3.mouse(this);
                d3.select("#tooltip")
                    .style("display", "block")
                    .html("<h1>" + d.Name + "</h1>")
                    .style("left", mouse[0] + "px")
                    .style("top", mouse[1] - 50 + "px");
      })
      .on("mouseout", function(d) {
          d3.select("#tooltip")
              .style("display", "none")
      });
      
            /*
            //add tooltip
            .on("mouseover", function (d){
              var xPos = d3.mouse(this)[0]-10;
              var yPos = d3.mouse(this)[1]-10;
              tooltip.style("display", "block")
              tooltip.attr("transform", "translate(" + xPos + "," + yPos + ")");
              tooltip.select("text").text(d.Name);
            })
            .on("mouseout", function (){
              tooltip.style("display", "none");
            });

            var tooltip = svg.append("g")
                  .attr("class", "tooltip")
                  .style("display", "none");
                  
            tooltip.append("text")
                  .attr("x",15)
                  .attr("dy", "1.2em")
                  .style("font-size","1.25em")
                  .style("color","red")
                  .attr("font-weight", "bold");
            */

      })
       
});