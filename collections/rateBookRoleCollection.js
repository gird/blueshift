var ratebookrole = {
  'role': function() {
    var role = Roles.findOne(this.role_id);
    if(!role) return 'role name was deleted';
    return role.name;
  }
};

Rate_Book_Roles = new Meteor.Collection('rate_book_roles', {
  transform: function (doc) {
    var newInstance = Object.create(ratebookrole);
    return _.extend(newInstance, doc);
  }
});