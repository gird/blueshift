Template.companyView.subscriptionReady = function () {
    return companiesSubscriptionHandle.ready();
};

Template.companyView.helpers({
    'parent': function () {
        var parent = Companies.findOne(this.parent_id).name;
        return parent;
    }
});

Template.companyViewButtons.events({
    'click .edit_company': function () {
        
        Router.go('companyEdit', {_id: this._id});
        Session.set('selectedCompanyId', this._id);
    }
});


Template.companyRelated_opportunities.helpers({
    childOpportunities: function () {
        return childOpportunities = Opportunities.find({
            company_id: this._id
        });
    }
});

Template.companyRelated_projects.helpers({
    childProjects: function () {
        return childProjects = Projects.find({
            company_id: this._id
        });
    }
});

Template.companyRelated_contacts.helpers({
    childContacts: function () {
        return childContacts = Contacts.find({
            company_id: this._id
        });
    }
});

Template.companyRelated_children.helpers({
    children: function () {
        return children = Companies.find({
            parent_id: this._id
        });
    }
});

Template.companyViewButtons.events({
    'click .delete_company': function (e) {
        e.preventDefault();
        Companies.remove(this._id);
        Router.go('companies');
    }
});



