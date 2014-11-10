function builtGraph(projectId) {
    var unweightedSeries = Revenue_Projections.find({project_id:projectId, stack: "Unweighted"}).fetch(); 
    var weightedSeries = Revenue_Projections.find({project_id:projectId, stack: "Weighted"}).fetch(); 
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
                    text: 'Weighted Revenue',
                    style: {
                        fontSize: '14px',
                        fontWeight: 'bold'
                    }
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
                    text: 'Unweighted Revenue',
                    style: {
                        fontSize: '14px',
                        fontWeight: 'bold'
                    }
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
    
    this.autorun(function (c) {
        builtGraph(projectId);
    });
    
    $('#carousel').slick({
        dots: true,
        arrows: true
    });
};