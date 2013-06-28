Template.errors.helpers({
  errors: function() {
    return Errors.find();
  }
});

Template.error.rendered = function() {
  var error = this.data;

  // Why Meteor.defer? Check http://stackoverflow.com/questions/10109788/callback-after-the-dom-was-updated-in-meteor-js
  // Executes the js after the template is rendered/re-rendered.
  Meteor.defer(function() {
    Errors.update(error._id, {$set: {seen: true}});
  });
};