Template.newResourceSkillModal.rendered = function() {
    Meteor.typeahead.inject();
}

Template.userRelated_skills.helpers({
    userSkills: function() {
        return Resource_Skills.find({
            resource_id:this._id
        });        
    }
});

Template.userSkillsListRow.helpers({
    'skill': function () {
        var skill = Skills.findOne({
            _id: this.skill_id
        });
        var skillname = skill && skill.name;
        return skillname;
    }
});

Template.newResourceSkillModal.helpers({
    skills: function() {
        return Skills.find();
    },
    skillLookup: function() {
        return Skills.find().fetch().map(function(it){ return it.name; });
    }
});

Template.userSkillsListRowOptions.events({
    'click a.delete_userskill': function(e) {
        e.preventDefault();
        Resource_Skills.remove(this._id);
    },
    'click a.edit_userskill': function() {
        Session.set('editing_userSkillId', this._id);
        $('.edit_userSkill_experience').val(Resource_Skills.findOne(this._id).experience);
    }
});

Template.newResourceSkillModal.events({
    'click .submit_new_userSkill': function() {
        var skillName = $('.userSkill_skillName').val();
        var skill = Skills.findOne({name: skillName});
        var skillId = skill && skill._id;
        var experience = $('.userSkill_experience').val();
        Resource_Skills.insert({
            resource_id: this._id,
            skill_id: skillId,
            experience: experience
        });
        $('#newResourceSkillModal').modal('hide');
        $('.userSkill_skillName').val(null);
        Session.set('adding_userskill_skillid', null);
        $('.userSkill_experience').val(null);
        Session.set('adding_userskill_experience', null);
    },
    'click .cancel_new_userSkill': function() {
        $('.userSkill_skillName').val(null);
        Session.set('adding_userskill_skillid', null);
        $('.userSkill_experience').val(null);
        Session.set('adding_userskill_experience', null);
    }
});

Template.editResourceSkillModal.events({
    'click .submit_edit_userSkill': function() {
        var experience = $('.edit_userSkill_experience').val();
        var userSkillId = Session.get('editing_userSkillId');
        Resource_Skills.update(
            userSkillId, {$set: {experience: experience}}
        );
        $('#editResourceSkillModal').modal('hide');
        $('.edit_userSkill_experience').val(null);
        Session.set('editting_userskill_experience', null);
        Session.set('editing_userSkillId', null);
        
    },
    'click .cancel_edit_userSkill': function() {
        $('.edit_userSkill_experience').val(null);
        Session.set('editting_userskill_experience', null);
    }
});