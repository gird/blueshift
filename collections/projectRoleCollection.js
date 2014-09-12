var projectrole = {
    'role': function () {
        var ratebookrole = Rate_Book_Roles.findOne(this.rate_book_role_id);
        if (!ratebookrole) {
            return 'No role name detected';
        } else {
            var roleId = ratebookrole.role_id;
            var role = Roles.findOne(roleId);
            if (!role) {
                return 'No role name detected';
            } else {
                return role.name;
            }
        }
    },
    'rate': function () {
        var rate = Rate_Book_Roles.findOne(this.rate_book_role_id).rate;
        return rate;
    },
    'resourceNames': function () {
        var resourceNames = '';
        var resources = this.resources;
        //return resources;

        resources.forEach(function(res){
            var resource = Resources.findOne({
                _id: res.resource_id
            });
            resourceNames = resourceNames + resource.firstname + ' ' + resource.lastname + ' (' + res.type + ') ' + ', ';
        });
        resourceNames = resourceNames.slice(0, resourceNames.length -2);
        return resourceNames;
    }
};

Project_Roles = new Meteor.Collection('project_roles', {
    transform: function (doc) {
        var newInstance = Object.create(projectrole);
        return _.extend(newInstance, doc);
    }
});