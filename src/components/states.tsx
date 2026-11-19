import { Loader2, SearchX, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export function LoadingBlock({ text = "Loading..." }: { text?: string }) {
    return (
        <div className="flex min-h-[40vh] flex-col items-center justify-center gap-3 text-muted-foreground">
            <Loader2 className="size-7 animate-spin text-primary" />
            <p className="text-sm">{text}</p>
        </div>
    );
}

// Grey placeholder cards while services load
export function CardSkeletons({ count = 6 }: { count?: number }) {
    return (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: count }).map((_, i) => (
                <div key={i} className="space-y-3">
                    <Skeleton className="aspect-4/3 w-full rounded-xl" />
                    <Skeleton className="h-5 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                </div>
            ))}
        </div>
    );
}

export function EmptyState({
    title,
    text,
    action,
}: {
    title: string;
    text?: string;
    action?: React.ReactNode;
}) {
    return (
        <div className="flex flex-col items-center rounded-xl border border-dashed bg-card px-6 py-14 text-center">
            <SearchX className="mb-3 size-9 text-primary/60" />
            <h3 className="text-2xl">{title}</h3>
            {text && (
                <p className="mt-1 max-w-md text-sm text-muted-foreground">
                    {text}
                </p>
            )}
            {action && <div className="mt-5">{action}</div>}
        </div>
    );
}

export function ErrorState({
    message,
    onRetry,
}: {
    message: string;
    onRetry?: () => void;
}) {
    return (
        <div className="flex flex-col items-center rounded-xl border border-destructive/30 bg-card px-6 py-12 text-center">
            <AlertCircle className="mb-3 size-9 text-destructive" />
            <h3 className="text-2xl">Something went wrong</h3>
            <p className="mt-1 max-w-md text-sm text-muted-foreground">
                {message}
            </p>
            {onRetry && (
                <Button variant="outline" className="mt-5" onClick={onRetry}>
                    Try again
                </Button>
            )}
        </div>
    );
}
