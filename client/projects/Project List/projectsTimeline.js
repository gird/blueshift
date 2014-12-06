var projectTimelineOptions = {
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
            
            Projects.update({
                _id: item.id
            }, {
                $set: {
                    startDate: updatedstart,
                    endDate: updatedend
                }
            });
        }

    };

projectTimelineData = new vis.DataSet(projectTimelineOptions);

Template.projectsTimeline.rendered = function () {
    var projects = Projects.find();
    
    projectTimelineData.clear();
    
    projects.forEach(function (project) {

        var projectName = project && project.name;
        var resourceNames = '';
        var resBegin = '';
        var resEnd = '';
        var content = '<div> <a href="/projects/' + project._id + '">' + projectName + '</a></div>';
        try {
            projectTimelineData.add([
                {
                    id: project._id,
                    content: content,
                    start: project.startDate,
                    end: project.endDate
                }
            ]);        
        } catch(err) {
            console.log(err.message);
        }
        
    });
    $(document).ready(function () {
        var container = document.getElementById('projectsTimelineChart');
        var timeline = new vis.Timeline(container, projectTimelineData, projectTimelineOptions);
    });
};