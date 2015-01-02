var query;
var queryDep = new Deps.Dependency;

Template.History.rendered = function() {
  $('#query').tagsinput();
};

Template.History.events({
  'itemAdded #query, itemRemoved #query': function(event, template) {
    query = template.find('#query').value;
    queryDep.changed();
  }
});

Template.History.helpers({
  query: function() {
    queryDep.depend();
    return query;
  },
  expenses: function() {
    return Expenses.find().fetch();
  },
  totalSum: function(expenses) {
    totalSum = 0;
    for (i in expenses) {
      totalSum += expenses[i]['amount'];
    }
    return totalSum;
  }
});