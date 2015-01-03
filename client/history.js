var query = {};
var queryDep = new Deps.Dependency;

Template.History.rendered = function() {
  $('#query').tagsinput({
    allowDuplicates: true
  });
};

Template.History.events({
  'itemAdded #query, itemRemoved #query': function(event, template) {
    queryString = template.find('#query').value;
    query = QueryEngine.process(queryString);
    queryDep.changed();
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
    return ExpenseUtils.sum(expenses);
  }
});

Template.Expense.helpers({
  tags: function() {
    return Expense.getTags(this);
  }
});