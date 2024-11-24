"use client";

import React from "react";
import { PieChart, Pie, Cell } from "recharts";
import { BsEmojiGrin } from "react-icons/bs";

const data = [
  { name: "Completed", value: 60.9 },
  { name: "Remaining", value: 39.1 },
];
const COLORS = ["#D4A537", "#F2E6B3"]; // Adjusted colors for the chart

const size = 350; // Base size for the container
const innerRadiusRatio = 0.23; // Ratio of inner radius to container size
const outerRadiusRatio = 0.3; // Ratio of outer radius to container size

const innerRadius = size * innerRadiusRatio;
const outerRadius = size * outerRadiusRatio;

const SubscriptionsRatioChart = () => {
  return (
    <div
      style={{
        position: "relative",
      }}
    >
      {/* Centered Pie Chart */}
      <PieChart width={size} height={size}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          startAngle={90}
          endAngle={-270}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>

      {/* Center Content */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          textAlign: "center",
          color: "#D4A537",
        }}
      >
        <div
          style={{
            width: `${size * 0.17}px`, // Circle size as a ratio of the container size
            height: `${size * 0.17}px`,
            borderRadius: "50%",
            backgroundColor: "#FBE6C2",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 10px",
          }}
        >
          <span
            role="img"
            aria-label="smile"
            style={{ fontSize: `${size * 0.07}px` }}
          >
            <BsEmojiGrin className="text-yellow-600 size-8" />
          </span>
        </div>
        <div style={{ fontSize: `${size * 0.08}px`, fontWeight: "bold" }}>
          60.9%
        </div>
      </div>
    </div>
  );
};

export default SubscriptionsRatioChart;
