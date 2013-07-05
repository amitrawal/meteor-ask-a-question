(function() {
  var hasUpVotedItem = function(user, collection, id) {
    return collection.findOne({_id: id, upVotes: user._id}) !== undefined;
  };

  var hasDownVotedItem = function(user, collection, id) {
    return collection.findOne({_id: id, downVotes: user._id}) !== undefined;
  };

  var upVote = function(user, collection, id) {
    // if no user is specified, use current user by default
    var user = (typeof user === 'undefined') ? Meteor.user() : user;

    if (!user || hasUpVotedItem(user, collection, id) || hasDownVotedItem(user, collection, id))
      return false;
       
    collection.update({_id: id},{
      $addToSet: {upVotes: user._id},
      $pull: {downVotes: user._id}
    });      
    return true;
  };

  var downVote = function(user, collection, id) {
    // if no user is specified, use current user by default
    var user = (typeof user === 'undefined') ? Meteor.user() : user;

    if (!user || hasUpVotedItem(user, collection, id) || hasDownVotedItem(user, collection, id))
      return false;
   
    collection.update({_id: id},{
      $addToSet: {downVotes: user._id},
      $pull: {upVotes: user._id}
    });      
    return true;
  };

  var cancelUpVote = function(user, collection, id) {
    // if no user is specified, use current user by default
    var user = (typeof user === 'undefined') ? Meteor.user() : user;

    if (!user || hasDownVotedItem(user, collection, id))
      return false;
       
    collection.update({_id: id}, {
      $pull: {upVotes: user._id}
    });
    return true;
  };

  var cancelDownVote = function(user, collection, id) {
    // if no user is specified, use current user by default
    var user = (typeof user === 'undefined') ? Meteor.user() : user;

    if (!user || hasUpVotedItem(user, collection, id))
      return false;
       
    collection.update({_id: id},{      
      $pull: {downVotes: user._id}
    });
    return true;
  };

  var getUser = function(user){    
    return user !== 'undefined' ? user : Meteor.user();
  };

  Meteor.methods({
    upVoteQuestion : function(questionId, user) {
      return upVote.call(this, getUser(user), Questions, questionId);
    },
    downVoteQuestion : function(questionId, user) {
      return downVote.call(this, getUser(user), Questions, questionId);
    },
    cancelUpVoteQuestion : function(questionId, user) {
      return cancelUpVote.call(this, getUser(user), Questions, questionId);
    },
    cancelDownVoteQuestion : function(questionId, user) {
      return cancelDownVote.call(this, getUser(user), Questions, questionId);
    },
    upVoteAnswer : function(answerId, user) {
      return upVote.call(this, getUser(user), Answers, answerId);
    },
    downVoteAnswer : function(answerId, user) {
      return downVote.call(this, getUser(user), Answers, answerId);
    },
    cancelUpVoteAnswer : function(answerId, user) {
      return cancelUpVote.call(this, getUser(user), Answers, answerId);
    },
    cancelDownVoteAnswer : function(answerId, user) {
      return cancelDownVote.call(this, getUser(user), Answers, answerId);
    }
  });

})();