"use client";

import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Page A", uv: 1000 },
  { name: "Page B", uv: 2500 },
  { name: "Page C", uv: 2000 },
  { name: "Page D", uv: 2780 },
  { name: "Page E", uv: 1890 },
  { name: "Page F", uv: 2390 },
  { name: "Page G", uv: 3490 },
];

const SubscriptionsWaveRatioChart = () => {
  return (
    <ResponsiveContainer width="100%" height={90}>
      <AreaChart
        data={data}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1D2345" stopOpacity={1} />
            <stop offset="100%" stopColor="#1D2345" stopOpacity={1} />
          </linearGradient>
        </defs>
        <XAxis dataKey="name" hide />
        <YAxis hide />
        <CartesianGrid vertical={false} horizontal={false} />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="uv"
          stroke="none"
          fill="url(#colorUv)"
          fillOpacity={1}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default SubscriptionsWaveRatioChart;
