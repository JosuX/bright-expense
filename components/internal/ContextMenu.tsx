import React from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { HiDotsVertical } from 'react-icons/hi'
import { toast } from 'sonner';

const ContextMenu = ({expense, refetch}) => {

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
  )
}

export default ContextMenu