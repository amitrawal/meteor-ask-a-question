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

nl2br = function(str) {   
  var breakTag = '<br />';    
  return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1'+ breakTag +'$2');
};

isValidEmail = function(email) { 
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}