Template.userView.helpers({
    isLoggedInUser: function() {
        if(Meteor.user()==this._id){
            return true;
        } else {
            return false;
        }
    }
});