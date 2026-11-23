import ProfileSettingsForm from "@/components/profile-settings-form";
import Reveal from "@/components/ui/reveal";
import { getMyProfile } from "@/lib/api/profile";

export default async function ProfileSettingsContent() {
    const profile = await getMyProfile();
    return (
        <Reveal>
            <ProfileSettingsForm initialProfile={profile} />
        </Reveal>
    );
}
