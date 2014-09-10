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
    
    /*
    This needs a better reactive way of loading the timeline.  Instead of reloading the entire chart,  refresh the data within the timeline.
    
    Check out https://www.eventedmind.com/feed/meteor-build-a-reactive-data-source for a start.
    https://meteor.hackpad.com/Meteor-Cookbook-Reactive-D3-Visualizations-YUR9JT4mrm9
    */
    
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
            // Below needs to be replaced, bad form reloading entire timeline after refresh
            $("#projectRolesTimelineChart").html("");
            var container = document.getElementById('projectRolesTimelineChart');
            var timeline = new vis.Timeline(container, data, options);
        });
    });

};