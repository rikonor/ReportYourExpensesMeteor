Graph.createBarGraph = function(selector, dateValueArray) {
    var margin = {top: 20, right: 20, bottom: 30, left: 40};
    var width = Graph.defaults.width - margin.left - margin.right;
    var height = Graph.defaults.height - margin.top - margin.bottom;

    var x = d3.time.scale().range([0, width]);
    var y = d3.scale.linear().range([height, 0]);

    var xAxis = d3.svg.axis().scale(x).orient('bottom');
    var yAxis = d3.svg.axis().scale(y).orient('left');

    var minDate = _.min(dateValueArray.map(function(elem) { return elem.date; }));
    var maxDate = _.max(dateValueArray.map(function(elem) { return elem.date; }));
    x.domain([minDate, maxDate]);

    var minValue = _.min(dateValueArray.map(function(elem) { return elem.value; }));
    var maxValue = _.max(dateValueArray.map(function(elem) { return elem.value; }));
    y.domain([minValue, maxValue]);

    var svg = d3.select(selector).append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom);
    
    var mainG = svg.append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    mainG.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);

    mainG.append("g")
    .attr("class", "y axis")
    .call(yAxis)
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dy", ".71em")
    .style("text-anchor", "end")
    .text("Expenditure");

    var barWidth = width / dateValueArray.length;

    mainG.selectAll(".bar")
    .data(dateValueArray)
    .enter().append("rect")
    .attr("class", "bar")
    .attr("x", function(d) { return x(d.date); })
    .attr("width", barWidth)
    .attr("y", function(d) { return y(d.value); })
    .attr("height", function(d) { return height - y(d.value); });
};