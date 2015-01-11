Template.Home.rendered = function() {
  dateGroup = ExpenseUtils.sumByDate(Expense.findAll());
  dateGroup = DateValue.padGroup(dateGroup);
  dateArray = DateValue.groupToArray(dateGroup);
  // Graph.createLineGraph('.graph', dateArray);
  Graph.createBarGraph('.graph', dateArray);
};
