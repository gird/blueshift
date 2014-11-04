Template.projectRelated_opportunities.helpers({
    projectOpportunities: function () {
        return projectOpportunities = Opportunities.find({
            project_id: this._id
        });
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
        console.log(reped);
        var ested = this.estimated_amount;
        console.log(ested);
        var unreped = reped && ested && reped - ested;
        console.log(unreped);
        return accounting.formatMoney(unreped, {
            format: {
                pos : "%s %v",
                neg : "%s (%v)",
                zero: "%s  --"
            }
        });
    }
});