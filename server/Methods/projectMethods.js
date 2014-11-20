Meteor.methods({
    insertProject: function (name, startDate, endDate, status, situation, solution, companyId, rateBookId, createdby) {
        return Projects.insert({
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
    }
});
