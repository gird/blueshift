Template.newOpportunityDetails.events({
    'click .opportunity-submit': function () {
        var opportunityName = $('#opportunity-name');
        var opportunityClose = $('#opportunity-close-date');
        var opportunityDescription = $('#opportunity-explination');
        var opportunityAmount = $('#opportunity-amount');
        var opportunityProbability = $('#opportunity-probability');
        var opportunityCreatedBy = this.userId;
        var opportunityOwner = this.userId;

        var relatedProject = Projects.findOne({
            _id: Session.get('existingProject')
        });

        var opportunityCompanyId = relatedProject && relatedProject.company_id;
        var opportunityProjectId = relatedProject && relatedProject._id;

        Opportunities.insert({
            name: opportunityName.val(),
            owner_id: opportunityOwner,
            project_id: opportunityProjectId,
            company_id: opportunityCompanyId,
            estimated_amount: parseInt(opportunityAmount.val()),
            closeDate: opportunityClose.val(),
            description: opportunityDescription.val(),
            probability: opportunityProbability.val(),
            createdBy: opportunityCreatedBy
        });
        Session.set('existingProject', null);
    }
});

Template.newOpportunityProjectDetails.events({
    'click .opportunity-project-submit': function () {

        var name = $('#opportunity-project-name').val();
        var closeDate = $('#opportunity-close-date').val();
        var description = $('#opportunity-explination').val();
        var amount = $('#opportunity-amount').val();
        var probability = $('#opportunity-probability').val();
        var createdby = this.userId;
        var owner = this.userId;
        var companyId = Session.get('companySelection');
        var startDate = $('#project-start-date').val();
        var duration = $('#project-duration').val();
        var endDate = $('#project-end-date').val();
        var endDate2 = new Date(endDate);
        var rateBookId = Session.get('rateBookSelection');
        var situation = $('#project-situation').val();
        var solution = $('#project-solution').val();
        console.log(endDate);
        endDate2.setDate(endDate2.getDate() +1);
        console.log(endDate2.toDateString());

        var newProject;
        /*var newProject = Projects.insert({
            name: name,
            startDate: startDate,
            endDate: endDate,
            status: status,
            situation: situation,
            solution: solution,
            company_id: companyId,
            rate_book_id: rateBookId,
            createdById: createdby
        });

        var projectId = newProject && newProject._id;
        console.log(projectId);
        
        var newOpportunity = newProject && Opportunities.insert({
            name: name,
            owner_id: owner,
            project_id: projectId,
            company_id: companyId,
            estimated_amount: parseInt(amount),
            closeDate: closeDate,
            description: description,
            probability: probability,
            createdById: createdby
        });*/
        Meteor.call('insertProject', name, startDate, endDate, status, situation, solution, companyId, rateBookId, createdby, function(error, result){
            newProjectId = result;
            Meteor.call('insertOpportunity', name, owner, newProjectId, companyId, amount, closeDate, description, probability, createdby);
        });

        Session.set('companySelection', null);
        Session.set('rateBookSelection', null);

    }
});




Template.newOpportunityProjectDetails.rendered = function () {
    Meteor.typeahead.inject();
    var companies = Companies.find().fetch();
    var ratebooks = Rate_Books.find().fetch();

    $('.newOpportunity_Company').on('typeahead:selected', function (evt, item) {
        Session.set('companySelection', item.valueKey);
        console.log(item.valueKey);
    });

    $('.newProject_RateBook').on('typeahead:selected', function (evt, item) {
        Session.set('rateBookSelection', item.valueKey);
        console.log(item.valueKey);
    });
}

Template.newOpportunityProjectDetails.helpers({
    'companyLookup': function () {
        var companies = Companies.find();
        var data = [];
        companies.forEach(function (company) {
            var companyName = company.name;
            var companyId = company._id;
            data.push({
                "companyName": companyName,
                "value": companyName,
                "valueKey": companyId,
                "tokens": [
                  companyName
                ]
            });
        });
        return data;
    },
    'rateBookLookup': function () {
        var ratebooks = Rate_Books.find();
        var data = [];
        ratebooks.forEach(function (ratebook) {
            var name = ratebook.name;
            var ratebookId = ratebook._id;
            data.push({
                "companyName": name,
                "value": name,
                "valueKey": ratebookId,
                "tokens": [
                  name
                ]
            });
        });
        return data;
    }
});