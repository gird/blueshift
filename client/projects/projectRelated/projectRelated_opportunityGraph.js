var monthNames = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun",
            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];

function getMonthCategories(startDate, endDate) {
    var arr = [];
    var datFrom = new Date(startDate);
    var datTo = new Date(endDate);
    var fromYear =  datFrom.getFullYear();
    var toYear =  datTo.getFullYear();
    var diffYear = (12 * (toYear - fromYear)) + datTo.getMonth();
    var firstMonth = datFrom.getMonth();

    for (var i = datFrom.getMonth(); i <= diffYear; i++) {
        var remainderJan = i % 0; 
        var remainderDec = i % 12; 
        if(i==firstMonth || remainderJan==0 || remainderDec==0){
            arr.push(monthNames[i%12] + " " + Math.floor(fromYear+(i/12)));
        } else {
            arr.push(monthNames[i%12]);
        }
        
    }        
    return arr;
}


function buildProjectGraphs(project) {
    var unweightedSeries = Revenue_Projections.find({project_id:project._id, stack: "Unweighted"}).fetch(); 
    var weightedSeries = Revenue_Projections.find({project_id:project._id, stack: "Weighted"}).fetch(); 
    var projectStartDate = new Date(project.startDate + 1);
    var projectEndDate = new Date(project.endDate + 1);
    var monthCategories = getMonthCategories(projectStartDate, projectEndDate);
    
    $(document).ready(function () {
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
                categories: monthCategories
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Weighted Revenue',
                    style: {
                        fontSize: '14px',
                        fontWeight: 'bold'
                    }
                },
                stackLabels: {
                    enabled: true,
                    formatter: function () {
                        return (Math.round(this.total / 1000)) + 'k';
                    }
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
                    borderWidth: 0,
                    animation: false
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
                categories: monthCategories
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Unweighted Revenue',
                    style: {
                        fontSize: '14px',
                        fontWeight: 'bold'
                    }
                },
                stackLabels: {
                    enabled: true,
                    formatter: function () {
                        return (Math.round(this.total / 1000)) + 'k';
                    }
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
                    borderWidth: 0,
                    animation: false
                }
            },
            series: unweightedSeries,
            credits: {
                enabled: false
            },
            exporting: {
                enabled: false
            }
        });
    });
    
}

Template.projectRelated_opportunityGraph.rendered = function () {
    var projectId = this.data._id;
    var project = Projects.findOne(projectId);
    
    this.autorun(function (c) {
        buildProjectGraphs(project);
    });
    
    $('#carousel').slick({
        dots: true,
        arrows: false
    });
};