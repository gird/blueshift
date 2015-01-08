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
        
        console.log('blah');
        
        Meteor.call('add_company_to_sfdc', companyName, companyPhone, 'website.com', 'Active', companyType, companyIndustry);
        
        /*
        ConsumerKey: 3MVG9Gmy2zmPB01rXNIONIoUJo9mHTW1hKMF6AP8LOUrsFYUc5z9sNLjPeWhGGl2xBcpYqMSkVUlK3GIboY4W
        ConsumerSecret: 1737151145906060705
        User Name: detcmaygkenawell@foliage.com.chatter
Security Token: 0BLlZsg69Iwp39BnqwKtW99OF
        */
    }
});