voteScore = function (question) {  
  var totalUpVotes = 0, totalDownVotes = 0;
  if(question.upVotes)
    totalUpVotes = question.upVotes.length;

  if(question.downVotes)
    totalDownVotes = question.downVotes.length;
  
  return totalUpVotes - totalDownVotes;  
};

totalVotes = function (question) {  
  var totalUpVotes = 0, totalDownVotes = 0;
  if(question.upVotes)
    totalUpVotes = question.upVotes.length;

  if(question.downVotes)
    totalDownVotes = question.downVotes.length;
  
  return totalUpVotes + totalDownVotes;  
};

