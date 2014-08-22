var projectrole = {
  'role': function() {
    var ratebookrole = Rate_Book_Roles.findOne(this.rate_book_role_id);
    if(!ratebookrole) { 
        return 'No role name detected'; 
    } else {
        var roleId = ratebookrole.role_id;
        var role = Roles.findOne(roleId);
        if(!role){ 
            return 'No role name detected'; 
        } else {
            return role.name;
        }
    }
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

/*
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
*/