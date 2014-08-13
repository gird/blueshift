Template.rateBooks.helpers({
  rateBooks: function() {
    return Rate_Books.find();
  }
});

Template.rateBookView.helpers({
  rateBookRoles: function() {
    return projectRoles = Rate_Book_Roles.find({rate_book_id: this._id});
  },
  rateBookProjects: function() {
    return rateBookProjects = Projects.find({rate_book_id: this._id});
  }
});
