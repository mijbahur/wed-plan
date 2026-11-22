import Link from "next/link";
import { ArrowLeft, Home, SearchX } from "lucide-react";

export default function NotFound() {
    return (
        <main className="flex min-h-screen items-center justify-center bg-cream px-4 py-10">
            <div className="w-full max-w-500px rounded-md border border-border bg-white px-6 py-10 text-center sm:px-10">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-plum-tint">
                    <SearchX className="h-5 w-5 text-plum" />
                </div>

                <h1 className="font-heading text-3xl text-foreground sm:text-4xl">
                    Oops! Page not found.
                </h1>

                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    The page you&apos;re looking for doesn&apos;t exist or may have been
                    moved.
                </p>

                <div className="mt-6 rounded-md bg-cream px-5 py-5">
                    <h2 className="text-sm font-medium text-foreground">
                        Don&apos;t worry, you&apos;re in the right place.
                    </h2>

                    <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                        Your wedding planning journey is still waiting for you.
                        Let&apos;s get you back on track.
                    </p>
                </div>

                <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <Link
                        href="/"
                        className="flex h-11 items-center justify-center gap-2 rounded-md bg-plum px-4 text-xs font-medium text-white transition-colors hover:bg-plum-dark"
                    >
                        <Home size={14} />
                        Back to Home
                    </Link>

                    <Link
                        href="/"
                        className="flex h-11 items-center justify-center gap-2 rounded-md border border-border px-4 text-xs font-medium text-plum transition-colors hover:bg-plum-tint"
                    >
                        <ArrowLeft size={14} />
                        Go Back
                    </Link>
                </div>

                <p className="mt-6 text-[11px] text-muted-foreground">
                    Need a hand?{" "}
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
