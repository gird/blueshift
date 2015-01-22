Template.newCompanyDetails.events({
    'click .company-submit': function () {
        var companyName = $('#company-name').val();
        var companyType = $('#company-type').val();
        var companyPhone = $('#company-phone').val();
        var billingstreet = $('#company-billingstreet').val();
        var billingcity = $('#company-billingcity').val();
        var billingstate = $('#company-billingstate').val();
        var billingzip = $('#company-billingzip').val();
        var shippingstreet = $('#company-shippingstreet').val();
        var shippingcity = $('#company-shippingcity').val();
        var shippingstate = $('#company-shippingstate').val();
        var shippingzip = $('#company-shippingzip').val();
        var companyIndustry = $('#company-industry').val();
        var owner = Meteor.user()._id;

        Companies.insert({
            name: companyName,
            owner_id: owner,
            industry: companyIndustry,
            billingstreet: billingstreet,
            billingcity: billingcity,
            billingstate: billingstate,
            billingzip: billingzip,
            shippingstreet: shippingstreet,
            shippingcity: shippingcity,
            shippingstate: shippingstate,
            shippingzip: shippingzip,
            phone: companyPhone,
            type: companyType
        });
        
        //Salesforce call to add company to salesforce.
        //Meteor.call('add_company_to_sfdc', companyName, companyPhone, 'website.com', 'Active', companyType, companyIndustry);
        
    }
});