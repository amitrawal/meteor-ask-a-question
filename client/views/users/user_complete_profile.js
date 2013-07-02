Template.user_complete_profile.events({
  "click input[type=submit]" : function (e) {
    e.preventDefault();

    if(!Meteor.user()) throwError('You must be logged in.');
    
    var user = Session.get('selectedUserId')? Meteor.users.findOne(Session.get('selectedUserId')) : Meteor.user();

    var profile = {
      "email" : $('input[name=email]').val(),
      "name" : $('input[name=screenname]').val()
    };
    
    Meteor.call('updateProfile', user._id, profile, function(error) {
      if (error) {
        // display the error to the user        
        throwError(error.reason);
      } else {
        Meteor.Router.to('/');
      }
    });      
  }
});

Template.user_complete_profile.helpers({
  user: function () {
    var current_user = Meteor.user();
    if(Session.get('selectedUserId') && current_user && !current_user.loading) {
      return Meteor.users.findOne(Session.get('selectedUserId'));
    } else {
      return current_user;
    }
  },
  doesNotHaveEmail : function () {
    return getEmail(this) === undefined;
  },
  doesNotHaveScreenName : function () {
    return getScreenName(this) === undefined || getScreenName(this) === null;
  },
  email: function () {
    console.log("showing email");
    console.log(getEmail(this))
    return getEmail(this);
  },
  screenName : function () {
    console.log("screenName");
    console.log(getScreenName(this));
    return getScreenName(this);
  }
});