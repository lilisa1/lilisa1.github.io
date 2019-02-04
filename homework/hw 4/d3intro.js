
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