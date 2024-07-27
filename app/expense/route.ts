"use server"

import { addExpense, getDailyExpense, getMonthlyExpense, getSumDailyExpense } from "@/db/expense";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
	const params = req.nextUrl.searchParams;
	const date = new Date(params.get("d") || Date.now());
	const day = await getDailyExpense(date, parseInt(params.get("p") || "10"), 10);
	const month = await getMonthlyExpense(date);
	const daySum = await getSumDailyExpense(date);
	return NextResponse.json({ day: day, month: month, daySum: daySum._sum.price });
}

export async function POST(req: NextRequest) {
	const data = await req.json();
	let parsed_date = new Date(data.date);
	parsed_date.setDate(parsed_date.getDate() + 1);
	const result = await addExpense({...data, date: parsed_date});
	return NextResponse.json(result);
}
