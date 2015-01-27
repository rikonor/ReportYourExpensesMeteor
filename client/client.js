// Routes

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
    return [
      Meteor.subscribe('expenses'),
      Meteor.subscribe('tags')
    ];
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

Router.route('/edit/:_id', {
  name: 'expense.edit',
  data: function() {
    return Expense.findById(this.params._id);
    // return this.params._id;
  },
  action: function() {
    this.render('Edit');
  }
});

Router.route('/history', function() {
  this.render('History');
});

// Meteor.startup(function() {
  
// });

Template.registerHelper('formatDate', function(date) {
  return moment(date).format('MM-DD-YYYY');
});
