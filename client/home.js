Template.Home.rendered = function() {
  var expenses = Expense.findAll();
  var groupedByDate = ExpenseUtils.groupByDate(expenses);
  data = [];
  for (date in groupedByDate) {
    data.push({
      t: date,
      val: ExpenseUtils.sum(groupedByDate[date])
    });
  }
  data = ExpenseUtils.padMonth(data, 0);
  Graph.createLineGraph('.graph', data);
};
