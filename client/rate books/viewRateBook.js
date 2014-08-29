//subscriptionHandle = Meteor.subscribe("rate_books");

Template.rateBookView.subscriptionReady=function(){
    return rateBooksSubscriptionHandle.ready();
};

Session.set('adding_ratebookrole_roleid', null);
Session.set('adding_ratebookrole_rate', null);
Session.set('editting_ratebookrole_id', null);

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
Template.editRateBookRoleModal.helpers({
    ratebookrole: function() {
        return Rate_Book_Roles.findOne({_id: this._id});
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
        $('#newRateBookRoleModal').modal('hide');
        $('.ratebookrole_roleid').val(null);
        Session.set('adding_ratebookrole_roleid', null);
        $('.ratebookrole_rate').val(null);
        Session.set('adding_ratebookrole_rate', null);
    },
    'click select.ratebookrole_roleid': function() {
        if($('.ratebookrole_roleid').val() != ''){
            Session.set('adding_ratebookrole_roleid', $('.ratebookrole_roleid').val());
        }
    },
    'keyup input.ratebookrole_rate': function (evt) {
        if (evt.which) {
            var rate = $('.ratebookrole_rate').val();
            console.log(rate);
            console.log(rate == 0);
            if(rate > 0) {
                Session.set('adding_ratebookrole_rate', $('.adding_ratebookrole_rate').val());
            } 
            if (rate <= 0){
                Session.set('adding_ratebookrole_rate', null);
            }
        }
    },
    'click .cancel_new_ratebookrole': function() {
        $('.ratebookrole_roleid').val(null);
        Session.set('adding_ratebookrole_roleid', null);
        $('.ratebookrole_rate').val(null);
        Session.set('adding_ratebookrole_rate', null);
    }    
});

Template.rateBookRolesListRowOptions.events({
    'click a.delete_ratebookrole': function(e) {
        e.preventDefault();
        Rate_Book_Roles.remove(this._id);
    },
    'click a.edit_ratebookrole': function () {
        var editModal = $('#editRateBookRoleModal');
        $('.edit_ratebookrole_rate', editModal).val(this.rate);
        Session.set('editting_ratebookrole_id', this._id);
        // and finally show the modal
        editModal.modal({ show: true });
    }
});


Template.newRateBookRoleModal.submitIsDisabled = function () {
    if (Session.equals('adding_ratebookrole_rate', null) || Session.equals('adding_ratebookrole_roleid', null)){
        return true;
    } else { 
        return false; 
    }
};

Template.editRateBookRoleModal.events({
    'click .submit_edit_ratebookrole': function() {
        var rate = $('.edit_ratebookrole_rate').val();
        Rate_Book_Roles.update({_id: Session.get('editting_ratebookrole_id')}, {$set: {rate: rate}});
        $('#editRateBookRoleModal').modal('hide');
        $('.edit_ratebookrole_rate').val(null);
    }/*,
    'click select.ratebookrole_roleid': function() {
        if($('.ratebookrole_roleid').val() != ''){
            Session.set('adding_ratebookrole_roleid', $('.ratebookrole_roleid').val());
        }
    },
    'keyup input.ratebookrole_rate': function (evt) {
        if (evt.which) {
            var rate = $('.ratebookrole_rate').val();
            console.log(rate);
            console.log(rate == 0);
            if(rate > 0) {
                Session.set('adding_ratebookrole_rate', $('.adding_ratebookrole_rate').val());
            } 
            if (rate <= 0){
                Session.set('adding_ratebookrole_rate', null);
            }
        }
    },
    'click .cancel_new_ratebookrole': function() {
        $('.ratebookrole_roleid').val(null);
        Session.set('adding_ratebookrole_roleid', null);
        $('.ratebookrole_rate').val(null);
        Session.set('adding_ratebookrole_rate', null);
    }*/  
});