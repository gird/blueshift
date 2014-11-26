function builtDashboardRevenueGraph() {
    var revenueProjections = Revenue_Projections.find({stack: "Weighted"}).fetch(); 
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
                    text: 'Revenue Projections',
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
            series: revenueProjections,
            credits: {
                enabled: false
            },
            exporting: {
                enabled: false
            }
        });
    });
    
}

Template.projected_revenue.rendered = function () {
    var projects = Projects.find();
    this.autorun(function (c) {
        builtDashboardRevenueGraph();
    });
    
};