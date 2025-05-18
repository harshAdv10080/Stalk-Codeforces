import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

function TagsCompareChart({ tagData1, tagData2, handle1, handle2 }) {
  const allTags = Array.from(new Set([...Object.keys(tagData1), ...Object.keys(tagData2)]));

  const chartData = allTags.map((tag) => ({
    tag,
    [handle1]: tagData1[tag] || 0,
    [handle2]: tagData2[tag] || 0,
  }));

  return (
    <div className="my-6">
      <h2 className="text-xl font-bold mb-4 text-center">Tag-Wise Problem Comparison</h2>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={chartData}>
          <XAxis dataKey="tag" angle={-30} textAnchor="end" height={80} interval={0} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey={handle1} fill="#3182CE" />
          <Bar dataKey={handle2} fill="#E53E3E" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default TagsCompareChart;
