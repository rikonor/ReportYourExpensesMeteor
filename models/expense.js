Expense = {};

// Create

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
  var validAmount = (expense.amount || false) && typeof(expense.amount) == 'number';
  var validDescription = (expense.description || false) && expense.description != "";
  return validAmount && validDescription;
};

// Find

Expense.findByQuery = function(query, options) {
	query = query || {};
	options = options || {sort: {effective_at: -1}};

	return Expenses.find(query, options).fetch();
};

Expense.findAll = function() {
	return Expense.findByQuery({});
};

Expense.findById = function(id) {
	return Expenses.findOne({_id: id});
};

// Tags

Expense.getTags = function(expense) {
	return Tags.find({_id: {$in: expense.tags}}).fetch();
};

// Dates

/* properties */
Expense.getCreationDate = function(expense) {
	return expense.created_at;
};
Expense.getEffectiveDate = function(expense) {
	return expense.effective_at;
};
Expense.getYear = function(expense) {
	d = Expense.getEffectiveDate(expense);
	return DateUtil.getYear(d);
};
Expense.getMonth = function(expense) {
	d = Expense.getEffectiveDate(expense);
	return DateUtil.getMonth(d);
};
Expense.getDate = function(expense) {
	d = Expense.getEffectiveDate(expense);
	return DateUtil.getDate(d);
};

/* utilities */
Expense.fromDateRange = function(start, end) {
	return Expenses.find({
		"effective_at": {
			$gt: start,
			$lt: end
		}
	}).fetch();
};
Expense.fromYear = function(date) {
// If date given, find the expenses from the year
// of the date, otherwise from current year
	start = DateUtil.getYear(date || new Date());
	end = DateUtil.nextYear(start);
	return Expense.fromDateRange(start, end);
};
Expense.fromMonth = function(date) {
// Like Expense.fromYear
	start = DateUtil.getMonth(date || new Date());
	end = DateUtil.nextMonth(start);
	return Expense.fromDateRange(start, end);
};
Expense.fromDate = function(date) {
// Like Expense.fromYear
	start = DateUtil.getDate(date || new Date());
	end = DateUtil.nextDay(start);
	return Expense.fromDateRange(start, end);
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