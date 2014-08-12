Template.contacts.helpers({
  contacts: function() {
    return Contacts.find();
  }
});

Template.contactView.helpers({
  'parent': function() {
    var parent = Companies.findOne(this.company_id).name;
    return parent;
  }/*,
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
