/*----------Start of User Desired Skills----------*/

Template.userRelated_desiredSkills.helpers({
    userDesiredSkills: function() {
        return User_Desired_Skills.find({
            user_id:this._id
        });        
    }
});

Template.userDesiredSkillsListRow.helpers({
    'skill': function () {
        var skill = Skills.findOne({
            _id: this.skill_id
        });
        var skillname = skill && skill.name;
        return skillname;
    }
});

Template.userDesiredSkillsListRow.helpers({
    'skill': function () {
        var skill = Skills.findOne({
            _id: this.skill_id
        });
        var skillname = skill && skill.name;
        return skillname;
    }
});

Template.userDesiredSkillsListRowOptions.events({
    'click a.delete_userDesiredSkill': function(e) {
        e.preventDefault();
        User_Desired_Skills.remove(this._id);
    },
    'click a.edit_userDesiredSkill': function() {
        Session.set('editing_userDesiredSkillId', this._id);
        //$('.edit_userDesiredSkill_experience').val(Resource_Skills.findOne(this._id).experience);
    }
});

Template.newUserDesiredSkillModal.rendered = function() {
    Meteor.typeahead.inject();
}

Template.newUserDesiredSkillModal.helpers({
    skills: function() {
        return Skills.find();
    },
    skillLookup: function() {
        return Skills.find().fetch().map(function(it){ return it.name; });
    }
});

Template.newUserDesiredSkillModal.events({
    'click .submit_new_userDesiredSkill': function() {
        var desiredSkillName = $('.userDesiredSkill_skillName').val();
        var skill = Skills.findOne({name: desiredSkillName});
        var skillId = skill && skill._id;
        var reason = $('.userDesiredSkill_reason').val();
        User_Desired_Skills.insert({
            user_id: this._id,
            skill_id: skillId,
            reason: reason
        });
        $('#newUserDesiredSkillModal').modal('hide');
        $('.userDesiredSkill_skillName').val(null);
        Session.set('adding_userDesiredSkill_skillid', null);
        $('.userDesiredSkill_reason').val(null);
        Session.set('adding_userDesiredSkill_reason', null);
    },
    'click .cancel_new_userSkill': function() {
        $('.userDesiredSkill_skillName').val(null);
        Session.set('adding_userDesiredSkill_skillid', null);
        $('.userDesiredSkill_reason').val(null);
        Session.set('adding_userDesiredSkill_reason', null);
    }
});

Template.editUserDesiredSkillModal.events({
    'click .submit_edit_userSkill': function() {
        var reason = $('.edit_userDesiredSkill_reason').val();
        var userDesiredSkillId = Session.get('editing_userDesiredSkillId');
        User_Desired_Skills.update(
            userDesiredSkillId, {$set: {experience: experience}}
        );
        $('#editUserDesiredSkillModal').modal('hide');
        $('.edit_userDesiredSkill_experience').val(null);
        Session.set('editting_userDesiredSkill_reason', null);
        Session.set('editing_userDesiredSkillId', null);
        
    },
    'click .cancel_edit_userSkill': function() {
        $('.edit_userDesiredSkill_reason').val(null);
        Session.set('editting_userDesiredSkill_reason', null);
    }
});

/*----------End of User Desired Skills----------*/