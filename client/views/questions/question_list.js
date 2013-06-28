Template.questionList.questions = function () {
  return Questions.find().fetch();
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
