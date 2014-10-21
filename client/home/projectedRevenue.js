Template.projected_revenue.rendered = function () {

    //Not reactive to new data, need to find a new solution for this.
    var projects = Projects.find();
    var revenueByMonths = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    var weightedRevenueByMonths = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    var cumulativeRevenueByMonths = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    var cumulativeWeightedRevenueByMonths = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
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
                                revenueByMonths[0] = Math.round(revenueByMonths[0] + (ratebookrole.rate * projectRole.allocation / 100 * 8));
                                weightedRevenueByMonths[0] = Math.round(weightedRevenueByMonths[0] + ((ratebookrole.rate * projectRole.allocation / 100 * 8) * projectRole.probability / 100 * project.probability / 100));
                                break;
                            case 1:
                                revenueByMonths[1] = Math.round(revenueByMonths[1] + (ratebookrole.rate * projectRole.allocation / 100 * 8));
                                weightedRevenueByMonths[1] = Math.round(weightedRevenueByMonths[1] + ((ratebookrole.rate * projectRole.allocation / 100 * 8) * projectRole.probability / 100 * project.probability / 100));
                                break;
                            case 2:
                                revenueByMonths[2] = Math.round(revenueByMonths[2] + (ratebookrole.rate * projectRole.allocation / 100 * 8));
                                weightedRevenueByMonths[2] = Math.round(weightedRevenueByMonths[2] + ((ratebookrole.rate * projectRole.allocation / 100 * 8) * projectRole.probability / 100 * project.probability / 100));
                                break;
                            case 3:
                                revenueByMonths[3] = Math.round(revenueByMonths[3] + (ratebookrole.rate * projectRole.allocation / 100 * 8));
                                weightedRevenueByMonths[3] = Math.round(weightedRevenueByMonths[3] + ((ratebookrole.rate * projectRole.allocation / 100 * 8) * projectRole.probability / 100 * project.probability / 100));
                                break;
                            case 4:
                                revenueByMonths[4] = Math.round(revenueByMonths[4] + (ratebookrole.rate * projectRole.allocation / 100 * 8));
                                weightedRevenueByMonths[4] = Math.round(weightedRevenueByMonths[4] + ((ratebookrole.rate * projectRole.allocation / 100 * 8) * projectRole.probability / 100 * project.probability / 100));
                                break;
                            case 5:
                                revenueByMonths[5] = Math.round(revenueByMonths[5] + (ratebookrole.rate * projectRole.allocation / 100 * 8));
                                weightedRevenueByMonths[5] = Math.round(weightedRevenueByMonths[5] + ((ratebookrole.rate * projectRole.allocation / 100 * 8) * projectRole.probability / 100 * project.probability / 100));
                                break;
                            case 6:
                                revenueByMonths[6] = Math.round(revenueByMonths[6] + (ratebookrole.rate * projectRole.allocation / 100 * 8));
                                weightedRevenueByMonths[6] = Math.round(weightedRevenueByMonths[6] + ((ratebookrole.rate * projectRole.allocation / 100 * 8) * projectRole.probability / 100 * project.probability / 100));
                                break;
                            case 7:
                                revenueByMonths[7] = Math.round(revenueByMonths[7] + (ratebookrole.rate * projectRole.allocation / 100 * 8));
                                weightedRevenueByMonths[7] = Math.round(weightedRevenueByMonths[7] + ((ratebookrole.rate * projectRole.allocation / 100 * 8) * projectRole.probability / 100 * project.probability / 100));
                                break;
                            case 8:
                                revenueByMonths[8] = Math.round(revenueByMonths[8] + (ratebookrole.rate * projectRole.allocation / 100 * 8));
                                weightedRevenueByMonths[8] = Math.round(weightedRevenueByMonths[8] + ((ratebookrole.rate * projectRole.allocation / 100 * 8) * projectRole.probability / 100 * project.probability / 100));
                                break;
                            case 9:
                                revenueByMonths[9] = Math.round(revenueByMonths[9] + (ratebookrole.rate * projectRole.allocation / 100 * 8));
                                weightedRevenueByMonths[9] = Math.round(weightedRevenueByMonths[9] + ((ratebookrole.rate * projectRole.allocation / 100 * 8) * projectRole.probability / 100 * project.probability / 100));
                                break;
                            case 10:
                                revenueByMonths[10] = Math.round(revenueByMonths[10] + (ratebookrole.rate * projectRole.allocation / 100 * 8));
                                weightedRevenueByMonths[10] = Math.round(weightedRevenueByMonths[10] + ((ratebookrole.rate * projectRole.allocation / 100 * 8) * projectRole.probability / 100 * project.probability / 100));
                                break;
                            case 11:
                                revenueByMonths[11] = Math.round(revenueByMonths[11] + (ratebookrole.rate * projectRole.allocation / 100 * 8));
                                weightedRevenueByMonths[11] = Math.round(weightedRevenueByMonths[11] + ((ratebookrole.rate * projectRole.allocation / 100 * 8) * projectRole.probability / 100 * project.probability / 100));
                                break;
                            }
                            switch (month) {
                            case 0:
                                cumulativeRevenueByMonths[0] = Math.round(cumulativeRevenueByMonths[0] + (ratebookrole.rate * projectRole.allocation / 100 * 8));
                                cumulativeWeightedRevenueByMonths[0] = Math.round(cumulativeWeightedRevenueByMonths[0] + ((ratebookrole.rate * projectRole.allocation / 100 * 8) * projectRole.probability / 100 * project.probability / 100));
                            case 1:
                                cumulativeRevenueByMonths[1] = Math.round(cumulativeRevenueByMonths[1] + (ratebookrole.rate * projectRole.allocation / 100 * 8));
                                cumulativeWeightedRevenueByMonths[1] = Math.round(cumulativeWeightedRevenueByMonths[1] + ((ratebookrole.rate * projectRole.allocation / 100 * 8) * projectRole.probability / 100 * project.probability / 100));
                            case 2:
                                cumulativeRevenueByMonths[2] = Math.round(cumulativeRevenueByMonths[2] + (ratebookrole.rate * projectRole.allocation / 100 * 8));
                                cumulativeWeightedRevenueByMonths[2] = Math.round(cumulativeWeightedRevenueByMonths[2] + ((ratebookrole.rate * projectRole.allocation / 100 * 8) * projectRole.probability / 100 * project.probability / 100));
                            case 3:
                                cumulativeRevenueByMonths[3] = Math.round(cumulativeRevenueByMonths[3] + (ratebookrole.rate * projectRole.allocation / 100 * 8));
                                cumulativeWeightedRevenueByMonths[3] = Math.round(cumulativeWeightedRevenueByMonths[3] + ((ratebookrole.rate * projectRole.allocation / 100 * 8) * projectRole.probability / 100 * project.probability / 100));
                            case 4:
                                cumulativeRevenueByMonths[4] = Math.round(cumulativeRevenueByMonths[4] + (ratebookrole.rate * projectRole.allocation / 100 * 8));
                                cumulativeWeightedRevenueByMonths[4] = Math.round(cumulativeWeightedRevenueByMonths[4] + ((ratebookrole.rate * projectRole.allocation / 100 * 8) * projectRole.probability / 100 * project.probability / 100));
                            case 5:
                                cumulativeRevenueByMonths[5] = Math.round(cumulativeRevenueByMonths[5] + (ratebookrole.rate * projectRole.allocation / 100 * 8));
                                cumulativeWeightedRevenueByMonths[5] = Math.round(cumulativeWeightedRevenueByMonths[5] + ((ratebookrole.rate * projectRole.allocation / 100 * 8) * projectRole.probability / 100 * project.probability / 100));
                            case 6:
                                cumulativeRevenueByMonths[6] = Math.round(cumulativeRevenueByMonths[6] + (ratebookrole.rate * projectRole.allocation / 100 * 8));
                                cumulativeWeightedRevenueByMonths[6] = Math.round(cumulativeWeightedRevenueByMonths[6] + ((ratebookrole.rate * projectRole.allocation / 100 * 8) * projectRole.probability / 100 * project.probability / 100));
                            case 7:
                                cumulativeRevenueByMonths[7] = Math.round(cumulativeRevenueByMonths[7] + (ratebookrole.rate * projectRole.allocation / 100 * 8));
                                cumulativeWeightedRevenueByMonths[7] = Math.round(cumulativeWeightedRevenueByMonths[7] + ((ratebookrole.rate * projectRole.allocation / 100 * 8) * projectRole.probability / 100 * project.probability / 100));
                            case 8:
                                cumulativeRevenueByMonths[8] = Math.round(cumulativeRevenueByMonths[8] + (ratebookrole.rate * projectRole.allocation / 100 * 8));
                                cumulativeWeightedRevenueByMonths[8] = Math.round(cumulativeWeightedRevenueByMonths[8] + ((ratebookrole.rate * projectRole.allocation / 100 * 8) * projectRole.probability / 100 * project.probability / 100));
                            case 9:
                                cumulativeRevenueByMonths[9] = Math.round(cumulativeRevenueByMonths[9] + (ratebookrole.rate * projectRole.allocation / 100 * 8));
                                cumulativeWeightedRevenueByMonths[9] = Math.round(cumulativeWeightedRevenueByMonths[9] + ((ratebookrole.rate * projectRole.allocation / 100 * 8) * projectRole.probability / 100 * project.probability / 100));
                            case 10:
                                cumulativeRevenueByMonths[10] = Math.round(cumulativeRevenueByMonths[10] + (ratebookrole.rate * projectRole.allocation / 100 * 8));
                                cumulativeWeightedRevenueByMonths[10] = Math.round(cumulativeWeightedRevenueByMonths[10] + ((ratebookrole.rate * projectRole.allocation / 100 * 8) * projectRole.probability / 100 * project.probability / 100));
                            case 11:
                                cumulativeRevenueByMonths[11] = Math.round(cumulativeRevenueByMonths[11] + (ratebookrole.rate * projectRole.allocation / 100 * 8));
                                cumulativeWeightedRevenueByMonths[11] = Math.round(cumulativeWeightedRevenueByMonths[11] + ((ratebookrole.rate * projectRole.allocation / 100 * 8) * projectRole.probability / 100 * project.probability / 100));
                            }
                        });
                    });
                }
            });
        }
    });

    $(document).ready(function () {
            $('#projected_revenue').highcharts({
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
                        '<td style="padding:0">{point.y:1f}</td></tr>',
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
                series: [
                    {
                        name: 'Projected',
                        data: revenueByMonths

                }, {
                        name: 'Weighted',
                        data: weightedRevenueByMonths
                }, {
                        name: 'Actual',
                        data: [20000, 40000, 50000, 35000]
                }
            ],
                credits: {
                    enabled: false
                },
                exporting: {
                    enabled: false
                }
            });

            $('#cumulative_projected_revenue').highcharts({
                chart: {
                    type: 'area'
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
                        text: 'Cumulative Revenue'
                    }
                },
                tooltip: {
                    headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                    pointFormat: '<tr><td style="color:{series.color};padding:0"><strong>{series.name}</strong>: </td>' +
                        '<td style="padding:0">{point.y}</td></tr>',
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
                series: [
                    {
                        name: 'Projected',
                        data: cumulativeRevenueByMonths
                }, {
                        name: 'Weighted',
                        data: cumulativeWeightedRevenueByMonths
                }, {
                        name: 'Actual',
                        data: [20000, 40000, 50000, 35000]
                }
            ],
                credits: {
                    enabled: false
                },
                exporting: {
                    enabled: false
                }
            });
    });
};