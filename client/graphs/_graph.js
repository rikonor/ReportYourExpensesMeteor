DEFAULTS = {
	width: 800,
    height: 400,
	margin: {
		top: 20,
		right: 20,
		bottom: 30,
		left: 40
	}
};

Graph = function(selector) {
	this.defaults = DEFAULTS;
	this.selector = selector;
	return this;
};

Graph.prototype.setData = function(dateValueArray) {
	this.dateValueArray = dateValueArray;
	return this;
};

Graph.prototype.setOptions = function(options) {
    options = options || {};

    // Fallback to defaults
    this.margin = options.margin || this.defaults.margin;
    this.width = options.width || this.defaults.width;
    this.height = options.height || this.defaults.height;

    // Adjust
    this.width -= (this.margin.left + this.margin.right);
    this.height -= (this.margin.top + this.margin.bottom);

    return this;
};

Graph.prototype.createCanvas = function() {
    // Create SVG
    var svg = d3.select(this.selector).append('svg')
    .attr('width', this.width + this.margin.left + this.margin.right)
    .attr('height', this.height + this.margin.top + this.margin.bottom);

    // Create mainG
    this.mainG = svg.append('g')
    .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');

    return this;
};

Graph.prototype.drawAxis = function() {
    // Init the axes
    this.x = d3.time.scale().range([0, this.width]);
    this.y = d3.scale.linear().range([this.height, 0]);

    var minDate = _.min(this.dateValueArray.map(function(elem) { return elem.date; }));
    var maxDate = _.max(this.dateValueArray.map(function(elem) { return elem.date; }));
    this.x.domain([minDate, DateUtil.nextMonth(maxDate)]);

    var minValue = _.min(this.dateValueArray.map(function(elem) { return elem.value; }));
    var maxValue = _.max(this.dateValueArray.map(function(elem) { return elem.value; }));
    this.y.domain([0, maxValue]);

    this.xAxis = d3.svg.axis().scale(this.x).orient('bottom');
    this.yAxis = d3.svg.axis().scale(this.y).orient('left');

    this.mainG.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + this.height + ")")
    .call(this.xAxis);

    this.mainG.append("g")
    .attr("class", "y axis")
    .call(this.yAxis)
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dy", ".71em")
    .style("text-anchor", "end")
    .text("Expenditure");

    return this;
};

Graph.prototype.drawData = function() {
    // Should be overriden by child classes
  	// Bar, Line, etc

    return this;
};

Graph.prototype.update = function(dateValueArray) {
    return this.setData(dateValueArray).drawAxis().drawData();
};