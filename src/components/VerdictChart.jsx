import React from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";

function VerdictChart({ verdictData }) {
  const data = Object.keys(verdictData || {})
    .sort()
    .map((key) => ({
      verdict: key,
      count: verdictData[key],
    }));

  if (!data.length) {
    return <p className="text-center text-gray-500">No verdict data available.</p>;
  }

  return (
    <div className="bg-white p-4 rounded shadow mb-8">
      <h2 className="text-lg font-semibold mb-2">Submission Verdicts</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="verdict" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Bar dataKey="count" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default VerdictChart;
