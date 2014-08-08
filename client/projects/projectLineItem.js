Template.projects.helpers({
  revenue: function() {
    var revenue = this.probability * 100000;
    var revenueText = '$' + revenue;
    return revenueText;
  }
});
