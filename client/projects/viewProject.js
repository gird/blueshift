Template.projectView.subscriptionReady=function(){
    return projectsSubscriptionHandle.ready();
};

Template.projectViewDetail.helpers({
    'company': function () {
        company = Companies.findOne(this.company_id);
        return company.name;
    },
    'rateBook': function () {
        rateBook = Rate_Books.findOne(this.rate_book_id);
        return rateBook.name;
    }
});

Template.projectViewButtons.events({
    'click .delete_project': function (e) {
        e.preventDefault();
        Projects.remove(this._id);
    }
});

Template.projectRelated_projectRoles.helpers({
    projectRoles: function () {
        var projectRoles = Project_Roles.find({
            project_id: this._id
        });
        projectRoles.forEach(function (projectRole) {
            var roleId = Rate_Book_Roles.findOne({
                _id: projectRole.rate_book_role_id
            }).role_id;
            var role = Roles.findOne({
                _id: roleId
            });
        })
        return projectRoles;
    }
});

Template.projectRelated_opportunities.helpers({
    projectOpportunities: function () {
        return projectOpportunities = Opportunities.find({
            project_id: this._id
        });
    }
});
