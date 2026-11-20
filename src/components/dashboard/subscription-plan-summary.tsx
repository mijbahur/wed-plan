
import { FREE_PLAN_LIMIT } from "@/lib/constants";
import { getCurrentVendorActiveServiceCount } from "@/lib/server/vendor";

export default async function SubscriptionPlanSummary() {
    const activeServiceCount = await getCurrentVendorActiveServiceCount();

    return (
        <div>
            <section className="mt-5 rounded-lg bg-beige p-5 sm:p-6">
                <h2 className="text-xl">Your current plan</h2>
                <p className="mt-3 text-sm text-muted-foreground">
                    Free · {activeServiceCount} of {FREE_PLAN_LIMIT}{" "}
                    active services used · No payment method on file
                </p>
            </section>

            <section className="mt-8">
                <h2 className="text-2xl">A few things to know</h2>
                <p className="mt-4 text-xs leading-5 text-muted-foreground">
                    Secure checkout with Stripe. Premium is activated only after
                    your payment is verified.
                    <br />
                    Your plan renews monthly. Manage cancellation and renewal
                    from your subscription settings once upgraded.
                </p>
            </section>
        </div>
    );
}
