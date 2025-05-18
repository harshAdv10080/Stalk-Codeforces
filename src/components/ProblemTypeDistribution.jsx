import React from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    Cell,
} from "recharts";

const colors = [
    "#34D399", "#60A5FA", "#FBBF24", "#F472B6", "#A78BFA", "#F87171",
    "#10B981", "#3B82F6", "#FCD34D", "#EC4899", "#8B5CF6", "#EF4444",
    "#22D3EE", "#818CF8", "#F59E0B", "#E879F9", "#4ADE80", "#38BDF8",
];

const ProblemTypeDistribution = ({ data }) => {
    const chartData = Object.entries(data)
        .map(([type, count]) => ({ type, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 20); // Show top 20 tags

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg mt-8 max-w-4xl mx-auto">
            <h2 className="text-2xl font-semibold mb-4 text-center">
                Problem Type Distribution (by Tags)
            </h2>
            {chartData.length === 0 ? (
                <p className="text-center text-gray-600">No solved problems found</p>
            ) : (
                <ResponsiveContainer width="100%" height={chartData.length * 30}>
                    <BarChart layout="vertical" data={chartData} margin={{ left: 40 }}>
                        <XAxis type="number" />
                        <YAxis
                            dataKey="type"
                            type="category"
                            width={140}
                            tick={{ fontSize: 12 }}
                        />
                        <Tooltip />
                        <Bar dataKey="count" barSize={18}>
                            {chartData.map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={colors[index % colors.length]}
                                />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            )}
        </div>
    );
};

export default ProblemTypeDistribution;
