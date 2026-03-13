"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
    ChevronLeft,
    Search,
    Filter,
    Calendar,
    FileText,
    Download,
    CheckCircle2,
    Clock,
    BookOpen,
    MoreVertical,
    Pencil,
    Trash,
    Check,
    Printer
} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";

export default function DiarioPage() {
    const [searchTerm, setSearchTerm] = useState("");

    const activities = [
        { id: 1, student: "Joãozinho", subject: "Matemática", title: "Frações e Decimais", date: "03/03/2026", status: "Concluído", duration: "1h 30min", notes: "Compreendeu bem a conversão de frações simples para decimais. Praticou com exercícios do livro apoio." },
        { id: 2, student: "Mariazinha", subject: "Português", title: "Leitura Compartilhada", date: "03/03/2026", status: "Concluído", duration: "45min", notes: "Leitura fluida. Identificou os adjetivos no texto 'O Pequeno Príncipe'." },
        { id: 3, student: "Joãozinho", subject: "Ciências", title: "Experiência: Ciclo da Água", date: "02/03/2026", status: "Concluído", duration: "2h", notes: "Montamos o mini-terrrário para observar a evaporação. Ficou muito engajado no processo." },
        { id: 6, student: "Mariazinha", subject: "Inglês", title: "Vocabulário de Animais", date: "02/03/2026", status: "Pendente", duration: "-", notes: "Praticar a pronúncia dos animais da fazenda. Falta completar a página 12." },
        { id: 4, student: "Mariazinha", subject: "Artes", title: "Pintura com Aquarela", date: "02/03/2026", status: "Concluído", duration: "1h", notes: "Explorou mistura de cores primárias. Criou um desenho de paisagem." },
        { id: 5, student: "Joãozinho", subject: "História", title: "Brasil Colônia", date: "01/03/2026", status: "Pendente", duration: "-", notes: "Início do capítulo 4. Necessário revisar os pontos sobre as Capitanias Hereditárias." },
        { id: 7, student: "Joãozinho", subject: "Geografia", title: "Relevo Brasileiro", date: "01/03/2026", status: "Pendente", duration: "-", notes: "Assistir o vídeo sobre planaltos e planícies anexado no módulo." },
    ];

    const filteredActivities = activities.filter(a =>
        a.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        a.student.toLowerCase().includes(searchTerm.toLowerCase()) ||
        a.subject.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="flex-1 p-8 bg-[#FAFAFA] min-h-screen">
            <div className="max-w-6xl mx-auto space-y-8">

                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <Link href="/admin">
                            <Button variant="ghost" size="icon" className="rounded-full bg-white shadow-sm border border-slate-200">
                                <ChevronLeft className="h-5 w-5" />
                            </Button>
                        </Link>
                        <div>
                            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Diário de Atividades</h1>
                            <p className="text-slate-500 font-medium">Histórico completo de aprendizado da família.</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <Button
                            variant="outline"
                            className="border-emerald-200 text-emerald-700 bg-emerald-50 hover:bg-emerald-100 font-bold"
                            onClick={() => window.print()}
                        >
                            <Printer className="h-4 w-4 mr-2" /> Imprimir Roteiro do Dia
                        </Button>
                        <Button variant="outline" className="border-slate-200 text-slate-600 bg-white hover:bg-slate-50">
                            <Download className="h-4 w-4 mr-2" /> Exportar Dados
                        </Button>
                    </div>
                </div>

                {/* Filtros e Busca */}
                <Card className="border-slate-200 shadow-sm">
                    <CardContent className="p-4 flex flex-col md:flex-row gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 h-4 w-4" />
                            <Input
                                placeholder="Buscar por aluno, matéria ou atividade..."
                                className="pl-10 bg-slate-50 border-slate-200"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <div className="flex gap-2">
                            <Button variant="outline" className="border-slate-200">
                                <Filter className="h-4 w-4 mr-2" /> Filtros
                            </Button>
                            <Button variant="outline" className="border-slate-200">
                                <Calendar className="h-4 w-4 mr-2" /> Março, 2026
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Lista de Atividades */}
                <div className="space-y-4">
                    {filteredActivities.length > 0 ? (
                        filteredActivities.map(activity => (
                            <Card key={activity.id} className="border-slate-200 hover:border-emerald-200 transition-colors group">
                                <CardContent className="p-0">
                                    <div className="flex flex-col md:flex-row md:items-center p-6 gap-6">
                                        <div className="flex items-center gap-4 flex-1">
                                            <div className="h-14 w-14 rounded-2xl bg-emerald-50 border border-emerald-100 flex flex-col items-center justify-center text-emerald-700 font-bold">
                                                <span className="text-[10px] uppercase">DIA</span>
                                                <span className="text-lg leading-none">{activity.date.split('/')[0]}</span>
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-2 mb-1">
                                                    <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded uppercase tracking-wider border border-emerald-100">{activity.subject}</span>
                                                    <span className="text-xs font-medium text-slate-400">• {activity.student}</span>
                                                </div>
                                                <h3 className="text-lg font-bold text-slate-800">{activity.title}</h3>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-8 md:px-8 border-l border-slate-100 hidden md:flex">
                                            <div className="text-center">
                                                <p className="text-[10px] font-bold text-slate-400 uppercase">Duração</p>
                                                <p className="text-sm font-bold text-slate-700">{activity.duration}</p>
                                            </div>
                                            <div className="text-center">
                                                <p className="text-[10px] font-bold text-slate-400 uppercase">Status</p>
                                                <div className={`flex items-center text-xs font-bold ${activity.status === 'Concluído' ? 'text-emerald-600' : 'text-amber-500'}`}>
                                                    {activity.status === 'Concluído' ? <CheckCircle2 size={14} className="mr-1" /> : <Clock size={14} className="mr-1" />}
                                                    {activity.status}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex-1 md:max-w-xs">
                                            <p className="text-sm text-slate-500 italic line-clamp-2">
                                                "{activity.notes}"
                                            </p>
                                        </div>

                                        <div className="flex items-center justify-end gap-2">
                                            <Button variant="ghost" size="icon" className="text-slate-400 hover:text-emerald-600" title="Ver Detalhes">
                                                <BookOpen className="h-4 w-4" />
                                            </Button>

                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="icon" className="text-slate-400 hover:bg-slate-100">
                                                        <MoreVertical className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end" className="w-48">
                                                    <DropdownMenuLabel>Ações</DropdownMenuLabel>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuItem className="cursor-pointer" onClick={() => alert("Editar registro: " + activity.title)}>
                                                        <Pencil className="mr-2 h-4 w-4 text-slate-500" />
                                                        <span>Editar Registro</span>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem className="cursor-pointer" onClick={() => window.print()}>
                                                        <Printer className="mr-2 h-4 w-4 text-slate-500" />
                                                        <span>Imprimir Detalhes</span>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem className="cursor-pointer" onClick={() => alert("Registro marcado como revisado!")}>
                                                        <Check className="mr-2 h-4 w-4 text-emerald-500" />
                                                        <span>Marcar como Revisado</span>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuItem className="text-red-600 focus:text-red-600 focus:bg-red-50 cursor-pointer" onClick={() => alert("Deseja realmente excluir este registro?")}>
                                                        <Trash className="mr-2 h-4 w-4" />
                                                        <span>Excluir Item</span>
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))
                    ) : (
                        <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-slate-200">
                            <div className="bg-slate-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Search className="text-slate-300 h-10 w-10" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-800">Nenhuma atividade encontrada</h3>
                            <p className="text-slate-500 mt-2">Tente mudar os termos da busca ou os filtros.</p>
                            <Button variant="link" onClick={() => setSearchTerm("")} className="mt-2 text-emerald-600 font-bold italic">Limpar busca</Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
