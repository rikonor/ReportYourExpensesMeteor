var createBarChart = function(selector, data) {
  var margin = {top: 20, right: 20, bottom: 30, left: 40},
      width = 800 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;

  var x = d3.time.scale().range([0, width]);
  var y = d3.scale.linear().range([height, 0]);

  var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

  var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .ticks(10, "%");

  var svg = d3.select(selector).append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  x.domain(data.map(function(d) { return d.t; }));
  y.domain([0, d3.max(data, function(d) { return d.val; })]);

  svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Expenditure");

  svg.selectAll(".bar")
      .data(data)
    .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return x(d.t); })
      .attr("width", 10)
      .attr("y", function(d) { return y(d.val); })
      .attr("height", function(d) { return height - y(d.val); });
};

var createLineGraph = function(selector, data) {
  var margin = {top: 20, right: 20, bottom: 30, left: 50};
  var width = 800 - margin.left - margin.right;
  var height = 400 - margin.top - margin.bottom;

  var x = d3.time.scale().range([0, width]);
  var y = d3.scale.linear().range([height, 0]);

  var xAxis = d3.svg.axis().scale(x).orient('bottom');
  var yAxis = d3.svg.axis().scale(y).orient('left');

  var line = d3.svg.line()
    .x(function(d) { return x(new Date(d.t)); })
    .y(function(d) { return y(d.val); });

  var svg = d3.select(selector).append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

  xMin = d3.min(data, function(d) { return new Date(d.t); });
  xMax = d3.max(data, function(d) { return new Date(d.t); });
  x.domain([xMin, xMax]);
  yMax = d3.max(data, function(d) { return d.val; })
  y.domain([0, yMax + 100]);

  svg.append('g')
    .attr('class', 'x axis')
    .attr('transform', 'translate(0,' + height + ')')
    .call(xAxis);

  svg.append("g")
    .attr("class", "y axis")
    .call(yAxis)
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dy", ".71em")
    .style("text-anchor", "end")
    .text("Price (NIS)");

  svg.append('path')
    .datum(data)
    .attr('class', 'line')
    .attr('d', line);
};

GraphUtils = {
  createLineGraph: createLineGraph,
  createBarChart: createBarChart
}