/*
Template.resources.helpers({
  resources: function() {
    return Resources.find();
  }
});


Session.set('editing_resourcename', null);

Session.set('adding_resourcename', null);

Template.editResourceRow.events({
    'click .cancel_edit_resource': function () {
        Session.set('editing_resourcename', null);
    }
});

var focus_field_by_class = function (className) {
  var input = $(className);
  if (input) {
    input.focus();
    input.select();
  }
  if (li) {
    li.focus();
  }
};

Template.resourceListRow.helpers({
    editing: function () {
        return Session.equals('editing_resourcename', this._id);
    }
});

Template.resourceListItem.events({
    'click a.delete_resource': function (e) {
        e.preventDefault();
        Resources.remove(this._id);
    },
    'click a.edit_resource': function () {
        Session.set('editing_resourcename', this._id);
        $('submit_new_resource').prop('disabled', true);
        Meteor.flush(); // update DOM before focus
        //focus_field_by_class('edit_resource_name');
        var input = $('.edit_resource_name');
        input.focus();
        input.select();
    }
});
*/