Template.Edit.rendered = function() {

  // Date

  $('.datepicker').pickadate({
    editable: true,
    formatSubmit: 'dd/mm/yyyy'
  });

  $('.datepicker').pickadate('picker').set('select', this.data.effective_at);

  // Tags

  var initTags = Tags.find().fetch().map(function(it){ return it.text; });
  $('#tags').tagsinput({
    typeahead: { source: initTags },
    freeInput: true
  });

  // Add the tags from the actual expense
  var tags = Expense.getTags(this.data);
  tags.forEach(function(tag) {
    $('#tags').tagsinput('add', tag.text);
  });
};

Template.EditExpenseForm.events({
  'submit #editForm': function(e, t) {
    var amount      = parseFloat(t.find('#amount').value);
    var description = t.find('#description').value;
    var tags        = t.find('#tags').value;

    // TODO - dont forget to update the date (effective_at)
    // and also the updated_at (is this updated in the hook ?)

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

    // TODO - create Expense.update method
    // Expense.update(id, amount, description, tags);

    return false;
  }
});