Template.questionListItem.helpers({
  totalVotes : function () {
    return totalVotesFor(this);
  },
  ago : function () {    
    return moment(this.createdAt).fromNow();  
  },
  ownerName : function () {
    if(author = Meteor.users.findOne(this.userId)) {
      console.log("ttt");
      console.log(this.userId);
      return author.profile ? author.profile.name : 'n/a';
    }
  }
});