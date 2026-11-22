import Link from "next/link";
import { Home, ShieldAlert } from "lucide-react";
import BackButton from "@/components/back-button";

export default function UnauthorizedPage() {
    return (
        <main className="flex min-h-screen items-center justify-center bg-cream px-4 py-10">
            <div className="w-full max-w-125 rounded-md border border-border bg-white px-6 py-10 text-center sm:px-10">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-plum-tint">
                    <ShieldAlert className="h-5 w-5 text-plum" />
                </div>

                <h1 className="font-heading text-3xl text-foreground sm:text-4xl">
                    Access Restricted
                </h1>

                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    Sorry, you don&apos;t have permission to access this page.
                    Please make sure you&apos;re using the correct account.
                </p>

                <div className="mt-6 rounded-md bg-cream px-5 py-5">
                    <h2 className="text-sm font-medium text-foreground">
                        Your account has limited access.
                    </h2>

                    <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                        This page may be available only to certain users or
                        account roles. Contact support if you believe this is a
                        mistake.
                    </p>
                </div>

                <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <BackButton />

                    <Link
                        href="/"
                        className="flex h-11 items-center justify-center gap-2 rounded-md border border-border px-4 text-xs font-medium text-plum transition-colors hover:bg-plum-tint"
                    >
                        <Home size={14} />
                        Back to Home
                    </Link>
                </div>

                <p className="mt-6 text-[11px] text-muted-foreground">
                    Need help?{" "}
                    <a
                        href="mailto:hello@wedplan.com"
                        className="font-medium text-plum hover:underline"
                    >
                        hello@wedplan.com
                    </a>
                </p>
            </div>
        </main>
    );
}
