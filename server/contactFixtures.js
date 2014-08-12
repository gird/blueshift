//create some sample Feilds
if (Contacts.find().count() === 0) {  
  var contacts = [
  {
    first_name: 'Leroy',
    last_name: 'Jenkins',
    company_id: 'company100'
  },
  {
    first_name: 'Master',
    last_name: 'Chief',
    company_id: 'company100'
  }];
  
  _.each(contacts, function(doc){
    Contacts.insert(doc);
  });
}
