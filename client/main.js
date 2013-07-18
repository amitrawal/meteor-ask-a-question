Session.set('singleQuestionReady', false);
Session.set('singleAnswerReady', false);

// Meteor.subscribe("currentUser");
Meteor.subscribe("allUsers");

questionListSubscription = function(find, options, skip, limit) {
 return Meteor.subscribe("questions", {}, options, skip, limit);
}

// Meteor.subscribe("questions");
Deps.autorun(function() {
  Meteor.questionListHandle = questionListSubscription({}, sortQuestions(Session.get("questionListSortProperty")),
    Session.get("pagingQuestionListSkip"),
    Session.get("pagingQuestionListLimit")
  );
});

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

// permissions
Meteor.startup(function() {
  Meteor.users.allow({    
    update: function(userId, doc, fieldNames, modifier) {
      return doc._id && doc._id === userId;
    },
    remove: function(userId, doc){
      return doc._id && doc._id === userId;
    }
  });  
  Answers.allow({
    update : canUpdateAnswer
  });

  Questions.allow({
    update : ownsDocument
  });
});

Session.set('selectedQuestionId', null);