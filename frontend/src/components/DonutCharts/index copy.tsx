import axios from "axios";
import { useEffect, useState } from "react";
import Charts from "react-apexcharts";
import { SaleSum } from "types/sale";
import { BASE_URL } from "utils/requests";

type ChartData = {
  labels: string[];
  series: number[]
}

function DonutChart() {

  const [chartData, setChatData] = useState<ChartData>({labels: [], series: []});

    useEffect(() => {
      axios.get(BASE_URL + '/sales/amount-by-seller')
      .then(response => {
        const data = response.data as SaleSum[];
        const mylabels = data.map(x => x.sellerName);
        const myseries = data.map(x => x.sum);
  
          setChatData({labels: mylabels, series: myseries});
      });
    }, [])

  const options = {
    legend: {
      show: true
    }
  };

  return (
    <Charts
      options={{ ...options, labels: chartData.labels }}
      series={chartData.series}
      type="donut"
      height="240" />
  );
}

export default DonutChart;