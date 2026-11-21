import { getServiceById } from "@/lib/api/service";
import AddServiceForm from "@/components/dashboard/AddServiceForm";
import type { Service } from "@/lib/types";
import { notFound } from "next/navigation";

export const instant = false;

export default async function EditServicePage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;

    const service = (await getServiceById(id)) as Service | null;
    if (!service) notFound();

    return (
        <div className="mx-auto max-w-7xl">
            <header>
                <h1 className="font-heading text-3xl font-medium text-ink">
                    Refine the little details.
                </h1>
                <p className="mt-2 text-xs text-muted-foreground">
                    Keep your service details clear, accurate, and ready for your
                    next couple.
                </p>
            </header>

            <div className="mt-8 grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_260px]">
                <AddServiceForm service={service} />

                <aside className="rounded-xl border border-border bg-card p-6 shadow-sm">
                    <h2 className="font-heading text-xl font-medium text-ink">
                        A lovely first impression.
                    </h2>
                    <p className="mt-4 text-xs leading-5 text-muted-foreground">
                        This service is currently {service.status}. Updated details
                        may require a new review.
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
                </aside>
            </div>
        </div>
    );
}