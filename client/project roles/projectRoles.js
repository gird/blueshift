Template.projectRoles.helpers({
    projectRoles: function () {
        return Project_Roles.find();
    }
});

Template.projectRoleView.helpers({
    'project': function () {
        var project = Projects.findOne(this.project_id);
        var projectName = project && project.name;
        return projectName;
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