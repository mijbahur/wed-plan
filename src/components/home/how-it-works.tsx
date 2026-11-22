const steps = [
    {
        number: "01",
        title: "Discover your people",
        description: "Browse our curated services and find your favorites.",
    },
    {
        number: "02",
        title: "Make the connection",
        description: "Share your date and vision with your chosen vendors.",
    },
    {
        number: "03",
        title: "Bring it all together",
        description: "Track your requests. Celebrate every little yes.",
    },
];

export default function HowItWorks() {
    return (
        <section className="bg-background px-4 py-16 sm:px-8 md:py-24">
            <div className="mx-auto max-w-7xl">
                <p className="text-[10px] font-medium uppercase tracking-wider text-plum">
                    From &quot;What if&quot; to &quot;I do&quot;
                </p>

                <h2 className="mt-5 font-heading text-3xl leading-tight text-foreground sm:text-4xl">
                    A beautiful day starts with three simple steps.
                </h2>

                <div className="mt-10 grid gap-8 md:grid-cols-3 md:gap-10">
                    {steps.map((step) => (
                        <div key={step.number} className="flex gap-5">
                            <span className="font-heading text-xl text-plum">
                                {step.number}
                            </span>

                            <div>
                                <h3 className="text-sm font-medium text-foreground">
                                    {step.title}
                                </h3>

                                <p className="mt-2 max-w-xs text-xs leading-relaxed text-muted-foreground">
                                    {step.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
