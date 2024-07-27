import expense from "@/types";
import { TableCell, TableRow } from "@/components/ui/table";
import React from "react";
import ContextMenu from "./ContextMenu";

const ExpenseItem = ({
	expense,
}: {
	expense: expense;
}) => {
	expense.date = new Date(expense.date);
	expense.date.setDate(expense.date.getDate() - 1);
	const options: Intl.DateTimeFormatOptions = {
		day: "2-digit",
		month: "short",
		year: "numeric",
	};

	return (
		<TableRow>
			<TableCell className="w-4/12">
				{expense.label}
			</TableCell>
			<TableCell className="w-3/12">
				{expense.date.toLocaleDateString(
					undefined,
					options
				)}
			</TableCell>
			<TableCell className="text-end">{`₱${new Intl.NumberFormat(
				"en-US",
				{
					minimumFractionDigits: 2,
					maximumFractionDigits: 2,
				}
			).format(expense.price)}`}</TableCell>
			<TableCell className="text-right w-1">
				<ContextMenu
					expense={expense}
				/>
			</TableCell>
		</TableRow>
	);
};

export default ExpenseItem;
