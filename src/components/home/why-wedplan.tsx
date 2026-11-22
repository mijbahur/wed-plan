const benefits = [
    {
        number: "01",
        title: "People you can count on",
        description:
            "Discover approved wedding professionals who care about your day as much as you do.",
    },
    {
        number: "02",
        title: "A match for your vision",
        description:
            "Explore every style, location, and budget. Find the details that feel uniquely yours.",
    },
    {
        number: "03",
        title: "Everything, together",
        description:
            "Send requests and keep every booking in one calm, beautifully organized space.",
    },
];

export default function WhyWedPlan() {
    return (
        <section className="bg-plum-tint px-4 py-16 sm:px-8 md:py-24">
            <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-2 md:gap-16">
                <div>
                    <p className="text-[10px] font-medium uppercase tracking-wider text-plum">
                        Less overwhelm. More joy.
                    </p>

                    <h2 className="mt-5 max-w-md font-heading text-4xl leading-tight text-foreground sm:text-5xl">
                        Big plans.
                        <br />A little peace of mind.
                    </h2>
                </div>

                <div className="grid gap-8 sm:grid-cols-2">
                    {benefits.map((benefit) => (
                        <div key={benefit.number}>
                            <span className="text-[10px] text-plum">
                                {benefit.number}
                            </span>

                            <h3 className="mt-3 text-base font-medium text-foreground">
                                {benefit.title}
                            </h3>

                            <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                                {benefit.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
