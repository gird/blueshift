Template.skills.helpers({
  skills: function() {
    return Skills.find();
  }
});

Session.set('editing_skillname', null);

Session.set('adding_skillname', null);

Template.newSkillRow.events({
    'click .submit_new_skill': function () {
        var skillName = $('.new_skill_name');
        Skills.insert({
            name: skillName.val()
        });
        skillName.val('');
        Session.set('adding_skillname', null);
    },
    'keyup input.new_skill_name': function (evt) {
        if (evt.which) {
            var skillName = $('.new_skill_name').val();
            if(skillName.length > 1) {
                 Session.set('adding_skillname', skillName);
            } 
            if (skillName.length < 2){
                Session.set('adding_skillname', null);
            }
        }
    },
    'keydown input.new_skill_name': function (evt) {
        if (evt.which === 13) {
            var skillName = $('.new_skill_name');
            if(skillName.val().length > 1) {
                Skills.insert({
                    name: skillName.val()
                });
                skillName.val('');
                Session.set('adding_skillname', null);
            } 
            if (skillName.val().length < 2){
                Session.set('adding_skillname', null);
            }
        }
    },
    'click input.new_skill_name': function () {
        Session.set('editing_skillname', null);
    }
});

Template.editSkillRow.events({
    'click .cancel_edit_skill': function () {
        Session.set('editing_skillname', null);
    }
});

var focus_field_by_class = function (className) {
  var input = $(className);
  if (input) {
    input.focus();
    input.select();
  }
  if (li) {
    li.focus();
  }
};

Template.skillListRow.editing = function () {
  return Session.equals('editing_skillname', this._id);
};
Template.newSkillRow.submitIsDisabled = function () {
    return Session.equals('adding_skillname', null);
};

Template.skillListItem.events({
    'click a.delete_skill': function (e) {
        e.preventDefault();
        Skills.remove(this._id);
    },
    'click a.edit_skill': function () {
        Session.set('editing_skillname', this._id);
        $('submit_new_skill').prop('disabled', true);
        Meteor.flush(); // update DOM before focus
        //focus_field_by_class('edit_skill_name');
        var input = $('.edit_skill_name');
        input.focus();
        input.select();
    },
    'dblclick .skillName-text': function () {
        Session.set('adding_skillname', null);
        Session.set('editing_skillname', this._id);
        Meteor.flush(); // update DOM before focus
        //focus_field_by_class('edit_skill_name');
        var input = $('.edit_skill_name');
        input.focus();
        input.select();
    }
});

Template.editSkillRow.events({
    'click .submit_edit_skill': function () {
        var skillName = $('.edit_skill_name');
        Skills.update(
            this._id, {$set: {name: skillName.val()}}
        );
        skillName.val('');
        Session.set('editing_skillname', null);
    },
    'keypress input.edit_skill_name': function (evt, template) {
        // Check to see that keypress is for the Enter key '13'
        if (evt.which === 13) {
            var skillName = $('.edit_skill_name');
            // Do not update if name did not change.
            if (skillName != Skills.findOne(this).name){
                Skills.update(
                    this._id, {$set: {name: skillName.val()}}
                );
            }
            skillName.val('');
            Session.set('editing_skillname', null);
        }
    }
});

Template.skills.rendered = function () {
    $(".tablesorter").tablesorter(); 
};
