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

Template.newRateBookRoleModal.helpers({
    roles: function() {
        return Roles.find();
    }
});

Template.newRateBookRoleRow.helpers({
    roles: function() {
        return Roles.find();
    }
});

Template.newRateBookRoleModal.events({
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

Template.rateBookRolesListRowOptions.events({
    'click a.delete_ratebookrole': function(e) {
        e.preventDefault();
        Rate_Book_Roles.remove(this._id);
    },
    'click a.edit_role': function () {
        /*Session.set('editing_ratebookrolename', this._id);
        $('submit_new_role').prop('disabled', true);
        Meteor.flush(); // update DOM before focus
        //focus_field_by_class('edit_role_name');
        var input = $('.edit_role_name');
        input.focus();
        input.select();*/
    }
});
        