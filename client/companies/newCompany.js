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
        
        console.log('blah');
        
        /*var consumerKey = '3MVG9Gmy2zmPB01rXNIONIoUJo9mHTW1hKMF6AP8LOUrsFYUc5z9sNLjPeWhGGl2xBcpYqMSkVUlK3GIboY4W';
        var consumerSecret = '1737151145906060705';
        var callBackUrl = 'http://localhost:3000';
        //Meteor.call("doSalesforce"); 
        var conn = new jsforce.Connection({
            oauth2: {
                // you can change loginUrl to connect to sandbox or prerelease env.
                loginUrl : 'https://test.salesforce.com',
                clientId: consumerKey,
                clientSecret: consumerSecret,
                redirectUri: callBackUrl
            }
        });
        conn.login('detcmaygkenawell@foliage.com.chatter', 'December256mH8M7yrz3OdRetCxioLhkwD', function (err, userInfo) {
            if (err) {
                return console.error(err);
            }
            // Now you can get the access token and instance URL information.
            // Save them to establish connection next time.
            console.log(conn.accessToken);
            console.log(conn.instanceUrl);
            // logged in user property
            console.log("User ID: " + userInfo.id);
            console.log("Org ID: " + userInfo.organizationId);
            // ...
        });
        User Name: detcmaygkenawell@foliage.com.chatter
Security Token: 0BLlZsg69Iwp39BnqwKtW99OF
        */
    }
});