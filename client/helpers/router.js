Meteor.Router.add({
  '/': {as: 'home', to: function () {
    Session.set("selectedTab", 'listQuestions');
    return 'questionList';
  }},
  '/questions': function () {
    Session.set("selectedTab", 'listQuestions');
    return 'questionList';
  },
  '/questions/new': {as: 'questionSubmit', to: function () {
    Session.set("selectedTab", 'askQuestion');
    return 'questionSubmit';
  }},
  '/questions/:id': {as: 'showQuestion', to: function (questionId) {
      Session.set("selectedQuestionId", questionId);
      Session.set("selectedTab", null);
      return 'showQuestion';
  }},
  '/questions/:id/edit': {as: 'questionEdit', to: function (questionId) {
    Session.set("selectedQuestionId", questionId);
    Session.set("selectedTab", null);
    return 'questionEdit';
  }}
});

Meteor.Router.filters({
  'requireLogin': function(page) {
    if (Meteor.user())
      return page;
    else if (Meteor.loggingIn())
      return 'loading';
    else
      return 'accessDenied';
  },
  'clearErrors': function(page) {
    clearErrors();
    return page;
  }
});

Meteor.Router.filter('requireLogin', {only: ['questionSubmit', 'questionEdit']});
// Clear previous errors when a url is accessed.
Meteor.Router.filter('clearErrors');