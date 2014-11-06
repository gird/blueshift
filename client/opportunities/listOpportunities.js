Template.opportunities.helpers({
    opportunities: function () {
        return opportunities = Opportunities.find();
    }
});

Template.opportunityListRow.helpers({
    'represented_amount': function () {
        return accounting.formatMoney(this.represented_amount());
    },
    'estimated_amount': function () {
        return accounting.formatMoney(this.estimated_amount);
    }
});


Template.newOpportunityExistingProjectModal.rendered = function () {
    Meteor.typeahead.inject();
    var projects = Projects.find().fetch();

    $('.newOpportunity_ProjectCompany').on('typeahead:selected', function (evt, item) {
        console.log(item.valueKey);
    });
}

Template.newOpportunityExistingProjectModal.helpers({
    'companyProjectLookup': function () {
        var projects = Projects.find();
        var data = [];
        projects.forEach(function (project) {
            var projectName = project.name;
            var projectId = project._id
            var company = Companies.findOne(project.company_id);
            var companyName = company && company.name;
            var companyId = company && company._id;
            data.push({
                "name" : projectName + " - " + companyName,
                "description": project.situation,
                "language": "testlan",
                "value": projectName + " " + companyName,
                "valueKey": projectId,
                "tokens": [
                  projectName,
                  companyName
                ]
            });
        });
        return data;
    }
});