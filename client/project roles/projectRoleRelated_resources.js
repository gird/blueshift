Template.newProjectRoleResourceModal.rendered = function() {
    Meteor.typeahead.inject();
}

Session.set('selectedUserId', null);

Template.projectRoleRelated_resources.helpers({
    resources: function () {
        var resourceList = Project_Role_Resources.find({project_role_id: this._id}).fetch();
        var resourceMap = [];
        if(resourceList){
            resourceList.forEach(function(res){
                resourceMap.push(res.resource_id);
            });
            var resources = Meteor.users.find( { _id: { $in: resourceMap } } );
            return resources;
        } else { 
            return; 
        }
                
    }
});

Template.newProjectRoleResourceModal.helpers({
    resourceLookup: function() {
        return Meteor.users.find().fetch().map(function(user){ 
            var fullname = user.profile.firstname + ' ' + user.profile.lastname;
            return {id: user._id, value: fullname}
        }); 
    },
    selectedUser: function(event, suggestion, datasetName) { 
        Session.set('selectedUserId', suggestion.id);
    }
});

Template.newProjectRoleResourceModal.events({
    'click .submit_new_projectRoleResource': function() {
        var selectedUserId = Session.get('selectedUserId');
        var resource = Meteor.users.findOne(selectedUserId);
        var resourceId = resource && resource._id;
        Project_Role_Resources.insert({
            project_role_id: this._id,
            resource_id: resourceId,
            type: 'Claim'
        });
        $('#newProjectRoleResourceModal').modal('hide');
        $('.projectRoleResource_fullName').val(null);
        Session.set('adding_projectroleresource_resourceid', null);
        Session.set('selectedUserId', null);
    },
    'click .cancel_new_projectRoleResource': function() {
        $('.projectRoleResource_fullName').val(null);
        Session.set('adding_projectroleresource_resourceid', null);
        Session.set('selectedUserId', null);
    }
});