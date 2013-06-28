Template.showQuestion.helpers({
  question: function () {
    var question = Questions.findOne({_id: Session.get("selectedQuestionId")})
    return question;
  },
  totalVotes: function () {
    return totalVotesFor(this);  
  },
  canEdit : function () {
    return ownsDocument(Meteor.userId(), this);
  }
});