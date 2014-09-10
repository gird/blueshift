Template.projectRolesTimeline.rendered = function () {
    Meteor.subscribe('project_roles');
    var projectRoles = Project_Roles.find({
        project_id: this.data._id
    });

    /*
    This needs a better reactive way of loading the timeline.  Instead of reloading the entire chart,  refresh the data within the timeline.
    
    Check out https://www.eventedmind.com/feed/meteor-build-a-reactive-data-source for a start.
    https://meteor.hackpad.com/Meteor-Cookbook-Reactive-D3-Visualizations-YUR9JT4mrm9
    */

    //Deps.autorun(function (c) {
    var options = {
        editable: true,
        onMove: function (item, callback) {
            //if (confirm('Do you really want to move the item to\n' +
            //    'start: ' + item.start + '\n' +
            //    'end: ' + item.end + '?')) {
                callback(item); // send back item as confirmation (can be changed)
                var updatedstart = moment(new Date(item.start)).format('YYYY-MM-DD');
                var updatedend = moment(new Date(item.end)).format('YYYY-MM-DD');
                
                Project_Roles.update({
                    _id: item.id
                }, {
                    $set: {
                        startDate: updatedstart,
                        endDate: updatedend
                    }
                });
            //} else {
            //    callback(null); // cancel editing item
            //}
        }

    };
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
            {
                id: projectRole._id,
                content: role.name,
                start: projectRole.startDate,
                end: projectRole.endDate
            }
        ]);
    });
    data.on('*', function (event, properties, senderId) {
        console.log('event', event, properties);
    });
    $(document).ready(function () {
        // Below needs to be replaced, bad form reloading entire timeline after refresh
        //$("#projectRolesTimelineChart").html("");
        var container = document.getElementById('projectRolesTimelineChart');
        var timeline = new vis.Timeline(container, data, options);
    });
    //});

};