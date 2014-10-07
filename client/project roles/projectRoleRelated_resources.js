Template.projectRoleRelated_resources.helpers({
    resources: function () {
        return this.resources;
    }
});

Template.relatedResourcesListRow.helpers({
    'resourceName': function () {
        var resource = Resources.findOne({
            _id: this.resource_id
        });
        var resourcename = resource && (resource.firstname + ' ' + resource.lastname);
        return resourcename;
    }
});