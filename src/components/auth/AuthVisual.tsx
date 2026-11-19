import Image from "next/image";
import Link from "next/link";

type AuthVisualProps = {
    image: string;
};

export function AuthVisual({ image }: AuthVisualProps) {
    return (
        <aside className="relative hidden min-h-[calc(100dvh-0px)] overflow-hidden lg:block">
            <Image
                src={image}
                alt=""
                fill
                priority
                sizes="44vw"
                className="object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-b from-black/10 via-transparent to-black/35" />

            <Link
                href="/"
                aria-label="WedPlan home"
                className="absolute top-8 left-9 font-heading text-xl font-semibold tracking-tight text-white"
            >
                WedPlan
            </Link>

            <div className="absolute right-10 bottom-12 left-12 text-white">
                <p className="font-heading text-5xl leading-[0.98] font-normal">
                    Your people.
                    <br />
                    Your forever.
                </p>
                <p className="mt-7 font-sans text-sm text-white/90">
                    A thoughtful beginning to your most beautiful chapter.
                </p>
            </div>
        </aside>
    );
}
