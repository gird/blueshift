var opportunity = {
    'represented_amount' : function () {
        var totalRevenue = 0;
        var projectroles = Project_Roles.find({opportunity_id: this._id});
        projectroles.forEach(function (pr) {
            var projectroleSchedules = Project_Role_Schedule.find({project_role_id: pr._id});
            projectroleSchedules.forEach(function(prs) {
                var eachday = prs.days;
                eachday.forEach(function(prsday) {
                    totalRevenue = prsday.revenue + totalRevenue;
                });
            });
        });
        return totalRevenue;
    },
    'companyName' : function () {
        var company = Companies.findOne(this.company_id);
        var companyName = company && company.name;
        return companyName;
    },
    'projectName' : function () {
        var project = Projects.findOne(this.project_id);
        var projectName = project && project.name;
        return projectName;
    },
    'ownerFullName' : function () {
        return 'John Doe';
    }
};

Opportunities = new Meteor.Collection('opportunities', {
    transform: function (doc) {
        var newInstance = Object.create(opportunity);
        return _.extend(newInstance, doc);
    }
});