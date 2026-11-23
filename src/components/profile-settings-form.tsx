"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { updateMyProfile } from "@/lib/api/profile";
import type { Profile, ProfileUpdateInput } from "@/lib/types";
import { uploadProfileImage } from "@/lib/upload-image";
import { useSession } from "@/lib/auth-client";

function memberSince(value: string | null) {
    if (!value) return "Not available";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "Not available";
    return date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
}

export default function ProfileSettingsForm({
    initialProfile,
}: {
    initialProfile: Profile;
}) {
    const { refetch: refreshSession } = useSession();
    const [profile, setProfile] = useState(initialProfile);
    const [saving, setSaving] = useState(false);
    const [uploading, setUploading] = useState(false);

    function updateField<K extends keyof ProfileUpdateInput>(
        key: K,
        value: ProfileUpdateInput[K],
    ) {
        setProfile((current) => ({ ...current, [key]: value }));
    }

    async function handleImageChange(file?: File) {
        if (!file) return;
        setUploading(true);
        try {
            const image = await uploadProfileImage(file);
            updateField("image", image);
            toast.success(
                "Image uploaded. Save changes to update your profile.",
            );
        } catch (error) {
            toast.error(
                error instanceof Error
                    ? error.message
                    : "Could not upload your profile image.",
            );
        } finally {
            setUploading(false);
        }
    }

    async function saveProfile(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const currentProfile = profile;
        setSaving(true);
        try {
            const updates: Partial<ProfileUpdateInput> = {
                name: currentProfile.name,
                image: currentProfile.image,
                phone: currentProfile.phone,
                location: currentProfile.location,
            };
            if (currentProfile.userRole === "vendor") {
                updates.businessName = currentProfile.businessName;
                updates.description = currentProfile.description;
                updates.website = currentProfile.website;
            }
            const updated = await updateMyProfile(updates);
            setProfile(updated);
            await refreshSession();
            toast.success("Your profile has been updated.");
        } catch (error) {
            toast.error(
                error instanceof Error
                    ? error.message
                    : "Could not update your profile.",
            );
        } finally {
            setSaving(false);
        }
    }

    return (
        <div className="mx-auto max-w-6xl">
            <header className="mb-7">
                <p className="text-xs text-muted-foreground">
                    {profile.userRole} workspace / Profile settings
                </p>
                <h1 className="mt-4 font-heading text-4xl font-medium">
                    Profile settings
                </h1>
                <p className="mt-2 text-sm text-muted-foreground">
                    Make yourself at home. Keep your details up to date.
                </p>
            </header>

            <div className="grid gap-5 lg:grid-cols-[minmax(0,2fr)_minmax(240px,.85fr)]">
                <form
                    onSubmit={saveProfile}
                    className="space-y-6 rounded-xl border border-border bg-card p-5 sm:p-7"
                >
                    <div>
                        <h2 className="font-heading text-2xl">
                            Personal information
                        </h2>
                        <div className="mt-5 flex flex-wrap items-center gap-4">
                            <Avatar size="lg" className="size-16">
                                <AvatarImage
                                    src={profile.image || undefined}
                                    alt={profile.name}
                                />
                                <AvatarFallback>
                                    {profile.name.slice(0, 1).toUpperCase()}
                                </AvatarFallback>
                            </Avatar>
                            <div className="min-w-0 flex-1">
                                <p className="text-sm font-medium">
                                    {profile.name}
                                </p>
                                <label
                                    htmlFor="profile-image"
                                    className="mt-1 block text-xs text-plum hover:underline"
                                >
                                    {uploading
                                        ? "Uploading photo..."
                                        : "Change photo"}
                                </label>
                                <Input
                                    id="profile-image"
                                    type="file"
                                    accept="image/jpeg,image/png,image/webp"
                                    disabled={uploading}
                                    onChange={(event) =>
                                        void handleImageChange(
                                            event.target.files?.[0],
                                        )
                                    }
                                    className="mt-2 h-auto max-w-sm text-xs file:mr-3"
                                />
                                <p className="mt-1 text-[10px] text-muted-foreground">
                                    JPG, PNG, or WebP. Up to 5 MB.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2 sm:col-span-2">
                            <label
                                htmlFor="profile-name"
                                className="text-xs font-medium"
                            >
                                Full name
                            </label>
                            <Input
                                id="profile-name"
                                required
                                maxLength={100}
                                value={profile.name}
                                onChange={(event) =>
                                    updateField("name", event.target.value)
                                }
                            />
                        </div>
                        {profile.userRole === "vendor" && (
                            <div className="space-y-2 sm:col-span-2">
                                <label
                                    htmlFor="business-name"
                                    className="text-xs font-medium"
                                >
                                    Business name
                                </label>
                                <Input
                                    id="business-name"
                                    maxLength={120}
                                    value={profile.businessName}
                                    onChange={(event) =>
                                        updateField(
                                            "businessName",
                                            event.target.value,
                                        )
                                    }
                                />
                            </div>
                        )}
                        <div className="space-y-2 sm:col-span-2">
                            <label
                                htmlFor="profile-email"
                                className="text-xs font-medium"
                            >
                                Email address
                            </label>
                            <Input
                                id="profile-email"
                                type="email"
                                value={profile.email}
                                disabled
                            />
                            <p className="text-[10px] text-muted-foreground">
                                Your sign-in email is managed by your account
                                provider.
                            </p>
                        </div>
                        <div className="space-y-2">
                            <label
                                htmlFor="profile-phone"
                                className="text-xs font-medium"
                            >
                                Phone (optional)
                            </label>
                            <Input
                                id="profile-phone"
                                type="tel"
                                maxLength={30}
                                value={profile.phone}
                                onChange={(event) =>
                                    updateField("phone", event.target.value)
                                }
                            />
                        </div>
                        <div className="space-y-2">
                            <label
                                htmlFor="profile-location"
                                className="text-xs font-medium"
                            >
                                Location (optional)
                            </label>
                            <Input
                                id="profile-location"
                                maxLength={120}
                                value={profile.location}
                                onChange={(event) =>
                                    updateField("location", event.target.value)
                                }
                            />
                        </div>
                        {profile.userRole === "vendor" && (
                            <>
                                <div className="space-y-2 sm:col-span-2">
                                    <label
                                        htmlFor="profile-website"
                                        className="text-xs font-medium"
                                    >
                                        Website (optional)
                                    </label>
                                    <Input
                                        id="profile-website"
                                        type="url"
                                        maxLength={2048}
                                        placeholder="https://example.com"
                                        value={profile.website}
                                        onChange={(event) =>
                                            updateField(
                                                "website",
                                                event.target.value,
                                            )
                                        }
                                    />
                                </div>
                                <div className="space-y-2 sm:col-span-2">
                                    <label
                                        htmlFor="profile-description"
                                        className="text-xs font-medium"
                                    >
                                        Business description (optional)
                                    </label>
                                    <Textarea
                                        id="profile-description"
                                        maxLength={1000}
                                        value={profile.description}
                                        onChange={(event) =>
                                            updateField(
                                                "description",
                                                event.target.value,
                                            )
                                        }
                                    />
                                </div>
                            </>
                        )}
                    </div>

                    <div className="space-y-3 border-t border-border pt-5">
                        <Button
                            type="submit"
                            className="w-full"
                            disabled={saving || uploading}
                        >
                            {saving ? "Saving changes..." : "Save changes"}
                        </Button>
                        <p className="text-[10px] text-muted-foreground">
                            Your updates are saved only when you select Save
                            changes.
                        </p>
                    </div>
                </form>

                <aside className="h-fit space-y-6 rounded-xl bg-beige p-5 sm:p-6">
                    <h2 className="font-heading text-2xl">Your account</h2>
                    <div>
                        <p className="text-[10px] uppercase tracking-wide text-muted-foreground">
                            Account role
                        </p>
                        <p className="mt-2 text-sm capitalize">
                            {profile.userRole}
                        </p>
                    </div>
                    <div>
                        <p className="text-[10px] uppercase tracking-wide text-muted-foreground">
                            Member since
                        </p>
                        <p className="mt-2 text-sm">
                            {memberSince(profile.createdAt)}
                        </p>
                    </div>
                    {profile.userRole === "vendor" && (
                        <div>
                            <p className="text-[10px] uppercase tracking-wide text-muted-foreground">
                                Subscription
                            </p>
                            <p className="mt-2 text-sm capitalize">
                                {profile.subscriptionPlan}
                            </p>
                        </div>
                    )}
                    <p className="text-xs text-muted-foreground">
                        Your role and subscription status cannot be changed from
                        profile settings.
                    </p>
                </aside>
            </div>
        </div>
    );
}
