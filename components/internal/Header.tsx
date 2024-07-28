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
import { Chart } from "./Chart";
import { useExpenseStore } from "@/stores/expenseStore";
import { useShallow } from "zustand/react/shallow";

const Header = ({ currDate }: { currDate: Date }) => {
	const [isOpen, setIsOpen] = useState(false);
	const { daySum } = useExpenseStore(
		useShallow((state) => ({ ...state }))
	);

	return (
		<Collapsible
			open={isOpen}
			onOpenChange={setIsOpen}
			className="text-white bg-[#171717] rounded-xl py-6 px-7 w-full"
			onClick={() => setIsOpen(!isOpen)}
		>
			<CollapsibleTrigger asChild>
				<div className="flex flex-row justify-between items-center">
					<div className="flex flex-col text-start">
						<span className="font-semibold text-xl">
							{`₱${new Intl.NumberFormat(
								"en-US",
								{
									minimumFractionDigits: 2,
									maximumFractionDigits: 2,
								}
							).format(daySum ?? 0)}`}
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
				<Chart currDate={currDate} />
			</CollapsibleContent>
		</Collapsible>
	);
};

export default Header;
