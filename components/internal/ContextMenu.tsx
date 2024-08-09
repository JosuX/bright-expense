"use client";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { HiDotsVertical } from "react-icons/hi";
import { toast } from "sonner";
import { useExpenseStore } from "@/stores/expenseStore";
import { useShallow } from "zustand/react/shallow";
import expense from "@/types";

const ContextMenu = ({ expense }: { expense: expense }) => {
	const { refresh } = useExpenseStore(useShallow((state) => ({ ...state })));
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
			if (refresh !== null) {
				refresh();
			}
		} catch (error) {
			console.error("Error deleting expense:", error);
			toast.error("An error occurred while deleting the expense.");
		}
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger>
				<HiDotsVertical size={20} />
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuItem onSelect={handleDelete}>
					Delete
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default ContextMenu;
