"use client"

import { TrendingUp } from "lucide-react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import {
  Card
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
const chartData = [
  { month: "January", desktop: 186 },
  { month: "February", desktop: 305 },
  { month: "March", desktop: 237 },
  { month: "April", desktop: 73 },
  { month: "May", desktop: 209 },
  { month: "June", desktop: 214 },
  { month: "January", desktop: 186 },
  { month: "February", desktop: 305 },
  { month: "March", desktop: 237 },
  { month: "April", desktop: 73 },
  { month: "May", desktop: 209 },
  { month: "June", desktop: 214 },
  { month: "January", desktop: 186 },
  { month: "February", desktop: 305 },
  { month: "March", desktop: 237 },
  { month: "April", desktop: 73 },
  { month: "May", desktop: 209 },
  { month: "June", desktop: 214 },
]

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

export function Chart() {
  return (
    <Card className="bg-white">
        <ChartContainer config={chartConfig}>
    <AreaChart
      accessibilityLayer
      data={chartData}
    >
      <CartesianGrid vertical={false} />
      <XAxis
        dataKey="month"
        tickLine={true}
        axisLine={true}
        tickMargin={8}
        tickFormatter={(value) => value.slice(0, 3)}
      />
      <ChartTooltip
        cursor={false}
        content={<ChartTooltipContent indicator="line" />}
      />
      <Area
        dataKey="desktop"
        type="natural"
        fill="#4A3AFF"
        fillOpacity={0.5}
        stroke="#4A3AFF"
      />
    </AreaChart>
  </ChartContainer>
    </Card>
  )
}
