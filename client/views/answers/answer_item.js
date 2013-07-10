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
  },
  isQuestionOwner : function () {    
    var question = Questions.findOne(this.questionId);    
    return question.userId === Meteor.userId();
  },
  isQuestionAccepted : function () {
    return isQuestionAcceptedById(this.questionId);    
  },
  isAcceptedAnswer : function ()   {
    return !(_.isNull(this.acceptedAt) || _.isUndefined(this.acceptedAt));
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
        throwError(error.reason);
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
        throwError(error.reason);
      }
    });
  },
  "click .answer a.downvote" : function (event) {
    event.preventDefault();  
    if(!Meteor.user()) {
      Meteor.Router.to('/signin');
      throwError('Please Login first')
    }

    Meteor.call('downVoteAnswer', this._id, function (error) {
      if(error) {
        throwError(error.reason);
      }
    });
  },
  "click .answer a.cancel-downvote" : function (event) {
    event.preventDefault();
   
    if(!Meteor.user()) {
      Meteor.Router.to('/signin');
      throwError('Please Login first')
    }

    Meteor.call('cancelDownVoteAnswer', this._id, function (error) {
      if(error) {
        throwError(error.reason);
      }
    });
  },
  "click a.vote-accepted-off" : function (event) {
    event.preventDefault();
   
    if(!Meteor.user()) {
      Meteor.Router.to('/signin');
      throwError('Please Login first')
    }

    Meteor.call('acceptAnswer', this._id, this.questionId, function (error) {
      if(error) {
        throwError(error.reason);
      }
    });
  },
  "click a.vote-accepted-on" : function (event) {
    event.preventDefault();
   
    if(!Meteor.user()) {
      Meteor.Router.to('/signin');
      throwError('Please Login first')
    }

    Meteor.call('unacceptAnswer', this._id, function (error) {
      if(error) {
        throwError(error.reason);
      }
    });
  }
});