Template.home.helpers({
  revenue: function() {
    //return Opportunities.find();
    var projectroles = Project_Roles.find();
    var projectroleSchedules = Project_Role_Schedule.find();
    var totalRevenue = 0;
    projectroleSchedules.forEach(function(prs) {
        var eachday = prs.days;
        eachday.forEach(function(prsday) {
            totalRevenue = prsday.revenue + totalRevenue;
        });
    });
    return accounting.formatMoney(totalRevenue);
  }
});

Template.home.rendered = function () {
    //$("#revenue").fadeOut(1000);
    //$("#revenue").fadeIn(1000);
    Deps.autorun(function (c) {
    var $item = $("#revenue");
        Meteor.defer(function () {
            $item.fadeOut(1000);
            $item.fadeIn(1000);
        });
    });
}