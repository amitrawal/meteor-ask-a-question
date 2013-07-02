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
    Meteor.Router.to('/signin')
  }
});

Template.header_navigation.tabIs = function (tabId) {
  return Session.equals("selectedTab", tabId);
};