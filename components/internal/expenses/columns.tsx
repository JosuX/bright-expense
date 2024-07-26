"use client"

import { ColumnDef } from "@tanstack/react-table"

export type Expense = {
  id: string
  label: string
  date: string
  price: number
}

export const columns: ColumnDef<Expense>[] = [
  {
    accessorKey: "label",
    header: "Label",
  },
  {
    accessorKey: "date",
    header: "date",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
]
