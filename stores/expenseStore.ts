import expense from "@/types";
import {
	InfiniteData,
	QueryObserverResult,
	RefetchOptions,
} from "@tanstack/react-query";
import { create } from "zustand";

interface ExpenseState {
	daily: expense[];
	daySum: number;
	monthly: expense[];
	refresh: (
		options?: RefetchOptions
	) => Promise<
		QueryObserverResult<
			InfiniteData<any, unknown>,
			Error
		>
	>;
	setDaily: (data: expense[], sum: number) => void;
	setMonthly: (data: expense[]) => void;
	setRefresh: (
		fn: (
			options?: RefetchOptions
		) => Promise<
			QueryObserverResult<
				InfiniteData<any, unknown>,
				Error
			>
		>
	) => void;
}

export const useExpenseStore = create<ExpenseState>()(
	(set) => ({
		daily: [],
		daySum: 0,
		monthly: [],
		refresh: null,
		setRefresh: (fn) => set(() => ({ refresh: fn })),
		setDaily: (data, sum) =>
			set(() => ({ daily: data, daySum: sum })),
		setMonthly: (data) =>
			set(() => ({ monthly: data }))
	})
);
