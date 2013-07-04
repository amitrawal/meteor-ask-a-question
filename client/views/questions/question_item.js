Template.questionListItem.helpers({
  totalVotes : function () {
    return totalVotes(this);
  },
  ago : function () {    
    return moment(this.createdAt).fromNow();  
  },
  ownerName : function () {
    if(author = Meteor.users.findOne(this.userId)) {
      return author.profile ? author.profile.name : 'n/a';
    }
  }
});