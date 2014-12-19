Expense = {};

Expense.create = function(amount, description, tags) {
	expense = {
		amount: amount,
		description: description,
		tags: []
	};
	
	if (!Expense.valid(expense)) {
		throw new Error("Invalid expense");
	}
	
	for (i in tags) {
		var text = tags[i];
		// Try and find the tag
		var tag = Tags.findOne({text: text})
		if (tag) {
			tag_id = tag._id;
		} else {
			// If not found create it
			// TODO - what about when the tag create doesn't work? wouldn't it reaturn a bad tag_id?
			tag_id = Tag.create(text);
		}
	
		// And append the tag_id to the expense's tags
		expense['tags'].push(tag_id);
	}

	return Expenses.insert(expense);
}

Expense.valid = function(expense) {
  return expense.amount != NaN && expense.description != "";
};

Expense.getTags = function(expense) {
	return Tags.find({_id: {$in: expense.tags}}).fetch();
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

/* Utilities */

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