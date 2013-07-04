Template.showQuestion.helpers({
  question: function () {
    var question = Questions.findOne({_id: Session.get("selectedQuestionId")})
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
    return _.include(this.upVotes, user._id);
  },
  downVoted: function () {
    var user = Meteor.user();
    if(!user) return false;
    return _.include(this.downVotes, user._id);
  }
});

Template.showQuestion.events({
  "click a.upvote" : function (event) {
    event.preventDefault();
    
    var question = this;    
    if(!Meteor.user()) {
      Meteor.Router.to('/signin');
      throwError('Please Login first')
    }

    Meteor.call('upVote', this._id, function (error) {
      if(error) {
        throwError(e.reason);
      }
    });
  },
  "click a.cancel-upvote" : function (event) {
    event.preventDefault();
    var question = this;
    if(!Meteor.user()) {
      Meteor.Router.to('/signin');
      throwError('Please Login first')
    }

    Meteor.call('cancelVote', this._id, function (error) {
      if(error) {
        throwError(e.reason);
      }
    });
  },
  "click a.downvote" : function (event) {
    event.preventDefault();
    var question = this;
    if(!Meteor.user()) {
      Meteor.Router.to('/signin');
      throwError('Please Login first')
    }

    Meteor.call('downVote', this._id, function (error) {
      if(error) {
        throwError(e.reason);
      }
    });
  },
  "click a.cancel-downvote" : function (event) {
    event.preventDefault();
    var question = this;
    if(!Meteor.user()) {
      Meteor.Router.to('/signin');
      throwError('Please Login first')
    }

    Meteor.call('cancelDownVote', this._id, function (error) {
      if(error) {
        throwError(e.reason);
      }
    });
  }
});