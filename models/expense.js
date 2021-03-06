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

Expense.sum = function(expenses) {
	sum = 0;
	expenses.forEach(function(expense) {
		sum += expense['amount'];
	});
	return sum;
};

/* Utilities */

ExpenseUtils = {};

ExpenseUtils.groupByYear = function(expenses) {
	return DateValue.createGroup(expenses, Expense.getYear);
};
ExpenseUtils.groupByMonth = function(expenses) {
	return DateValue.createGroup(expenses, Expense.getMonth);
};
ExpenseUtils.groupByDate = function(expenses) {
	return DateValue.createGroup(expenses, Expense.getDate);
};

ExpenseUtils.sumByYear = function(expenses) {
	return DateValue.createGroup(expenses, Expense.getYear, Expense.sum);
};
ExpenseUtils.sumByMonth = function(expenses) {
	return DateValue.createGroup(expenses, Expense.getMonth, Expense.sum);
};
ExpenseUtils.sumByDate = function(expenses) {
	return DateValue.createGroup(expenses, Expense.getDate, Expense.sum);
};
