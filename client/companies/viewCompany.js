Template.companyView.subscriptionReady = function () {
    return companiesSubscriptionHandle.ready();
};

Template.companyViewDetails.helpers({
    attributes: function() {
        
        var columnNames = [{keyValue: "parent", displayValue: "Parent"}, {keyValue: "type", displayValue: "Type"}];
        return columnNames;
        /*{{#if parent_id}}
            <p><strong>Parent: </strong><a href="{{pathFor 'companyParent'}}">{{parent}}</a>
            </p>
        {{/if}}
        <p><strong>Industry: </strong>{{industry}}</p>
        <p><strong>Type: </strong>{{type}}</p>
        <p><strong>Phone: </strong>{{phone}}</p>
        <p><strong>Billing Street: </strong>{{billingstreet}}</p>
        <p><strong>Billing City: </strong>{{billingcity}}</p>
        <p><strong>Billing State: </strong>{{billingstate}}</p>
        <p><strong>Billing Zip: </strong>{{billingzip}}</p>
        <p><strong>Shipping Street: </strong>{{shippingstreet}}</p>
        <p><strong>Shipping City: </strong>{{shippingcity}}</p>
        <p><strong>Shipping State: </strong>{{shippingstate}}</p>
        <p><strong>Shipping Zip: </strong>{{shippingzip}}</p>*/
    },
    parent: function () {
        var parent = Companies.findOne(this.parent_id).name;
        return parent;
    },
    editingParent: function () {
        return Session.equals('editing_parent', this._id);
    },
    editingIndustry: function () {
        return Session.equals('editing_industry', this._id);
    }
});
Template.companyViewDetails.events({
    'dblclick .parentName': function () {
        Session.set('editing_parent', this._id);
        Meteor.flush(); // update DOM before focus
        //focus_field_by_class('edit_role_name');
        var input = $('.edit_parent_name');
        input.focus();
        input.select();
    },
    'click .submit_edit_parent': function () {
        //var roleName = $('.edit_role_name');
        Session.set('editing_parent', null);
    },
    'click .cancel_edit_parent': function () {
        Session.set('editing_parent', null);
    },
    'dblclick .industryName': function () {
        Session.set('editing_industry', this._id);
        Meteor.flush(); // update DOM before focus
        console.log('dbl clicked industryname');
        //focus_field_by_class('edit_role_name');
        var input = $('.edit_industry');
        input.focus();
        input.select();
    },
    'click .submit_edit_industry': function () {
        //var roleName = $('.edit_role_name');
        Session.set('editing_industry', null);
    },
    'click .cancel_edit_industry': function () {
        Session.set('editing_industry', null);
    }
});
Template.companyViewButtons.events({
    'click .edit_company': function () {
        
        Router.go('companyEdit', {_id: this._id});
        Session.set('selectedCompanyId', this._id);
    }
});


Template.companyRelated_opportunities.helpers({
    childOpportunities: function () {
        return childOpportunities = Opportunities.find({
            company_id: this._id
        });
    }
});

Template.companyRelated_projects.helpers({
    childProjects: function () {
        return childProjects = Projects.find({
            company_id: this._id
        });
    }
});

Template.companyRelated_contacts.helpers({
    childContacts: function () {
        return childContacts = Contacts.find({
            company_id: this._id
        });
    }
});

Template.companyRelated_children.helpers({
    children: function () {
        return children = Companies.find({
            parent_id: this._id
        });
    }
});

Template.companyViewButtons.events({
    'click .delete_company': function (e) {
        e.preventDefault();
        Companies.remove(this._id);
        Router.go('companies');
    }
});



