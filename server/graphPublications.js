Meteor.publish('revenue_projections', function() {
  return Revenue_Projections.find();
});