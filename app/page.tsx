"use client";

import { useState, useEffect } from "react";
import { LineWave } from 'react-loader-spinner'
import { useShallow } from "zustand/react/shallow";
import FloatingButton from "@/components/internal/AddButton";
import Header from "@/components/internal/Header";
import { Card } from "@/components/ui/card";
import { FaCoins } from "react-icons/fa";
import { useInfiniteQuery } from "@tanstack/react-query";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import ExpenseItem from "@/components/internal/ExpenseItem";
import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination";
import expense from "@/types";
import { useExpenseStore } from "@/stores/expenseStore";
import { format } from "date-fns";

const Page = () => {
	const {
		daily,
		setDaily,
		setMonthly,
		setRefresh,
	} = useExpenseStore(
		useShallow((state) => ({ ...state }))
	);
	const today = new Date();
	const [currentDate, setCurrentDate] = useState(today);

	const fetchExpenses = async ({
		pageParam = 1,
		queryKey,
	}) => {
		const date = queryKey[1];
		const res = await fetch(
			`/expense?p=${pageParam}&d=${date}`
		);
		return res.json();
	};

	const {
		data,
		status,
		error,
		fetchNextPage,
		isFetchingNextPage,
		hasNextPage,
		refetch,
	} = useInfiniteQuery({
		queryKey: [
			"expenses",
			currentDate.toISOString().split("T")[0],
		],
		queryFn: fetchExpenses,
		initialPageParam: 1,
		getNextPageParam: (lastPage, allPages) => {
			const nextPage = lastPage.length
				? allPages.length + 1
				: undefined;
			return nextPage;
		},
	});

	setDaily(data?.pages[0].day, data?.pages[0].daySum);
	setMonthly(data?.pages[0].month);
	setRefresh(refetch);

	const handlePreviousDay = () => {
		const newDate = new Date(currentDate);
		newDate.setDate(currentDate.getDate() - 1);
		setCurrentDate(newDate);
	};

	const handleNextDay = () => {
		const newDate = new Date(currentDate);
		newDate.setDate(currentDate.getDate() + 1);
		setCurrentDate(newDate);
	};

	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === "ArrowLeft") {
				handlePreviousDay();
			} else if (
				event.key === "ArrowRight" &&
				!(
					currentDate.toLocaleDateString() ==
					new Date().toLocaleDateString()
				)
			) {
				handleNextDay();
			}
		};

		window.addEventListener("keydown", handleKeyDown);
		return () =>
			window.removeEventListener(
				"keydown",
				handleKeyDown
			);
	}, [currentDate]);

	console.log(daily);

	const content = daily?.map(
		(expense: expense, index: number) => (
			<ExpenseItem
				expense={expense}
				key={expense.id}
			/>
		)
	);

	return (
		<div className="flex flex-col items-center justify-center gap-3 mx-8">
			<div className="flex items-center self-start justify-start mt-8 mb-4 gap-3.5">
				<FaCoins size={20} />
				<span className="text-xl font-extrabold">
					Expense Tracker
				</span>
			</div>
			<Header currDate={currentDate} />
			<h2 className="self-start font-semibold text-base mt-5">
				All Expenses
			</h2>
			<Card className="rounded-xl overflow-hidden w-full relative">
				<Table className="bg-[#171717]">
					<TableHeader>
						<TableRow>
							<TableHead className="w-4/12">
								Label
							</TableHead>
							<TableHead className="w-3/12">
								Date
							</TableHead>
							<TableHead className="text-end">
								Price
							</TableHead>
							<TableHead className="!px-[26px] w-0" />
						</TableRow>
					</TableHeader>
				</Table>
				<div className="overflow-y-scroll min-h-40 max-h-[500px]">
					<Table className="bg-[#171717] relative">
						<TableBody className="bg-white">
							{daily?.length == 0 ||
							daily === undefined ? (
								status == "pending" ? (
									<LineWave
										visible={true}
										height="100"
										width="100"
										color="#171717"
										ariaLabel="line-wave-loading"
									/>
								) : (
									<TableRow>
										<TableCell
											colSpan={4}
											className="font-medium text-center justify-center items-center"
										>
											It looks like
											you haven't
											added any
											expenses
										</TableCell>
									</TableRow>
								)
							) : (
								content
							)}
						</TableBody>
					</Table>
				</div>
				<FloatingButton />

				<div className="bg-[#171717] h-10 text-white">
					<Pagination className="items-start justify-start">
						<PaginationContent className="items-start justify-start">
							<PaginationItem>
								<PaginationPrevious
									onClick={
										handlePreviousDay
									}
									className="hover:!bg-[#171717] hover:text-white text-white"
								/>
							</PaginationItem>
							<PaginationItem>
								<PaginationLink className="hover:!bg-[#171717] hover:text-white text-white">
									{format(
										currentDate,
										"M/d"
									)}
								</PaginationLink>
							</PaginationItem>
							<PaginationItem
								hidden={
									currentDate.toLocaleDateString() ==
									new Date().toLocaleDateString()
								}
							>
								<PaginationNext
									onClick={
										currentDate.toLocaleDateString() ==
										new Date().toLocaleDateString()
											? null
											: handleNextDay
									}
									className="hover:!bg-[#171717] hover:text-white text-white"
								/>
							</PaginationItem>
						</PaginationContent>
					</Pagination>
				</div>
			</Card>
		</div>
	);
};

export default Page;
