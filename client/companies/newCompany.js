Template.newCompanyDetails.events({
    'click .company-submit': function () {
        var companyName = $('#company-name');
        var companyType = $('#company-type');
        var companyPhone = $('#company-phone');
        var billingstreet = $('#company-billingstreet');
        var billingcity = $('#company-billingcity');
        var billingstate = $('#company-billingstate');
        var billingzip = $('#company-billingzip');
        var shippingstreet = $('#company-shippingstreet');
        var shippingcity = $('#company-shippingcity');
        var shippingstate = $('#company-shippingstate');
        var shippingzip = $('#company-shippingzip');
        var companyIndustry = $('#company-industry');

        Companies.insert({
            name: companyName.val(),
            owner_id: Meteor.user()._id,
            industry: companyIndustry.val(),
            billingstreet: billingstreet.val(),
            billingcity: billingcity.val(),
            billingstate: billingstate.val(),
            billingzip: billingzip.val(),
            shippingstreet: shippingstreet.val(),
            shippingcity: shippingcity.val(),
            shippingstate: shippingstate.val(),
            shippingzip: shippingzip.val(),
            phone: companyPhone.val(),
            type: companyType.val()
        });
    }
});