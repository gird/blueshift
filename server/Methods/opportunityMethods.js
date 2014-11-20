Meteor.methods({
    insertOpportunity: function (name, owner, projectId, companyId, amount, closeDate, description, probability, createdby) {
        return Opportunities.insert({
            name: name,
            owner_id: owner,
            project_id: projectId,
            company_id: companyId,
            estimated_amount: parseInt(amount),
            closeDate: closeDate,
            description: description,
            probability: probability,
            createdById: createdby
        });
    }
});