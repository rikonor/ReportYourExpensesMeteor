var Bar = Graph.Bar = function(selector) {
    Graph.call(this, selector);
    return this;
};

Bar.prototype = Object.create(Graph.prototype);
Bar.prototype.constructor = Bar;

Bar.prototype.drawData = function() {
    main = this;

    this.barWidth = this.width / this.dateValueArray.length;

    // Get selection after data
    this.bars = this.mainG.selectAll(".bar").data(this.dateValueArray);

    // new bars
    this.bars.enter().append("rect")
    .attr("class", "bar")
    .attr("x", function(d, i) {
        return Math.floor(main.x(d.date)) + 5;
    })
    .attr("width", function(d, i) {
        var selectedWidth = (!main.dateValueArray[i+1]) ?
            main.barWidth :
            Math.ceil(main.x(main.dateValueArray[i+1].date) - main.x(d.date));
        return selectedWidth - 10;
    })
    .attr("y", function(d) { return main.y(d.value); })
    .attr("height", function(d) { return main.height - main.y(d.value); });

    // remove olds    
    this.bars.exit().remove();

    return this;
};

Graph.createBarGraph = function(selector, dateValueArray) {
    var graph = new Graph.Bar(selector);
    return graph.setData(dateValueArray).setOptions().createCanvas().drawAxis().drawData();
};
