//-----------------
//-- Collections --
//-----------------

Meteor.publish('expenses', function() {
  return Expenses.find({userId: this.userId});
});

Meteor.publish('tags', function() {
  return Tags.find({userId: this.userId});
});

//------------
//-- Server --
//------------

Meteor.startup(function () {

});