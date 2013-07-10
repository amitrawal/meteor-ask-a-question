// Meteor.publish('currentUser', function() {
//   return Meteor.users.find(this.userId);
// });

Meteor.publish('allUsers', function() {
  //TODO: Based on the user permission, return only limited set of fields
  return Meteor.users.find();
});

// a single question, identified by id
Meteor.publish('singleQuestion', function(id) {
  return Questions.find(id);
});

Meteor.publish('answers', function(questionId) {
  return Answers.find({questionId : questionId});
});

Meteor.publish("questions", function(skip, limit) {
  return Questions.find({}, {
    skip: skip || 0
    , limit: limit || 10
  });
});