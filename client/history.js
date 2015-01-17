var query = {};
var queryDep = new Deps.Dependency;

var graph;

var getDateValueArray = function(expenses) {
  var dateValueGroup = ExpenseUtils.sumByMonth(expenses);
  dateValueGroup = DateValue.padGroup(dateValueGroup, {resolution: {months: 1}});
  var dateValueArray = DateValue.groupToArray(dateValueGroup);
  return dateValueArray;
};

var graphExpenses = function() {
  var expenses = Expense.findByQuery(query);
  graph = Graph.createBarGraph('.graph', getDateValueArray(expenses));
};

Template.History.rendered = function() {
  var initTags = Tags.find().fetch().map(function(it){ return it.text; });
  $('#query').tagsinput({
    allowDuplicates: true,
    typeahead: { source: initTags.concat(['OR','AND']) },
    freeInput: true
  });
  graphExpenses();
};

Template.History.events({
  'itemAdded #query, itemRemoved #query': function(event, template) {
    queryString = template.find('#query').value;
    query = QueryEngine.process(queryString);
    queryDep.changed();

    var expenses = Expense.findByQuery(query);
    graph.update(getDateValueArray(expenses));
  },
  'click .tag': function(event, template) {
    // When clicking a tag, add it to the search bar
    var tag = event.currentTarget.text;
    $('#query').tagsinput('add', tag);
  }
});

Template.History.helpers({
  query: function() {
    queryDep.depend();
    return query;
  },
  expenses: function(query) {
    return Tag.getExpensesByQuery(query);
  },
  totalSum: function(query) {
    var expenses = Tag.getExpensesByQuery(query);
    return Expense.sum(expenses);
  }
});

Template.Expense.helpers({
  tags: function() {
    return Expense.getTags(this);
  }
});
