//-----------------//
//-- Collections --//
//-----------------//

Meteor.subscribe('expenses');

//------------//
//-- Routes --//
//------------//

Router.configure({
  loadingTemplate: 'loading',
  layoutTemplate: 'ApplicationLayout',
  // Send to the intro page if not logged in 
  onBeforeAction: function() {
    // while (Meteor.loggingIn());
    if (!Meteor.user()) {
      this.render('Intro');
    } else {
      this.next();
    }
  },
  // Delay the loading bar starting for fast routes
  progressDelay: 100
});

Router.route('/', function() {
  this.redirect('/home');
});

Router.route('/home', function() {
  this.render('Home', {data: {title: 'My Title'}});
});

Router.route('/new', function() {
  this.render('New');
});

Router.route('/history', function() {
  this.render('History');
});

// Router.route('/expenses/:_id', function() {
//   var expense = Expenses.findOne({_id: this.params._id});
//   this.render('ExpensePage', {data: expense});
// });

//------------//
//-- client --//
//------------//

Meteor.startup(function() {
  
});

Template.registerHelper('formatDate', function(date) {
  return moment(date).format('MM-DD-YYYY');
});

Template.Nav.helpers({
  loggedIn: function() {
    return Meteor.user();
  },
  activePage: function(path) {
    return Router.current().route.path() == path ? 'active' : ''; 
  }
});

// Check if a tag is valid
var validExpense = function(tag) {
  return tag.amount != "" && tag.description != "";
};

Template.New.events({
  'submit #newForm': function(e, t) {
    var amount      = t.find('#amount').value;
    var description = t.find('#description').value;
    var tags        = t.find('#tags').value;

    // Split tags into Tag objects
    tags = tags.split(",");
    for (i in tags) { tags[i] = {text: tags[i], color: "blue"} }

    expense = {
      amount: amount,
      description: description,
      tags: tags,
      userId: Meteor.user()._id
    }

    if (!validExpense(expense)) {
      // Need to add possibly message to user explaining missing fields
      return false;
    }

    t.find('#amount').value = "";
    t.find('#description').value = "";
    t.find('#tags').value = "";

    Expenses.insert(expense);

    return false;
  }
});

Template.History.helpers({
  expenses: function() {
    return Expenses.find().fetch();
  }
});