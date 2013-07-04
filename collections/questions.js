Questions = new Meteor.Collection("questions");

Questions.allow({
  update : ownsDocument
});

Meteor.methods({
  askQuestion: function(questionAttributes) {
    var user = Meteor.user();
    
    // ensure the user is logged in
    if (!user)
      throw new Meteor.Error(401, "You need to login to post new question");
    
    // ensure the question has a title
    if (!questionAttributes.title)
      throw new Meteor.Error(422, 'Please fill in a title');

    // ensure the question has a title
    if (!questionAttributes.description)
      throw new Meteor.Error(422, 'Please fill in a description');

    // ensure the question has tags
    if (!questionAttributes.tags)
      throw new Meteor.Error(422, 'Please fill in a tags');
            
    // pick out the whitelisted keys
    var question = _.extend(_.pick(questionAttributes, 'title', 'description'), {
      userId: user._id,      
      createdAt: new Date().getTime(),      
      upVotes: [],
      downVotes: [],
      answers: [],
      tags : _.flatten(questionAttributes.tags.split(' '))
    });
    
    var questionId = Questions.insert(question);
    
    return questionId;
  },
  questionEdit: function(questionId, questionAttributes) {
    var user = Meteor.user();
    
    // ensure the user is logged in
    if (!user)
      throw new Meteor.Error(401, "You need to login to post new question");

    // ensure the question has a title
    if (!questionAttributes.title)
      throw new Meteor.Error(422, 'Please fill in a title');

    // ensure the question has a title
    if (!questionAttributes.description)
      throw new Meteor.Error(422, 'Please fill in a description');

    // ensure the question has tags
    if (!questionAttributes.tags)
      throw new Meteor.Error(422, 'Please fill in a tags');
    
    // pick out the whitelisted keys
    var question = _.extend(_.pick(questionAttributes, 'title', 'description'), {      
      tags : _.flatten(questionAttributes.tags.split(' '))
    });
    
    Questions.update(questionId, {$set : question});
    
    return true;
  },
  upVote: function(questionId) {
    var user = Meteor.user();
    // ensure the user is logged in
    if (!user)
      throw new Meteor.Error(401, "You need to login to upvote");
    
    Questions.update({_id: questionId},{
      $addToSet: {upVotes: user._id},
      $pull: {downVotes: user._id}      
    });
  },
  cancelVote: function(questionId) {
    var user = Meteor.user();
    // ensure the user is logged in
    if (!user)
      throw new Meteor.Error(401, "You need to login to upvote");

    Questions.update({_id: questionId}, {
      $pull: {upVotes: user._id}
    });
  },
  downVote: function(questionId) {
    var user = Meteor.user();
    // ensure the user is logged in
    if (!user)
      throw new Meteor.Error(401, "You need to login to downvote");
    
    Questions.update({_id: questionId}, {
      $addToSet: {downVotes: user._id},
      $pull: {upVotes: user._id}      
    });  
  },
  cancelDownVote: function(questionId) {
    var user = Meteor.user();
    // ensure the user is logged in
    if (!user)
      throw new Meteor.Error(401, "You need to login to downvote");
    
    Questions.update({_id: questionId},{      
      $pull: {downVotes: user._id}
    });
  }
});