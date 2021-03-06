Router.onBeforeAction('loading');

Router.configure({
    layoutTemplate: 'layout',
    loading: ('loading')
    /*,
  waitOn: function() { 
    return [Meteor.subscribe('Projects', 'Companies')]
  }*/
});

Router.map(function () {
    this.route('home', {
        path: '/'
    });
    this.route('dashboard', {
        path: '/dashboard'
    });
    this.route('user', {
        path: '/users/:_id',
        template: 'userView',
        data: function () {
            return Meteor.users.findOne(this.params._id);
        }
    });
    this.route('userFromRole', {
        path: '/users/:resource_id',
        template: 'userView',
        data: function () {
            return Meteor.user();
        }
    });
    this.route('my_profile', {
        path: '/my_profile',
        template: 'userView',
        data: function () {
            return Meteor.user();
        }
    });
    this.route('register', {
        path: '/register'
    });
    this.route('login', {
        path: '/login'
    });
    this.route('users', {
        path: '/users'
    });
    this.route('projects', {
        path: '/projects'
    });
    this.route('newProject', {
        path: '/newProject'
    });
    this.route('projectRoles', {
        path: '/projectRoles'
    });
    this.route('opportunities', {
        path: '/opportunities'
    });
    this.route('newOpportunity', {
        path: '/newOpportunity'
    });
    this.route('newOpportunityProject', {
        path: '/newOpportunityProject'
    });
    this.route('companies', {
        path: '/companies'
    });
    this.route('newCompany', {
        path: '/newCompany'
    });
    this.route('rateBooks', {
        path: '/rateBooks'
    });
    this.route('roles', {
        path: '/roles'
    });
    this.route('contacts', {
        path: '/contacts'
    });
    this.route('skills', {
        path: '/skills'
    });
    /* Deprecated: added users and profiles terminology
    this.route('resources', {
        path: '/resources'
    });

    this.route('resourceView', {
        path: '/resources/:_id',
        data: function () {
            return Resources.findOne(this.params._id);
        }
    });
    */
    this.route('projectView', {
        path: '/projects/:_id',
        data: function () {
            return Projects.findOne(this.params._id);
        }
    });
    this.route('projectRoleView', {
        path: '/projectRoles/:_id',
        data: function () {
            return Project_Roles.findOne(this.params._id);
        }
    });
    this.route('parentProject', {
        path: '/projects/:project_id',
        data: function () {
            return Projects.findOne(this.params.project_id);
        }
    });
    this.route('companyView', {
        path: '/companies/:_id',
        data: function () {
            return Companies.findOne(this.params._id);
        }
    });
    this.route('companyEdit', {
        template: 'editCompany',
        path: '/companies/:_id/edit',
        data: function () {
            return {
                companyId: this.params._id,
                company: Companies.findOne(this.params._id)
            };
        },
        fastRender: true
    });
    this.route('companyParent', {
        path: '/companies/:parent_id',
        data: function () {
            return Companies.findOne(this.params.parent_id);
        }
    });
    this.route('opportunityView', {
        path: '/opportunities/:_id',
        data: function () {
            return Opportunities.findOne(this.params._id);
        }
    });
    this.route('contactView', {
        path: '/contacts/:_id',
        data: function () {
            return Contacts.findOne(this.params._id);
        }
    });
    this.route('parentCompany', {
        path: '/companies/:company_id',
        data: function () {
            return Companies.findOne(this.params.company_id);
        }
    });
    this.route('rateBookView', {
        path: '/rateBooks/:_id',
        data: function () {
            return Rate_Books.findOne(this.params._id);
        }
    });
    this.route('projectRateBook', {
        path: '/rateBooks/:rate_book_id',
        data: function () {
            return Rate_Books.findOne(this.params.rate_book_id);
        }
    });
});

Router.onBeforeAction('loading');