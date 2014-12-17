//-----------------//
//-- Collections --//
//-----------------//

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
  waitOn: function() {
    Meteor.subscribe('expenses');
  },
  // Delay the loading bar starting for fast routes
  progressDelay: 100
});

Router.route('/', function() {
  this.redirect('/home');
});

Router.route('/home', function() {
  this.render('Home');
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

// Check if an expense is valid
var validExpense = function(expense) {
  return expense.amount != NaN || expense.description != "";
};

Template.New.rendered = function() {
  $('#tags').tagsinput();
};

Template.New.events({
  'submit #newForm': function(e, t) {
    var amount      = parseFloat(t.find('#amount').value);
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

    // Reset form
    t.find('#amount').value = "";
    t.find('#description').value = "";
    $('#tags').tagsinput('removeAll');

    Expenses.insert(expense);

    return false;
  }
});

Template.History.helpers({
  expenses: function() {
    return Expenses.find().fetch();
  },
  totalSum: function() {
    expenses = Expenses.find().fetch();
    totalSum = 0;
    for (i in expenses) {
      totalSum += expenses[i]['amount'];
    }
    return totalSum;
  }
});

Template.Home.rendered = function() {
  var expenses = Expenses.find().fetch();
  // GraphUtils.createLineGraph('.graph', expenses);
};