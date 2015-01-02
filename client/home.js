Template.Home.rendered = function() {
  var expenses = Expenses.find().fetch();
  var groupedByDate = ExpenseUtils.groupByDate(expenses);
  data = [];
  for (date in groupedByDate) {
    data.push({
      t: date,
      val: ExpenseUtils.sum(groupedByDate[date])
    });
  }
  data = ExpenseUtils.padMonth(data);
  Graph.createLineGraph('.graph', data);
};

Template.Expense.helpers({
  tags: function() {
    return Expense.getTags(this);
  }
});