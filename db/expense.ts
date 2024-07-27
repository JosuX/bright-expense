"use server";

import prisma from "@/db/client";
import { startOfDay, endOfDay, startOfMonth, endOfMonth } from 'date-fns';

const addExpense = async (data: {
	label: string;
	date: Date; // Change the type to Date
	price: number;
}) =>
	await prisma.expense.create({
		data: data,
	});

const getMonthlyExpense = async (date: Date) => {
	const startDate = startOfMonth(date);
	const endDate = endOfMonth(date);

	return await prisma.expense.findMany({
		where: {
			date: {
				gte: startDate,
				lte: endDate,
			},
		},
	});
};

const getDailyExpense = async (date: Date, page: number, pageSize: number) => {
	const startDate = startOfDay(date);
	const endDate = endOfDay(date);

	return await prisma.expense.findMany({
		where: {
			date: {
				gte: startDate,
				lte: endDate,
			},
		},
		skip: (page - 1) * pageSize,
		take: pageSize,
	});
};

const getSumDailyExpense = async (date: Date) => {
	const startDate = startOfDay(date);
	const endDate = endOfDay(date);

	return await prisma.expense.aggregate({
		_sum:{
			price: true
		},
		where: {
			date: {
				gte: startDate,
				lte: endDate,
			},
		},
	});
};

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
	getDailyExpense,
	editExpense,
	deleteExpense,
	getMonthlyExpense,
	getSumDailyExpense
};
