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

Meteor.startup(function() {
    // Connect to Kadira
    // Kadira.connect('e9BtPNt9HQTccfbnn', '71ead6f7-0a5e-4a8a-aaf3-121651a1a185');

    // Create indexes
    Expenses._ensureIndex({"tags": 1});
});