Template.project_execution.rendered = function () {
    $(document).ready(function () {
        var gaugeOptions = {

        chart: {
            type: 'solidgauge'
        },

        title: null,

        pane: {
            center: ['50%', '85%'],
            size: '100%',
            startAngle: -110,
            endAngle: 110,
            background: {
                backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || '#EEE',
                innerRadius: '75%',
                outerRadius: '85%',
                shape: 'arc'
            }
        },

        tooltip: {
            enabled: false
        },

        // the value axis
        yAxis: {
            lineWidth: 0,
            minorTickInterval: null,
            tickPixelInterval: 200,
            tickWidth: 0,
            title: {
                y: -50
            },
            labels: {
                y: 16
            }
        },

        plotOptions: {
            solidgauge: {
                dataLabels: {
                    y: 5,
                    borderWidth: 0,
                    useHTML: true
                }
            }
        }

    };

    // The speed gauge
    $('#gross_margin').highcharts(Highcharts.merge(gaugeOptions, {
        yAxis: {
            stops: [
                [0.4, '#DF5353'], 
                [0.55, '#DDDF0D'], 
                [0.6, '#55BF3B'], 
                [0.65, '#DDDF0D'],
                [0.8, '#DF5353']
            ],
            min: 0,
            max: 100,
            title: {
                text: '<b>Gross Margin</b>'
            }
        },

        credits: {
            enabled: false
        },

        series: [{
            name: 'Speed',
            data: [55],
            dataLabels: {
                format: '<div style="text-align:center"><span style="font-size:20px;color:black">{y}%</span></div>'
            }
        }]

    }));
    $('#cpi').highcharts(Highcharts.merge(gaugeOptions, {
        yAxis: {
            stops: [
                [0.42, '#DF5353'], 
                [0.48, '#DDDF0D'], 
                [0.5, '#55BF3B'],
                [0.6, '#0BDEC2'] 
            ],
            min: 0,
            max: 2,
            title: {
                text: '<b>Cost Performance</b>'
            }
        },

        credits: {
            enabled: false
        },

        series: [{
            name: 'Speed',
            data: [0.92],
            dataLabels: {
                format: '<div style="text-align:center"><span style="font-size:20px;color:black">{y}</span></div>'
            }
        }]

    }));
    $('#spi').highcharts(Highcharts.merge(gaugeOptions, {
        yAxis: {
            stops: [
                [0.4, '#DF5353'], 
                [0.45, '#DDDF0D'], 
                [0.5, '#55BF3B'],
                [0.6, '#0BDEC2'] 
            ],
            min: 0,
            max: 2,
            title: {
                text: '<b>Schedule Performance</b>'
            }
        },

        credits: {
            enabled: false
        },

        series: [{
            name: 'Speed',
            data: [1.03],
            dataLabels: {
                format: '<div style="text-align:center"><span style="font-size:20px;color:black">{y}</span></div>'
            }
        }]

    }));
    $('#other1').highcharts(Highcharts.merge(gaugeOptions, {
        yAxis: {
            stops: [
                [0.7, '#DF5353'], 
                [0.9, '#55BF3B'], 
                [0.95, '#0BDEC2'] 
            ],
            min: 0,
            max: 5,
            title: {
                text: '<b>Customer Satisfaction</b>'
            }
        },

        credits: {
            enabled: false
        },

        series: [{
            name: 'Speed',
            data: [4.7],
            dataLabels: {
                format: '<div style="text-align:center"><span style="font-size:20px;color:black">{y}</span></div>'
            }
        }]

    }));
    $('#other2').highcharts(Highcharts.merge(gaugeOptions, {
        yAxis: {
            stops: [
                [0.7, '#DF5353'], 
                [0.9, '#55BF3B'], 
                [1.0, '#0BDEC2'] 
            ],
            min: 0,
            max: 100,
            title: {
                text: '<b>Efficiency</b>'
            }
        },

        credits: {
            enabled: false
        },

        series: [{
            name: 'Speed',
            data: [92],
            dataLabels: {
                format: '<div style="text-align:center"><span style="font-size:20px;color:black">{y}</span></div>'
            }
        }]

    }));
        
    });
};