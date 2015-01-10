Template.Home.rendered = function() {
  var dateGroup = ExpenseUtils.sumByDate(Expense.findAll());
  dateGroup = DateValue.padGroup(dateGroup);
  dateArray = DateValue.groupToArray(dateGroup);
  Graph.createLineGraph('.graph', dateArray);
};
