Template.roles.helpers({
  roles: function() {
    return Roles.find();
  }
});

Template.newRoleRow.events({
    
    /*
    'click .role_name':function() {
        $('.role_form').toggle();
    },
    */
    'click .submit_role': function () {
        var roleName = $('.role_name');
        Roles.insert({
            name: roleName.val()
        });
        roleName.val('');
    }
});

Template.roleListRow.events({
    'click a.delete_role': function (e) {
        e.preventDefault();
        Roles.remove(this._id);
    }
});