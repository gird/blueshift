Template.projectView.helpers({
    subscriptionReady : function(){
        //return projectsSubscriptionHandle.ready();
        if (rateBookRolesSubscriptionHandle.ready() &&
            projectsSubscriptionHandle.ready() && 
            rolesSubscriptionHandle.ready() && 
            opportunitiesSubscriptionHandle.ready() && 
            projectRolesSubscriptionHandle.ready() &&
            projectRoleResourcesSubscriptionHandle.ready())
        {
            return true;
        } else {
            return false;
        }
    }
});

Template.projectViewDetail.helpers({
    'company': function () {
        company = Companies.findOne(this.company_id);
        companyName = company && company.name;
        return companyName;
    },
    'rateBook': function () {
        rateBook = Rate_Books.findOne(this.rate_book_id);
        rateBookName = rateBook && rateBook.name;
        return rateBookName;
    }
});

Template.projectViewButtons.events({
    'click .delete_project': function (e) {
        e.preventDefault();
        Meteor.call('delete_project', this._id);
        Router.go('projects');
    }
});