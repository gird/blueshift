Template.projectRoles.helpers({
  projectRoles: function() {
    return Project_Roles.find();
  }
});

Template.projectRoleView.helpers({
  'project': function() {
    var project = Projects.findOne(this.project_id);
    var projectName = project && project.name;
    return projectName;
  }
});


Template.newProjectRoleSkillModal.helpers({
    skills: function() {
        return Skills.find();
    }
});



Template.projectRoleRelated_skills.helpers({
    projectRoleSkills: function() {
        return Project_Role_Skills.find({
            project_role_id:this._id
        });        
    }
});

Template.newProjectRoleSkillModal.events({
    'click .submit_new_projectRoleSkill': function() {
        var skillId = $('.projectRoleSkill_skillid').val();
        var experience = $('.projectRoleSkill_experience').val();
        Project_Role_Skills.insert({
            project_role_id: this._id,
            skill_id: skillId,
            experience: experience
        });
        $('#newProjectRoleSkillModal').modal('hide');
        $('.projectRoleSkill_skillid').val(null);
        Session.set('adding_projectroleskill_skillid', null);
        $('.projectRoleSkill_experience').val(null);
        Session.set('adding_projectroleskill_experience', null);
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

Template.projectRoleRelated_resources.helpers({
    resources: function () {
        return this.resources;
    }
});

Template.relatedResourcesListRow.helpers({
    'resourceName': function () {
        var resource = Resources.findOne({
            _id: this.resource_id
        });
        var resourcename = resource && (resource.firstname + ' ' + resource.lastname);
        return resourcename;
    }
});