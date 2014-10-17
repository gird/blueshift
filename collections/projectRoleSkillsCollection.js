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