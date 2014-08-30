//rateBooksSubscriptionHandle = Meteor.subscribe("rate_books");

Template.rateBooks.subscriptionReady=function(){
    return rateBooksSubscriptionHandle.ready();
};

Template.rateBooks.helpers({
  rateBooks: function() {
    return Rate_Books.find();
  }
});

Template.rateBookListItem.helpers({
    /*'nameDefault': function() {
        var nameOfThis = Rate_Books.findOne(this._id);
        if(nameOfThis.isDefault == true){
            return nameOfThis.name + ' (Default)';
        } else { 
            return nameOfThis.name; 
        }
    }*/
});

Template.rateBookListItem.showDefault = function () {
    var nameOfThis = Rate_Books.findOne(this._id);
    if(nameOfThis.isDefault == true){
        return true;
    } else { 
        return false; 
    }
}

Session.set('editing_ratebookname', null);

Session.set('adding_ratebookname', null);

Template.rateBookListRow.editing = function () {
  return Session.equals('editing_ratebookname', this._id);
};

Template.newRateBook.submitIsDisabled = function () {
    return Session.equals('adding_ratebookname', null);
};

Template.newRateBook.events({
    'click .submit_new_ratebook': function () {
        var ratebookName = $('.new_rateBook_name');
        Rate_Books.insert({
            name: ratebookName.val(),
            isDefault: false
        });
        ratebookName.val('');
        Session.set('adding_ratebookname', null);
    },
    'keyup input.new_rateBook_name': function (evt) {
        if (evt.which) {
            var ratebookName = $('.new_rateBook_name').val();
            if(ratebookName.length > 1) {
                 Session.set('adding_ratebookname', ratebookName);
            } 
            if (ratebookName.length < 2){
                Session.set('adding_ratebookname', null);
            }
        }
    },
    'keydown input.new_rateBook_name': function (evt) {
        if (evt.which === 13) {
            var ratebookName = $('.new_rateBook_name');
            if(ratebookName.val().length > 1) {
                Rate_Books.insert({
                    name: ratebookName.val(),
                    isDefault: false
                });
                ratebookName.val('');
                Session.set('adding_ratebookname', null);
            } 
            if (ratebookName.val().length < 2){
                Session.set('adding_ratebookname', null);
            }
        }
    },
    'click input.new_rateBook_name': function () {
        Session.set('editing_ratebookname', null);
    },
    /* Need to check for click of Submit before implementing.
    'blur input.new_rateBook_name': function (){
        $('.new_rateBook_name').val('');
        Session.set('adding_ratebookname', null); 
    }*/
});


Template.rateBookListRowOptions.events({
    'click a.delete_ratebook': function (e) {
        e.preventDefault();
        Rate_Books.remove(this._id);
    },
    'click a.edit_ratebook': function () {
        Session.set('editing_ratebookname', this._id);
        Session.set('adding_ratebookname', null);
        //$('submit_new_ratebook').prop('disabled', true);
        Meteor.flush(); // update DOM before focus
        //focus_field_by_class('edit_ratebook_name');
        var input = $('.edit_ratebook_name');
        input.focus();
        console.log(input.focus());
        input.select();
    },
    'click a.setDefault_ratebook': function () {
        var currentDefault = Rate_Books.findOne({isDefault: true});
        Rate_Books.update(
            currentDefault._id, {$set: {isDefault: false}}, { multi: true }
        );
        Rate_Books.update(
            this._id, {$set: {isDefault: true}}
        );
    }
});

Template.editRateBookRoleRow.events({
    'click .submit_edit_ratebook': function () {
        var ratebookName = $('.edit_ratebook_name');
        Rate_Books.update(
            this._id, {$set: {name: ratebookName.val()}}
        );
        ratebookName.val('');
        Session.set('editing_ratebookname', null);
    },
    'keypress input.edit_ratebook_name': function (evt, template) {
        // Check to see that keypress is for the Enter key '13'
        if (evt.which === 13) {
            var ratebookName = $('.edit_ratebook_name');
            // Do not update if name did not change.
            if (ratebookName != Rate_Books.findOne(this).name){
                Rate_Books.update(
                    this._id, {$set: {name: ratebookName.val()}}
                );
            }
            ratebookName.val('');
            Session.set('editing_ratebookname', null);
        }
    },
    'click .cancel_edit_ratebook': function () {
        Session.set('editing_ratebookname', 'not-editing');
    }
});