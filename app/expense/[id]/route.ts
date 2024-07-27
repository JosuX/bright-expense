"use server";

import { deleteExpense } from "@/db/expense";

export async function DELETE(_, {
	params,
}: {
	params: { id: string };
}) {
	const deletedExpense = await deleteExpense(
		parseInt(params.id)
	);
	return Response.json(deletedExpense);
}