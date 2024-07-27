import { expense } from "@/app/page";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TableCell, TableRow } from "@/components/ui/table";
import React from "react";
import { HiDotsVertical } from "react-icons/hi";
import { toast } from "sonner";

const ExpenseItem = ({ expense, refetch }: { expense: expense, refetch: any }) => {
    expense.date = new Date(expense.date);
    const options: Intl.DateTimeFormatOptions = {
        day: "2-digit",
        month: "short",
        year: "numeric",
    };

    const handleEdit = async () => {
        try {
            const response = await fetch(`/expense/${expense.id}/`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    label: expense.label,
                    date: expense.date.toISOString(),
                    price: expense.price,
                }),
            });

            if (response.ok) {
                // Handle successful update (e.g., show a success message or refresh data)
                alert("Expense updated successfully!");
            } else {
                // Handle errors (e.g., show an error message)
                alert("Failed to update expense.");
            }
            refetch()
        } catch (error) {
            console.error("Error updating expense:", error);
            alert("An error occurred while updating the expense.");
        }
    };

    const handleDelete = async () => {
        try {
            const response = await fetch(`/expense/${expense.id}`, {
                method: "DELETE",
            });

            if (response.ok) {
                toast.success("Expense deleted successfully!");
            } else {
                toast.error("Failed to delete expense.");
            }
            refetch()
        } catch (error) {
            console.error("Error deleting expense:", error);
            toast.error("An error occurred while deleting the expense.");
        }
        
    };

    return (
        <TableRow>
            <TableCell>{expense.label}</TableCell>
            <TableCell>
                {expense.date.toLocaleDateString(
                    "en-GB",
                    options
                )}
            </TableCell>
            <TableCell>{`₱${new Intl.NumberFormat("en-US").format(expense.price)}`}</TableCell>
            <TableCell className="text-right">
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <HiDotsVertical size={20} />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem onSelect={handleEdit}>
                            Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onSelect={handleDelete}>
                            Delete
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </TableCell>
        </TableRow>
    );
};

export default ExpenseItem;
