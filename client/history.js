var query = {};
var queryDep = new Deps.Dependency;

Template.History.rendered = function() {
  var initTags = Tags.find().fetch().map(function(it){ return it.text; });
  $('#query').tagsinput({
    allowDuplicates: true,
    typeahead: { source: initTags.concat(['OR','AND']) },
    freeInput: true
  });
};

Template.History.events({
  'itemAdded #query, itemRemoved #query': function(event, template) {
    queryString = template.find('#query').value;
    query = QueryEngine.process(queryString);
    queryDep.changed();
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
    return ExpenseUtils.sum(expenses);
  }
});

Template.Expense.helpers({
  tags: function() {
    return Expense.getTags(this);
  }
});
