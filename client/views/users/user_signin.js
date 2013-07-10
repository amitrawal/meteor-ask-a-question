Template.user_signin.events({
  "click input[type=submit]" : function (event) {
    event.preventDefault();
    var userName = $('#username').val(),
        password = $('#password').val();

    // Passing empty username to Meteor.loginWithPassword method returns
    // an internal server error message instead of a logical error message (e.g. User not found ).
    // So, checking the presence of username before calling Meteor.loginWithPassword.
    if(!userName) {
      throwError('User not found');
      return;
    }


    Meteor.loginWithPassword(userName, password, function (err) {
      if(err) {
        throwError(err.reason);
      } else {
        Meteor.Router.to("/");
      }
    });    
  },
  "click #signup" : function (event) {
    event.preventDefault();
    Meteor.Router.to('/signup');
  },
  "click .github-button" : function (event) {
    event.preventDefault();
    Meteor.loginWithGithub({
      requestPermissions: ['user', 'public_repo']
      }, function (err) {
      if (err) {
        throwError(err.reason);
      } else {
        Meteor.Router.to('/');
      }
    });
  }
});