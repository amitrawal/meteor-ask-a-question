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
  }},
  '/signin': 'user_signin',
  '/signup': 'user_signup'
});

Meteor.Router.filters({
  'requireLogin': function(page) {
    if (Meteor.user())
      return page;
    else if (Meteor.loggingIn())
      return 'loading';
    else
      return 'user_signin';
  },
  'clearErrors': function(page) {
    clearErrors();
    return page;
  },
  // if the user is logged in but their profile isn't filled out enough
  requireProfile: function(page) {
    var user = Meteor.user();
    if (user && !Meteor.loggingIn() && !userProfileComplete(user)){      
      Session.set('selectedUserId', user._id);
      return 'user_complete_profile';
    } else {
      console.log(page);
      return page;
    }
  }
});

Meteor.Router.filter('requireProfile');
Meteor.Router.filter('requireLogin', {only: ['questionSubmit', 'questionEdit']});
// Clear previous errors when a url is accessed.
Meteor.Router.filter('clearErrors');