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