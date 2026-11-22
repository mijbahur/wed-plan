import CategorySection from "@/components/home/category-section";
import FeaturedServices from "@/components/home/featured-services";
import Hero from "@/components/home/hero";
import HomeCTA from "@/components/home/home-cta";
import HowItWorks from "@/components/home/how-it-works";
import WhyWedPlan from "@/components/home/why-wedplan";

export default function HomePage() {
    return (
        <>
            <Hero />
            <FeaturedServices />
            <CategorySection />
            <WhyWedPlan />
            <div id="how-it-works">
                <HowItWorks />
            </div>
            <HomeCTA />
        </>
    );
}
