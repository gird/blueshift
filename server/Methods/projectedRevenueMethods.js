Meteor.methods({
    updateRevenueProjections: function (currentYear, projectId) {
        var opportunities = Opportunities.find(
            {project_id: projectId}, {fields: { project_id: 1, name: 1, probability: 1 }}
        );
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
            weightedRevProjections = Revenue_Projections.findOne({project_id: opportunity.project_id, stack: "Weighted", opportunity_id: opportunity._id});
            if(weightedRevProjections) {
                console.log('found a weighted rev projection. ID: ' + weightedRevProjections._id);
                Revenue_Projections.update({
                    _id: weightedRevProjections._id
                }, {
                    $set: {
                        data: weightedRevenueByMonths
                    }
                });
            } else {
                console.log('didnt find a weighted rev projection for this project ');
                Revenue_Projections.insert({
                    opportunity_id: opportunity._id,
                    project_id: opportunity.project_id,
                    name: opportunity.name,
                    data: weightedRevenueByMonths,
                    stack: 'Weighted'
                });
            }
            revProjections = Revenue_Projections.findOne({project_id: opportunity.project_id, stack: "Unweighted", opportunity_id: opportunity._id});
            if(revProjections) {
                console.log('found a rev projection. ID: ' + weightedRevProjections._id);
                Revenue_Projections.update({
                    _id: revProjections._id
                }, {
                    $set: {
                        data: revenueByMonths
                    }
                });
            } else {
                console.log('didnt find a rev projection for this project ');
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