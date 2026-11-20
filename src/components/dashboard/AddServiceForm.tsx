"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";

import { createService } from "@/lib/api/service";
import { CATEGORIES } from "@/lib/constants";
import { uploadImage } from "@/lib/upload-image";
import { useRouter } from "next/navigation";

export default function AddServiceForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [servicePreview, setServicePreview] = useState("");
    const router = useRouter();

    useEffect(() => {
        return () => {
            if (servicePreview) URL.revokeObjectURL(servicePreview);
        };
    }, [servicePreview]);

    async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
        event.preventDefault();
        setIsSubmitting(true);

        try {
            const formData = new FormData(event.currentTarget);
            const serviceImage = formData.get("serviceImage");

            if (!(serviceImage instanceof File) || serviceImage.size === 0) {
                toast.error("Choose one service image.");
                return;
            }

            const imageUrl = await uploadImage(serviceImage);

            const service = {
                serviceName: String(formData.get("serviceName") ?? ""),
                category: String(formData.get("category") ?? ""),
                price: Number(formData.get("startingPrice") ?? 0),
                location: String(formData.get("location") ?? ""),
                description: String(formData.get("description") ?? ""),
                images: [imageUrl],
            };

            console.log("New service:", service);
            const result = await createService(service);
            console.log("Create service response:", result);
            toast.success("Service submitted for review.");
            router.refresh();
        } catch (error) {
            toast.error(
                error instanceof Error
                    ? error.message
                    : "Could not create the service.",
            );
        } finally {
            setIsSubmitting(false);
            setServicePreview("");
        }
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="rounded-xl border border-border bg-card p-6 shadow-sm"
        >
            <h2 className="font-heading text-xl font-medium text-ink">
                The essentials
            </h2>

            <div className="mt-6 space-y-5">
                <div className="space-y-2">
                    <label
                        htmlFor="service-name"
                        className="block text-xs font-medium text-ink"
                    >
                        Service name <span className="text-destructive">*</span>
                    </label>
                    <input
                        id="service-name"
                        name="serviceName"
                        type="text"
                        placeholder="e.g. Charleston Wedding Venue"
                        required
                        className="h-10 w-full rounded-md border border-border bg-white px-3 text-sm outline-none focus:border-plum-soft focus:ring-3 focus:ring-plum-soft/30"
                    />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                        <label
                            htmlFor="category"
                            className="block text-xs font-medium text-ink"
                        >
                            Category <span className="text-destructive">*</span>
                        </label>
                        <select
                            id="category"
                            name="category"
                            defaultValue=""
                            required
                            className="h-10 w-full cursor-pointer rounded-md border border-border bg-white px-3 text-sm outline-none focus:border-plum-soft focus:ring-3 focus:ring-plum-soft/30"
                        >
                            {CATEGORIES.map((category) => (
                                <option key={category} value={category}>
                                    {category}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label
                            htmlFor="starting-price"
                            className="block text-xs font-medium text-ink"
                        >
                            Starting price ($) <span className="text-destructive">*</span>
                        </label>
                        <input
                            id="starting-price"
                            name="startingPrice"
                            type="number"
                            min="0"
                            placeholder="0"
                            required
                            className="h-10 w-full rounded-md border border-border bg-white px-3 text-sm outline-none focus:border-plum-soft focus:ring-3 focus:ring-plum-soft/30"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label
                        htmlFor="location"
                        className="block text-xs font-medium text-ink"
                    >
                        Location <span className="text-destructive">*</span>
                    </label>
                    <input
                        id="location"
                        name="location"
                        type="text"
                        placeholder="e.g.  Dakha, Bangladesh"
                        required
                        className="h-10 w-full rounded-md border border-border bg-white px-3 text-sm outline-none focus:border-plum-soft focus:ring-3 focus:ring-plum-soft/30"
                    />
                </div>

                <div className="space-y-2">
                    <label
                        htmlFor="description"
                        className="block text-xs font-medium text-ink"
                    >
                        Description <span className="text-destructive">*</span>
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        rows={5}
                        required
                        placeholder="Tell couples what makes your service special. Include your package details, what's included, and what to expect."
                        className="w-full resize-none rounded-md border border-border bg-white px-3 py-2.5 text-sm outline-none placeholder:text-muted-foreground/70 focus:border-plum-soft focus:ring-3 focus:ring-plum-soft/30"
                    />
                </div>

                <div className="space-y-2">
                    <label className="block text-xs font-medium text-ink">
                        Service images <span className="text-destructive">*</span>
                    </label>
                    <label
                        htmlFor="service-images"
                        className="flex h-36 cursor-pointer flex-col items-center justify-center rounded-md border border-dashed border-plum-soft/70 bg-plum-tint/20 text-sm"
                    >
                        {servicePreview ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                                src={servicePreview}
                                alt="Selected service preview"
                                className="h-full w-full rounded-md object-cover"
                            />
                        ) : (
                            <>
                                <span className="mb-2 text-lg text-plum">↑</span>
                                <span className="font-medium text-ink">
                                    Choose images or drag them here
                                </span>
                                <span className="mt-2 text-[10px] text-muted-foreground">
                                    JPG, PNG or WebP · Up to 5 MB per image
                                </span>
                            </>
                        )}
                    </label>
                    <input
                        id="service-images"
                        name="serviceImage"
                        type="file"
                        accept="image/jpeg,image/png,image/webp"
                        required
                        className="sr-only"
                        onChange={(event) => {
                            const file = event.target.files?.[0] ?? null;
                            setServicePreview((current) => {
                                if (current) URL.revokeObjectURL(current);
                                return file ? URL.createObjectURL(file) : "";
                            });
                        }}
                    />
                </div>
            </div>

            <div className="mt-6 grid grid-cols-[150px_1fr] gap-3">
                <button
                    type="reset"
                    className="h-10 cursor-pointer rounded-md border border-border bg-white text-xs font-medium text-ink"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="h-10 cursor-pointer rounded-md bg-primary text-xs font-medium text-primary-foreground"
                >
                    {isSubmitting ? "Uploading..." : "Submit for review →"}
                </button>
            </div>
        </form>
    );
}
