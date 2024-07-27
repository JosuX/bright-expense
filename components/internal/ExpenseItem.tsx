import { expense } from "@/app/page";
import { TableCell, TableRow } from "@/components/ui/table";
import React from "react";
import ContextMenu from "./ContextMenu";

const ExpenseItem = ({ expense, refetch }: { expense: expense, refetch: any }) => {
    const options: Intl.DateTimeFormatOptions = {
        day: "2-digit",
        month: "short",
        year: "numeric",
    };



    return (
        <TableRow>
            <TableCell className="w-4/12">{expense.label}</TableCell>
            <TableCell className="w-3/12">
                {expense.date.toLocaleDateString(
                    undefined,
                    options
                )}
            </TableCell>
            <TableCell className="text-end">{`₱${new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(expense.price)}`}</TableCell>
            <TableCell className="text-right w-1">
                <ContextMenu expense={expense} refetch={refetch}/>
            </TableCell>
        </TableRow>
    );
};

export default ExpenseItem;
