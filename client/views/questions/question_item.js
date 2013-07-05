Template.questionListItem.helpers({
  totalVotes : function () {
    return totalVotes(this);
  },
  ownerName : function () {
    if(author = Meteor.users.findOne(this.userId)) {
      return author.profile ? author.profile.name : 'n/a';
    }
  }
});