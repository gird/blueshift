Meteor.methods({
    delete_project: function (projectId) {
        Projects.remove(projectId);
        console.log('deleted project: ' + projectId);
    }
});