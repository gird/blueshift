Template.projected_revenue.rendered = function () {

    var projects = Projects.find();
    projects.forEach(function(project) {
        var projectRoles = Project_Roles.find({project_id: project._id});
        if(projectRoles.length <= 0){
            console.log('No projects roles for this project');
        } else {
            console.log(projectRoles.fetch());
            projectRoles.forEach(function(projectRole) {
                var projectRoleSchedules = Project_Role_Schedule.find({project_role_id: projectRole._id});
                if(!projectRoleSchedules){
                    console.log('No projects roles schedules for this project role');
                } else {
                    console.log(projectRoleSchedules.fetch());
                }
            });
        }
    });
    
    
    var data = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
        datasets: [
            {
                label: "Actual",
                fillColor: "rgba(105,210,231,0.2)",
                strokeColor: "rgba(105,210,231,1)",
                pointColor: "rgba(105,210,231,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(105,210,231,1)",
                data: [100, 100, 100, 110, 160, 30, 100]
        },
            {
                label: "Forecast",
                fillColor: "rgba(167,219,216,0.2)",
                strokeColor: "rgba(167,219,216,1)",
                pointColor: "rgba(167,219,216,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(167,219,216,1)",
                data: [120, 120, 120, 120, 120, 120, 120]
        },
            {
                label: "Plan",
                fillColor: "rgba(243,134,48,0.2)",
                strokeColor: "rgba(243,134,48,1)",
                pointColor: "rgba(243,134,48,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(243,134,48,1)",
                data: [70, 70, 70, 70, 40, 60, 50]
        }
    ]
    };
    var options = {
        scaleShowGridLines: false,
        scaleGridLineColor: "rgba(0,0,0,.05)",
        scaleGridLineWidth: 1,
        bezierCurve: false,
        bezierCurveTension: 0.4,
        pointDot: false,
        pointDotRadius: 4,
        pointDotStrokeWidth: 1,
        pointHitDetectionRadius: 20,
        datasetStroke: false,
        datasetStrokeWidth: 2,
        datasetFill: true,
        scaleShowLabels: false,
        scaleSteps: 3
    };

    $(document).ready(function () {
        var ctx = document.getElementById('projected_revenue').getContext("2d");
        var myNewChart = new Chart(ctx).Bar(data, options);
    });
};