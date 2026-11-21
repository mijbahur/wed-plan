import { Check } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

type SubscriptionPlanCardProps = {
    name: string;
    eyebrow: string;
    price: string;
    description: string;
    features: string[];
    current?: boolean;
    featured?: boolean;
};

export default function SubscriptionPlanCard({
    name,
    eyebrow,
    price,
    description,
    features,
    current,
    featured,
}: SubscriptionPlanCardProps) {
    return (
        <article className={`rounded-lg border p-5 sm:p-6 ${featured ? "bg-primary text-primary-foreground" : "bg-card"}`}>
            <p className="text-[10px] font-semibold uppercase tracking-wide opacity-75">
                {eyebrow}
            </p>
            <h2 className="mt-5 text-3xl">{name}</h2>
            <p className="mt-4 text-3xl font-semibold">{price}</p>
            {name === "Premium" && <span className="ml-1 text-sm opacity-75">/ month</span>}
            <p className="mt-3 text-sm opacity-75">{description}</p>
            <ul className="mt-7 space-y-4 text-sm">
                {features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2">
                        <Check className="size-4 shrink-0" />
                        {feature}
                    </li>
                ))}
            </ul>
            {current ? (
                <Button type="button" variant="outline" className="mt-7 w-full">
                    Your current plan
                </Button>
            ) : (
                <Button
                    variant="secondary"
                    className="mt-7 w-full"
                    nativeButton={false}
                    render={<Link href="/checkout">Upgrade to Premium ↗</Link>}
                />
            )}
        </article>
    );
}
