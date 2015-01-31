// Meteor.methods({});

// Given a userId email the user
// with the total amount he spent on that month
var totalMonthNotification = function(userId) {
  var user = User.findById(userId);

  console.log("Monthly email: ", userId);

  var expenses = User.getExpenses(userId);
  var dateValueGroup = ExpenseUtils.groupByMonth(expenses);
  
  // Get the previous month
  var date = DateUtil.incrementMonths(DateUtil.getCurrentMonth(), -1)

  expenses = dateValueGroup[date];
  if (expenses == undefined) {
    console.log("Monthly email: No expenses found for user ", userId)
    return;
  }

  var totalAmount = Expense.sum(expenses);

  var to = user.emails[0].address;
  var from = "noreply@reportyourexpenses.meteor.com";
  
  var subject = "Total expenses for " +
    moment(date).format('MMMM, YYYY') +
    ": " + totalAmount + " NIS";  
  
  var text = 
    "Hi,\n" +
    "We're just writing to let you know you spent " + totalAmount +
    " NIS during " + moment(date).format('MMMM, YYYY') + ".\n\n" +
    "Best regards,\n" +
    "Report Your Expenses";

  Email.send({
    to: to,
    from: from,
    subject: subject,
    text: text
  });
};

// This handler should be run every month
var monthlyTimerHandler = function() {
  
  // Send an email to all users with the total for the previos month
  var users = User.findAll();
  users.forEach(function(user) {
    totalMonthNotification(user._id);
  });
};

var cron = new Meteor.Cron({
  events: {
    // "0 0 * * *": dailyTimerHandler,
    // "0 0 * * 0": weeklyTimerHandler,
    "0 0 1 * *": monthlyTimerHandler
  }
});