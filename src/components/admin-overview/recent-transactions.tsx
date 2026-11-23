import Link from "next/link";
import type { TransactionPayload } from "@/lib/types";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

function formatDate(value: Date | string) {
    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? "—" : date.toLocaleDateString();
}

export default function RecentTransactions({
    transactions,
}: {
    transactions: TransactionPayload[];
}) {
    return (
        <section className="rounded-lg border-(--wp-line) bg-white p-4 sm:p-5">
            <div className="mb-4 flex items-center justify-between">
                <div>
                    <h2 className="font-(--font-heading) text-2xl">
                        Recent transactions
                    </h2>
                    <p className="mt-1 text-xs text-(--wp-ink-soft)">
                        {transactions.length} total transactions
                    </p>
                </div>
                <Link
                    href="/dashboard/admin/transactions"
                    className="text-xs text-plum hover:underline"
                >
                    View all
                </Link>
            </div>
            {transactions.length === 0 ? (
                <p className="py-6 text-center text-sm text-(--wp-ink-soft)">
                    No transactions yet.
                </p>
            ) : (
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Vendor</TableHead>
                            <TableHead>Plan</TableHead>
                            <TableHead>Amount</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Date</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {transactions.slice(0, 5).map((transaction) => (
                            <TableRow key={transaction._id}>
                                <TableCell className="font-medium">
                                    {transaction.vendorName ||
                                        transaction.vendorEmail ||
                                        "Vendor"}
                                </TableCell>
                                <TableCell>{transaction.plan}</TableCell>
                                <TableCell>
                                    {transaction.amount?.toFixed(2) ?? "0.00"}{" "}
                                    {transaction.currency?.toUpperCase()}
                                </TableCell>
                                <TableCell className="capitalize">
                                    {transaction.status}
                                </TableCell>
                                <TableCell>
                                    {formatDate(
                                        transaction.paidAt ||
                                            transaction.createdAt,
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            )}
        </section>
    );
}
