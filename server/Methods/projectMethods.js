Meteor.methods({
    insertProject: function (name, startDate, endDate, status, situation, solution, companyId, rateBookId, createdby) {
        return Projects.insert({
            name: name,
            startDate: startDate,
            endDate: endDate,
            status: status,
            situation: situation,
            solution: solution,
            company_id: companyId,
            rate_book_id: rateBookId,
            createdById: createdby
        });
    },
    updateProjectDates: function (projectId, statedate, enddate) {
        return Projects.update({
                _id: projectId
            }, {
                $set: {
                    startDate: startdate,
                    endDate: enddate
                }
            });
    },
    removeProjectRoles: function (projectId) {
        console.log('deleteing schedule for ' + projectId);
        Project_Roles.remove({"project_id": projectId});
    },
    updateProjectRolesStartDates: function (projectId, startdate) {
        console.log('updating project roles');
        var projectRoles = Project_Roles.find({project_id: projectId});
        projectRoles.forEach( function(projectrole) {
            
        });
        Project_Roles.update({
                project_id: projectId
            }, {
                $set: {
                    startDate: startdate
                }
            }, {
                multi: true
            }
        );
    }
});