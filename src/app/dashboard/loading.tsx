import { LoadingBlock } from "@/components/states";

export default function DashboardLoading() {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80">
            <LoadingBlock text="Loading your workspace..." />;
        </div>
    );
}
