getSignupMethod = function (user) {
  if(user.services && user.services.github) {
    return 'github';
  } else {
    return 'regular';
  }
};

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
};

getScreenName = function (user) {
  return user.profile.name;
};

userProfileComplete = function (user) {
  return (!!getEmail(user) && !!getScreenName(user));
};

getDisplayNameById = function(userId) {
  return getDisplayName(Meteor.users.findOne(userId));
};

getDisplayName = function (user) {
  if(user) {
    return user.profile ? user.profile.name : 'n/a';
  } else {
    return 'n/a';
  }
};

Meteor.methods({
  updateProfile : function (userId, profileAttr) {
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
  },
  updateCompleteProfile : function (userId, profileAttr) {
    if (!profileAttr.email)
      throw new Meteor.Error(422, 'Please fill in the Email');

    if (!isValidEmail(profileAttr.email))
      throw new Meteor.Error(422, 'Please enter a valid Email');

    if (!profileAttr.name)
      throw new Meteor.Error(422, 'Please fill in the Screen Name');

    Meteor.users.update({_id: userId}, {
      $set : {
        "profile.email"     : profileAttr.email, 
        "profile.name"      : profileAttr.name,
        "profile.realname"  : profileAttr.realname,
        "profile.website"   : profileAttr.website,
        "profile.location"   : profileAttr.location,
        "profile.aboutme"   : profileAttr.aboutme,
      }
    },
      function(err) {
        if(err) {       
          throw new Meteor.Error(422, err);
        }
    });
  }
});