Template.home.helpers({
  revenue: function() {
    //return Opportunities.find();
    var projectroles = Project_Roles.find();
    var totalRevenue = 0;
    projectroles.forEach(function(pr) {
        var totaldays = moment(pr.endDate).diff(moment(pr.startDate), 'days', true);
        console.log(totaldays);
        totalRevenue = totaldays + totalRevenue;
    });
    totalRevenue = totalRevenue * 125;
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