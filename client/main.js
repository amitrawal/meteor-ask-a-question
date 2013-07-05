Session.set('singleQuestionReady', false);
Session.set('singleAnswerReady', false);

Meteor.subscribe("allUsers");

Meteor.subscribe("questions");

// Single Question
Deps.autorun(function() {
  Meteor.subscribe('singleQuestion', Session.get('selectedQuestionId'), function() {
    Session.set('singleQuestionReady', true);
  });
});

Deps.autorun(function() {
  Meteor.subscribe('answers', Session.get('selectedQuestionId'), function() {
    Session.set('singleAnswerReady', true);
  });
});

Session.set('selectedQuestionId', null);