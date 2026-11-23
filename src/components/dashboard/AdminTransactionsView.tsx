"use client";

import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import FilterBar, {
    type FilterControl,
} from "@/components/dashboard/FilterBar";
import type { TransactionPayload } from "@/lib/types";
import { cn } from "@/lib/utils";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

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
    transactions: TransactionPayload[];
    onExport?: () => void;
}) {
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("all");

    const visible = useMemo(() => {
        const normalized = search.trim().toLowerCase();
        return transactions.filter((transaction) => {
            const paymentStatus = transaction.status || "unknown";
            const matchesSearch =
                !normalized ||
                transaction.vendorName?.toLowerCase().includes(normalized) ||
                transaction.vendorEmail?.toLowerCase().includes(normalized) ||
                transaction._id?.toLowerCase().includes(normalized);
            const matchesStatus =
                status === "all" || paymentStatus.toLowerCase() === status;
            return matchesSearch && matchesStatus;
        });
    }, [search, status, transactions]);

    const paidCount = transactions.filter(
        (transaction) =>
            transaction.status?.toLowerCase() === "paid" ||
            transaction.status?.toLowerCase() === "complete",
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
                    <h1 className="font-heading text-4xl font-medium">
                        Transactions
                    </h1>
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
                    <p className="text-xs text-muted-foreground">
                        All transactions
                    </p>
                    <p className="mt-3 text-3xl font-medium">
                        {transactions.length}
                    </p>
                </div>
                <div className="rounded-xl border border-border bg-card p-6">
                    <p className="text-xs text-muted-foreground">
                        Successful payments
                    </p>
                    <p className="mt-3 text-3xl font-medium">{paidCount}</p>
                </div>
                <div className="rounded-xl border border-border bg-card p-6">
                    <p className="text-xs text-muted-foreground">
                        Transaction IDs
                    </p>
                    <p className="mt-3 text-3xl font-medium">
                        {visible.length}
                    </p>
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
                <Table>
                    <TableHeader className="sticky top-0 z-10 bg-muted/40">
                        <TableRow>
                            <TableHead className="pl-5 text-[9px] uppercase text-muted-foreground">
                                Vendor
                            </TableHead>
                            <TableHead className="text-[9px] uppercase text-muted-foreground">
                                Plan
                            </TableHead>
                            <TableHead className="text-[9px] uppercase text-muted-foreground">
                                Amount
                            </TableHead>
                            <TableHead className="text-[9px] uppercase text-muted-foreground">
                                Status
                            </TableHead>
                            <TableHead className="text-[9px] uppercase text-muted-foreground">
                                Date
                            </TableHead>
                            <TableHead className="text-[9px] uppercase text-muted-foreground">
                                Transaction ID
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {visible.map((transaction) => {
                            const paymentStatus =
                                transaction.status || "unknown";
                            const paid =
                                paymentStatus.toLowerCase() === "paid" ||
                                paymentStatus.toLowerCase() === "complete";
                            return (
                                <TableRow
                                    key={transaction._id}
                                    className="h-16"
                                >
                                    <TableCell className="pl-5">
                                        <p className="text-sm font-medium">
                                            {transaction.vendorName ||
                                                transaction.vendorEmail ||
                                                "Vendor"}
                                        </p>
                                    </TableCell>
                                    <TableCell className="text-xs">
                                        {transaction.plan}
                                    </TableCell>
                                    <TableCell className="text-xs">{`${transaction.amount?.toFixed(2) || "0.00"} ${transaction.currency?.toUpperCase() ?? ""}`}</TableCell>
                                    <TableCell>
                                        <Badge
                                            className={cn(
                                                paid
                                                    ? "bg-success/10 text-success"
                                                    : "bg-warning/10 text-warning",
                                            )}
                                        >
                                            {paymentStatus}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-xs text-muted-foreground">
                                        {formatDate(
                                            transaction.paidAt ||
                                                transaction.createdAt,
                                        )}
                                    </TableCell>
                                    <TableCell className="text-xs text-muted-foreground">
                                        {transaction._id ||
                                            `vendorId: ${transaction.vendorId}`}
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </div>

            {visible.length === 0 && (
                <p className="mt-4 text-center text-xs text-muted-foreground">
                    No transactions match these filters.
                </p>
            )}

            <div className="mt-5 flex justify-end gap-2">
                <Button type="button" variant="outline" disabled>
                    Previous
                </Button>
                <Button type="button" variant="outline" disabled>
                    Next
                </Button>
            </div>
        </div>
    );
}
