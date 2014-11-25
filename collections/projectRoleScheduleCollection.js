Project_Role_Schedule = new Meteor.Collection('project_role_schedule');

Project_Role_Schedule.after.insert(function (userId, doc){
    console.log('the following project role schedule was added');
    console.log(doc);
    var projectrole = Project_Roles.findOne(doc.project_role_id);
    var projectId = projectrole && projectrole.project_id;
    Meteor.call('updateRevenueProjections', projectId);
});

Project_Role_Schedule.after.remove(function (userId, doc){
    console.log('the following project role schedule was deleted');
    console.log(doc);
    var projectrole = Project_Roles.findOne(doc.project_role_id);
    var projectId = projectrole && projectrole.project_id;
    Meteor.call('updateRevenueProjections', projectId);
});

Project_Role_Schedule.after.update(function (userId, doc){
    var projectrole = Project_Roles.findOne(doc.project_role_id);
    var projectId = projectrole && projectrole.project_id;
    Meteor.call('updateRevenueProjections', projectId);
});