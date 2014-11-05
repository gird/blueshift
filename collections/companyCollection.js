var company = {
    'owner_fullname': function () {
        return 'Full Name';
    }
};

Companies = new Meteor.Collection('companies', {
    transform: function (doc) {
        var newInstance = Object.create(company);
        return _.extend(newInstance, doc);
    }
});