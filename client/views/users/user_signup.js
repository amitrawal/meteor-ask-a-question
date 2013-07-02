Template.user_signup.events({
  "submit form" : function (event) {
    event.preventDefault();
    var username = $('#username').val();
    var email = $('#email').val();
    var password = $('#password').val();
    if(!username || !email || !password){
      throwError('Please fill in all fields');
      return false;
    }
    
    Accounts.createUser({
        username: username
      , email: email  
      , password: password
    }, function(err) {
      if(err) {
        throwError(err.reason);
        console.log(err);
      } else {
        Meteor.Router.to('/');
      }  
    });
  },
  "click #signin" : function(event) {
    event.preventDefault();
    Meteor.Router.to('/signin');
  },
  'click .github-button': function(event){
    event.preventDefault();
    Meteor.loginWithGithub({
      requestPermissions: ['user', 'public_repo']
      }, function (err) {
      if (err) {
        throwError(err.reason);
      }     
    });
  }
});