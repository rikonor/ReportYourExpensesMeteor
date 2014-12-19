Tag = {};

/*
Tag
	text
	color
	userId
*/

DEFAULT_COLOR = 'blue';

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