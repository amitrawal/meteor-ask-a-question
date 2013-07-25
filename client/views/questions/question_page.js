Template.showQuestion.helpers({
  question: function () {
    var question = Questions.findOne({_id: Session.get("selectedQuestionId")});
    return question;
  },
  voteScore: function () {
    return voteScore(this);
  },
  canEdit: function () {
    return ownsDocument(Meteor.userId(), this);
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
  canAnswer: function () {
    var user = Meteor.user();    
    return !!user;
  },
  ownerName : function () {
    return getDisplayNameById(this.userId);
  },
  formattedDescription : function () {
    return nl2br(this.description);
  },
  loading : function () {
    return !!!Session.get('singleQuestionReady');
  }
});

Template.showQuestion.events({
  "click .question a.upvote" : function (event) {    
    event.preventDefault();
    
    var question = this;    
    if(!Meteor.user()) {
      Meteor.Router.to('/signin');
      throwError('Please Login first')
    }

    Meteor.call('upVoteQuestion', this._id, function (error) {
      if(error) {
        throwError(e.reason);
      }
    });
  },
  "click .question a.cancel-upvote" : function (event) {
    event.preventDefault();
    var question = this;
    if(!Meteor.user()) {
      Meteor.Router.to('/signin');
      throwError('Please Login first')
    }

    Meteor.call('cancelUpVoteQuestion', this._id, function (error) {
      if(error) {
        throwError(e.reason);
      }
    });
  },
  "click .question a.downvote" : function (event) {
    event.preventDefault();
    var question = this;
    if(!Meteor.user()) {
      Meteor.Router.to('/signin');
      throwError('Please Login first')
    }

    Meteor.call('downVoteQuestion', this._id, function (error) {
      if(error) {
        throwError(e.reason);
      }
    });
  },
  "click .question a.cancel-downvote" : function (event) {
    event.preventDefault();
    var question = this;
    if(!Meteor.user()) {
      Meteor.Router.to('/signin');
      throwError('Please Login first')
    }

    Meteor.call('cancelDownVoteQuestion', this._id, function (error) {
      if(error) {
        throwError(e.reason);
      }
    });
  }
});