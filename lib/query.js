sortQuestions = function(sortProperty) {
  sortProperty = sortProperty || 'createdAt';

  var sort = {sort: {}};
  sort.sort[sortProperty] = -1;
  return sort;
}