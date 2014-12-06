Template.projects.helpers({
    projects: function () {
        return Projects.find();
    },
    waitOn: function () {
        Meteor.subscribe('projects');
    }
});