ownsDocument = function(userId, doc) {
  return doc && doc.userId === userId;
}

canUpdateAnswer = function(userId, answer, fieldNames) {
  var isUpdatingAcceptedAt = _.contains(fieldNames, 'acceptedAt');

  // Allow update if user owns the document but is not updating the acceptedAt field
  // Only the question owner should be able to update the acceptedAt field.
  if(ownsDocument(userId, answer) && !isUpdatingAcceptedAt)
    return true;
  
  var question = Questions.findOne({_id : answer.questionId});  
  // Allow only if the updater is the owner of the question to which this answer belongs to
  // and is updating only the 'accepted' field. 
  return question.userId === userId && _.every(fieldNames, function (field) { return field === 'acceptedAt'; });
}

canUpdateAnswerById = function(userId, answerId, fieldNames) {
  var answer = Answers.findOne({_id : answerId});
  return canUpdateAnswer(userId, answer, fieldNames);
}