console.log("hello");

var jstitle = document.getElementById("title");

var title = d3.select("#title");

title.attr("class", "big").style("color", "red");

var svg = d3.select("svg");




var circles = d3.selectAll(".dot");

function changeColor(color){
    circles.attr("fill", color);
}

function dance(){
    circles.attr("cx", function () {
        return Math.random() * 200;
    });
}

var starterData = [
    {name: "a", height: 72},
    {name: "b", height: 60},
    {name: "c", height: 42},
    {name: "d", height: 90},
];

function redrawCircles(){

    var newCircles = svg.selectAll("dot")
        .data(starterData);

        newCircles.enter().append("circle")
            .attr("class", "dot")
            .attr("cx", function(){
                return Math.random() * 200;
            })
            .attr("cy", 50)
            .attr("r", 20);

        newCircles.attr("r", function(d) {
            return d.height / 2;
        });

        newCircles.exit().remove();
}



