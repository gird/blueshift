Meteor.publish('projects', function() {
  return Projects.find();
});

Meteor.publish('opportunities', function() {
  return Opportunities.find({owner_id: this.userId});
  //return Opportunities.find();
});

Meteor.publish('companies', function() {
  return Companies.find();
});

Meteor.publish('contacts', function() {
  return Contacts.find();
});

Meteor.publish('project_roles', function() {
  return Project_Roles.find();
});

Meteor.publish('rate_book_roles', function() {
  return Rate_Book_Roles.find();
});

Meteor.publish('rate_books', function() {
  return Rate_Books.find();
});

Meteor.publish('roles', function() {
  return Roles.find();
});

Meteor.publish('skills', function() {
  return Skills.find();
});

/*Meteor.publish('users', function() {
  return Users.find();
});*/

Meteor.publish('fields', function() {
  return Fields.find();
});

