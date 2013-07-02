getSignupMethod = function (user) {
  if(user.services && user.services.github) {
    return 'github';
  } else {
    return 'regular';
  }
}

getEmail = function (user) {
  if(getSignupMethod(user)=='github') {
    return user.profile.email;
  } else if(user.emails) {
    return user.emails[0].address || user.emails[0].email;
  } else if(user.profile && user.profile.email) {
    return user.profile.email;
  } else { 
    return ''; 
  }
}

getScreenName = function (user) {
  return user.profile.name;
}

userProfileComplete = function (user) {
  return (!!getEmail(user) && !!getScreenName(user));
}

Meteor.methods({
  updateProfile : function (userId, profileAttr) {
    console.log("inUpdate profile");
    console.log(profileAttr);

    if (!profileAttr.email)
      throw new Meteor.Error(422, 'Please fill in the Email');

    if (!profileAttr.name)
      throw new Meteor.Error(422, 'Please fill in the Screen Name');

    Meteor.users.update({_id: userId}, {
      $set : {
        "profile.email" : profileAttr.email, 
        "profile.name" : profileAttr.name
      }
    },
      function(err) {
        if(err) {       
          throw new Meteor.Error(422, err);
        }
    });
  }
});