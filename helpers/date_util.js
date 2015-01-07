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

DateUtil.completeMonth = function(date) {
	// Given a date, returns an array of date objects pertaining to each day of the supplied day's month
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