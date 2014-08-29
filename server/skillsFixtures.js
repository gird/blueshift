//create some sample Skills
if (Skills.find().count() === 0) {
  var skills = [
  {
    name: 'Robot Building',
    description: 'Draft'
  },
  {
    name: 'C#',
    description: 'Draft'
  }];
  
  _.each(skills, function(doc){
    Skills.insert(doc);
  });
}