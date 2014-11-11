Template.newOpportunityExistingProjectModal.rendered = function () {
    Meteor.typeahead.inject();
    var projects = Projects.find().fetch();

    $('.newOpportunity_ProjectCompany').on('typeahead:selected', function (evt, item) {
        Session.set('existingProject', item.valueKey);
        $('#newOpportunityExistingProjectModal').modal('hide');
        $('#newOpportunityExistingProjectModal').on('hidden.bs.modal', function () {
            Router.go('/newOpportunity');
        });
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
                "projectName" : projectName,
                "companyName" : companyName,
                "situation": project.situation,
                "solution": project.solution,
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