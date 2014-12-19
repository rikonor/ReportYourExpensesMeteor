Expenses = new Meteor.Collection('expenses');
Tags = new Meteor.Collection('tags');

Expenses.allow({
	insert: function(userId, doc) {
		// Add created_at field
		doc.created_at = new Date();
		doc.effective_at = doc.created_at;
		doc.userId = userId;
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

Tags.allow({
	insert: function(userId, doc) {
		// Add created_at field
		doc.created_at = new Date();
		doc.userId = userId;
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