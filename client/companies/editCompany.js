Template.editCompany.helpers({
  company: function() {
    return Companies.findOne(Session.get('selectedCompanyId'));
  }
});

Template.editCompany.events = {
 
};
