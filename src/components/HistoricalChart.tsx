import React, { useState } from 'react'
import { 
  Paper
} from '@material-ui/core';
import {
  Chart,
  ArgumentAxis,
  ValueAxis,
  SplineSeries
} from "@devexpress/dx-react-chart-material-ui";

const generateData = (start: number, end: number, step: number) => {
  const data = [];
  for (let i = start; i < end; i += step) {
    data.push({ value: Math.sin(i) / i, argument: i });
  }

  return data;
};

const HistoricalChart = () => {
  const [data] = useState(generateData(2.5, 12, 0.5))

  return (
    <Paper>
      <Chart data={data} height={300}>
        <ArgumentAxis showGrid />
        <ValueAxis />

        <SplineSeries valueField="value" argumentField="argument" />
      </Chart>
    </Paper>
  )
}

export { HistoricalChart }