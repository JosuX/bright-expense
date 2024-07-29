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
	const { daySum, daily } = useExpenseStore(
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
					{!isOpen ? (
						<IoIosArrowDown size={20} />
					) : (
						<IoIosArrowUp size={20} />
					)}
				</div>
			</CollapsibleTrigger>
			<CollapsibleContent className="mt-7 md:h-[53.7vh]">
				<Chart currDate={currDate} />
				<div className="hidden pt-6 md:grid md:grid-cols-2 md:gap-6 text-md font-medium">
					<p>
						Highest Expense:<br/>₱{new Intl.NumberFormat("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(Math.max(...daily.map(item => item.price)))} {/* Placeholder value */}
					</p>
					<p>
						Lowest Expense:<br/>₱{new Intl.NumberFormat("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(Math.min(...daily.map(item => item.price)))} {/* Placeholder value */}
					</p>
					<p>
						Average Expense Per Transaction:<br/>₱{new Intl.NumberFormat("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format((daySum / daily.length))}
					</p>
					<p>
						Number of Transactions:<br/>{daily.length}
					</p>
				</div>
			</CollapsibleContent>
		</Collapsible>
	);
};

export default Header;
