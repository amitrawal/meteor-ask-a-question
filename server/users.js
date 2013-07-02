Accounts.onCreateUser(function(options, user) {
  //TODO: Customize User creation if required.
  user.profile = options.profile || {};
  return user;
});

