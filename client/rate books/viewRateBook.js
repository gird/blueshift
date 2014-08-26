//subscriptionHandle = Meteor.subscribe("rate_books");

Template.rateBookView.subscriptionReady=function(){
    return rateBooksSubscriptionHandle.ready();
};

Template.rateBookRelated_rateBookRoles.helpers({
  rateBookRoles: function() {
    var rateBookRoles = Rate_Book_Roles.find({rate_book_id: this._id});
    rateBookRoles.forEach(function(rateBookRole) {
      var role = Roles.findOne({_id: rateBookRole.role_id});
    })
    return rateBookRoles;
  }
});

Template.rateBookRelated_projects.helpers({
  rateBookProjects: function() {
    return rateBookProjects = Projects.find({rate_book_id: this._id});
  }
});

Template.rateBookRolesButtons.helpers({
    roles: function() {
        return Roles.find();
    }
});

Template.rateBookRolesButtons.events({
    'click .submit_new_ratebookrole': function() {
        var roleId = $('.ratebookrole_roleid').val();
        var rate = $('.ratebookrole_rate').val();
        Rate_Book_Roles.insert({
            rate_book_id: this._id,
            role_id: roleId,
            rate: rate
        });
    }
});