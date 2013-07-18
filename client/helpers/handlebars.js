Handlebars.registerHelper('ago', function(time) {
  return moment(time).fromNow()
});

Handlebars.registerHelper('pluralize', function(word, count) {
  return _(word).pluralize(count);
});