Template.questionListItem.helpers({
  totalVotes : function () {
    return totalVotesFor(this);
  },
  ago : function () {    
    return moment(this.createdAt).fromNow();  
  },
  ownerName : function () {
    if(author = Meteor.users.findOne(this.userId))
      return author.profile.name;
  }
});