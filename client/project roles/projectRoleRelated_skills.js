Template.newProjectRoleSkillModal.rendered = function() {
    Meteor.typeahead.inject();
}

Template.newProjectRoleSkillModal.helpers({
    skillLookup: function() {
        return Skills.find().fetch().map(function(it){ return it.name; });
    }
});



Template.projectRoleRelated_skills.helpers({
    projectRoleSkills: function() {
        return Project_Role_Skills.find({
            project_role_id:this._id
        });        
    }
});

Template.projectRoleSkillsListRowOptions.events({
    'click a.delete_projectroleskill': function(e) {
        e.preventDefault();
        Project_Role_Skills.remove(this._id);
    }
});

Template.projectRoleSkillsListRowOptions.events({
    'click a.delete_projectRoleSkill': function(e) {
        e.preventDefault();
        Resource_Skills.remove(this._id);
    },
    'click a.edit_projectRoleSkill': function() {
        Session.set('editing_projectRoleSkill_id', this._id);
        console.log('editing this: ' + this._id);
        $('.edit_projectRoleSkill_experience').val(Project_Role_Skills.findOne(this._id).experience);
    }
});

Template.newProjectRoleSkillModal.events({
    'click .submit_new_projectRoleSkill': function() {
        var skillName = $('.projectRoleSkill_skillName').val();
        var skill = Skills.findOne({name: skillName});
        var skillId = skill && skill._id;
        var experience = $('.projectRoleSkill_experience').val();
        Project_Role_Skills.insert({
            project_role_id: this._id,
            skill_id: skillId,
            experience: experience
        });
        $('#newProjectRoleSkillModal').modal('hide');
        $('.projectRoleSkill_skillName').val(null);
        Session.set('adding_projectroleskill_skillid', null);
        $('.projectRoleSkill_experience').val(null);
        Session.set('adding_projectroleskill_experience', null);
    },
    'click .cancel_new_projectRoleSkill': function() {
        $('.projectRoleSkill_skillName').val(null);
        Session.set('adding_projectRoleSkill_skillname', null);
        $('.projectRoleSkill_experience').val(null);
        Session.set('adding_projectRoleSkill_experience', null);
    }
});

Template.editProjectRoleSkillModal.events({
    'click .submit_edit_projectRoleSkill': function() {
        var experience = $('.edit_projectRoleSkill_experience').val();
        var projectRoleSkillId = Session.get('editing_projectRoleSkill_id');
        Project_Role_Skills.update(
            projectRoleSkillId, {$set: {experience: experience}}
        );
        $('#editProjectRoleSkillModal').modal('hide');
        $('.edit_projectRoleSkill_experience').val(null);
        Session.set('editing_projectRoleSkill_experience', null);
        Session.set('editing_projectRoleSkill_id', null);
        
    },
    'click .cancel_edit_ProjectRoleSkill': function() {
        $('.edit_projectRoleSkill_experience').val(null);
        Session.set('editing_projectRoleSkill_experience', null);
        Session.set('editing_projectRoleSkill_id', null);
    }
});