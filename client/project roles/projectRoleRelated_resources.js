Template.newProjectRoleResourceModal.rendered = function() {
    Meteor.typeahead.inject();
}

Template.projectRoleRelated_resources.helpers({
    resources: function () {
        var resourceList = this.resources;
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
    resources: function() {
        return Resources.find();
    },
    resourceLookup: function() {
        return Resources.find().fetch().map(function(it){ 
            var fullname = it.firstname + ' ' + it.lastname;
            return fullname; 
        });
    }
});