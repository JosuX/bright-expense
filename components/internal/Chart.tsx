"use client";

import { useMemo } from "react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";
import { Card } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import expense from "@/types";
import { useExpenseStore } from "@/stores/expenseStore";
import { useShallow } from "zustand/react/shallow";

const chartConfig = {
  price: {
    label: "Price",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

const getDaysInMonth = (month, year) => {
  return new Date(year, month, 0).getDate();
};

export function Chart({ currDate }: { currDate: Date }) {
  
  const { monthly } = useExpenseStore(
		useShallow((state) => ({ ...state })),
	)
    const firstDate = new Date(currDate);
    const month = firstDate.getUTCMonth() + 1;
    const year = firstDate.getUTCFullYear();
    const daysInMonth = getDaysInMonth(month, year);

    const today = new Date();
    const todayMonth = today.getUTCMonth() + 1;
    const todayYear = today.getUTCFullYear();
    const todayDate = today.getUTCDate();

    const adjustedDaysInMonth = (todayMonth === month && todayYear === year) ? todayDate + 1 : daysInMonth;
  
    const parsed = useMemo(() => {
      let parsedData = Array.from({ length: adjustedDaysInMonth }, (_, index) => {
        const day = index + 1;
        return { date: `${month}/${day}`, price: 0 };
      });
  
      monthly?.forEach((expense) => {
        const date = new Date(expense.date);
        const day = date.getUTCDate();
        if (day <= adjustedDaysInMonth) { 
          parsedData[day - 1].price += Number(expense.price);
        }
      });
  
      return parsedData;
    }, [monthly, month, year, adjustedDaysInMonth]); 
  
    return (
      <Card className="bg-white">
        <ChartContainer config={chartConfig}>
        <LineChart
            accessibilityLayer
            data={parsed}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={true}
              axisLine={true}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 6)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
                        <Line
              dataKey="price"
              type="linear"
              stroke="#4A3AFF"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </Card>
    );
  }
