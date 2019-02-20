
/*
function doUpdate(){
    var circle = d3.selectAll("circle");
    circle.data([32, 57, 112]);
    circle.attr("r", function(d) { return Math.sqrt(d); });
}

function doEnter(){
    var circle = d3.selectAll("circle");
    var svg = d3.select("svg");
    var circle = svg.selectAll("circle")
        .data([32, 57, 112, 293]);
    var circleEnter = circle.enter().append("circle");
    circleEnter.attr("cy", 60);
circleEnter.attr("cx", function(d, i) { return i * 100 + 30; });
circleEnter.attr("r", function(d) { return Math.sqrt(d); });
}

function doExit(){
    var circle = svg.selectAll("circle")
    .data([32, 57]);
    circle.exit().remove();
}
*/

/*
function doUpdate(){
    var rect = d3.selectAll("rect");
    rect.data([1000, 1500, 2000]);
    rect.attr("width", function(d) { return Math.sqrt(d); });
    rect.attr("height", function(d) { return Math.sqrt(d); });
}

function doEnter(){
    var svg = d3.select("svg");
    var rect = svg.selectAll("rect")
        .data([1000, 1500, 2000, 2500]);
    var rectEnter = rect.enter().append("rect");
        rectEnter.attr("x", "300");
        rectEnter.attr("y", "50");
        rectEnter.attr("width", function(d) { return Math.sqrt(d); });
        rectEnter.attr("height", function(d) { return Math.sqrt(d); });
}

function doExit(){
    var svg = d3.select("svg");
    var rect = svg.selectAll("rect")
    .data([1000, 1500]);
    rect.exit().remove();
}
*/

var data = [0.2, 1.7, 4.3, 3.3];

var xscale = d3.scaleLinear()
    .domain([0, 5])
    .range([0,window.innerWidth]);