Template.projected_revenue.rendered = function () {

    //Not reactive to new data, need to find a new solution for this.
    var projects = Projects.find();
    var revenueByMonths = [0,0,0,0,0,0,0,0,0,0,0,0];
    projects.forEach(function(project) {
        var projectRoles = Project_Roles.find({project_id: project._id});
        if(projectRoles.length <= 0){
            console.log('No projects roles for this project');
        } else {
            console.log(projectRoles.fetch());
            projectRoles.forEach(function(projectRole) {
                var projectRoleSchedules = Project_Role_Schedule.find({project_role_id: projectRole._id});
                if(projectRoleSchedules.length <= 0){
                    console.log('No projects roles schedules for this project role');
                } else {
                    projectRoleSchedules.forEach(function(prs) {
                        var eachday = prs.days;
                        eachday.forEach(function(prsday) {
                            month = moment(prsday.date).month();
                            console.log(month);
                            switch (month) {
                                case 0:
                                    revenueByMonths[0] = revenueByMonths[0] + prsday.revenue;
                                    break;
                                case 1:
                                    revenueByMonths[1] = revenueByMonths[1] + prsday.revenue;
                                    break;
                                case 2:
                                    revenueByMonths[2] = revenueByMonths[2] + prsday.revenue;
                                    break;
                                case 3:
                                    revenueByMonths[3] = revenueByMonths[3] + prsday.revenue;
                                    break;
                                case 4:
                                    revenueByMonths[4] = revenueByMonths[4] + prsday.revenue;
                                    break;
                                case 5:
                                    revenueByMonths[5] = revenueByMonths[5] + prsday.revenue;
                                    break;
                                case 6:
                                    revenueByMonths[6] = revenueByMonths[6] + prsday.revenue;
                                    break;
                                case 7:
                                    revenueByMonths[7] = revenueByMonths[7] + prsday.revenue;
                                    break;
                                case 8:
                                    revenueByMonths[8] = revenueByMonths[8] + prsday.revenue;
                                    break;
                                case 9:
                                    revenueByMonths[9] = revenueByMonths[9] + prsday.revenue;
                                    break;
                                case 10:
                                    revenueByMonths[10] = revenueByMonths[10] + prsday.revenue;
                                    break;
                                case 11:
                                    revenueByMonths[11] = revenueByMonths[11] + prsday.revenue;
                                    break;
                            }
                        });
                    });
                }
            });
        }
    });
    console.log(revenueByMonths);
    
    
    var data = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        datasets: [
            {
                label: "Actual",
                fillColor: "rgba(105,210,231,0.2)",
                strokeColor: "rgba(105,210,231,1)",
                pointColor: "rgba(105,210,231,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(105,210,231,1)",
                data: revenueByMonths
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