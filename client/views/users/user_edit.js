Template.userEdit.events({
  'submit form' : function(event) {
    event.preventDefault();
    var $form = $(event.target),
        user = Session.get('selectedUserId') ? Meteor.users.findOne(Session.get('selectedUserId')) : Meteor.user();

    var profileAttr = {
      name : $form.find('[name=screenname]').val(),
      email: $form.find('[name=email]').val(),
      realname: $form.find('[name=realname]').val(),
      website: $form.find('[name=website]').val(),
      location: $form.find('[name=location]').val(),
      aboutme: $form.find('[name=aboutme]').val()
    };

    Meteor.call('updateCompleteProfile', user._id, profileAttr, function(error) {
      if (error) {
        // display the error to the user
        throwError(error.reason);
      } else {
        throwError("Profile successfully updated.");
       Meteor.Router.to('userProfilePage', Session.get('selectedUserId'));
      }
    });  
  },
  'click #cancel' : function(event) {
    event.preventDefault();
    Meteor.Router.to('userProfilePage', Session.get('selectedUserId'));
  }
});