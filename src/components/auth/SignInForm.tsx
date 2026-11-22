"use client";

import Link from "next/link";
import {
    ArrowLeftIcon,
    ArrowRightIcon,
    EyeIcon,
    EyeOffIcon,
    LoaderCircle,
} from "lucide-react";

import { AuthVisual } from "@/components/auth/AuthVisual";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { GoogleButton } from "@/components/auth/GoogleButton";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { authClient, useSession } from "@/lib/auth-client";
import { toast } from "sonner";

export default function SignInPage() {

    const searchParams = useSearchParams();
    const redirectTo = searchParams?.get("redirectTo") || "/";

    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { data: session, isPending } = useSession();

    useEffect(() => {
        if (isPending || !session) return;

        const role = session.user.userRole;
        router.replace(
            role === "vendor"
                ? "/dashboard/vendor"
                : role === "admin"
                  ? "/dashboard/admin"
                  : "/dashboard/customer",
        );
    }, [isPending, router, session]);

    const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.target);
        const user = Object.fromEntries(formData.entries()) as {
            email: string;
            password: string;
        };

        setIsSubmitting(true);

        const { error } = await authClient.signIn.email({
            ...user,
            callbackURL: redirectTo,
        });

        setIsSubmitting(false);

        if (error) {
            toast.error(error.message ?? "Invalid email or password.");
            return;
        }

        toast.success("Logged in successfully!");
        router.push("/");
        router.refresh();
    };

    if (session) return null;

    return (
        <main className="grid min-h-dvh bg-white lg:grid-cols-[44%_56%]">
            <AuthVisual image="/auth/authPicture.png" />

            <section className="flex min-h-dvh flex-col px-6 py-5 sm:px-10 lg:px-16">
                <Link
                    href="/"
                    className="inline-flex w-fit items-center gap-1.5 text-xs text-plum-dark/70 transition-colors hover:text-plum"
                >
                    <ArrowLeftIcon aria-hidden="true" className="size-3" />
                    Back to home
                </Link>

                <div className="mx-auto flex w-full max-w-79 flex-1 flex-col justify-center py-12">
                    <h1 className="text-center font-heading text-[38px] leading-tight font-medium text-ink">
                        Welcome back.
                    </h1>
                    <p className="mt-3 text-center text-xs text-muted-foreground">
                        Your beautiful plans are right where you left them.
                    </p>

                    <GoogleButton
                        label="Login with Google"
                        errorCallbackURL="/login"
                    />

                    <div className="my-6 flex items-center gap-3 text-[9px] text-muted-foreground">
                        <span className="h-px flex-1 bg-border" />
                        <span>or sign in with email</span>
                        <span className="h-px flex-1 bg-border" />
                    </div>

                    <form className="space-y-5" onSubmit={handleSubmit}>
                        <div className="space-y-2">
                            <label
                                htmlFor="email"
                                className="block text-[10px] font-medium text-ink"
                            >
                                Email address
                            </label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="you@example.com"
                                className="h-10 rounded-md text-xs"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label
                                htmlFor="password"
                                className="block text-[10px] font-medium text-ink"
                            >
                                Password
                            </label>
                            <div className="relative">
                                <Input
                                    id="password"
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter your password"
                                    className="h-10 rounded-md pr-14 text-xs"
                                    required
                                />
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon-sm"
                                    aria-label={
                                        showPassword
                                            ? "Hide password"
                                            : "Show password"
                                    }
                                    aria-pressed={showPassword}
                                    className="absolute right-1 inset-y-0 my-auto cursor-pointer"
                                    onClick={() =>
                                        setShowPassword((visible) => !visible)
                                    }
                                >
                                    {showPassword ? (
                                        <EyeOffIcon aria-hidden="true" />
                                    ) : (
                                        <EyeIcon aria-hidden="true" />
                                    )}
                                </Button>
                            </div>
                        </div>

                        <Button
                            type="submit"
                            size="lg"
                            className="h-11 w-full rounded-md text-xs"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? (
                                <>
                                    <LoaderCircle
                                        className="animate-spin"
                                        aria-hidden="true"
                                    />
                                    Logging in
                                </>
                            ) : (
                                <>
                                    Sign in
                                    <ArrowRightIcon
                                        aria-hidden="true"
                                        className="size-3"
                                    />
                                </>
                            )}
                        </Button>
                    </form>

                    <p className="mt-5 text-center text-[10px] text-ink-soft">
                        New to WedPlan?{" "}
                        <Link
                            href="/signup"
                            className="font-medium text-plum hover:underline"
                        >
                            Create an account
                        </Link>
                    </p>
                </div>

                <p className="text-center text-[9px] text-muted-foreground">
                    Your plans. Your people. All in one place.
                </p>
            </section>
        </main>
    );
}
