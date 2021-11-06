
import axios from "axios";
import { useEffect, useState } from "react";
import Charts from "react-apexcharts";
import { SaleSuccess } from "types/sale";
import { round } from "utils/Format";
import { BASE_URL } from "utils/requests";

type SeriesData = {
    name: string
    data: number[]
}

type ChartData = {
    labels: {
        categories: string[];
    };
    series: SeriesData[]
}

const BarChart = () => {

    const [chartData, setChartData] = useState<ChartData>({
        labels: {
            categories: []
        },
        series: [
            {
                name: "",
                data: []
            }
        ]
    });

    useEffect(() => {
        axios.get(BASE_URL + '/sales/success-by-seller')
            .then(response => {
                const data = response.data as SaleSuccess[];
                const mylabels = data.map(x => x.sellerName);
                const myseries = data.map(x => round(100.0 * x.deals / x.visited, 1));

                setChartData({
                    labels: {
                        categories: mylabels
                    },
                    series: [
                        {
                            name: "% sucesso",
                            data: myseries
                        }
                    ]
                });
            });
    }, [])
    const options = {
        plotOptions: {
            bar: {
                horizontal: true,
            }
        },
    };

    return (
        <Charts
            options={{ ...options, xaxis: chartData.labels }}
            series={chartData.series}
            type="bar"
            height="240"
        />
    );
}

export default BarChart;