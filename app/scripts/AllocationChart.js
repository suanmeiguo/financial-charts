(function() {
    'use strict';
    const Highcharts = window.Highcharts;
    const angular = window.angular;

    angular.module('app')
        .directive('allocationChart', function() {
            return {
                restrict: 'A',
                scope: {
                    chartData: '&'
                },
                link: function ($scope, $elem, $attrs) {
                    const returnsData = $scope.chartData().filter(i => i.return_10).map(i => [new Date(i.date).getTime(), parseFloat((i.return_10 * 100).toFixed(2))]);
                    const allocationData = $scope.chartData().map(i => [new Date(i.date).getTime(), parseFloat((i.allocation * 100).toFixed(2))]);
                    console.log('$scope:', $scope.chartData());
                    $elem.highcharts({
                        chart: {
                            alignTicks: false,
                            type: 'spline'
                        },
                        title: {
                            text: 'Stock Asset Allocation vs Annualized 10-Year SPX Return'
                        },
                        subtitle: {
                            useHTML: true,
                            text: `
                            <a class="chartSubtitle" href="https://philosophicaleconomics.wordpress.com/2013/12/20/the-single-greatest-predictor-of-future-stock-market-returns/">
                                Source: Philosophical Economics
                            </a>
                            `
                        },
                        yAxis: [{ // Primary yAxis
                            labels: {
                                format: '{value}%',
                                style: {
                                    color: '#000'
                                }
                            },
                            title: {
                                text: 'Stock Asset Allocation',
                                style: {
                                    color: '#000'
                                }
                            },
                            tickInterval: 5,
                            endOnTick: false,
                            startOnTick: false,
                            maxPadding: 0,
                            minPadding: 0,
                            max: 55,
                            min: 15,
                        }, { // Secondary yAxis
                            title: {
                                text: 'SPX 10-Year Returns',
                                style: {
                                    color: '#000'
                                }
                            },
                            labels: {
                                format: '{value}%',
                                style: {
                                    color: '#000'
                                }
                            },
                            opposite: true,
                            reversed: true,
                            gridLineWidth: 0,
                            tickInterval: 1,
                            endOnTick: false,
                            startOnTick: false,
                            maxPadding: 0,
                            minPadding: 0,
                            max: 27,
                            min: -4.5,
                        }],
                        xAxis: {
                            type: 'datetime',
                            dateTimeLabelFormats: {
                                year: '%Y'
                            },
                            title: {
                                text: 'Date'
                            },
                            tickInterval: Date.UTC(2010, 1, 1) - Date.UTC(2010, 0, 1)
                        },
                        tooltip: {
                            snap: 0,
                            shared: true,
                            crosshairs: true,
                            followPointer: true,
                            dateTimeLabelFormats: {
                                month:"%Y-%m-%d",
                            },
                            positioner: function(labelWidth, labelHeight, point) {
                                const chart = this.chart;
                                let tooltipX;
                                let tooltipY;

                                if (point.plotX - labelWidth < 0) {
                                    tooltipX = point.plotX + chart.plotLeft + 20; //right side
                                } else {
                                    tooltipX = point.plotX + chart.plotLeft - labelWidth - 20; //left side
                                }
                                tooltipY = Math.max(point.plotY + chart.plotTop - 20, chart.plotTop);
                                return {
                                    x: tooltipX,
                                    y: tooltipY
                                };
                            }
                        },
                        legend: {
                            layout: 'vertical',
                            align: 'left',
                            x: 120,
                            verticalAlign: 'top',
                            y: 40,
                            floating: true,
                            backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
                        },
                        plotOptions: {
                            series: {
                                tooltip: {
                                    valueSuffix: '%'
                                },
                                lineWidth: 2.5,
                            }
                        },
                        series: [
                        {
                            name: 'SPX 10-Year Returns',
                            yAxis: 1,
                            data: returnsData,
                            tooltip: {
                                valueSuffix: ' %'
                            },
                            color: 'rgb(0, 3, 109)',
                            zIndex: 10,
                        }, {
                            name: 'Stock Asset Allocation',
                            data: allocationData,
                            color: 'rgb(182, 0, 0)'
                        }]
                    });
                }
            };
        });
})();