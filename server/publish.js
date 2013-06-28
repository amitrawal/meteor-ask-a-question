Meteor.publish('currentUser', function() {
  return Meteor.users.find(this.userId);
});

Meteor.publish('allUsers', function() {
  //TODO: Based on the user premission, return only limited set of fields
  return Meteor.users.find();
});

Meteor.publish('questions', function() {  
  return Questions.find();
});

// a single question, identified by id
Meteor.publish('singleQuestion', function(id) {
  return Questions.find(id);
});