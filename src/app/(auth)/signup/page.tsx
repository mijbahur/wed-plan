"use client";

import Link from "next/link";
import { ArrowLeftIcon, ArrowRightIcon, EyeIcon, EyeOffIcon, LoaderCircle, UploadIcon } from "lucide-react";

import { AuthVisual } from "@/components/auth/AuthVisual";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { GoogleButton } from "@/components/auth/GoogleButton";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { uploadImage } from "@/lib/upload-image";

const initialForm = {
    name: "",
    email: "",
    image: "",
    password: "",
};

export default function SignUpPage() {
    const router = useRouter();
    const [form, setForm] = useState(initialForm);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [role, setRole] = useState<"customer" | "vendor">("customer");
    const [profilePhoto, setProfilePhoto] = useState<File | null>(null);
    const [profilePreview, setProfilePreview] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        return () => {
            if (profilePreview) URL.revokeObjectURL(profilePreview);
        };
    }, [profilePreview]);

    const update = (field: keyof typeof form, value: string) =>
        setForm((current) => ({ ...current, [field]: value }));

    const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsSubmitting(true);

        const formData = new FormData(event.currentTarget);
        const user = {
            name: String(formData.get("name") ?? ""),
            email: String(formData.get("email") ?? ""),
            password: String(formData.get("password") ?? ""),
        };

        let image = "";

        console.log("Signing up user:", user, "before image:", image);
        console.log("Profile photo:", profilePhoto);
        if (profilePhoto) {
            try {
                image = await uploadImage(profilePhoto);
            } catch (error) {
                setIsSubmitting(false);
                toast.error(
                    error instanceof Error
                        ? error.message
                        : "Could not upload your profile photo.",
                );
                return;
            }
        }

        console.log("Signing up user:", user, "with image:", image, "and role:", role);
        const { error } = await authClient.signUp.email({
            ...user,
            image,
            role,
        });

        setIsSubmitting(false);

        if (error) {
            toast.error(error.message ?? "Could not create your account.");
            return;
        }

        toast.success("Account created successfully!");
        setTimeout(() => {
            setForm(initialForm);
            setProfilePhoto(null);
            setProfilePreview("");
            setShowPassword(false);
            setRole("customer");
            router.push("/signin");
        }, 3000);
    };
    console.log("role", role);

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
                                variant={role === "customer" ? "default" : "outline"}
                                aria-pressed={role === "customer"}
                                className="h-10 rounded-md px-2 text-[10px]"
                                onClick={() => setRole("customer")}
                            >
                                <span aria-hidden="true">♡</span>
                                Plan my wedding
                            </Button>
                            <Button
                                type="button"
                                variant={role === "vendor" ? "default" : "outline"}
                                size="lg"
                                aria-pressed={role === "vendor"}
                                className="h-10 rounded-md border-border px-2 text-[10px]"
                                onClick={() => setRole("vendor")}
                            >
                                Grow my business
                            </Button>
                        </div>
                    </fieldset>

                    <form
                        className="mt-5 space-y-4"
                        onSubmit={handleSubmit}
                    >
                        <div className="space-y-2">
                            <label
                                htmlFor="full-name"
                                className="block text-[10px] font-medium text-ink"
                            >
                                Full name
                            </label>
                            <Input
                                id="name"
                                name="name"
                                type="text"
                                autoComplete="name"
                                placeholder="Your name"
                                className="h-10 rounded-md text-xs"
                                value={form.name}
                                onChange={(event) =>
                                    update("name", event.target.value)
                                }
                                required
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
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                placeholder="you@example.com"
                                className="h-10 rounded-md text-xs"
                                value={form.email}
                                onChange={(event) =>
                                    update("email", event.target.value)
                                }
                                required
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
                                    id="password"
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    className="h-10 rounded-md pr-14 text-xs"
                                    autoComplete="new-password"
                                    placeholder="Create a password"
                                    value={form.password}
                                    onChange={(event) =>
                                        update("password", event.target.value)
                                    }
                                    minLength={6} 
                                    pattern="(?=.*[A-Z])(?=.*[a-z]).{6,}"
                                    title="Use at least 6 characters, including an uppercase and a lowercase letter."
                                    required
                                />
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon-sm"
                                    aria-label={showPassword ? "Hide password" : "Show password"}
                                    aria-pressed={showPassword}
                                    // className="absolute top-1/2 right-1 -translate-y-1/2 cursor-pointer"
                                    className="absolute right-1 inset-y-0 my-auto cursor-pointer"
                                    onClick={() => setShowPassword((visible) => !visible)}
                                >
                                    {showPassword ? (
                                        <EyeOffIcon aria-hidden="true" />
                                    ) : (
                                        <EyeIcon aria-hidden="true" />
                                    )}
                                </Button>
                            </div>
                            <p className="text-[8px] text-muted-foreground">
                                At least 8 characters, one uppercase and one
                                lowercase.
                            </p>
                        </div>

                        <div className="flex items-center gap-3">
                            {profilePreview && (
                                <Avatar size="lg" className="size-12 rounded-md">
                                    <AvatarImage
                                        src={profilePreview}
                                        alt="Selected profile photo preview"
                                        className="rounded-md"
                                    />
                                    <AvatarFallback>Photo</AvatarFallback>
                                </Avatar>
                            )}
                            <label
                                htmlFor="profile-photo"
                                className="flex h-10 flex-1 cursor-pointer items-center justify-center gap-2 rounded-md border border-border text-[9px] font-medium text-ink"
                            >
                                <UploadIcon aria-hidden="true" className="size-3" />
                                {profilePhoto ? profilePhoto.name : "Upload profile photo"}
                            </label>
                        </div>
                        <Input
                            id="profile-photo"
                            name="profilePhoto"
                            type="file"
                            accept="image/jpeg,image/png,image/webp"
                            className="sr-only"
                            onChange={(event) => {
                                const file = event.target.files?.[0] ?? null;
                                setProfilePhoto(file);
                                setProfilePreview((current) => {
                                    if (current) URL.revokeObjectURL(current);
                                    return file ? URL.createObjectURL(file) : "";
                                });
                            }}
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
                                    Creating account
                                </>
                            ) : (
                                <>
                                    Create my account
                                    <ArrowRightIcon
                                        aria-hidden="true"
                                        className="size-3"
                                    />
                                </>
                            )}
                            
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
