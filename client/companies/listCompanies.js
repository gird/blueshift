Template.companies.helpers({
  companies: function() {
    return Companies.find();
  }
});

Template.companyListRow.helpers({
    owner: function() {
        var companyOwner = Meteor.users.findOne({_id: this.owner_id});
        return companyOwner;
        //var ownerProfile = companyOwner && companyOwner().profile;
        //return ownerProfile.firstname;
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
