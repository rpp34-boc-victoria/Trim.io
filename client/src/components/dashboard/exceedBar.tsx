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
// const badColor = "#e87676";
const nonColor = '#f2f2f2';
const spacerColor = '#404040';

/**
 *
 * @param props  props.data: { value: any, goal: any }[],
 * @returns
 */
export default function ExceedBar(props: IProps) {
  const point = props.data[0];
  let max = Math.max(point.value, point.goal);
  let spacer = max / 100;
  let over = point.value >= point.goal;
  let value = over ? point.goal : point.value;
  let padding1 = over ? 0 : point.goal - point.value;
  let padding2 = Math.abs(point.goal - point.value);
  const dataPoint = {
    value,
    padding1: (padding1 - spacer / 2),
    padding2: (padding2 - spacer / 2),
    over,
    spacer,
    valColor: over ? goodColor : medColor,
    pad2Color: over ? goodColor : nonColor,
    max,
  }
  console.log(dataPoint);
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart layout='vertical' data={[dataPoint]}>
        <XAxis type='number'
          domain={[0, dataPoint.max]}
          interval='preserveStartEnd'
          allowDataOverflow={true}
          hide />
        <YAxis type='category' hide />
        <Bar dataKey="value"
          fill={dataPoint.valColor}
          stackId='a' />
        <Bar dataKey="padding1"
          fill={nonColor}
          stackId='a' />
        <Bar dataKey="spacer"
          fill={spacerColor}
          stackId='a' />
        <Bar dataKey="padding2"
          fill={dataPoint.pad2Color}
          stackId='a' />
      </BarChart>
    </ResponsiveContainer>
  );
}
