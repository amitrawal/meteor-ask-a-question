Template.userProfilePage.helpers({
  user : function () {
    return Meteor.users.findOne(Session.get('selectedUserId'));
  },
  formattedAboutMe : function () {
    return nl2br(this.profile.aboutme);
  },
  canEditProfile : function () {
  	var isAboutMeEmpty = isValueBlank(this.profile.aboutme),
  		isCurrentUser =  Meteor.user() && (Session.get('selectedUserId') === Meteor.user()._id);
  	return (isAboutMeEmpty && isCurrentUser);
  }
});