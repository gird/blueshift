var projectrole = {
  'role': function() {
    var ratebookrole = Rate_Book_Roles.findOne(this.rate_book_role_id);
    if(!ratebookrole) { 
        return 'No role name detected'; 
    } else {
        var roleId = ratebookrole.role_id;
        var role = Roles.findOne(roleId);
        if(!role){ 
            return 'No role name detected'; 
        } else {
            return role.name;
        }
    }
  },
  'rate': function() {
    var rate = Rate_Book_Roles.findOne(this.rate_book_role_id).rate;
    return rate;
  }
};

Project_Roles = new Meteor.Collection('project_roles', {
  transform: function (doc) {
    var newInstance = Object.create(projectrole);
    return _.extend(newInstance, doc);
  }
});


var projectroleskill = {
  'skill': function() {
    var prskill = Project_Role_Skills.findOne(this);
    if(!prskill) { 
        return 'No skill name detected. Error 1'; 
    } else {
        var skillId = prskill.skill_id;
        var skill = Skills.findOne({_id: skillId});
        if(!skill){ 
            return 'No skill name detected. Error 2'; 
        } else {
            return skill.name;
        }
    }
  }
};

Project_Role_Skills = new Meteor.Collection('project_role_skills', {
  transform: function (doc) {
    var newInstance = Object.create(projectroleskill);
    return _.extend(newInstance, doc);
  }
});

