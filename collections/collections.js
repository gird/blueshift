Projects = new Meteor.Collection('projects');
Companies = new Meteor.Collection('companies');
Contacts = new Meteor.Collection('contacts');
Opportunities = new Meteor.Collection('opportunities');
Resources = new Meteor.Collection('resources');
Roles = new Meteor.Collection('roles');
Skills = new Meteor.Collection('skills');
//Users = new Meteor.Collection('users');
Fields = new Meteor.Collection('fields');

/*
var opportunity = {
  'company': function() {
    var company = Rate_Book_Roles.findOne(this.rate_book_role_id).role_id;
    var role = Roles.findOne(roleId).name;
    return role;
  },
  'rate': function() {
    var rate = Rate_Book_Roles.findOne(this.rate_book_role_id).rate;
    return rate;
  }
};

Opportunities = new Meteor.Collection('opportunities', {
  transform: function (doc) {
    var newInstance = Object.create(opportunity);
    return _.extend(newInstance, doc);
  }
});
*/