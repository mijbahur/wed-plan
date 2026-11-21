import SubscriptionPlanCard from "@/components/dashboard/subscription-plan-card";
import SubscriptionPlanSummary from "@/components/dashboard/subscription-plan-summary";
import { FREE_PLAN_FEATURES, PREMIUM_PLAN_FEATURES, PREMIUM_PRICE } from "@/lib/constants";

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
                    features={FREE_PLAN_FEATURES}
                    current
                />
                <SubscriptionPlanCard
                    eyebrow="For your next chapter"
                    name="Premium"
                    price={`$${PREMIUM_PRICE}`}
                    description="More room for every possibility."
                    features={PREMIUM_PLAN_FEATURES}
                    featured
                />
            </div>
            <SubscriptionPlanSummary />


        </div>
    );
}
