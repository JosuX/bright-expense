"use client";
import {
	IoIosArrowDown,
	IoIosArrowUp,
} from "react-icons/io";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useState } from "react";
import { Chart } from "./expenses/chart";

const Header = () => {
	const [isOpen, setIsOpen] = useState(false);
	return (
		<Collapsible
			open={isOpen}
			onOpenChange={setIsOpen}
			className="text-white bg-[#171717] rounded-2xl py-6 px-7 w-[300px]"
		>
			<CollapsibleTrigger asChild>
				<div className="flex flex-row justify-between items-center">
					<div className="flex flex-col text-start">
						<span className="font-semibold text-xl">
							₱ 900.50
						</span>
						<span className="font-medium text-xs">
							Total Expenses
						</span>
					</div>
					{isOpen ? (
						<IoIosArrowDown size={20} />
					) : (
						<IoIosArrowUp size={20} />
					)}
				</div>
			</CollapsibleTrigger>
			<CollapsibleContent className="mt-7">
				<Chart/>
			</CollapsibleContent>
		</Collapsible>
	);
};

export default Header;
