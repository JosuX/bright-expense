"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { RxCalendar } from "react-icons/rx";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { DialogFooter } from "@/components/ui/dialog";
import CurrencyInput from "react-currency-input-field";
import { cn } from "@/lib/utils";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { toast } from "sonner";
import { useExpenseStore } from "@/stores/expenseStore";
import { useShallow } from "zustand/react/shallow";
import { Dispatch, SetStateAction } from "react";

const FormSchema = z.object({
	label: z.string().min(2, {
		message: "Label must be at least 2 characters.",
	}),
	price: z
		.string()
		.transform((value) =>
			parseFloat(value.replace(/[^\d]/g, ""))
		)
		.pipe(
			z
				.number()
				.positive("Price must be a positive value.")
		),
	date: z.date({
		required_error: "A date of expense is required.",
	}),
});

export function FormModal({
	setOpen,
}: {
	setOpen: Dispatch<SetStateAction<boolean>>;
}) {
	const { refresh } = useExpenseStore(
		useShallow((state) => ({ ...state }))
	);
	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			label: "",
		},
	});

	async function onSubmit(
		data: z.infer<typeof FormSchema>
	) {
		let parsed_data = data;
		parsed_data.date = new Date(
			data.date.toISOString()
		);
		await fetch("/expense", {
			method: "POST",
			body: JSON.stringify(parsed_data),
		});
		refresh();
		setOpen(false);
		toast.success(
			"An expense has been successfully added."
		);
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="flex flex-col gap-4"
			>
				<FormField
					control={form.control}
					name="label"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Label</FormLabel>
							<FormControl>
								<Input
									{...field}
									placeholder="Enter a label"
									type="string"
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="date"
					render={({ field }) => (
						<FormItem className="flex flex-col">
							<FormLabel>Date</FormLabel>
							<Popover>
								<PopoverTrigger asChild>
									<FormControl>
										<Button
											variant={
												"outline"
											}
											className={cn(
												"pl-3 text-left font-normal",
												!field.value &&
													"text-muted-foreground"
											)}
										>
											{field.value ? (
												format(
													field.value,
													"PPP"
												)
											) : (
												<span>
													Pick a
													date
												</span>
											)}
											<RxCalendar className="ml-auto h-4 w-4 opacity-50" />
										</Button>
									</FormControl>
								</PopoverTrigger>
								<PopoverContent
									className="w-auto p-0"
									align="start"
								>
									<Calendar
										mode="single"
										selected={
											field.value
										}
										onSelect={
											field.onChange
										}
										disabled={(date) =>
											date >
												new Date() ||
											date <
												new Date(
													"1900-01-01"
												)
										}
										initialFocus
									/>
								</PopoverContent>
							</Popover>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="price"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Price</FormLabel>
							<FormControl>
								<CurrencyInput
									name={field.name}
									placeholder="Enter a price"
									onChange={
										field.onChange
									}
									onBlur={field.onBlur}
									ref={field.ref}
									className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
									decimalsLimit={2}
									prefix="₱"
									allowNegativeValue={
										false
									}
									// onValueChange={(
									// 	value,
									// 	name,
									// 	values
									// ) =>
									// 	console.log(
									// 		value,
									// 		name,
									// 		values
									// 	)
									// }
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<DialogFooter>
					<Button type="submit">Submit</Button>
				</DialogFooter>
			</form>
		</Form>
	);
}
