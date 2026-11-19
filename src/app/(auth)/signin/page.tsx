"use client";

import Link from "next/link";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";

import { AuthVisual } from "@/components/auth/AuthVisual";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { GoogleButton } from "@/components/auth/GoogleButton";

export default function SignInPage() {
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

                    <form className="space-y-5">
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
                                    type="password"
                                    placeholder="Enter your password"
                                    className="h-10 rounded-md pr-14 text-xs"
                                />
                                <span className="absolute top-1/2 right-3 -translate-y-1/2 text-[9px] text-muted-foreground">
                                    Show
                                </span>
                            </div>
                        </div>

                        <Button
                            type="button"
                            size="lg"
                            className="h-11 w-full rounded-md text-xs"
                        >
                            Sign in
                            <ArrowRightIcon
                                aria-hidden="true"
                                className="size-3"
                            />
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
