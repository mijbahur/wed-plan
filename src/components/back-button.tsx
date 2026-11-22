"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function BackButton() {
    const router = useRouter();

    return (
        <button
            onClick={() => router.back()}
            className="flex h-11 items-center justify-center gap-2 rounded-md bg-plum px-4 text-xs font-medium text-white transition-colors hover:bg-plum-dark"
        >
            <ArrowLeft size={14} />
            Go Back
        </button>
    );
}
