"use client";

import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "1", Trials: 2000, Subscribed: 1200 },
  { name: "2", Trials: 2200, Subscribed: 1200 },
  { name: "3", Trials: 2800, Subscribed: 2000 },
  { name: "4", Trials: 3000, Subscribed: 2000 },
  { name: "5", Trials: 2500, Subscribed: 1800 },
  { name: "6", Trials: 2800, Subscribed: 2000 },
  { name: "7", Trials: 3000, Subscribed: 2000 },
  { name: "8", Trials: 2100, Subscribed: 1200 },
  { name: "9", Trials: 2800, Subscribed: 2000 },
  { name: "10" },
  { name: "11" },
  { name: "12" },
];

const MonthlySubscriptionsChart = () => {
  return (
    <div style={{ width: "100%", height: 300 }}>
      <ResponsiveContainer>
        <BarChart
          data={data}
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
            dataKey="Trials"
            fill="#d4a531"
            barSize={20}
            // radius={[10, 10, 0, 0]}
          />
          <Bar dataKey="Subscribed" fill="#1a1a1a" barSize={20} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MonthlySubscriptionsChart;
