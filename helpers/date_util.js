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