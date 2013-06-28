Session.set('singleQuestionReady', false);

Meteor.subscribe("allUsers");

Meteor.subscribe("questions");

// Single Question
Meteor.autorun(function() {
  Meteor.subscribe('singleQuestion', Session.get('selectedQuestionId'), function() {
    Session.set('singleQuestionReady', true);
  });
});

Session.set('selectedQuestionId', null);