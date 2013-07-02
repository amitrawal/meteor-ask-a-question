Template.user_signin.events({
  "click input[type=submit]" : function (event) {
    event.preventDefault();
    var userName = $('#username').val(),
        password = $('#password').val();

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