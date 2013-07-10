Template.answerList.helpers({
  hasAnswers: function () {
    var question = Questions.findOne(Session.get('selectedQuestionId'));    
    if(question) {
      return Answers.find({questionId : question._id}).count() > 0;
    }
  },
  answerList : function () {
    var question = Questions.findOne(Session.get('selectedQuestionId'));    
    return Answers.find({questionId : question._id});
  },
  totalAnswers : function () {
    var question = Questions.findOne(Session.get('selectedQuestionId'));
    return question.answers;
  }
});