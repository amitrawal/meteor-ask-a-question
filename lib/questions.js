isQuestionAccepted = function (question) {
  // Get Answers where acceptedAt key exists and its value is not null.
  var count = Answers.find({
    questionId : question._id, 
    acceptedAt : {$exists : true, $ne : null}
  }).count();
    
  return count > 0;
};

isQuestionAcceptedById = function (questionId) {  
  return isQuestionAccepted(Questions.findOne({_id : questionId}));
};