QueryEngine = {};

// This is the QueryEngine
// It's role is to parse query strings into meaningful queries
//
// Reserved word (case insensitive):
// - and, or, not
// - year, month, day
//
// Example query strings:
// - "tag1,tag2,tag3" 				(Implicit AND)
// - "tag1,and,tag2" 				(Explicit AND)
// - "tag1,or,tag2" 				(Explicit OR)
// - "Year: 2014, Month: 9,tag1" 	(Date and tag)

QueryEngine.and = function(queries) {
	return {$and: queries};
};

QueryEngine.or = function(queries) {
	return {$or: queries};
};

QueryEngine.process = function(queryString) {
	if (queryString == "") {
		// An empty query will return all items
		return {};
	}

	queryArgs = queryString.split(",");

    queries = [];
    for (i in queryArgs) {
      var text = queryArgs[i];
      
      // Convert text to TagQuery
      // Consider there might be other kinds of queries possible
      var id = Tag.textToId(text);
      var innerQuery = Tag.idToQuery(id);
      
      queries.push(innerQuery);
    }

    return QueryEngine.and(queries);
};