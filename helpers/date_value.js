DateValue = {};

// Defaults
DateValue.DEFAULT_DATE = function() {
	return new Date();
};
DateValue.DEFAULT_VALUE = function() {
	return 0;
};

// DateValue.Element's

// An DateValue.Element has a date and a value
DateValue.Element = function(date, value) {
	return {
		date: new Date(date),
		value: value || DateValue.DEFAULT_VALUE()
	};
};

// DateValue.Array's

// A DateValue.Array is an array of DateValue.Element objects
DateValue.Array = function(elements) {
	return elements || [];
};

DateValue.sortArray = function(array) {
	return _.sortBy(array, function(element) { return element.date; });
};

// DateValue.Group's

// A DateValue.Group is a mapping from dates (as keys) to arrays of values
DateValue.Group = function() {
	return {};
};

DateValue.createGroup = function(elements, groupingMethod, transformMethod) {
	var group = {};
	
	// Group
	elements.forEach(function(element) {
		date = groupingMethod(element);
		if (group[date] == undefined) {
			group[date] = [];
		}
		group[date].push(element);
	});

	// Transform
	if (transformMethod != undefined) {
		for (date in group) {
			group[date] = transformMethod(group[date]);
		}
	}

	return group;
};

DateValue.groupToArray = function(group) {
	group = group || DateValue.Group();

	array = [];

	for (date in group) {
		array.push(DateValue.Element(date, group[date]));
	}

	return DateValue.sortArray(array);
};

DateValue.padGroup = function(group, options) {
	options = options || {};

	var paddingValue = options.paddingValue || DateValue.DEFAULT_VALUE();
	var start = options.start || DateUtil.getMinInArray(Object.keys(group));
	var end = options.end || DateUtil.getMaxInArray(Object.keys(group));
	var resolution = options.resolution || {days: 1};

	var datesArray = DateUtil.createRange(start, end, resolution, true);
	datesArray.forEach(function(date) {
		group[date] = group[date] || paddingValue;
	});

	return group;
};

// Get oldest element in a DateValue.Group
DateValue.getOldestInGroup = function(group) {
	var minDate = DateUtil.getMinInArray(Object.keys(group));
	return DateValue.Element(minDate, group[minDate]);
};
// Get latest element in a DateValue.Group
DateValue.getLatestInGroup = function(group) {
	var maxDate = DateUtil.getMaxInArray(Object.keys(group));
	return DateValue.Element(maxDate, group[maxDate]);
};

// ExpenseUtils.findDateElementInDateGroup = function(date, dateGroup) {
// 	for (i in dateGroup) {
// 		dateElement = dateGroup[i];
// 		if (date == dateElement.t) {
// 			return dateElement;
// 		}
// 	}
// };

// ExpenseUtils.padMonth = function(totalGroup, paddingValue) {
// 	paddingValue = (paddingValue == undefined) ? null : paddingValue;

// 	var tmp = new Date(totalGroup[0].date);
// 	// var tmp = new Date(Object.keys(totalGroup)[0])
// 	var month = DateUtil.getMonth(tmp);
// 	var completeMonth = DateUtil.completeMonth(month);
// 	results = [];
// 	for (i in completeMonth) {
// 		date = completeMonth[i];
// 		sumElement = ExpenseUtils.findDateElementInDateGroup(date, totalGroup);
// 		if (sumElement) {
// 			results.push(sumElement);
// 		} else {
// 			results.push({date: date, value: paddingValue});
// 		}
// 	}
// 	return results;
// };
