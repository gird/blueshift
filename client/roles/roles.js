Template.roles.helpers({
  roles: function() {
    return Roles.find();
  }
});

Session.set('editing_rolename', null);

Session.set('adding_rolename', null);

Template.newRoleRow.events({
    'click .submit_new_role': function () {
        var roleName = $('.new_role_name');
        Roles.insert({
            name: roleName.val()
        });
        roleName.val('');
        Session.set('adding_rolename', null);
    },
    'keyup input.new_role_name': function (evt) {
        if (evt.which) {
            var roleName = $('.new_role_name').val();
            if(roleName.length > 1) {
                 Session.set('adding_rolename', roleName);
            } 
            if (roleName.length < 2){
                Session.set('adding_rolename', null);
            }
        }
    },
    'keydown input.new_role_name': function (evt) {
        if (evt.which === 13) {
            var roleName = $('.new_role_name');
            if(roleName.val().length > 1) {
                Roles.insert({
                    name: roleName.val()
                });
                roleName.val('');
                Session.set('adding_rolename', null);
            } 
            if (roleName.val().length < 2){
                Session.set('adding_rolename', null);
            }
        }
    },
    'click input.new_role_name': function () {
        Session.set('editing_rolename', null);
    }
});

Template.editRoleRow.events({
    'click .cancel_edit_role': function () {
        Session.set('editing_rolename', null);
    }
});

var focus_field_by_class = function (className) {
  var input = $(className);
  if (input) {
    input.focus();
    input.select();
  }
  if (li) {
    li.focus();
  }
};

Template.roleListRow.helpers({
    editing: function () {
        return Session.equals('editing_rolename', this._id);
    }
});

Template.newRoleRow.helpers({
    submitIsDisabled : function () {
        return Session.equals('adding_rolename', null);
    }
});

Template.roleListItem.events({
    'click a.delete_role': function (e) {
        e.preventDefault();
        Roles.remove(this._id);
    },
    'click a.edit_role': function () {
        Session.set('editing_rolename', this._id);
        $('submit_new_role').prop('disabled', true);
        Meteor.flush(); // update DOM before focus
        //focus_field_by_class('edit_role_name');
        var input = $('.edit_role_name');
        input.focus();
        input.select();
    },
    'dblclick .roleName-text': function () {
        Session.set('adding_rolename', null);
        Session.set('editing_rolename', this._id);
        Meteor.flush(); // update DOM before focus
        //focus_field_by_class('edit_role_name');
        var input = $('.edit_role_name');
        input.focus();
        input.select();
    }
});

Template.editRoleRow.events({
    'click .submit_edit_role': function () {
        var roleName = $('.edit_role_name');
        Roles.update(
            this._id, {$set: {name: roleName.val()}}
        );
        roleName.val('');
        Session.set('editing_rolename', null);
    },
    'keypress input.edit_role_name': function (evt, template) {
        // Check to see that keypress is for the Enter key '13'
        if (evt.which === 13) {
            var roleName = $('.edit_role_name');
            // Do not update if name did not change.
            if (roleName != Roles.findOne(this).name){
                Roles.update(
                    this._id, {$set: {name: roleName.val()}}
                );
            }
            roleName.val('');
            Session.set('editing_rolename', null);
        }
    }
});

Template.roles.rendered = function () {
    $(".tablesorter").tablesorter(); 
};