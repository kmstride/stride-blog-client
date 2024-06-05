import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { useAuthorPerformanceQuery } from "../../feature/blogApi";

function AuthorPer() {
  const { isSuccess, data } = useAuthorPerformanceQuery();
  if(isSuccess){
    console.log(data)
  }
  return (
    <div>
      <h2>Author Performance</h2>
      <BarChart
        width={600}
        height={300}
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="_id" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="postCount" fill="#8884d8" />
      </BarChart>
    </div>
  );
}

export default AuthorPer;
