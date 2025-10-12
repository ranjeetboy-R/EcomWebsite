import Layout from "./Layout"
import Chart from "react-apexcharts";

const Dashboard = () => {
    const sales = {
        series: [{
            name: 'series1',
            data: [31, 40, 28, 51, 42, 109, 100]
        },
        {
            name: 'series2',
            data: [11, 32, 45, 32, 34, 52, 41]
        }],
        options: {
            chart: {
                height: 350,
                type: 'area'
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                curve: 'smooth'
            },
            xaxis: {
                type: 'datetime',
                categories: ["2018-09-19T00:00:00.000Z", "2018-09-19T01:30:00.000Z", "2018-09-19T02:30:00.000Z", "2018-09-19T03:30:00.000Z", "2018-09-19T04:30:00.000Z", "2018-09-19T05:30:00.000Z", "2018-09-19T06:30:00.000Z"]
            },
            tooltip: {
                x: {
                    format: 'dd/MM/yy HH:mm'
                },
            },
        },
    };

    const profit = {
        series: [{
            name: 'Net Profit',
            data: [44, 55, 57, 56, 61, 58, 63, 60, 66]
        }, {
            name: 'Revenue',
            data: [76, 85, 101, 98, 87, 105, 91, 114, 94]
        }, {
            name: 'Free Cash Flow',
            data: [35, 41, 36, 26, 45, 48, 52, 53, 41]
        }],
        options: {
            chart: {
                type: 'bar',
                height: 350
            },
            plotOptions: {
                bar: {
                    horizontal: false,
                    columnWidth: '55%',
                    borderRadius: 5,
                    borderRadiusApplication: 'end'
                },
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                show: true,
                width: 2,
                colors: ['transparent']
            },
            xaxis: {
                categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
            },
            yaxis: {
                title: {
                    text: '$ (thousands)'
                }
            },
            fill: {
                opacity: 1
            },
            tooltip: {
                y: {
                    formatter: function (val) {
                        return "$ " + val + " thousands"
                    }
                }
            }
        },
    };

    return (
        <Layout>
            <div className="flex flex-col bg-slate-100 gap-3">
                <div className="grid md:grid-cols-4 grid-cols-2 md:gap-10 gap-5 md:p-8 p-5 md:w-[80%] mx-auto">
                    <div className="bg-cyan-200 p-3 flex justify-around rounded-md shadow-[3px_3px_10px_rgba(0,0,0,0.3)] cursor-pointer">
                        <div className="flex flex-col gap-1 px-2">
                            <div className="w-10 h-10 flex justify-center text-white items-center bg-cyan-500 border border-white rounded-full">
                                <i className="ri-shopping-cart-line"></i>
                            </div>
                            <h1 className="font-bold font-mono text-lg">Proudcts</h1>
                        </div>
                        <div className="flex items-center justify-center border-l-2 border-gray-200">
                            <h1 className="text-2xl font-bold rounded-lg font-serif text-gray-600 stroke-current px-3 py-2">5676</h1>
                        </div>
                    </div>
                    <div className="bg-rose-200 p-3 flex justify-around rounded-md shadow-[3px_3px_10px_rgba(0,0,0,0.3)] cursor-pointer">
                        <div className="flex flex-col gap-1 px-2">
                            <div className="w-10 h-10 flex justify-center text-white items-center bg-rose-500 border border-white rounded-full">
                                <i className="ri-handbag-line"></i>
                            </div>
                            <h1 className="font-bold font-mono text-lg">Orders</h1>
                        </div>
                        <div className="flex items-center justify-center border-l-2 border-gray-200">
                            <h1 className="text-2xl font-bold rounded-lg font-serif text-gray-600 stroke-current px-3 py-2">5676</h1>
                        </div>
                    </div>
                    <div className="bg-emerald-200 p-3 flex justify-around rounded-md shadow-[3px_3px_10px_rgba(0,0,0,0.3)] cursor-pointer">
                        <div className="flex flex-col gap-1 px-2">
                            <div className="w-10 h-10 flex justify-center text-white items-center bg-emerald-500 border border-white rounded-full">
                                <i className="ri-wallet-line"></i>
                            </div>
                            <h1 className="font-bold font-mono text-lg">Payments</h1>
                        </div>
                        <div className="flex items-center justify-center border-l-2 border-gray-200">
                            <h1 className="text-2xl font-bold rounded-lg font-serif text-gray-600 stroke-current px-3 py-2">5676</h1>
                        </div>
                    </div>
                    <div className="bg-violet-200 p-3 flex justify-around rounded-md shadow-[3px_3px_10px_rgba(0,0,0,0.3)] cursor-pointer">
                        <div className="flex flex-col gap-1 px-2">
                            <div className="w-10 h-10 flex justify-center text-white items-center bg-violet-500 border border-white rounded-full">
                                <i className="ri-group-line"></i>
                            </div>
                            <h1 className="font-bold font-mono text-lg">Customers</h1>
                        </div>
                        <div className="flex items-center justify-center border-l-2 border-gray-200">
                            <h1 className="text-2xl font-bold rounded-lg font-serif text-gray-600 stroke-current px-3 py-2">5676</h1>
                        </div>
                    </div>
                </div>
                <div className="grid md:grid-cols-2 gap-10 w-full md:px-10 px-5">
                    <div className="p-5 shadow-lg rounded-lg bg-white">
                        <h1 className="font-semibold">
                            <i className="ri-price-tag-3-line mr-2"></i>
                            Sales
                        </h1>
                        <Chart
                            options={sales.options}
                            series={sales.series}
                            width={'100%'}
                            height={300}
                        />
                    </div>
                    <div className="p-5 shadow-lg rounded-lg bg-white">
                        <h1 className="font-semibold">
                            <i className="ri-exchange-dollar-line mr-2"></i>
                            Profit
                        </h1>
                        <Chart
                            options={profit.options}
                            series={profit.series}
                            width={'100%'}
                            height={300}
                        />
                    </div>
                </div>
                <div className="w-full md:p-10 p-5">
                    <div className="flex gap-3 md:flex-row flex-col md:justify-around items-center rounded-lg md:px-10 px-5 md:py-10 py-5 bg-slate-600 text-white">
                        <img src="/images/user.jpg" alt="user" className="w-24 h-24 rounded-full" />
                        <div className="flex flex-col gap-3 items-center md:w-[70%]">
                            <h1 className="md:text-3xl text-xl font-bold text-center">Dashboard Report & Analytics</h1>
                            <p className="text-center md:text-md text-xs font-serif text-slate-400">Dolor sit amet consectetur adipisicing elit. Distinctio qui, voluptates maxime Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat sapiente expedita temporibus debitis itaque tempora unde ex pariatur, alias saepe. Perferendis, perspiciatis sed?</p>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Dashboard