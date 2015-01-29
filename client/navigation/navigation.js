Template.navigation.rendered = function () {
    $(function(){ 
        var navMain = $("#navbarCollapse");

        navMain.on("click", "a", null, function () {
            navMain.collapse('hide');
        });
    });
}

Template.loggedInButtons.events({
    'click .logout':function() {
        Meteor.logout();
        console.log("logged out");

    }
    
});

Template.loggedInButtons.helpers({
    user: function() {
        return Meteor.user();
    }
});