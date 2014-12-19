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