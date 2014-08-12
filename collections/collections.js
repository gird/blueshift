var projectrole = {
  'role': function() {
    var roleId = Rate_Book_Roles.findOne(this.rate_book_role_id).role_id;
    var role = Roles.findOne(roleId).name;
    return role;
  },
  'rate': function() {
    var rate = Rate_Book_Roles.findOne(this.rate_book_role_id).rate;
    return rate;
  }
};

Project_Roles = new Meteor.Collection('project_roles', {
  transform: function (doc) {
    var newInstance = Object.create(projectrole);
    return _.extend(newInstance, doc);
  }
});



Projects = new Meteor.Collection('projects');
Companies = new Meteor.Collection('companies');
Contacts = new Meteor.Collection('contacts');
Opportunities = new Meteor.Collection('opportunities');
Rate_Book_Roles = new Meteor.Collection('rate_book_roles');
Rate_Books = new Meteor.Collection('rate_books');
Resources = new Meteor.Collection('resources');
Roles = new Meteor.Collection('roles');
Skills = new Meteor.Collection('skills');
Users = new Meteor.Collection('users');
Fields = new Meteor.Collection('fields');
