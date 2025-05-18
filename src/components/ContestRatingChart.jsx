import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import { format, addMonths, differenceInMonths } from "date-fns";

function ContestRatingChart({ data1, data2, handle1, handle2 }) {
  const allDatesSet = new Set([
    ...data1.map((d) => d.date),
    ...data2.map((d) => d.date),
  ]);
  const allDates = Array.from(allDatesSet).sort((a, b) => a - b);

  const mergedData = allDates.map((date) => {
    const item = { date };
    const d1 = data1.find((d) => d.date === date);
    const d2 = data2.find((d) => d.date === date);
    item[handle1] = d1 ? d1.newRating : null;
    item[handle2] = d2 ? d2.newRating : null;
    return item;
  });

  const minDate = new Date(allDates[0]);
  const maxDate = new Date(allDates[allDates.length - 1]);

  const monthsDiff = differenceInMonths(maxDate, minDate);
  const tickDates = [];
  for (let m = 0; m <= monthsDiff; m += 6) {
    tickDates.push(addMonths(minDate, m).getTime());
  }

  return (
    <div className="bg-gray-800 text-white p-6 mt-10 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Contest Rating Progress</h2>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={mergedData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="date"
            domain={["dataMin", "dataMax"]}
            type="number"
            scale="time"
            ticks={tickDates}
            tickFormatter={(timestamp) => format(new Date(timestamp), "MMM yyyy")}
            label={{ value: "Date", position: "insideBottom", offset: -5 }}
            tick={{ fontSize: 12 }}
          />
          <YAxis />
          <Tooltip
            labelFormatter={(label) => format(new Date(label), "PPP")}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey={handle1}
            stroke="#8884d8"
            strokeWidth={2}
            dot={false}
          />
          <Line
            type="monotone"
            dataKey={handle2}
            stroke="#82ca9d"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ContestRatingChart;
