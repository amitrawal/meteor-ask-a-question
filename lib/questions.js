isQuestionAccepted = function (question) {
  // Get Answers where acceptedAt key exists and its value is not null.
  // var count = Answers.find({
  //   questionId : question._id, 
  //   acceptedAt : {$exists : true, $ne : null}
  // }).count();
    
  // return count > 0;
  return isValuePresent(question.acceptedAnswerId);
};

isQuestionAcceptedById = function (questionId) {  
  return isQuestionAccepted(Questions.findOne({_id : questionId}));
};

hasAnswers = function(question) {
  return question.answers > 0;
};