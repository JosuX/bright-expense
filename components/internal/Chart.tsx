"use client";

import { useMemo } from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import { Card } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { expense } from "@/app/page";

const chartConfig = {
  price: {
    label: "Price",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

const getDaysInMonth = (month, year) => {
  return new Date(year, month, 0).getDate();
};

export function Chart({ monthly, currDate }: { monthly: expense[], currDate: Date }) {
  
    const firstDate = new Date(currDate);
    const month = firstDate.getUTCMonth() + 1;
    const year = firstDate.getUTCFullYear();
    const daysInMonth = getDaysInMonth(month, year);
    
    // Get today's date
    const today = new Date();
    const todayMonth = today.getUTCMonth() + 1;
    const todayYear = today.getUTCFullYear();
    const todayDate = today.getUTCDate();
    
    // Adjust daysInMonth to today if we're still in the current month
    const adjustedDaysInMonth = (todayMonth === month && todayYear === year) ? todayDate : daysInMonth;
  
    const parsed = useMemo(() => {
      let parsedData = Array.from({ length: adjustedDaysInMonth }, (_, index) => {
        const day = index + 1;
        return { date: `${month}/${day}`, price: 0 };
      });
  
      monthly?.forEach((expense) => {
        const date = new Date(expense.date);
        const day = date.getUTCDate();
        if (day <= adjustedDaysInMonth) { // Only include expenses within the visible range
          parsedData[day - 1].price += Number(expense.price);
        }
      });
  
      return parsedData;
    }, [monthly, month, year, adjustedDaysInMonth]); // Depend on adjustedDaysInMonth
  
    return (
      <Card className="bg-white">
        <ChartContainer config={chartConfig}>
          <AreaChart accessibilityLayer data={parsed}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={true}
              axisLine={true}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 6)}
            />
            <ChartTooltip
              cursor={true}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Area
              dataKey="price"
              type="linear"
              fill="#4A3AFF"
              fillOpacity={0.5}
              stroke="#4A3AFF"
            />
          </AreaChart>
        </ChartContainer>
      </Card>
    );
  }
