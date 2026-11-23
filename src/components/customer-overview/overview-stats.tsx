type Counts = {
    total: number;
    pending: number;
    accepted: number;
    rejected: number;
};

export default function OverviewStats({ counts }: { counts: Counts }) {
    const stats = [
        ["Total requests", counts.total, "Across your service bookings"],
        ["Pending", counts.pending, "Waiting for a response"],
        ["Accepted", counts.accepted, "Confirmed bookings"],
        ["Rejected", counts.rejected, "Requests that need another option"],
    ] as const;

    return (
        <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map(([label, value, note]) => (
                <article
                    key={label}
                    className="rounded-lg border border-(--wp-line) bg-white p-4"
                >
                    <p className="text-xs text-(--wp-ink-soft)">{label}</p>
                    <p className="mt-2 text-3xl font-medium">{value}</p>
                    <p className="mt-1 text-[10px] text-(--wp-ink-soft)">
                        {note}
                    </p>
                </article>
            ))}
        </section>
    );
}
