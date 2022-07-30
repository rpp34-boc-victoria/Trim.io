import {
  Bar,
  ResponsiveContainer,
  BarChart,
  XAxis,
  YAxis
} from "recharts";

interface IProps {
  data: { value: any, goal: any }[],
}

const goodColor = "#a5f08d";
const medColor = '#f2d285';
const badColor = "#e87676";
const nonColor = '#f2f2f2';
const spacerColor = '#404040';

export default function CalorieBar(props: IProps) {
  const point = props.data[0];
  let spacer = Math.max(point.value, point.goal) / 100;
  let over = point.value > point.goal;
  let value = over ? point.goal : point.value;
  let padding1 = over ? 0 : point.goal - point.value;
  let padding2 = Math.abs(point.goal - point.value);
  const dataPoint = {
    value,
    padding1: (padding1 - spacer/2),
    padding2: (padding2 - spacer/2),
    over,
    spacer,
  }
  console.log(dataPoint)
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart layout='vertical' data={[dataPoint]} barCategoryGap={1}>
        <XAxis type='number'
          domain={[0, Math.max(point.value, point.goal)]}
          interval='preserveStartEnd'
          allowDataOverflow={true} />
        <YAxis type='category' hide />
        <Bar dataKey="value"
          fill={dataPoint.over ? medColor : goodColor}
          stackId='a' />
        <Bar dataKey="padding1"
          fill={nonColor}
          stackId='a' />
        <Bar dataKey="spacer"
          fill={spacerColor}
          stackId='a' />
        <Bar dataKey="padding2"
          fill={dataPoint.over ? badColor : nonColor}
          stackId='a'
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
