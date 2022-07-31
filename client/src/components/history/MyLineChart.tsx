import React from 'react';

import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface IProps {
  data: { value: number, date?: Date }[]
}

export default function MyLineChart(props: IProps) {
  const data = props.data

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart width={150} height={40} data={data}>
        <Line dataKey="value" width={1} fill="#d9d9d9" />
        <XAxis dataKey="date" width={8} interval={0} padding={{ left: 15, right: 15 }} />
        <YAxis dataKey="value" width={11} allowDecimals={true} tickSize={0.5} />
        <Tooltip />
      </LineChart>
    </ResponsiveContainer>
  );
}
