Meteor.methods({
    updateRevenueProjections: function (projectId) {
        console.log('trying to update rev projections for project Id: ' + projectId);
        var opportunities = Opportunities.find({
            project_id: projectId
        }, {
            fields: {
                project_id: 1,
                name: 1,
                probability: 1
            }
        });

        var project = Projects.findOne(projectId);
        var startDate = project && project.startDate;
        var endDate = project && project.endDate;
        var monthsDuration = Math.abs(moment(startDate).diff(moment(endDate), 'months', true));
        //console.log(monthsDuration);
        /*var opportunitiesMap = [];
        opportunities.forEach(function (opportunity) {
            opportunitiesMap.push(opportunity._id);
        });
        
        var projectRolesMap = [];
        var rateBookRoleMap = [];
        var projectRoles = Project_Roles.find({opportunity_id: { $in:  opportunitiesMap }});
        projectRoles.forEach(function (projectRole) {
            projectRolesMap.push(projectRole._id);
            rateBookRoleMap.push(projectRole.rate_book_role_id);
        });
        
        var projectRoleSchedules = Project_Role_Schedule.find({project_role_id: {$in: projectRolesMap }});
        var ratebookrole = Rate_Book_Roles.find({_id: {$in: rateBookRoleMap }});
        */

        var series = [];
        var weightedSeries = [];
        opportunities.forEach(function (opportunity) {
            var revenueByMonths = [];
            var weightedRevenueByMonths = [];
            for (i = 0; i < monthsDuration; i++) {
                revenueByMonths.push(null);
                weightedRevenueByMonths.push(null);
            }
            var projectRoles = Project_Roles.find({
                opportunity_id: opportunity._id
            });
            if (projectRoles.length <= 0) {
                //console.log('No projects roles for this opportunity : ' + opportunity.name);
            } else {
                //console.log('projects roles found for opportunity : ' + opportunity.name);
                projectRoles.forEach(function (projectRole) {
                    var projectRoleSchedules = Project_Role_Schedule.find({
                        project_role_id: projectRole._id
                    });
                    var ratebookrole = Rate_Book_Roles.findOne({
                        _id: projectRole.rate_book_role_id
                    });
                    if (projectRoleSchedules.length <= 0) {
                        //console.log('No projects roles schedules exist for this project role');
                    } else {
                        //console.log('projects role schedules found for opportunity : ' + opportunity.name);
                        projectRoleSchedules.forEach(function (prs) {
                            var eachday = prs.days;
                            eachday.forEach(function (prsday) {
                                //month = moment(prsday.date).month();
                                month = Math.abs(moment(startDate).diff(moment(prsday.date), 'months', true));
                                month = Math.floor(month);
                                for (var i = 0; i <= monthsDuration; i++) {
                                    if (month == i) {
                                        revenueByMonths[i] = Math.round(revenueByMonths[i] + (ratebookrole.rate * projectRole.allocation / 100 * 8));
                                    weightedRevenueByMonths[i] = Math.round(weightedRevenueByMonths[i] + ((ratebookrole.rate * projectRole.allocation / 100 * 8) * projectRole.probability / 100 * opportunity.probability / 100));
                                        break;
                                    }
                                }
                            });
                        });
                    }
                });
            }
            weightedRevProjections = Revenue_Projections.findOne({
                project_id: opportunity.project_id,
                stack: "Weighted",
                opportunity_id: opportunity._id
            });
            if (weightedRevProjections) {
                //console.log('found a weighted rev projection. ID: ' + weightedRevProjections._id);
                Revenue_Projections.update({
                    _id: weightedRevProjections._id
                }, {
                    $set: {
                        data: weightedRevenueByMonths
                    }
                });
            } else {
                //console.log('didnt find a weighted rev projection for this project ');
                Revenue_Projections.insert({
                    opportunity_id: opportunity._id,
                    project_id: opportunity.project_id,
                    name: opportunity.name,
                    data: weightedRevenueByMonths,
                    stack: 'Weighted'
                });
            }
            revProjections = Revenue_Projections.findOne({
                project_id: opportunity.project_id,
                stack: "Unweighted",
                opportunity_id: opportunity._id
            });
            if (revProjections) {
                //console.log('found a rev projection. ID: ' + weightedRevProjections._id);
                Revenue_Projections.update({
                    _id: revProjections._id
                }, {
                    $set: {
                        data: revenueByMonths
                    }
                });
            } else {
                //console.log('didnt find a rev projection for this project ');
                Revenue_Projections.insert({
                    opportunity_id: opportunity._id,
                    project_id: opportunity.project_id,
                    name: opportunity.name,
                    data: revenueByMonths,
                    stack: 'Unweighted'
                });
            }
        });
    }
});