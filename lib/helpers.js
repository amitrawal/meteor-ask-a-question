voteScore = function (collection_item) {  
  var totalUpVotes = 0, totalDownVotes = 0;
  if(collection_item.upVotes)
    totalUpVotes = collection_item.upVotes.length;

  if(collection_item.downVotes)
    totalDownVotes = collection_item.downVotes.length;
  
  return totalUpVotes - totalDownVotes;  
};

totalVotes = function (collection_item) {  
  var totalUpVotes = 0, totalDownVotes = 0;
  if(collection_item.upVotes)
    totalUpVotes = collection_item.upVotes.length;

  if(collection_item.downVotes)
    totalDownVotes = collection_item.downVotes.length;
  
  return totalUpVotes + totalDownVotes;  
};

hasUpVoted = function (collection_item, user) {
  return _.include(collection_item.upVotes, user._id);
};

hasDownVoted = function (collection_item, user) {
  return _.include(collection_item.downVotes, user._id);
};

