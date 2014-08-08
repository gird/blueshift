Template.companies.helpers({
  companies: function() {
    return Companies.find();
  }
});
Template.companyView.helpers({
  parentName: function(id) {
    var companyName = Companies.findOne( {_id: id}, {name:1, _id:0});
    if(companyName == ''){
      companyName = 'No Parent';
    }
    return companyName;
  }
});
/*Template.companyView.company = function(parentid){

    var companyName = Companies.findOne( {_id: parentid}, {name:1, _id:0});
    if(companyName == ''){
      companyName = 'No Parent';
    }
    return companyName;
};*/
