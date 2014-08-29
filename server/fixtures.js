//create some sample Companies
if (Companies.find().count() === 0) {
  Companies.insert({
    _id: 'company200',
    name: 'Evil Doom Co.',
    owner_id: 'gkenawell@gird.us',
    parent_id: '',
    industry: 'Medical',
    billingstreet: '123 Billmehere Street',
    billingcity: 'Brooklyn',
    billingstate: 'NY',
    billingzip: '10010',
    shippingstreet: '124 Shiphere Street',
    shippingcity: 'Brooklyn',
    shippingstate: 'NY',
    shippingzip: '10240',
    phone: '423-455-8721',
    type: 'Competitor'
  });
  Companies.insert({
    _id: 'company100',
    name: 'Light At-The-End-Of-The Tunnel Co.',
    owner_id: 'kkenawell@gird.us',
    parent_id: '',
    industry: 'Industrial Equipment',
    billingstreet: '53 Billmehere Street',
    billingcity: 'Brooklyn',
    billingstate: 'NY',
    billingzip: '21548',
    shippingstreet: '84 Shiphere Street',
    shippingcity: 'Boston',
    shippingstate: 'MA',
    shippingzip: '54876',
    phone: '232-435-1121',
    type: 'Prospect'
  });
  Companies.insert({
    _id: 'company300',
    name: 'January Wedding Co.',
    owner_id: 'jsmith@gird.us',
    parent_id: 'company100',
    industry: 'Industrial Equipment',
    billingstreet: '53 Billmehere Street',
    billingcity: 'Brooklyn',
    billingstate: 'NY',
    billingzip: '51148',
    shippingstreet: '84 Shiphere Street',
    shippingcity: 'Boston',
    shippingstate: 'MA',
    shippingzip: '50096',
    phone: '943-955-9921',
    type: 'Prospect'
  });
}

//create some sample Projects
if (Projects.find().count() === 0) {
  Projects.insert({
    _id: 'project200',
    name: 'Robot of Mordor',
    startDate: '2014-01-01',
    endDate: '2014-12-01',
    status: 'Draft',
    probability: '0.85',
    situation: 'set all o of this stuffReset all of this',
    solution: 'Reset all of tall of this stuffReset all of this',
    company_id: 'company200',
    rate_book_id: 'rb1'
  });
  Projects.insert({
    _id: 'project100',
    name: 'Mechanical Elephant',
    startDate: '2014-03-01',
    endDate: '2014-10-01',
    status: 'Draft',
    probability: '0.65',
    situation: 'Reset all of  thisof this stuffReset all of this',
    solution: 'set alhis stuffRestuffReset all of this',
    company_id: 'company200',
    rate_book_id: 'rb2'
  });
}

/*
//create some sample Roles
if (Roles.find().count() === 0) {
  Roles.insert({
    _id: 'role1',
    name: 'Project Manager'
  });
  Roles.insert({
    _id: 'role2',
    name: 'Thumb Twiddler'
  });
}

//create some sample Rate Books
if (Rate_Books.find().count() === 0) {
  Rate_Books.insert({
    _id: 'rb1',
    name: 'Default',
    isDefault: true
  });
  Rate_Books.insert({
    _id: 'rb2',
    name: 'Gregs Custom Rates',
    isDefault: false
  });
}

//create some sample Rate Book Roles
if (Rate_Book_Roles.find().count() === 0) {
  Rate_Book_Roles.insert({
    _id: 'rbr1',
    rate_book_id: 'rb1',
    role_id: 'role1',
    rate: 120
  });
  Rate_Book_Roles.insert({
    _id: 'rbr2',
    rate_book_id: 'rb1',
    role_id: 'role2',
    rate: 175
  });
}
*/

//create some sample Resources
if (Resources.find().count() === 0) {
  Resources.insert({
    firstname: 'Greg',
    lastname: 'Kenawell',
    skills: ['skill100', 'skill200']
  });
  Resources.insert({
    firstname: 'Kendall',
    lastname: 'Sealey',
    skills: ['skill100']
  });
}

