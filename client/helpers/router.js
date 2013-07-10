Meteor.Router.beforeRouting = function() {
  console.log('// Before Routing //')
  // reset all session variables that might be set by the previous route
  Session.set("selectedQuestionId", null);
  Session.set("selectedTab", null);
  Session.set("selectedUserId", null);
  Session.set("selectedProfileTab", null);
}

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
  '/signup': 'user_signup',
  '/users/:id/edit': {as: 'userEdit', to: function(userId) {
    Session.set("selectedUserId", userId);
    Session.set("selectedProfileTab", "edit")
    return 'userEdit';
  }},
  '/users/:id': {as: 'userProfilePage', to: function(userId) {
    Session.set("selectedUserId", userId);
    Session.set("selectedProfileTab", null)
    return 'userProfilePage';
  }}
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
      return page;
    }
  },
  requireCurrentUser: function(page) {
    var user = Meteor.user();
    if(Session.get("selectedUserId") !== user._id)
      return 'accessDenied';

    return page;
  }
});

Meteor.Router.filter('requireProfile');
Meteor.Router.filter('requireLogin', {only: ['questionSubmit', 'questionEdit', 'userEdit']});
Meteor.Router.filter('requireCurrentUser', {only: ['userEdit']});
// Clear previous errors when a url is accessed.
Meteor.Router.filter('clearErrors');