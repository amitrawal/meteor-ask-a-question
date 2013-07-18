Template.userProfileHeader.helpers({
  userProfileTabIs : function(tabName) {
    return Session.equals("selectedProfileTab", tabName); 
  },
  user : function () {
    return Meteor.users.findOne(Session.get("selectedUserId"));
  },
  isCurrentUser : function() {  	
	return Meteor.user() && (Session.equals('selectedUserId', Meteor.user()._id));
  }
});