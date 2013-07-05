Answers = new Meteor.Collection("answers");

Answers.allow({
  update : ownsDocument
});

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
  }
});