Template.userProfilePage.helpers({
  user : function () {
    return Meteor.users.findOne(Session.get('selectedUserId'));
  },
  formattedAboutMe : function () {
    return nl2br(this.profile.aboutme);
  }
});