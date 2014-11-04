Template.opportunities.helpers({
  opportunities: function() {
    //return Opportunities.find();
    var opportunities = Opportunities.find();
    opportunities.forEach(function(opportunity) {
        var company = Companies.findOne({_id:opportunity.company_id}).name;
    });
    return opportunities;
  }
});

