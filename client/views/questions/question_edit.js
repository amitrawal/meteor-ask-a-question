Template.questionEdit.helpers({
  question: function () {
    var question = Questions.findOne({_id: Session.get("selectedQuestionId")})
    return question;
  },
  spacedTags: function () {   
    return this.tags ? this.tags.join(' ') : '';
  }
});

Template.questionEdit.events({
  'submit form': function(event) {
    event.preventDefault();
    var currentQuestionId = Session.get("selectedQuestionId");

    var questionAttr = {
      title: $(event.target).find('[name=title]').val(),
      description: $(event.target).find('[name=description]').val(),
      tags: $(event.target).find('[name=tags]').val()
    }

    Meteor.call('questionEdit', currentQuestionId, questionAttr, function(error) {
      if (error) {
        // display the error to the user        
        throwError(error.reason);
      } else {
        Meteor.Router.to('showQuestion', currentQuestionId);
      }
    });  
  }
});