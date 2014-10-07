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