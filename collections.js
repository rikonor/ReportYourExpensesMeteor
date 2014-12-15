Expenses = new Meteor.Collection('expenses');

Expenses.allow({
	insert: function(userId, doc) {
		// Add created_at field
		doc.created_at = new Date();
		return (userId && doc.userId === userId);
	},
	update: function(userId, doc, fields, modifier) {
		// Add modified_at field
		if (!modifier['$set']) modifier['$set'] = {}; 
		modifier['$set']['modified_at'] = new Date();
		
		return doc.userId === userId;
	},
	remove: function(userId, doc) {
		return doc.userId === userId;
	}
});