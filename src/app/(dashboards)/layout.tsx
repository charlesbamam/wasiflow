import Image from "next/image";
import Link from "next/link";
import {
    CreditCard,
    LayoutDashboard,
    Settings,
    Users,
    BookOpen,
    MessageSquare,
    LogOut
} from "lucide-react";

export default function DashboardsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex h-screen bg-[#FAFAFA] text-slate-800">
            {/* Sidebar Navigation */}
            <aside className="w-64 border-r bg-white flex flex-col hidden md:flex">
                <div className="h-16 flex items-center px-6 border-b">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="relative w-32 h-8">
                            <Image 
                                src="/wasiflow_logo_1.png" 
                                alt="Wasiflow Logo" 
                                fill
                                className="object-contain"
                                priority
                            />
                        </div>
                    </Link>
                </div>

                <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
                    <div className="mb-6">
                        <p className="px-2 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Simulação de Modos</p>
                        <Link href="/admin" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md hover:bg-emerald-50 text-slate-700 hover:text-emerald-700">
                            <LayoutDashboard size={18} />
                            Visão Tutor
                        </Link>
                        <Link href="/assistant" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md hover:bg-emerald-50 text-slate-700 hover:text-emerald-700">
                            <Users size={18} />
                            Visão Auxiliar
                        </Link>
                        <Link href="/student" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md hover:bg-emerald-50 text-slate-700 hover:text-emerald-700">
                            <BookOpen size={18} />
                            Visão Aluno
                        </Link>
                    </div>

                    <div>
                        <p className="px-2 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Módulos</p>
                        <Link href="#" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md hover:bg-emerald-50 text-slate-700 hover:text-emerald-700">
                            <MessageSquare size={18} />
                            Assistente IA
                        </Link>
                        <Link href="#" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md hover:bg-emerald-50 text-slate-700 hover:text-emerald-700">
                            <CreditCard size={18} />
                            Assinatura
                        </Link>
                    </div>
                </nav>

                <div className="p-4 border-t">
                    <Link href="/">
                        <button className="flex items-center gap-3 px-3 py-2 w-full text-sm font-medium rounded-md text-red-600 hover:bg-red-50 transition-colors">
                            <LogOut size={18} />
                            Sair
                        </button>
                    </Link>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 overflow-y-auto">
                {children}
            </main>
        </div>
    );
}
