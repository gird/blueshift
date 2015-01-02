Template.newResourceSkillModal.rendered = function() {
    Meteor.typeahead.inject();
}

Template.resourceRelated_skills.helpers({
    resourceSkills: function() {
        return Resource_Skills.find({
            resource_id:this._id
        });        
    }
});

Template.resourceSkillsListRow.helpers({
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

Template.resourceSkillsListRowOptions.events({
    'click a.delete_resourceskill': function(e) {
        e.preventDefault();
        Resource_Skills.remove(this._id);
    },
    'click a.edit_resourceskill': function() {
        Session.set('editing_resourceSkillId', this._id);
        $('.edit_resourceSkill_experience').val(Resource_Skills.findOne(this._id).experience);
    }
});

Template.newResourceSkillModal.events({
    'click .submit_new_resourceSkill': function() {
        var skillName = $('.resourceSkill_skillName').val();
        var skill = Skills.findOne({name: skillName});
        var skillId = skill && skill._id;
        var experience = $('.resourceSkill_experience').val();
        Resource_Skills.insert({
            resource_id: this._id,
            skill_id: skillId,
            experience: experience
        });
        $('#newResourceSkillModal').modal('hide');
        $('.resourceSkill_skillName').val(null);
        Session.set('adding_resourceskill_skillid', null);
        $('.resourceSkill_experience').val(null);
        Session.set('adding_resourceskill_experience', null);
    },
    'click .cancel_new_resourceSkill': function() {
        $('.resourceSkill_skillName').val(null);
        Session.set('adding_resourceskill_skillid', null);
        $('.resourceSkill_experience').val(null);
        Session.set('adding_resourceskill_experience', null);
    }
});

Template.editResourceSkillModal.events({
    'click .submit_edit_resourceSkill': function() {
        var experience = $('.edit_resourceSkill_experience').val();
        var resourceSkillId = Session.get('editing_resourceSkillId');
        Resource_Skills.update(
            resourceSkillId, {$set: {experience: experience}}
        );
        $('#editResourceSkillModal').modal('hide');
        $('.edit_resourceSkill_experience').val(null);
        Session.set('editting_resourceskill_experience', null);
        Session.set('editing_resourceSkillId', null);
        
    },
    'click .cancel_edit_resourceSkill': function() {
        $('.edit_resourceSkill_experience').val(null);
        Session.set('editting_resourceskill_experience', null);
    }
});