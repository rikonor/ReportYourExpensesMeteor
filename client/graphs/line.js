Graph.createLineGraph = function(selector, data) {
  var margin = {top: 20, right: 20, bottom: 30, left: 50};
  var width = Graph.defaults.width - margin.left - margin.right;
  var height = Graph.defaults.height - margin.top - margin.bottom;

  var x = d3.time.scale().range([0, width]);
  var y = d3.scale.linear().range([height, 0]);

  var xAxis = d3.svg.axis().scale(x).orient('bottom');
  var yAxis = d3.svg.axis().scale(y).orient('left');

  var line = d3.svg.line()
    .x(function(d) { return x(new Date(d.date)); })
    .y(function(d) { return y(d.value); });

  var svg = d3.select(selector).append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

  xMin = d3.min(data, function(d) { return new Date(d.date); });
  xMax = d3.max(data, function(d) { return new Date(d.date); });
  x.domain([xMin, xMax]);
  yMax = d3.max(data, function(d) { return d.value; })
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
