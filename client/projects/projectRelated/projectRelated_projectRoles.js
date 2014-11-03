Template.projectRelated_projectRoles.helpers({
    projectRoles: function () {
        var projectRoles = Project_Roles.find({
            project_id: this._id
        });
        projectRoles.forEach(function (projectRole) {
            var role = Rate_Book_Roles.findOne({
                _id: projectRole.rate_book_role_id
            });
            var roleId = role && role.role_id;
            var role = Roles.findOne({
                _id: roleId
            });
        })
        return projectRoles;
    }
});

Template.newProjectRoleModal.helpers({
    roles: function() {
        var roles = [];
        var ratebookroles = Rate_Book_Roles.find({rate_book_id: this.rate_book_id});
        ratebookroles.forEach(function (ratebookrole) {
            var role = Roles.findOne({
                _id: ratebookrole.role_id
            });
            roles.push({rate_book_role_id: ratebookrole._id, role_name: role.name});
        });
        return roles;
    },
    opportunities: function() {
        return opportunities = Opportunities.find({project_id: this._id});
    }
});

Template.newProjectRoleModal.events({
    'click .submit_new_projectrole': function() {
        var ratebookroleId = $('.projectrole_ratebookroleid').val();
        var opportunityId = $('.projectrole_opportunityid').val();
        var allocation = $('.projectrole_allocation').val();
        var startdate = $('.projectrole_startdate').val();
        var enddate = $('.projectrole_enddate').val();
        var probability = $('.projectrole_probability').val();
        var newProjectRole;
        var ratebookrole = Rate_Book_Roles.findOne({_id: ratebookroleId});
        
        Meteor.call('insertProjectRole', ratebookroleId, allocation, enddate, probability, this._id, startdate, opportunityId, function(error, result){
            newProjectRole = result;
            var role = ratebookrole && Roles.findOne({_id: ratebookrole.role_id});
            var roleName = role && role.name;
            var content = '<div><a href="/projectRoles/' + newProjectRole + '">' + roleName + '</a>&nbsp;<div class="btn-group btn-group-xs"><button type="button" class="btn btn-default projectRole_assign" data-toggle="modal" data-target="#projectRoleAssign"><span class="glyphicon glyphicon-search"></span></button></div></div>';
            data.add([
                {
                    id: newProjectRole,
                    content: content,
                    start: startdate,
                    end: enddate
                }
            ]);
            
            Meteor.call('insertProjectRoleSchedules', startdate, enddate, ratebookrole, allocation, newProjectRole);
        });
        
        $('#newProjectRoleModal').modal('hide');
        $('.projectrole_ratebookroleid').val(null);
        $('.projectrole_opportunityid').val(null);
        $('.ratebookrole_rate').val(null);
        $('.projectrole_allocation').val(null);
        $('.projectrole_startdate').val(null);
        $('.projectrole_enddate').val(null);
        $('.projectrole_probability').val(null);
    }
});

Template.projectRolesListRowOptions.events({
    'click a.delete_projectrole': function(e) {
        e.preventDefault();
        Project_Roles.remove(this._id);
        data.remove(this._id);
        Meteor.call('removeProjectRoleSchedule', this._id);
    }
});

Template.projectRelated_projectRoles.rendered = function () {
    $(".tablesorter").tablesorter(); 
};