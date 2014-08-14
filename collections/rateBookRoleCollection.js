var ratebookrole = {
  'role': function() {
    var role = Roles.findOne(this.role_id).name;
    return role;
  }
};

Rate_Book_Roles = new Meteor.Collection('rate_book_roles', {
  transform: function (doc) {
    var newInstance = Object.create(ratebookrole);
    return _.extend(newInstance, doc);
  }
});


/*

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
});*/