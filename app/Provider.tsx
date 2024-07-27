"use client"

import { Inter } from "next/font/google";
import "./globals.css";
import {
	QueryClient,
	QueryClientProvider,
} from "@tanstack/react-query";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

const queryClient = new QueryClient();

export default function Provider({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<QueryClientProvider client={queryClient}>
			<body className={inter.className}>
				{children}
				<Toaster position="bottom-left" />
			</body>
		</QueryClientProvider>
	);
}
