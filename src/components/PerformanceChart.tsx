import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ChartData {
  name: string;
  value: number;
  previous?: number;
}

interface PerformanceChartProps {
  title: string;
  data: ChartData[];
  type?: 'bar' | 'line';
  className?: string;
  onBarClick?: (data: ChartData) => void;
}

export function PerformanceChart({ 
  title, 
  data, 
  type = 'bar',
  className = "",
  onBarClick 
}: PerformanceChartProps) {
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card/95 backdrop-blur-sm p-3 rounded-lg border border-border shadow-lg">
          <p className="text-sm text-foreground font-medium">{`${label}`}</p>
          <p className="text-sm text-primary">
            {`Atual: ${payload[0].value}`}
          </p>
          {payload[1] && (
            <p className="text-sm text-muted-foreground">
              {`Anterior: ${payload[1].value}`}
            </p>
          )}
        </div>
      );
    }
    return null;
  };

  const isLineChart = type === 'line';

  return (
    <Card className={`bg-gradient-to-br from-card to-secondary/10 border border-border/50 ${className}`}>
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-foreground">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            {isLineChart ? (
              <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                <XAxis 
                  dataKey="name" 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <YAxis 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <Tooltip content={<CustomTooltip />} />
                <Line 
                  dataKey="value" 
                  fill="hsl(var(--primary))"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                />
                {data[0]?.previous !== undefined && (
                  <Line 
                    dataKey="previous" 
                    fill="hsl(var(--muted))"
                    stroke="hsl(var(--muted-foreground))"
                    strokeWidth={2}
                    opacity={0.6}
                  />
                )}
              </LineChart>
            ) : (
              <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                <XAxis 
                  dataKey="name" 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <YAxis 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar 
                  dataKey="value" 
                  fill="hsl(var(--primary))"
                  radius={[4, 4, 0, 0]}
                  cursor={onBarClick ? "pointer" : "default"}
                  onClick={onBarClick ? (data: any) => onBarClick(data.payload) : undefined}
                />
                {data[0]?.previous !== undefined && (
                  <Bar 
                    dataKey="previous" 
                    fill="hsl(var(--muted))"
                    opacity={0.6}
                    radius={[4, 4, 0, 0]}
                  />
                )}
              </BarChart>
            )}
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}