var projectroleresource = {
    'resource': function () {
        var resource = Resources.findOne(this.resource_id);
        if (!resource) {
            return 'No resource found. Error 1';
        } else {
            return resource;
        }
    },
    'resource_full_name': function () {
        var resource = Meteor.users.findOne(this.resource_id);
        if (!resource) {
            return 'No resource name found. Error 1';
        } else {
            return resource.profile.firstname + ' ' +resource.profile.lastname;
        }
    },
    'project_role': function () {
        var projectRole = Project_Roles.findOne(this.project_role_id);
        if (!projectRole) {
            return 'No project role found. Error 1';
        } else {
            return projectRole;
        }
    }
};

Project_Role_Resources = new Meteor.Collection('project_role_resources', {
    transform: function (doc) {
        var newInstance = Object.create(projectroleresource);
        return _.extend(newInstance, doc);
    }
});