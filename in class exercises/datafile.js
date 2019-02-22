//for csv

var countryNames = {
    "us": "United States",
    "mx": "Mexico",
    "cn": "Canada"
};

d3.csv("load data/csv.csv", function(error, data) {

    data.forEach(function(d){
        d.export = parseFloat(d.export);
        d.source = "Lisa Made This";
        d.fullName = countryNames[d,country];
        console.log(d);
    });

    var currentData = data.filter(function(d){
        return d.year == "2018";
    });
    console.log(currentData);

    var dataExtent = d3.extent(data, function(d){
        return d.export;
    });
    console.log(dataExtent);

    var groupedCountries = d3.nest()
        .key(function(d){
            return d.country;
        })
        .entries(data);
        
    groupedCountries.forEach(function(d){
        d.total = d3.sum(d.values, function(row){
            return row.export;
        });
    });

    var yearlyData = d3.nest()
        .key(function(row){
            return row.year;
        })
        .entries(data);
        console.log("yearlyData", yearlyData)
});

