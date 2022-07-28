import {
  Bar,
  ResponsiveContainer,
  BarChart
} from "recharts";

interface IProps{
  data: {value: number}[]
}

export default function MyBarChart(props:IProps) {
  const data = props.data

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart width={150} height={40} data={data}>
        <Bar dataKey="value" width={1} fill="#d9d9d9" background={{ fill: '#f2f2f2' }} barSize={14} />
      </BarChart>
    </ResponsiveContainer>
  );
}
