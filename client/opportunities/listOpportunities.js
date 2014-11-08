Template.opportunities.helpers({
    opportunities: function () {
        return opportunities = Opportunities.find();
    }
});

Template.opportunityListRow.helpers({
    'represented_amount': function () {
        return accounting.formatMoney(this.represented_amount());
    },
    'estimated_amount': function () {
        return accounting.formatMoney(this.estimated_amount);
    }
});