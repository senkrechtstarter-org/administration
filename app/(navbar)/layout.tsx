import "@/app/components/global.css";
import NavigationBar from "../components/NavigationBar";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div>
            <NavigationBar />
            <main className="flex-grow p-6 md:overflow-y-auto md:p-12">
                {children}
            </main>
        </div>
    );
}
