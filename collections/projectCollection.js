var project = {};

Projects = new Meteor.Collection('projects', {
    transform: function (doc) {
        var newInstance = Object.create(project);
        return _.extend(newInstance, doc);
    }
});

Projects.after.remove(function (userId, doc){
    console.log('the following project was deleted: ' + doc.name);
    console.log(doc);
    var projectId = doc._id
    Meteor.call('removeProjectRoles', projectId);
});

Projects.after.update(function (userId, doc, fieldNames, modifier, options){
    console.log('the following project was updated: ' + doc.name);
    console.log(doc);
    var oldProject = this.previous;
    var newProject = doc;
    
    if(oldProject.startDate != newProject.startDate) {
        var startdatediff = newProject.startDate - oldProject.startDate;
        Meteor.call('updateProjectRolesStartDates', doc._id, newProject.startDate);
    }
    //Meteor.call('insertProjectRoles', startdate, enddate, ratebookrole, allocation, projectRoleId);
});