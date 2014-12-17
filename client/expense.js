Expense = {};

var valid = function(expense) {
  return expense.amount != NaN || expense.description != "";
};

Expense.getCreationDate = function(expense) {
	return expense.created_at;
};
Expense.getYear = function(expense) {
	d = Expense.getCreationDate(expense);
	return DateUtil.getYear(d);
};
Expense.getMonth = function(expense) {
	d = Expense.getCreationDate(expense);
	return DateUtil.getMonth(d);
};
Expense.getDate = function(expense) {
	d = Expense.getCreationDate(expense);
	return DateUtil.getDate(d);
};

ExpenseUtils = {};

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

ExpenseUtils.findDateElementInDateGroup = function(date, dateGroup) {
	for (i in dateGroup) {
		dateElement = dateGroup[i];
		if (date == dateElement.t) {
			return dateElement;
		}
	}
};

ExpenseUtils.padMonth = function(totalGroup) {
	var tmp = new Date(totalGroup[0].t);
	// var tmp = new Date(Object.keys(totalGroup)[0])
	var month = DateUtil.getMonth(tmp);
	var completeMonth = DateUtil.completeMonth(month);
	results = [];
	for (i in completeMonth) {
		date = completeMonth[i];
		sumElement = ExpenseUtils.findDateElementInDateGroup(date, totalGroup);
		if (sumElement) {
			results.push(sumElement);
		} else {
			results.push({t: date, val: 0});
		}
	}
	return results;
};

DateUtil = {};

DateUtil.getYear = function(date) {
	return new Date(date.getFullYear());
};

DateUtil.getMonth = function(date) {
	return new Date(date.getFullYear(), date.getMonth());
};

DateUtil.getDate = function(date) {
	return new Date(date.getFullYear(), date.getMonth(), date.getDate());
};

DateUtil.completeMonth = function(date) {
	start = DateUtil.getMonth(date);
	days = [];
	current_day = start;
	end = new Date(start.getFullYear(), start.getMonth() + 1);
	while (current_day < end) {
		days.push(current_day);
		current_day = new Date(current_day.getFullYear(), current_day.getMonth(), current_day.getDate()+1);
	}
	return days;
};