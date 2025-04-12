import { useEffect, useState } from "react";
import { Filler } from "chart.js";

import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  LineElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import axios from "axios";
import { Chart } from "react-chartjs-2";

// Register chart components
ChartJS.register(
  ArcElement,
  BarElement,
  LineElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  ChartDataLabels,
  Filler
);

// Wrapper component to manage chart lifecycle
const ChartWrapper = ({ type, data, options, plugins }) => {
  return <Chart type={type} data={data} options={options} plugins={plugins} />;
};

const Stats = () => {
  const [trendData, setTrendData] = useState([]);
  const [userStats, setUserStats] = useState({});
  const [vehicleStats, setVehicleStats] = useState({});
  const [feedbackStats, setFeedbackStats] = useState({});

  useEffect(() => {
    fetchApplicationTrends();
    fetchStats();
  }, []);

  const fetchApplicationTrends = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/stats/application-trends"
      );
      setTrendData(res.data);
    } catch (err) {
      console.error("Error fetching trends:", err);
    }
  };

  const fetchStats = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/stats");
      const { users, vehicles, feedbacks } = res.data;
      setUserStats(users);
      setVehicleStats(vehicles);
      setFeedbackStats(feedbacks);
    } catch (err) {
      console.error("Error fetching stats:", err);
    }
  };

  const monthLabels = trendData.map((item) =>
    new Date(0, item.month - 1).toLocaleString("default", { month: "short" })
  );

  const lineData = {
    labels: monthLabels,
    datasets: [
      {
        label: "Pending Applications",
        data: trendData.map((item) => item.Pending),
        borderColor: "#facc15",
        backgroundColor: "rgba(250, 204, 21, 0.3)",
        fill: true,
        tension: 0.4,
      },
      {
        label: "Approved Applications",
        data: trendData.map((item) => item.Approved),
        borderColor: "#22c55e",
        backgroundColor: "rgba(34, 197, 94, 0.3)",
        fill: true,
        tension: 0.4,
      },
      {
        label: "Rejected Applications",
        data: trendData.map((item) => item.Rejected),
        borderColor: "#ef4444",
        backgroundColor: "rgba(239, 68, 68, 0.3)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  const pieConfig = (labels, values, colors) => ({
    data: {
      labels,
      datasets: [
        {
          data: values,
          backgroundColor: colors,
          borderWidth: 1,
        },
      ],
    },
    options: {
      plugins: {
        legend: {
          display: false,
        },
        datalabels: {
          color: "#fff",
          font: {
            weight: "bold",
            size: 10,
          },
          formatter: (value, context) => {
            const label = context.chart.data.labels[context.dataIndex];
            return `${label}\n${value}`;
          },
        },
      },
      maintainAspectRatio: false,
    },
    plugins: [ChartDataLabels],
  });

  const barData = {
    labels: ["1 Star", "2 Star", "3 Star", "4 Star", "5 Star"],
    datasets: [
      {
        label: "Feedback Ratings",
        data: [
          feedbackStats[1] || 0,
          feedbackStats[2] || 0,
          feedbackStats[3] || 0,
          feedbackStats[4] || 0,
          feedbackStats[5] || 0,
        ],
        backgroundColor: [
          "#ef4444",
          "#f59e0b",
          "#eab308",
          "#84cc16",
          "#10b981",
        ],
      },
    ],
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        ticks: { display: true },
        grid: { display: false },
      },
      y: {
        ticks: { display: true },
        grid: { display: false },
      },
    },
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 p-4">
      {/* Applications - Line Chart */}
      <div className="bg-white p-2 rounded shadow-md text-center flex flex-col items-center justify-center">
        <p className="text-xs font-medium mb-1">Applications Over Time</p>
        <div className="w-full max-w-[300px] h-[200px]">
          <ChartWrapper type="line" data={lineData} options={lineOptions} />
        </div>
      </div>

      {/* Users - Pie Chart */}
      <div className="bg-white p-2 rounded shadow-md text-center flex flex-col items-center justify-center">
        <p className="text-xs font-medium mb-1">Users</p>
        <div className="w-full max-w-[150px] h-[150px]">
          <ChartWrapper
            type="pie"
            data={
              pieConfig(
                ["Users", "Admins"],
                [userStats.user || 0, userStats.admin || 0],
                ["#60a5fa", "#f97316"]
              ).data
            }
            options={pieConfig().options}
            plugins={pieConfig().plugins}
          />
        </div>
      </div>

      {/* Vehicles - Pie Chart */}
      <div className="bg-white p-2 rounded shadow-md text-center flex flex-col items-center justify-center">
        <p className="text-xs font-medium mb-1">Vehicles</p>
        <div className="w-full max-w-[150px] h-[150px]">
          <ChartWrapper
            type="pie"
            data={
              pieConfig(
                ["Active", "Expired"],
                [vehicleStats.active || 0, vehicleStats.expired || 0],
                ["#4ade80", "#f87171"]
              ).data
            }
            options={pieConfig().options}
            plugins={pieConfig().plugins}
          />
        </div>
      </div>

      {/* Feedback - Bar Chart */}
      <div className="bg-white p-2 rounded shadow-md text-center flex flex-col items-center justify-center">
        <p className="text-xs font-medium mb-1">Feedback Ratings</p>
        <div className="w-full max-w-[300px] h-[150px]">
          <ChartWrapper type="bar" data={barData} options={barOptions} />
        </div>
      </div>
    </div>
  );
};

export default Stats;
