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

Project_Roles.before.remove(function(userId, doc){
    
});

Project_Roles.after.remove(function (userId, doc){
    console.log('the following project role was deleted');
    console.log(doc);
    var projectRoleId = doc._id
    console.log(projectRoleId);
    Meteor.call('removeProjectRoleSchedule', projectRoleId);
});

Project_Roles.before.insert(function(userId, doc){
    
});

Project_Roles.after.insert(function(userId, doc){
    
});

/*
Project_Roles.before.udpate(function(userId, doc, fieldNames, modifier, options){
    
});
*/

Project_Roles.after.update(function (userId, doc, fieldNames, modifier, options){
    console.log('the following project role was updated');
    var projectRoleId = doc._id
    var startdate = doc.startDate;
    var enddate = doc.endDate;
    var ratebookrole = Rate_Book_Roles.findOne(doc.rate_book_role_id);
    var allocation = doc.allocation;
    Meteor.call('removeProjectRoleSchedule', projectRoleId);
    Meteor.call('insertProjectRoleSchedules', startdate, enddate, ratebookrole, allocation, projectRoleId);
});