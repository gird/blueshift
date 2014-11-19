Template.newProjectDetails.events({
    'click .project-submit': function () {
        var projectName = $('#project-title');
        var projectStart = $('#project-start-date');
        var projectEnd = $('#project-end-date');
        var projectSituation = $('#project-situation');
        var projectSolution = $('#project-solution');
        var projectOwner = this.userId;
        var projectCompanyId = 'company200';
        var projectRateBookId = 'rb1';
        var projectStatus = 'Draft';
        
        Projects.insert({
            name: projectName.val(),
            startDate: projectStart.val(),
            endDate: projectEnd.val(),
            situation: projectSituation.val(),
            solution: projectSolution.val(),
            owner_id: projectOwner,
            company_id: projectCompanyId,
            rate_book_id: projectRateBookId,
            status: projectStatus
        });
    }
});