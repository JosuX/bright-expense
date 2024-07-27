import expense from "@/types";
import { create } from "zustand";

interface ExpenseState {
	daily: expense[];
	daySum: number;
	monthly: expense[];
    setDaily: (data: expense[], sum: number) => void,
    setMonthly: (data: expense[]) => void
}

export const useExpenseStore = create<ExpenseState>()(
	(set) => ({
		daily: [],
		daySum: 0,
		monthly: [],
		setDaily: (data, sum) =>
			set(() => ({ daily: data, daySum: sum })),
		setMonthly: (data) =>
			set(() => ({ monthly: data })),
	})
);
