Template.projectRelated_opportunities.helpers({
    projectOpportunities: function () {
        return projectOpportunities = Opportunities.find({
            project_id: this._id
        });
    },
    'sum_estimated_amount': function() {
        var projectOpportunities = Opportunities.find({
            project_id: this._id
        });
        var amount = 0;
        projectOpportunities.forEach(function(opp) {
            amount = amount + opp.estimated_amount;
        });
        
        return accounting.formatMoney(amount);
    },
    'sum_represented_amount': function() {
        var projectOpportunities = Opportunities.find({
            project_id: this._id
        });
        var amount = 0;
        projectOpportunities.forEach(function(opp) {
            amount = amount + opp.represented_amount();
        });
        
        return accounting.formatMoney(amount);
    }
});

Template.projectOpportunitiesListRow.helpers({
    'estimated_amount': function() {
        return accounting.formatMoney(this.estimated_amount);
    },
    'represented_amount': function() {
        return accounting.formatMoney(this.represented_amount());
    },
    'unrepresented_amount': function() {
        var reped = this.represented_amount();
        var ested = this.estimated_amount;
        var unreped = reped && ested && reped - ested;
        return accounting.formatMoney(unreped, {
            format: {
                pos : "%s %v",
                neg : "%s (%v)",
                zero: "%s  --"
            }
        });
    }
});