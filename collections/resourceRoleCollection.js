var resourcerole = {
  'role': function() {
    var rrole = Resource_Roles.findOne(this);
    if(!rrole) { 
        return 'No role name detected. Error 1'; 
    } else {
        var roleId = rrole.role_id;
        var role = Roles.findOne({_id: roleId});
        if(!role){ 
            return 'No role name detected. Error 2'; 
        } else {
            return role.name;
        }
    }
  }
};

Resource_Roles = new Meteor.Collection('resource_roles', {
  transform: function (doc) {
    var newInstance = Object.create(resourcerole);
    return _.extend(newInstance, doc);
  }
});