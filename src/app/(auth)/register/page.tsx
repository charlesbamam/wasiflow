"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

export default function RegisterPage() {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="min-h-screen grid lg:grid-cols-2 bg-[#FAFAFA]">
            <div className="flex flex-col justify-center items-center p-8 relative">
                <Link href="/" className="mb-12 absolute top-8 left-8">
                    <div className="relative w-40 h-10">
                        <Image 
                            src="/wasiflow_logo_1.png" 
                            alt="Wasiflow Logo" 
                            fill
                            className="object-contain"
                        />
                    </div>
                </Link>

                <div className="w-full max-w-md mt-16 lg:mt-0">
                    <Card className="border-none shadow-lg bg-white/50 backdrop-blur-md rounded-[32px]">
                        <CardHeader className="space-y-1 text-center pb-8">
                            <CardTitle className="text-4xl font-extrabold text-[#0B0B0B] tracking-tight">Criar Conta</CardTitle>
                            <CardDescription className="text-lg text-slate-500 font-medium pt-2">
                                Organize e controle a educação domiciliar de forma simples e segura.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-6">
                                <Button
                                    variant="outline"
                                    className="w-full h-14 border-slate-200 hover:bg-slate-50 text-slate-700 font-bold rounded-2xl flex items-center justify-center gap-3 transition-all text-lg mb-6"
                                >
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
                                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                                    </svg>
                                    Registrar com Google
                                </Button>

                                <div className="relative py-2">
                                    <div className="absolute inset-0 flex items-center">
                                        <span className="w-full border-t border-slate-200" />
                                    </div>
                                    <div className="relative flex justify-center text-[10px] uppercase tracking-widest font-bold">
                                        <span className="bg-white/50 px-4 text-slate-400">Ou use seu e-mail</span>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="name" className="text-slate-700 font-bold uppercase tracking-wider text-[11px]">Nome Completo</Label>
                                    <Input
                                        id="name"
                                        placeholder="Seu nome"
                                        required
                                        className="h-14 border border-slate-200 bg-white/50 rounded-2xl focus-visible:ring-emerald-500 text-lg"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email" className="text-slate-700 font-bold uppercase tracking-wider text-[11px]">E-mail</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="voce@email.com"
                                        required
                                        className="h-14 border border-slate-200 bg-white/50 rounded-2xl focus-visible:ring-emerald-500 text-lg"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="password" className="text-slate-700 font-bold uppercase tracking-wider text-[11px]">Senha</Label>
                                    <div className="relative">
                                        <Input
                                            id="password"
                                            type={showPassword ? "text" : "password"}
                                            required
                                            className="h-14 border border-slate-200 bg-white/50 rounded-2xl focus-visible:ring-emerald-500 pr-12"
                                        />
                                        <button 
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-emerald-600 transition-colors"
                                        >
                                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                        </button>
                                    </div>
                                </div>
                                <Link href="/onboarding" className="block w-full">
                                    <Button className="w-full h-14 text-lg font-bold bg-[#0E625E] hover:bg-[#C8B289] hover:text-[#0E625E] text-white rounded-2xl mt-4 shadow-xl shadow-emerald-900/10 transition-all">
                                        Criar minha conta
                                    </Button>
                                </Link>
                            </div>
                        </CardContent>
                        <CardFooter className="flex flex-col space-y-4 text-center">
                            <div className="text-sm text-slate-500 font-medium">
                                Já tem uma conta?{' '}
                                <Link href="/login" className="text-[#0E625E] font-bold hover:underline">
                                    Entrar
                                </Link>
                            </div>
                        </CardFooter>
                    </Card>
                </div>
            </div>

            <div className="hidden lg:flex flex-col justify-center p-20 text-white relative overflow-hidden">
                <Image 
                    src="/registration_hero.png" 
                    alt="Registration Hero" 
                    fill 
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-emerald-950/70 backdrop-blur-[2px] z-0"></div>
                
                <div className="relative z-10 max-w-xl">
                    <h2 className="text-5xl font-extrabold mb-8 tracking-tight leading-tight">Eduque em casa com segurança.</h2>
                    <p className="text-emerald-50/90 text-xl mb-8 leading-relaxed font-medium">
                        Crie o diário de bordo perfeito dos seus filhos, gamifique as atividades para motivar o aprendizado e tenha o apoio de um assistente pedagógico de Inteligência Artificial para planejar cada passo.
                    </p>
                    
                    <div className="pt-8 flex items-center gap-4 text-emerald-200">
                        <div className="w-12 h-0.5 bg-emerald-500"></div>
                        <span className="font-bold tracking-[0.2em] text-xs uppercase">Seu parceiro no Homeschooling</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
