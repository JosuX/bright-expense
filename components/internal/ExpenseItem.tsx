"use client"

import expense from "@/types";
import { format } from "date-fns";
import { TableCell, TableRow } from "@/components/ui/table";
import React from "react";
import ContextMenu from "./ContextMenu";

interface ExpenseItemProps {
    className?: string;
    expense: expense;
}

const ExpenseItem = ({ expense, className }: ExpenseItemProps) => {
    const date = new Date(expense.date);
    date.setDate(date.getDate() - 1);
	className = className === undefined ? "" : className
	return (
		<TableRow className={className}>
			<TableCell className="w-4/12">
				{expense.label}
			</TableCell>
			<TableCell className="w-3/12">
				{format(date, "d MMM yyyy")}
			</TableCell>
			<TableCell className="text-end">{`₱${new Intl.NumberFormat(
				"en-US",
				{
					minimumFractionDigits: 2,
					maximumFractionDigits: 2,
				}
			).format(expense.price)}`}</TableCell>
			<TableCell className="text-right w-1">
				<ContextMenu expense={expense} />
			</TableCell>
		</TableRow>
	);
};

export default ExpenseItem;
