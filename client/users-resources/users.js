Template.users.helpers({
  users: function() {
    return Meteor.users.find();
  }
});

Template.userListItem.events({
    'click a.delete_user': function (e) {
        e.preventDefault();
        Meteor.users.remove(this._id);
    }
});