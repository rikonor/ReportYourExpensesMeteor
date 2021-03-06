Template.New.rendered = function() {
  var initTags = Tags.find().fetch().map(function(it){ return it.text; });
  $('#tags').tagsinput({
    typeahead: { source: initTags },
    freeInput: true
  });

  // Add current year and month to each new entry
  $('#tags').tagsinput('add', moment(DateUtil.getCurrentYear()).format('YYYY'));
  $('#tags').tagsinput('add', moment(DateUtil.getCurrentMonth()).format('MMMM'));
};

Template.CurrentTotal.helpers({
  currentTotal: function() {
    return Expense.sum(Expense.fromMonth());
  },
  currentMonth: function() {
    return moment(DateUtil.getCurrentMonth()).format('MMMM');
  },
  currentYear: function() {
    return moment(DateUtil.getCurrentYear()).format('YYYY');
  }
});

Template.NewExpenseForm.events({
  'submit #newForm': function(e, t) {
    var amount      = parseFloat(t.find('#amount').value);
    var description = t.find('#description').value;
    var tags        = t.find('#tags').value;

    // Split tags into Tag objects
    tags = tags.split(",");

    // Form validation
    expense = {
      amount: amount,
      description: description,
      tags: tags
    }

    if (!Expense.valid(expense)) {
      // Need to add possibly message to user explaining missing fields
      console.log("Invalid expense");
      return false;
    }

    // Reset form
    t.find('#amount').value = "";
    t.find('#description').value = "";
    $('#tags').tagsinput('removeAll');

    Expense.create(amount, description, tags);

    return false;
  }
});