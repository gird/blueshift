Template.projectRelated_opportunityGraph.rendered = function () {

    //Not reactive to new data, need to find a new solution for this.
    var project = Projects.findOne(this.data._id);
    var opportunities = Opportunities.find({
        project_id: this.data._id
    });
    var series = [];
    var weightedSeries = [];
    opportunities.forEach(function (opportunity) {
        var revenueByMonths = [null, null, null, null, null, null, null, null, null, null, null, null];
        var weightedRevenueByMonths = [null, null, null, null, null, null, null, null, null, null, null, null];
        var projectRoles = Project_Roles.find({
            opportunity_id: opportunity._id
        });
        if (projectRoles.length <= 0) {
            console.log('No projects roles for this opportunity : ' + opportunity.name);
        } else {
            projectRoles.forEach(function (projectRole) {
                var projectRoleSchedules = Project_Role_Schedule.find({
                    project_role_id: projectRole._id
                });
                var ratebookrole = Rate_Book_Roles.findOne({
                    _id: projectRole.rate_book_role_id
                });
                if (projectRoleSchedules.length <= 0) {
                    console.log('No projects roles schedules exist for this project role');
                } else {
                    projectRoleSchedules.forEach(function (prs) {
                        var eachday = prs.days;
                        eachday.forEach(function (prsday) {
                            month = moment(prsday.date).month();
                            switch (month) {
                            case 0:
                                revenueByMonths[0] = Math.round(revenueByMonths[0] + (ratebookrole.rate * projectRole.allocation / 100 * 8));
                                weightedRevenueByMonths[0] = Math.round(weightedRevenueByMonths[0] + ((ratebookrole.rate * projectRole.allocation / 100 * 8) * projectRole.probability / 100 * opportunity.probability / 100));
                                break;
                            case 1:
                                revenueByMonths[1] = Math.round(revenueByMonths[1] + (ratebookrole.rate * projectRole.allocation / 100 * 8));
                                weightedRevenueByMonths[1] = Math.round(weightedRevenueByMonths[1] + ((ratebookrole.rate * projectRole.allocation / 100 * 8) * projectRole.probability / 100 * opportunity.probability / 100));
                                break;
                            case 2:
                                revenueByMonths[2] = Math.round(revenueByMonths[2] + (ratebookrole.rate * projectRole.allocation / 100 * 8));
                                weightedRevenueByMonths[2] = Math.round(weightedRevenueByMonths[2] + ((ratebookrole.rate * projectRole.allocation / 100 * 8) * projectRole.probability / 100 * opportunity.probability / 100));
                                break;
                            case 3:
                                revenueByMonths[3] = Math.round(revenueByMonths[3] + (ratebookrole.rate * projectRole.allocation / 100 * 8));
                                weightedRevenueByMonths[3] = Math.round(weightedRevenueByMonths[3] + ((ratebookrole.rate * projectRole.allocation / 100 * 8) * projectRole.probability / 100 * opportunity.probability / 100));
                                break;
                            case 4:
                                revenueByMonths[4] = Math.round(revenueByMonths[4] + (ratebookrole.rate * projectRole.allocation / 100 * 8));
                                weightedRevenueByMonths[4] = Math.round(weightedRevenueByMonths[4] + ((ratebookrole.rate * projectRole.allocation / 100 * 8) * projectRole.probability / 100 * opportunity.probability / 100));
                                break;
                            case 5:
                                revenueByMonths[5] = Math.round(revenueByMonths[5] + (ratebookrole.rate * projectRole.allocation / 100 * 8));
                                weightedRevenueByMonths[5] = Math.round(weightedRevenueByMonths[5] + ((ratebookrole.rate * projectRole.allocation / 100 * 8) * projectRole.probability / 100 * opportunity.probability / 100));
                                break;
                            case 6:
                                revenueByMonths[6] = Math.round(revenueByMonths[6] + (ratebookrole.rate * projectRole.allocation / 100 * 8));
                                weightedRevenueByMonths[6] = Math.round(weightedRevenueByMonths[6] + ((ratebookrole.rate * projectRole.allocation / 100 * 8) * projectRole.probability / 100 * opportunity.probability / 100));
                                break;
                            case 7:
                                revenueByMonths[7] = Math.round(revenueByMonths[7] + (ratebookrole.rate * projectRole.allocation / 100 * 8));
                                weightedRevenueByMonths[7] = Math.round(weightedRevenueByMonths[7] + ((ratebookrole.rate * projectRole.allocation / 100 * 8) * projectRole.probability / 100 * opportunity.probability / 100));
                                break;
                            case 8:
                                revenueByMonths[8] = Math.round(revenueByMonths[8] + (ratebookrole.rate * projectRole.allocation / 100 * 8));
                                weightedRevenueByMonths[8] = Math.round(weightedRevenueByMonths[8] + ((ratebookrole.rate * projectRole.allocation / 100 * 8) * projectRole.probability / 100 * opportunity.probability / 100));
                                break;
                            case 9:
                                revenueByMonths[9] = Math.round(revenueByMonths[9] + (ratebookrole.rate * projectRole.allocation / 100 * 8));
                                weightedRevenueByMonths[9] = Math.round(weightedRevenueByMonths[9] + ((ratebookrole.rate * projectRole.allocation / 100 * 8) * projectRole.probability / 100 * opportunity.probability / 100));
                                break;
                            case 10:
                                revenueByMonths[10] = Math.round(revenueByMonths[10] + (ratebookrole.rate * projectRole.allocation / 100 * 8));
                                weightedRevenueByMonths[10] = Math.round(weightedRevenueByMonths[10] + ((ratebookrole.rate * projectRole.allocation / 100 * 8) * projectRole.probability / 100 * opportunity.probability / 100));
                                break;
                            case 11:
                                revenueByMonths[11] = Math.round(revenueByMonths[11] + (ratebookrole.rate * projectRole.allocation / 100 * 8));
                                weightedRevenueByMonths[11] = Math.round(weightedRevenueByMonths[11] + ((ratebookrole.rate * projectRole.allocation / 100 * 8) * projectRole.probability / 100 * opportunity.probability / 100));
                                break;
                            }
                        });
                    });
                }
            });
        }
        series.push({
            name: opportunity.name,
            data: revenueByMonths,
            stack: 'Unweighted'
        });
        weightedSeries.push({
            name: ' Weighted ' + opportunity.name,
            data: weightedRevenueByMonths,
            stack: 'Weighted'
        });
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
                },
                stackLabels: {
                    enabled: true
                }
            },
            legend: {
                align: 'center',
                verticalAlign: 'top',
                floating: false,
                borderWidth: 1,
                shadow: true
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
                    stacking: 'normal',
                    pointPadding: 0.2,
                    borderWidth: 0
                }
            },
            series: series,
            credits: {
                enabled: false
            },
            exporting: {
                enabled: false
            }
        });
        $('#weighted_projected_revenue').highcharts({
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
                },
                stackLabels: {
                    enabled: true
                }
            },
            legend: {
                align: 'center',
                verticalAlign: 'top',
                floating: false,
                borderWidth: 1,
                shadow: true
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
                    stacking: 'normal',
                    pointPadding: 0.2,
                    borderWidth: 0
                }
            },
            series: weightedSeries,
            credits: {
                enabled: false
            },
            exporting: {
                enabled: false
            }
        });
        $('#carousel').slick({
            dots: true,
            arrows: true
        });
    });
};