import React from "react"
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts"

const CustomBarChart = ({ data }) => {
  // Fuction to alternate colors
  const getBarColor = (entry) => {
    switch (entry?.priority) {
      case "Low":
        return "#4CAF50"

      case "Medium":
        return "#FF9800"

      case "High":
        return "#F44336"
      default:
        return "4CAF50"
    }
  }

  const CustomToolTip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 shadow-md rounded-lg border border-gray-300">
          <p className="text-xs font-semibold text-purple-800 mb-1">
            {payload[0].payload.priority}
          </p>

          <p className="text-sm text-gray-600">
            Count:{" "}
            <span className="text-sm font-medium text-gray-900">
              {payload[0].payload.count}
            </span>
          </p>
        </div>
      )
    }

    return null
  }

  return (
    <div className="bg-white mt-6">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid stroke="none" />

          <XAxis
            dataKey="priority"
            tick={{ fill: "#555", fontSize: 12 }}
            stroke="none"
          />

          <YAxis tick={{ fill: "#555", fontSize: 12 }} stroke="none" />

          <Tooltip
            content={<CustomToolTip />}
            cursor={{ fill: "transparent" }}
          />

          <Bar
            dataKey="count"
            name={"priority"}
            fill="#FF8042"
            radius={[10, 10, 0, 0]}
          >
            {data?.map((entry, index) => (
              <Cell key={index} fill={getBarColor(entry)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default CustomBarChart
