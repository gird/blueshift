Template.projectRoles.helpers({
  projectRoles: function() {
    return Project_Roles.find();
  }
});

Template.projectRoleView.helpers({
  'project': function() {
    var project = Projects.findOne(this.project_id).name;
    return project;
  }
});
