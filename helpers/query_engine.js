QueryEngine = {};

// This is the QueryEngine
// It's role is to parse query strings into meaningful queries
//
// Reserved word (case insensitive):
// - AND, OR, NOT
//
// Example query strings:
// - "tag1,tag2,tag3" 				(Implicit AND)
// - "tag1,AND,tag2" 				(Explicit AND)
// - "tag1,OR,tag2" 				(Explicit OR)

QueryEngine.and = function(queries) {
	return {$and: queries};
};

QueryEngine.or = function(queries) {
	return {$or: queries};
};

// Processing functions

// Given an array, return an array of subarrays
// ['1',val,'2'] -> [['1'],['2']]
var sepByVal = function(tags, val) {
  var result = [];
  var i;
  var currentIndex = 0;
  for (i = 0; i < tags.length; i++) {
    tag = tags[i];
    if (tag == val) {
      result.push(tags.slice(currentIndex, i));
      currentIndex = i+1;
    }
  }
  result.push(tags.slice(currentIndex, i));
  return result;
};

// Check if a value is present in an array
var hasVal = function(tags, val) {
  return tags.indexOf(val) != -1;
};

var tagQuery = function(tags) {
  if (tags.length == 1) {
    return Tag.textToQuery(tags[0]);
  } else {
    return QueryEngine.and(tags.map(function(tag) {return Tag.textToQuery(tag)}));
  }
};

// This is a recursive function meant to handle an array
// of tags, along with 'OR', 'AND' separators
var processTagsArray = function(tags) {
  if (hasVal(tags, 'OR')) {
    var orGroup = sepByVal(tags, 'OR');
    return QueryEngine.or(orGroup.map(function(orElem) {return processTagsArray(orElem)}));
  }

  else if (hasVal(tags, 'AND')) {
    var andGroup = sepByVal(tags, 'AND');
    return QueryEngine.and(andGroup.map(function(andElem) {return processTagsArray(andElem)}));
  }

  else {
    return tagQuery(tags);
  }
};

QueryEngine.process = function(queryString) {
  console.log(queryString);
  if (queryString == "") {
    // An empty query will return all items
    return {};
  }

  tags = queryString.split(",");

  // ToEnable '+' as OR, replace all '+' tags with 'OR'
  tags = tags.map(function(tag) {return tag == '+' ? 'OR' : tag});

  // If first/last tag are 'OR'/'AND', ignore them
  if (Tag.isCmd(tags[0])) tags.shift();
  if (Tag.isCmd(tags[tags.length-1])) tags.pop();

  if (tags.length == 0) {
    return {};
  }

  return processTagsArray(tags);
};
