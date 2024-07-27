import type { Metadata } from "next";
import Provider from "./Provider";

export const metadata: Metadata = {
	title: "Expense Tracker",
	description: "Developed and designed by Jofer Usa for Technical Assessment for Bright PH Job Application",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<Provider>{children}</Provider>
		</html>
	);
}
