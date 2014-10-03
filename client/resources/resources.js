Template.newResourceSkillModal.rendered = function() {
    Meteor.typeahead.inject();
}

Template.resources.helpers({
  resources: function() {
    return Resources.find();
  }
});


Session.set('editing_resourcename', null);

Session.set('adding_resourcename', null);

Template.editResourceRow.events({
    'click .cancel_edit_resource': function () {
        Session.set('editing_resourcename', null);
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

Template.resourceListRow.editing = function () {
  return Session.equals('editing_resourcename', this._id);
};

Template.resourceListItem.events({
    'click a.delete_resource': function (e) {
        e.preventDefault();
        Resources.remove(this._id);
    },
    'click a.edit_resource': function () {
        Session.set('editing_resourcename', this._id);
        $('submit_new_resource').prop('disabled', true);
        Meteor.flush(); // update DOM before focus
        //focus_field_by_class('edit_resource_name');
        var input = $('.edit_resource_name');
        input.focus();
        input.select();
    }
});

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
    }
});

// Below is for a typeahead demo. 
Template.customTypeAhead.skillz = function(){
    return Skills.find().fetch().map(function(it){ return it.name; });
    /*console.log(Skills.find().fetch());
    var listOfSkills = Skills.find();
    var typeaheadSkillsList = [];
    listOfSkills.forEach(function(skill){
        typeaheadSkillsList.push({
            name: skill.name, 
            value: skill._id 
        });
    });
    console.log('List for query' + typeaheadSkillsList);
    return typeaheadSkillsList;*/
};

Template.resourceSkillsListRowOptions.events({
    'click a.delete_resourceskill': function(e) {
        e.preventDefault();
        Resource_Skills.remove(this._id);
    }
});

Template.newResourceSkillModal.events({
    'click .submit_new_resourceSkill': function() {
        var skillName = $('.resourceSkill_skillName').val();
        var skill = Skills.findOne({name: skillName});
        var skillId = skill && skill._id;
        console.log(skillName);
        console.log(skill);
        console.log(skillId);
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
    }/*,
    'click select.ratebookrole_roleid': function() {
        if($('.ratebookrole_roleid').val() != ''){
            Session.set('adding_ratebookrole_roleid', $('.ratebookrole_roleid').val());
        }
    },
    'keyup input.ratebookrole_rate': function (evt) {
        if (evt.which) {
            var rate = $('.ratebookrole_rate').val();
            console.log(rate);
            console.log(rate == 0);
            if(rate > 0) {
                Session.set('adding_ratebookrole_rate', $('.adding_ratebookrole_rate').val());
            } 
            if (rate <= 0){
                Session.set('adding_ratebookrole_rate', null);
            }
        }
    },
    'click .cancel_new_ratebookrole': function() {
        $('.ratebookrole_roleid').val(null);
        Session.set('adding_ratebookrole_roleid', null);
        $('.ratebookrole_rate').val(null);
        Session.set('adding_ratebookrole_rate', null);
    }*/
});