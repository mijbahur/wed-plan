import { Suspense } from "react";
import ProfileSettingsContent from "@/components/profile-settings-content";

export const instant = false;

export default function ProfileSettingsPage() {
    return (
        <Suspense
            fallback={
                <p className="text-sm text-muted-foreground">
                    Loading profile settings...
                </p>
            }
        >
            <ProfileSettingsContent />
        </Suspense>
    );
}
