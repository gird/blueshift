Template.newProjectRoleResourceModal.rendered = function() {
    Meteor.typeahead.inject();
}

Template.projectRoleRelated_resources.helpers({
    resources: function () {
        var resourceList = Project_Role_Resources.find({project_role_id: this._id}).fetch();
        var resourceMap = [];
        if(resourceList){
            resourceList.forEach(function(res){
                resourceMap.push(res.resource_id);
            });
            var resources = Resources.find( { _id: { $in: resourceMap } } );
            return resources;
        } else { 
            return; 
        }
                
    }
});

Template.newProjectRoleResourceModal.helpers({
    resourceLookup: function() {
        return Resources.find().fetch().map(function(it){ 
            var fullname = it.firstname + ' ' + it.lastname;
            return fullname; 
        });
    }
});

Template.newProjectRoleResourceModal.events({
    'click .submit_new_projectRoleResource': function() {
        var resourceName = $('.projectRoleResource_fullName').val();
        var resourceFullName = resourceName.split(" ");
        var resourceFirstName = resourceFullName[0];
        var resourceLastName = resourceFullName[1];
        var resource = Resources.findOne({firstname: resourceFirstName, lastname: resourceLastName});
        var resourceId = resource && resource._id;
        Project_Role_Resources.insert({
            project_role_id: this._id,
            resource_id: resourceId,
            type: 'Claim'
        });
        $('#newProjectRoleResourceModal').modal('hide');
        $('.projectRoleResource_fullName').val(null);
        Session.set('adding_projectroleresource_resourceid', null);
    },
    'click .cancel_new_projectRoleResource': function() {
        $('.projectRoleResource_fullName').val(null);
        Session.set('adding_projectroleresource_resourceid', null);
    }
});