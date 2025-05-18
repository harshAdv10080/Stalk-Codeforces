import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const RecentProblemChart = ({ submissions }) => {
  const MS_PER_DAY = 24 * 60 * 60 * 1000;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const startDate = new Date(today.getTime() - 44 * MS_PER_DAY);

  const problemsPerDay = new Map();
  let totalSolved = 0;
  let totalSubmissions = 0;

  submissions.forEach((sub) => {
    const subDate = new Date(sub.creationTimeSeconds * 1000);
    subDate.setHours(0, 0, 0, 0);

    if (subDate >= startDate && subDate <= today) {
      totalSubmissions++;
      if (sub.verdict === "OK") {
        totalSolved++;
        const dayKey = subDate.toISOString().slice(0, 10);
        problemsPerDay.set(dayKey, (problemsPerDay.get(dayKey) || 0) + 1);
      }
    }
  });

  const labels = [];
  const dataPoints = [];
  for (let i = 0; i < 45; i++) {
    const currentDate = new Date(startDate.getTime() + i * MS_PER_DAY);
    const dayKey = currentDate.toISOString().slice(0, 10);
    const count = problemsPerDay.get(dayKey) || 0;
    if (count > 0) {
      labels.push(dayKey);
      dataPoints.push(count);
    }
  }

  const avgDailyProblems = (totalSolved / 45).toFixed(2);

  const data = {
    labels,
    datasets: [
      {
        label: "Problems Solved",
        data: dataPoints,
        backgroundColor: "rgba(75, 192, 192, 0.7)",
        borderRadius: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (context) => `${context.parsed.y} problems`,
        },
      },
    },
    scales: {
      x: {
        title: { display: true, text: "Date" },
        ticks: { maxRotation: 90, minRotation: 45 },
      },
      y: {
        beginAtZero: true,
        title: { display: true, text: "Problems Solved" },
        precision: 0,
        stepSize: 1,
      },
    },
  };

  if (labels.length === 0) return null;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md my-8">
      <h2 className="text-3xl font-semibold mb-4">Problems Solved (Last 45 Days)</h2>
      <div className="mb-6 grid grid-cols-3 gap-4 text-center text-lg font-medium">
        <div>
          <div className="text-gray-500">Total Problems Solved</div>
          <div className="text-2xl font-bold">{totalSolved}</div>
        </div>
        <div>
          <div className="text-gray-500">Total Submissions</div>
          <div className="text-2xl font-bold">{totalSubmissions}</div>
        </div>
        <div>
          <div className="text-gray-500">Average Daily Problems</div>
          <div className="text-2xl font-bold">{avgDailyProblems}</div>
        </div>
      </div>
      <Bar data={data} options={options} />
    </div>
  );
};

export default RecentProblemChart;
