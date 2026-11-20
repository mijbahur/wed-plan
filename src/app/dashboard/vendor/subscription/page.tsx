import SubscriptionPlanCard from "@/components/dashboard/subscription-plan-card";
import { FREE_PLAN_LIMIT, PREMIUM_PRICE } from "@/lib/constants";

export const instant = false;

export default function VendorSubscriptionPage() {
    return (
        <div className="mx-auto max-w-5xl">
            <header>
                <h1 className="text-4xl sm:text-5xl">
                    Room for your business to bloom.
                </h1>
                <p className="mt-3 text-sm text-muted-foreground">
                    A little more possibility for every stage of your business.
                </p>
            </header>

            <div className="mt-8 grid gap-5 md:grid-cols-2">
                <SubscriptionPlanCard
                    eyebrow="The essentials"
                    name="Free"
                    price="$0"
                    description="A thoughtful place to begin."
                    features={[
                        `Up to ${FREE_PLAN_LIMIT} active services`,
                        "Basic vendor dashboard",
                        "Booking request management",
                    ]}
                    current
                />
                <SubscriptionPlanCard
                    eyebrow="For your next chapter"
                    name="Premium"
                    price={`$${PREMIUM_PRICE}`}
                    description="More room for every possibility."
                    features={[
                        "Unlimited active services",
                        "Premium vendor badge",
                        "All Free plan features",
                    ]}
                    featured
                />
            </div>

            <section className="mt-5 rounded-lg bg-beige p-5 sm:p-6">
                <h2 className="text-xl">Your current plan</h2>
                <p className="mt-3 text-sm text-muted-foreground">
                    Free · 2 of {FREE_PLAN_LIMIT} active services used · No payment method on
                    file
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
