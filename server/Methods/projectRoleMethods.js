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
    }
});