var query = {};
var queryDep = new Deps.Dependency;

Template.History.rendered = function() {
  $('#query').tagsinput();
};

Template.History.events({
  'itemAdded #query, itemRemoved #query': function(event, template) {
    queryString = template.find('#query').value;
    if (queryString == "") {
      query = {}
      queryDep.changed();
      return;
    }

    queryArgs = queryString.split(",");

    queries = [];
    for (i in queryArgs) {
      var text = queryArgs[i];
      var id = Tag.textToId(text);
      var innerQuery = Tag.idToQuery(id);
      queries.push(innerQuery);
    }

    query = Tag.andQueries(queries);
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
  totalSum: function(expenses) {
    totalSum = 0;
    for (i in expenses) {
      totalSum += expenses[i]['amount'];
    }
    return totalSum;
  }
});