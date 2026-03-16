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

export default function RegisterPage() {
    return (
        <div className="min-h-screen grid lg:grid-cols-2 bg-[#FAFAFA]">
            <div className="flex flex-col justify-center items-center p-8 relative">
                <Link href="/" className="mb-12 absolute top-8 left-8 text-emerald-700 font-bold text-2xl tracking-tight">
                    Wasiflow
                </Link>

                <div className="w-full max-w-md">
                    <Card className="border-none shadow-lg bg-white/80 backdrop-blur-sm rounded-2xl">
                        <CardHeader className="space-y-1 text-center">
                            <CardTitle className="text-3xl font-bold text-slate-900 tracking-tight">Criar Conta</CardTitle>
                            <CardDescription className="text-base text-slate-500">
                                Comece sua jornada educativa com a Wasiflow hoje.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-5">
                                <div className="space-y-2">
                                    <Label htmlFor="name" className="text-slate-700 font-medium">Nome Completo</Label>
                                    <Input
                                        id="name"
                                        placeholder="Seu nome"
                                        required
                                        className="h-12 border-slate-200 focus-visible:ring-emerald-500"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email" className="text-slate-700 font-medium">E-mail Familiar</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="voce@familia.com"
                                        required
                                        className="h-12 border-slate-200 focus-visible:ring-emerald-500"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="password" className="text-slate-700 font-medium">Senha</Label>
                                    <Input
                                        id="password"
                                        type="password"
                                        required
                                        className="h-12 border-slate-200 focus-visible:ring-emerald-500"
                                    />
                                </div>
                                <Link href="/login" className="block w-full">
                                    <Button className="w-full h-12 text-base font-semibold bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl mt-4">
                                        Criar minha Família (Simulação)
                                    </Button>
                                </Link>
                            </div>
                        </CardContent>
                        <CardFooter className="flex flex-col space-y-4 text-center">
                            <div className="text-sm text-slate-500 mt-4">
                                Já tem uma conta?{' '}
                                <Link href="/login" className="text-emerald-600 font-semibold hover:underline">
                                    Entrar
                                </Link>
                            </div>
                        </CardFooter>
                    </Card>
                </div>
            </div>

            <div className="hidden lg:flex flex-col justify-center bg-emerald-900 p-12 text-white relative overflow-hidden">
                <div className="absolute -top-32 -right-32 w-96 h-96 bg-emerald-800 rounded-full blur-3xl opacity-50"></div>
                <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-emerald-700 rounded-full blur-3xl opacity-30"></div>

                <div className="relative z-10 max-w-xl">
                    <h2 className="text-4xl font-bold mb-6">Eduque em casa com segurança.</h2>
                    <p className="text-emerald-100 text-lg mb-8 leading-relaxed">
                        Crie o diário de bordo perfeito dos seus filhos, gamifique as atividades com inteligência artificial e mantenha seu acervo protegido e isolado, livre de mensalidades surpresa por 12 meses no plano Founder.
                    </p>
                </div>
            </div>
        </div>
    );
}
