Meteor.methods({
    insertProjectRole: function (ratebookroleId, allocation, enddate, probability, projectId, startdate, opportunityId) {
        return Project_Roles.insert({
                rate_book_role_id: ratebookroleId,
                allocation: allocation,
                startDate: startdate,
                endDate: enddate,
                probability: probability,
                project_id: projectId,
                opportunity_id: opportunityId
            });
    },
    insertProjectRoleSchedules: function (startdate, enddate, ratebookrole, allocation, projectroleid) {
        var totaldays = moment(enddate).diff(moment(startdate), 'days', true);
        console.log(totaldays);
        console.log(startdate);
        console.log(enddate);
        var dayCount = 1;
        var allDays = [];
                
        while(dayCount <= totaldays) {
            var myDate = new Date(startdate);
            myDate.setDate(myDate.getDate() + dayCount);
            allDays.push({
                date: myDate, 
                revenue: ratebookrole.rate * allocation / 100 * 8 //hours
            });
            ++dayCount;
        }
        Project_Role_Schedule.insert({
            project_role_id: projectroleid,
            days: allDays
        });
    },
    removeProjectRoleSchedule: function (projectRoleId) {
        console.log('deleteing schedule for ' + projectRoleId);
        Project_Role_Schedule.remove({"project_role_id": projectRoleId});
    }
});