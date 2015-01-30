var resourceskill = {
  'skill': function() {
    var rskill = Resource_Skills.findOne(this);
    if(!rskill) { 
        return 'No skill name detected. Error 1'; 
    } else {
        var skillId = rskill.skill_id;
        var skill = Skills.findOne({_id: skillId});
        if(!skill){ 
            return 'No skill name detected. Error 2'; 
        } else {
            return skill.name;
        }
    }
  }
};

Resource_Skills = new Meteor.Collection('resource_skills', {
  transform: function (doc) {
    var newInstance = Object.create(resourceskill);
    return _.extend(newInstance, doc);
  }
});

var userDesiredSkill = {
  'skill': function() {
    var rskill = User_Desired_Skills.findOne(this);
    if(!rskill) { 
        return 'No skill name detected. Error 1'; 
    } else {
        var skillId = rskill.skill_id;
        var skill = Skills.findOne({_id: skillId});
        if(!skill){ 
            return 'No skill name detected. Error 2'; 
        } else {
            return skill.name;
        }
    }
  }
};

User_Desired_Skills = new Meteor.Collection('user_desired_skills', {
  transform: function (doc) {
    var newInstance = Object.create(userDesiredSkill);
    return _.extend(newInstance, doc);
  }
});