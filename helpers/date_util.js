DateUtil = {};

DateUtil.getYear = function(date) {
	// Notice Date(year) will return 1970, you have to give it a month as well
	return new Date(date.getFullYear(), 0);
};

DateUtil.getMonth = function(date) {
	return new Date(date.getFullYear(), date.getMonth());
};

DateUtil.getDate = function(date) {
	// Given a date object, return the
	return new Date(date.getFullYear(), date.getMonth(), date.getDate());
};

DateUtil.getCurrentYear = function() {
	return DateUtil.getYear(new Date());
};

DateUtil.getCurrentMonth = function() {
	return DateUtil.getMonth(new Date());
};

DateUtil.getCurrentDate = function() {
	return DateUtil.getDate(new Date());
};

// Arithmetics
DateUtil.increment = function(date, numOfYears, numOfMonths, numOfDays) {
// Increment each numOfX from the given date
// If date not given, use current date
	date = date || new Date();
	return new Date(
		date.getFullYear() + numOfYears,
		date.getMonth() + numOfMonths,
		date.getDate() + numOfDays
	);
};
DateUtil.incrementYears = function(date, numOfYears) {
// Given a date, increment numOfYears years from it
	return DateUtil.increment(date, numOfYears, 0, 0);
};
DateUtil.incrementMonths = function(date, numOfMonths) {
// Given a date, increment numOfYears months from it
	return DateUtil.increment(date, 0, numOfMonths, 0);
};
DateUtil.incrementDays = function(date, numOfDays) {
// Given a date, increment numOfYears days from it
	return DateUtil.increment(date, 0, 0, numOfDays);
};
// Helpers
DateUtil.nextYear = function(date) {
// If date is not given, return the next year from the current year
	date = DateUtil.getYear(date || new  Date());
	return DateUtil.incrementYears(date, 1);
};
DateUtil.nextMonth = function(date) {
// Same as DateUtil.nextYear
	date = DateUtil.getMonth(date || new  Date());
	return DateUtil.incrementMonths(date, 1);
};
DateUtil.nextDay = function(date) {
// Same as DateUtil.nextYear
	date = DateUtil.getDate(date || new  Date());
	return DateUtil.incrementDays(date, 1);
};

DateUtil.getMinInArray = function(dates) {
	return new Date(_.min(dates, function(date) { return new Date(date.toString()); }));
};
DateUtil.getMaxInArray = function(dates) {
	return new Date(_.max(dates, function(date) { return new Date(date.toString()); }));
};

// Date range methods

DateUtil.createRange = function(start, end, resolution, includeEnd) {
	start = DateUtil.getDate(start);
	end = DateUtil.getDate(end);

	resolution = {
		days: resolution.days || 0,
		months: resolution.months || 0,
		years: resolution.years || 0
	};

	var result = [];

	var current = start;
	while (current < end) {
		result.push(current);
		current = DateUtil.increment(current, resolution.years, resolution.months, resolution.days);
	}

	if (includeEnd) {
		result.push(current);
	}

	return result;
};

DateUtil.completeYearWithMonths = function(date) {
	var start = DateUtil.getYear(date);
	var end = DateUtil.nextYear(start);
	var resolution = { months: 1 };
	return DateUtil.createRange(start, end, resolution);
};
DateUtil.completeYearWithDates = function(date) {
	var start = DateUtil.getYear(date);
	var end = DateUtil.nextYear(start);
	var resolution = { days: 1 };
	return DateUtil.createRange(start, end, resolution);
};
DateUtil.completeMonthWithDates = function(date) {
	var start = DateUtil.getMonth(date);
	var end = DateUtil.nextMonth(start);
	var resolution = { days: 1 };
	return DateUtil.createRange(start, end, resolution);
};