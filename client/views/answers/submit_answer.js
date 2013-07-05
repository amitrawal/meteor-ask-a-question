Template.submit_answer.events({
  "submit form": function (event) {
    event.preventDefault();
    var questionId = Session.get('selectedQuestionId'),
        $body = $(event.target).find('[name=body]'),
        body = $body.val();
    
    Meteor.call('createAnswer', questionId, body, function(error, id) {
      if (error) {
        // display the error to the user
        throwError(error.reason);
      } else {
        $body.val('');
      }
    });
  }
});