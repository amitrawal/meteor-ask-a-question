Answers = new Meteor.Collection("answers");

Meteor.methods({
  createAnswer : function(questionId, body) {
    var user = Meteor.user(),
        question = Questions.findOne(questionId);

    attributes = {
      userId : user._id,
      body : body,
      questionId : questionId,
      createdAt : new Date().getTime()
    };

    // ensure the user is logged in
    if (!user)
      throw new Meteor.Error(401, "You need to login to post answer a question.");

    // Perform data sanity validations
    if(!attributes.body)
      throw new Meteor.Error(422, "Answer body is required");

    var newAnswerId = Answers.insert(attributes);

    Questions.update(questionId, {$inc: {answers: 1}});
    return newAnswerId;
  },
  acceptAnswer : function (answerId, questionId) {
    var question = Questions.findOne(questionId),
        user = Meteor.user();

    if(!canUpdateAnswerById(user._id, answerId, ['acceptedAt']))
      throw new Meteor.Error(401, "You are not allowed to accept answer for this question.");

    // Set acceptedAt to null for all the answers related to the quesiton.
    Answers.update(
      {questionId : questionId},
      {$set : {acceptedAt : null}},
      {multi: true}
    );

    // Set the acceptedAt for the answer which is to be accepted.
    Answers.update(
      {_id : answerId},
      {$set : {acceptedAt : new Date().getTime()}}
    );
    
    // Update  the acceptedAnswer property in question.
    Questions.update(questionId, {$set : {acceptedAnswerId : answerId}});
  },
  unacceptAnswer : function (answerId) {
     var user = Meteor.user(),
          answer = Answers.findOne(answerId);

    if(!canUpdateAnswerById(user._id, answerId, ['acceptedAt']))
      throw new Meteor.Error(401, "You are not allowed to unaccept answer for this question.");

    Answers.update(
      {_id : answerId}, 
      {$set : {acceptedAt : null}}
    );

    // Set the acceptedAnswer property of the question to null.
    Questions.update(answer.questionId, {$unset : {acceptedAnswerId : answerId}});
  }
});