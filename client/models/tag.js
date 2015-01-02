Tag = {};

/*
Tag
	text
	color - Optional
	userId - *Inserted at the Collection handler level
*/

DEFAULT_COLOR = 'blue';

// Create

Tag.create = function(text, color) {
	if (!color) {
		color = DEFAULT_COLOR;
	}

	tag = {
		text: text,
		color: color
	}

	if (!Tag.valid(tag)) {
		throw new Error("Invalid tag");
	}

	return Tags.insert(tag);
};

Tag.valid = function(tag) {
	return tag.text && tag.color;
};

// Find

Tag.findAll = function() {
	return Tags.find().fetch();
};

Tag.findById = function(id) {
	return Tags.findOne({_id: id});
};

Tag.findByText = function(text) {
	return Tags.findOne({text: text});
};

// Expenses

// Given a complex query about tags, return all the expenses which pass it 
Tag.getExpensesByQuery = function(query) {
	return Expenses.find({tags: query}).fetch();
};

// Given a tag, return all of the expenses that are tagged with it
Tag.getExpenses = function(tag) {
	return Expenses.find({tags: tag._id}).fetch();
};

