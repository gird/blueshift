Template.projected_revenue.rendered = function () {

    //Not reactive to new data, need to find a new solution for this.
    var projects = Projects.find();
    var revenueByMonths = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    var weightedRevenueByMonths = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    projects.forEach(function (project) {
        var projectRoles = Project_Roles.find({
            project_id: project._id
        });
        if (projectRoles.length <= 0) {
            console.log('No projects roles for this project');
        } else {
            projectRoles.forEach(function (projectRole) {
                var projectRoleSchedules = Project_Role_Schedule.find({
                    project_role_id: projectRole._id
                });
                var ratebookrole = Rate_Book_Roles.findOne({
                    _id: projectRole.rate_book_role_id
                });
                if (projectRoleSchedules.length <= 0) {
                    console.log('No projects roles schedules for this project role');
                } else {
                    projectRoleSchedules.forEach(function (prs) {
                        var eachday = prs.days;
                        eachday.forEach(function (prsday) {
                            month = moment(prsday.date).month();
                            switch (month) {
                            case 0:
                                revenueByMonths[0] = revenueByMonths[0] + prsday.revenue;
                                weightedRevenueByMonths[0] = weightedRevenueByMonths[0] + ((ratebookrole.rate * projectRole.allocation / 100 * 8) * projectRole.probability / 100);
                                break;
                            case 1:
                                revenueByMonths[1] = revenueByMonths[1] + prsday.revenue;
                                weightedRevenueByMonths[1] = weightedRevenueByMonths[1] + ((ratebookrole.rate * projectRole.allocation / 100 * 8) * projectRole.probability / 100);
                                break;
                            case 2:
                                revenueByMonths[2] = revenueByMonths[2] + prsday.revenue;
                                weightedRevenueByMonths[2] = weightedRevenueByMonths[2] + ((ratebookrole.rate * projectRole.allocation / 100 * 8) * projectRole.probability / 100);
                                break;
                            case 3:
                                revenueByMonths[3] = revenueByMonths[3] + prsday.revenue;
                                weightedRevenueByMonths[3] = weightedRevenueByMonths[3] + ((ratebookrole.rate * projectRole.allocation / 100 * 8) * projectRole.probability / 100);
                                break;
                            case 4:
                                revenueByMonths[4] = revenueByMonths[4] + prsday.revenue;
                                weightedRevenueByMonths[4] = weightedRevenueByMonths[4] + ((ratebookrole.rate * projectRole.allocation / 100 * 8) * projectRole.probability / 100);
                                break;
                            case 5:
                                revenueByMonths[5] = revenueByMonths[5] + prsday.revenue;
                                weightedRevenueByMonths[5] = weightedRevenueByMonths[5] + ((ratebookrole.rate * projectRole.allocation / 100 * 8) * projectRole.probability / 100);
                                break;
                            case 6:
                                revenueByMonths[6] = revenueByMonths[6] + prsday.revenue;
                                weightedRevenueByMonths[6] = weightedRevenueByMonths[6] + ((ratebookrole.rate * projectRole.allocation / 100 * 8) * projectRole.probability / 100);
                                break;
                            case 7:
                                revenueByMonths[7] = revenueByMonths[7] + prsday.revenue;
                                weightedRevenueByMonths[7] = weightedRevenueByMonths[7] + ((ratebookrole.rate * projectRole.allocation / 100 * 8) * projectRole.probability / 100);
                                break;
                            case 8:
                                revenueByMonths[8] = revenueByMonths[8] + prsday.revenue;
                                weightedRevenueByMonths[8] = weightedRevenueByMonths[8] + ((ratebookrole.rate * projectRole.allocation / 100 * 8) * projectRole.probability / 100);
                                break;
                            case 9:
                                revenueByMonths[9] = revenueByMonths[9] + prsday.revenue;
                                weightedRevenueByMonths[9] = weightedRevenueByMonths[9] + ((ratebookrole.rate * projectRole.allocation / 100 * 8) * projectRole.probability / 100);
                                break;
                            case 10:
                                revenueByMonths[10] = revenueByMonths[10] + prsday.revenue;
                                weightedRevenueByMonths[10] = weightedRevenueByMonths[10] + ((ratebookrole.rate * projectRole.allocation / 100 * 8) * projectRole.probability / 100);
                                break;
                            case 11:
                                revenueByMonths[11] = revenueByMonths[11] + prsday.revenue;
                                weightedRevenueByMonths[11] = weightedRevenueByMonths[11] + ((ratebookrole.rate * projectRole.allocation / 100 * 8) * projectRole.probability / 100);
                                break;
                            }
                        });
                    });
                }
            });
        }
    });
    console.log(revenueByMonths);



    $(document).ready(function () {
        $('#projected_revenue1').highcharts({
            chart: {
                type: 'column'
            },
            title: {
                text: null
            },
            subtitle: {
                text: null
            },
            xAxis: {
                categories: [
                'Jan',
                'Feb',
                'Mar',
                'Apr',
                'May',
                'Jun',
                'Jul',
                'Aug',
                'Sep',
                'Oct',
                'Nov',
                'Dec'
            ]
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Revenue'
                }
            },
            tooltip: {
                headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                    '<td style="padding:0"></td></tr>',
                footerFormat: '</table>',
                shared: true,
                useHTML: true
            },
            plotOptions: {
                column: {
                    pointPadding: 0.2,
                    borderWidth: 0
                }
            },
            series: [{
                name: 'Actual',
                data: revenueByMonths

        }, {
                name: 'Weighted',
                data: weightedRevenueByMonths

        }]
        });
    });
};