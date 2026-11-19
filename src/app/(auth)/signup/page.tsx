"use client";

import Link from "next/link";
import { ArrowLeftIcon, ArrowRightIcon, UploadIcon } from "lucide-react";

import { AuthVisual } from "@/components/auth/AuthVisual";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { GoogleButton } from "@/components/auth/GoogleButton";

export default function SignUpPage() {
    return (
        <main className="grid min-h-dvh bg-white lg:grid-cols-[44%_56%]">
            <AuthVisual image="/auth/authPicture.png" />

            <section className="flex min-h-dvh flex-col px-6 py-5 sm:px-10 lg:px-14">
                <Link
                    href="/"
                    className="inline-flex w-fit items-center gap-1.5 text-xs text-plum-dark/70 transition-colors hover:text-plum"
                >
                    <ArrowLeftIcon aria-hidden="true" className="size-3" />
                    Back to home
                </Link>

                <div className="mx-auto flex w-full max-w-79 flex-1 flex-col justify-center py-7">
                    <h1 className="text-center font-heading text-[38px] leading-tight font-medium text-ink">
                        Begin your next chapter.
                    </h1>
                    <p className="mt-2 text-center text-[10px] text-muted-foreground">
                        A beautiful celebration starts with a little connection.
                    </p>

                    <fieldset className="mt-6">
                        <legend className="mb-2 text-[10px] font-medium text-ink">
                            I&apos;m here to...
                        </legend>
                        <div className="grid grid-cols-2 gap-2">
                            <Button
                                type="button"
                                size="lg"
                                className="h-10 rounded-md px-2 text-[10px]"
                            >
                                <span aria-hidden="true">♡</span>
                                Plan my wedding
                            </Button>
                            <Button
                                type="button"
                                variant="outline"
                                size="lg"
                                className="h-10 rounded-md border-border px-2 text-[10px]"
                            >
                                Grow my business
                            </Button>
                        </div>
                    </fieldset>

                    <form className="mt-5 space-y-4">
                        <div className="space-y-2">
                            <label
                                htmlFor="full-name"
                                className="block text-[10px] font-medium text-ink"
                            >
                                Full name
                            </label>
                            <Input
                                id="full-name"
                                name="fullName"
                                placeholder="Emma Wilson"
                                className="h-10 rounded-md text-xs"
                            />
                        </div>

                        <div className="space-y-2">
                            <label
                                htmlFor="signup-email"
                                className="block text-[10px] font-medium text-ink"
                            >
                                Email address
                            </label>
                            <Input
                                id="signup-email"
                                name="email"
                                type="email"
                                placeholder="emma.wilson@example.com"
                                className="h-10 rounded-md text-xs"
                            />
                        </div>

                        <div className="space-y-2">
                            <label
                                htmlFor="signup-password"
                                className="block text-[10px] font-medium text-ink"
                            >
                                Password
                            </label>
                            <div className="relative">
                                <Input
                                    id="signup-password"
                                    name="password"
                                    type="password"
                                    placeholder="Create a password"
                                    className="h-10 rounded-md pr-14 text-xs"
                                />
                                <span className="absolute top-1/2 right-3 -translate-y-1/2 text-[9px] text-muted-foreground">
                                    Show
                                </span>
                            </div>
                            <p className="text-[8px] text-muted-foreground">
                                At least 6 characters, one uppercase and one
                                lowercase.
                            </p>
                        </div>

                        <label
                            htmlFor="profile-photo"
                            className="flex h-10 cursor-pointer items-center justify-center gap-2 rounded-md border border-border text-[9px] font-medium text-ink"
                        >
                            <UploadIcon aria-hidden="true" className="size-3" />
                            Upload profile photo (optional)
                        </label>
                        <Input
                            id="profile-photo"
                            name="profilePhoto"
                            type="file"
                            accept="image/jpeg,image/png,image/webp"
                            className="sr-only"
                        />

                        <p className="text-[8px] text-muted-foreground">
                            By creating an account, you agree to our{" "}
                            <Link href="/terms" className="underline">
                                Terms
                            </Link>{" "}
                            and{" "}
                            <Link href="/privacy" className="underline">
                                Privacy Policy
                            </Link>
                            .
                        </p>

                        <Button
                            type="button"
                            size="lg"
                            className="h-11 w-full rounded-md text-xs"
                        >
                            Create my account
                            <ArrowRightIcon
                                aria-hidden="true"
                                className="size-3"
                            />
                        </Button>
                    </form>

                    <GoogleButton
                        label="Login with Google"
                        errorCallbackURL="/login"
                    />

                    <p className="mt-4 text-center text-[9px] text-ink-soft">
                        Already part of WedPlan?{" "}
                        <Link
                            href="/signin"
                            className="font-medium text-plum hover:underline"
                        >
                            Sign in
                        </Link>
                    </p>
                </div>
            </section>
        </main>
    );
}
