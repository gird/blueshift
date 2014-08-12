Template.companies.helpers({
  companies: function() {
    return Companies.find();
  }
});

Template.companyView.helpers({
  'parent': function() {
    var parent = Companies.findOne(this.parent_id).name;
    return parent;
  },
  children: function() {
    return children = Companies.find({ parent_id: this._id });
  },
  childOpportunities: function() {
    return childOpportunities = Opportunities.find({ company_id: this._id });
  },
  childProjects: function() {
    return childProjects = Projects.find({ company_id: this._id });
  },
  childContacts: function() {
    return childContacts = Contacts.find({ company_id: this._id });
  }
});
/*


<!-- 3. Reactive Join #2: Overpublishing. (and joining with data context) -->
<template name="PostList">
  {{#each posts}}
    <h1>{{title}}</h1>
    {{#with joinWithAuthor}}
      <h2>{{author}}</h2>
    {{/with}}
  {{/each}}
</template>

if (Meteor.isServer) {
  Meteor.publish('getPopularPosts', function() {
    return Posts.find({ }, { sort: { score: -1 }, limit: 10 };
  });
  
  Meteor.publish('getEveryAuthors', function() {
    return Meteor.users.find({ }, { fields: { username: 1 }}));
  });
}
 
if (Meteor.isClient) {
  Template.PostList.created = function() {
    Meteor.subscribe('getPopularPosts');
    Meteor.subscribe('getEveryAuthors');
  }
  
  Template.PostList.helpers({
    'posts': function() {
      Posts.find();
    }
    'joinWithAuthor': function() {
      var post = this;
      var author = Meteor.users.findOne(this.userId).username;
      return _.extend(post, _.omit(author, '_id'));
    }
  });
}
*/
