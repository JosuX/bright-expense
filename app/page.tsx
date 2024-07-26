"use client";

import { useEffect, useState } from "react";
import { addExpense, getAllExpense, editExpense, deleteExpense } from "@/db/expense";
import FloatingButton from "@/components/internal/FloatingButton";
import Header from "@/components/internal/Header";
import { Card } from "@/components/ui/card";
import { FaCoins } from "react-icons/fa";

const Page = () => {
	const [expenses, setExpenses] = useState([]);

	useEffect(() => {
		const fetchExpenses = async () => {
			const allExpenses = await getAllExpense();
			console.log(allExpenses)
			setExpenses(allExpenses);
		};

		fetchExpenses();
	}, []);

	return (
		<div className="flex flex-col items-center justify-center gap-3 mx-8">
			<div className="flex items-center self-start justify-start mt-8 mb-6 gap-3.5">
				<FaCoins size={20} />
				<span className="text-xl font-extrabold">
					Expense Tracker
				</span>
			</div>
			<Header/>
			<h2 className="self-start font-semibold text-sm">All Expenses</h2>
			<Card>
				{expenses.length > 0 ? (
					expenses.map(expense => (
							<p>{expense.price}</p>
					))
				) : (
					<p>No expenses found.</p>
				)}
				<FloatingButton />
			</Card>
		</div>
	);
};

export default Page;
