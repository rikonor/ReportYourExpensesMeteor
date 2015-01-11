Template.Home.rendered = function() {
  dateGroup = ExpenseUtils.sumByMonth(Expense.findAll());
  dateGroup = DateValue.padGroup(dateGroup, {resolution: {months: 1}});
  dateArray = DateValue.groupToArray(dateGroup);
  // Graph.createLineGraph('.graph', dateArray);
  Graph.createBarGraph('.graph', dateArray);
};
