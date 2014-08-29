Template.companyView.helpers({
  'parent': function() {
    var parent = Companies.findOne(this.parent_id).name;
    return parent;
  },
  children: function() {
    return children = Companies.find({ parent_id: this._id });
  },
  childOpportunities: function() {
    return childOpportunities = Opportunities.find({ company_id: this._id });
  },
  childProjects: function() {
    return childProjects = Projects.find({ company_id: this._id });
  },
  childContacts: function() {
    return childContacts = Contacts.find({ company_id: this._id });
  }
});

Template.companyViewButtons.events({
    'click .delete_company': function (e) {
        e.preventDefault();
        Companies.remove(this._id);
    }
});
