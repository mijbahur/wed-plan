export const instant = false;
import AddServiceForm from "@/components/dashboard/AddServiceForm";
import { FREE_PLAN_LIMIT } from "@/lib/constants";
import { getCurrentVendorActiveServiceCount } from "@/lib/server/vendor";

const NewServicePage = async () => {
    const activeServiceCount = await getCurrentVendorActiveServiceCount();

    return (
        <div className="mx-auto max-w-7xl">
            <header>
                <h1 className="font-heading text-3xl font-medium text-ink">
                    Create something wonderful.
                </h1>
                <p className="mt-2 text-xs text-muted-foreground">
                    Add the details. We&apos;ll review your service before it goes live.
                </p>
            </header>

            <div className="mt-8 grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_260px]">
                <AddServiceForm />

                <aside className="rounded-xl border border-border bg-card p-6 shadow-sm">
                    <h2 className="font-heading text-xl font-medium text-ink">
                        A lovely first impression.
                    </h2>
                    <p className="mt-4 text-xs leading-5 text-muted-foreground">
                        Your service will be marked Pending until reviewed by the WedPlan team.
                    </p>

                    <div className="mt-6 border-t border-border pt-5">
                        <p className="text-[9px] font-semibold uppercase tracking-wider text-ink">
                            A few helpful details
                        </p>
                        <ul className="mt-3 space-y-2 text-[11px] leading-5 text-muted-foreground">
                            <li>✓ Use a clear, descriptive name</li>
                            <li>✓ Choose the most representative image</li>
                            <li>✓ Be transparent about pricing</li>
                            <li>✓ Include the little details</li>
                        </ul>
                    </div>

                    <div className="mt-8 border-t border-border pt-6">
                        <p className="font-heading text-lg text-ink">
                            Made for your next chapter.
                        </p>
                        <p className="mt-3 text-[11px] leading-5 text-muted-foreground">
                            Free plan · {activeServiceCount} / {FREE_PLAN_LIMIT} active services
                        </p>
                        <p className="mt-1 text-[11px] leading-5 text-muted-foreground">
                            Need more room? Go Premium for unlimited active services.
                        </p>
                        <button type="button" className="mt-4 cursor-pointer text-[11px] font-medium text-plum">
                            Explore Premium →
                        </button>
                    </div>
                </aside>
            </div>
        </div>
    );
};

export default NewServicePage;