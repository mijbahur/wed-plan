type VendorServicesSummaryProps = {
    total: number;
    active: number;
    pending: number;
};

export default function VendorServicesSummary({
    total,
    active,
    pending,
}: VendorServicesSummaryProps) {
    return (
        <>
            <section className="mt-8 rounded-xl border border-border bg-card p-6">
                <h2 className="font-heading text-lg font-medium text-ink">
                    Your collection, at a glance
                </h2>
                <p className="mt-1 text-[11px] text-muted-foreground">
                    Free plan · {active} of 3 active services used. Pending
                    services are not visible to customers.
                </p>
            </section>

            <div className="mt-6 flex items-end justify-between gap-4">
                <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs">
                    <span>
                        <strong className="font-medium text-ink">
                            All services
                        </strong>
                        <span className="ml-1 text-muted-foreground">
                            {total}
                        </span>
                    </span>
                    <span className="text-muted-foreground">
                        Active
                        <strong className="ml-1 font-medium text-ink">
                            {active}
                        </strong>
                    </span>
                    <span className="text-muted-foreground">
                        Pending review
                        <strong className="ml-1 font-medium text-ink">
                            {pending}
                        </strong>
                    </span>
                </div>
            </div>
        </>
    );
}
