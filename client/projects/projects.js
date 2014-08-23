Template.projects.helpers({
    projects: function () {
        return Projects.find();
    },
    waitOn: function () {
        Meteor.subscribe('projects');
    }
});

Template.projectViewDetail.helpers({
    'company': function () {
        return company = Companies.findOne(this.company_id).name;
    },
    'rateBook': function () {
        return rateBook = Rate_Books.findOne(this.rate_book_id).name;
    }
});

Template.projectViewButtons.events({
    'click .delete_project': function (e) {
        e.preventDefault();
        Projects.remove(this._id);
    }
});

//Template.projectRelatedLists.helpers({});

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
