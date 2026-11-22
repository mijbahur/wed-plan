import { redirect } from "next/navigation";
import { connection } from "next/server";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Home } from "lucide-react";
import { stripe } from "@/lib/stripe";
import { checkoutVerify } from "@/lib/action/payments";
import { Button } from "@/components/ui/button";

export const instant = false;
export default async function checkoutSuccessPage({
    searchParams,
}: {
    searchParams: Promise<{ session_id?: string }>;
}) {
    const { session_id } = await searchParams;

    if (!session_id) {
        redirect("/checkout/cancel");
    }

    await connection();

    const {
        status,
        payment_status,
        customer_email,
        payment_intent,
        amount_total,
    } = await stripe.checkout.sessions.retrieve(session_id, {
        expand: ["line_items", "payment_intent"],
    });

    if (status !== "complete" || payment_status !== "paid") {
        redirect("/checkout/cancel");
    }

    const result = await checkoutVerify(session_id);
    if (!result.success) {
        redirect("/checkout/cancel");
    }

        return (
            <main className="flex min-h-[70vh] items-center justify-center bg-cream px-4 py-16">
                <section className="w-full max-w-xl rounded-2xl border bg-card p-8 text-center shadow-sm sm:p-12">
                    <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-success/10">
                        <CheckCircle2 className="size-9 text-success" />
                    </div>
                    <p className="mt-8 text-xs font-medium uppercase tracking-[0.2em] text-primary">
                        Payment confirmed
                    </p>
                    <h1 className="mt-3 text-4xl sm:text-5xl">
                        Welcome to Premium.
                    </h1>
                    <p className="mx-auto mt-4 max-w-md leading-7 text-muted-foreground">
                        Thank you for upgrading your WedPlan vendor workspace.
                        Your confirmation has been sent to{" "}
                        <span className="font-medium text-foreground">
                            {customer_email || "your email address"}
                        </span>
                        .
                    </p>

                    <div className="mt-8 rounded-xl bg-beige p-5 text-left">
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">Plan</span>
                            <span className="font-medium">Premium</span>
                        </div>
                        <div className="mt-3 flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">
                                Transaction ID
                            </span>
                            <span className="font-medium">
                                {typeof payment_intent === "string"
                                    ? payment_intent
                                    : payment_intent?.id || "N/A"}
                            </span>
                        </div>
                        <div className="mt-3 flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">
                                Payment status
                            </span>
                            <span className="font-medium text-success">
                                Paid
                            </span>
                        </div>
                        <div className="mt-3 flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">
                                Total Amount
                            </span>
                            <span className="font-medium text-success">
                                {amount_total}
                            </span>
                        </div>
                    </div>

                    <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
                        <Button
                            nativeButton={false}
                            render={
                                <Link href="/dashboard/vendor">
                                    Go to dashboard <ArrowRight />
                                </Link>
                            }
                        />
                        <Button
                            variant="outline"
                            nativeButton={false}
                            render={
                                <Link href="/">
                                    <Home /> Back to home
                                </Link>
                            }
                        />
                    </div>
                </section>
            </main>
        );
}
