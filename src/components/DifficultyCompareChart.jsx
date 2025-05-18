import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

function DifficultyCompareChart({ data1, data2, handle1, handle2 }) {
  const difficulties = Object.keys(data1).map((key) => Number(key)).sort((a, b) => a - b);

  const chartData = difficulties.map((diff) => ({
    difficulty: diff,
    [handle1]: data1[diff],
    [handle2]: data2[diff],
  }));

  return (
    <div className="bg-white rounded shadow p-4 mt-4">
      <h2 className="text-2xl font-semibold mb-2">Difficulty-wise Problem Comparison</h2>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={chartData}>
          <XAxis dataKey="difficulty" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey={handle1} fill="#8884d8" />
          <Bar dataKey={handle2} fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default DifficultyCompareChart;
