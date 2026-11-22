import Link from "next/link";
import { ArrowLeft, Check, LockKeyhole } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PREMIUM_PLAN_FEATURES, PREMIUM_PRICE } from "@/lib/constants";

export const instant = false;
export default async function CheckoutPage({
    searchParams,
}: {
    searchParams: Promise<{ canceled?: string }>;
}) {
    const { canceled } = await searchParams;
    if (canceled) {
        return (
            <div className="mx-auto max-w-lg px-4 py-20 text-center">
                <p className="text-lg font-semibold text-muted-foreground">
                    Your payment was canceled.
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                    You can go back and try again.
                </p>
            </div>
        );
    }

    return (
        <div className="bg-cream">
            <div className="wp-container max-w-5xl py-10 md:py-16">
                <Link
                    href="/dashboard/vendor/subscription"
                    className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"
                >
                    <ArrowLeft className="size-4" /> Back to subscription
                </Link>

                <div className="mt-10">
                    <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary">
                        Premium subscription
                    </p>
                    <h1 className="mt-3 text-4xl sm:text-5xl">
                        Give your business more room to bloom.
                    </h1>
                    <p className="mt-3 text-muted-foreground">
                        Upgrade your WedPlan vendor workspace with Premium.
                    </p>
                </div>

                <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_320px]">
                    <section className="rounded-xl border bg-card p-6 sm:p-8">
                        <div className="flex items-start justify-between gap-4 border-b pb-6">
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-wide text-primary">
                                    Your plan
                                </p>
                                <h2 className="mt-2 text-3xl">Premium</h2>
                                <p className="mt-2 text-sm text-muted-foreground">
                                    Monthly subscription
                                </p>
                            </div>
                            <p className="text-2xl font-semibold">
                                ${PREMIUM_PRICE}
                                <span className="text-sm font-normal text-muted-foreground">
                                    {" "}
                                    / month
                                </span>
                            </p>
                        </div>

                        <ul className="mt-6 space-y-4 text-sm">
                            {PREMIUM_PLAN_FEATURES.map((benefit) => (
                                <li
                                    key={benefit}
                                    className="flex items-center gap-3"
                                >
                                    <Check className="size-4 text-success" />
                                    {benefit}
                                </li>
                            ))}
                        </ul>

                        <form action="/api/checkout_sessions" method="POST">
                            <section>
                                <Button
                                    type="submit"
                                    className="mt-8 h-11 w-full"
                                >
                                    Continue to secure checkout {PREMIUM_PRICE > 0 && `- $${PREMIUM_PRICE}.00`}
                                </Button>
                            </section>
                        </form>
                        <p className="mt-4 flex items-center justify-center gap-2 text-xs text-muted-foreground">
                            <LockKeyhole className="size-3" />
                            Payments are securely processed by Stripe.
                        </p>
                    </section>

                    <aside className="h-fit rounded-xl bg-beige p-6">
                        <h2 className="text-xl">Order summary</h2>
                        <div className="mt-6 flex items-center justify-between border-b pb-4 text-sm">
                            <span>Premium plan</span>
                            <span>${PREMIUM_PRICE}.00</span>
                        </div>
                        <div className="mt-4 flex items-center justify-between font-semibold">
                            <span>Total today</span>
                            <span>${PREMIUM_PRICE}.00</span>
                        </div>
                        <p className="mt-6 text-xs leading-5 text-muted-foreground">
                            Your subscription renews monthly. You can manage
                            cancellation and renewal from your subscription
                            settings.
                        </p>
                    </aside>
                </div>
            </div>
        </div>
    );
}
