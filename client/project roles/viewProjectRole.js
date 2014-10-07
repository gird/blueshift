Template.projectRoleView.helpers({
    'project': function () {
        var project = Projects.findOne(this.project_id);
        var projectName = project && project.name;
        return projectName;
    },
    'resourceName': function () {
        var resources = this.resources;
        var resourceId;
        resources && resources.forEach(function(resource){
            if(resource.type=='Assign'){
                resourceId = resource.resource_id;
            }
        });
        var resource = Resources.findOne({
            _id: resourceId
        });
        var resourcename = resource && (resource.firstname + ' ' + resource.lastname);
        return resourcename;
    }
});

Template.projectRoleViewDetail.helpers({
    'rate1': function () {
        var project = Projects.findOne(this.project_id);
        var projectRateBook = project && project.rate_book_id;
        var rateBookRole = Rate_Book_Roles.findOne(this.rate_book_role_id);
        var rate = rateBookRole && rateBookRole.rate;
        return rate;
    }
});

Template.projectRoleView.isAssigned = function(){
    //return projectsSubscriptionHandle.ready();
    resources = this.resources;
    var isAssigned = false;
    resources && resources.forEach(function(resource){
        console.log('type: ' + resource.type);
        if(resource.type=='Assign'){
            isAssigned = true;
        }
    });
    return isAssigned;
};

Template.projectRoleRelatedLists.isAssigned = function(){
    //return projectsSubscriptionHandle.ready();
    var resources = this.resources;
    var isAssigned = false;
    resources && resources.forEach(function(resource){
        console.log('type: ' + resource.type);
        if(resource.type=='Assign'){
            isAssigned = true;
        }
    });
    return isAssigned;
};

Template.projectRoleRelated_resourceAssigned.helpers({
    'resourceName': function () {
        var resources = this.resources;
        var resourceId;
        resources && resources.forEach(function(resource){
            if(resource.type=='Assign'){
                resourceId = resource.resource_id;
            }
        });
        var resource = Resources.findOne({
            _id: resourceId
        });
        var resourcename = resource && (resource.firstname + ' ' + resource.lastname);
        return resourcename;
    }
});