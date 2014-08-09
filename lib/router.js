Router.configure({
  layoutTemplate: 'layout',
  loading: ('loading'),
  waitOn: function() { 
    return [Meteor.subscribe('Projects', 'Companies')]
  }
});

Router.map(function() {
  this.route('home', {path: '/'});
  this.route('projects', {path: '/projects'});
  this.route('opportunities', {path: '/opportunities'});
  this.route('companies', {path: '/companies'});
  this.route('projectView', {
    path: '/projects/:_id',
    data: function() { return Projects.findOne(this.params._id); }
  });
  this.route('companyView', {
    path: '/companies/:_id',
    data: function() { return Companies.findOne(this.params._id); }
  });
  this.route('companyParent', {
    path: '/companies/:parent_id',
    data: function() { return Companies.findOne(this.params.parent_id); }
  });
  this.route('opportunityView', {
    path: '/opportunities/:_id',
    data: function() { return Opportunities.findOne(this.params._id); }
  });
});

Router.onBeforeAction('loading');
