//create some Project Roles
if (Project_Roles.find().count() === 0) {  
  var projectRoles = [
  {
    rate_book_role_id: 'rbr1',
    startDate: '2014-01-01',
    endDate: '2014-12-01',
    allocation: '0.50',
    probability: '0.85',
    project_id: 'project200'
  },
  {
    rate_book_role_id: 'rbr2',
    startDate: '2014-01-11',
    endDate: '2014-11-01',
    allocation: '0.70',
    probability: '0.95',
    project_id: 'project200'
  }];
  
  _.each(projectRoles, function(doc){
    Project_Roles.insert(doc);
  });
}
