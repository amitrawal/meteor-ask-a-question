var _pager = new Meteor.Paginator({
  templates: {
    content: "questionList"
  }, 
  pagination: {
    resultsPerPage: 5 //default limit
  },
  callbacks: {
    onPagingCompleted: function(skip, limit) {
      Session.set("pagingQuestionListSkip", skip);
      Session.set("pagingQuestionListLimit", limit);
    },
    getDependentSubscriptionsHandles: function() {
        return [Meteor.questionListHandle];
    },
    getTotalRecords: function(cb) {
      //you need to return the total record count here
      //using the provided callback
      Meteor.call("totalQuestionsCount", function(err, result) {
        cb(result);
      });
    },
    onTemplateRendered: function() {
      //regular render code
    },
    onTemplateCreated: function() {
      Session.set("pagingQuestionListSkip", 0);
      Session.set("pagingQuestionListLimit", 5);
    }
  }
});

Template.questionList.questions = function () {
  return Questions.find();
};

Template.recentTags.tags = function () {
  var tag_infos = [];
  var total_count = 0;

  Questions.find().forEach(function (question) {
    _.each(question.tags, function (tag) {
      var tag_info = _.find(tag_infos, function (x) { return x.tag === tag; });
      if (! tag_info)
        tag_infos.push({tag: tag, count: 1});
      else
        tag_info.count++;
    });
    total_count++;
  });

  tag_infos = _.sortBy(tag_infos, function (x) { return x.tag; });  

  return tag_infos;
};

Template.recentTags.tag_text = function () {
  return this.tag ;
};


