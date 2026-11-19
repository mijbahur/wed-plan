import Link from "next/link";

export default function Footer() {
    return (
        <footer className="border-t border-border bg-white">
            <div className="wp-container flex flex-col gap-3 py-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
                <Link
                    href="/"
                    className="font-heading text-xl font-semibold text-plum-dark"
                >
                    WedPlan
                </Link>
                <p>Plan your beautiful beginning, all in one place.</p>
            </div>
        </footer>
    );
}
