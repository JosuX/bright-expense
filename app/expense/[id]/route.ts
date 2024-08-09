"use server";

import { deleteExpense } from "@/db/expense";
import { NextRequest } from "next/server";

export async function DELETE(
	req: NextRequest,
	{
		params,
	}: {
		params: { id: string };
	}
) {
	const deletedExpense = await deleteExpense(parseInt(params.id));
	return Response.json(deletedExpense);
}
