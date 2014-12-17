Expense = {};

var valid = function(expense) {
  return expense.amount != NaN || expense.description != "";
};

Expense.getCreationDate = function(expense) {
	return expense.created_at;
};
Expense.getYear = function(expense) {
	return Expense.getCreationDate(expense).getFullYear();
};
Expense.getMonth = function(expense) {
	return Expense.getCreationDate(expense).getMonth();
};
Expense.getDate = function(expense) {
	return Expense.getCreationDate(expense).getDate();
};

ExpenseUtils = {};

// REDO THIS WHOLE THING IT SUCKS

ExpenseUtils.groupByYear = function(expenses) {
	result = {};
	expenses.forEach(function(expense) {
		year = Expense.getYear(expense);
		if (!result[year]) {
			result[year] = [];
		}
		result[year].push(expense);
	});
	return result;
};

ExpenseUtils.groupByMonth = function(expenses) {
	result = {};
	expenses.forEach(function(expense) {
		month = Expense.getMonth(expense);
		if (!result[month]) {
			result[month] = [];
		}
		result[month].push(expense);
	});
	return result;
};

ExpenseUtils.groupByDate = function(expenses) {
	result = {};
	expenses.forEach(function(expense) {
		day = Expense.getDate(expense);
		if (!result[day]) {
			result[day] = [];
		}
		result[day].push(expense);
	});
	return result;
};

ExpenseUtils.sum = function(expenses) {
	sum = 0;
	expenses.forEach(function(expense) {
		sum += expense['amount'];
	});
	return sum;
};