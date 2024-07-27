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
import { FormModal } from "./expenses/FormModal";
import { useState } from "react";

const FloatingButton = ({refetch}) => {
	const [open, setOpen] = useState(false);
	return (
		<div className="flex justify-end mx-4 my-3">
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

					<FormModal setOpen={setOpen} refetch={refetch} />
				</DialogContent>
			</Dialog>
		</div>
	);
};

export default FloatingButton;
