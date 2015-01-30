Template.newResourceRoleModal.rendered = function() {
    Meteor.typeahead.inject();
}

Template.userRelated_roles.helpers({
    userRoles: function() {
        return Resource_Roles.find({
            resource_id:this._id
        });        
    }
});

Template.userRolesListRow.helpers({
    'role': function () {
        var role = Roles.findOne({
            _id: this.role_id
        });
        var rolename = role && role.name;
        return rolename;
    }
});

Template.newResourceRoleModal.helpers({
    roles: function() {
        return Roles.find();
    },
    roleLookup: function() {
        return Roles.find().fetch().map(function(it){ return it.name; });
    }
});

Template.userRolesListRowOptions.events({
    'click a.delete_userrole': function(e) {
        e.preventDefault();
        Resource_Roles.remove(this._id);
    },
    'click a.edit_userrole': function() {
        Session.set('editing_userRoleId', this._id);
        $('.edit_userRole_experience').val(Resource_Roles.findOne(this._id).experience);
    }
});

Template.newResourceRoleModal.events({
    'click .submit_new_userRole': function() {
        var roleName = $('.userRole_roleName').val();
        var role = Roles.findOne({name: roleName});
        var roleId = role && role._id;
        var experience = $('.userRole_experience').val();
        Resource_Roles.insert({
            resource_id: this._id,
            role_id: roleId,
            createdDate: new Date(),
            createdBy: Meteor.userId()
        });
        $('#newResourceRoleModal').modal('hide');
        $('.userRole_roleName').val(null);
        Session.set('adding_userrole_roleid', null);
        $('.userRole_experience').val(null);
        Session.set('adding_userrole_experience', null);
    },
    'click .cancel_new_userRole': function() {
        $('.userRole_roleName').val(null);
        Session.set('adding_userrole_roleid', null);
        $('.userRole_experience').val(null);
        Session.set('adding_userrole_experience', null);
    }
});

Template.editResourceRoleModal.events({
    'click .submit_edit_userRole': function() {
        var experience = $('.edit_userRole_experience').val();
        var userRoleId = Session.get('editing_userRoleId');
        Resource_Roles.update(
            userRoleId, {$set: {experience: experience}}
        );
        $('#editResourceRoleModal').modal('hide');
        $('.edit_userRole_experience').val(null);
        Session.set('editting_userrole_experience', null);
        Session.set('editing_userRoleId', null);
        
    },
    'click .cancel_edit_userRole': function() {
        $('.edit_userRole_experience').val(null);
        Session.set('editting_userrole_experience', null);
    }
});