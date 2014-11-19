Template.newOpportunityDetails.events({
    'click .opportunity-submit': function () {
        var opportunityName = $('#opportunity-name');
        var opportunityClose = $('#opportunity-close-date');
        var opportunityDescription = $('#opportunity-explination');
        var opportunityAmount = $('#opportunity-amount');
        var opportunityProbability = $('#opportunity-probability');
        var opportunityCreatedBy = this.userId;
        var opportunityOwner = this.userId;
        
        var relatedProject = Projects.findOne({_id: Session.get('existingProject')});
        
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
        /*
        var name = $('#opportunity-project-name').val();
        var closedate = $('#opportunity-close-date');
        var description = $('#opportunity-explination');
        var amount = $('#opportunity-amount').val();
        var probability = $('#opportunity-probability');
        var createdby = this.userId;
        var owner = this.userId;
        
        var relatedProject = Projects.findOne({_id: Session.get('existingProject')});
        
        var opportunityCompanyId = relatedProject && relatedProject.company_id;
        var opportunityProjectId = relatedProject && relatedProject._id;
        
        var createProject = insertProject(name,);
        
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
        */
    }
});
var insertProject = function(projectName, startDate, endDate, status, situation, solution, company_id, rate_book_id){
    var newProject = Projects.insert({
        name: projectName,
        startDate: startDate,
        endDate: endDate,
        status: status,
        situation: situation,
        solution: solution,
        company_id: company_id,
        rate_book_id: rate_book_id
    });
    
    return newPorject;
};