Template.New.rendered = function() {
  var initTags = Tags.find().fetch().map(function(it){ return it.text; });
  $('#tags').tagsinput({
    allowDuplicates: true,
    typeahead: { source: initTags.concat(['OR','AND']) },
    freeInput: true
  });
};

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