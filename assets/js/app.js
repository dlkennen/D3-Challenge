// D3 Homework - Diana Kennen
var svgWidth = 960;
var svgHeight = 500;

var margin = {
    top: 20,
    right: 40,
    bottom: 60,
    left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

//Creating svg canvas
var svg = d3.select("#scatter")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

//Append the overall chartgroup for the scatter plot
var chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

//Importing csv
d3.csv("assets/data/data.csv").then(function(healthdata) {

    //Typecasting Poverty and Obesity Data as Numbers
    healthdata.forEach(function(data) {
        data.poverty = +data.poverty;
        data.obesity = +data.obesity;
    });

    //Creating scale functions for x and y axis
    var xLinearScale = d3.scaleLinear()
        .domain([0, d3.max(healthdata, d => d.poverty)])
        .range([0, width]);
    var yLinearScale = d3.scaleLinear()
        .domain([0, d3.max(healthdata, d => d.obesity)])
        .range([height, 0]);
    
    //Creating axis functions
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    //Appending the axis subgroups to the chart
    chartGroup.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(bottomAxis);
    
    chartGroup.append("g")
        .call(leftAxis);
    
    //Creating circle data points for scatter plot by appending circleGroup
    var circlesGroup = chartGroup.selectAll("circle")
        .data(healthdata)
        .enter()
        .append("circle")
        .attr("cx", d => xLinearScale(d.poverty))
        .attr("cy", d => yLinearScale(d.obesity))
        .attr("r", "18")
        .attr("fill", "blue")
        .attr("opacity", ".5")
    
    //Appending state abbreviations to data points
    var stateAbbr = chartGroup.selectAll(null)
        .data(healthdata)
        .enter()
        .append("text");
    
    stateAbbr
        .attr("x", d => xLinearScale(d.poverty))
        .attr("y", d => yLinearScale(d.obesity))
        .text(d => d.abbr)
        .attr("text-anchor", "middle")
        .attr("font-size", "11px")
        .attr("fill", "white");

    //Create axis labels for x and y axis by appending text
    chartGroup.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left + 40)
        .attr("x", 0 - (height / 2))
        .attr("dy", "1em")
        .attr("class", "axisText")
        .text("Obesity");
    
    chartGroup.append("text")
        .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
        .attr("class", "axisText")
        .text("Poverty");

}).catch(function(error) {
    console.log(error);
});  
