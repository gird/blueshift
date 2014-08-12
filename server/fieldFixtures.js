//create some sample Feilds
if (Fields.find().count() === 0) {  
  var fields = [
  {
    name: 'Stage',
    type: 'picklist',
    uielement: 'dropdown',
    collection: 'Opportunities',
    values: [
      {name: 'Prospect'},
      {name: 'Discovery'},
      {name: 'Qualified'},
      {name: 'Proposal'},
      {name: 'Verbal'},
      {name: 'Closed Won'},
      {name: 'Closed Lost'}]
  },
  {
    name: 'Amount',
    type: 'number',
    uielement: 'inputbox',
    collection: 'Opportunities'
  }];
  
  _.each(fields, function(doc){
    Fields.insert(doc);
  });
}
