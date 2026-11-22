import { getAllTransactions } from "@/lib/api/transactions";
import AdminTransactionsView from "@/components/dashboard/AdminTransactionsView";
import type { Transaction } from "@/lib/types";
// export const instant = false;
const AdminTransictionPage = async () => {
    const result = await getAllTransactions();
    const transactions = (
        Array.isArray(result) ? result : result.transactions
    ) as Transaction[];
    return <AdminTransactionsView transactions={transactions} />;
};

export default AdminTransictionPage;
