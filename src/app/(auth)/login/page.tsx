"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

export default function LoginPage() {
    return (
        <div className="min-h-screen grid lg:grid-cols-2 bg-[#FAFAFA]">
            <div className="flex flex-col justify-center items-center p-8">
                <Link href="/" className="mb-12 absolute top-8 left-8 text-emerald-700 font-bold text-2xl tracking-tight">
                    HS Xpert
                </Link>

                <div className="w-full max-w-md">
                    <Card className="border-none shadow-lg bg-white/80 backdrop-blur-sm rounded-2xl">
                        <CardHeader className="space-y-2">
                            <CardTitle className="text-3xl font-bold text-slate-900 tracking-tight">Login</CardTitle>
                            <CardDescription className="text-base text-slate-500">
                                Acesse seu painel familiar HS Xpert.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-5">
                                <div className="space-y-2">
                                    <Label htmlFor="email" className="text-slate-700 font-medium">E-mail</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="voce@familia.com"
                                        required
                                        className="h-12 border-slate-200 focus-visible:ring-emerald-500"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <Label htmlFor="password" className="text-slate-700 font-medium">Senha</Label>
                                        <Link href="#" className="text-sm font-medium text-emerald-600 hover:text-emerald-700 hover:underline">
                                            Esqueceu a senha?
                                        </Link>
                                    </div>
                                    <Input
                                        id="password"
                                        type="password"
                                        required
                                        className="h-12 border-slate-200 focus-visible:ring-emerald-500"
                                    />
                                </div>
                                <div className="relative">
                                    <div className="absolute inset-0 flex items-center">
                                        <span className="w-full border-t border-slate-200" />
                                    </div>
                                    <div className="relative flex justify-center text-xs uppercase">
                                        <span className="bg-white px-2 text-slate-500 font-medium">Ou continue com</span>
                                    </div>
                                </div>

                                <Button
                                    variant="outline"
                                    className="w-full h-12 border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold rounded-xl flex items-center justify-center gap-3 transition-all"
                                    onClick={() => {
                                        console.log("Iniciando login com Google...");
                                        // TODO: Implementar lógica de OAuth
                                    }}
                                >
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
                                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                                    </svg>
                                    Google
                                </Button>

                                <Link href="/admin" className="block w-full">
                                    <Button className="w-full h-12 text-base font-semibold bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl">
                                        Fazer Login (Simulação)
                                    </Button>
                                </Link>
                            </div>
                        </CardContent>
                        <CardFooter className="flex flex-col space-y-4 text-center">
                            <div className="text-sm text-slate-500 mt-4">
                                Ainda não tem uma conta?{' '}
                                <Link href="/register" className="text-emerald-600 font-semibold hover:underline">
                                    Começar Grátis
                                </Link>
                            </div>
                        </CardFooter>
                    </Card>
                </div>
            </div>

            <div className="hidden lg:flex flex-col justify-center bg-emerald-900 p-12 text-white relative overflow-hidden">
                {/* Decorative background circle */}
                <div className="absolute -top-32 -right-32 w-96 h-96 bg-emerald-800 rounded-full blur-3xl opacity-50"></div>
                <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-emerald-700 rounded-full blur-3xl opacity-30"></div>

                <div className="relative z-10 max-w-xl">
                    <h2 className="text-4xl font-bold mb-6">Organize, Valide e Gamifique o Homeschooling.</h2>
                    <p className="text-emerald-100 text-lg mb-8 leading-relaxed">
                        Bem-vindo ao HS Xpert. Ajudamos tutores educadores a focar no que realmente importa: a jornada de aprendizado do aluno, deixando a gestão e a papelada com nosso sistema.
                    </p>
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="h-2 w-2 bg-emerald-400 rounded-full"></div>
                            <span className="text-emerald-50">Evidências aceitas pelas coordenações educacionais</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="h-2 w-2 bg-emerald-400 rounded-full"></div>
                            <span className="text-emerald-50">Resumos criados por Inteligência Artificial Pedagógica</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="h-2 w-2 bg-emerald-400 rounded-full"></div>
                            <span className="text-emerald-50">Isolamento total e seguro por painel familiar</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
