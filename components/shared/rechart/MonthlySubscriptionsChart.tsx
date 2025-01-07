"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from "recharts";

const MonthlySubscriptionsChart = ({ userStats }: any) => {
  return (
    <div style={{ width: "100%", height: 300 }}>
      <ResponsiveContainer>
        <BarChart
          data={userStats}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
          <XAxis
            dataKey="name"
            tick={{ fontSize: 12, fill: "#8c8c8c" }}
            axisLine={{ stroke: "#cccccc" }}
            tickLine={false}
          />
          {/* <YAxis
            tick={{ fontSize: 12, fill: "#8c8c8c" }}
            axisLine={{ stroke: "#cccccc" }}
            tickLine={false}
          /> */}
          <Tooltip />
          {/* <Legend wrapperStyle={{ fontSize: 12 }} /> */}
          <Bar
            dataKey="subscribed"
            fill="#d4a531"
            barSize={20}
            // radius={[10, 10, 0, 0]}
          />
          <Bar dataKey="unsubscribed" fill="#1a1a1a" barSize={20} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MonthlySubscriptionsChart;
