import React from "react"

const CustomLegend = ({ payload }) => {
  return (
    <div className="flex flex-wrap gap-2 justify-center mt-4 space-x-6">
      {payload?.map((entry, index) => (
        <div className="flex items-center space-x-2" key={`legend-${index}`}>
          <div
            className="w-2.5 h-2.5 rounded-full"
            style={{ backgroundColor: entry.color }}
          ></div>

          <span className="text-xs text-gray-700 font-medium">
            {entry.value}
          </span>
        </div>
      ))}
    </div>
  )
}

export default CustomLegend
