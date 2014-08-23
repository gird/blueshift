subscriptionHandle = Meteor.subscribe("rate_books");

Template.rateBookView.subscriptionReady=function(){
    return subscriptionHandle.ready();
};

Template.rateBooks.helpers({
  rateBooks: function() {
    return Rate_Books.find();
  }
});

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