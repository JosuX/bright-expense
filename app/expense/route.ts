"use server"

import { addExpense, getAllExpense } from "@/db/expense";

export async function GET() {
	const expenses = await getAllExpense()
	return Response.json(expenses);
}

export async function POST(req: Request) {
	const data = await req.json();
	const result = await addExpense(data)
	return Response.json(result);
}