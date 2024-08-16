import "@/app/components/global.css";
import NavigationBar from "../components/NavigationBar";

export default function NavbarLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex-grow p-6 md:overflow-y-auto md:p-12">
            <NavigationBar />
            {children}
        </div>
    );
}
