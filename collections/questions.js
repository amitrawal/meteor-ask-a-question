Questions = new Meteor.Collection("questions");

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
      answers: 0,
      votes : 0,      
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
  totalQuestionsCount: function() {
    return Questions.find().count();
  }
});