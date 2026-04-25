import Svg, { Path, Circle, G, Rect } from 'react-native-svg';
import { colors } from '@/constants/theme';

interface SparklineChartProps {
  data: number[];
  height?: number;
  width?: number;
  strokeColor?: string;
}

export function SparklineChart({
  data,
  height = 60,
  width = 240,
  strokeColor = colors.accent,
}: SparklineChartProps) {
  if (data.length < 2) {
    return null;
  }

  const padding = 4;
  const chartWidth = width - padding * 2;
  const chartHeight = height - padding * 2;

  const x = data.map((_, i) => (i / (data.length - 1)) * chartWidth + padding);
  const y = data.map(d => height - d * chartHeight - padding);

  const pathData = x
    .map((xVal, i) => `${i === 0 ? 'M' : 'L'} ${xVal} ${y[i]}`)
    .join(' ');

  return (
    <Svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      <Path d={pathData} stroke={strokeColor} strokeWidth={2} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <Circle cx={x[x.length - 1]} cy={y[y.length - 1]} r={3} fill={strokeColor} />
    </Svg>
  );
}

interface RingChartProps {
  value: number;
  maxValue: number;
  size?: number;
  trackColor?: string;
  fillColor?: string;
  width?: number;
}

export function RingChart({ value, maxValue, size = 120, trackColor = colors.surface2, fillColor = colors.accent, width = 8 }: RingChartProps) {
  const radius = (size - width) / 2;
  const circumference = radius * 2 * Math.PI;
  const percentage = Math.min(value / maxValue, 1);
  const strokeDashoffset = circumference * (1 - percentage);

  const cx = size / 2;
  const cy = size / 2;

  return (
    <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <Circle cx={cx} cy={cy} r={radius} stroke={trackColor} strokeWidth={width} fill="none" />
      <Circle
        cx={cx}
        cy={cy}
        r={radius}
        stroke={fillColor}
        strokeWidth={width}
        fill="none"
        strokeDasharray={circumference}
        strokeDashoffset={strokeDashoffset}
        strokeLinecap="round"
        transform={`rotate(-90 ${cx} ${cy})`}
      />
    </Svg>
  );
}

interface BarChartProps {
  data: Array<{ label: string; value: number }>;
  height?: number;
  width?: number;
  barColor?: string;
  backgroundColor?: string;
}

export function BarChart({ data, height = 200, width = 240, barColor = colors.accent, backgroundColor = colors.surface2 }: BarChartProps) {
  if (data.length === 0) {
    return null;
  }

  const maxValue = Math.max(...data.map(d => d.value));
  const padding = 8;
  const barWidth = (width - padding * 2) / data.length - 4;
  const chartHeight = height - 20;

  return (
    <Svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      <G>
        {data.map((item, i) => {
          const barHeight = (item.value / maxValue) * chartHeight * 0.8;
          const x = padding + i * (barWidth + 4);
          const y = chartHeight - barHeight + 10;

          return (
            <G key={`bar-${i}`}>
              <Rect x={x} y={y} width={barWidth} height={barHeight} fill={barColor} rx={4} />
            </G>
          );
        })}
      </G>
    </Svg>
  );
}

interface ProjectionChartProps {
  data: Array<{ label: string; value: number }>;
  height?: number;
  width?: number;
  lineColor?: string;
}

export function ProjectionChart({ data, height = 120, width = 240, lineColor = colors.accent2 }: ProjectionChartProps) {
  if (data.length < 2) {
    return null;
  }

  const padding = 8;
  const chartWidth = width - padding * 2;
  const chartHeight = height - padding * 2;
  const maxValue = Math.max(...data.map(d => d.value), 0);
  const minValue = Math.min(...data.map(d => d.value), 0);
  const range = maxValue - minValue || 1;

  const x = data.map((_, i) => (i / (data.length - 1)) * chartWidth + padding);
  const y = data.map(d => height - ((d.value - minValue) / range) * chartHeight - padding / 2);

  const pathData = x.map((xVal, i) => `${i === 0 ? 'M' : 'L'} ${xVal} ${y[i]}`).join(' ');

  return (
    <Svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      <Path d={pathData} stroke={lineColor} strokeWidth={2} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      {x.map((xVal, i) => (
        <Circle key={`dot-${i}`} cx={xVal} cy={y[i]} r={2.5} fill={lineColor} />
      ))}
    </Svg>
  );
}
