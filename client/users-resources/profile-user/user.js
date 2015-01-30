Template.userView.helpers({
    isLoggedInUser: function() {
        if(Meteor.userId()==this._id){
            return true;
        } else {
            return false;
        }
    }
});