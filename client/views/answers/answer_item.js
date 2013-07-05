Template.answerItem.helpers({
  voteScore: function () {
    return voteScore(this);
  },
  ownerName : function () {
    return getDisplayNameById(this.userId);
  },
  upVoted: function () {
    var user = Meteor.user();

    if(!user) return false; 
    return hasUpVoted(this, user);
  },
  downVoted: function () {
    var user = Meteor.user();   
    if(!user) return false;    
    return hasDownVoted(this, user);
  },
  ownerClass: function () {
    var question = Questions.findOne(this.questionId);    
    return question.userId === Meteor.userId() ? 'owner' : '';
  },
  formattedBody: function () {
    return nl2br(this.body);
  }
});

Template.answerItem.events({
  "click .answer a.upvote" : function (event) {    
    event.preventDefault();
        
    if(!Meteor.user()) {
      Meteor.Router.to('/signin');
      throwError('Please Login first')
    }

    Meteor.call('upVoteAnswer', this._id, function (error) {
      if(error) {
        throwError(e.reason);
      }
    });
  },
  "click .answer a.cancel-upvote" : function (event) {
    event.preventDefault();

    if(!Meteor.user()) {
      Meteor.Router.to('/signin');
      throwError('Please Login first')
    }

    Meteor.call('cancelUpVoteAnswer', this._id, function (error) {
      if(error) {
        throwError(e.reason);
      }
    });
  },
  "click .answer a.downvote" : function (event) {
    event.preventDefault();
    var question = this;
    if(!Meteor.user()) {
      Meteor.Router.to('/signin');
      throwError('Please Login first')
    }

    Meteor.call('downVoteAnswer', this._id, function (error) {
      if(error) {
        throwError(e.reason);
      }
    });
  },
  "click .answer a.cancel-downvote" : function (event) {
    event.preventDefault();
    var question = this;
    if(!Meteor.user()) {
      Meteor.Router.to('/signin');
      throwError('Please Login first')
    }

    Meteor.call('cancelDownVoteAnswer', this._id, function (error) {
      if(error) {
        throwError(e.reason);
      }
    });
  }
});