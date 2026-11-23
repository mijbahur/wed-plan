import Reveal from "@/components/ui/reveal";
import { getUser } from "@/lib/api/user";
import { getAllTransactions } from "@/lib/api/transactions";
import type { TransactionPayload } from "@/lib/types";
import OverviewActions from "./overview-actions";
import OverviewHeader from "./overview-header";
import OverviewStats from "./overview-stats";
import RecentTransactions from "./recent-transactions";

export default async function AdminDashboard() {
    const { users } = await getUser();
    const transactionResult = await getAllTransactions();
    const transactions = (
        Array.isArray(transactionResult)
            ? transactionResult
            : transactionResult.transactions
    ) as TransactionPayload[];

    return (
        <div className="mx-auto max-w-7xl space-y-5">
            <Reveal>
                <OverviewHeader />
            </Reveal>
            <Reveal delay={0.08}>
                <OverviewStats
                    users={users.length}
                    vendors={
                        users.filter((user) => user?.userRole === "vendor")
                            .length
                    }
                    customers={
                        users.filter((user) => user?.userRole === "customer")
                            .length
                    }
                />
            </Reveal>
            <Reveal delay={0.16}>
                <RecentTransactions transactions={transactions} />
            </Reveal>
            <Reveal delay={0.24}>
                <OverviewActions />
            </Reveal>
        </div>
    );
}
