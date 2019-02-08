console.log("Welcome to Data Land");

//for txt
d3.text("load data/text.txt", function(error, data) {
    console.log("error:", error);
    console.log("text: ", data);
});

//for csv
d3.csv("load data/csv.csv", function(error, data) {
    console.log("csv: ", data);
    data.forEach(function(d) {
        d.export = parseFloat(d.export);
    });
});


//for json
d3.json("load data/json.json", function(error, data) {
    console.log("error:", error);
    console.log("json: ", data);
});