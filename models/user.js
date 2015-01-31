User = {};

User.findAll = function() {
	return Meteor.users.find().fetch();
};

User.findById = function(id) {
	return Meteor.users.findOne({_id: id});
};

User.getExpenses = function(userId) {
	return Expense.findByQuery({userId: userId});
};