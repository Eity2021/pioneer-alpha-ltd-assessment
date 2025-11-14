import Sidebar from '@/components/sidebar/Sidebar';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex h-screen">
            <aside className="w-64 fixed h-full bg-blue-900 text-white">
                <Sidebar />
            </aside>
            <main className="ml-64 flex-1 overflow-auto bg-gray-50 p-6">
                {children}
            </main>
        </div>
    );
}
