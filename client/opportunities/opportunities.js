Template.opportunities.helpers({
  opportunities: function() {
    return Opportunities.find();
  }
});

Template.opportunityView.helpers({
  'company': function() {
    var company = Companies.findOne(this.company_id).name;
    return company;
  },
  'project': function() {
    var project = Projects.findOne(this.project_id).name;
    return project;
  }
  /*,
  children: function() {
    return children = Companies.find({ parent_id: this._id });
  },
  childOpportunities: function() {
    return childOpportunities = Opportunities.find({ company_id: this._id });
  },
  childProjects: function() {
    return childProjects = Projects.find({ company_id: this._id });
  }*/
});
