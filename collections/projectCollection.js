var project = {};

Projects = new Meteor.Collection('projects', {
    transform: function (doc) {
        var newInstance = Object.create(project);
        return _.extend(newInstance, doc);
    }
});

Projects.before.remove(function(userId, doc){

});

Projects.after.remove(function (userId, doc){
    console.log('the following project was deleted: ' + doc.name);
    console.log(doc);
    var projectId = doc._id
    console.log('deleteing schedule for ' + projectId);
    Project_Roles.remove({"project_id": projectId});
});

/*
Projects.before.udpate(function(userId, doc, fieldNames, modifier, options){ 

});
*/

Projects.after.update(function (userId, doc, fieldNames, modifier, options){
    console.log('the following project was updated: ' + doc.name);
    console.log(doc);
    var oldProject = this.previous;
    var newProject = doc;
    var projectStartChange = moment(newProject.startDate).diff(moment(oldProject.startDate), 'days', true);
    var projectEndChange = moment(newProject.endDate).diff(moment(oldProject.endDate), 'days', true);
    if ((oldProject.startDate != newProject.startDate && oldProject.endDate == newProject.endDate) || (oldProject.startDate != newProject.startDate && oldProject.endDate != newProject.endDate)) {
        var projectRoles = Project_Roles.find({
            project_id: oldProject._id
        });

        if (oldProject.startDate != newProject.startDate && oldProject.endDate == newProject.endDate) {
            var startdatediff = newProject.startDate - oldProject.startDate;
            projectRoles.forEach(function (projectrole) {
                if (projectrole.startDate + projectStartChange > newProject.endDate) {
                    //These Project Roles are now OOB(Out of bounds) and a decision needs to be made about what the system should do. 
                    //When adjusting Project Dates with such ease, the user may accidently make a change that triggers this, therefore, any delete action would not be recommended
                } else {
                    projectrole.startDate = moment(projectrole.startDate).add(projectStartChange, 'days').format('YYYY-MM-DD');
                    if (projectrole.endDate + projectStartChange >= newProject.endDate) {
                        projectrole.endDate = newProject.endDate;
                    } else {
                        projectrole.endDate = moment(projectrole.endDate).add(projectStartChange, 'days').format('YYYY-MM-DD');
                    }
                }
                Project_Roles.update({
                    _id: projectrole._id
                }, {
                    $set: {
                        startDate: projectrole.startDate,
                        endDate: projectrole.endDate
                    }
                });
            });
            /*
            Project_Roles.update({
                project_id: projectId
            }, {
                $set: {
                    startDate: startdate
                }
            }, {
                multi: true
            });
            */
        } else if (oldProject.startDate == newProject.startDate && oldProject.endDate != newProject.endDate) {

        } else if (oldProject.startDate != newProject.startDate && oldProject.endDate != newProject.endDate) {
            projectRoles.forEach(function (projectrole) {
                var z = moment(projectrole.startDate).diff(moment(oldProject.endDate), 'days', true);
                // Check for project roles that could be eliminated from a combined new start and end date for the project.
                if (projectStartChange + projectEndChange > z) {
                    Project_Roles.remove(projectrole._id);
                }
            });
        }
    }
    //Meteor.call('insertProjectRoles', startdate, enddate, ratebookrole, allocation, projectRoleId);
});

Projects.before.insert(function(userId, doc){
    
});

Projects.after.insert(function(userId, doc){
    
});