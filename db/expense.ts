"use server";

import prisma from "@/db/client";

const addExpense = async (data: {
	label: string;
	date: string;
	price: number;
}) =>
	await prisma.expense.create({
		data: data,
	});

const getAllExpense = async () =>
	await prisma.expense.findMany();

const editExpense = async (id: number, data: any) =>
	await prisma.expense.update({
		where: {
			id: id,
		},
		data: data,
	});

const deleteExpense = async (id: number) =>
	await prisma.expense.delete({
		where: {
			id: id,
		},
	});

export {
	addExpense,
	getAllExpense,
	editExpense,
	deleteExpense,
};
