import { getAllTransactions } from "@/lib/api/transactions";
import AdminTransactionsView from "@/components/dashboard/AdminTransactionsView";
import type { TransactionPayload } from "@/lib/types";
import Reveal from "@/components/ui/reveal";
export const instant = false;
const AdminTransictionPage = async () => {
    const result = await getAllTransactions();
    const transactions = (
        Array.isArray(result) ? result : result.transactions
    ) as TransactionPayload[];
    return (
        <Reveal>
            <AdminTransactionsView transactions={transactions} />
        </Reveal>
    );
};

export default AdminTransictionPage;
