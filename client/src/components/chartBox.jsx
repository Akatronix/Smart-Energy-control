import React from "react";
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

const SimpleChart = ({ labels, datasets, title = "Device Information" }) => {
  const chartData = labels.map((label, index) => {
    const dataPoint = { name: label };
    datasets.forEach((dataset) => {
      dataPoint[dataset.name] = dataset.data[index] || 0;
    });
    return dataPoint;
  });

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden w-full">
      <div className="p-4 sm:p-6">
        <h3 className="text-lg sm:text-xl font-medium text-gray-900 mb-4">
          {title}
        </h3>
        <div className="h-64 sm:h-80 md:h-96 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartData}
              margin={{
                top: 5,
                right: 10,
                left: 0,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis
                dataKey="name"
                stroke="#6b7280"
                tick={{ fontSize: 10 }}
                interval="preserveStartEnd"
              />
              <YAxis stroke="#6b7280" tick={{ fontSize: 10 }} width={40} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(255, 255, 255, 0.95)",
                  borderRadius: "8px",
                  border: "1px solid #e5e7eb",
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                  fontSize: "12px",
                }}
              />
              <Legend
                wrapperStyle={{
                  paddingTop: "10px",
                  fontSize: "12px",
                }}
                iconType="circle"
                iconSize={10}
              />
              {datasets.map((dataset, index) => (
                <Line
                  key={index}
                  type="monotone"
                  dataKey={dataset.name}
                  stroke={
                    dataset.color ||
                    `#${Math.floor(Math.random() * 16777215).toString(16)}`
                  }
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 6 }}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default SimpleChart;
