"use server";

import { deleteExpense, editExpense } from "@/db/expense";

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

export async function PUT(
	req: Request,
	{
		params,
	}: {
		params: { id: string };
	}
) {
	const data = await req.json();
	const editedExpense = editExpense(
		parseInt(params.id),
		data
	);
	return Response.json(editedExpense);
}
