"use client";

import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import FilterBar, { type FilterControl } from "@/components/dashboard/FilterBar";
import type { Transaction } from "@/lib/types";
import { cn } from "@/lib/utils";

function formatDate(value?: string | Date) {
    if (!value) return "—";
    const date = value instanceof Date ? value : new Date(value);
    if (Number.isNaN(date.getTime())) return "—";
    return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });
}

export default function AdminTransactionsView({
    transactions,
    onExport,
}: {
    transactions: Transaction[];
    onExport?: () => void;
}) {
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("all");

    const visible = useMemo(() => {
        const normalized = search.trim().toLowerCase();
        return transactions.filter((transaction) => {
            const paymentStatus =
                transaction.payment_status || transaction.status || "unknown";
            const matchesSearch =
                !normalized ||
                transaction.customer_email?.toLowerCase().includes(normalized) ||
                transaction.userId?.toLowerCase().includes(normalized) ||
                transaction.sessionId?.toLowerCase().includes(normalized) ||
                transaction._id?.toLowerCase().includes(normalized);
            const matchesStatus =
                status === "all" || paymentStatus.toLowerCase() === status;
            return matchesSearch && matchesStatus;
        });
    }, [search, status, transactions]);

    const paidCount = transactions.filter(
        (transaction) =>
            (transaction.payment_status || transaction.status)?.toLowerCase() === "paid" ||
            (transaction.payment_status || transaction.status)?.toLowerCase() === "complete",
    ).length;

    const filters: FilterControl[] = [
        {
            key: "status",
            label: "Filter by payment status",
            value: status,
            onChange: setStatus,
            options: [
                { value: "all", label: "All payment statuses" },
                { value: "paid", label: "Paid" },
                { value: "complete", label: "Successful" },
                { value: "pending", label: "Pending" },
                { value: "failed", label: "Failed" },
            ],
        },
    ];

    return (
        <div className="mx-auto max-w-7xl">
            <header className="flex items-start justify-between gap-4">
                <div>
                    <h1 className="font-heading text-4xl font-medium">Transactions</h1>
                    <p className="mt-2 text-sm text-muted-foreground">
                        Subscription payments, all in one place.
                    </p>
                </div>
                <Button type="button" onClick={onExport}>
                    Export report
                </Button>
            </header>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
                <div className="rounded-xl border border-border bg-card p-6">
                    <p className="text-xs text-muted-foreground">All transactions</p>
                    <p className="mt-3 text-3xl font-medium">{transactions.length}</p>
                </div>
                <div className="rounded-xl border border-border bg-card p-6">
                    <p className="text-xs text-muted-foreground">Successful payments</p>
                    <p className="mt-3 text-3xl font-medium">{paidCount}</p>
                </div>
                <div className="rounded-xl border border-border bg-card p-6">
                    <p className="text-xs text-muted-foreground">Transaction IDs</p>
                    <p className="mt-3 text-3xl font-medium">{visible.length}</p>
                </div>
            </div>

            <div className="mt-6">
                <FilterBar
                    search={search}
                    onSearchChange={setSearch}
                    searchPlaceholder="Search vendor or transaction ID"
                    filters={filters}
                />
            </div>

            <div className="mt-4 max-h-150 overflow-y-auto rounded-xl border border-border bg-card">
                <table className="w-full caption-bottom text-sm">
                    <thead className="sticky top-0 z-10 border-b bg-muted/40">
                        <tr>
                            <th className="h-10 px-5 text-left text-[9px] uppercase text-muted-foreground">Vendor</th>
                            <th className="px-2 text-left text-[9px] uppercase text-muted-foreground">Plan</th>
                            <th className="px-2 text-left text-[9px] uppercase text-muted-foreground">Amount</th>
                            <th className="px-2 text-left text-[9px] uppercase text-muted-foreground">Status</th>
                            <th className="px-2 text-left text-[9px] uppercase text-muted-foreground">Date</th>
                            <th className="px-2 text-left text-[9px] uppercase text-muted-foreground">Transaction ID</th>
                        </tr>
                    </thead>
                    <tbody>
                        {visible.map((transaction) => {
                            const paymentStatus =
                                transaction.payment_status || transaction.status || "unknown";
                            const paid =
                                paymentStatus.toLowerCase() === "paid" ||
                                paymentStatus.toLowerCase() === "complete";
                            return (
                                <tr key={transaction._id} className="h-16 border-b last:border-b-0">
                                    <td className="px-5">
                                        <p className="text-sm font-medium">
                                            {transaction.customer_email || transaction.userId || "Vendor"}
                                        </p>
                                    </td>
                                    <td className="px-2 text-xs">Premium</td>
                                    <td className="px-2 text-xs">—</td>
                                    <td className="px-2">
                                        <Badge
                                            className={cn(
                                                paid
                                                    ? "bg-success/10 text-success"
                                                    : "bg-warning/10 text-warning",
                                            )}
                                        >
                                            {paymentStatus}
                                        </Badge>
                                    </td>
                                    <td className="px-2 text-xs text-muted-foreground">
                                        {formatDate(transaction.payment_date)}
                                    </td>
                                    <td className="px-2 text-xs text-muted-foreground">
                                        {transaction.payment_intent || transaction.sessionId || transaction._id}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {visible.length === 0 && (
                <p className="mt-4 text-center text-xs text-muted-foreground">
                    No transactions match these filters.
                </p>
            )}

            <div className="mt-5 flex justify-end gap-2">
                <Button type="button" variant="outline" disabled>Previous</Button>
                <Button type="button" variant="outline" disabled>Next</Button>
            </div>
        </div>
    );
}
