import { cn } from "@/lib/utils";
import Image from "next/image";

export function UserAvatar({
    name,
    image,
    className,
}: {
    name: string;
    image?: string | null;
    className?: string;
}) {
    return image ? (
        <Image
            src={image}
            alt={name}
            width={36}
            height={36}
            className={cn("size-9 rounded-full object-cover", className)}
        />
    ) : (
        <span
            className={cn(
                "flex size-9 items-center justify-center rounded-full bg-primary text-sm font-medium text-primary-foreground",
                className,
            )}
        >
            {name?.[0]?.toUpperCase() || "U"}
        </span>
    );
}
