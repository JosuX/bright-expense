"use client";

import { useState, useEffect } from "react";
import FloatingButton from "@/components/internal/FloatingButton";
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
import ExpenseItem from "@/components/internal/expenses/ExpenseItem";
import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination";

export interface expense {
	id: number;
	label: string;
	date: Date;
	price: number;
}

const Page = () => {
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
			} else if (event.key === "ArrowRight" && !(currentDate.toLocaleDateString() == new Date().toLocaleDateString())) {
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

	const content = data?.pages.map((page) =>
		page.day.map((expense: expense, index: number) => (
			<ExpenseItem
				expense={expense}
				key={expense.id}
				refetch={refetch}
			/>
		))
	);

	return (
		<div className="flex flex-col items-center justify-center gap-3 mx-8">
			<div className="flex items-center self-start justify-start mt-8 mb-4 gap-3.5">
				<FaCoins size={20} />
				<span className="text-xl font-extrabold">
					Expense Tracker
				</span>
			</div>
			<Header
				daySum={data?.pages[0].daySum}
				monthly={data?.pages[0].month}
				currDate={currentDate}
			/>
			<h2 className="self-start font-semibold text-base mt-5">
				All Expenses
			</h2>
			<Card
				className="rounded-xl overflow-hidden w-full"
			>
				<Table className="bg-[#171717]">
					<TableHeader>
						<TableRow>
							<TableHead>Label</TableHead>
							<TableHead>Date</TableHead>
							<TableHead>Price</TableHead>
							<TableHead />
						</TableRow>
					</TableHeader>
					<TableBody className="bg-white">
						{Number(content) != 0 ? (
							content
						) : (
							<TableCell colSpan={4} className="font-medium text-center justify-center items-center">
								It looks like you haven't added any expenses
							</TableCell>
						)}
					</TableBody>
				</Table>
				<FloatingButton refetch={refetch} />
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
									{currentDate.getMonth() +
										1}
									/{currentDate.getDate()}
								</PaginationLink>
							</PaginationItem>
							<PaginationItem hidden={currentDate.toLocaleDateString() == new Date().toLocaleDateString()}>
								<PaginationNext
									onClick={currentDate.toLocaleDateString() == new Date().toLocaleDateString() ? null : handleNextDay}
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
