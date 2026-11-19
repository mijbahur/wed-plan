import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";

export default function PublicLayout({ children }: LayoutProps<"/">) {
    return (
        <div className="flex min-h-dvh flex-1 flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
        </div>
    );
}
