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
                return role && role.name;
            }
        }
    },
    /*'rate': function () {
        var rateBookRole = Rate_Book_Roles.findOne(this.rate_book_role_id);
        var rate = rateBookRole && rateBookRole.rate;
        return rate;
    },*/
    
    'resourceNames': function () {
        var resourceNames = '';
        var resources = this.resources;
        //return resources;
        if(!resources){
            resourceNames = 'None Assigned/Claimed';
            return resourceNames;
        } else {
            resources.forEach(function(res){
                var resource = Resources.findOne({
                    _id: res.resource_id
                });
                var resourceFirstName = resource && resource.firstname;
                var resourceLastName = resource && resource.lastname;
                resourceNames = resourceNames + resourceFirstName + ' ' + resourceLastName + ' (' + res.type + ') ' + ', ';
            });
            resourceNames = resourceNames.slice(0, resourceNames.length -2);
            return resourceNames;
        }
    },
    'opportunityName': function () {
        var opportunity = Opportunities.findOne(this.opportunity_id);
        if(!opportunity) {
            return 'No linked Opportunity';
        } else {
            return opportunity && opportunity.name;
        }
    },
    'totalRevenue': function () {
        var schedule = Project_Role_Schedule.findOne({project_role_id: this._id});
        var totalRevenue = 0;
        var days = schedule.days;
        days.forEach(function(prsday) {
                totalRevenue = prsday.revenue + totalRevenue;
        });
        return accounting.formatMoney(totalRevenue);
    }
};

Project_Roles = new Meteor.Collection('project_roles', {
    transform: function (doc) {
        var newInstance = Object.create(projectrole);
        return _.extend(newInstance, doc);
    }
});

Project_Roles.after.remove(function (userId, doc) {
    var currentYear = new Date().getFullYear();
    Meteor.call("updateRevenueProjections", currentYear, doc.project_id);
    console.log(doc);
});
Project_Roles.after.insert(function (userId, doc) {
    var currentYear = new Date().getFullYear();
    Meteor.call("updateRevenueProjections", currentYear, doc.project_id);
    console.log(doc);
});