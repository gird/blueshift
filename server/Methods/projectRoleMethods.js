Meteor.methods({
    insertProjectRole: function (ratebookroleId, allocation, enddate, probability, projectId, startdate) {
        return Project_Roles.insert({
                rate_book_role_id: ratebookroleId,
                allocation: allocation,
                endDate: enddate,
                probability: probability,
                project_id: projectId,
                startDate: startdate,
            });
    },
    insertProjectRoleSchedules: function (startdate, enddate, ratebookrole, allocation, projectroleid) {
        var totaldays = moment(enddate).diff(moment(startdate), 'days', true);
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
        var new_prs = Project_Role_Schedule.insert({
            project_role_id: projectroleid,
            days: allDays
        });
    },
    removeProjectRoleSchedule: function (projectRoleId) {
        console.log(projectRoleId);
        Project_Role_Schedule.remove({"project_role_id": projectRoleId});
    }
});