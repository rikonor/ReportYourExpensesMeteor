Template.Nav.helpers({
  loggedIn: function() {
    return Meteor.user();
  },
  activePage: function(path) {
    return Router.current().route.path() == path ? 'active' : ''; 
  }
});