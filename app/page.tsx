"use client";

import { useState, useEffect, useMemo } from "react";
import { ThreeDots } from "react-loader-spinner";
import { useShallow } from "zustand/react/shallow";
import FloatingButton from "@/components/internal/AddButton";
import Header from "@/components/internal/Header";
import { Card } from "@/components/ui/card";
import { FaCoins } from "react-icons/fa";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
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
import { useExpenseStore } from "@/stores/expenseStore";
import { format } from "date-fns";

const Page = () => {
	const [currentDate, setCurrentDate] = useState(
		new Date()
	);
	const {
		daily,
		setDaily,
		setMonthly,
		setRefresh,
	} = useExpenseStore(
		useShallow((state) => ({
			daily: state.daily,
			setDaily: state.setDaily,
			setMonthly: state.setMonthly,
			setRefresh: state.setRefresh,
		}))
	);

	useEffect(() => {
		const handleKeyDown = (event) => {
			if (event.key === "ArrowLeft") {
				handlePreviousDay();
			} else if (
				event.key === "ArrowRight" &&
				currentDate.toLocaleDateString() !==
					new Date().toLocaleDateString()
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

	const queryClient = useQueryClient();

	const fetchExpenses = async ({ pageParam = 1, queryKey }) => {
		const date = queryKey[1];
		const res = await fetch(`/expense?p=${pageParam}&d=${date}`);
		if (!res.ok) {
			throw new Error("Network response was not ok");
		}
		return res.json();
	};

	const memoizedFetchExpenses = useMemo(() => fetchExpenses, []);

	const {
		data,
		status,
		fetchNextPage,
		isFetchingNextPage,
		hasNextPage,
		refetch,
	} = useInfiniteQuery({
		queryKey: [
			"expenses",
			currentDate.toISOString().split("T")[0],
		],
		queryFn: memoizedFetchExpenses,
		initialPageParam: 1,
		getNextPageParam: (lastPage, allPages) =>
			lastPage.length ? allPages.length + 1 : undefined,
		enabled: !queryClient.getQueryData([
			"expenses",
			currentDate.toISOString().split("T")[0],
		]),
	});

	useEffect(() => {
		if (data?.pages) {
			const firstPage = data.pages[0];
			if (firstPage) {
				setDaily(firstPage.day, firstPage.daySum);
				setMonthly(firstPage.month);
			}
		}
		setRefresh(refetch);
	}, [data, setDaily, setMonthly, setRefresh]);

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

	const content = daily?.map((expenseItem) => (
		<ExpenseItem
			expense={expenseItem}
			key={expenseItem.id}
		/>
	));

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
							{status === "pending" ? (
								<TableRow>
									<TableCell
										colSpan={4}
										className="font-medium text-center justify-center items-center"
									>
										<ThreeDots
											visible={true}
											height="200"
											width="200"
											radius="50"
											color="#171717"
											ariaLabel="three-dots-loading"
											wrapperClass="text-center justify-center items-center"
										/>
									</TableCell>
								</TableRow>
							) : daily?.length === 0 ||
							  daily === undefined ? (
								<TableRow>
									<TableCell
										colSpan={4}
										className="font-medium text-center justify-center items-center"
									>
										It looks like you
										haven't added any
										expenses
									</TableCell>
								</TableRow>
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
									currentDate.toLocaleDateString() ===
									new Date().toLocaleDateString()
								}
							>
								<PaginationNext
									onClick={handleNextDay}
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
