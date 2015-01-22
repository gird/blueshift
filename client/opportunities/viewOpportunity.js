Template.opportunityView.helpers({
    subscriptionReady: function () {
        //return projectsSubscriptionHandle.ready();
        if (rateBookRolesSubscriptionHandle.ready() &&
            projectsSubscriptionHandle.ready() &&
            opportunitiesSubscriptionHandle.ready() &&
            rolesSubscriptionHandle.ready() &&
            projectRolesSubscriptionHandle.ready() &&
            projectRoleResourcesSubscriptionHandle.ready()) {
            return true;
        } else {
            return false;
        }
    }
});

Template.opportunityViewDetail.helpers({
    'company': function () {
        var company = Companies.findOne(this.company_id).name;
        return company;
    },
    'project': function () {
        var project = Projects.findOne(this.project_id).name;
        return project;
    },
    owner: function() {
        var companyOwner = Meteor.users.findOne({_id: this.owner_id});
        return companyOwner;
        //var ownerProfile = companyOwner && companyOwner().profile;
        //return ownerProfile.firstname;
    },
    'estimated_amount': function() {
        return accounting.formatMoney(this.estimated_amount);
    },
    'represented_amount': function() {
        return accounting.formatMoney(this.represented_amount());
    },
    'unrepresented_amount': function() {
        var reped = this.represented_amount();
        console.log(reped);
        var ested = this.estimated_amount;
        console.log(ested);
        var unreped = reped && ested && reped - ested;
        console.log(unreped);
        return accounting.formatMoney(unreped, {
            format: {
                pos : "%s %v",
                neg : "%s (%v)",
                zero: "%s  --"
            }
        });
    }
});