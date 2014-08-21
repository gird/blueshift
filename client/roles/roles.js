Template.roles.helpers({
  roles: function() {
    return Roles.find();
  }
});

Session.set('editing_rolename', null);

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

var focus_field_by_class = function (className) {
  var input = document.getElementsByClassName(className);
  if (input) {
    input.focus();
    input.select();
  }
  if (li) {
    li.focus();
  }
};

Template.roleListRow.editing = function () {
  return Session.equals('editing_rolename', this._id);
};

Template.roleListRow.events({
    'click a.delete_role': function (e) {
        e.preventDefault();
        Roles.remove(this._id);
    },
    'click a.edit_role': function () {
        Session.set('editing_rolename', this._id);
        Meteor.flush(); // update DOM before focus
        focus_field_by_class("edit_role_name");
    }
});

Template.editRoleRow.events({
    'click a.submit_edit_role': function () {
        var roleName = $('.edit_role_name');
        Roles.update(
            this._id, {$set: {name: roleName.val()}}
        );
        roleName.val('');
        Session.set('editing_rolename', '');
        focus_field_by_class("");
    }
});
