var options = {
        editable: {
            add: false,
            updateTime: true,
            updateGroup: false,
            remove: false
        },
        onMove: function (item, callback) {
            callback(item); // send back item as confirmation (allow change)
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
        }

    };

data = new vis.DataSet(options);

Template.projectRolesTimeline.rendered = function () {
    Meteor.subscribe('project_roles');
    Meteor.subscribe('resources');
    var projectRoles = Project_Roles.find({
        project_id: this.data._id
    });

    /*
    This needs a better reactive way of loading the timeline.  Instead of reloading the entire chart,  refresh the data within the timeline.
    
    Check out https://www.eventedmind.com/feed/meteor-build-a-reactive-data-source for a start.
    https://meteor.hackpad.com/Meteor-Cookbook-Reactive-D3-Visualizations-YUR9JT4mrm9
    */

    //Deps.autorun(function (c) {
    /*
    var options = {
        editable: {
            add: false,
            updateTime: true,
            updateGroup: false,
            remove: false
        },
        onMove: function (item, callback) {
            callback(item); // send back item as confirmation (allow change)
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
        }

    };
    var data = new vis.DataSet(options);
    */
    //Need to revisit the rendering of the timeline, may have better options to add data to datavis array through meteor methods.
    data.clear();
    
    projectRoles.forEach(function (projectRole) {

        var ratebookrole = Rate_Book_Roles.findOne({
            _id: projectRole.rate_book_role_id
        });
        var roleId = ratebookrole && ratebookrole.role_id;
        var role = Roles.findOne({
            _id: roleId
        });
        var roleName = role && role.name;
        var resourceNames = '';
        var resBegin = '';
        var resEnd = '';
        var resources = projectRole.resources;
        
        if(!resources){
            resourceNames = 'Not Assigned or Claimed';
            var content = '<div><a href="/projectRoles/' + projectRole._id + '">' + roleName + '</a>&nbsp;<div class="btn-group btn-group-xs"><button type="button" class="btn btn-default projectRole_assign" data-toggle="modal" data-target="#projectRoleAssign"><span class="glyphicon glyphicon-search"></span></button></div></div>';
        } else {
            resources.forEach(function(res){
                var resource = res && Resources.findOne({
                    _id: res.resource_id
                });
                //First and Last names are retunring undefined, need to make sure i have the resource data before running code.
                var resourceFirstName = resource && resource.firstname;
                var resourceLastName = resource && resource.lastname;
                
                if(res.type == 'Assign') {
                    resourceNames = resourceFirstName + ' ' + resourceLastName + ', ';
                    resBegin = ':&nbsp;<a href="/resources/' + res.resource_id + '">';
                    resEnd = '</a> ';
                } else {
                    resourceNames = resourceNames + resourceFirstName + ' ' + resourceLastName + ' (' + res.type + ') ' + ', ';
                    console.log(resourceNames);
                    resBegin = '<a href="#" id="poppy" class="btn-group-xs" data-toggle="popover" title="Claimed Resources" data-content="';
                    
                    resEnd = '"><span class="glyphicon glyphicon-comment"></span></a>';
                }
                resourceNames = resourceNames.slice(0, resourceNames.length -2);
            });
            var content = '<div> <a href="/projectRoles/' + projectRole._id + '">' + roleName + '</a>&nbsp;' + resBegin + resourceNames + resEnd + '</div>';
        }

        
        
        try {
            data.add([
                {
                    id: projectRole._id,
                    content: content,
                    start: projectRole.startDate,
                    end: projectRole.endDate
                }
            ]);        
        } catch(err) {
            console.log(err.message);
        }
        
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

    $(function () {
        $('#poppy').popover('show');
    });
};