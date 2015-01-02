Template.New.rendered = function() {
  $('#tags').tagsinput();
};

Template.NewExpenseForm.events({
  'submit #newForm': function(e, t) {
    var amount      = parseFloat(t.find('#amount').value);
    var description = t.find('#description').value;
    var tags        = t.find('#tags').value;

    // Split tags into Tag objects
    tags = tags.split(",");

    expense = {
      amount: amount,
      description: description,
      tags: tags
    }

    if (!Expense.valid(expense)) {
      // Need to add possibly message to user explaining missing fields
      return false;
    }

    // Reset form
    t.find('#amount').value = "";
    t.find('#description').value = "";
    $('#tags').tagsinput('removeAll');

    // This line makes the form submit and reload the page and nothing is actually inserted.
    Expense.create(amount, description, tags);

    // Expenses.insert(expense);
    return false;
  }
});