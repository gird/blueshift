Template.userRelated_projectRoles.helpers({
    userProjectRoles: function () {
        return Project_Role_Resources.find({
            resource_id: this._id
        });
    },
    subscriptionReady: function () {
        //return projectsSubscriptionHandle.ready();
        if (projectRoleResourcesSubscriptionHandle.ready()) {
            return true;
        } else {
            return false;
        }
    }
});

Template.userProjectRolesListRow.helpers({
    'projectrole': function () {
        var projectrole = Project_Roles.findOne({
            _id: this.project_role_id
        });
        return projectrole;
    },
    'project': function () {
        var projectrole = Project_Roles.findOne({
            _id: this.project_role_id
        });
        var projectId = projectrole && projectrole.project_id;
        var project = projectId && Projects.findOne({
            _id: projectId
        });
        var projectName = project && project.name;
        return projectName;
    },
    'project_id': function () {
        var projectrole = Project_Roles.findOne({
            _id: this.project_role_id
        });
        var projectId = projectrole && projectrole.project_id;
        return projectId;
    },
    'role': function () {
        var projectrole = Project_Roles.findOne({
            _id: this.project_role_id
        });
        var ratebookroleId = projectrole && projectrole.rate_book_role_id;
        var ratebookrole = ratebookroleId && Rate_Book_Roles.findOne({
            _id: ratebookroleId
        });

        var roleId = ratebookrole && ratebookrole.role_id;
        var role = roleId && Roles.findOne({
            _id: roleId
        });
        var roleName = role && role.name;
        return roleName;
    }
});