var nforce = Meteor.npmRequire('nforce');
var username = 'detcmaygkenawell@foliage.com.chatter';
var password = 'December25' + '0BLlZsg69Iwp39BnqwKtW99OF';

var consumerKey = '3MVG9Gmy2zmPB01rXNIONIoUJo9mHTW1hKMF6AP8LOUrsFYUc5z9sNLjPeWhGGl2xBcpYqMSkVUlK3GIboY4W';
var consumerSecret = '1737151145906060705';
var callBackUrl = 'localhost:3000';

var org = nforce.createConnection({
    clientId: '3MVG9Gmy2zmPB01rXNIONIoUJo9mHTW1hKMF6AP8LOUrsFYUc5z9sNLjPeWhGGl2xBcpYqMSkVUlK3GIboY4W',
    clientSecret: '1737151145906060705',
    redirectUri: 'http://localhost:3000/oauth/_callback',
    //testLoginUri: 'https://cs7.salesforce.com/',
    //apiVersion: 'v27.0', // optional, defaults to current salesforce API version
    environment: 'sandbox' // optional, salesforce 'sandbox' or 'production', production default
    //mode: 'multi' // optional, 'single' or 'multi' user mode, multi default
});
var oauth;
org.authenticate({
    username: username,
    password: password
}, function (err, oauth) {
    // the oauth object was stored in the connection object
    if (err) {
        console.log("Authentication Failed:", err);
        console.log(oauth);
        return;
    } else {
        console.log(oauth);
        org.query({
            query: 'SELECT Id, Name FROM Account',
            oauth: oauth
        }, function (err, resp) {
            if (err) throw err;
            if (resp.records && resp.records.length) {
                resp.records.forEach(function (rec) {
                    console.log('Name: ' + rec.get('Name'));
                });

            }
        });
    }
});
/*
var jsforce = Meteor.npmRequire('jsforce'); 

var conn = new jsforce.Connection({
    // you can change loginUrl to connect to sandbox or prerelease env.
    loginUrl: 'https://test.salesforce.com',
    proxyUrl: 'http://localhost:3000'
});
conn.login("detcmaygkenawell@foliage.com.chatter", "December250BLlZsg69Iwp39BnqwKtW99OF", function (err, userInfo) {
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
});*/