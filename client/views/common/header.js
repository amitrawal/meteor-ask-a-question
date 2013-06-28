Template.user_loggedin.events({
  "click #logout": function(e, tmpl) {
    Meteor.logout(function(err) {
      if(err) {
        // Error Handling
      } else {
        // Alert?
      }
    });
  }
});

Template.user_loggedout.events({
  "click #login": function(e, tmpl) {
    e.preventDefault();
    Meteor.loginWithGithub({
      requestPermissions: ['user', 'public_repo']
      }, function (err) {
      if (err) {
        // Error Handling
      } else {
        // Alert?
      }      
    });
  }
});

Template.header_navigation.tabIs = function (tabId) {
  return Session.equals("selectedTab", tabId);
};