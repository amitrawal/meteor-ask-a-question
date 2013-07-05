Template.questionSubmit.events({
  'submit form': function(event) {
    event.preventDefault();
    
    var question = {
      title: $(event.target).find('[name=title]').val(),
      description: $(event.target).find('[name=description]').val(),
      tags: $(event.target).find('[name=tags]').val()
    };
    
    Meteor.call('askQuestion', question, function(error, id) {
      if (error) {
        // display the error to the user        
        throwError(error.reason);
      } else {
        Meteor.Router.to('showQuestion', id);
      }
    });
  }
});