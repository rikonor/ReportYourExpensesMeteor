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
    var date        = new Date(t.find('#date').value);
    var amount      = parseFloat(t.find('#amount').value);
    var description = t.find('#description').value;
    var tags        = t.find('#tags').value;

    // Split tags into Tag objects
    tags = tags.split(",");

    // Form validation
    expense = {
      effective_at: date,
      amount: amount,
      description: description,
      tags: tags
    }

    if (!Expense.valid(expense)) {
      // Need to add possibly message to user explaining missing fields
      console.log("Invalid expense");
      toastr.error("Invalid parameters");
      return false;
    }

    Expense.update(this._id, date, amount, description, tags);

    // Announce
    var msg =
      "Amount: " + amount + "<br>" +
      "Description: " + description + "<br>" +
      "Tags: " + tags
    toastr.success(msg, 'Expense edited')

    return false;
  }
});