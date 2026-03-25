"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, Users, Target, ArrowRight, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function OnboardingPage() {
    const [step, setStep] = useState(1);
    const [kids, setKids] = useState([""]);
    
    const nextStep = () => setStep(prev => prev + 1);
    
    const addKidField = () => setKids([...kids, ""]);
    const updateKid = (index: number, val: string) => {
        const newKids = [...kids];
        newKids[index] = val;
        setKids(newKids);
    };

    return (
        <div className="min-h-screen bg-[#FAFAFA] flex flex-col items-center justify-center p-4 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-emerald-50 rounded-full blur-3xl opacity-50"></div>
                <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-amber-50 rounded-full blur-3xl opacity-50"></div>
            </div>

            <div className="w-full max-w-2xl relative z-10">
                <div className="flex justify-center mb-12">
                    <div className="relative w-48 h-12">
                        <Image 
                            src="/wasiflow_logo_1.png" 
                            alt="Wasiflow Logo" 
                            fill
                            className="object-contain"
                        />
                    </div>
                </div>

                <AnimatePresence mode="wait">
                    {step === 1 && (
                        <motion.div
                            key="step1"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="text-center"
                        >
                            <h1 className="text-5xl font-extrabold text-[#0B0B0B] mb-6 tracking-tight">
                                Seja bem-vindo à família Wasiflow.
                            </h1>
                            <p className="text-xl text-slate-500 mb-12 leading-relaxed max-w-lg mx-auto font-medium">
                                Vamos preparar o terreno para a jornada educativa dos seus filhos de um jeito simples e profissional.
                            </p>
                            
                            <Button 
                                onClick={nextStep}
                                className="h-16 px-12 text-xl font-bold bg-[#0E625E] hover:bg-[#C8B289] hover:text-[#0E625E] text-white rounded-3xl shadow-xl shadow-emerald-900/10 transition-all group"
                            >
                                Vamos lá
                                <ArrowRight className="ml-3 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </motion.div>
                    )}

                    {step === 2 && (
                        <motion.div
                            key="step2"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                        >
                            <Card className="border-none shadow-2xl bg-white/70 backdrop-blur-xl rounded-[40px] p-8 md:p-12">
                                <CardContent className="p-0">
                                    <div className="flex items-center gap-4 mb-8">
                                        <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-700">
                                            <Users size={24} />
                                        </div>
                                        <h2 className="text-3xl font-bold text-[#0B0B0B]">Pequenos Estudantes</h2>
                                    </div>
                                    
                                    <p className="text-lg text-slate-500 mb-8 font-medium">
                                        Quem são as estrelas da nossa jornada? Adicione o nome dos seus filhos/alunos:
                                    </p>

                                    <div className="space-y-4 mb-8">
                                        {kids.map((kid, idx) => (
                                            <motion.div 
                                                key={idx}
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                            >
                                                <Input 
                                                    placeholder="Nome da criança" 
                                                    value={kid}
                                                    onChange={(e) => updateKid(idx, e.target.value)}
                                                    className="h-16 border-slate-200 bg-white rounded-2xl shadow-sm text-lg px-6"
                                                />
                                            </motion.div>
                                        ))}
                                        <Button 
                                            variant="ghost" 
                                            onClick={addKidField}
                                            className="text-emerald-700 font-bold hover:bg-emerald-50 rounded-xl"
                                        >
                                            + Adicionar outro filho
                                        </Button>
                                    </div>

                                    <Button 
                                        onClick={nextStep}
                                        disabled={!kids[0]}
                                        className="w-full h-16 text-xl font-bold bg-[#0E625E] hover:bg-[#C8B289] hover:text-[#0E625E] text-white rounded-2xl shadow-lg transition-all"
                                    >
                                        Continuar
                                    </Button>
                                </CardContent>
                            </Card>
                        </motion.div>
                    )}

                    {step === 3 && (
                        <motion.div
                            key="step3"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.05 }}
                        >
                            <Card className="border-none shadow-2xl bg-white/70 backdrop-blur-xl rounded-[40px] p-8 md:p-12 text-center">
                                <CardContent className="p-0">
                                    <div className="flex justify-center mb-8">
                                        <div className="w-20 h-20 bg-emerald-100 rounded-3xl flex items-center justify-center text-emerald-700 shadow-inner">
                                            <CheckCircle2 size={40} />
                                        </div>
                                    </div>
                                    
                                    <h2 className="text-4xl font-extrabold text-[#0B0B0B] mb-4">Tudo pronto!</h2>
                                    <p className="text-xl text-slate-500 mb-12 font-medium">
                                        Seu painel educacional foi preparado. <br/>
                                        Estamos prontos para transformar o aprendizado de <span className="text-[#0E625E] font-bold">{kids.filter(k => k).join(" e ")}</span>.
                                    </p>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
                                        <div className="p-6 bg-white/50 border border-emerald-100 rounded-3xl flex items-center gap-4 text-left">
                                            <div className="w-10 h-10 bg-white shadow-sm rounded-xl flex items-center justify-center text-amber-500">
                                                <Target size={20} />
                                            </div>
                                            <div>
                                                <p className="font-bold text-[#0B0B0B]">Crie sua 1ª tarefa</p>
                                                <p className="text-xs text-slate-500">Comece organizando o dia.</p>
                                            </div>
                                        </div>
                                        <div className="p-6 bg-white/50 border border-emerald-100 rounded-3xl flex items-center gap-4 text-left">
                                            <div className="w-10 h-10 bg-white shadow-sm rounded-xl flex items-center justify-center text-blue-500">
                                                <Sparkles size={20} />
                                            </div>
                                            <div>
                                                <p className="font-bold text-[#0B0B0B]">Fale com a IA</p>
                                                <p className="text-xs text-slate-500">Seu assistente pedagógico.</p>
                                            </div>
                                        </div>
                                    </div>

                                    <Link href="/admin">
                                        <Button 
                                            onClick={() => {
                                                const validKids = kids.filter(k => k.trim() !== "");
                                                if (validKids.length > 0) {
                                                    localStorage.setItem("wasiflow_onboarding_students", JSON.stringify(validKids));
                                                }
                                            }}
                                            className="w-full h-16 text-xl font-bold bg-[#0E625E] hover:bg-[#C8B289] hover:text-[#0E625E] text-white rounded-2xl shadow-lg transition-all"
                                        >
                                            Entrar no Painel
                                        </Button>
                                    </Link>
                                </CardContent>
                            </Card>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Progress Indicators */}
                <div className="flex justify-center gap-3 mt-12">
                    {[1, 2, 3].map(i => (
                        <div 
                            key={i}
                            className={`h-2 rounded-full transition-all duration-300 ${step === i ? 'w-8 bg-[#0E625E]' : 'w-2 bg-slate-200'}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
