"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquareWarning, CheckCircle2 } from "lucide-react";

export default function AssistantDashboardPage() {
    const [tutorMessage, setTutorMessage] = useState<string | null>(null);
    const [messageTime, setMessageTime] = useState<string | null>(null);
    const [isMessageRead, setIsMessageRead] = useState<boolean>(false);

    useEffect(() => {
        const msg = localStorage.getItem("tutorMessage");
        const time = localStorage.getItem("tutorTime");
        const read = localStorage.getItem("tutorMessageRead") === "true";
        if (msg) setTutorMessage(msg);
        if (time) setMessageTime(time);
        setIsMessageRead(read);
    }, []);

    const markAsRead = () => {
        localStorage.setItem("tutorMessageRead", "true");
        setIsMessageRead(true);
    };

    return (
        <div className="flex-1 p-8 bg-[#FAFAFA] min-h-screen">
            <div className="max-w-6xl mx-auto space-y-8">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Painel do Auxiliar</h1>
                        <p className="text-slate-500 mt-2 text-lg">
                            Você está auxiliando a Família Silva no desenvolvimento educacional.
                        </p>
                    </div>
                    <Button className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-md">Registrar Nova Evidência</Button>
                </div>

                {/* Área de Recados da Direção / Tutor */}
                <Card className="border-amber-200 border-2 bg-amber-50">
                    <CardHeader className="pb-3">
                        <CardTitle className="text-amber-800 flex items-center gap-2">
                            <MessageSquareWarning className="h-5 w-5" /> Quadro de Avisos (Família Silva)
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="bg-white p-4 rounded-lg border border-amber-100 shadow-sm relative">
                            <div className="absolute top-4 right-4 text-xs font-bold text-amber-500">{messageTime || "HOJE, 10:15"}</div>
                            <p className="text-slate-700 font-medium italic mb-4">
                                "{tutorMessage || "Por favor, foque em matemática hoje com o Joãozinho, ele estava com dificuldades na tabuada de 7."}"
                            </p>
                            <div className="flex items-center justify-between border-t border-slate-100 pt-3">
                                <p className="text-sm font-bold text-slate-900">— Izabel (Tutor Administrador)</p>
                                {!isMessageRead ? (
                                    <Button onClick={markAsRead} size="sm" className="bg-amber-500 hover:bg-amber-600 text-white font-bold h-8">
                                        <CheckCircle2 className="w-4 h-4 mr-1" /> Marcar como ciente
                                    </Button>
                                ) : (
                                    <span className="text-xs font-bold text-emerald-600 flex items-center bg-emerald-50 px-2 py-1 rounded-full border border-emerald-200">
                                        <CheckCircle2 className="w-4 h-4 mr-1" /> Você leu este aviso
                                    </span>
                                )}
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <div className="grid gap-6 md:grid-cols-3">
                    <Card className="shadow-sm border-slate-200">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-bold text-slate-700">Turma Ativa</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-extrabold text-emerald-600">2 Alunos</div>
                            <p className="text-sm text-slate-500 mt-1 font-medium">Joãozinho e Mariazinha</p>
                        </CardContent>
                    </Card>

                    <Card className="shadow-sm border-slate-200">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-bold text-slate-700">Registros Lançados (Nesta Semana)</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-extrabold text-slate-800">8</div>
                            <p className="text-sm text-emerald-600 mt-1 font-bold">100% Sincronizados</p>
                        </CardContent>
                    </Card>

                    <Card className="shadow-sm border-emerald-100 bg-emerald-50/50">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-bold text-emerald-800">Assistente IA Pedagógico</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-xs text-slate-500 mb-3">Tire dúvidas sobre metodologias ou plano de aula.</p>
                            <Button className="w-full bg-emerald-600 hover:bg-emerald-700 flex items-center justify-center gap-2 shadow-sm text-white">
                                Abrir Chat de Suporte
                            </Button>
                        </CardContent>
                    </Card>
                </div>

                <Card className="shadow-md border-slate-200">
                    <CardHeader className="bg-slate-50/50 border-b border-slate-100 rounded-t-xl">
                        <CardTitle>Histórico de Lições & Evidências Repassadas</CardTitle>
                        <CardDescription>O que você já reportou para o painel principal da família.</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-6">
                        <div className="space-y-4">
                            {[
                                { title: "Aula Prática: Sistemas Solares", kid: "Mariazinha", time: "Ontem, 16:00", init: "M", color: "bg-pink-100 text-pink-600" },
                                { title: "Matemática - Frações Base", kid: "Joãozinho", time: "Ontem, 14:00", init: "J", color: "bg-blue-100 text-blue-600" },
                                { title: "Leitura Compartilhada", kid: "Mariazinha", time: "Segunda, 09:30", init: "M", color: "bg-pink-100 text-pink-600" }
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-4 bg-white border border-slate-200 p-4 rounded-xl hover:border-emerald-300 transition-colors shadow-sm cursor-pointer group">
                                    <div className={`h-12 w-12 rounded-full flex items-center justify-center font-bold text-xl ${item.color}`}>
                                        {item.init}
                                    </div>
                                    <div className="flex-1 space-y-1">
                                        <p className="text-base font-bold text-slate-800 group-hover:text-emerald-700 transition-colors">{item.title}</p>
                                        <p className="text-sm text-slate-500">{item.kid} • {item.time}</p>
                                    </div>
                                    <div className="text-sm text-emerald-600 font-bold bg-emerald-50 px-3 py-1.5 rounded-lg opacity-80 group-hover:opacity-100 transition-opacity">
                                        Visualizar Anexos
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
