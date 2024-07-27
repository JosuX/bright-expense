"use client";

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { TiPlus } from "react-icons/ti";
import { FormModal } from "./ExpenseModal";
import { useState } from "react";

const FloatingButton = () => {
	const [open, setOpen] = useState(false);
	return (
		<div className="mx-6 absolute bottom-14 right-0">
			<Dialog open={open} onOpenChange={setOpen}>
				<DialogTrigger asChild>
					<button
						type="button"
						className="bg-[#171717] flex items-center justify-center rounded-full h-[40px] w-[40px]"
					>
						<TiPlus color="white" size={20} />
					</button>
				</DialogTrigger>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>
							Add expense
						</DialogTitle>
						<DialogDescription>
							Click submit when you're done
						</DialogDescription>
					</DialogHeader>

					<FormModal setOpen={setOpen} />
				</DialogContent>
			</Dialog>
		</div>
	);
};

export default FloatingButton;
