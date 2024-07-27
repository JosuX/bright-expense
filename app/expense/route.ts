"use server"

import { addExpense, getDailyExpense, getMonthlyExpense, getSumDailyExpense } from "@/db/expense";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
	const params = req.nextUrl.searchParams
	const day = await getDailyExpense(new Date(params.get("d")), parseInt(params.get("p")), 10)
	const month = await getMonthlyExpense(new Date(params.get("d")))
	const daySum = await getSumDailyExpense(new Date(params.get("d")))
	return Response.json({day: day, month: month, daySum: daySum._sum.price});
}

export async function POST(req: Request) {
	const data = await req.json();
	const result = await addExpense(data)
	return Response.json(result);
}