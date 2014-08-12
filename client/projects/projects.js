Template.projects.helpers({
  projects: function() {
    return Projects.find();
  },
  waitOn: function() {
    Meteor.subscribe('projects');
  }
});

Template.projectView.helpers({
  'company': function() {
     return company = Companies.findOne(this.company_id).name;
  },
  projectRoles: function() {
    var projectRoles = Project_Roles.find({ project_id: this._id });
    projectRoles.forEach(function(projectRole) {
      var roleId = Rate_Book_Roles.findOne({_id:projectRole.rate_book_role_id}).role_id;
      var role = Roles.findOne({_id: roleId}); 
    })
    return projectRoles;
  },
  projectOpportunities: function() {
    return projectOpportunities = Opportunities.find({ project_id: this._id });
  }
});
