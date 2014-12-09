Meteor.methods({
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
    updateProjectRolesDates: function (projectId, startdate, enddate) {
        console.log('updating project roles');
        var projectRoles = Project_Roles.find({project_id: projectId});
        Project_Roles.update({
                project_id: projectId
            }, {
                $set: {
                    startDate: startdate,
                    endDate: enddate
                }
            }, {
                multi: true
            }
        );
    }
});