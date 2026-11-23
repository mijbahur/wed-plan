export default function OverviewStats({
    users,
    vendors,
    customers,
}: {
    users: number;
    vendors: number;
    customers: number;
}) {
    const stats = [
        ["Registered users", users],
        ["Vendors", vendors],
        ["Customers", customers],
    ] as const;

    return (
        <section className="grid gap-3 sm:grid-cols-3">
            {stats.map(([label, value]) => (
                <article
                    key={label}
                    className="rounded-lg border-(--wp-line) bg-white p-4"
                >
                    <p className="text-xs text-(--wp-ink-soft)">{label}</p>
                    <p className="mt-2 text-3xl font-medium">{value}</p>
                </article>
            ))}
        </section>
    );
}
