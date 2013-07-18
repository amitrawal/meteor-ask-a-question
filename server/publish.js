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

Meteor.publish("questions", function(find, options, skip, limit) {
  options = options || {};
  options.skip = skip || 0;
  options.limit = limit || 5;

  if(!options.sort)
    options.sort = {createdAt : -1};

  var q = Questions.find(find || {}, options);  
  return q;  
});

// Meteor.publish("questions", function(find, options) {
//   options = options || {};  
  
//   console.log("ssss");
//   console.log(options);
//   var q = Questions.find(find || {}, options);
//   console.log(q);
//   return q;
// });