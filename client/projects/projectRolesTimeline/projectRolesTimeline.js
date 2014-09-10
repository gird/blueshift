Template.projectRolesTimeline.rendered = function () {
    Meteor.subscribe('project_roles');
    var projectRoles = Project_Roles.find({
        project_id: this.data._id
    });
    console.log(projectRoles);
    console.log(this.data._id);
    for (i = 0; i < projectRoles.length; i++) {
        console.log(i);
    }
    
    Deps.autorun(function (c) {
        var options = {};
        var data = new vis.DataSet(options);

        projectRoles.forEach(function (projectRole) {

            var roleId = Rate_Book_Roles.findOne({
                _id: projectRole.rate_book_role_id
            }).role_id;
            var role = Roles.findOne({
                _id: roleId
            });

            console.log(role.name);
            data.add([
                {id: projectRole._id,
                content: role.name,
                start: projectRole.startDate,
                end: projectRole.endDate}
            ]);
        });
        data.on('*', function (event, properties, senderId) {
          console.log('event', event, properties);
        });
        $(document).ready(function () {
            $("#projectRolesTimelineChart").html("");
            var container = document.getElementById('projectRolesTimelineChart');
            var timeline = new vis.Timeline(container, data, options);
        });
    });

};